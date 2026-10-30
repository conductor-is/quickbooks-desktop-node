// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { ClientOptions } from 'conductor-node';
import express from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { getStainlessApiKey, parseClientAuthHeaders } from './auth';
import { getLogger } from './logger';
import { mountProtectedResourceMetadata, parseClientPermissions, requireCredential } from './oauth'; // conductor patch
import { rpcMethodProps, sanitizeUserAgent } from './telemetry'; // conductor patch
import { McpOptions } from './options';
import { initMcpServer, newMcpServer } from './server';

const newServer = async ({
  clientOptions,
  mcpOptions,
  req,
  res,
}: {
  clientOptions: ClientOptions;
  mcpOptions: McpOptions;
  req: express.Request;
  res: express.Response;
}): Promise<McpServer | null> => {
  const stainlessApiKey = getStainlessApiKey(req, mcpOptions);
  const customInstructionsPath = mcpOptions.customInstructionsPath;
  const server = await newMcpServer({ stainlessApiKey, customInstructionsPath });

  const authOptions = parseClientAuthHeaders(req, false);

  let upstreamClientEnvs: Record<string, string> | undefined;
  const clientEnvsHeader = req.headers['x-stainless-mcp-client-envs'];
  if (typeof clientEnvsHeader === 'string') {
    try {
      const parsed = JSON.parse(clientEnvsHeader);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        upstreamClientEnvs = parsed;
      }
    } catch {
      // Ignore malformed header
    }
  }

  // Parse x-stainless-mcp-client-permissions header to override permission options
  //
  // Note: Permissions are best-effort and intended to prevent clients from doing unexpected things;
  // they're not a hard security boundary, so we allow arbitrary, client-driven overrides.
  //
  // See the Stainless MCP documentation for more details.
  let effectiveMcpOptions = mcpOptions;
  const clientPermissionsHeader = req.headers['x-stainless-mcp-client-permissions'];
  if (typeof clientPermissionsHeader === 'string') {
    const clientPermissions = parseClientPermissions(clientPermissionsHeader);
    // Fail closed (conductor patch): clients send this header only to limit themselves, so a
    // malformed value, such as one whose quotes a Windows shell stripped, must not leave the
    // connection with full access.
    if (clientPermissions === null) {
      getLogger().warn(
        { clientPermissionsHeader },
        'Rejected malformed x-stainless-mcp-client-permissions header',
      );
      res.status(400).json({
        jsonrpc: '2.0',
        error: {
          code: -32600,
          message:
            'Invalid x-stainless-mcp-client-permissions header. It must be exact JSON, such as {"allow_http_gets":true}. See https://docs.conductor.is/usage/mcp#read-only-mode',
        },
        id: null,
      });
      return null;
    }
    effectiveMcpOptions = {
      ...mcpOptions,
      ...(clientPermissions.allow_http_gets !== undefined && {
        codeAllowHttpGets: clientPermissions.allow_http_gets,
      }),
      ...(clientPermissions.allowed_methods !== undefined && {
        codeAllowedMethods: clientPermissions.allowed_methods,
      }),
      ...(clientPermissions.blocked_methods !== undefined && {
        codeBlockedMethods: clientPermissions.blocked_methods,
      }),
    };
    getLogger().info(
      { clientPermissions },
      'Overriding code execution permissions from x-stainless-mcp-client-permissions header',
    );
  }

  const mcpClientInfo =
    typeof req.body?.params?.clientInfo?.name === 'string' ?
      { name: req.body.params.clientInfo.name, version: String(req.body.params.clientInfo.version ?? '') }
    : undefined;

  await initMcpServer({
    server: server,
    mcpOptions: effectiveMcpOptions,
    clientOptions: {
      ...clientOptions,
      ...authOptions,
    },
    stainlessApiKey: stainlessApiKey,
    upstreamClientEnvs,
    mcpSessionId: (req as any).mcpSessionId,
    mcpClientInfo,
    userAgent: sanitizeUserAgent(req.headers['user-agent']), // conductor patch
  });

  if (mcpClientInfo) {
    getLogger().info({ mcpSessionId: (req as any).mcpSessionId, mcpClientInfo }, 'MCP client connected');
  }

  return server;
};

const post =
  (options: { clientOptions: ClientOptions; mcpOptions: McpOptions }) =>
  async (req: express.Request, res: express.Response) => {
    const transport = new StreamableHTTPServerTransport();
    // Conductor patch: every client gives up on a long tools/call before the server's own limit (mcp-remote
    // at 60 s, Cursor at 120 s, hosted Claude at 240 s), and the closed socket is the only signal the origin
    // gets. Closing the transport runs the SDK's onclose, which aborts each in-flight request handler's
    // signal (Protocol._onclose), which the execute tool races its Deno worker against (code-tool.ts). The
    // listener goes on before any await so a disconnect while the server is built is still seen, and a
    // client that left during the gate's key probe (before this handler ran) is caught by res.closed. After
    // a normal finish the same event finds nothing to abort.
    res.on('close', () => {
      void transport.close().catch(() => undefined);
    });
    if (res.closed) return;
    const server = await newServer({ ...options, req, res });
    // If we return null, we already set the authorization error.
    if (server === null) return;
    if (res.closed) return;
    await server.connect(transport as any);
    await transport.handleRequest(req, res, req.body);
  };

const get = async (req: express.Request, res: express.Response) => {
  res.status(405).json({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message: 'Method not supported',
    },
  });
};

const del = async (req: express.Request, res: express.Response) => {
  res.status(405).json({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message: 'Method not supported',
    },
  });
};

const redactHeaders = (headers: Record<string, any>) => {
  const hiddenHeaders = /auth|cookie|key|token|x-stainless-mcp-client-envs/i;
  const filtered = { ...headers };
  Object.keys(filtered).forEach((key) => {
    if (hiddenHeaders.test(key)) {
      filtered[key] = '[REDACTED]';
    }
  });
  return filtered;
};

export const streamableHTTPApp = ({
  clientOptions = {},
  mcpOptions,
}: {
  clientOptions?: ClientOptions;
  mcpOptions: McpOptions;
}): express.Express => {
  const app = express();
  app.set('query parser', 'extended');
  app.use(express.json());
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const existing = req.headers['mcp-session-id'];
    const sessionId = (Array.isArray(existing) ? existing[0] : existing) || crypto.randomUUID();
    (req as any).mcpSessionId = sessionId;
    const origWriteHead = res.writeHead.bind(res);
    res.writeHead = function (statusCode: number, ...rest: any[]) {
      res.setHeader('mcp-session-id', sessionId);
      return origWriteHead(statusCode, ...rest);
    } as typeof res.writeHead;
    next();
  });
  app.use(
    pinoHttp({
      logger: getLogger(),
      customProps: (req) => ({
        mcpSessionId: (req as any).mcpSessionId,
        // Conductor patch: the JSON-RPC method and tool name, so the request line says initialize versus
        // tools/call and execute versus search_docs for every client (express.json() has run by now).
        ...rpcMethodProps((req as any).body),
      }),
      customLogLevel: (req, res) => {
        if (res.statusCode >= 500) {
          return 'error';
        } else if (res.statusCode >= 400) {
          return 'warn';
        }
        return 'info';
      },
      customSuccessMessage: function (req, res) {
        return `Request ${req.method} to ${req.url} completed with status ${res.statusCode}`;
      },
      customErrorMessage: function (req, res, err) {
        return `Request ${req.method} to ${req.url} errored with status ${res.statusCode}`;
      },
      serializers: {
        req: pino.stdSerializers.wrapRequestSerializer((req) => {
          return {
            ...req,
            headers: redactHeaders(req.raw.headers),
          };
        }),
        res: pino.stdSerializers.wrapResponseSerializer((res) => {
          return {
            ...res,
            headers: redactHeaders(res.headers),
          };
        }),
      },
    }),
  );

  app.get('/health', async (req: express.Request, res: express.Response) => {
    res.status(200).send('OK');
  });
  // OAuth 2.1 resource server (conductor patch, see src/oauth.ts): RFC 9728 metadata for both resources,
  // and the 401 + WWW-Authenticate that makes Claude and other OAuth clients start sign-in. /read-only is
  // the read-only connector URL: its gate rewrites the client permissions header to the client's own
  // permissions minus every write, so a client value can never loosen it.
  mountProtectedResourceMetadata(app);
  app.get('/', get);
  app.post('/', requireCredential(), post({ clientOptions, mcpOptions }));
  app.delete('/', del);
  app.get('/read-only', get);
  app.post('/read-only', requireCredential('read-only'), post({ clientOptions, mcpOptions }));
  app.delete('/read-only', del);

  return app;
};

export const launchStreamableHTTPServer = async ({
  mcpOptions,
  port,
}: {
  mcpOptions: McpOptions;
  port: number | string | undefined;
}) => {
  const app = streamableHTTPApp({ mcpOptions });
  const server = app.listen(port);
  const address = server.address();

  const logger = getLogger();

  if (typeof address === 'string') {
    logger.info(`MCP Server running on streamable HTTP at ${address}`);
  } else if (address !== null) {
    logger.info(`MCP Server running on streamable HTTP on port ${address.port}`);
  } else {
    logger.info(`MCP Server running on streamable HTTP on port ${port}`);
  }
};
