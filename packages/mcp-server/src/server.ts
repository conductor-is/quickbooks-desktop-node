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
import { HandlerFunction, McpTool } from './types';

export { McpOptions } from './options';
export { ClientOptions } from 'conductor-node';

async function getInstructions() {
  // This API key is optional; providing it allows the server to fetch instructions for unreleased versions.
  const stainlessAPIKey = readEnv('STAINLESS_API_KEY');
  const response = await fetch(
    readEnv('CODE_MODE_INSTRUCTIONS_URL') ?? 'https://api.stainless.com/api/ai/instructions/conductor',
    {
      method: 'GET',
      headers: { ...(stainlessAPIKey && { Authorization: stainlessAPIKey }) },
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

export const newMcpServer = async () =>
  new McpServer(
    {
      name: 'conductor_node_api',
      version: '14.6.0',
    },
    {
      instructions: await getInstructions(),
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

    return executeHandler(mcpTool.handler, client, args);
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
  const includedTools = [codeTool()];
  if (options?.includeDocsTools ?? true) {
    includedTools.push(docsSearchTool);
  }
  return includedTools;
}

/**
 * Runs the provided handler with the given client and arguments.
 */
export async function executeHandler(
  handler: HandlerFunction,
  client: Conductor,
  args: Record<string, unknown> | undefined,
) {
  return await handler(client, args || {});
}

export const readEnv = (env: string): string | undefined => {
  if (typeof (globalThis as any).process !== 'undefined') {
    return (globalThis as any).process.env?.[env]?.trim();
  } else if (typeof (globalThis as any).Deno !== 'undefined') {
    return (globalThis as any).Deno.env?.get?.(env)?.trim();
  }
  return;
};

export const readEnvOrError = (env: string): string => {
  let envValue = readEnv(env);
  if (envValue === undefined) {
    throw new Error(`Environment variable ${env} is not set`);
  }
  return envValue;
};

export const requireValue = <T>(value: T | undefined, description: string): T => {
  if (value === undefined) {
    throw new Error(`Missing required value: ${description}`);
  }
  return value;
};
