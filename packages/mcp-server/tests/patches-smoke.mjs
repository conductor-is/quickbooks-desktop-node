// Conductor smoke test for the execute-tool patches of 2026-10-30 (src/telemetry.ts, src/agent-errors.ts,
// the abort racer in src/code-tool.ts). Boots the built package as the hosted server, as execute-smoke.mjs
// does, with CONDUCTOR_BASE_URL pointed at a mock API that records request headers and answers every call
// with a Web Connector password error envelope. Then: (1) an execute whose code sleeps for 60 s is
// abandoned by the client after 2 s and must stop within a few seconds (one result line at warn carrying abortedBy); (2) a follow-up execute that calls
// the API must reach the mock with the Conductor-MCP-Call-Id header and must return the rewritten,
// one-line error with its hint. Not a jest test: requires a built dist/ and a real Deno binary.
// Usage: cd packages/mcp-server && node tests/patches-smoke.mjs
import { spawn } from 'node:child_process';
import http from 'node:http';
import { createServer } from 'node:net';

async function freePort() {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.on('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
  });
}

const apiRequests = [];
const api = http.createServer((req, res) => {
  apiRequests.push({ url: req.url, headers: req.headers });
  res.writeHead(401, {
    'content-type': 'application/json',
    'conductor-request-id': 'req_smoke',
    'x-should-retry': 'false',
  });
  res.end(
    JSON.stringify({
      error: {
        message: 'Your Web Connector password is incorrect.',
        userFacingMessage: 'Your Web Connector password is incorrect.',
        type: 'INTEGRATION_CONNECTION_ERROR',
        code: 'QBD_WEB_CONNECTOR_PASSWORD_INVALID',
        httpStatusCode: 401,
      },
    }),
  );
});
const apiPort = await freePort();
await new Promise((resolve) => api.listen(apiPort, '127.0.0.1', resolve));

const port = await freePort();
let done = false;
const logs = [];
function fail(message) {
  console.log(`PATCHES SMOKE FAILED: ${message}`);
  done = true;
  upstream.kill();
  api.close();
  process.exit(1);
}

const upstream = spawn('node', ['dist/index.js', '--transport=http', `--port=${port}`], {
  env: {
    ...process.env,
    CONDUCTOR_MCP_KEY_PROBE: 'off',
    CONDUCTOR_BASE_URL: `http://127.0.0.1:${apiPort}/v1`,
  },
  stdio: ['ignore', 'inherit', 'pipe'],
});
upstream.stderr.on('data', (chunk) => {
  logs.push(chunk.toString());
});
upstream.on('exit', (code) => {
  if (!done) fail(`http server exited early with code ${code}`);
});

const url = `http://127.0.0.1:${port}/`;
const headers = {
  'content-type': 'application/json',
  accept: 'application/json, text/event-stream',
  authorization: 'Bearer sk_conductor_smoke',
  'mcp-session-id': 'smoke-session',
  'user-agent': 'patches-smoke/1 é',
};
for (let i = 0; i < 50; i++) {
  try {
    if ((await fetch(`http://127.0.0.1:${port}/health`)).ok) break;
  } catch {}
  await new Promise((r) => setTimeout(r, 200));
}

function toolsCall(code, signal) {
  return fetch(url, {
    method: 'POST',
    headers,
    signal,
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: { name: 'execute', arguments: { code } },
    }),
  });
}

// (1) Abandoned call.
const controller = new AbortController();
const started = Date.now();
const longCall = toolsCall(
  'async function run(conductor) { await new Promise((r) => setTimeout(r, 60000)); return 1; }',
  controller.signal,
).catch(() => undefined);
setTimeout(() => controller.abort(), 2000);
await longCall;
for (let i = 0; i < 50 && !logs.join('').includes('"abortedBy":"client_closed"'); i++) {
  await new Promise((r) => setTimeout(r, 200));
}
const abortedAfterMs = Date.now() - started;
if (!logs.join('').includes('"abortedBy":"client_closed"'))
  fail('no result line with abortedBy client_closed within 12 s of the disconnect');
if (abortedAfterMs > 8000) fail(`abort took ${abortedAfterMs} ms`);

// (2) An API error inside the sandbox, as the model sees it, plus the telemetry headers at the API.
const response = await toolsCall(
  "async function run(conductor) { return conductor.qbd.accounts.list({ conductorEndUserId: 'end_usr_x' }); }",
);
const text = await response.text();
// The worker prints `${error.name}: ${error.message}`, and the SDK's error classes leave name as 'Error'.
const expectedHead =
  'Error: QBD_WEB_CONNECTOR_PASSWORD_INVALID: Your Web Connector password is incorrect. (HTTP 401, request req_smoke)';
if (!text.includes(expectedHead)) fail(`rewritten error not found in: ${text.slice(0, 600)}`);
if (!text.includes('do not reconnect the AI tool')) fail(`hint not found in: ${text.slice(0, 600)}`);
if (text.includes('userFacingMessage')) fail('the raw JSON body leaked into the result');
const apiCall = apiRequests.find((r) => r.url.includes('/accounts'));
if (!apiCall) fail(`mock API saw no accounts request: ${JSON.stringify(apiRequests.map((r) => r.url))}`);
const h = apiCall.headers;
if (!/^[0-9a-f-]{36}$/.test(h['conductor-mcp-call-id'] ?? ''))
  fail(`bad call id header: ${h['conductor-mcp-call-id']}`);
if (h['conductor-mcp-session-id'] !== 'smoke-session')
  fail(`bad session header: ${h['conductor-mcp-session-id']}`);
if (h['conductor-mcp-client'] !== 'patches-smoke/1')
  fail(`client header not sanitized: ${h['conductor-mcp-client']}`);
if (h['x-stainless-mcp'] !== 'true') fail('x-stainless-mcp header missing');
const resultLine = logs
  .join('')
  .split('\n')
  .find((l) => l.includes('Got code tool execution result') && l.includes(h['conductor-mcp-call-id']));
if (!resultLine) fail('no result line carrying the call id');
if (!resultLine.includes('"errorKind":"api_error:QBD_WEB_CONNECTOR_PASSWORD_INVALID"'))
  fail(`result line lacks errorKind: ${resultLine}`);

console.log(
  `PATCHES SMOKE PASSED: abort ${abortedAfterMs} ms after start (client left at 2000 ms); rewritten error, hint, call id header and errorKind verified`,
);
done = true;
upstream.kill();
api.close();
process.exit(0);
