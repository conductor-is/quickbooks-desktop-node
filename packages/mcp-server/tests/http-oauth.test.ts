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
import { clearValidKeyCache } from '../src/oauth';

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
const RS_METADATA_URL = 'https://mcp.conductor.is/.well-known/oauth-protected-resource';
const MISSING_CHALLENGE = `Bearer resource_metadata="${RS_METADATA_URL}"`;
const SCHEME_CHALLENGE = `Bearer error="invalid_request", error_description="The Authorization header must be the word Bearer, a space, and your Conductor secret key", resource_metadata="${RS_METADATA_URL}"`;
const DEAD_KEY_CHALLENGE = `Bearer error="invalid_token", error_description="This Conductor key is invalid or was deleted. Sign in again, or create a new key on the MCP tab in the Conductor Dashboard", resource_metadata="${RS_METADATA_URL}"`;
const EXPECTED_METADATA = {
  resource: 'https://mcp.conductor.is/',
  authorization_servers: ['https://dashboard.conductor.is'],
  bearer_methods_supported: ['header'],
  resource_name: 'Conductor MCP server',
  resource_documentation: 'https://docs.conductor.is/usage/mcp',
};
const PRM_RO_PATH = '/.well-known/oauth-protected-resource/read-only';
const RS_RO_METADATA_URL = 'https://mcp.conductor.is/.well-known/oauth-protected-resource/read-only';
const RO_MISSING_CHALLENGE = `Bearer resource_metadata="${RS_RO_METADATA_URL}"`;
const RO_DEAD_KEY_CHALLENGE = `Bearer error="invalid_token", error_description="This Conductor key is invalid or was deleted. Sign in again, or create a new key on the MCP tab in the Conductor Dashboard", resource_metadata="${RS_RO_METADATA_URL}"`;
const EXPECTED_RO_METADATA = { ...EXPECTED_METADATA, resource: 'https://mcp.conductor.is/read-only' };
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
const ENV_NAMES = ['CONDUCTOR_BASE_URL', 'CONDUCTOR_MCP_KEY_PROBE'];

type RecordedRequest = { path: string; headers: http.IncomingHttpHeaders };
const apiRequests: RecordedRequest[] = [];

let api: http.Server;
let server: http.Server;
let baseUrl: string;

beforeAll(async () => {
  configureLogger({ level: 'fatal', pretty: false });
  api = http.createServer(mockConductorApi);
  process.env['CONDUCTOR_BASE_URL'] = `${await listen(api)}/v1`;
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
  clearValidKeyCache();
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

  it('names the empty x-conductor-secret-key header instead of the Authorization header', async () => {
    const response = await post(INITIALIZE, { 'x-conductor-secret-key': '' });

    expect(response.status).toBe(401);
    expect(response.headers.get('www-authenticate')).toContain(
      'error_description="The x-conductor-secret-key header is empty. Set it to your Conductor secret key"',
    );
  });

  it('treats an empty Authorization header as absent, like the generated parser', async () => {
    const response = await post(TOOLS_CALL, {
      Authorization: '',
      'x-conductor-secret-key': 'sk_conductor_live',
    });

    expect(response.status).toBe(200);
    expect(await response.text()).toContain('Unknown tool: nope');
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

  it('tells a publishable key to use a secret key', async () => {
    const response = await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_publishable' });

    expect(response.status).toBe(401);
    expect(response.headers.get('www-authenticate')).toContain(
      'error_description="This is a Conductor publishable key. Use a secret key instead"',
    );
  });

  it('probes again once a cached valid verdict is a minute old', async () => {
    await (await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_live' })).text();
    const later = Date.now() + 61_000;
    const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(later);
    try {
      await (await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_live' })).text();
    } finally {
      nowSpy.mockRestore();
    }
    expect(probes()).toHaveLength(2);
  });

  it('shares one probe between parallel calls with the same uncached key', async () => {
    await Promise.all(
      [1, 2, 3].map(async () =>
        (await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_slow' })).text(),
      ),
    );
    expect(probes()).toHaveLength(1);
  });

  it('reuses a valid verdict for later calls, but never an invalid one', async () => {
    await (await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_live' })).text();
    await (await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_live' })).text();
    expect(probes()).toHaveLength(1);

    expect((await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_dead' })).status).toBe(401);
    expect((await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_dead' })).status).toBe(401);
    expect(probes()).toHaveLength(3);
  });

  it('never probes a search_docs call, which does not contact the API', async () => {
    const searchDocs = {
      jsonrpc: '2.0',
      id: 5,
      method: 'tools/call',
      params: { name: 'search_docs', arguments: { query: 'create invoice', language: 'typescript' } },
    };
    const response = await post(searchDocs, { Authorization: 'Bearer sk_conductor_dead' });

    expect(response.status).toBe(200);
    await response.text();
    expect(probes()).toHaveLength(0);
  });

  it.each(['off', 'OFF', ' false ', '0', 'no'])(
    'skips the probe entirely when CONDUCTOR_MCP_KEY_PROBE=%j',
    async (value) => {
      await withEnv('CONDUCTOR_MCP_KEY_PROBE', value, async () => {
        const response = await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_dead' });
        expect(response.status).toBe(200);
        await response.text();
      });
      expect(probes()).toHaveLength(0);
    },
  );
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

  const loosening: Array<[string, Record<string, string>]> = [
    ['no permissions header', {}],
    ['{"allow_http_gets":false}', { 'x-stainless-mcp-client-permissions': '{"allow_http_gets":false}' }],
    ['{"allowed_methods":[".*"]}', { 'x-stainless-mcp-client-permissions': '{"allowed_methods":[".*"]}' }],
    ['{}', { 'x-stainless-mcp-client-permissions': '{}' }],
    [
      '{"allow_http_gets":true,"allowed_methods":[".*"]}',
      { 'x-stainless-mcp-client-permissions': '{"allow_http_gets":true,"allowed_methods":[".*"]}' },
    ],
    [
      'an allowed_methods that matches no GET',
      { 'x-stainless-mcp-client-permissions': '{"allowed_methods":["qbd\\\\.invoices\\\\.create"]}' },
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

  it.each(['{allow_http_gets:false}', '{"blocked_methods":["("]}'])(
    'refuses the malformed header %s on /read-only/ with the same 400 as on the root',
    async (permissions) => {
      const response = await post(
        INITIALIZE,
        { Authorization: 'Bearer sk_conductor_live', 'x-stainless-mcp-client-permissions': permissions },
        '/read-only/',
      );
      expect(response.status).toBe(400);
      expect(await response.text()).toContain('Invalid x-stainless-mcp-client-permissions header');
    },
  );

  it('keeps a client allowed_methods narrowing on /read-only/, so other reads stay blocked', async () => {
    const response = await post(
      {
        ...EXECUTE_WRITE,
        params: {
          name: 'execute',
          arguments: { code: 'async function run(conductor) { return conductor.endUsers.list(); }' },
        },
      },
      {
        Authorization: 'Bearer sk_conductor_live',
        'x-stainless-mcp-client-permissions': '{"allowed_methods":["qbd\\\\.invoices"]}',
      },
      '/read-only/',
    );
    expect(await response.text()).toContain('cannot be used in code execution: endUsers.list');
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
    // The logger writes JSON lines to process.stderr; capturing at the stream shows exactly what Render sees
    // from the gate and the probe. pino-http's request lines are not captured: it bound the fatal-level
    // logger when the app was built in the top-level beforeAll.
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
          code: 'API_KEY_INVALID',
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

  it('warns instead of passing the key when the probe route answers a 404 that is not RESOURCE_MISSING', async () => {
    const movedBaseUrl = process.env['CONDUCTOR_BASE_URL']!.replace(/\/v1$/, '/moved/v1');
    await withEnv('CONDUCTOR_BASE_URL', movedBaseUrl, async () => {
      const response = await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_dead' });
      expect(response.status).toBe(200); // fails open
      await response.text();
    });

    expect(lines()).toContainEqual(
      expect.objectContaining({
        level: 'warn',
        keyProbe: expect.objectContaining({ verdict: 'unknown', status: 404 }),
      }),
    );
  });

  it('warns instead of passing the key when the probe route answers a 2xx', async () => {
    const response = await post(TOOLS_CALL, { Authorization: 'Bearer sk_conductor_ok200' });
    expect(response.status).toBe(200); // fails open
    await response.text();

    expect(lines()).toContainEqual(
      expect.objectContaining({
        level: 'warn',
        keyProbe: expect.objectContaining({ verdict: 'unknown', status: 200 }),
      }),
    );
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

  it('keeps a client blocked_methods on the read-only path, and drops what could loosen it', async () => {
    await (
      await post(
        INITIALIZE,
        {
          Authorization: 'Bearer sk_conductor_live',
          'x-stainless-mcp-client-permissions':
            '{"allow_http_gets":false,"blocked_methods":["qbd\\\\.employees"]}',
        },
        '/read-only',
      )
    ).text();
    const forced = lines().filter((line) => 'clientPermissions' in line);
    expect(forced).toEqual([
      expect.objectContaining({
        clientPermissions: { allow_http_gets: true, blocked_methods: ['qbd\\.employees'] },
      }),
    ]);
  });

  it('replaces a client allowed_methods on the read-only path with the exact GETs it matches', async () => {
    await (
      await post(
        INITIALIZE,
        {
          Authorization: 'Bearer sk_conductor_live',
          'x-stainless-mcp-client-permissions': '{"allowed_methods":["qbd\\\\.invoices"]}',
        },
        '/read-only',
      )
    ).text();
    const forced = lines().filter((line) => 'clientPermissions' in line);
    expect(forced).toEqual([
      expect.objectContaining({
        clientPermissions: {
          allow_http_gets: false,
          allowed_methods: ['^qbd\\.invoices\\.retrieve$', '^qbd\\.invoices\\.list$'],
        },
      }),
    ]);
  });

  it('forces allow_http_gets on the read-only path for a client that limited nothing, and never on the root', async () => {
    await (
      await post(
        INITIALIZE,
        {
          Authorization: 'Bearer sk_conductor_live',
          'x-stainless-mcp-client-permissions': '{"allow_http_gets":false}',
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
    case 'sk_conductor_slow':
      setTimeout(() => answer(404, envelope('RESOURCE_MISSING')), 200);
      return;
    case 'sk_conductor_ok200':
      return answer(200, JSON.stringify({ id: 'end_usr_oauth_probe' }));
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
