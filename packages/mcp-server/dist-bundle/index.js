#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server.js");
const options_1 = require("./options.js");
const stdio_1 = require("./stdio.js");
const http_1 = require("./http.js");
const logger_1 = require("./logger.js");
async function main() {
    const options = parseOptionsOrError();
    (0, logger_1.configureLogger)({
        level: options.debug ? 'debug' : 'info',
        pretty: options.logFormat === 'pretty',
    });
    const selectedTools = await selectToolsOrError(options);
    (0, logger_1.getLogger)().info({ tools: selectedTools.map((e) => e.tool.name) }, `MCP Server starting with ${selectedTools.length} tools`);
    switch (options.transport) {
        case 'stdio':
            await (0, stdio_1.launchStdioServer)(options);
            break;
        case 'http':
            await (0, http_1.launchStreamableHTTPServer)({
                mcpOptions: options,
                port: options.socket ?? options.port,
            });
            break;
    }
}
if (require.main === module) {
    main().catch((error) => {
        // Logger might not be initialized yet
        console.error('Fatal error in main()', error);
        process.exit(1);
    });
}
function parseOptionsOrError() {
    try {
        return (0, options_1.parseCLIOptions)();
    }
    catch (error) {
        // Logger is initialized after options, so use console.error here
        console.error('Error parsing options', error);
        process.exit(1);
    }
}
async function selectToolsOrError(options) {
    try {
        const includedTools = (0, server_1.selectTools)(options);
        if (includedTools.length === 0) {
            (0, logger_1.getLogger)().error('No tools match the provided filters');
            process.exit(1);
        }
        return includedTools;
    }
    catch (error) {
        (0, logger_1.getLogger)().error({ error }, 'Error filtering tools');
        process.exit(1);
    }
}
//# sourceMappingURL=index.js.map