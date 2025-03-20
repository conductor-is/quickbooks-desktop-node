// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const client = new Conductor({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource qbd', () => {
  test('healthCheck: only required params', async () => {
    const responsePromise = client.qbd.healthCheck({ conductorEndUserId: 'end_usr_1234567abcdefg' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('healthCheck: required and optional params', async () => {
    const response = await client.qbd.healthCheck({ conductorEndUserId: 'end_usr_1234567abcdefg' });
  });

  test('retrieveCompanyInfo: only required params', async () => {
    const responsePromise = client.qbd.retrieveCompanyInfo({ conductorEndUserId: 'end_usr_1234567abcdefg' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveCompanyInfo: required and optional params', async () => {
    const response = await client.qbd.retrieveCompanyInfo({ conductorEndUserId: 'end_usr_1234567abcdefg' });
  });

  test('retrieveCompanyPreferences: only required params', async () => {
    const responsePromise = client.qbd.retrieveCompanyPreferences({
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveCompanyPreferences: required and optional params', async () => {
    const response = await client.qbd.retrieveCompanyPreferences({
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });
});
