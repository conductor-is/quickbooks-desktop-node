import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { initMcpServer, newMcpServer } from "./server.mjs";
import { getLogger } from "./logger.mjs";
export const launchStdioServer = async (mcpOptions) => {
    const server = await newMcpServer({
        stainlessApiKey: mcpOptions.stainlessApiKey,
        customInstructionsPath: mcpOptions.customInstructionsPath,
    });
    await initMcpServer({ server, mcpOptions, stainlessApiKey: mcpOptions.stainlessApiKey });
    const transport = new StdioServerTransport();
    await server.connect(transport);
    getLogger().info('MCP Server running on stdio');
};
//# sourceMappingURL=stdio.mjs.map