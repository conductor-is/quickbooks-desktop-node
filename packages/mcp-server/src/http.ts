// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import { McpOptions } from './options';
import { ClientOptions, initMcpServer, newMcpServer } from './server';
import { parseAuthHeaders } from './headers';

const newServer = async ({
  clientOptions,
  req,
  res,
}: {
  clientOptions: ClientOptions;
  req: express.Request;
  res: express.Response;
}): Promise<McpServer | null> => {
  const server = await newMcpServer();

  try {
    const authOptions = parseAuthHeaders(req, false);
    await initMcpServer({
      server: server,
      clientOptions: {
        ...clientOptions,
        ...authOptions,
      },
    });
  } catch (error) {
    res.status(401).json({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: `Unauthorized: ${error instanceof Error ? error.message : error}`,
      },
    });
    return null;
  }

  return server;
};

const post =
  (options: { clientOptions: ClientOptions; mcpOptions: McpOptions }) =>
  async (req: express.Request, res: express.Response) => {
    const server = await newServer({ ...options, req, res });
    // If we return null, we already set the authorization error.
    if (server === null) return;
    const transport = new StreamableHTTPServerTransport();
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

export const streamableHTTPApp = ({
  clientOptions = {},
  mcpOptions,
  debug,
}: {
  clientOptions?: ClientOptions;
  mcpOptions: McpOptions;
  debug: boolean;
}): express.Express => {
  const app = express();
  app.set('query parser', 'extended');
  app.use(express.json());

  if (debug) {
    morganBody(app, {
      logAllReqHeader: true,
      logAllResHeader: true,
      logRequestBody: true,
      logResponseBody: true,
    });
  } else {
    app.use(morgan('combined'));
  }

  app.get('/health', async (req: express.Request, res: express.Response) => {
    res.status(200).send('OK');
  });
  app.get('/', get);
  app.post('/', post({ clientOptions, mcpOptions }));
  app.delete('/', del);

  return app;
};

export const launchStreamableHTTPServer = async (params: {
  mcpOptions: McpOptions;
  debug: boolean;
  port: number | string | undefined;
}) => {
  const app = streamableHTTPApp({ mcpOptions: params.mcpOptions, debug: params.debug });
  const server = app.listen(params.port);
  const address = server.address();

  if (typeof address === 'string') {
    console.error(`MCP Server running on streamable HTTP at ${address}`);
  } else if (address !== null) {
    console.error(`MCP Server running on streamable HTTP on port ${address.port}`);
  } else {
    console.error(`MCP Server running on streamable HTTP on port ${params.port}`);
  }
};
