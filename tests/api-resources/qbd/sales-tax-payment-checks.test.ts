// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';

const conductor = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource salesTaxPaymentChecks', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.qbd.salesTaxPaymentChecks.create({
      bankAccountId: '80000001-1234567890',
      lines: [{ amount: '1000.00' }],
      transactionDate: '2024-10-01',
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
    const response = await conductor.qbd.salesTaxPaymentChecks.create({
      bankAccountId: '80000001-1234567890',
      lines: [{ amount: '1000.00', salesTaxItemId: '80000001-1234567890' }],
      transactionDate: '2024-10-01',
      vendorId: '80000001-1234567890',
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
      externalId: '12345678-abcd-1234-abcd-1234567890ab',
      isQueuedForPrint: true,
      memo: 'Sales tax payment for Q3 2024',
      refNumber: 'TAXPMT-1234',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = conductor.qbd.salesTaxPaymentChecks.retrieve('123ABC-1234567890', {
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
    const response = await conductor.qbd.salesTaxPaymentChecks.retrieve('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = conductor.qbd.salesTaxPaymentChecks.update('123ABC-1234567890', {
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
    const response = await conductor.qbd.salesTaxPaymentChecks.update('123ABC-1234567890', {
      revisionNumber: '1721172183',
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
      bankAccountId: '80000001-1234567890',
      isQueuedForPrint: true,
      memo: 'Sales tax payment for Q3 2024',
      refNumber: 'TAXPMT-1234',
      transactionDate: '2024-10-01',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.salesTaxPaymentChecks.list({
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
    const response = await conductor.qbd.salesTaxPaymentChecks.list({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountIds: ['80000001-1234567890'],
      cursor: '12345678-abcd-abcd-example-1234567890ab',
      ids: ['123ABC-1234567890'],
      includeLineItems: true,
      itemIds: ['80000001-1234567890'],
      limit: 150,
      refNumberContains: 'TAXPMT-1234',
      refNumberEndsWith: '1234',
      refNumberFrom: 'TAXPMT-0001',
      refNumbers: ['SALES-TAX PAYMENT CHECK-1234'],
      refNumberStartsWith: 'TAXPMT',
      refNumberTo: 'TAXPMT-9999',
      transactionDateFrom: '2025-01-01',
      transactionDateTo: '2025-02-01',
      updatedAfter: '2025-01-01T12:34:56+00:00',
      updatedBefore: '2025-02-01T12:34:56+00:00',
      vendorIds: ['80000001-1234567890'],
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = conductor.qbd.salesTaxPaymentChecks.delete('123ABC-1234567890', {
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
    const response = await conductor.qbd.salesTaxPaymentChecks.delete('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });

  test('void: only required params', async () => {
    const responsePromise = conductor.qbd.salesTaxPaymentChecks.void('123ABC-1234567890', {
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

  test('void: required and optional params', async () => {
    const response = await conductor.qbd.salesTaxPaymentChecks.void('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });
});
