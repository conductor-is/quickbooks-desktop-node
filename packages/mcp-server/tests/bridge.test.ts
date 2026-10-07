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
      expect(seen[0]?.['user-agent']).toMatch(/^conductor-mcp-bridge\/\d+\.\d+\.\d+/);
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
});
