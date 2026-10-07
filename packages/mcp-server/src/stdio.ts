import { runBridge, type BridgePermissions } from './bridge';
import { getLogger } from './logger';
import { CLIOptions } from './options';
import { readEnv } from './util';

export const DEFAULT_UPSTREAM_URL = 'https://mcp.conductor.is/';

// The literal from the docs config blocks; pasted wholesale it is the most
// common setup mistake, so refuse it before the client sees a confusing error.
const PLACEHOLDER_KEY = 'sk_conductor_...';

// Over stdio the package is a bridge to the hosted Conductor MCP server:
// nothing executes locally, and the only configuration is the secret key.
export const launchStdioServer = async (mcpOptions: CLIOptions) => {
  rejectHttpOnlyOptionsOrExit(mcpOptions);
  const apiKey = readSecretKeyOrExit();
  const upstreamUrl = readEnv('CONDUCTOR_MCP_URL') ?? DEFAULT_UPSTREAM_URL;
  const permissions: BridgePermissions = {
    ...(mcpOptions.codeAllowHttpGets !== undefined && { allow_http_gets: mcpOptions.codeAllowHttpGets }),
    ...(mcpOptions.codeAllowedMethods && { allowed_methods: mcpOptions.codeAllowedMethods }),
    ...(mcpOptions.codeBlockedMethods && { blocked_methods: mcpOptions.codeBlockedMethods }),
  };
  getLogger().info({ upstreamUrl, permissions }, 'MCP bridge running on stdio');
  await runBridge({ upstreamUrl, apiKey, permissions });
};

// The hosted server chooses its own tools, docs and instructions; refuse the
// flags that would silently do nothing over stdio.
function rejectHttpOnlyOptionsOrExit(options: CLIOptions): void {
  const flag =
    options.includeCodeTool === false || options.includeDocsTools === false ? '--no-tools'
    : options.includeCodeTool !== undefined || options.includeDocsTools !== undefined ? '--tools'
    : options.docsDir !== undefined ? '--docs-dir'
    : options.customInstructionsPath !== undefined ? '--custom-instructions-path'
    : options.socket !== undefined ? '--socket'
    : undefined;
  if (flag !== undefined) {
    console.error(
      `${flag} only applies to --transport=http. Over stdio this package bridges to the hosted Conductor MCP server, which serves its own tools and instructions.`,
    );
    process.exit(1);
  }
}

function readSecretKeyOrExit(): string {
  // Tolerate an accidental "Bearer " prefix; do not enforce an sk_conductor_
  // prefix, legacy keys without it are still active.
  const apiKey = (readEnv('CONDUCTOR_SECRET_KEY') ?? '').replace(/^Bearer\s+/i, '').trim();
  if (apiKey === '' || apiKey.includes(PLACEHOLDER_KEY)) {
    console.error(
      'CONDUCTOR_SECRET_KEY is not set or is still the sk_conductor_... placeholder. Create a secret key at https://dashboard.conductor.is/ and put it in the "env" block of your MCP config (https://docs.conductor.is/usage/mcp).',
    );
    process.exit(1);
  }
  return apiKey;
}
