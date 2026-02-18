// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  SetLevelRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { ClientOptions } from 'conductor-node';
import Conductor from 'conductor-node';
import { codeTool } from './code-tool';
import docsSearchTool from './docs-search-tool';
import { McpOptions } from './options';
import { blockedMethodsForCodeTool } from './methods';
import { HandlerFunction, McpRequestContext, ToolCallResult, McpTool } from './types';
import { readEnv } from './util';

async function getInstructions(stainlessApiKey: string | undefined): Promise<string> {
  // Setting the stainless API key is optional, but may be required
  // to authenticate requests to the Stainless API.
  const response = await fetch(
    readEnv('CODE_MODE_INSTRUCTIONS_URL') ?? 'https://api.stainless.com/api/ai/instructions/conductor',
    {
      method: 'GET',
      headers: { ...(stainlessApiKey && { Authorization: stainlessApiKey }) },
    },
  );

  let instructions: string | undefined;
  if (!response.ok) {
    console.warn(
      'Warning: failed to retrieve MCP server instructions. Proceeding with default instructions...',
    );

    instructions = `
      This is the conductor MCP server. You will use Code Mode to help the user perform
      actions. You can use search_docs tool to learn about how to take action with this server. Then,
      you will write TypeScript code using the execute tool take action. It is CRITICAL that you be
      thoughtful and deliberate when executing code. Always try to entirely solve the problem in code
      block: it can be as long as you need to get the job done!
    `;
  }

  instructions ??= ((await response.json()) as { instructions: string }).instructions;
  instructions = `
    The current time in Unix timestamps is ${Date.now()}.

    ${instructions}
  `;

  return instructions;
}

export const newMcpServer = async (stainlessApiKey: string | undefined) =>
  new McpServer(
    {
      name: 'conductor_node_api',
      version: '14.5.0',
    },
    {
      instructions: await getInstructions(stainlessApiKey),
      capabilities: { tools: {}, logging: {} },
    },
  );

/**
 * Initializes the provided MCP Server with the given tools and handlers.
 * If not provided, the default client, tools and handlers will be used.
 */
export async function initMcpServer(params: {
  server: Server | McpServer;
  clientOptions?: ClientOptions;
  mcpOptions?: McpOptions;
  stainlessApiKey?: string | undefined;
}) {
  const server = params.server instanceof McpServer ? params.server.server : params.server;

  const logAtLevel =
    (level: 'debug' | 'info' | 'warning' | 'error') =>
    (message: string, ...rest: unknown[]) => {
      void server.sendLoggingMessage({
        level,
        data: { message, rest },
      });
    };
  const logger = {
    debug: logAtLevel('debug'),
    info: logAtLevel('info'),
    warn: logAtLevel('warning'),
    error: logAtLevel('error'),
  };

  let client = new Conductor({
    logger,
    ...params.clientOptions,
    defaultHeaders: {
      ...params.clientOptions?.defaultHeaders,
      'X-Stainless-MCP': 'true',
    },
  });

  const providedTools = selectTools(params.mcpOptions);
  const toolMap = Object.fromEntries(providedTools.map((mcpTool) => [mcpTool.tool.name, mcpTool]));

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: providedTools.map((mcpTool) => mcpTool.tool),
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const mcpTool = toolMap[name];
    if (!mcpTool) {
      throw new Error(`Unknown tool: ${name}`);
    }

    return executeHandler({
      handler: mcpTool.handler,
      reqContext: {
        client,
        stainlessApiKey: params.stainlessApiKey ?? params.mcpOptions?.stainlessApiKey,
      },
      args,
    });
  });

  server.setRequestHandler(SetLevelRequestSchema, async (request) => {
    const { level } = request.params;
    switch (level) {
      case 'debug':
        client = client.withOptions({ logLevel: 'debug' });
        break;
      case 'info':
        client = client.withOptions({ logLevel: 'info' });
        break;
      case 'notice':
      case 'warning':
        client = client.withOptions({ logLevel: 'warn' });
        break;
      case 'error':
        client = client.withOptions({ logLevel: 'error' });
        break;
      default:
        client = client.withOptions({ logLevel: 'off' });
        break;
    }
    return {};
  });
}

/**
 * Selects the tools to include in the MCP Server based on the provided options.
 */
export function selectTools(options?: McpOptions): McpTool[] {
  const includedTools = [
    codeTool({
      blockedMethods: blockedMethodsForCodeTool(options),
    }),
  ];
  if (options?.includeDocsTools ?? true) {
    includedTools.push(docsSearchTool);
  }
  return includedTools;
}

/**
 * Runs the provided handler with the given client and arguments.
 */
export async function executeHandler({
  handler,
  reqContext,
  args,
}: {
  handler: HandlerFunction;
  reqContext: McpRequestContext;
  args: Record<string, unknown> | undefined;
}): Promise<ToolCallResult> {
  return await handler({ reqContext, args: args || {} });
}
