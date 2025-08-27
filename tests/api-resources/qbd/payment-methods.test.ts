// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const conductor = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource paymentMethods', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.qbd.paymentMethods.create({
      name: 'Cash',
      paymentMethodType: 'cash',
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

  test('create: required and optional params', async () => {
    const response = await conductor.qbd.paymentMethods.create({
      name: 'Cash',
      paymentMethodType: 'cash',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      isActive: true,
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = conductor.qbd.paymentMethods.retrieve('80000001-1234567890', {
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

  test('retrieve: required and optional params', async () => {
    const response = await conductor.qbd.paymentMethods.retrieve('80000001-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.paymentMethods.list({
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
    const response = await conductor.qbd.paymentMethods.list({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      ids: ['80000001-1234567890'],
      limit: 10,
      nameContains: 'ABC',
      nameEndsWith: 'ABC',
      nameFrom: 'A',
      names: ['Cash'],
      nameStartsWith: 'ABC',
      nameTo: 'Z',
      paymentMethodType: 'cash',
      status: 'active',
      updatedAfter: '2024-01-01T12:34:56+00:00',
      updatedBefore: '2024-02-01T12:34:56+00:00',
    });
  });
});
