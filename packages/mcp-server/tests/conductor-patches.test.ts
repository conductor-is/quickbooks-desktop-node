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

  test('instructions.md is byte-identical to the live 2026-08-18 capture', () => {
    const buf = fs.readFileSync(path.join(pkgRoot, 'instructions.md'));
    expect(buf.length).toBe(4958);
    const sha = crypto.createHash('sha256').update(buf).digest('hex');
    expect(sha).toBe('12d949698a7af3eb700034fac64e71b8f7d6abc7467fbb33bd08b202a63cf5af');
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
    const oauth = fs.readFileSync(path.join(pkgRoot, 'src', 'oauth.ts'), 'utf-8');
    expect(oauth).toContain("'/.well-known/oauth-protected-resource'");
    expect(oauth).toContain('WWW-Authenticate');
    expect(oauth).toContain('resource_metadata=');
    expect(oauth).toContain('CONDUCTOR_MCP_OAUTH_AUTHORIZATION_SERVER_URL');
    expect(oauth).toContain('CONDUCTOR_MCP_OAUTH_RESOURCE_URL');
    expect(oauth).toContain('CONDUCTOR_MCP_KEY_PROBE');
    // Only tools/call is ever probed against the API. Adding initialize here
    // would turn the Betterstack initialize monitor (dummy Bearer) red and put
    // an API round trip in front of every connection check.
    expect(oauth).toContain("PROBED_METHODS: ReadonlySet<string> = new Set(['tools/call'])");
  });

  test('README.md keeps the sealed hosted sign-in paragraph and stdio parenthetical', () => {
    // Both are sealed hunks in a generated file (selfhost/DEPLOYS.md); a regeneration that drops them
    // would send Claude Desktop users back to the stdio bridge with CI still green.
    const readme = fs.readFileSync(path.join(pkgRoot, 'README.md'), 'utf-8');
    expect(readme).toContain('add that URL as a custom connector and sign in');
    expect(readme).toContain('(for a client with no remote-server support)');
  });
});
