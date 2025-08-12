// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const conductor = new Conductor({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource endUsers', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.endUsers.create({
      companyName: 'Acme Inc.',
      email: 'alice@acme.com',
      sourceId: '12345678-abcd-abcd-example-1234567890ab',
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
    const response = await conductor.endUsers.create({
      companyName: 'Acme Inc.',
      email: 'alice@acme.com',
      sourceId: '12345678-abcd-abcd-example-1234567890ab',
    });
  });

  test('retrieve', async () => {
    const responsePromise = conductor.endUsers.retrieve('end_usr_1234567abcdefg');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      conductor.endUsers.retrieve('end_usr_1234567abcdefg', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Conductor.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = conductor.endUsers.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(conductor.endUsers.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Conductor.NotFoundError,
    );
  });

  test('delete', async () => {
    const responsePromise = conductor.endUsers.delete('end_usr_1234567abcdefg');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      conductor.endUsers.delete('end_usr_1234567abcdefg', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Conductor.NotFoundError);
  });

  test('passthrough: only required params', async () => {
    const responsePromise = conductor.endUsers.passthrough('end_usr_1234567abcdefg', 'quickbooks_desktop', {
      foo: 'bar',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('passthrough: required and optional params', async () => {
    const response = await conductor.endUsers.passthrough('end_usr_1234567abcdefg', 'quickbooks_desktop', {
      foo: 'bar',
    });
  });
});
