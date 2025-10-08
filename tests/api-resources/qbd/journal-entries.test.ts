// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';

const conductor = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource journalEntries', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.qbd.journalEntries.create({
      transactionDate: '2024-10-01',
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
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
    const response = await conductor.qbd.journalEntries.create({
      transactionDate: '2024-10-01',
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
      areAmountsEnteredInHomeCurrency: false,
      creditLines: [
        {
          accountId: '80000001-1234567890',
          amount: '1000.00',
          billingStatus: 'billable',
          classId: '80000001-1234567890',
          entityId: '80000001-1234567890',
          memo: 'Allocated funds for office lease payment',
          salesTaxItemId: '80000001-1234567890',
        },
      ],
      currencyId: '80000001-1234567890',
      debitLines: [
        {
          accountId: '80000001-1234567890',
          amount: '1000.00',
          billingStatus: 'billable',
          classId: '80000001-1234567890',
          entityId: '80000001-1234567890',
          memo: 'Monthly utility bill settlement',
          salesTaxItemId: '80000001-1234567890',
        },
      ],
      exchangeRate: 1.2345,
      externalId: '12345678-abcd-1234-abcd-1234567890ab',
      isAdjustment: false,
      isHomeCurrencyAdjustment: false,
      refNumber: 'JE-1234',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = conductor.qbd.journalEntries.retrieve('123ABC-1234567890', {
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
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
    const response = await conductor.qbd.journalEntries.retrieve('123ABC-1234567890', {
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = conductor.qbd.journalEntries.update('123ABC-1234567890', {
      revisionNumber: '1721172183',
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
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
    const response = await conductor.qbd.journalEntries.update('123ABC-1234567890', {
      revisionNumber: '1721172183',
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
      areAmountsEnteredInHomeCurrency: false,
      currencyId: '80000001-1234567890',
      exchangeRate: 1.2345,
      isAdjustment: false,
      lines: [
        {
          id: '456DEF-1234567890',
          accountId: '80000001-1234567890',
          amount: '1000.00',
          billingStatus: 'billable',
          classId: '80000001-1234567890',
          entityId: '80000001-1234567890',
          journalLineType: 'debit',
          memo: 'Allocated funds for office lease payment',
          salesTaxItemId: '80000001-1234567890',
        },
      ],
      refNumber: 'JE-1234',
      transactionDate: '2024-10-01',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.journalEntries.list({
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
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
    const response = await conductor.qbd.journalEntries.list({
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
      accountIds: ['80000001-1234567890'],
      currencyIds: ['80000001-1234567890'],
      cursor: '12345678-abcd-abcd-example-1234567890ab',
      entityIds: ['80000001-1234567890'],
      ids: ['123ABC-1234567890'],
      includeLineItems: true,
      limit: 150,
      refNumberContains: 'JE-1234',
      refNumberEndsWith: '1234',
      refNumberFrom: 'JE-0001',
      refNumbers: ['JOURNAL ENTRY-1234'],
      refNumberStartsWith: 'JE',
      refNumberTo: 'JE-9999',
      transactionDateFrom: '2025-01-01',
      transactionDateTo: '2025-02-01',
      updatedAfter: '2025-01-01T12:34:56+00:00',
      updatedBefore: '2025-02-01T12:34:56+00:00',
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = conductor.qbd.journalEntries.delete('123ABC-1234567890', {
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
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
    const response = await conductor.qbd.journalEntries.delete('123ABC-1234567890', {
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
    });
  });
});
