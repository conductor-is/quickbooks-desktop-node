// Drives the built stdio bridge (dist/index.js) as a child process, the way
// an MCP client does. Requires `yarn build` first (CI builds before jest).
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import type { AddressInfo } from 'node:net';
import path from 'node:path';

const entry = path.resolve(__dirname, '..', 'dist', 'index.js');
const SECRET_KEY = 'sk_conductor_bridge_test_secret_0123456789abcdef';

jest.setTimeout(30000);

type Run = { code: number | null; stdout: string; stderr: string };

function runBridge(
  env: Record<string, string>,
  args: string[] = [],
  drive?: (write: (line: string) => void, nextLine: () => Promise<string>) => Promise<void>,
): Promise<Run> {
  return new Promise((resolve, reject) => {
    // Start from a copy of the environment with no secret key at all, so the
    // "unset key" test really runs unset rather than empty.
    const { CONDUCTOR_SECRET_KEY: _unset, ...baseEnv } = process.env;
    const child = spawn(process.execPath, [entry, ...args], {
      env: { ...baseEnv, ...env },
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    let buffered = '';
    const waiters: Array<(line: string) => void> = [];
    const lines: string[] = [];
    child.stdout.on('data', (chunk: Buffer) => {
      stdout += chunk.toString();
      buffered += chunk.toString();
      let idx;
      while ((idx = buffered.indexOf('\n')) >= 0) {
        const line = buffered.slice(0, idx);
        buffered = buffered.slice(idx + 1);
        const waiter = waiters.shift();
        if (waiter) waiter(line);
        else lines.push(line);
      }
    });
    child.stderr.on('data', (chunk: Buffer) => (stderr += chunk.toString()));
    child.on('error', reject);
    child.on('close', (code) => resolve({ code, stdout, stderr }));
    const write = (line: string) => child.stdin.write(line + '\n');
    const nextLine = () =>
      new Promise<string>((res) => {
        const line = lines.shift();
        if (line !== undefined) res(line);
        else waiters.push(res);
      });
    (drive ? drive(write, nextLine) : Promise.resolve()).then(
      () => child.stdin.end(),
      (error) => {
        child.kill();
        reject(error);
      },
    );
  });
}

function serve(handler: http.RequestListener): Promise<{ url: string; close: () => void }> {
  return new Promise((resolve) => {
    const server = http.createServer(handler);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address() as AddressInfo;
      resolve({ url: `http://127.0.0.1:${port}/`, close: () => server.close() });
    });
  });
}

const initialize = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: { protocolVersion: '2025-03-26', capabilities: {}, clientInfo: { name: 'test', version: '0' } },
});

describe('stdio bridge', () => {
  beforeAll(() => {
    if (!fs.existsSync(entry)) {
      throw new Error(`${entry} is missing: run \`yarn build\` before the bridge tests`);
    }
  });

  test('refuses the docs placeholder key with one line pointing at the dashboard', async () => {
    const run = await runBridge({ CONDUCTOR_SECRET_KEY: 'sk_conductor_...' });
    expect(run.code).toBe(1);
    expect(run.stdout).toBe('');
    expect(run.stderr.trim().split('\n')).toHaveLength(1);
    expect(run.stderr).toContain('placeholder');
    expect(run.stderr).toContain('https://dashboard.conductor.is/');
  });

  test('refuses an unset key', async () => {
    const run = await runBridge({});
    expect(run.code).toBe(1);
    expect(run.stderr).toContain('CONDUCTOR_SECRET_KEY');
  });

  test('rejects http-only flags over stdio before contacting anything', async () => {
    const run = await runBridge({ CONDUCTOR_SECRET_KEY: SECRET_KEY }, ['--tools=code']);
    expect(run.code).toBe(1);
    expect(run.stderr).toContain('--tools');
    expect(run.stderr).toContain('--transport=http');
  });

  test('never writes the key to stderr or stdout, even while failing', async () => {
    const upstream = await serve((req, res) => {
      res.writeHead(500, { 'content-type': 'text/html; charset=utf-8' });
      res.end('<!DOCTYPE html><html><body><pre>Error: boom</pre></body></html>');
    });
    try {
      const run = await runBridge(
        { CONDUCTOR_SECRET_KEY: `Bearer ${SECRET_KEY}`, CONDUCTOR_MCP_URL: upstream.url },
        ['--debug', '--code-allow-http-gets'],
        async (write, nextLine) => {
          write(initialize);
          await nextLine();
        },
      );
      expect(run.code).toBe(0);
      expect(run.stderr).not.toContain(SECRET_KEY);
      expect(run.stdout).not.toContain(SECRET_KEY);
      expect(run.stderr).toContain('MCP bridge running on stdio');
    } finally {
      upstream.close();
    }
  });

  test('maps an upstream 5xx with an HTML body to a JSON-RPC error without the body', async () => {
    const seen: http.IncomingHttpHeaders[] = [];
    const upstream = await serve((req, res) => {
      seen.push(req.headers);
      res.writeHead(502, { 'content-type': 'text/html; charset=utf-8' });
      res.end('<!DOCTYPE html><html><body><pre>Bad Gateway</pre></body></html>');
    });
    try {
      const run = await runBridge(
        { CONDUCTOR_SECRET_KEY: SECRET_KEY, CONDUCTOR_MCP_URL: upstream.url },
        ['--code-allow-http-gets'],
        async (write, nextLine) => {
          write(initialize);
          const reply = JSON.parse(await nextLine());
          expect(reply).toEqual({
            jsonrpc: '2.0',
            id: 1,
            error: { code: -32000, message: expect.stringContaining('HTTP 502') },
          });
          expect(reply.error.data).toBeUndefined();
        },
      );
      expect(run.code).toBe(0);
      expect(seen).toHaveLength(1);
      expect(seen[0]?.['authorization']).toBe(`Bearer ${SECRET_KEY}`);
      // The initialize request already names the MCP client from its own clientInfo.
      expect(seen[0]?.['user-agent']).toMatch(/^conductor-mcp-bridge\/\d+\.\d+\.\d+ \(test\/0\)$/);
      expect(seen[0]?.['x-stainless-mcp-client-permissions']).toBe('{"allow_http_gets":true}');
    } finally {
      upstream.close();
    }
  });

  test('includes an upstream error body only when it is JSON', async () => {
    const upstream = await serve((req, res) => {
      res.writeHead(503, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: 'maintenance' }));
    });
    try {
      const run = await runBridge(
        { CONDUCTOR_SECRET_KEY: SECRET_KEY, CONDUCTOR_MCP_URL: upstream.url },
        [],
        async (write, nextLine) => {
          write(initialize);
          const reply = JSON.parse(await nextLine());
          expect(reply.error.code).toBe(-32000);
          expect(reply.error.message).toContain('HTTP 503');
          expect(reply.error.data).toEqual({ error: 'maintenance' });
        },
      );
      expect(run.code).toBe(0);
    } finally {
      upstream.close();
    }
  });

  test('answers a request with a JSON-RPC error when the upstream is unreachable', async () => {
    const closed = await serve(() => {});
    closed.close();
    const run = await runBridge(
      { CONDUCTOR_SECRET_KEY: SECRET_KEY, CONDUCTOR_MCP_URL: closed.url },
      [],
      async (write, nextLine) => {
        write(initialize);
        const reply = JSON.parse(await nextLine());
        expect(reply.id).toBe(1);
        expect(reply.error.code).toBe(-32000);
        expect(reply.error.message).toContain('Could not reach');
      },
    );
    expect(run.code).toBe(0);
  });

  test('names the MCP client in the User-Agent of every request, from the initialize clientInfo', async () => {
    const seen: Array<{ method: string; userAgent: string | undefined }> = [];
    const upstream = await serve((req, res) => {
      if (req.method !== 'POST') {
        res.writeHead(405).end();
        return;
      }
      let body = '';
      req.on('data', (chunk: Buffer) => (body += chunk.toString()));
      req.on('end', () => {
        const message = JSON.parse(body) as { id: number; method: string };
        seen.push({ method: message.method, userAgent: req.headers['user-agent'] });
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(
          JSON.stringify({
            jsonrpc: '2.0',
            id: message.id,
            result:
              message.method === 'initialize' ?
                {
                  protocolVersion: '2025-03-26',
                  capabilities: {},
                  serverInfo: { name: 'upstream', version: '0' },
                }
              : { tools: [] },
          }),
        );
      });
    });
    try {
      const run = await runBridge(
        { CONDUCTOR_SECRET_KEY: SECRET_KEY, CONDUCTOR_MCP_URL: upstream.url },
        [],
        async (write, nextLine) => {
          write(
            JSON.stringify({
              jsonrpc: '2.0',
              id: 1,
              method: 'initialize',
              params: {
                protocolVersion: '2025-03-26',
                capabilities: {},
                clientInfo: { name: 'claude-code', version: '2.1.325' },
              },
            }),
          );
          expect(JSON.parse(await nextLine()).id).toBe(1);
          write(JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/list' }));
          expect(JSON.parse(await nextLine())).toEqual({ jsonrpc: '2.0', id: 2, result: { tools: [] } });
        },
      );
      expect(run.code).toBe(0);
      expect(seen.map((request) => request.method)).toEqual(['initialize', 'tools/list']);
      for (const request of seen) {
        expect(request.userAgent).toMatch(/^conductor-mcp-bridge\/\d+\.\d+\.\d+ \(claude-code\/2\.1\.325\)$/);
      }
    } finally {
      upstream.close();
    }
  });

  // The hosted server matches the whole client name to choose a tool call's deadline, so a client's own
  // text must never change the header's shape or turn into another client's name.
  test.each([
    ['no clientInfo', undefined, ''],
    ['a name that is not a string', { name: 42 }, ''],
    ['a blank name', { name: '   ' }, ''],
    ['a name with no letter or digit', { name: 'é中' }, ''],
    ['a name and version', { name: 'Cursor', version: '1.0.0' }, ' (Cursor/1.0.0)'],
    ['a name alone', { name: 'claude-ai' }, ' (claude-ai)'],
    [
      'a plugin server name',
      { name: 'local-agent-mode-plugin:quickbooks-desktop:conductor', version: '1.0.0' },
      ' (local-agent-mode-plugin:quickbooks-desktop:conductor/1.0.0)',
    ],
    [
      'text that tries to close the parenthesis and add a product',
      { name: 'claude-code) evil/9 (x', version: '1 2/3' },
      ' (claude-code_evil_9_x/1_2_3)',
    ],
    ['a name that differs from a listed one only by a space', { name: 'Claude Code' }, ' (Claude_Code)'],
    ['a listed name with text around it', { name: ' claude-code ' }, ' (_claude-code_)'],
    ['an underscore of its own', { name: 'claude_code', version: '1' }, ' (claude_code/1)'],
    [
      'a name and version past the limits',
      { name: 'a'.repeat(200), version: '1'.repeat(200) },
      ` (${'a'.repeat(64)}/${'1'.repeat(16)})`,
    ],
  ])('User-Agent for %s', async (_case, clientInfo, expectedSuffix) => {
    const seen: Array<string | undefined> = [];
    const upstream = await serve((req, res) => {
      seen.push(req.headers['user-agent']);
      res.writeHead(502, { 'content-type': 'text/plain' });
      res.end('bad gateway');
    });
    try {
      const run = await runBridge(
        { CONDUCTOR_SECRET_KEY: SECRET_KEY, CONDUCTOR_MCP_URL: upstream.url },
        [],
        async (write, nextLine) => {
          write(
            JSON.stringify({
              jsonrpc: '2.0',
              id: 1,
              method: 'initialize',
              params: { protocolVersion: '2025-03-26', capabilities: {}, ...(clientInfo && { clientInfo }) },
            }),
          );
          await nextLine();
        },
      );
      expect(run.code).toBe(0);
      expect(seen).toHaveLength(1);
      const product = /^conductor-mcp-bridge\/\d+\.\d+\.\d+/.exec(seen[0] ?? '')?.[0];
      expect(product).toBeDefined();
      expect(seen[0]).toBe(`${product}${expectedSuffix}`);
      expect(seen[0]!.length).toBeLessThanOrEqual(120);
    } finally {
      upstream.close();
    }
  });

  test('closes the request the MCP client cancels, passes the cancel on and answers nothing for it', async () => {
    const events: string[] = [];
    let callClosedNow: (() => void) | undefined;
    const callClosed = new Promise<void>((resolve) => (callClosedNow = resolve));
    const upstream = await serve((req, res) => {
      let body = '';
      req.on('data', (chunk: Buffer) => (body += chunk.toString()));
      req.on('end', () => {
        const message = JSON.parse(body) as { id?: number; method: string; params?: { requestId?: number } };
        if (message.method === 'tools/call') {
          // Never answered: the server would still be running the tool.
          events.push('call received');
          res.on('close', () => {
            events.push(res.writableEnded ? 'call answered' : 'call connection closed');
            callClosedNow?.();
          });
          return;
        }
        if (message.method === 'notifications/cancelled') {
          events.push(`cancel notice for ${message.params?.requestId}`);
          res.writeHead(202).end();
          return;
        }
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(
          JSON.stringify({
            jsonrpc: '2.0',
            id: message.id,
            result:
              message.method === 'initialize' ?
                {
                  protocolVersion: '2025-03-26',
                  capabilities: {},
                  serverInfo: { name: 'upstream', version: '0' },
                }
              : { tools: [] },
          }),
        );
      });
    });
    try {
      const run = await runBridge(
        { CONDUCTOR_SECRET_KEY: SECRET_KEY, CONDUCTOR_MCP_URL: upstream.url },
        [],
        async (write, nextLine) => {
          write(initialize);
          expect(JSON.parse(await nextLine()).id).toBe(1);
          write(
            JSON.stringify({
              jsonrpc: '2.0',
              id: 2,
              method: 'tools/call',
              params: { name: 'execute', arguments: { code: 'x' } },
            }),
          );
          // Let the call reach the upstream before the client gives up on it.
          while (!events.includes('call received')) await new Promise((r) => setTimeout(r, 10));
          write(
            JSON.stringify({
              jsonrpc: '2.0',
              method: 'notifications/cancelled',
              params: { requestId: 2, reason: 'AbortError: remote-cancel' },
            }),
          );
          await callClosed;
          // The bridge still works, and the next line it writes is the answer to the next request.
          write(JSON.stringify({ jsonrpc: '2.0', id: 3, method: 'tools/list' }));
          expect(JSON.parse(await nextLine())).toEqual({ jsonrpc: '2.0', id: 3, result: { tools: [] } });
        },
      );
      expect(run.code).toBe(0);
      expect(events).toContain('call connection closed');
      expect(events).not.toContain('call answered');
      expect(events).toContain('cancel notice for 2');
      // Nothing was written for the cancelled request: no result and no "could not reach" error.
      const written = run.stdout
        .trim()
        .split('\n')
        .map((line) => JSON.parse(line) as { id?: number });
      expect(written.map((message) => message.id)).toEqual([1, 3]);
      expect(run.stderr).not.toContain('Upstream transport error');
    } finally {
      upstream.close();
    }
  });
});
