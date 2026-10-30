import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const pkgRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(pkgRoot, '..', '..');

describe('conductor self-hosting patches', () => {
  test('code-tool.ts keeps the local execution timeout patch and crash fix', () => {
    const src = fs.readFileSync(path.join(pkgRoot, 'src', 'code-tool.ts'), 'utf-8');
    expect(src).toContain('CODE_EXECUTION_TIMEOUT_MS');
    expect(src).toContain('CodeExecutionTimeoutError');
    // Without this listener, worker.terminate() on timeout crashes the process.
    expect(src).toContain("req.on('error'");
  });

  test('code-tool.ts keeps the worker resource caps', () => {
    const src = fs.readFileSync(path.join(pkgRoot, 'src', 'code-tool.ts'), 'utf-8');
    expect(src).toContain('max-old-space-size');
    expect(src).toContain('CODE_EXECUTION_MAX_CONCURRENCY');
  });

  test('the execute tool description carries the rules every client must see', () => {
    // The 2026-10-27 pacing rule in instructions.md changed behavior only in clients that surface server
    // instructions; the tool description is the one text every client shows the model (audit of 10-28).
    const src = fs.readFileSync(path.join(pkgRoot, 'src', 'code-tool.ts'), 'utf-8');
    expect(src).toContain('needs conductorEndUserId from conductor.endUsers.list(); never guess it.');
    expect(src).toContain('await each request before starting the next (in a for loop, never Promise.all)');
    expect(src).toContain('pass several ids returned by an earlier call in one request');
    expect(src).toContain(
      'Keep each tool call under about a minute: some clients stop waiting at 60 seconds',
    );
    expect(src).toContain('never resend a request unchanged after QuickBooks Desktop rejected it');
    expect(src).not.toContain('while the code keeps running');
  });

  test('a client disconnect aborts the running execute call (same-instance half of the cancel TODO)', () => {
    const http = fs.readFileSync(path.join(pkgRoot, 'src', 'http.ts'), 'utf-8');
    expect(http).toContain("res.on('close', () => {");
    expect(http).toContain('void transport.close().catch(() => undefined);');
    expect(http).toContain('abortOnClientCloseEnabled()');
    const server = fs.readFileSync(path.join(pkgRoot, 'src', 'server.ts'), 'utf-8');
    expect(server).toContain('async (request, extra) =>');
    expect(server).toContain('signal: extra.signal,');
    const codeTool = fs.readFileSync(path.join(pkgRoot, 'src', 'code-tool.ts'), 'utf-8');
    expect(codeTool).toContain('CodeExecutionAbortedError');
    expect(codeTool).toContain('abortPromise, // conductor patch');
    expect(codeTool).toContain("abortedBy: 'client_closed'");
    const telemetry = fs.readFileSync(path.join(pkgRoot, 'src', 'telemetry.ts'), 'utf-8');
    expect(telemetry).toContain('CONDUCTOR_MCP_ABORT_ON_CLOSE');
  });

  test('every execute call carries a call id to the API and to the result line', () => {
    const codeTool = fs.readFileSync(path.join(pkgRoot, 'src', 'code-tool.ts'), 'utf-8');
    expect(codeTool).toContain('const callId = randomUUID();');
    expect(codeTool).toContain('...executeTelemetryHeaders({');
    expect(codeTool).toContain('classifyExecuteError(result)');
    expect(codeTool).toContain("abortedBy: 'client_closed'");
    const telemetry = fs.readFileSync(path.join(pkgRoot, 'src', 'telemetry.ts'), 'utf-8');
    expect(telemetry).toContain("'Conductor-MCP-Call-Id'");
    const http = fs.readFileSync(path.join(pkgRoot, 'src', 'http.ts'), 'utf-8');
    expect(http).toContain('...rpcMethodProps((req as any).body)');
    expect(http).toContain("userAgent: sanitizeUserAgent(req.headers['user-agent'])");
  });

  test('the execute worker rewrites API errors for the model unless switched off', () => {
    const worker = fs.readFileSync(path.join(pkgRoot, 'src', 'code-tool-worker.ts'), 'utf-8');
    expect(worker).toContain("import { formatErrorsForAgents } from './agent-errors'");
    expect(worker).toContain('if (agentErrors !== false) formatErrorsForAgents(conductor);');
    const codeTool = fs.readFileSync(path.join(pkgRoot, 'src', 'code-tool.ts'), 'utf-8');
    expect(codeTool).toContain('agentErrors: agentErrorFormattingEnabled(),');
    const telemetry = fs.readFileSync(path.join(pkgRoot, 'src', 'telemetry.ts'), 'utf-8');
    expect(telemetry).toContain('CONDUCTOR_MCP_AGENT_ERRORS');
    // The worker runs in Deno, so the formatter must stay free of Node-only imports.
    const formatter = fs.readFileSync(path.join(pkgRoot, 'src', 'agent-errors.ts'), 'utf-8');
    expect(formatter).not.toMatch(/from 'node:/);
  });

  test('gate rejections log the credential shape, method, client and resource', () => {
    const oauth = fs.readFileSync(path.join(pkgRoot, 'src', 'oauth.ts'), 'utf-8');
    expect(oauth).toContain('credentialShape');
    expect(oauth).toContain("userAgent: sanitizeUserAgent(req.headers['user-agent'], 100)");
    expect(oauth).toContain('export function authorizationShape(');
  });

  test('server.ts keeps the once-per-process docs index', () => {
    const src = fs.readFileSync(path.join(pkgRoot, 'src', 'server.ts'), 'utf-8');
    expect(src).toContain('_localSearchPromise');
  });

  test('build script ships the Deno bootstrap asset and no extension bundle', () => {
    const build = fs.readFileSync(path.join(pkgRoot, 'build'), 'utf-8');
    expect(build).toContain('cp -rp deno-bootstrap dist');
    expect(build).not.toContain('mcpb');
    // The template's generate-phase build still packs a bundle unless SKIP_MCPB
    // is set, so the artifacts must stay ignored or a build commits them (an
    // 11 MB .mcpb landed on main on 2026-10-15 when these rules were missing).
    const gitignore = fs.readFileSync(path.join(repoRoot, '.gitignore'), 'utf-8').split('\n');
    expect(gitignore).toContain('dist-bundle');
    expect(gitignore).toContain('*.mcpb');
    // Ignore rules never untrack a file, so also assert nothing is tracked.
    const tracked = execSync("git ls-files -- '*.mcpb' '**/dist-bundle/**'", {
      cwd: repoRoot,
      encoding: 'utf-8',
    });
    expect(tracked.trim()).toBe('');
  });

  test('no dependency resolves to the stainless-api GitHub org', () => {
    for (const p of [path.join(pkgRoot, 'package.json'), path.join(repoRoot, 'package.json')]) {
      expect(fs.readFileSync(p, 'utf-8')).not.toContain('github.com/stainless-api/');
    }
  });

  test('the committed OpenAPI spec for the mock test server exists', () => {
    expect(fs.existsSync(path.join(repoRoot, 'openapi.spec.yml'))).toBe(true);
  });

  test('instructions.md is byte-identical to the reviewed 2026-10-29 text', () => {
    const buf = fs.readFileSync(path.join(pkgRoot, 'instructions.md'));
    expect(buf.length).toBe(5574);
    const sha = crypto.createHash('sha256').update(buf).digest('hex');
    expect(sha).toBe('e014362a0704e3582f0747c097c4a3ea307f9d538194157c0b384f2fa00922ba');
  });

  test('deno-http-worker is vendored (no git dependency, so npx works without git)', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(pkgRoot, 'package.json'), 'utf-8'));
    for (const spec of Object.values({ ...pkg.dependencies, ...pkg.devDependencies }) as string[]) {
      expect(spec).not.toContain('git+https://');
      expect(spec).not.toContain('github.com');
    }
    expect(pkg.dependencies['@valtown/deno-http-worker']).toBeUndefined();
    expect(fs.existsSync(path.join(pkgRoot, 'src', 'deno-http-worker', 'DenoHTTPWorker.ts'))).toBe(true);
    expect(fs.existsSync(path.join(pkgRoot, 'deno-bootstrap', 'index.ts'))).toBe(true);
    const worker = fs.readFileSync(
      path.join(pkgRoot, 'src', 'deno-http-worker', 'DenoHTTPWorker.ts'),
      'utf-8',
    );
    // The fork's Deno >= 2.9 unix-socket net grant must survive vendoring.
    expect(worker).toContain('unix:${socketFile}');
    const codeTool = fs.readFileSync(path.join(pkgRoot, 'src', 'code-tool.ts'), 'utf-8');
    expect(codeTool).toContain("from './deno-http-worker'");
    expect(codeTool).not.toContain('@valtown/deno-http-worker');
  });

  test('stdio transport is the bridge to the hosted server', () => {
    const stdio = fs.readFileSync(path.join(pkgRoot, 'src', 'stdio.ts'), 'utf-8');
    expect(stdio).toContain("from './bridge'");
    expect(stdio).not.toContain('newMcpServer');
    expect(stdio).toContain('https://mcp.conductor.is/');
    // The stdio-only rejection of --tools/--no-tools/--docs-dir/
    // --custom-instructions-path/--socket lives here, not in generated index.ts.
    expect(stdio).toContain('rejectHttpOnlyOptionsOrExit(');
    expect(stdio).toContain("'--socket'");
  });

  test('serverInfo version line carries the release-please annotation and the bridge reuses it', () => {
    // Marker assembled at runtime so this file itself never contains the
    // annotation token (stlc's seal scanner would flag it as release-tooling
    // territory and warn on every status check).
    const marker = ['x-release', 'please-version'].join('-');
    const server = fs.readFileSync(path.join(pkgRoot, 'src', 'server.ts'), 'utf-8');
    expect(server).toContain(`export const VERSION = '`);
    // Exactly two annotated literals: the generator's serverInfo line, left as
    // generated so releases regenerate without conflicts, and the constant.
    const annotated = server.split('\n').filter((line) => line.includes(`// ${marker}`));
    expect(annotated).toHaveLength(2);
    expect(annotated.some((line) => /version: '\d+\.\d+\.\d+', \/\/ /.test(line))).toBe(true);
    expect(annotated.some((line) => /export const VERSION = '\d+\.\d+\.\d+'; \/\/ /.test(line))).toBe(true);
    // Two annotated literals: the generator's serverInfo line, left exactly as
    // generated so releases regenerate without conflicts, and this constant,
    // which the bridge's User-Agent imports.
    const bridge = fs.readFileSync(path.join(pkgRoot, 'src', 'bridge.ts'), 'utf-8');
    expect(bridge).toContain("import { VERSION } from './server'");
    expect(bridge).not.toContain(marker);
  });

  test('http.ts mounts the OAuth resource-server patch (tools/call-only key probe)', () => {
    const http = fs.readFileSync(path.join(pkgRoot, 'src', 'http.ts'), 'utf-8');
    expect(http).toContain('mountProtectedResourceMetadata(app)');
    expect(http).toContain("app.post('/', requireCredential(),");
    expect(http).toContain("app.post('/read-only', requireCredential('read-only'),");
    expect(http).toContain("app.get('/read-only', get)");
    expect(http).toContain("app.delete('/read-only', del)");
    const oauth = fs.readFileSync(path.join(pkgRoot, 'src', 'oauth.ts'), 'utf-8');
    expect(oauth).toContain("'/.well-known/oauth-protected-resource'");
    expect(oauth).toContain('WWW-Authenticate');
    expect(oauth).toContain('resource_metadata=');
    expect(oauth).toContain("const AUTHORIZATION_SERVER_URL = 'https://dashboard.conductor.is'");
    expect(oauth).toContain("const RESOURCE_URL = 'https://mcp.conductor.is/'");
    expect(oauth).toContain('CONDUCTOR_MCP_KEY_PROBE');
    // Only tools/call is ever probed against the API. Adding initialize here
    // would turn the Betterstack initialize monitor (dummy Bearer) red and put
    // an API round trip in front of every connection check.
    expect(oauth).toContain("PROBED_METHODS: ReadonlySet<string> = new Set(['tools/call'])");
  });

  test('the generated code still reads the two headers the OAuth gate rewrites', () => {
    // oauth.ts makes /read-only read-only by REWRITING x-stainless-mcp-client-permissions, and canonicalizes
    // the Bearer scheme for auth.ts. If a regeneration renamed either, /read-only would silently grant full
    // access or a lowercase "bearer" would 500 again, with every other test still green.
    const http = fs.readFileSync(path.join(pkgRoot, 'src', 'http.ts'), 'utf-8');
    expect(http).toContain("req.headers['x-stainless-mcp-client-permissions']");
    // The gate leaves a malformed header as sent, so /read-only fails closed only through this 400; a
    // regeneration that restored the generator's lenient parser would serve it with full access.
    expect(http).toContain('const clientPermissions = parseClientPermissions(clientPermissionsHeader);');
    expect(http).toContain('if (clientPermissions === null) {');
    expect(http).toContain('Invalid x-stainless-mcp-client-permissions header.');
    expect(http).not.toContain('const parseClientPermissions');
    const auth = fs.readFileSync(path.join(pkgRoot, 'src', 'auth.ts'), 'utf-8');
    expect(auth).toContain("case 'Bearer':");
    expect(auth).toContain("req.headers.authorization.slice('Bearer '.length)");
    const oauth = fs.readFileSync(path.join(pkgRoot, 'src', 'oauth.ts'), 'utf-8');
    expect(oauth).toContain("req.headers['x-stainless-mcp-client-permissions'] = JSON.stringify(forced)");
  });

  test('README.md keeps the sealed hosted sign-in paragraph and stdio parenthetical', () => {
    // Both are sealed hunks in a generated file (selfhost/DEPLOYS.md); a regeneration that drops them
    // would send Claude Desktop users back to the stdio bridge with CI still green.
    const readme = fs.readFileSync(path.join(pkgRoot, 'README.md'), 'utf-8');
    expect(readme).toContain('add that URL as a custom connector and sign in');
    expect(readme).toContain('(one with no remote-server support)');
  });
});
