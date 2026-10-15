// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { CallToolRequestSchema, ListToolsRequestSchema, SetLevelRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';
import { codeTool } from "./code-tool.mjs";
import docsSearchTool from "./docs-search-tool.mjs";
import { setLocalSearch } from "./docs-search-tool.mjs";
import { LocalDocsSearch } from "./local-docs-search.mjs";
import { getInstructions } from "./instructions.mjs";
import { blockedMethodsForCodeTool } from "./methods.mjs";
export const newMcpServer = async ({ stainlessApiKey, customInstructionsPath, }) => new McpServer({
    name: 'conductor_node_api',
    version: '14.24.0', // x-release-please-version
}, {
    instructions: await getInstructions({ stainlessApiKey, customInstructionsPath }),
    capabilities: { tools: {}, logging: {} },
});
/**
 * Initializes the provided MCP Server with the given tools and handlers.
 * If not provided, the default client, tools and handlers will be used.
 */
export async function initMcpServer(params) {
    const server = params.server instanceof McpServer ? params.server.server : params.server;
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
        const localSearch = await LocalDocsSearch.create(docsDir ? { docsDir } : undefined);
        setLocalSearch(localSearch);
    }
    let _client;
    let _clientError;
    let _logLevel;
    const getClient = () => {
        if (_clientError)
            throw _clientError;
        if (!_client) {
            try {
                _client = new Conductor({
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
    server.setRequestHandler(SetLevelRequestSchema, async (request) => {
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
export function selectTools(options) {
    const includedTools = [];
    if (options?.includeCodeTool ?? true) {
        includedTools.push(codeTool({
            blockedMethods: blockedMethodsForCodeTool(options),
            codeExecutionMode: options?.codeExecutionMode ?? 'local',
        }));
    }
    if (options?.includeDocsTools ?? true) {
        includedTools.push(docsSearchTool);
    }
    return includedTools;
}
/**
 * Runs the provided handler with the given client and arguments.
 */
export async function executeHandler({ handler, reqContext, args, }) {
    return await handler({ reqContext, args: args || {} });
}
//# sourceMappingURL=server.mjs.map