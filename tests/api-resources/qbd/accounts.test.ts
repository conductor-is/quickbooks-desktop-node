// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';

const conductor = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource accounts', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.qbd.accounts.create({
      accountType: 'bank',
      name: 'Accounts-Payable',
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
    const response = await conductor.qbd.accounts.create({
      accountType: 'bank',
      name: 'Accounts-Payable',
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
      accountNumber: '1010',
      bankAccountNumber: '123456789',
      currencyId: '80000001-1234567890',
      description:
        'Accounts-payable are the amounts owed to suppliers for goods and services purchased on credit.',
      isActive: true,
      openingBalance: '1000.00',
      openingBalanceDate: '2023-01-01',
      parentId: '80000001-1234567890',
      salesTaxCodeId: '80000001-1234567890',
      taxLineId: 123,
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = conductor.qbd.accounts.retrieve('80000001-1234567890', {
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
    const response = await conductor.qbd.accounts.retrieve('80000001-1234567890', {
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = conductor.qbd.accounts.update('80000001-1234567890', {
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
    const response = await conductor.qbd.accounts.update('80000001-1234567890', {
      revisionNumber: '1721172183',
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
      accountNumber: '1010',
      accountType: 'bank',
      bankAccountNumber: '123456789',
      currencyId: '80000001-1234567890',
      description:
        'Accounts-payable are the amounts owed to suppliers for goods and services purchased on credit.',
      isActive: true,
      name: 'Accounts-Payable',
      openingBalance: '1000.00',
      openingBalanceDate: '2023-01-01',
      parentId: '80000001-1234567890',
      salesTaxCodeId: '80000001-1234567890',
      taxLineId: 123,
    });
  });

  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.accounts.list({
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
    const response = await conductor.qbd.accounts.list({
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
      accountType: 'income',
      currencyIds: ['80000001-1234567890'],
      fullNames: ['Corporate:Accounts-Payable'],
      ids: ['80000001-1234567890'],
      limit: 10,
      nameContains: 'ABC',
      nameEndsWith: 'ABC',
      nameFrom: 'A',
      nameStartsWith: 'ABC',
      nameTo: 'Z',
      status: 'active',
      updatedAfter: '2025-01-01T12:34:56+00:00',
      updatedBefore: '2025-02-01T12:34:56+00:00',
    });
  });
});
