// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const conductor = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource creditCardRefunds', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.qbd.creditCardRefunds.create({
      customerId: '80000001-1234567890',
      refundAppliedToTransactions: [{ refundAmount: '15.00', transactionId: '123ABC-1234567890' }],
      transactionDate: '2024-10-01',
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
    const response = await conductor.qbd.creditCardRefunds.create({
      customerId: '80000001-1234567890',
      refundAppliedToTransactions: [{ refundAmount: '15.00', transactionId: '123ABC-1234567890' }],
      transactionDate: '2024-10-01',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      address: {
        city: 'San Francisco',
        country: 'United States',
        line1: 'Conductor Labs Inc.',
        line2: '540 Market St.',
        line3: 'Suite 100',
        line4: '',
        line5: '',
        note: 'Conductor HQ',
        postalCode: '94110',
        state: 'CA',
      },
      creditCardTransaction: {
        request: {
          expirationMonth: 12,
          expirationYear: 2024,
          name: 'John Doe',
          number: 'xxxxxxxxxxxx1234',
          address: '1234 Main St, Anytown, USA, 12345',
          commercialCardCode: 'corporate',
          postalCode: '12345',
          transactionMode: 'card_not_present',
          transactionType: 'charge',
        },
        response: {
          creditCardTransactionId: '1234567890',
          merchantAccountNumber: '1234567890',
          paymentStatus: 'completed',
          statusCode: 0,
          statusMessage: 'Success',
          transactionAuthorizedAt: '2024-01-01T12:34:56Z',
          authorizationCode: '1234567890',
          avsStreetStatus: 'pass',
          avsZipStatus: 'pass',
          cardSecurityCodeMatch: 'pass',
          clientTransactionId: '1234567890',
          paymentGroupingCode: 2,
          reconBatchId: '1234567890',
          transactionAuthorizationStamp: 2,
        },
      },
      exchangeRate: 1.2345,
      externalId: '12345678-abcd-1234-abcd-1234567890ab',
      memo: 'Refund to customer for duplicate credit card charge',
      paymentMethodId: '80000001-1234567890',
      receivablesAccountId: '80000001-1234567890',
      refNumber: 'REFUND-1234',
      refundFromAccountId: '80000001-1234567890',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = conductor.qbd.creditCardRefunds.retrieve('123ABC-1234567890', {
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
    const response = await conductor.qbd.creditCardRefunds.retrieve('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.creditCardRefunds.list({
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
    const response = await conductor.qbd.creditCardRefunds.list({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountIds: ['80000001-1234567890'],
      currencyIds: ['80000001-1234567890'],
      cursor: '12345678-abcd-abcd-example-1234567890ab',
      customerIds: ['80000001-1234567890'],
      ids: ['123ABC-1234567890'],
      includeLineItems: true,
      limit: 150,
      refNumberContains: 'REFUND-1234',
      refNumberEndsWith: '1234',
      refNumberFrom: 'REFUND-0001',
      refNumbers: ['CREDIT CARD REFUND-1234'],
      refNumberStartsWith: 'REFUND',
      refNumberTo: 'REFUND-9999',
      transactionDateFrom: '2025-01-01',
      transactionDateTo: '2025-02-01',
      updatedAfter: '2025-01-01T12:34:56+00:00',
      updatedBefore: '2025-02-01T12:34:56+00:00',
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = conductor.qbd.creditCardRefunds.delete('123ABC-1234567890', {
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
    const response = await conductor.qbd.creditCardRefunds.delete('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });
});
