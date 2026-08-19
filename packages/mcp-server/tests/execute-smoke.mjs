// Conductor smoke test: boots the built MCP server over stdio and runs an
// `execute` round-trip, which spawns a Deno worker for the sandbox. Run with
// current-stable Deno on PATH so Deno permission regressions surface here
// instead of after publish (Deno 2.9 moved unix-socket listening under
// --allow-net, which hard-broke execute in conductor-node-mcp@14.23.3).
// Not a jest test: requires a built dist/ and a real Deno binary.
// Usage: cd packages/mcp-server && node tests/execute-smoke.mjs
import { spawn, execSync } from 'node:child_process';

console.log('deno:', execSync('deno --version').toString().split('\n')[0]);

const server = spawn('node', ['dist/index.js', '--tools=code'], {
  env: { ...process.env, CONDUCTOR_SECRET_KEY: 'sk_test_smoke_fake_key' },
  stdio: ['pipe', 'pipe', 'inherit'],
});

let buf = '';
const pending = new Map();
server.stdout.on('data', (d) => {
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
    server.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
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
console.log('serverInfo:', JSON.stringify(init.result.serverInfo));
server.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');

const call = await rpc(
  'tools/call',
  {
    name: 'execute',
    arguments: { code: 'async function run() { return { smoke: 40 + 2 }; }' },
  },
  2,
);
console.log('execute result:', JSON.stringify(call.result ?? call.error));
server.kill();
const text = call.result?.content?.[0]?.text ?? '';
if (text.includes('42')) {
  console.log('SMOKE OK: execute round-trip succeeded');
  process.exit(0);
}
console.log('SMOKE FAILED');
process.exit(1);
