// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export function getWorkerPath(): string {
  return require.resolve('./code-tool-worker.mjs');
}

// Shipped verbatim by `build` (cp -rp deno-bootstrap dist/); Deno receives its
// contents as a data: URL, so it is read, never imported.
export function getDenoBootstrapPath(): string {
  return require.resolve('./deno-bootstrap/index.ts');
}
