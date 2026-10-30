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
import { createHash } from 'node:crypto';
import express from 'express';
import { getLogger } from './logger';
import { sdkMethods } from './methods';
import { rpcMethodProps, sanitizeUserAgent } from './telemetry';
import { readEnv } from './util';

// A local end-to-end run edits these two temporarily (see the dashboard's src/lib/oauth/README.md).
const AUTHORIZATION_SERVER_URL = 'https://dashboard.conductor.is';
const RESOURCE_URL = 'https://mcp.conductor.is/';
const DEFAULT_API_BASE_URL = 'https://api.conductor.is/v1'; // conductor-node's own default (src/client.ts)
const PROTECTED_RESOURCE_METADATA_PATH = '/.well-known/oauth-protected-resource';
// The read-only connector URL. POST /read-only (Express also matches /read-only/) allows only reads (see
// forceReadOnlyPermissions; a guardrail, not a security boundary). Its identifier is
// `${origin}/read-only` with no trailing slash (hosted Claude strips one from a connector URL, and SDK 1.x
// clients refuse a metadata resource longer than the URL the user typed), and its RFC 9728 document sits at
// PROTECTED_RESOURCE_METADATA_PATH + READ_ONLY_PATH, which is what path insertion produces for it.
const READ_ONLY_PATH = '/read-only';
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
// search_docs never contacts the API, so a call to it alone is not probed.
const UNPROBED_TOOLS: ReadonlySet<string> = new Set(['search_docs']);
// A 'valid' verdict is reused for this long per key (keyed by its SHA-256, never the key), so a busy session
// pays one probe a minute instead of one per call. A key deleted in the dashboard keeps working here for up
// to a minute; 'invalid' and 'unknown' are never cached.
const VALID_KEY_CACHE_TTL_MS = 60_000;
const VALID_KEY_CACHE_MAX_ENTRIES = 10_000;
const validKeyCache = new Map<string, number>(); // sha256(token) -> expiry, insertion-ordered
// Parallel calls with the same uncached key share one probe.
const inFlightProbes = new Map<string, Promise<KeyProbeResult>>();

export type OAuthResource = 'root' | 'read-only';

export interface OAuthResourceConfig {
  authorizationServerUrl: string; // no trailing slash
  resourceUrl: string; // root: RESOURCE_URL, trailing slash kept; read-only: `${origin}/read-only`, no slash
  resourceMetadataUrl: string; // `${origin}/.well-known/oauth-protected-resource`, plus READ_ONLY_PATH for read-only
  apiBaseUrl: string; // no trailing slash
  keyProbeEnabled: boolean;
}

type Credential =
  | { kind: 'bearer' | 'header'; token: string }
  | { kind: 'missing' }
  | { kind: 'invalid'; header: 'authorization' | 'x-conductor-secret-key'; shape: CredentialShape };
// What was wrong with a rejected credential, logged on the gate line so a wrong-scheme connector can be
// diagnosed without any part of the value: an empty Bearer, a recognizable scheme word (basic, token,
// apikey, ...), some other first word, no space at all (a bare key pasted without the Bearer word, which is
// told apart only by its public sk_conductor_ prefix), or an empty custom header.
export type CredentialShape =
  | 'empty_bearer'
  | `scheme:${string}`
  | 'no_scheme:sk_conductor_'
  | 'no_scheme:other'
  | 'empty_custom_header';
type GateRejection = 'missing' | 'invalid_scheme' | 'dead_key';
type WwwAuthenticateError = 'invalid_token';
type KeyProbeVerdict = 'valid' | 'invalid' | 'unknown';
// code: the API's rejection code, for an 'invalid' verdict only.
type KeyProbeResult = { verdict: KeyProbeVerdict; code?: string; error?: string };

// Read per call (cheap), so tests set process.env between requests and http.ts's signature does not change.
// The read-only resource is derived from the root.
export function getOAuthResourceConfig(resource: OAuthResource = 'root'): OAuthResourceConfig {
  const isReadOnly = resource === 'read-only';
  // Absolute paths resolved against the root, so the identifier and the path-inserted RFC 9728 metadata URL
  // both come from READ_ONLY_PATH; http.ts's '/read-only' route literals must match it (the seal test pins them).
  return {
    authorizationServerUrl: AUTHORIZATION_SERVER_URL,
    resourceUrl: isReadOnly ? new URL(READ_ONLY_PATH, RESOURCE_URL).href : RESOURCE_URL,
    resourceMetadataUrl: new URL(
      PROTECTED_RESOURCE_METADATA_PATH + (isReadOnly ? READ_ONLY_PATH : ''),
      RESOURCE_URL,
    ).href,
    apiBaseUrl: (readEnv('CONDUCTOR_BASE_URL') ?? DEFAULT_API_BASE_URL).replace(/\/+$/, ''),
    keyProbeEnabled: !['off', 'false', '0', 'no'].includes(
      (readEnv('CONDUCTOR_MCP_KEY_PROBE') ?? '').trim().toLowerCase(),
    ),
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
// On the read-only route the gate also rewrites the client permissions header before http.ts parses it.
export function requireCredential(resource: OAuthResource = 'root'): express.RequestHandler {
  return async (req, res, next) => {
    const config = getOAuthResourceConfig(resource);
    const credential = extractCredential(req);
    // Set by http.ts's session middleware (the request's own header or a fresh UUID), so the gate and probe
    // lines join pino-http's request line even on a first-contact 401 that carried no mcp-session-id.
    const mcpSessionId = (req as any).mcpSessionId as string | undefined;
    if (credential.kind === 'missing') {
      return reject(
        req,
        res,
        config,
        resource,
        'missing',
        undefined,
        'Sign in to Conductor, or send your Conductor secret key in the Authorization header',
      );
    }
    if (credential.kind === 'invalid') {
      return reject(
        req,
        res,
        config,
        resource,
        'invalid_scheme',
        'invalid_token',
        credential.header === 'x-conductor-secret-key' ?
          'The x-conductor-secret-key header is empty. Set it to your Conductor secret key'
        : 'The Authorization header must be the word Bearer, a space, and your Conductor secret key',
        credential.shape,
      );
    }
    canonicalizeCredential(req, credential);
    if (resource === 'read-only') forceReadOnlyPermissions(req);
    if (config.keyProbeEnabled && bodyHasProbedMethod(req.body)) {
      const probe = await probeKeyCached(credential.token, config, mcpSessionId); // never throws
      if (probe.verdict === 'invalid') {
        return reject(
          req,
          res,
          config,
          resource,
          'dead_key',
          'invalid_token',
          probe.code === 'SECRET_KEY_REQUIRED' ?
            'This is a Conductor publishable key. Use a secret key instead'
          : 'This Conductor key is invalid or was deleted. Sign in again, or create a new key on the MCP tab in the Conductor Dashboard',
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
// SDK clients read only the status and the header. The line also carries the credential's shape (never
// any part of its value), the JSON-RPC method, the client's User-Agent and the resource, so a keyless
// retry loop, a wrong-scheme connector and a first-contact sign-in are told apart without a join.
function reject(
  req: express.Request,
  res: express.Response,
  config: OAuthResourceConfig,
  resource: OAuthResource,
  gate: GateRejection,
  error: WwwAuthenticateError | undefined,
  description: string,
  credentialShape?: CredentialShape,
): void {
  getLogger().warn(
    {
      mcpSessionId: (req as any).mcpSessionId,
      oauthGate: gate,
      ...(credentialShape !== undefined && { credentialShape }),
      ...rpcMethodProps(req.body),
      userAgent: sanitizeUserAgent(req.headers['user-agent'], 100),
      resource,
    },
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
  // Truthy, like parseClientAuthHeaders: an empty Authorization header falls through to the custom header.
  if (authorization) {
    const spaceIndex = authorization.indexOf(' ');
    const scheme = spaceIndex === -1 ? authorization : authorization.slice(0, spaceIndex);
    const token = spaceIndex === -1 ? '' : authorization.slice(spaceIndex + 1).trim();
    if (scheme.toLowerCase() === 'bearer' && token !== '') return { kind: 'bearer', token };
    // Basic, Digest, 'Bearer' alone, 'Bearer ', a bare key
    return { kind: 'invalid', header: 'authorization', shape: authorizationShape(authorization) };
  }
  const headerKey = req.headers['x-conductor-secret-key'];
  if (typeof headerKey === 'string') {
    const token = headerKey.trim();
    return token === '' ?
        { kind: 'invalid', header: 'x-conductor-secret-key', shape: 'empty_custom_header' }
      : { kind: 'header', token };
  }
  return { kind: 'missing' };
}

// The shape of an Authorization value that is not `Bearer <key>`. Exported for its unit test; the value
// itself is never returned or logged. A scheme word is logged only when it is short and alphabetic, so a
// pasted secret can never become the label.
export function authorizationShape(authorization: string): CredentialShape {
  const spaceIndex = authorization.indexOf(' ');
  const scheme = spaceIndex === -1 ? authorization : authorization.slice(0, spaceIndex);
  if (scheme.toLowerCase() === 'bearer') return 'empty_bearer'; // 'Bearer' alone, 'Bearer ', 'bearer   '
  if (spaceIndex === -1) {
    return authorization.startsWith('sk_conductor_') ? 'no_scheme:sk_conductor_' : 'no_scheme:other';
  }
  return /^[A-Za-z]{1,12}$/.test(scheme) ? `scheme:${scheme.toLowerCase()}` : 'scheme:other';
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

// The read-only connector URL allows the client's own permissions minus every write: the HTTP GET methods,
// or only the GETs among a client's allowed_methods when it sent that list without allow_http_gets:true, less
// its blocked_methods. The header is REWRITTEN, not merged: http.ts spreads whatever it parses over
// mcpOptions, so a client {"allow_http_gets":false} would restore full access and an allowed_methods regexp
// would union writes back in; allowed_methods is therefore replaced by the exact names of the GETs it matches.
// A server started with its own --code-allowed-methods would still union those in; the hosted service sets
// none. A malformed value is left as sent, so http.ts refuses it with the same 400 as on the root.
function forceReadOnlyPermissions(req: express.Request): void {
  const sent = req.headers['x-stainless-mcp-client-permissions'];
  const client = typeof sent === 'string' ? parseClientPermissions(sent) : {};
  if (client === null) return;
  const forced: ClientPermissions = { allow_http_gets: true };
  if (client.allowed_methods !== undefined && client.allow_http_gets !== true) {
    const allowed = client.allowed_methods.map((pattern) => new RegExp(pattern));
    forced.allow_http_gets = false;
    forced.allowed_methods = sdkMethods
      .filter(
        (method) =>
          method.httpMethod === 'get' && allowed.some((regexp) => regexp.test(method.fullyQualifiedName)),
      )
      .map((method) => `^${method.fullyQualifiedName.replace(/\./g, '\\.')}$`); // names are dotted identifiers
  }
  if (client.blocked_methods !== undefined) forced.blocked_methods = client.blocked_methods;
  req.headers['x-stainless-mcp-client-permissions'] = JSON.stringify(forced);
}

export type ClientPermissions = {
  allow_http_gets?: boolean;
  allowed_methods?: string[];
  blocked_methods?: string[];
};

// The one parser for x-stainless-mcp-client-permissions, shared by http.ts and the read-only gate so both
// paths refuse the same values. Returns null unless the header is a JSON object holding only known keys of
// the right types with valid regexps, so a typo such as {"allow_http_gets":"true"} or {"read_only":true} is
// refused instead of ignored, and a bad pattern is a 400 instead of a 500 from the method filter.
export function parseClientPermissions(header: string): ClientPermissions | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(header);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return null;
  }
  const isPatternArray = (value: unknown) =>
    Array.isArray(value) && value.every((item) => typeof item === 'string' && isValidRegExp(item));
  const isValid = Object.entries(parsed).every(([key, value]) =>
    key === 'allow_http_gets' ? typeof value === 'boolean'
    : key === 'allowed_methods' || key === 'blocked_methods' ? isPatternArray(value)
    : false,
  );
  return isValid ? (parsed as ClientPermissions) : null;
}

function isValidRegExp(pattern: string): boolean {
  try {
    new RegExp(pattern);
    return true;
  } catch {
    return false;
  }
}

// body is an object with a string `method` in PROBED_METHODS, or an array with any such element (JSON-RPC
// batch), and the call is not only to a tool in UNPROBED_TOOLS.
function bodyHasProbedMethod(body: unknown): boolean {
  const messages: unknown[] = Array.isArray(body) ? body : [body];
  return messages.some((message) => {
    if (typeof message !== 'object' || message === null) return false;
    const { method, params } = message as { method?: unknown; params?: { name?: unknown } };
    if (typeof method !== 'string' || !PROBED_METHODS.has(method)) return false;
    const toolName = typeof params === 'object' && params !== null ? params.name : undefined;
    return !(typeof toolName === 'string' && UNPROBED_TOOLS.has(toolName));
  });
}

async function probeKeyCached(
  token: string,
  config: OAuthResourceConfig,
  mcpSessionId: string | undefined,
): Promise<KeyProbeResult> {
  const cacheKey = createHash('sha256').update(token).digest('hex');
  const expiresAt = validKeyCache.get(cacheKey);
  if (expiresAt !== undefined && expiresAt > Date.now()) return { verdict: 'valid' };
  validKeyCache.delete(cacheKey);
  const pending = inFlightProbes.get(cacheKey);
  if (pending !== undefined) {
    // One line under this session too, so its gate line has a probe result next to it.
    const shared = await pending;
    getLogger()[shared.verdict === 'unknown' ? 'warn' : 'info'](
      { mcpSessionId, keyProbe: { ...shared, shared: true } },
      'key probe',
    );
    return shared;
  }
  const probe = probeKey(token, config, mcpSessionId).finally(() => inFlightProbes.delete(cacheKey));
  inFlightProbes.set(cacheKey, probe);
  const result = await probe;
  if (result.verdict === 'valid') {
    if (validKeyCache.size >= VALID_KEY_CACHE_MAX_ENTRIES) {
      const oldest = validKeyCache.keys().next().value;
      if (oldest !== undefined) validKeyCache.delete(oldest);
    }
    validKeyCache.set(cacheKey, Date.now() + VALID_KEY_CACHE_TTL_MS);
  }
  return result;
}

// Tests only: forget cached verdicts between cases.
export function clearValidKeyCache(): void {
  validKeyCache.clear();
  inFlightProbes.clear();
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
): Promise<KeyProbeResult> {
  const startedAt = Date.now();
  let result: KeyProbeResult = { verdict: 'unknown' };
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
    result = await classifyProbeResponse(response, contentType);
  } catch (thrown) {
    // timeout, DNS, reset, ECONNREFUSED
    // undici's message is always "fetch failed"; the cause says refused, DNS, reset or bad port.
    const cause = thrown instanceof Error ? (thrown as { cause?: unknown }).cause : undefined;
    const causeText =
      cause instanceof Error ?
        `${(cause as { code?: string }).code ?? cause.name}: ${cause.message}`
      : undefined;
    error = [thrown instanceof Error ? thrown.message : String(thrown), causeText]
      .filter(Boolean)
      .join(' / ');
  }
  const { verdict, code } = result;
  error ??= result.error;
  const keyProbe = {
    verdict,
    ...(code !== undefined && { code }),
    status,
    ms: Date.now() - startedAt,
    contentType,
    cfRay,
    conductorRequestId,
    ...(error !== undefined && { error }),
  };
  getLogger()[verdict === 'unknown' ? 'warn' : 'info']({ mcpSessionId, keyProbe }, 'key probe');
  return result;
}

// The probe reads a nonexistent end user, so the real API answers a live key 404 RESOURCE_MISSING and a dead or
// publishable key 401/403 with a code in KEY_PROBE_REJECTION_CODES, always application/json with Conductor's
// envelope. Anything else is 'unknown' (fail open, logged as a warning): a 2xx (the real API never sends one
// here, so CONDUCTOR_BASE_URL points somewhere else), another 404 (a moved route's UNRECOGNIZED_REQUEST_URL),
// an edge HTML page, another code, 3xx, 429 or 5xx. The body is read under the same 3 s abort signal.
async function classifyProbeResponse(
  response: Response,
  contentType: string | null,
): Promise<KeyProbeResult> {
  const answersWithEnvelope = response.status === 404 || response.status === 401 || response.status === 403;
  if (!answersWithEnvelope || contentType !== 'application/json') {
    await discardBody(response);
    return { verdict: 'unknown' };
  }
  let code: string | undefined;
  try {
    code = errorCodeOf(JSON.parse(await response.text()));
  } catch (thrown) {
    // The 3 s abort firing mid-body, or a body that is not JSON.
    return { verdict: 'unknown', error: thrown instanceof Error ? thrown.message : String(thrown) };
  }
  if (response.status === 404) return { verdict: code === 'RESOURCE_MISSING' ? 'valid' : 'unknown' };
  return code !== undefined && KEY_PROBE_REJECTION_CODES.has(code) ?
      { verdict: 'invalid', code }
    : { verdict: 'unknown' };
}

// error.code from Conductor's error envelope { "error": { "code": ... } }, if present.
function errorCodeOf(parsed: unknown): string | undefined {
  if (typeof parsed !== 'object' || parsed === null) return undefined;
  const error = (parsed as { error?: unknown }).error;
  if (typeof error !== 'object' || error === null) return undefined;
  const code = (error as { code?: unknown }).code;
  return typeof code === 'string' ? code : undefined;
}

async function discardBody(response: Response): Promise<void> {
  await response.body?.cancel().catch(() => undefined);
}

// content-type before ";", trimmed, lowercased
function mediaTypeOf(contentType: string | null): string | null {
  const mediaType = contentType?.split(';')[0]?.trim().toLowerCase();
  return mediaType ? mediaType : null;
}
