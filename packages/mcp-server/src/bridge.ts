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
import {
  isJSONRPCNotification,
  isJSONRPCRequest,
  isJSONRPCResponse,
  type RequestId,
} from '@modelcontextprotocol/sdk/types.js';
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
  const headers: Record<string, string> = { Authorization: `Bearer ${apiKey}` };
  if (Object.keys(permissions).length > 0) {
    headers['x-stainless-mcp-client-permissions'] = JSON.stringify(permissions);
  }
  // Names the MCP client from its initialize request on (see bridgeUserAgent()).
  let userAgent = bridgeUserAgent(undefined);
  // The upstream POST of every request still waiting for its answer, by JSON-RPC id, and the ids the MCP
  // client has cancelled. A cancelled request's POST is closed: the hosted server is stateless and cannot
  // match a cancel notification to a running call, but it stops the work when the connection closes.
  // Without that, code the user stopped would run on, and keep writing, until the server's own deadline.
  const inFlight = new Map<RequestId, AbortController>();
  const cancelled = new Set<RequestId>();
  const upstream = new StreamableHTTPClientTransport(new URL(upstreamUrl), {
    requestInit: { headers },
    fetch: (url, init) => {
      const requestHeaders = new Headers(init?.headers);
      requestHeaders.set('User-Agent', userAgent);
      const requestId = jsonRpcRequestId(init?.body);
      const controller = requestId === undefined ? undefined : inFlight.get(requestId);
      if (controller === undefined) return fetch(url, { ...init, headers: requestHeaders });
      return fetch(url, {
        ...init,
        headers: requestHeaders,
        signal: eitherSignal(init?.signal, controller.signal),
      });
    },
  });
  const client = new StdioServerTransport();
  let initializeId: RequestId | undefined;

  client.onmessage = (message) => {
    if (isJSONRPCRequest(message)) {
      // Registered before the send, so a cancel that follows at once still finds it.
      inFlight.set(message.id, new AbortController());
      if (message.method === 'initialize') {
        initializeId = message.id;
        userAgent = bridgeUserAgent(message.params?.['clientInfo']);
      }
    }
    if (isJSONRPCNotification(message) && message.method === 'notifications/cancelled') {
      const requestId = message.params?.['requestId'];
      const controller =
        typeof requestId === 'string' || typeof requestId === 'number' ? inFlight.get(requestId) : undefined;
      if (controller !== undefined) {
        cancelled.add(requestId as RequestId);
        controller.abort();
      }
      // The notification is still passed on below, so the server's logs show the cancel and its reason.
    }
    upstream.send(message).catch((error: unknown) => {
      if (!isJSONRPCRequest(message)) return;
      inFlight.delete(message.id);
      // The client cancelled this request and expects no answer to it.
      if (cancelled.delete(message.id)) return;
      void client.send({
        jsonrpc: '2.0',
        id: message.id,
        error: describeUpstreamFailure(error, upstreamUrl),
      });
    });
  };
  upstream.onmessage = (message) => {
    if (!('method' in message) && message.id !== undefined) {
      // The answer, result or error, to one of the client's requests.
      inFlight.delete(message.id);
      cancelled.delete(message.id);
    }
    if (isJSONRPCResponse(message) && message.id === initializeId) {
      const protocolVersion = message.result['protocolVersion'];
      if (typeof protocolVersion === 'string') {
        upstream.setProtocolVersion(protocolVersion);
      }
    }
    void client.send(message);
  };
  // A failed upstream send is answered per request above; the SDK also reports it here. A request closed
  // because the client cancelled it is not a failure.
  upstream.onerror = (error) => {
    if (error.name === 'AbortError') return;
    getLogger().error({ error: error.message }, 'Upstream transport error');
  };
  client.onerror = (error) => console.error(`conductor-mcp-bridge: ${error.message}`);
  process.stdout.on('error', () => process.exit(0));
  process.stdin.once('end', () => {
    void upstream.close().finally(() => process.exit(0));
  });

  await upstream.start();
  await client.start();
}

// The bridge's User-Agent: `conductor-mcp-bridge/<version>`, then the MCP client the bridge runs under
// as ` (<name>/<version>)`, taken from the `clientInfo` of that client's initialize request. The hosted
// server reads the name to choose a tool call's deadline; that policy lives in the conductor repo
// (`getDeadlineSeconds()` in apps/server/src/mcp/deadline.ts), which matches the whole name. So the
// name must not be able to become another client's: a run of any character other than a letter, digit,
// dot, colon or hyphen becomes one underscore, which no listed name contains, and nothing is trimmed.
// The same rule keeps a client's text from closing the parenthesis, adding a slash or adding another
// product. The whole header stays under the 120 characters the server's logs keep.
function bridgeUserAgent(clientInfo: unknown): string {
  const product = `conductor-mcp-bridge/${VERSION}`;
  if (typeof clientInfo !== 'object' || clientInfo === null) return product;
  const { name, version } = clientInfo as { name?: unknown; version?: unknown };
  const clientName = userAgentToken(name, 64);
  if (clientName === undefined) return product;
  const clientVersion = userAgentToken(version, 16);
  return `${product} (${clientName}${clientVersion === undefined ? '' : `/${clientVersion}`})`;
}

// Cut first, so the work is bounded whatever the client sent.
function userAgentToken(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const token = value.slice(0, maxLength).replace(/[^A-Za-z0-9.:-]+/g, '_');
  return /[A-Za-z0-9]/.test(token) ? token : undefined;
}

// The id of the JSON-RPC request in a POST body, or undefined for a notification, a response or no body.
function jsonRpcRequestId(body: unknown): RequestId | undefined {
  if (typeof body !== 'string') return undefined;
  try {
    const message = JSON.parse(body) as { id?: unknown; method?: unknown };
    return (
        typeof message.method === 'string' &&
          (typeof message.id === 'string' || typeof message.id === 'number')
      ) ?
        message.id
      : undefined;
  } catch {
    return undefined;
  }
}

// A signal that aborts when the transport closes or when this one request is cancelled. Node.js before
// 20.3 has no AbortSignal.any; there the request's own signal is enough, since the bridge exits when its
// transport closes.
function eitherSignal(
  transportSignal: AbortSignal | null | undefined,
  requestSignal: AbortSignal,
): AbortSignal {
  return transportSignal && typeof AbortSignal.any === 'function' ?
      AbortSignal.any([transportSignal, requestSignal])
    : requestSignal;
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
