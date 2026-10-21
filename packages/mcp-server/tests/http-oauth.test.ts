// Conductor patch: OAuth 2.1 resource-server behavior (src/oauth.ts). The
// hosted server answers a credential-less POST with 401 + WWW-Authenticate,
// serves the RFC 9728 protected resource metadata, and probes a presented key
// against the API on tools/call only, treating it as dead solely on the API's
// own JSON rejection envelope. The API is a local mock that records requests.
import http from 'node:http';
import type { AddressInfo } from 'node:net';
import path from 'node:path';
import { streamableHTTPApp } from '../src/http';
import { configureLogger } from '../src/logger';

const INITIALIZE = {
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2025-03-26',
    capabilities: {},
    clientInfo: { name: 'oauth-test', version: '1.0.0' },
  },
};
const TOOLS_LIST = { jsonrpc: '2.0', id: 2, method: 'tools/list' };
const SERVER_DISCOVER = { jsonrpc: '2.0', id: 3, method: 'server/discover' };
const TOOLS_CALL = { jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'nope', arguments: {} } };

const PROBE_PATH = '/v1/end-users/end_usr_oauth_probe';
const PRM_PATH = '/.well-known/oauth-protected-resource';
const RS_METADATA_URL = 'http://rs.test/.well-known/oauth-protected-resource';
const MISSING_CHALLENGE = `Bearer resource_metadata="${RS_METADATA_URL}"`;
const SCHEME_CHALLENGE = `Bearer error="invalid_request", error_description="The Authorization header must use the Bearer scheme", resource_metadata="${RS_METADATA_URL}"`;
const DEAD_KEY_CHALLENGE = `Bearer error="invalid_token", error_description="This Conductor key was deleted or is invalid; sign in again", resource_metadata="${RS_METADATA_URL}"`;
const EXPECTED_METADATA = {
  resource: 'http://rs.test/',
  authorization_servers: ['http://as.test'],
  bearer_methods_supported: ['header'],
  resource_name: 'Conductor MCP server',
  resource_documentation: 'https://docs.conductor.is/usage/mcp',
};
const PRM_RO_PATH = '/.well-known/oauth-protected-resource/read-only';
const RS_RO_METADATA_URL = 'http://rs.test/.well-known/oauth-protected-resource/read-only';
const RO_MISSING_CHALLENGE = `Bearer resource_metadata="${RS_RO_METADATA_URL}"`;
const RO_DEAD_KEY_CHALLENGE = `Bearer error="invalid_token", error_description="This Conductor key was deleted or is invalid; sign in again", resource_metadata="${RS_RO_METADATA_URL}"`;
const EXPECTED_RO_METADATA = { ...EXPECTED_METADATA, resource: 'http://rs.test/read-only' };
// Names a write by its SDK method name. The code tool blocks on a substring match before anything runs, so
// this never reaches Deno (absent when CI runs jest) or the API.
const EXECUTE_WRITE = {
  jsonrpc: '2.0',
  id: 5,
  method: 'tools/call',
  params: {
    name: 'execute',
    arguments: { code: 'async function run(conductor) { return conductor.endUsers.create({}); }' },
  },
};
const BLOCKED_MESSAGE =
  'The following methods have been blocked by the MCP server and cannot be used in code execution: endUsers.create';
const ENV_NAMES = [
  'CONDUCTOR_BASE_URL',
  'CONDUCTOR_MCP_OAUTH_AUTHORIZATION_SERVER_URL',
  'CONDUCTOR_MCP_OAUTH_RESOURCE_URL',
  'CONDUCTOR_MCP_KEY_PROBE',
];

type RecordedRequest = { path: string; headers: http.IncomingHttpHeaders };
const apiRequests: RecordedRequest[] = [];

let api: http.Server;
let server: http.Server;
let baseUrl: string;

beforeAll(async () => {
  configureLogger({ level: 'fatal', pretty: false });
  api = http.createServer(mockConductorApi);
  process.env['CONDUCTOR_BASE_URL'] = `${await listen(api)}/v1`;
  process.env['CONDUCTOR_MCP_OAUTH_AUTHORIZATION_SERVER_URL'] = 'http://as.test';
  process.env['CONDUCTOR_MCP_OAUTH_RESOURCE_URL'] = 'http://rs.test/';
  const app = streamableHTTPApp({
    mcpOptions: {
      codeExecutionMode: 'local',
      customInstructionsPath: path.resolve(__dirname, '..', 'instructions.md'),
    },
  });
  server = http.createServer(app);
  baseUrl = `${await listen(server)}/`;
});

afterAll(async () => {
  for (const name of ENV_NAMES) delete process.env[name];
  await Promise.all([close(server), close(api)]);
});

beforeEach(() => {
  apiRequests.length = 0;
});

describe('credential gate', () => {
  it('answers a credential-less initialize with 401 and the resource_metadata challenge', async () => {
    const response = await post(INITIALIZE);

    expect(response.status).toBe(401);
    expect(response.headers.get('www-authenticate')).toBe(MISSING_CHALLENGE);
    expect(response.headers.get('content-type')).toContain('application/json');
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(await response.json()).toEqual({ error: 'invalid_token', error_description: expect.any(String) });
    expect(probes()).toHaveLength(0);
  });

  const credentialLess: Array<[string, unknown]> = [
    ['tools/list', TOOLS_LIST],
    ['server/discover', SERVER_DISCOVER],
    ['a batch holding initialize', [INITIALIZE]],
  ];
  it.each(credentialLess)('answers credential-less %s with 401', async (_name, body) => {
    const response = await post(body);

    expect(response.status).toBe(401);
    expect(response.headers.get('www-authenticate')).toBe(MISSING_CHALLENGE);
    await response.json();
  });

  const wrongScheme: Array<[string, Record<string, string>]> = [
    ['Authorization: Basic abc', { Authorization: 'Basic abc' }],
    ['an empty Bearer credential', { Authorization: 'Bearer ' }],
    ['an empty x-conductor-secret-key', { 'x-conductor-secret-key': '' }],
  ];
  it.each(wrongScheme)('rejects %s with 401 invalid_request instead of 500', async (_name, headers) => {
    const response = await post(INITIALIZE, headers);

    expect(response.status).toBe(401);
    expect(response.headers.get('www-authenticate')).toBe(SCHEME_CHALLENGE);
    expect(await response.json()).toEqual({
      error: 'invalid_request',
      error_description: expect.any(String),
    });
  });

  it('accepts a lowercase bearer scheme by canonicalizing it before the generated parser', async () => {
    const response = await post(INITIALIZE, { Authorization: 'bearer sk_conductor_live' });

    expect(response.status).toBe(200);
    await response.text();
  });

  const credentials: Array<[string, Record<string, string>]> = [
    ['Authorization: Bearer', { Authorization: 'Bearer sk_conductor_live' }],
    ['x-conductor-secret-key', { 'x-conductor-secret-key': 'sk_conductor_live' }],
  ];
  it.each(credentials)('passes initialize with %s', async (_name, headers) => {
    const response = await post(INITIALIZE, headers);

    expect(response.status).toBe(200);
    await response.text();
  });

  it('never probes initialize or tools/list, so a dead key still connects', async () => {
    for (const body of [INITIALIZE, TOOLS_LIST]) {
      const response = await post(body, { 'x-conductor-secret-key': 'sk_conductor_dead' });
      expect(response.status).toBe(200);
      await response.text();
    }
    expect(probes()).toHaveLength(0);
  });
});

describe('tools/call key probe', () => {
  it('lets a live key through (404 from the API) and returns the in-band unknown-tool error', async () => {
    const response = await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_live' });

    expect(response.status).toBe(200);
    expect(await response.text()).toContain('Unknown tool: nope');
    expect(probes()).toHaveLength(1);
  });

  it('sends exactly one probe per tools/call with the presented key and a fixed User-Agent', async () => {
    await (await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_live' })).text();

    expect(probes()).toHaveLength(1);
    const [probe] = probes();
    expect(probe?.path).toBe(PROBE_PATH);
    expect(probe?.headers.authorization).toBe('Bearer sk_conductor_live');
    expect(probe?.headers['user-agent']).toBe('conductor-mcp-key-probe/1');
    expect(probe?.headers.accept).toBe('application/json');
  });

  const deadKeys: Array<[string, Record<string, string>]> = [
    ['Bearer sk_conductor_dead (401 API_KEY_INVALID)', { Authorization: 'Bearer sk_conductor_dead' }],
    [
      'Bearer sk_conductor_publishable (403 SECRET_KEY_REQUIRED)',
      { Authorization: 'Bearer sk_conductor_publishable' },
    ],
    ['x-conductor-secret-key: sk_conductor_dead', { 'x-conductor-secret-key': 'sk_conductor_dead' }],
  ];
  it.each(deadKeys)('answers 401 invalid_token for %s', async (_name, headers) => {
    const response = await post(TOOLS_CALL, headers);

    expect(response.status).toBe(401);
    expect(response.headers.get('www-authenticate')).toBe(DEAD_KEY_CHALLENGE);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(await response.json()).toEqual({ error: 'invalid_token', error_description: expect.any(String) });
    expect(probes()).toHaveLength(1);
  });

  it('probes a JSON-RPC batch that contains a tools/call', async () => {
    const response = await post([INITIALIZE, TOOLS_CALL], { Authorization: 'Bearer sk_conductor_dead' });

    expect(response.status).toBe(401);
    expect(response.headers.get('www-authenticate')).toBe(DEAD_KEY_CHALLENGE);
    await response.json();
  });

  const failOpen: Array<[string, string]> = [
    ['a text/html 403 (Cloudflare WAF page)', 'sk_conductor_edge403'],
    ['a text/html 401 (Cloudflare Access page)', 'sk_conductor_edge401'],
    ['a JSON 401 with an unrelated code', 'sk_conductor_othercode'],
    ['a 503', 'sk_conductor_flaky'],
  ];
  it.each(failOpen)('fails open on %s', async (_name, key) => {
    const response = await post(TOOLS_CALL, { Authorization: `Bearer ${key}` });

    expect(response.status).toBe(200);
    expect(await response.text()).toContain('Unknown tool: nope');
  });

  it('fails open when the API is unreachable', async () => {
    await withEnv('CONDUCTOR_BASE_URL', 'http://127.0.0.1:1/v1', async () => {
      const response = await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_dead' });
      expect(response.status).toBe(200);
      await response.text();
    });
    expect(probes()).toHaveLength(0);
  });

  it('skips the probe entirely when CONDUCTOR_MCP_KEY_PROBE=off', async () => {
    await withEnv('CONDUCTOR_MCP_KEY_PROBE', 'off', async () => {
      const response = await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_dead' });
      expect(response.status).toBe(200);
      await response.text();
    });
    expect(probes()).toHaveLength(0);
  });
});

describe('protected resource metadata', () => {
  it.each([PRM_PATH, `${PRM_PATH}/`])('serves GET %s with CORS and a short public cache', async (prmPath) => {
    const response = await fetch(new URL(prmPath, baseUrl));

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/json');
    expect(response.headers.get('cache-control')).toBe('public, max-age=300');
    expect(response.headers.get('access-control-allow-origin')).toBe('*');
    expect(await response.json()).toEqual(EXPECTED_METADATA);
  });

  it('answers the CORS preflight', async () => {
    const response = await fetch(new URL(PRM_PATH, baseUrl), {
      method: 'OPTIONS',
      headers: { Origin: 'https://claude.ai', 'Access-Control-Request-Method': 'GET' },
    });

    expect(response.status).toBe(204);
    expect(response.headers.get('access-control-allow-origin')).toBe('*');
  });

  it('strips a trailing slash from the configured authorization server URL', async () => {
    await withEnv('CONDUCTOR_MCP_OAUTH_AUTHORIZATION_SERVER_URL', 'http://as.test/', async () => {
      const metadata = await fetchMetadata();
      expect(metadata['authorization_servers']).toEqual(['http://as.test']);
    });
  });

  it('defaults to the production dashboard and MCP URLs when no env is set', async () => {
    await withEnv('CONDUCTOR_MCP_OAUTH_AUTHORIZATION_SERVER_URL', undefined, () =>
      withEnv('CONDUCTOR_MCP_OAUTH_RESOURCE_URL', undefined, async () => {
        const metadata = await fetchMetadata();
        expect(metadata['resource']).toBe('https://mcp.conductor.is/');
        expect(metadata['authorization_servers']).toEqual(['https://dashboard.conductor.is']);

        const response = await post(INITIALIZE);
        expect(response.status).toBe(401);
        expect(response.headers.get('www-authenticate')).toBe(
          'Bearer resource_metadata="https://mcp.conductor.is/.well-known/oauth-protected-resource"',
        );
        await response.json();
      }),
    );
  });

  it('leaves the other routes alone', async () => {
    const get = await fetch(baseUrl);
    expect(get.status).toBe(405);
    await get.json();
    const del = await fetch(baseUrl, { method: 'DELETE' });
    expect(del.status).toBe(405);
    await del.json();
    const health = await fetch(new URL('/health', baseUrl));
    expect(health.status).toBe(200);
    expect(await health.text()).toBe('OK');
  });
});

describe('read-only connector path', () => {
  it.each(['/read-only', '/read-only/'])(
    'answers a credential-less initialize on %s with the read-only metadata hint',
    async (path) => {
      const response = await post(INITIALIZE, {}, path);
      expect(response.status).toBe(401);
      expect(response.headers.get('www-authenticate')).toBe(RO_MISSING_CHALLENGE);
      expect(response.headers.get('cache-control')).toBe('no-store');
      expect(await response.json()).toEqual({
        error: 'invalid_token',
        error_description: expect.any(String),
      });
      expect(probes()).toHaveLength(0);
    },
  );

  it('answers 401 invalid_token with the read-only hint for a dead key on tools/call', async () => {
    const response = await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_dead' }, '/read-only/');
    expect(response.status).toBe(401);
    expect(response.headers.get('www-authenticate')).toBe(RO_DEAD_KEY_CHALLENGE);
    await response.json();
    expect(probes()).toHaveLength(1);
  });

  it.each([PRM_RO_PATH, `${PRM_RO_PATH}/`])(
    'serves GET %s naming the read-only resource',
    async (prmPath) => {
      const response = await fetch(new URL(prmPath, baseUrl));
      expect(response.status).toBe(200);
      expect(response.headers.get('cache-control')).toBe('public, max-age=300');
      expect(response.headers.get('access-control-allow-origin')).toBe('*');
      expect(await response.json()).toEqual(EXPECTED_RO_METADATA);
    },
  );

  it('answers the CORS preflight on the read-only metadata path', async () => {
    const response = await fetch(new URL(PRM_RO_PATH, baseUrl), {
      method: 'OPTIONS',
      headers: { Origin: 'https://claude.ai', 'Access-Control-Request-Method': 'GET' },
    });
    expect(response.status).toBe(204);
    expect(response.headers.get('access-control-allow-origin')).toBe('*');
  });

  it('answers GET and DELETE on /read-only with 405', async () => {
    const get = await fetch(new URL('/read-only', baseUrl));
    expect(get.status).toBe(405);
    await get.json();
    const del = await fetch(new URL('/read-only/', baseUrl), { method: 'DELETE' });
    expect(del.status).toBe(405);
    await del.json();
  });

  it('derives the production read-only URLs from the defaults', async () => {
    await withEnv('CONDUCTOR_MCP_OAUTH_AUTHORIZATION_SERVER_URL', undefined, () =>
      withEnv('CONDUCTOR_MCP_OAUTH_RESOURCE_URL', undefined, async () => {
        const metadata = await fetchMetadata(PRM_RO_PATH);
        expect(metadata['resource']).toBe('https://mcp.conductor.is/read-only');
        expect(metadata['authorization_servers']).toEqual(['https://dashboard.conductor.is']);
        const response = await post(INITIALIZE, {}, '/read-only');
        expect(response.status).toBe(401);
        expect(response.headers.get('www-authenticate')).toBe(
          'Bearer resource_metadata="https://mcp.conductor.is/.well-known/oauth-protected-resource/read-only"',
        );
        await response.json();
      }),
    );
  });

  it.each(['http://rs.test'])('derives http://rs.test/read-only from the root %s', async (root) => {
    await withEnv('CONDUCTOR_MCP_OAUTH_RESOURCE_URL', root, async () => {
      expect((await fetchMetadata(PRM_RO_PATH))['resource']).toBe('http://rs.test/read-only');
      expect((await fetchMetadata())['resource']).toBe(root);
      const response = await post(INITIALIZE, {}, '/read-only');
      expect(response.headers.get('www-authenticate')).toBe(RO_MISSING_CHALLENGE);
      await response.json();
    });
  });

  const loosening: Array<[string, Record<string, string>]> = [
    ['no permissions header', {}],
    ['{"allow_http_gets":false}', { 'x-stainless-mcp-client-permissions': '{"allow_http_gets":false}' }],
    ['{"allowed_methods":[".*"]}', { 'x-stainless-mcp-client-permissions': '{"allowed_methods":[".*"]}' }],
    ['{}', { 'x-stainless-mcp-client-permissions': '{}' }],
    [
      'a malformed header (replaced, not 400)',
      { 'x-stainless-mcp-client-permissions': '{allow_http_gets:false}' },
    ],
  ];
  it.each(loosening)('blocks a write in execute on /read-only/ with %s', async (_name, headers) => {
    const response = await post(
      EXECUTE_WRITE,
      { Authorization: 'Bearer sk_conductor_live', ...headers },
      '/read-only/',
    );
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toContain(BLOCKED_MESSAGE);
    expect(text).toContain('"isError":true');
    expect(probes()).toHaveLength(1); // the tools/call key probe runs on this path too
  });

  it('blocks the same write on / only when the client asks for it', async () => {
    const asked = await post(EXECUTE_WRITE, {
      Authorization: 'Bearer sk_conductor_live',
      'x-stainless-mcp-client-permissions': '{"allow_http_gets":true}',
    });
    expect(await asked.text()).toContain(BLOCKED_MESSAGE);
  });
});

describe('structured log lines', () => {
  let written: string[] = [];
  let stderrWrite: jest.SpyInstance;

  beforeAll(() => {
    // The logger writes JSON lines to process.stderr; capturing at the stream shows exactly what Render
    // sees, including pino-http's request lines with their redacted headers.
    configureLogger({ level: 'info', pretty: false });
    stderrWrite = jest.spyOn(process.stderr, 'write').mockImplementation((chunk: unknown) => {
      written.push(String(chunk));
      return true;
    });
  });

  afterAll(() => {
    stderrWrite.mockRestore();
    configureLogger({ level: 'fatal', pretty: false });
  });

  beforeEach(() => {
    written = [];
  });

  function lines(): Array<Record<string, unknown>> {
    return written
      .join('')
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => JSON.parse(line) as Record<string, unknown>);
  }

  it('logs the gate rejection for a missing credential under the session id the response carries', async () => {
    const response = await post(INITIALIZE);
    await response.json();
    // No mcp-session-id was sent, so this is the UUID http.ts generated; the gate line must carry the
    // same value as pino-http's request line or the 401 cannot be explained from Render logs.
    const mcpSessionId = response.headers.get('mcp-session-id');

    expect(mcpSessionId).toEqual(expect.any(String));
    expect(lines()).toContainEqual(
      expect.objectContaining({ level: 'warn', oauthGate: 'missing', mcpSessionId }),
    );
  });

  it('logs the gate rejection for a non-Bearer scheme', async () => {
    await (await post(INITIALIZE, { Authorization: 'Basic abc' })).json();

    expect(lines()).toContainEqual(expect.objectContaining({ level: 'warn', oauthGate: 'invalid_scheme' }));
  });

  it('logs the probe verdict before the dead-key rejection, never the key', async () => {
    await (await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_dead' })).json();

    const all = lines();
    const probeIndex = all.findIndex(
      (line) => (line['keyProbe'] as { verdict?: string } | undefined)?.verdict === 'invalid',
    );
    const gateIndex = all.findIndex((line) => line['oauthGate'] === 'dead_key');
    expect(probeIndex).toBeGreaterThanOrEqual(0);
    expect(gateIndex).toBeGreaterThan(probeIndex);
    expect(all[probeIndex]).toEqual(
      expect.objectContaining({
        level: 'info',
        keyProbe: {
          verdict: 'invalid',
          status: 401,
          ms: expect.any(Number),
          contentType: 'application/json',
          cfRay: 'ray-test',
          conductorRequestId: 'req_test',
        },
      }),
    );
    expect(written.join('')).not.toContain('sk_conductor_');
  });

  it('warns on an unknown verdict with the status and media type of the edge response', async () => {
    await (await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_edge403' })).text();

    expect(lines()).toContainEqual(
      expect.objectContaining({
        level: 'warn',
        keyProbe: expect.objectContaining({ verdict: 'unknown', status: 403, contentType: 'text/html' }),
      }),
    );
    expect(written.join('')).not.toContain('sk_conductor_');
  });

  it('warns with the error when the probe request itself fails', async () => {
    await withEnv('CONDUCTOR_BASE_URL', 'http://127.0.0.1:1/v1', async () => {
      await (await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_dead' })).text();
    });

    expect(lines()).toContainEqual(
      expect.objectContaining({
        level: 'warn',
        keyProbe: expect.objectContaining({ verdict: 'unknown', status: null, error: expect.any(String) }),
      }),
    );
    expect(written.join('')).not.toContain('sk_conductor_');
  });

  it('forces allow_http_gets on the read-only path whatever the client sent, and never on the root', async () => {
    await (
      await post(
        INITIALIZE,
        {
          Authorization: 'Bearer sk_conductor_live',
          'x-stainless-mcp-client-permissions': '{"allow_http_gets":false,"allowed_methods":[".*"]}',
        },
        '/read-only',
      )
    ).text();
    const forced = lines().filter((line) => 'clientPermissions' in line);
    expect(forced).toEqual([expect.objectContaining({ clientPermissions: { allow_http_gets: true } })]);

    written = [];
    await (await post(INITIALIZE, { Authorization: 'Bearer sk_conductor_live' })).text();
    expect(lines().some((line) => 'clientPermissions' in line)).toBe(false);
  });
});

// Answers GET /v1/end-users/end_usr_oauth_probe the way api.conductor.is (behind Cloudflare) can.
function mockConductorApi(req: http.IncomingMessage, res: http.ServerResponse): void {
  apiRequests.push({ path: req.url ?? '', headers: req.headers });
  const answer = (status: number, body: string, contentType = 'application/json; charset=utf-8') => {
    res.writeHead(status, {
      'content-type': contentType,
      'cf-ray': 'ray-test',
      'conductor-request-id': 'req_test',
    });
    res.end(body);
  };
  const envelope = (code: string) =>
    JSON.stringify({ error: { code, message: `${code} from the mock API` } });
  if (req.url !== PROBE_PATH) return answer(404, envelope('ROUTE_NOT_FOUND'));
  switch ((req.headers.authorization ?? '').replace(/^Bearer /, '')) {
    case 'sk_conductor_live':
      return answer(404, envelope('RESOURCE_MISSING'));
    case 'sk_conductor_dead':
      return answer(401, envelope('API_KEY_INVALID'));
    case 'sk_conductor_publishable':
      return answer(403, envelope('SECRET_KEY_REQUIRED'));
    case 'sk_conductor_edge403':
      return answer(
        403,
        '<!DOCTYPE html><title>Attention Required! | Cloudflare</title>',
        'text/html; charset=UTF-8',
      );
    case 'sk_conductor_edge401':
      return answer(401, '<!DOCTYPE html><title>Cloudflare Access</title>', 'text/html; charset=UTF-8');
    case 'sk_conductor_othercode':
      return answer(401, envelope('RESOURCE_MISSING'));
    case 'sk_conductor_flaky':
      return answer(503, 'Service Unavailable', 'text/plain; charset=utf-8');
    default:
      return answer(401, envelope('API_KEY_INVALID'));
  }
}

function listen(s: http.Server): Promise<string> {
  return new Promise((resolve) =>
    s.listen(0, '127.0.0.1', () => resolve(`http://127.0.0.1:${(s.address() as AddressInfo).port}`)),
  );
}

function close(s: http.Server): Promise<void> {
  return new Promise((resolve) => s.close(() => resolve()));
}

function post(body: unknown, headers: Record<string, string> = {}, path = '/'): Promise<Response> {
  return fetch(new URL(path, baseUrl), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

async function fetchMetadata(prmPath = PRM_PATH): Promise<Record<string, unknown>> {
  return (await (await fetch(new URL(prmPath, baseUrl))).json()) as Record<string, unknown>;
}

function probes(): RecordedRequest[] {
  return apiRequests.filter((request) => request.path === PROBE_PATH);
}

// Config is read per request, so an env change takes effect on the next POST without restarting the app.
async function withEnv(name: string, value: string | undefined, run: () => Promise<void>): Promise<void> {
  const previous = process.env[name];
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
  try {
    await run();
  } finally {
    if (previous === undefined) delete process.env[name];
    else process.env[name] = previous;
  }
}
