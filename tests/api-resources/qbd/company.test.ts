// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const client = new Conductor({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource company', () => {
  test('info: only required params', async () => {
    const responsePromise = client.qbd.company.info({ conductorEndUserId: 'end_usr_1234567abcdefg' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('info: required and optional params', async () => {
    const response = await client.qbd.company.info({ conductorEndUserId: 'end_usr_1234567abcdefg' });
  });

  test('preferences: only required params', async () => {
    const responsePromise = client.qbd.company.preferences({ conductorEndUserId: 'end_usr_1234567abcdefg' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('preferences: required and optional params', async () => {
    const response = await client.qbd.company.preferences({ conductorEndUserId: 'end_usr_1234567abcdefg' });
  });
});
