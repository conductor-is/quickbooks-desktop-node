// Conductor smoke test: boots the built package as the hosted server
// (`--transport=http`, exactly as Render runs it), then drives the built
// package's stdio bridge against it with CONDUCTOR_MCP_URL and a fake key:
// initialize, tools/list and an `execute` round-trip, which spawns a real
// Deno worker on the server side. One run proves the http server, Deno on the
// CI version in use (Deno 2.9 moved unix-socket listening under --allow-net,
// which hard-broke execute in conductor-node-mcp@14.23.3) and the bridge end
// to end. Not a jest test: requires a built dist/ and a real Deno binary.
// Usage: cd packages/mcp-server && node tests/execute-smoke.mjs
import { spawn, execSync } from 'node:child_process';
import { createServer } from 'node:net';

console.log('deno:', execSync('deno --version').toString().split('\n')[0]);

const port = await new Promise((resolve, reject) => {
  const probe = createServer();
  probe.on('error', reject);
  probe.listen(0, '127.0.0.1', () => {
    const { port } = probe.address();
    probe.close(() => resolve(port));
  });
});

let done = false;
let bridge;
function fail(message) {
  console.log(`SMOKE FAILED: ${message}`);
  done = true;
  bridge?.kill();
  upstream.kill();
  process.exit(1);
}

const upstream = spawn('node', ['dist/index.js', '--transport=http', `--port=${port}`], {
  env: { ...process.env },
  stdio: ['ignore', 'inherit', 'inherit'],
});
upstream.on('exit', (code) => {
  if (!done) fail(`http server exited early with code ${code}`);
});

for (let attempt = 0; ; attempt++) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/health`);
    if ((await res.text()) === 'OK') break;
  } catch {
    // not listening yet
  }
  if (attempt >= 100) fail('http server never became healthy');
  await new Promise((r) => setTimeout(r, 100));
}
console.log(`http server healthy on port ${port}`);

bridge = spawn('node', ['dist/index.js'], {
  env: {
    ...process.env,
    CONDUCTOR_SECRET_KEY: 'sk_test_smoke_fake_key',
    CONDUCTOR_MCP_URL: `http://127.0.0.1:${port}/`,
  },
  stdio: ['pipe', 'pipe', 'inherit'],
});

let buf = '';
const pending = new Map();
bridge.stdout.on('data', (d) => {
  buf += d.toString();
  let idx;
  while ((idx = buf.indexOf('\n')) >= 0) {
    const line = buf.slice(0, idx).trim();
    buf = buf.slice(idx + 1);
    if (!line) continue;
    const msg = JSON.parse(line);
    if (msg.id != null && pending.has(msg.id)) pending.get(msg.id)(msg);
  }
});

function rpc(method, params, id) {
  return new Promise((resolve, reject) => {
    pending.set(id, resolve);
    bridge.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
    setTimeout(() => reject(new Error(`timeout on ${method}`)), 60000);
  });
}

const init = await rpc(
  'initialize',
  {
    protocolVersion: '2025-03-26',
    capabilities: {},
    clientInfo: { name: 'smoke', version: '0' },
  },
  1,
);
console.log('serverInfo:', JSON.stringify(init.result?.serverInfo ?? init.error));
if (init.result?.serverInfo?.name !== 'conductor_node_api') fail('initialize did not reach the http server');
bridge.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');

const list = await rpc('tools/list', {}, 2);
const toolNames = (list.result?.tools ?? []).map((t) => t.name);
console.log('tools:', JSON.stringify(toolNames));
if (!toolNames.includes('execute') || !toolNames.includes('search_docs'))
  fail('tools/list is missing a tool');

const call = await rpc(
  'tools/call',
  {
    name: 'execute',
    arguments: { code: 'async function run() { return { smoke: 40 + 2 }; }' },
  },
  3,
);
console.log('execute result:', JSON.stringify(call.result ?? call.error));
const text = call.result?.content?.[0]?.text ?? '';
if (!text.includes('42')) fail('execute did not return 42');

done = true;
bridge.stdin.end();
const exitTimer = setTimeout(() => fail('bridge did not exit within 5 s after stdin closed'), 5000);
const bridgeExit = await new Promise((resolve) => bridge.on('exit', resolve));
clearTimeout(exitTimer);
upstream.kill();
if (bridgeExit !== 0) fail(`bridge exited with code ${bridgeExit} after stdin closed`);
console.log('SMOKE OK: initialize, tools/list and execute succeeded through the bridge');
process.exit(0);
