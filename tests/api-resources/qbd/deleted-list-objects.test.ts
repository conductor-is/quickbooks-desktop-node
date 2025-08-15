// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const conductor = new Conductor({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource deletedListObjects', () => {
  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.deletedListObjects.list({
      objectTypes: ['customer'],
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

  test('list: required and optional params', async () => {
    const response = await conductor.qbd.deletedListObjects.list({
      objectTypes: ['customer'],
      conductorEndUserId: 'end_usr_1234567abcdefg',
      deletedAfter: '2021-01-01T12:34:56',
      deletedBefore: '2021-02-01T12:34:56',
    });
  });
});
