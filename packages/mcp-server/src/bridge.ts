// Conductor stdio bridge. Over stdio this package runs no tools itself: it
// forwards every JSON-RPC message between the MCP client on stdin/stdout and
// the hosted Conductor MCP server over Streamable HTTP, authenticating with
// the user's secret key. The key is sent only as the Authorization header and
// is never logged.

import {
  StreamableHTTPClientTransport,
  StreamableHTTPError,
} from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { isJSONRPCRequest, isJSONRPCResponse, type RequestId } from '@modelcontextprotocol/sdk/types.js';
import { getLogger } from './logger';
import { VERSION } from './server';

// Same shape the hosted server parses from x-stainless-mcp-client-permissions (see http.ts).
export type BridgePermissions = {
  allow_http_gets?: boolean;
  allowed_methods?: string[];
  blocked_methods?: string[];
};

export async function runBridge({
  upstreamUrl,
  apiKey,
  permissions,
}: {
  upstreamUrl: string;
  apiKey: string;
  permissions: BridgePermissions;
}): Promise<void> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    'User-Agent': `conductor-mcp-bridge/${VERSION}`,
  };
  if (Object.keys(permissions).length > 0) {
    headers['x-stainless-mcp-client-permissions'] = JSON.stringify(permissions);
  }
  const upstream = new StreamableHTTPClientTransport(new URL(upstreamUrl), { requestInit: { headers } });
  const client = new StdioServerTransport();
  let initializeId: RequestId | undefined;

  client.onmessage = (message) => {
    if (isJSONRPCRequest(message) && message.method === 'initialize') {
      initializeId = message.id;
    }
    upstream.send(message).catch((error: unknown) => {
      if (isJSONRPCRequest(message)) {
        void client.send({
          jsonrpc: '2.0',
          id: message.id,
          error: describeUpstreamFailure(error, upstreamUrl),
        });
      }
    });
  };
  upstream.onmessage = (message) => {
    if (isJSONRPCResponse(message) && message.id === initializeId) {
      const protocolVersion = message.result['protocolVersion'];
      if (typeof protocolVersion === 'string') {
        upstream.setProtocolVersion(protocolVersion);
      }
    }
    void client.send(message);
  };
  // A failed upstream send is answered per request above; the SDK also reports it here.
  upstream.onerror = (error) => getLogger().error({ error: error.message }, 'Upstream transport error');
  client.onerror = (error) => console.error(`conductor-mcp-bridge: ${error.message}`);
  process.stdout.on('error', () => process.exit(0));
  process.stdin.once('end', () => {
    void upstream.close().finally(() => process.exit(0));
  });

  await upstream.start();
  await client.start();
}

function describeUpstreamFailure(
  error: unknown,
  upstreamUrl: string,
): { code: number; message: string; data?: unknown } {
  const host = new URL(upstreamUrl).host;
  if (error instanceof StreamableHTTPError) {
    const status = error.code ?? 0;
    // The SDK uses non-HTTP codes (-1) for protocol-level failures such as an unexpected content type.
    if (status <= 0) return { code: -32000, message: `Upstream error from ${host}: ${error.message}` };
    const message =
      status === 401 || status === 403 ?
        `${host} rejected the secret key (HTTP ${status}). Check CONDUCTOR_SECRET_KEY.`
      : status === 429 ? `${host} is rate limiting this key (HTTP 429). Retry shortly.`
      : status >= 500 ? `${host} is unavailable right now (HTTP ${status}). Retry shortly.`
      : `${host} rejected the request (HTTP ${status}).`;
    const body = parseJsonBody(error.message);
    return { code: -32000, message, ...(body !== undefined && { data: body }) };
  }
  const cause = error instanceof Error && error.cause instanceof Error ? error.cause.message : undefined;
  const detail = cause ?? (error instanceof Error ? error.message : String(error));
  return {
    code: -32000,
    message: `Could not reach ${host}: ${detail}. Check the network, proxy (NODE_USE_ENV_PROXY=1) and CA certificate (NODE_EXTRA_CA_CERTS) settings.`,
  };
}

// The SDK folds the response body into its message; recover it when it is JSON.
function parseJsonBody(message: string): unknown {
  const start = message.indexOf('{');
  if (start < 0) return undefined;
  try {
    return JSON.parse(message.slice(start));
  } catch {
    return undefined;
  }
}
