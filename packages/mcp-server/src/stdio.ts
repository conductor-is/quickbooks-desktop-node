import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { McpOptions } from './options';
import { initMcpServer, newMcpServer } from './server';

export const launchStdioServer = async (mcpOptions: McpOptions) => {
  const server = await newMcpServer();

  await initMcpServer({ server, mcpOptions });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Server running on stdio');
};
