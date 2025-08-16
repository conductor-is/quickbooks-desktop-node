// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const client = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource payrollWageItems', () => {
  test('create: only required params', async () => {
    const responsePromise = client.qbd.payrollWageItems.create({
      expenseAccountId: '80000001-1234567890',
      name: 'Regular Pay',
      wageType: 'hourly_regular',
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
    const response = await client.qbd.payrollWageItems.create({
      expenseAccountId: '80000001-1234567890',
      name: 'Regular Pay',
      wageType: 'hourly_regular',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      isActive: true,
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.qbd.payrollWageItems.retrieve('80000001-1234567890', {
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
    const response = await client.qbd.payrollWageItems.retrieve('80000001-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = client.qbd.payrollWageItems.list({
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
    const response = await client.qbd.payrollWageItems.list({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      cursor: '12345678-abcd-abcd-example-1234567890ab',
      ids: ['80000001-1234567890'],
      limit: 150,
      nameContains: 'ABC',
      nameEndsWith: 'ABC',
      nameFrom: 'A',
      names: ['Regular Pay'],
      nameStartsWith: 'ABC',
      nameTo: 'Z',
      status: 'active',
      updatedAfter: '2021-01-01T12:34:56',
      updatedBefore: '2021-02-01T12:34:56',
    });
  });
});
