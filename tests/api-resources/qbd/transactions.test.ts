// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const conductor = new Conductor({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource transactions', () => {
  test('retrieve: only required params', async () => {
    const responsePromise = conductor.qbd.transactions.retrieve('123ABC-1234567890', {
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
    const response = await conductor.qbd.transactions.retrieve('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.transactions.list({ conductorEndUserId: 'end_usr_1234567abcdefg' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: required and optional params', async () => {
    const response = await conductor.qbd.transactions.list({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountIds: ['80000001-1234567890'],
      classIds: ['80000001-1234567890'],
      currencyIds: ['80000001-1234567890'],
      cursor: '12345678-abcd-abcd-example-1234567890ab',
      detailLevel: 'transactions_without_lines',
      entityIds: ['80000001-1234567890'],
      ids: ['123ABC-1234567890'],
      itemIds: ['80000001-1234567890'],
      limit: 150,
      paymentStatus: 'open',
      postingStatus: 'posting',
      refNumberContains: 'INV-1234',
      refNumberEndsWith: '1234',
      refNumberFrom: 'INV-0001',
      refNumbers: ['TRANSACTION-1234'],
      refNumberStartsWith: 'INV',
      refNumberTo: 'INV-9999',
      transactionDateFrom: '2021-01-01',
      transactionDateTo: '2021-02-01',
      transactionType: ['invoice'],
      updatedAfter: '2021-01-01T12:34:56',
      updatedBefore: '2021-02-01T12:34:56',
    });
  });
});
