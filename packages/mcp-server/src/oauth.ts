// Conductor patch: OAuth 2.1 resource-server behavior for the hosted MCP server
// (https://mcp.conductor.is/ and its read-only connector URL https://mcp.conductor.is/read-only). Claude, ChatGPT and other OAuth-capable MCP
// clients start sign-in only when a credential-less POST answers HTTP 401 with
// a WWW-Authenticate header that names this server's protected resource
// metadata (RFC 9728), which points at the authorization server (the
// dashboard). The server stays stateless and holds no secret: credentials pass
// through unchanged and the only validation is an upstream probe of the API on
// tools/call, which treats a key as dead only when the API's own JSON error
// envelope says so (api.conductor.is sits behind Cloudflare; an edge 401/403
// page must fail open). Every gate decision and every probe is logged as one
// structured line because http.ts redacts www-authenticate from Render logs.
// The two URLs are hardcoded: every customer's connector stores them, so they
// never change. The rest of the config is read from non-MCP_SERVER_ env names
// (see code-tool.ts for why) with production defaults baked in.
import cors from 'cors';
import express from 'express';
import { getLogger } from './logger';
import { readEnv } from './util';

// A local end-to-end run edits these two temporarily (see the dashboard's src/lib/oauth/README.md).
const AUTHORIZATION_SERVER_URL = 'https://dashboard.conductor.is';
const RESOURCE_URL = 'https://mcp.conductor.is/';
const DEFAULT_API_BASE_URL = 'https://api.conductor.is/v1'; // conductor-node's own default (src/client.ts)
const PROTECTED_RESOURCE_METADATA_PATH = '/.well-known/oauth-protected-resource';
// The read-only connector URL. POST /read-only (Express also matches /read-only/) behaves exactly as if the
// client had sent x-stainless-mcp-client-permissions: {"allow_http_gets":true}. Its identifier is
// `${origin}/read-only` with no trailing slash (hosted Claude strips one from a connector URL, and SDK 1.x
// clients refuse a metadata resource longer than the URL the user typed), and its RFC 9728 document sits at
// PROTECTED_RESOURCE_METADATA_PATH + READ_ONLY_PATH, which is what path insertion produces for it.
const READ_ONLY_PATH = '/read-only';
const READ_ONLY_PERMISSIONS_HEADER = '{"allow_http_gets":true}';
const KEY_PROBE_TIMEOUT_MS = 3000;
const KEY_PROBE_PATH = '/end-users/end_usr_oauth_probe'; // auth: "secret" route; 404 with a live key, 401 with a dead one
// The only codes apps/server emits as a 401/403 on the probe route for a presented non-empty Bearer key
// (context/auth-context.ts, services/api-key-service.ts, the SECRET_KEY_REQUIRED 403 for a publishable key).
// PAID_PLAN_REQUIRED applies only to QBD requests and HTTPS_REQUIRED only to http in production; neither reaches this route.
const KEY_PROBE_REJECTION_CODES: ReadonlySet<string> = new Set(['API_KEY_INVALID', 'SECRET_KEY_REQUIRED']);
// A fixed, distinct User-Agent so the probe can be filtered by UA as well as by path (end_usr_oauth_probe) in Better Stack.
const KEY_PROBE_USER_AGENT = 'conductor-mcp-key-probe/1';
// Only tools/call is probed. initialize, tools/list, notifications and server/discover never contact the API, so the
// Betterstack initialize monitor keeps a dummy Bearer and connection checks stay instant. The guard test pins this line.
const PROBED_METHODS: ReadonlySet<string> = new Set(['tools/call']);

export type OAuthResource = 'root' | 'read-only';

export interface OAuthResourceConfig {
  authorizationServerUrl: string; // no trailing slash
  resourceUrl: string; // root: RESOURCE_URL, trailing slash kept; read-only: `${origin}/read-only`, no slash
  resourceMetadataUrl: string; // `${origin}/.well-known/oauth-protected-resource`, plus READ_ONLY_PATH for read-only
  apiBaseUrl: string; // no trailing slash
  keyProbeEnabled: boolean;
}

type Credential = { kind: 'bearer' | 'header'; token: string } | { kind: 'missing' } | { kind: 'invalid' };
type GateRejection = 'missing' | 'invalid_scheme' | 'dead_key';
type WwwAuthenticateError = 'invalid_request' | 'invalid_token';
type KeyProbeVerdict = 'valid' | 'invalid' | 'unknown';

// Read per call (cheap), so tests set process.env between requests and http.ts's signature does not change.
// The read-only resource is derived from the root.
export function getOAuthResourceConfig(resource: OAuthResource = 'root'): OAuthResourceConfig {
  const isReadOnly = resource === 'read-only';
  // Absolute paths resolved against the root, so the identifier, the route literal and the path-inserted
  // RFC 9728 metadata URL all come from READ_ONLY_PATH.
  return {
    authorizationServerUrl: AUTHORIZATION_SERVER_URL,
    resourceUrl: isReadOnly ? new URL(READ_ONLY_PATH, RESOURCE_URL).href : RESOURCE_URL,
    resourceMetadataUrl: new URL(
      PROTECTED_RESOURCE_METADATA_PATH + (isReadOnly ? READ_ONLY_PATH : ''),
      RESOURCE_URL,
    ).href,
    apiBaseUrl: (readEnv('CONDUCTOR_BASE_URL') ?? DEFAULT_API_BASE_URL).replace(/\/+$/, ''),
    keyProbeEnabled: readEnv('CONDUCTOR_MCP_KEY_PROBE') !== 'off',
  };
}

// No scopes_supported: read-only is decided by the URL the client POSTs to, never by the token, and listing
// none keeps Claude from requesting offline_access (a refresh token this server never issues).
export function buildProtectedResourceMetadata(config: OAuthResourceConfig): Record<string, unknown> {
  return {
    resource: config.resourceUrl,
    authorization_servers: [config.authorizationServerUrl],
    bearer_methods_supported: ['header'],
    resource_name: 'Conductor MCP server',
    resource_documentation: 'https://docs.conductor.is/usage/mcp',
  };
}

export function mountProtectedResourceMetadata(app: express.Express): void {
  // Preflight gets Access-Control-Allow-Origin: *. Each literal path also matches its trailing-slash form
  // (strict routing is off), so the read-only document answers under the well-known prefix whether a client
  // follows the 401 hint (no slash) or builds the path itself from the URL the user typed. No splat route:
  // any other suffix is a 404.
  for (const resource of ['root', 'read-only'] as const) {
    const path = PROTECTED_RESOURCE_METADATA_PATH + (resource === 'read-only' ? READ_ONLY_PATH : '');
    app.options(path, cors());
    app.get(path, cors(), (_req, res) => {
      res
        .status(200)
        .set('Cache-Control', 'public, max-age=300')
        .json(buildProtectedResourceMetadata(getOAuthResourceConfig(resource)));
    });
  }
}

// Descriptions are fixed ASCII strings with no double quotes. For a MISSING credential no error
// param is sent (RFC 6750 3.1), so the challenge is just the resource_metadata pointer and the
// description appears only in the JSON body.
export function buildWwwAuthenticate(
  config: OAuthResourceConfig,
  error?: WwwAuthenticateError,
  description?: string,
): string {
  const params: string[] = [];
  if (error !== undefined) {
    params.push(`error="${error}"`);
    if (description !== undefined) params.push(`error_description="${description}"`);
  }
  params.push(`resource_metadata="${config.resourceMetadataUrl}"`);
  return `Bearer ${params.join(', ')}`;
}

// Runs after express.json() (so req.body.method is readable) and before post(). A credential-less
// POST with invalid JSON is a 400 from the body parser, as today; real clients never send one.
// On the read-only route the gate also pins the client permissions header before the generated parser reads it.
export function requireCredential(resource: OAuthResource = 'root'): express.RequestHandler {
  return async (req, res, next) => {
    const config = getOAuthResourceConfig(resource);
    const credential = extractCredential(req);
    // Set by http.ts's session middleware (the request's own header or a fresh UUID), so the gate and probe
    // lines join pino-http's request line even on a first-contact 401 that carried no mcp-session-id.
    const mcpSessionId = (req as any).mcpSessionId as string | undefined;
    if (credential.kind === 'missing') {
      return reject(req, res, config, 'missing', undefined, 'Sign in to Conductor to use this MCP server');
    }
    if (credential.kind === 'invalid') {
      return reject(
        req,
        res,
        config,
        'invalid_scheme',
        'invalid_request',
        'The Authorization header must use the Bearer scheme',
      );
    }
    canonicalizeCredential(req, credential);
    if (resource === 'read-only') forceReadOnlyPermissions(req);
    if (config.keyProbeEnabled && bodyHasProbedMethod(req.body)) {
      const verdict = await probeKey(credential.token, config, mcpSessionId); // never throws
      if (verdict === 'invalid') {
        return reject(
          req,
          res,
          config,
          'dead_key',
          'invalid_token',
          'This Conductor key is invalid or was deleted; sign in again or use a new key',
        );
      }
    }
    next();
  };
}

// The log line is load-bearing: http.ts's redactHeaders (/auth|cookie|key|token|x-stainless-mcp-client-envs/i,
// applied to RESPONSE headers too) writes www-authenticate as [REDACTED] and pino-http logs no body, so
// without it a first-contact 401 (expected), a wrong-scheme 401 (the misconfigured customer behind the
// 130-per-48h 500s) and a dead-key 401 are identical in Render logs. The body is advisory; Claude and the
// SDK clients read only the status and the header.
function reject(
  req: express.Request,
  res: express.Response,
  config: OAuthResourceConfig,
  gate: GateRejection,
  error: WwwAuthenticateError | undefined,
  description: string,
): void {
  getLogger().warn(
    { mcpSessionId: (req as any).mcpSessionId, oauthGate: gate },
    'OAuth gate rejected request',
  );
  res
    .status(401)
    .set('WWW-Authenticate', buildWwwAuthenticate(config, error, description))
    .set('Cache-Control', 'no-store')
    .json({ error: error ?? 'invalid_token', error_description: description });
}

// Precedence mirrors parseClientAuthHeaders (Authorization wins) so what the gate accepts is exactly what
// newServer uses. x-conductor-secret-key is always a string in Express: Node joins duplicate custom request
// headers with a comma and only set-cookie is an array; narrowed with typeof for the TypeScript type.
function extractCredential(req: express.Request): Credential {
  const authorization = req.headers.authorization;
  if (authorization !== undefined) {
    const spaceIndex = authorization.indexOf(' ');
    const scheme = spaceIndex === -1 ? authorization : authorization.slice(0, spaceIndex);
    const token = spaceIndex === -1 ? '' : authorization.slice(spaceIndex + 1).trim();
    if (scheme.toLowerCase() === 'bearer' && token !== '') return { kind: 'bearer', token };
    return { kind: 'invalid' }; // Basic, Digest, 'Bearer' alone, 'Bearer '
  }
  const headerKey = req.headers['x-conductor-secret-key'];
  if (typeof headerKey === 'string') {
    const token = headerKey.trim();
    return token === '' ? { kind: 'invalid' } : { kind: 'header', token };
  }
  return { kind: 'missing' };
}

// The generated parseClientAuthHeaders switches on the literal 'Bearer' and throws otherwise, so the
// header is rewritten in canonical form ('bearer'/'BEARER' and 'Bearer  x' with two spaces all become
// 'Bearer x'); the custom header is replaced by its trimmed value.
function canonicalizeCredential(
  req: express.Request,
  credential: { kind: 'bearer' | 'header'; token: string },
): void {
  if (credential.kind === 'bearer') {
    req.headers.authorization = `Bearer ${credential.token}`;
  } else {
    req.headers['x-conductor-secret-key'] = credential.token;
  }
}

// The read-only connector URL behaves exactly as if the client had sent
// x-stainless-mcp-client-permissions: {"allow_http_gets":true}. The header is REPLACED, never merged:
// http.ts spreads whatever it parses over mcpOptions, so a client {"allow_http_gets":false} would restore
// full access and an allowed_methods regexp would union writes back in. A malformed client value is replaced
// too instead of answered 400 (that fail-closed 400 exists to stop a malformed header from granting full
// access, which cannot happen on this path); client blocked_methods are dropped with it.
function forceReadOnlyPermissions(req: express.Request): void {
  req.headers['x-stainless-mcp-client-permissions'] = READ_ONLY_PERMISSIONS_HEADER;
}

// body is an object with a string `method` in PROBED_METHODS, or an array with any such element (JSON-RPC batch).
function bodyHasProbedMethod(body: unknown): boolean {
  const messages: unknown[] = Array.isArray(body) ? body : [body];
  return messages.some((message) => {
    if (typeof message !== 'object' || message === null) return false;
    const method = (message as { method?: unknown }).method;
    return typeof method === 'string' && PROBED_METHODS.has(method);
  });
}

// Why the envelope check: api.conductor.is answers through Cloudflare in front of Render (verified live
// 2026-10-20: server: cloudflare, cf-ray, x-render-origin-server: Render), so a WAF block, managed challenge,
// rate-limit rule or Under Attack page (text/html 403) or a Cloudflare Access page (text/html 401) would
// otherwise read as a deleted key and turn every tools/call from every client (hosted Claude, Claude Code,
// Cursor, VS Code, Codex, mcp-remote, the npx bridge) into a sign-in 401, with hosted Claude re-consenting and
// minting a key row per retry. The API's own rejection is always application/json with the envelope
// { "error": { "code": ... } } (middleware/global-error-formatter.ts). 'unknown' is treated as valid by the
// caller (fail open). The body is always consumed or cancelled (an unread body pins the undici socket until
// GC) and never logged. The token is never logged. After EVERY probe, one structured line; the warn on
// 'unknown' is what makes a silently broken probe path (route renamed, DNS, permanent timeout, edge block)
// visible instead of reading as "every key is valid" forever.
async function probeKey(
  token: string,
  config: OAuthResourceConfig,
  mcpSessionId: string | undefined,
): Promise<KeyProbeVerdict> {
  const startedAt = Date.now();
  let verdict: KeyProbeVerdict = 'unknown';
  let status: number | null = null;
  let contentType: string | null = null;
  let cfRay: string | null = null;
  let conductorRequestId: string | null = null;
  let error: string | undefined;
  try {
    const response = await fetch(`${config.apiBaseUrl}${KEY_PROBE_PATH}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'User-Agent': KEY_PROBE_USER_AGENT,
      },
      signal: AbortSignal.timeout(KEY_PROBE_TIMEOUT_MS),
      redirect: 'manual',
    });
    status = response.status;
    contentType = mediaTypeOf(response.headers.get('content-type'));
    cfRay = response.headers.get('cf-ray');
    conductorRequestId = response.headers.get('conductor-request-id');
    verdict = await classifyProbeResponse(response, contentType);
  } catch (thrown) {
    // timeout, DNS, reset, ECONNREFUSED
    error = thrown instanceof Error ? thrown.message : String(thrown);
  }
  const keyProbe = {
    verdict,
    status,
    ms: Date.now() - startedAt,
    contentType,
    cfRay,
    conductorRequestId,
    ...(error !== undefined && { error }),
  };
  getLogger()[verdict === 'unknown' ? 'warn' : 'info']({ mcpSessionId, keyProbe }, 'key probe');
  return verdict;
}

// 404 or 2xx -> 'valid'. 401 or 403 -> 'invalid' ONLY when the media type is exactly application/json AND
// the body (read under the same 3 s abort signal) is Conductor's error envelope with a rejection code; any
// other 401/403 (text/html, another code, unparseable) -> 'unknown'. Anything else (3xx, 429, 5xx) -> 'unknown'.
async function classifyProbeResponse(
  response: Response,
  contentType: string | null,
): Promise<KeyProbeVerdict> {
  if (response.status === 404 || response.ok) {
    await discardBody(response);
    return 'valid';
  }
  if ((response.status !== 401 && response.status !== 403) || contentType !== 'application/json') {
    await discardBody(response);
    return 'unknown';
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(await response.text());
  } catch {
    return 'unknown';
  }
  return isApiKeyRejectionEnvelope(parsed) ? 'invalid' : 'unknown';
}

function isApiKeyRejectionEnvelope(parsed: unknown): boolean {
  if (typeof parsed !== 'object' || parsed === null) return false;
  const error = (parsed as { error?: unknown }).error;
  if (typeof error !== 'object' || error === null) return false;
  const code = (error as { code?: unknown }).code;
  return typeof code === 'string' && KEY_PROBE_REJECTION_CODES.has(code);
}

async function discardBody(response: Response): Promise<void> {
  await response.body?.cancel().catch(() => undefined);
}

// content-type before ";", trimmed, lowercased
function mediaTypeOf(contentType: string | null): string | null {
  const mediaType = contentType?.split(';')[0]?.trim().toLowerCase();
  return mediaType ? mediaType : null;
}
