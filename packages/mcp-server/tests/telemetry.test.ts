// Conductor patch: the execute tool's per-call telemetry and the OAuth gate's rejection fields
// (src/telemetry.ts, src/oauth.ts). Nothing here needs Deno or the network.
import { codeTool } from '../src/code-tool';
import { configureLogger } from '../src/logger';
import { authorizationShape } from '../src/oauth';
import {
  CLIENT_CLOSED_MESSAGE,
  abortOnClientCloseEnabled,
  agentErrorFormattingEnabled,
  classifyExecuteError,
  executeTelemetryHeaders,
  rpcMethodProps,
  sanitizeUserAgent,
} from '../src/telemetry';

beforeAll(() => configureLogger({ level: 'fatal', pretty: false }));

describe('sanitizeUserAgent', () => {
  test('keeps printable ASCII, drops the rest, cuts to the limit, and omits empty values', () => {
    expect(sanitizeUserAgent('Claude-User')).toBe('Claude-User');
    // A non-ASCII byte in a header value makes fetch throw on every request of the call.
    expect(sanitizeUserAgent('Cursor/1.0.0 é中文 \u0007x')).toBe('Cursor/1.0.0  x');
    expect(sanitizeUserAgent('a'.repeat(300))).toHaveLength(120);
    expect(sanitizeUserAgent('a'.repeat(300), 100)).toHaveLength(100);
    expect(sanitizeUserAgent('   ')).toBeUndefined();
    expect(sanitizeUserAgent(undefined)).toBeUndefined();
    expect(sanitizeUserAgent(['a', 'b'])).toBeUndefined();
  });
});

describe('executeTelemetryHeaders', () => {
  test('always the call id; the session id and client only when present', () => {
    expect(executeTelemetryHeaders({ callId: 'c1', mcpSessionId: 's1', userAgent: 'undici' })).toEqual({
      'Conductor-MCP-Call-Id': 'c1',
      'Conductor-MCP-Session-Id': 's1',
      'Conductor-MCP-Client': 'undici',
    });
    expect(executeTelemetryHeaders({ callId: 'c2', mcpSessionId: undefined, userAgent: 'é' })).toEqual({
      'Conductor-MCP-Call-Id': 'c2',
    });
    // None of the names matches the API logger's redaction patterns, which would hide them from Better Stack.
    for (const name of Object.keys(
      executeTelemetryHeaders({ callId: 'c', mcpSessionId: 's', userAgent: 'u' }),
    )) {
      expect(name).not.toMatch(/token|secret|password|credential|authorization|cookie|key/i);
    }
  });
});

describe('rpcMethodProps', () => {
  test('method, tool name for tools/call, batch for arrays, nothing otherwise', () => {
    expect(rpcMethodProps({ jsonrpc: '2.0', method: 'initialize' })).toEqual({ rpcMethod: 'initialize' });
    expect(
      rpcMethodProps({ method: 'tools/call', params: { name: 'execute', arguments: { code: 'x' } } }),
    ).toEqual({
      rpcMethod: 'tools/call',
      tool: 'execute',
    });
    expect(rpcMethodProps([{ method: 'a' }, { method: 'b' }])).toEqual({ rpcMethod: 'batch' });
    expect(rpcMethodProps(undefined)).toEqual({});
    expect(rpcMethodProps({ method: 42 })).toEqual({});
    expect(rpcMethodProps({ method: 'x'.repeat(200) }).rpcMethod).toHaveLength(64);
  });
});

describe('classifyExecuteError', () => {
  const result = (text: string) => ({ content: [{ type: 'text' as const, text }], isError: true });
  test('fixed labels, never the text', () => {
    expect(classifyExecuteError(result('The following methods have been blocked by the MCP server'))).toBe(
      'blocked_method',
    );
    expect(classifyExecuteError(result(CLIENT_CLOSED_MESSAGE))).toBe('client_closed');
    expect(classifyExecuteError(result('Code execution timed out after 300 seconds.'))).toBe('timeout');
    expect(classifyExecuteError(result('Deno is required for code execution'))).toBe('no_deno');
    expect(classifyExecuteError(result('The code is missing a top-level `run` function.'))).toBe(
      'no_run_function',
    );
    expect(classifyExecuteError(result('The code contains TypeScript diagnostics:\n- x'))).toBe(
      'ts_diagnostics',
    );
    expect(
      classifyExecuteError(
        result('NotFoundError: RESOURCE_MISSING: No such end-user (HTTP 404, request r)\nhint'),
      ),
    ).toBe('api_error:RESOURCE_MISSING');
    expect(classifyExecuteError(result('NotFoundError: 404 {"error":{"code":"RESOURCE_MISSING"}}'))).toBe(
      'api_error',
    );
    expect(classifyExecuteError(result('TypeError: Cannot read properties of undefined\n  at line 3'))).toBe(
      'runtime_error',
    );
    expect(classifyExecuteError(result('Error output:\nsomething'))).toBe('runtime_error');
    expect(classifyExecuteError({ content: [], isError: true })).toBe('unknown');
  });
});

describe('kill switches', () => {
  const names = ['CONDUCTOR_MCP_ABORT_ON_CLOSE', 'CONDUCTOR_MCP_AGENT_ERRORS'];
  const saved: Record<string, string | undefined> = {};
  beforeEach(() => names.forEach((n) => (saved[n] = process.env[n])));
  afterEach(() =>
    names.forEach((n) => {
      if (saved[n] === undefined) delete process.env[n];
      else process.env[n] = saved[n];
    }),
  );
  test('on unless set to off, false, 0 or no', () => {
    delete process.env['CONDUCTOR_MCP_ABORT_ON_CLOSE'];
    delete process.env['CONDUCTOR_MCP_AGENT_ERRORS'];
    expect(abortOnClientCloseEnabled()).toBe(true);
    expect(agentErrorFormattingEnabled()).toBe(true);
    process.env['CONDUCTOR_MCP_ABORT_ON_CLOSE'] = ' OFF ';
    process.env['CONDUCTOR_MCP_AGENT_ERRORS'] = '0';
    expect(abortOnClientCloseEnabled()).toBe(false);
    expect(agentErrorFormattingEnabled()).toBe(false);
    process.env['CONDUCTOR_MCP_AGENT_ERRORS'] = 'anything else';
    expect(agentErrorFormattingEnabled()).toBe(true);
  });
});

describe('authorizationShape', () => {
  test('labels the defect, never the value', () => {
    expect(authorizationShape('Bearer')).toBe('empty_bearer');
    expect(authorizationShape('Bearer ')).toBe('empty_bearer');
    expect(authorizationShape('bearer   ')).toBe('empty_bearer');
    expect(authorizationShape('Basic dXNlcjpwYXNz')).toBe('scheme:basic');
    expect(authorizationShape('Token sk_conductor_abc')).toBe('scheme:token');
    expect(authorizationShape('sk_conductor_abc def')).toBe('scheme:other');
    expect(authorizationShape('sk_conductor_abcdef')).toBe('no_scheme:sk_conductor_');
    expect(authorizationShape('abcdef')).toBe('no_scheme:other');
    for (const value of ['Basic dXNlcjpwYXNz', 'sk_conductor_abcdef', 'Token sk_conductor_abc']) {
      expect(authorizationShape(value)).not.toContain('abc');
    }
  });
});

describe('execute tool: a client that already closed its connection', () => {
  test('returns the client-closed error without spawning a worker', async () => {
    const controller = new AbortController();
    controller.abort();
    const tool = codeTool({ blockedMethods: undefined, codeExecutionMode: 'local' });
    const started = Date.now();
    const result = await tool.handler({
      reqContext: {
        client: { baseURL: 'http://api.invalid/v1', apiKey: 'sk_conductor_test' } as any,
        signal: controller.signal,
        mcpSessionId: 'sess',
        userAgent: 'test-client',
      },
      args: { code: 'async function run(conductor) { return 1; }' },
    });
    expect(result.isError).toBe(true);
    expect(result.content[0]).toEqual({ type: 'text', text: CLIENT_CLOSED_MESSAGE });
    // No Deno lookup, no worker: well under the time a spawn would take.
    expect(Date.now() - started).toBeLessThan(500);
  });
});
