"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMcpServer = void 0;
exports.initMcpServer = initMcpServer;
exports.selectTools = selectTools;
exports.executeHandler = executeHandler;
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const conductor_node_1 = __importDefault(require("conductor-node"));
const code_tool_1 = require("./code-tool.js");
const docs_search_tool_1 = __importDefault(require("./docs-search-tool.js"));
const docs_search_tool_2 = require("./docs-search-tool.js");
const local_docs_search_1 = require("./local-docs-search.js");
const instructions_1 = require("./instructions.js");
const methods_1 = require("./methods.js");
const newMcpServer = async ({ stainlessApiKey, customInstructionsPath, }) => new mcp_js_1.McpServer({
    name: 'conductor_node_api',
    version: '14.24.0', // x-release-please-version
}, {
    instructions: await (0, instructions_1.getInstructions)({ stainlessApiKey, customInstructionsPath }),
    capabilities: { tools: {}, logging: {} },
});
exports.newMcpServer = newMcpServer;
/**
 * Initializes the provided MCP Server with the given tools and handlers.
 * If not provided, the default client, tools and handlers will be used.
 */
async function initMcpServer(params) {
    const server = params.server instanceof mcp_js_1.McpServer ? params.server.server : params.server;
    const logAtLevel = (level) => (message, ...rest) => {
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
    if (params.mcpOptions?.docsSearchMode === 'local') {
        const docsDir = params.mcpOptions?.docsDir;
        const localSearch = await local_docs_search_1.LocalDocsSearch.create(docsDir ? { docsDir } : undefined);
        (0, docs_search_tool_2.setLocalSearch)(localSearch);
    }
    let _client;
    let _clientError;
    let _logLevel;
    const getClient = () => {
        if (_clientError)
            throw _clientError;
        if (!_client) {
            try {
                _client = new conductor_node_1.default({
                    logger,
                    ...params.clientOptions,
                    defaultHeaders: {
                        ...params.clientOptions?.defaultHeaders,
                        'X-Stainless-MCP': 'true',
                    },
                });
                if (_logLevel) {
                    _client = _client.withOptions({ logLevel: _logLevel });
                }
            }
            catch (e) {
                _clientError = e instanceof Error ? e : new Error(String(e));
                throw _clientError;
            }
        }
        return _client;
    };
    const providedTools = selectTools(params.mcpOptions);
    const toolMap = Object.fromEntries(providedTools.map((mcpTool) => [mcpTool.tool.name, mcpTool]));
    server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
        return {
            tools: providedTools.map((mcpTool) => mcpTool.tool),
        };
    });
    server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        const mcpTool = toolMap[name];
        if (!mcpTool) {
            throw new Error(`Unknown tool: ${name}`);
        }
        let client;
        try {
            client = getClient();
        }
        catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Failed to initialize client: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
                isError: true,
            };
        }
        return executeHandler({
            handler: mcpTool.handler,
            reqContext: {
                client,
                stainlessApiKey: params.stainlessApiKey ?? params.mcpOptions?.stainlessApiKey,
                upstreamClientEnvs: params.upstreamClientEnvs,
                mcpSessionId: params.mcpSessionId,
                mcpClientInfo: params.mcpClientInfo,
            },
            args,
        });
    });
    server.setRequestHandler(types_js_1.SetLevelRequestSchema, async (request) => {
        const { level } = request.params;
        let logLevel;
        switch (level) {
            case 'debug':
                logLevel = 'debug';
                break;
            case 'info':
                logLevel = 'info';
                break;
            case 'notice':
            case 'warning':
                logLevel = 'warn';
                break;
            case 'error':
                logLevel = 'error';
                break;
            default:
                logLevel = 'off';
                break;
        }
        _logLevel = logLevel;
        if (_client) {
            _client = _client.withOptions({ logLevel });
        }
        return {};
    });
}
/**
 * Selects the tools to include in the MCP Server based on the provided options.
 */
function selectTools(options) {
    const includedTools = [];
    if (options?.includeCodeTool ?? true) {
        includedTools.push((0, code_tool_1.codeTool)({
            blockedMethods: (0, methods_1.blockedMethodsForCodeTool)(options),
            codeExecutionMode: options?.codeExecutionMode ?? 'local',
        }));
    }
    if (options?.includeDocsTools ?? true) {
        includedTools.push(docs_search_tool_1.default);
    }
    return includedTools;
}
/**
 * Runs the provided handler with the given client and arguments.
 */
async function executeHandler({ handler, reqContext, args, }) {
    return await handler({ reqContext, args: args || {} });
}
//# sourceMappingURL=server.js.map