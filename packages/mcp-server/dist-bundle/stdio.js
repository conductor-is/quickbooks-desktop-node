"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchStdioServer = void 0;
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const server_1 = require("./server.js");
const logger_1 = require("./logger.js");
const launchStdioServer = async (mcpOptions) => {
    const server = await (0, server_1.newMcpServer)({
        stainlessApiKey: mcpOptions.stainlessApiKey,
        customInstructionsPath: mcpOptions.customInstructionsPath,
    });
    await (0, server_1.initMcpServer)({ server, mcpOptions, stainlessApiKey: mcpOptions.stainlessApiKey });
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    (0, logger_1.getLogger)().info('MCP Server running on stdio');
};
exports.launchStdioServer = launchStdioServer;
//# sourceMappingURL=stdio.js.map