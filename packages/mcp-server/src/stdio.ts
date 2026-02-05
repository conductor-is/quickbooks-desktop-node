import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { initMcpServer, newMcpServer } from './server';

export const launchStdioServer = async () => {
  const server = await newMcpServer();

  await initMcpServer({ server });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Server running on stdio');
};
