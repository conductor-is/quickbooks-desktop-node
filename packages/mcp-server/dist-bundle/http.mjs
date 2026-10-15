// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { getStainlessApiKey, parseClientAuthHeaders } from "./auth.mjs";
import { getLogger } from "./logger.mjs";
import { initMcpServer, newMcpServer } from "./server.mjs";
const newServer = async ({ clientOptions, mcpOptions, req, res, }) => {
    const stainlessApiKey = getStainlessApiKey(req, mcpOptions);
    const customInstructionsPath = mcpOptions.customInstructionsPath;
    const server = await newMcpServer({ stainlessApiKey, customInstructionsPath });
    const authOptions = parseClientAuthHeaders(req, false);
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
                getLogger().info({ clientPermissions: parsed }, 'Overriding code execution permissions from x-stainless-mcp-client-permissions header');
            }
        }
        catch (error) {
            getLogger().warn({ error }, 'Failed to parse x-stainless-mcp-client-permissions header');
        }
    }
    const mcpClientInfo = typeof req.body?.params?.clientInfo?.name === 'string' ?
        { name: req.body.params.clientInfo.name, version: String(req.body.params.clientInfo.version ?? '') }
        : undefined;
    await initMcpServer({
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
        getLogger().info({ mcpSessionId: req.mcpSessionId, mcpClientInfo }, 'MCP client connected');
    }
    return server;
};
const post = (options) => async (req, res) => {
    const server = await newServer({ ...options, req, res });
    // If we return null, we already set the authorization error.
    if (server === null)
        return;
    const transport = new StreamableHTTPServerTransport();
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
export const streamableHTTPApp = ({ clientOptions = {}, mcpOptions, }) => {
    const app = express();
    app.set('query parser', 'extended');
    app.use(express.json());
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
    app.use(pinoHttp({
        logger: getLogger(),
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
            req: pino.stdSerializers.wrapRequestSerializer((req) => {
                return {
                    ...req,
                    headers: redactHeaders(req.raw.headers),
                };
            }),
            res: pino.stdSerializers.wrapResponseSerializer((res) => {
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
export const launchStreamableHTTPServer = async ({ mcpOptions, port, }) => {
    const app = streamableHTTPApp({ mcpOptions });
    const server = app.listen(port);
    const address = server.address();
    const logger = getLogger();
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
//# sourceMappingURL=http.mjs.map