// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const conductor = new Conductor({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource billCheckPayments', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.qbd.billCheckPayments.create({
      applyToTransactions: [{ transactionId: '123ABC-1234567890' }],
      bankAccountId: '80000001-1234567890',
      transactionDate: '2021-10-01',
      vendorId: '80000001-1234567890',
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
    const response = await conductor.qbd.billCheckPayments.create({
      applyToTransactions: [
        {
          transactionId: '123ABC-1234567890',
          applyCredits: [
            {
              appliedAmount: '100.00',
              creditTransactionId: 'ABCDEF-1234567890',
              overrideCreditApplication: false,
            },
          ],
          discountAccountId: '80000001-1234567890',
          discountAmount: '50.00',
          discountClassId: '80000001-1234567890',
          paymentAmount: '25.00',
        },
      ],
      bankAccountId: '80000001-1234567890',
      transactionDate: '2021-10-01',
      vendorId: '80000001-1234567890',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      exchangeRate: 1.2345,
      externalId: '12345678-abcd-1234-abcd-1234567890ab',
      isQueuedForPrint: true,
      memo: 'Payment for office supplies - Invoice INV-1234',
      payablesAccountId: '80000001-1234567890',
      refNumber: 'CHECK-1234',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = conductor.qbd.billCheckPayments.retrieve('123ABC-1234567890', {
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
    const response = await conductor.qbd.billCheckPayments.retrieve('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = conductor.qbd.billCheckPayments.update('123ABC-1234567890', {
      revisionNumber: '1721172183',
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

  test('update: required and optional params', async () => {
    const response = await conductor.qbd.billCheckPayments.update('123ABC-1234567890', {
      revisionNumber: '1721172183',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      amount: '1000.00',
      applyToTransactions: [
        {
          transactionId: '123ABC-1234567890',
          applyCredits: [
            {
              appliedAmount: '100.00',
              creditTransactionId: 'ABCDEF-1234567890',
              overrideCreditApplication: false,
            },
          ],
          discountAccountId: '80000001-1234567890',
          discountAmount: '50.00',
          discountClassId: '80000001-1234567890',
          paymentAmount: '25.00',
        },
      ],
      bankAccountId: '80000001-1234567890',
      exchangeRate: 1.2345,
      isQueuedForPrint: true,
      memo: 'Payment for office supplies - Invoice INV-1234',
      refNumber: 'CHECK-1234',
      transactionDate: '2021-10-01',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.billCheckPayments.list({
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
    const response = await conductor.qbd.billCheckPayments.list({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountIds: ['80000001-1234567890'],
      currencyIds: ['80000001-1234567890'],
      cursor: '12345678-abcd-abcd-example-1234567890ab',
      ids: ['123ABC-1234567890'],
      includeLineItems: true,
      limit: 150,
      refNumberContains: 'CHECK-1234',
      refNumberEndsWith: '1234',
      refNumberFrom: 'CHECK-0001',
      refNumbers: ['BILL CHECK PAYMENT-1234'],
      refNumberStartsWith: 'CHECK',
      refNumberTo: 'CHECK-9999',
      transactionDateFrom: '2021-01-01',
      transactionDateTo: '2021-02-01',
      updatedAfter: '2021-01-01T12:34:56',
      updatedBefore: '2021-02-01T12:34:56',
      vendorIds: ['80000001-1234567890'],
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = conductor.qbd.billCheckPayments.delete('123ABC-1234567890', {
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

  test('delete: required and optional params', async () => {
    const response = await conductor.qbd.billCheckPayments.delete('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });
});
