"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeTool = codeTool;
const types_1 = require("./types.js");
const logger_1 = require("./logger.js");
const prompt = `Runs JavaScript code to interact with the Conductor API.

You are a skilled TypeScript programmer writing code to interface with the service.
Define an async function named "run" that takes a single parameter of an initialized SDK client and it will be run.
For example:

\`\`\`
async function run(conductor) {
  const page = await conductor.qbd.invoices.list({ conductorEndUserId: 'YOUR_END_USER_ID' });
  const invoice = page.data[0]

  console.log(invoice.id);
}
\`\`\`

You will be returned anything that your function returns, plus the results of any console.log statements.
Do not add try-catch blocks for single API calls. The tool will handle errors for you.
Do not add comments unless necessary for generating better code.
Code will run in a container, and cannot interact with the network outside of the given SDK client.
Variables will not persist between calls, so make sure to return or log any data you might need later.
Remember that you are writing TypeScript code, so you need to be careful with your types.
Always type dynamic key-value stores explicitly as Record<string, YourValueType> instead of {}.`;
/**
 * A tool that runs code against a copy of the SDK.
 *
 * Instead of exposing every endpoint as its own tool, which uses up too many tokens for LLMs to use at once,
 * we expose a single tool that can be used to search for endpoints by name, resource, operation, or tag, and then
 * a generic endpoint that can be used to invoke any endpoint with the provided arguments.
 *
 * @param blockedMethods - The methods to block for code execution. Blocking is done by simple string
 * matching, so it is not secure against obfuscation. For stronger security, block in the downstream API
 * with limited API keys.
 * @param codeExecutionMode - Whether to execute code in a local Deno environment or in a remote
 * sandbox environment hosted by Stainless.
 */
function codeTool({ blockedMethods, codeExecutionMode, }) {
    const metadata = { resource: 'all', operation: 'write', tags: [] };
    const tool = {
        name: 'execute',
        description: prompt,
        inputSchema: {
            type: 'object',
            properties: {
                code: {
                    type: 'string',
                    description: 'Code to execute.',
                },
                intent: {
                    type: 'string',
                    description: 'Task you are trying to perform. Used for improving the service.',
                },
            },
            required: ['code'],
        },
    };
    const logger = (0, logger_1.getLogger)();
    const handler = async ({ reqContext, args, }) => {
        const code = args.code;
        // Do very basic blocking of code that includes forbidden method names.
        //
        // WARNING: This is not secure against obfuscation and other evasion methods. If
        // stronger security blocks are required, then these should be enforced in the downstream
        // API (e.g., by having users call the MCP server with API keys with limited permissions).
        if (blockedMethods) {
            const blockedMatches = blockedMethods.filter((method) => code.includes(method.fullyQualifiedName));
            if (blockedMatches.length > 0) {
                return (0, types_1.asErrorResult)(`The following methods have been blocked by the MCP server and cannot be used in code execution: ${blockedMatches
                    .map((m) => m.fullyQualifiedName)
                    .join(', ')}`);
            }
        }
        let result;
        const startTime = Date.now();
        logger.debug('Executing code in local Deno environment');
        result = await localDenoHandler({ reqContext, args });
        logger.info({
            codeExecutionMode,
            durationMs: Date.now() - startTime,
            isError: result.isError,
            contentRows: result.content?.length ?? 0,
        }, 'Got code tool execution result');
        return result;
    };
    return { metadata, tool, handler };
}
const localDenoHandler = async ({ reqContext, args, }) => {
    const fs = await Promise.resolve().then(() => __importStar(require('node:fs')));
    const path = await Promise.resolve().then(() => __importStar(require('node:path')));
    const url = await Promise.resolve().then(() => __importStar(require('node:url')));
    const { newDenoHTTPWorker } = await Promise.resolve().then(() => __importStar(require('@valtown/deno-http-worker')));
    const { getWorkerPath } = await Promise.resolve().then(() => __importStar(require('./code-tool-paths.cjs')));
    const workerPath = getWorkerPath();
    const client = reqContext.client;
    const baseURLHostname = new URL(client.baseURL).hostname;
    const { code } = args;
    let denoPath;
    const packageRoot = path.resolve(path.dirname(workerPath), '..');
    const packageNodeModulesPath = path.resolve(packageRoot, 'node_modules');
    // Check if deno is in PATH
    const { execSync } = await Promise.resolve().then(() => __importStar(require('node:child_process')));
    try {
        execSync('command -v deno', { stdio: 'ignore' });
        denoPath = 'deno';
    }
    catch {
        try {
            // Use deno binary in node_modules if it's found
            const denoNodeModulesPath = path.resolve(packageNodeModulesPath, 'deno', 'bin.cjs');
            await fs.promises.access(denoNodeModulesPath, fs.constants.X_OK);
            denoPath = denoNodeModulesPath;
        }
        catch {
            return (0, types_1.asErrorResult)('Deno is required for code execution but was not found. ' +
                'Install it from https://deno.land or run: npm install deno');
        }
    }
    const allowReadPaths = [
        'code-tool-worker.mjs',
        `${workerPath.replace(/([\/\\]node_modules)[\/\\].+$/, '$1')}/`,
        packageRoot,
    ];
    // Follow symlinks in node_modules to allow read access to workspace-linked packages
    try {
        const sdkPkgName = 'conductor-node';
        const sdkDir = path.resolve(packageNodeModulesPath, sdkPkgName);
        const realSdkDir = fs.realpathSync(sdkDir);
        if (realSdkDir !== sdkDir) {
            allowReadPaths.push(realSdkDir);
        }
    }
    catch {
        // Ignore if symlink resolution fails
    }
    const allowRead = allowReadPaths.join(',');
    const worker = await newDenoHTTPWorker(url.pathToFileURL(workerPath), {
        denoExecutable: denoPath,
        runFlags: [
            `--node-modules-dir=manual`,
            `--allow-read=${allowRead}`,
            `--allow-net=${baseURLHostname}`,
            // Allow environment variables because instantiating the client will try to read from them,
            // even though they are not set.
            '--allow-env',
        ],
        printOutput: true,
        spawnOptions: {
            cwd: path.dirname(workerPath),
            // Merge any upstream client envs into the Deno subprocess environment,
            // with the upstream env vars taking precedence.
            env: { ...process.env, ...reqContext.upstreamClientEnvs },
        },
    });
    try {
        const resp = await new Promise((resolve, reject) => {
            worker.addEventListener('exit', (exitCode) => {
                reject(new Error(`Worker exited with code ${exitCode}`));
            });
            // Strip null/undefined values so that the worker SDK client can fall back to
            // reading from environment variables (including any upstreamClientEnvs).
            const opts = {
                ...(client.baseURL != null ? { baseURL: client.baseURL } : undefined),
                ...(client.apiKey != null ? { apiKey: client.apiKey } : undefined),
                defaultHeaders: {
                    'X-Stainless-MCP': 'true',
                },
            };
            const req = worker.request('http://localhost', {
                headers: {
                    'content-type': 'application/json',
                },
                method: 'POST',
            }, (resp) => {
                const body = [];
                resp.on('error', (err) => {
                    reject(err);
                });
                resp.on('data', (chunk) => {
                    body.push(chunk);
                });
                resp.on('end', () => {
                    resolve(new Response(Buffer.concat(body).toString(), {
                        status: resp.statusCode ?? 200,
                        headers: resp.headers,
                    }));
                });
            });
            const body = JSON.stringify({
                opts,
                code,
            });
            req.write(body, (err) => {
                if (err != null) {
                    reject(err);
                }
            });
            req.end();
        });
        if (resp.status === 200) {
            const { result, log_lines, err_lines } = (await resp.json());
            const returnOutput = result == null ? null : ({
                type: 'text',
                text: typeof result === 'string' ? result : JSON.stringify(result),
            });
            const logOutput = log_lines.length === 0 ?
                null
                : {
                    type: 'text',
                    text: log_lines.join('\n'),
                };
            const errOutput = err_lines.length === 0 ?
                null
                : {
                    type: 'text',
                    text: 'Error output:\n' + err_lines.join('\n'),
                };
            return {
                content: [returnOutput, logOutput, errOutput].filter((block) => block !== null),
            };
        }
        else {
            const { result, log_lines, err_lines } = (await resp.json());
            const messageOutput = result == null ? null : ({
                type: 'text',
                text: typeof result === 'string' ? result : JSON.stringify(result),
            });
            const logOutput = log_lines.length === 0 ?
                null
                : {
                    type: 'text',
                    text: log_lines.join('\n'),
                };
            const errOutput = err_lines.length === 0 ?
                null
                : {
                    type: 'text',
                    text: 'Error output:\n' + err_lines.join('\n'),
                };
            return {
                content: [messageOutput, logOutput, errOutput].filter((block) => block !== null),
                isError: true,
            };
        }
    }
    finally {
        worker.terminate();
    }
};
//# sourceMappingURL=code-tool.js.map