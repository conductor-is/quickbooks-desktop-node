// Conductor patch: what the model reads when an API call inside the execute sandbox fails
// (src/agent-errors.ts). The first block tests the pure formatter; the second runs a real SDK client
// against a mocked fetch, so a regenerated SDK that renames makeStatusError or changes how request()
// calls it fails here instead of silently restoring the raw JSON bodies.
import { Conductor } from 'conductor-node';
import { formatAgentErrorMessage, formatErrorsForAgents } from '../src/agent-errors';

const headersWith = (requestId?: string) =>
  new Headers(requestId ? { 'conductor-request-id': requestId } : {});

function envelope(code: string, message: string, type?: string) {
  return {
    error: { code, message, type, userFacingMessage: 'An internal server error occurred. Please try again.' },
  };
}

describe('formatAgentErrorMessage', () => {
  test('one line with code, message, status and request id, and no hint for an unknown code', () => {
    const text = formatAgentErrorMessage(
      400,
      envelope('INVALID_PARAMETERS', 'Unrecognized key: "payeeIds"', 'INVALID_REQUEST_ERROR'),
      headersWith('req_123'),
    );
    expect(text).toBe(
      'INVALID_PARAMETERS: Unrecognized key: "payeeIds" (HTTP 400, request req_123)\nCall `search_docs` with the method name to read its parameters instead of guessing again.',
    );
    expect(
      formatAgentErrorMessage(500, envelope('INTERNAL_ERROR', 'boom', 'INTERNAL_ERROR'), headersWith()),
    ).toBe('INTERNAL_ERROR: boom (HTTP 500)');
    // The masked userFacingMessage is never shown.
    expect(text).not.toContain('internal server error');
  });

  test('connection errors say the key and sign-in work; not-set-up says a different project may hold the file', () => {
    const password = formatAgentErrorMessage(
      401,
      envelope(
        'QBD_WEB_CONNECTOR_PASSWORD_INVALID',
        'Your Web Connector password is incorrect.',
        'INTEGRATION_CONNECTION_ERROR',
      ),
      headersWith('req_a'),
    );
    expect(password).toMatch(
      /^QBD_WEB_CONNECTOR_PASSWORD_INVALID: Your Web Connector password is incorrect. \(HTTP 401, request req_a\)\n/,
    );
    expect(password).toContain('do not reconnect the AI tool or create a new key');
    expect(password).toContain('retry at most once in a later call');
    for (const code of ['INTEGRATION_CONNECTION_NOT_ACTIVE', 'QBD_REQUEST_TIMEOUT', 'QBD_CONNECTION_ERROR']) {
      expect(
        formatAgentErrorMessage(502, envelope(code, 'm', 'INTEGRATION_CONNECTION_ERROR'), headersWith()),
      ).toContain('do not reconnect the AI tool');
    }
    const notSetUp = formatAgentErrorMessage(
      409,
      envelope(
        'INTEGRATION_CONNECTION_NOT_SET_UP',
        'Our servers have not heard from the Web Connector.',
        'INTEGRATION_CONNECTION_ERROR',
      ),
      headersWith(),
    );
    expect(notSetUp).toContain('connected in a different Conductor project');
    expect(notSetUp).not.toContain('do not reconnect');
  });

  test('end-user id hints are keyed on the code, and the No such end-user prefix', () => {
    const missing = formatAgentErrorMessage(
      401,
      envelope('END_USER_ID_HEADER_MISSING', 'You did not provide an EndUser ID.', 'AUTHENTICATION_ERROR'),
      headersWith(),
    );
    expect(missing).toContain('Pass `conductorEndUserId` from `conductor.endUsers.list()`');
    const wrongProject = formatAgentErrorMessage(
      404,
      envelope('RESOURCE_MISSING', "No such end-user: 'end_usr_x'.", 'INVALID_REQUEST_ERROR'),
      headersWith(),
    );
    expect(wrongProject).toContain('belong to one Conductor project');
    // Another missing resource gets neither the end-user hint nor the search_docs one.
    const otherMissing = formatAgentErrorMessage(
      404,
      envelope('RESOURCE_MISSING', 'No such API key.', 'INVALID_REQUEST_ERROR'),
      headersWith(),
    );
    expect(otherMissing).toBe('RESOURCE_MISSING: No such API key. (HTTP 404)');
  });

  test('QuickBooks rejections get no hint, and non-envelope bodies leave the SDK message alone', () => {
    expect(
      formatAgentErrorMessage(
        502,
        envelope('QBD_REQUEST_ERROR', 'QuickBooks Desktop error (3260): ...', 'INTEGRATION_ERROR'),
        headersWith(),
      ),
    ).toBe('QBD_REQUEST_ERROR: QuickBooks Desktop error (3260): ... (HTTP 502)');
    expect(formatAgentErrorMessage(403, '<html>blocked</html>', headersWith())).toBeUndefined();
    expect(formatAgentErrorMessage(403, { error: 'forbidden' }, headersWith())).toBeUndefined();
    expect(formatAgentErrorMessage(undefined, envelope('X', 'y'), undefined)).toBe('X: y (no HTTP status)');
  });
});

describe('formatErrorsForAgents on a real SDK client', () => {
  const body = envelope(
    'QBD_WEB_CONNECTOR_PASSWORD_INVALID',
    'Your Web Connector password is incorrect.',
    'INTEGRATION_CONNECTION_ERROR',
  );
  const fetchMock = async () =>
    new Response(JSON.stringify(body), {
      status: 401,
      headers: {
        'content-type': 'application/json',
        'conductor-request-id': 'req_mock',
        'x-should-retry': 'false',
      },
    });

  test('without the patch the SDK message is the status plus the whole body', async () => {
    const client = new Conductor({
      apiKey: 'sk_conductor_test',
      baseURL: 'http://api.invalid/v1',
      fetch: fetchMock as any,
      maxRetries: 0,
    });
    await expect(client.qbd.accounts.list({ conductorEndUserId: 'end_usr_x' })).rejects.toThrow(
      /^401 \{"error":/,
    );
  });

  test('rewrites message only; class, status, headers and the body are untouched', async () => {
    const client = new Conductor({
      apiKey: 'sk_conductor_test',
      baseURL: 'http://api.invalid/v1',
      fetch: fetchMock as any,
      maxRetries: 0,
    });
    formatErrorsForAgents(client);
    let caught: any;
    try {
      await client.qbd.accounts.list({ conductorEndUserId: 'end_usr_x' });
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeDefined();
    expect(caught.constructor.name).toBe('AuthenticationError');
    expect(caught.status).toBe(401);
    expect(caught.error).toEqual(body);
    expect(caught.headers.get('conductor-request-id')).toBe('req_mock');
    expect(caught.message).toMatch(
      /^QBD_WEB_CONNECTOR_PASSWORD_INVALID: Your Web Connector password is incorrect. \(HTTP 401, request req_mock\)\n/,
    );
    expect(caught.message).not.toContain('{');
    // The patch is on the prototype, so a client derived with withOptions is covered too.
    const derived = client.withOptions({ maxRetries: 0 });
    await expect(derived.qbd.accounts.list({ conductorEndUserId: 'end_usr_x' })).rejects.toThrow(
      /^QBD_WEB_CONNECTOR_PASSWORD_INVALID: /,
    );
  });
});
