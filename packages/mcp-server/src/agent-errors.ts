// Conductor patch: what the model reads when an API call inside the execute sandbox fails. Custom file
// (not generated), imported by code-tool-worker.ts, so it runs inside the Deno worker and must stay free
// of Node-only imports.
//
// The SDK builds an APIError's message from the response body, and because Conductor nests the message
// under `error`, that is `<status> <the entire JSON body>`: the misleading status first, the message
// twice for QuickBooks errors, and on every developer 4xx the masked "An internal server error occurred"
// userFacingMessage next to the real message. The audit of 2026-10-27 found agents reading those bodies
// as "reconnect" (a wrong Web Connector password answered 401) and guessing again instead of looking
// parameters up. This rewrites only `message`, to `<CODE>: <message> (HTTP <status>, request <id>)`
// plus, for a few codes and types, one hint saying what to do next. The error's class, `status`,
// `headers` and `error` (the full body) are untouched, so code that branches on them keeps working.
// Hints are keyed on the envelope's `code` and `type`, never on message text, except the one
// `No such end-user` prefix, which is stable API copy; a renamed code only drops its hint.
// CONDUCTOR_MCP_AGENT_ERRORS=off (read in code-tool.ts, passed in the worker request) turns it off.

type ErrorEnvelope = { code: string; message: string; type?: string };

const CONNECTION_HINT =
  'The Conductor API key and sign-in are working, so do not reconnect the AI tool or create a new key; the fix is on the computer that runs QuickBooks Desktop. Tell the user the message above. Do not retry in this call; retry at most once in a later call, and stop if it fails again.';
const NOT_SET_UP_HINT =
  "This company file has never connected to this Conductor project; the fix is on the computer that runs QuickBooks Desktop, so tell the user the message above. If the user's company file is connected in a different Conductor project, signing in again and choosing that project fixes it. Do not retry in this call; retry at most once in a later call, and stop if it fails again.";
const END_USER_ID_HINT =
  'Pass `conductorEndUserId` from `conductor.endUsers.list()`. End-user ids belong to one Conductor project, so an id from another project or an earlier key does not work here.';
const INVALID_REQUEST_HINT =
  'Call `search_docs` with the method name to read its parameters instead of guessing again.';

// Replaces the client instance's makeStatusError (the SDK calls it as `this.makeStatusError` for every
// non-2xx response) with a wrapper that rewrites the resulting error's message. Anything unexpected
// leaves the SDK's own error untouched.
export function formatErrorsForAgents(client: object): void {
  const target = client as { makeStatusError?: (...args: unknown[]) => Error };
  const original = target.makeStatusError;
  if (typeof original !== 'function') return;
  target.makeStatusError = function (this: unknown, ...args: unknown[]): Error {
    const error = original.apply(this, args);
    try {
      const [status, body, , headers] = args;
      const formatted = formatAgentErrorMessage(status, body, headers);
      if (formatted !== undefined) error.message = formatted;
    } catch {
      // Keep the SDK's message.
    }
    return error;
  };
}

// The rewritten message for a Conductor error envelope, or undefined when the body is not one (an edge
// HTML page, a network failure, another service), in which case the SDK's text stands.
export function formatAgentErrorMessage(
  status: unknown,
  body: unknown,
  headers: unknown,
): string | undefined {
  const envelope = envelopeOf(body);
  if (envelope === undefined) return undefined;
  const requestId = requestIdOf(headers);
  const statusText = typeof status === 'number' ? `HTTP ${status}` : 'no HTTP status';
  const head = `${envelope.code}: ${envelope.message} (${statusText}${requestId ? `, request ${requestId}` : ''})`;
  const hint = hintFor(envelope);
  return hint === undefined ? head : `${head}\n${hint}`;
}

function hintFor({ code, message, type }: ErrorEnvelope): string | undefined {
  if (code === 'INTEGRATION_CONNECTION_NOT_SET_UP') return NOT_SET_UP_HINT;
  if (type === 'INTEGRATION_CONNECTION_ERROR') return CONNECTION_HINT;
  if (code === 'END_USER_ID_HEADER_MISSING') return END_USER_ID_HINT;
  if (code === 'RESOURCE_MISSING')
    return message.startsWith('No such end-user') ? END_USER_ID_HINT : undefined;
  if (type === 'INVALID_REQUEST_ERROR') return INVALID_REQUEST_HINT;
  return undefined;
}

function envelopeOf(body: unknown): ErrorEnvelope | undefined {
  if (typeof body !== 'object' || body === null) return undefined;
  const error = (body as { error?: unknown }).error;
  if (typeof error !== 'object' || error === null) return undefined;
  const { code, message, type } = error as { code?: unknown; message?: unknown; type?: unknown };
  if (typeof code !== 'string' || code === '' || typeof message !== 'string') return undefined;
  return { code, message, ...(typeof type === 'string' && { type }) };
}

function requestIdOf(headers: unknown): string | undefined {
  const get = (headers as { get?: (name: string) => string | null } | null)?.get;
  if (typeof get !== 'function') return undefined;
  const value = get.call(headers, 'conductor-request-id');
  return typeof value === 'string' && value !== '' ? value : undefined;
}
