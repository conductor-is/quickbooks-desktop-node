"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchStreamableHTTPServer = exports.streamableHTTPApp = void 0;
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const express_1 = __importDefault(require("express"));
const pino_1 = __importDefault(require("pino"));
const pino_http_1 = __importDefault(require("pino-http"));
const auth_1 = require("./auth.js");
const logger_1 = require("./logger.js");
const server_1 = require("./server.js");
const newServer = async ({ clientOptions, mcpOptions, req, res, }) => {
    const stainlessApiKey = (0, auth_1.getStainlessApiKey)(req, mcpOptions);
    const customInstructionsPath = mcpOptions.customInstructionsPath;
    const server = await (0, server_1.newMcpServer)({ stainlessApiKey, customInstructionsPath });
    const authOptions = (0, auth_1.parseClientAuthHeaders)(req, false);
    let upstreamClientEnvs;
    const clientEnvsHeader = req.headers['x-stainless-mcp-client-envs'];
    if (typeof clientEnvsHeader === 'string') {
        try {
            const parsed = JSON.parse(clientEnvsHeader);
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                upstreamClientEnvs = parsed;
            }
        }
        catch {
            // Ignore malformed header
        }
    }
    // Parse x-stainless-mcp-client-permissions header to override permission options
    //
    // Note: Permissions are best-effort and intended to prevent clients from doing unexpected things;
    // they're not a hard security boundary, so we allow arbitrary, client-driven overrides.
    //
    // See the Stainless MCP documentation for more details.
    let effectiveMcpOptions = mcpOptions;
    const clientPermissionsHeader = req.headers['x-stainless-mcp-client-permissions'];
    if (typeof clientPermissionsHeader === 'string') {
        try {
            const parsed = JSON.parse(clientPermissionsHeader);
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                effectiveMcpOptions = {
                    ...mcpOptions,
                    ...(typeof parsed.allow_http_gets === 'boolean' && { codeAllowHttpGets: parsed.allow_http_gets }),
                    ...(Array.isArray(parsed.allowed_methods) && { codeAllowedMethods: parsed.allowed_methods }),
                    ...(Array.isArray(parsed.blocked_methods) && { codeBlockedMethods: parsed.blocked_methods }),
                };
                (0, logger_1.getLogger)().info({ clientPermissions: parsed }, 'Overriding code execution permissions from x-stainless-mcp-client-permissions header');
            }
        }
        catch (error) {
            (0, logger_1.getLogger)().warn({ error }, 'Failed to parse x-stainless-mcp-client-permissions header');
        }
    }
    const mcpClientInfo = typeof req.body?.params?.clientInfo?.name === 'string' ?
        { name: req.body.params.clientInfo.name, version: String(req.body.params.clientInfo.version ?? '') }
        : undefined;
    await (0, server_1.initMcpServer)({
        server: server,
        mcpOptions: effectiveMcpOptions,
        clientOptions: {
            ...clientOptions,
            ...authOptions,
        },
        stainlessApiKey: stainlessApiKey,
        upstreamClientEnvs,
        mcpSessionId: req.mcpSessionId,
        mcpClientInfo,
    });
    if (mcpClientInfo) {
        (0, logger_1.getLogger)().info({ mcpSessionId: req.mcpSessionId, mcpClientInfo }, 'MCP client connected');
    }
    return server;
};
const post = (options) => async (req, res) => {
    const server = await newServer({ ...options, req, res });
    // If we return null, we already set the authorization error.
    if (server === null)
        return;
    const transport = new streamableHttp_js_1.StreamableHTTPServerTransport();
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
};
const get = async (req, res) => {
    res.status(405).json({
        jsonrpc: '2.0',
        error: {
            code: -32000,
            message: 'Method not supported',
        },
    });
};
const del = async (req, res) => {
    res.status(405).json({
        jsonrpc: '2.0',
        error: {
            code: -32000,
            message: 'Method not supported',
        },
    });
};
const redactHeaders = (headers) => {
    const hiddenHeaders = /auth|cookie|key|token|x-stainless-mcp-client-envs/i;
    const filtered = { ...headers };
    Object.keys(filtered).forEach((key) => {
        if (hiddenHeaders.test(key)) {
            filtered[key] = '[REDACTED]';
        }
    });
    return filtered;
};
const streamableHTTPApp = ({ clientOptions = {}, mcpOptions, }) => {
    const app = (0, express_1.default)();
    app.set('query parser', 'extended');
    app.use(express_1.default.json());
    app.use((req, res, next) => {
        const existing = req.headers['mcp-session-id'];
        const sessionId = (Array.isArray(existing) ? existing[0] : existing) || crypto.randomUUID();
        req.mcpSessionId = sessionId;
        const origWriteHead = res.writeHead.bind(res);
        res.writeHead = function (statusCode, ...rest) {
            res.setHeader('mcp-session-id', sessionId);
            return origWriteHead(statusCode, ...rest);
        };
        next();
    });
    app.use((0, pino_http_1.default)({
        logger: (0, logger_1.getLogger)(),
        customProps: (req) => ({
            mcpSessionId: req.mcpSessionId,
        }),
        customLogLevel: (req, res) => {
            if (res.statusCode >= 500) {
                return 'error';
            }
            else if (res.statusCode >= 400) {
                return 'warn';
            }
            return 'info';
        },
        customSuccessMessage: function (req, res) {
            return `Request ${req.method} to ${req.url} completed with status ${res.statusCode}`;
        },
        customErrorMessage: function (req, res, err) {
            return `Request ${req.method} to ${req.url} errored with status ${res.statusCode}`;
        },
        serializers: {
            req: pino_1.default.stdSerializers.wrapRequestSerializer((req) => {
                return {
                    ...req,
                    headers: redactHeaders(req.raw.headers),
                };
            }),
            res: pino_1.default.stdSerializers.wrapResponseSerializer((res) => {
                return {
                    ...res,
                    headers: redactHeaders(res.headers),
                };
            }),
        },
    }));
    app.get('/health', async (req, res) => {
        res.status(200).send('OK');
    });
    app.get('/', get);
    app.post('/', post({ clientOptions, mcpOptions }));
    app.delete('/', del);
    return app;
};
exports.streamableHTTPApp = streamableHTTPApp;
const launchStreamableHTTPServer = async ({ mcpOptions, port, }) => {
    const app = (0, exports.streamableHTTPApp)({ mcpOptions });
    const server = app.listen(port);
    const address = server.address();
    const logger = (0, logger_1.getLogger)();
    if (typeof address === 'string') {
        logger.info(`MCP Server running on streamable HTTP at ${address}`);
    }
    else if (address !== null) {
        logger.info(`MCP Server running on streamable HTTP on port ${address.port}`);
    }
    else {
        logger.info(`MCP Server running on streamable HTTP on port ${port}`);
    }
};
exports.launchStreamableHTTPServer = launchStreamableHTTPServer;
//# sourceMappingURL=http.js.map