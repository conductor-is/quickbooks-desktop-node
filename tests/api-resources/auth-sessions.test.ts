// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const conductor = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource authSessions', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.authSessions.create({
      endUserId: 'end_usr_1234567abcdefg',
      publishableKey: '{{YOUR_PUBLISHABLE_KEY}}',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await conductor.authSessions.create({
      endUserId: 'end_usr_1234567abcdefg',
      publishableKey: '{{YOUR_PUBLISHABLE_KEY}}',
      linkExpiryMins: 0,
      redirectUrl: 'https://example.com/auth/conductor-callback',
    });
  });
});
