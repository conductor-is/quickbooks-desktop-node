// Conductor patch: shared helpers for the execute tool's abort-on-disconnect, its per-call telemetry, and
// the OAuth gate's rejection logging. Custom file (not generated), imported by code-tool.ts, http.ts and
// oauth.ts. Every env flag here deliberately avoids the MCP_SERVER_ prefix so the yargs .env('MCP_SERVER')
// binding in options.ts never sees it (same rule as CODE_EXECUTION_TIMEOUT_MS and CONDUCTOR_MCP_KEY_PROBE).
import { readEnv } from './util';
import type { ToolCallResult } from './types';

const OFF_VALUES: ReadonlySet<string> = new Set(['off', 'false', '0', 'no']);

// A kill switch is on unless its value is one of OFF_VALUES; an unset variable means on.
function envFlagEnabled(name: string): boolean {
  return !OFF_VALUES.has((readEnv(name) ?? '').trim().toLowerCase());
}

// CONDUCTOR_MCP_ABORT_ON_CLOSE=off: stop closing the transport when the client's POST socket closes, so a
// disconnected client's code runs to completion or the timeout as before (http.ts).
export function abortOnClientCloseEnabled(): boolean {
  return envFlagEnabled('CONDUCTOR_MCP_ABORT_ON_CLOSE');
}

// CONDUCTOR_MCP_AGENT_ERRORS=off: stop rewriting API error messages inside the execute sandbox, so the
// model sees the SDK's own text again (code-tool-worker.ts, src/agent-errors.ts).
export function agentErrorFormattingEnabled(): boolean {
  return envFlagEnabled('CONDUCTOR_MCP_AGENT_ERRORS');
}

// Thrown inside the execute tool's race when the MCP request's abort signal fires (the client closed its
// HTTP request). Caught in code-tool.ts, never leaves it.
export class CodeExecutionAbortedError extends Error {}

export const CLIENT_CLOSED_MESSAGE =
  'The client closed the connection, so execution stopped. Requests already sent may have completed, so check any records the code created or changed before running it again.';

// Request header values built from client-sent strings (the User-Agent, the mcp-session-id) are reduced
// to printable ASCII, because one non-ASCII byte makes fetch throw on every request of that execute call,
// and cut to a fixed length so a hostile value cannot bloat headers or logs. Returns undefined for an
// empty or absent value so callers omit the field.
export function asciiHeaderValue(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const ascii = value
    .replace(/[^\x20-\x7E]/g, '')
    .trim()
    .slice(0, maxLength);
  return ascii === '' ? undefined : ascii;
}

// The MCP request's User-Agent as sent to the API (Conductor-MCP-Client) and written to log lines;
// sanitized once where it enters, in http.ts.
export function sanitizeUserAgent(value: unknown, maxLength = 120): string | undefined {
  return asciiHeaderValue(value, maxLength);
}

// The headers the sandbox's SDK client adds to every API request of one execute call, so Better Stack
// (source 214704 logs every non-secret request header) can join each relayed request to its execute call,
// MCP session and client. Header names contain none of the API's redaction patterns (token, secret,
// password, credential, authorization).
export function executeTelemetryHeaders(params: {
  callId: string;
  mcpSessionId: string | undefined;
  userAgent: string | undefined;
}): Record<string, string> {
  const headers: Record<string, string> = { 'Conductor-MCP-Call-Id': params.callId };
  // The session id is whatever the client sent as mcp-session-id (or the UUID http.ts minted), so it is
  // sanitized like the User-Agent.
  const session = asciiHeaderValue(params.mcpSessionId, 128);
  if (session) headers['Conductor-MCP-Session-Id'] = session;
  const client = sanitizeUserAgent(params.userAgent);
  if (client) headers['Conductor-MCP-Client'] = client;
  return headers;
}

// The JSON-RPC method (or 'batch') and, for tools/call, the tool name, from a parsed request body. Logged
// on every request line and gate rejection, so execute versus search_docs and initialize versus tools/call
// are visible for clients that send no mcp-method or mcp-name header. Never reads params beyond the name.
export function rpcMethodProps(body: unknown): { rpcMethod?: string; tool?: string } {
  if (Array.isArray(body)) return { rpcMethod: 'batch' };
  if (typeof body !== 'object' || body === null) return {};
  const { method, params } = body as { method?: unknown; params?: { name?: unknown } };
  if (typeof method !== 'string') return {};
  const props: { rpcMethod?: string; tool?: string } = { rpcMethod: method.slice(0, 64) };
  if (
    method === 'tools/call' &&
    typeof params === 'object' &&
    params !== null &&
    typeof params.name === 'string'
  ) {
    props.tool = params.name.slice(0, 64);
  }
  return props;
}

export type ExecuteErrorKind =
  | 'blocked_method'
  | 'client_closed'
  | 'timeout'
  | 'no_deno'
  | 'no_run_function'
  | 'ts_diagnostics'
  | `api_error:${string}`
  | 'api_error'
  | 'api_connection_error'
  | 'runtime_error'
  | 'unknown';

// A fixed label for a failed execute result, derived from the shape of its first text block and never
// carrying the text itself: TypeScript diagnostics and runtime errors echo lines of the agent's code,
// which can hold customer names and amounts, and the MCP logs carry no code, intent or results.
export function classifyExecuteError(result: ToolCallResult): ExecuteErrorKind {
  const first = result.content.find((block) => block.type === 'text');
  const text = first && first.type === 'text' ? first.text : '';
  if (text.startsWith('The following methods have been blocked')) return 'blocked_method';
  if (text.startsWith('The client closed the connection')) return 'client_closed';
  if (text.startsWith('Code execution timed out')) return 'timeout';
  if (text.startsWith('Deno is required')) return 'no_deno';
  if (text.startsWith('The code is missing a top-level') || text.startsWith('The code argument is missing')) {
    return 'no_run_function';
  }
  if (text.startsWith('The code contains TypeScript diagnostics')) return 'ts_diagnostics';
  // The worker prints `${error.name}: ${error.message}` (the SDK's classes leave name as 'Error');
  // src/agent-errors.ts makes the message `<CODE>: <message> ...`, without it the SDK's own text is
  // `<status> <body>`.
  // The SDK's own connection failures (no response at all) come before any API code.
  if (/^[A-Za-z]*Error: (Connection error\.|Request timed out\.)/.test(text)) return 'api_connection_error';
  // A rewritten API error carries the code and, on the same line, the HTTP status; a runtime throw whose
  // message merely starts with an upper-case word and a colon does not.
  const apiError = text.match(/^[A-Za-z]*Error: ([A-Z][A-Z0-9_]+): .*\((?:HTTP \d{3}|no HTTP status)/);
  if (apiError) return `api_error:${apiError[1]}`;
  if (/^[A-Za-z]*Error: \d{3} /.test(text)) return 'api_error';
  if (/^[A-Za-z]*Error: /.test(text) || text.startsWith('Error output:')) return 'runtime_error';
  return 'unknown';
}
