// Conductor patch: the hosted server refuses a malformed
// x-stainless-mcp-client-permissions header instead of running full-access.
import http from 'node:http';
import type { AddressInfo } from 'node:net';
import path from 'node:path';
import { streamableHTTPApp } from '../src/http';
import { configureLogger } from '../src/logger';

const INITIALIZE = {
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2025-03-26',
    capabilities: {},
    clientInfo: { name: 'permissions-test', version: '1.0.0' },
  },
};

let server: http.Server;
let baseUrl: string;

beforeAll(async () => {
  configureLogger({ level: 'fatal', pretty: false });
  const app = streamableHTTPApp({
    mcpOptions: {
      codeExecutionMode: 'local',
      customInstructionsPath: path.resolve(__dirname, '..', 'instructions.md'),
    },
  });
  server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}/`;
});

afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

function initialize(permissions?: string): Promise<Response> {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
      Authorization: 'Bearer sk_conductor_permissions_test',
      ...(permissions !== undefined && { 'x-stainless-mcp-client-permissions': permissions }),
    },
    body: JSON.stringify(INITIALIZE),
  });
}

describe('x-stainless-mcp-client-permissions header', () => {
  it.each([
    // Windows PowerShell 5.1 strips the inner double quotes.
    '{allow_http_gets:true}',
    "{'allow_http_gets':true}",
    'true',
    '[]',
    '{"allow_http_gets":"true"}',
    '{"read_only":true}',
    '{"allowed_methods":"customers.list"}',
    '{"blocked_methods":[1]}',
  ])('rejects %s instead of running full-access', async (permissions) => {
    const response = await initialize(permissions);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      jsonrpc: '2.0',
      error: {
        code: -32600,
        message: expect.stringContaining('Invalid x-stainless-mcp-client-permissions header'),
      },
      id: null,
    });
  });

  it.each([undefined, '{"allow_http_gets":true}', '{"blocked_methods":["customers.create"]}', '{}'])(
    'accepts %s',
    async (permissions) => {
      const response = await initialize(permissions);

      expect(response.status).toBe(200);
    },
  );
});
