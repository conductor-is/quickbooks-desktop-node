"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCLIOptions = parseCLIOptions;
exports.parseQueryOptions = parseQueryOptions;
const qs_1 = __importDefault(require("qs"));
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const zod_1 = __importDefault(require("zod"));
const util_1 = require("./util.js");
function parseCLIOptions() {
    const opts = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
        .option('code-allow-http-gets', {
        type: 'boolean',
        description: 'Allow all code tool methods that map to HTTP GET operations. If all code-allow-* flags are unset, then everything is allowed.',
    })
        .option('code-allowed-methods', {
        type: 'string',
        array: true,
        description: 'Methods to explicitly allow for code tool. Evaluated as regular expressions against method fully qualified names. If all code-allow-* flags are unset, then everything is allowed.',
    })
        .option('code-blocked-methods', {
        type: 'string',
        array: true,
        description: 'Methods to explicitly block for code tool. Evaluated as regular expressions against method fully qualified names. If all code-allow-* flags are unset, then everything is allowed.',
    })
        .option('code-execution-mode', {
        type: 'string',
        choices: ['local'],
        default: 'local',
        description: 'The server was generated without access to the Stainless API, so code execution can only run locally on the MCP server machine.',
    })
        .option('custom-instructions-path', {
        type: 'string',
        description: 'Path to custom instructions for the MCP server',
    })
        .option('debug', { type: 'boolean', description: 'Enable debug logging' })
        .option('docs-dir', {
        type: 'string',
        description: 'Path to a directory of local documentation files (markdown/JSON) to include in local docs search.',
    })
        .option('docs-search-mode', {
        type: 'string',
        choices: ['local'],
        default: 'local',
        description: "Documentation search will use an in-memory search index built from embedded SDK method data and optional local docs files; the 'stainless-api' option is unavailable.",
    })
        .option('log-format', {
        type: 'string',
        choices: ['json', 'pretty'],
        description: 'Format for log output; defaults to json unless tty is detected',
    })
        .option('no-tools', {
        type: 'string',
        array: true,
        choices: ['code', 'docs'],
        description: 'Tools to explicitly disable',
    })
        .option('port', {
        type: 'number',
        default: 3000,
        description: 'Port to serve on if using http transport',
    })
        .option('socket', { type: 'string', description: 'Unix socket to serve on if using http transport' })
        .option('stainless-api-key', {
        type: 'string',
        default: (0, util_1.readEnv)('STAINLESS_API_KEY'),
        description: 'API key for Stainless. Used to authenticate requests to Stainless-hosted tools endpoints.',
    })
        .option('tools', {
        type: 'string',
        array: true,
        choices: ['code', 'docs'],
        description: 'Tools to explicitly enable',
    })
        .option('transport', {
        type: 'string',
        choices: ['stdio', 'http'],
        default: 'stdio',
        description: 'What transport to use; stdio for local servers or http for remote servers',
    })
        .env('MCP_SERVER')
        .version(true)
        .help();
    const argv = opts.parseSync();
    const shouldIncludeToolType = (toolType) => argv.noTools?.includes(toolType) ? false
        : argv.tools?.includes(toolType) ? true
            : undefined;
    const includeCodeTool = shouldIncludeToolType('code');
    const includeDocsTools = shouldIncludeToolType('docs');
    const transport = argv.transport;
    const logFormat = argv.logFormat ? argv.logFormat
        : process.stderr.isTTY ? 'pretty'
            : 'json';
    return {
        ...(includeCodeTool !== undefined && { includeCodeTool }),
        ...(includeDocsTools !== undefined && { includeDocsTools }),
        debug: !!argv.debug,
        stainlessApiKey: argv.stainlessApiKey,
        docsSearchMode: argv.docsSearchMode,
        docsDir: argv.docsDir,
        codeAllowHttpGets: argv.codeAllowHttpGets,
        codeAllowedMethods: argv.codeAllowedMethods,
        codeBlockedMethods: argv.codeBlockedMethods,
        codeExecutionMode: argv.codeExecutionMode,
        customInstructionsPath: argv.customInstructionsPath,
        transport,
        logFormat,
        port: argv.port,
        socket: argv.socket,
    };
}
const coerceArray = (zodType) => zod_1.default.preprocess((val) => Array.isArray(val) ? val
    : val ? [val]
        : val, zod_1.default.array(zodType).optional());
const QueryOptions = zod_1.default.object({
    tools: coerceArray(zod_1.default.enum(['code', 'docs'])).describe('Specify which MCP tools to use'),
    no_tools: coerceArray(zod_1.default.enum(['code', 'docs'])).describe('Specify which MCP tools to not use.'),
    tool: coerceArray(zod_1.default.string()).describe('Include tools matching the specified names'),
});
function parseQueryOptions(defaultOptions, query) {
    const queryObject = typeof query === 'string' ? qs_1.default.parse(query) : query;
    const queryOptions = QueryOptions.parse(queryObject);
    let codeTool = queryOptions.no_tools && queryOptions.no_tools?.includes('code') ? false
        : queryOptions.tools?.includes('code') ? true
            : defaultOptions.includeCodeTool;
    let docsTools = queryOptions.no_tools && queryOptions.no_tools?.includes('docs') ? false
        : queryOptions.tools?.includes('docs') ? true
            : defaultOptions.includeDocsTools;
    return {
        ...(codeTool !== undefined && { includeCodeTool: codeTool }),
        ...(docsTools !== undefined && { includeDocsTools: docsTools }),
        codeExecutionMode: defaultOptions.codeExecutionMode,
        docsSearchMode: defaultOptions.docsSearchMode,
        docsDir: defaultOptions.docsDir,
    };
}
//# sourceMappingURL=options.js.map