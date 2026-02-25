// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import qs from 'qs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import z from 'zod';
import { readEnv } from './util';

export type CLIOptions = McpOptions & {
  debug: boolean;
  transport: 'stdio' | 'http';
  port: number | undefined;
  socket: string | undefined;
};

export type McpOptions = {
  includeDocsTools?: boolean | undefined;
  stainlessApiKey?: string | undefined;
  codeAllowHttpGets?: boolean | undefined;
  codeAllowedMethods?: string[] | undefined;
  codeBlockedMethods?: string[] | undefined;
  codeExecutionMode: McpCodeExecutionMode;
};

export type McpCodeExecutionMode = 'stainless-sandbox' | 'local';

export function parseCLIOptions(): CLIOptions {
  const opts = yargs(hideBin(process.argv))
    .option('code-allow-http-gets', {
      type: 'boolean',
      description:
        'Allow all code tool methods that map to HTTP GET operations. If all code-allow-* flags are unset, then everything is allowed.',
    })
    .option('code-allowed-methods', {
      type: 'string',
      array: true,
      description:
        'Methods to explicitly allow for code tool. Evaluated as regular expressions against method fully qualified names. If all code-allow-* flags are unset, then everything is allowed.',
    })
    .option('code-blocked-methods', {
      type: 'string',
      array: true,
      description:
        'Methods to explicitly block for code tool. Evaluated as regular expressions against method fully qualified names. If all code-allow-* flags are unset, then everything is allowed.',
    })
    .option('code-execution-mode', {
      type: 'string',
      choices: ['stainless-sandbox', 'local'],
      default: 'stainless-sandbox',
      description:
        "Where to run code execution in code tool; 'stainless-sandbox' will execute code in Stainless-hosted sandboxes whereas 'local' will execute code locally on the MCP server machine.",
    })
    .option('debug', { type: 'boolean', description: 'Enable debug logging' })
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
      default: readEnv('STAINLESS_API_KEY'),
      description:
        'API key for Stainless. Used to authenticate requests to Stainless-hosted tools endpoints.',
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

  const shouldIncludeToolType = (toolType: 'code' | 'docs') =>
    argv.noTools?.includes(toolType) ? false
    : argv.tools?.includes(toolType) ? true
    : undefined;

  const includeDocsTools = shouldIncludeToolType('docs');

  const transport = argv.transport as 'stdio' | 'http';

  return {
    ...(includeDocsTools !== undefined && { includeDocsTools }),
    debug: !!argv.debug,
    stainlessApiKey: argv.stainlessApiKey,
    codeAllowHttpGets: argv.codeAllowHttpGets,
    codeAllowedMethods: argv.codeAllowedMethods,
    codeBlockedMethods: argv.codeBlockedMethods,
    codeExecutionMode: argv.codeExecutionMode as McpCodeExecutionMode,
    transport,
    port: argv.port,
    socket: argv.socket,
  };
}

const coerceArray = <T extends z.ZodTypeAny>(zodType: T) =>
  z.preprocess(
    (val) =>
      Array.isArray(val) ? val
      : val ? [val]
      : val,
    z.array(zodType).optional(),
  );

const QueryOptions = z.object({
  tools: coerceArray(z.enum(['code', 'docs'])).describe('Specify which MCP tools to use'),
  no_tools: coerceArray(z.enum(['code', 'docs'])).describe('Specify which MCP tools to not use.'),
  tool: coerceArray(z.string()).describe('Include tools matching the specified names'),
});

export function parseQueryOptions(defaultOptions: McpOptions, query: unknown): McpOptions {
  const queryObject = typeof query === 'string' ? qs.parse(query) : query;
  const queryOptions = QueryOptions.parse(queryObject);

  let docsTools: boolean | undefined =
    queryOptions.no_tools && queryOptions.no_tools?.includes('docs') ? false
    : queryOptions.tools?.includes('docs') ? true
    : defaultOptions.includeDocsTools;

  return {
    codeExecutionMode: defaultOptions.codeExecutionMode,
    ...(docsTools !== undefined && { includeDocsTools: docsTools }),
  };
}
