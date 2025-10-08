// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';

const conductor = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource discountItems', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.qbd.discountItems.create({
      accountId: '80000001-1234567890',
      name: '10% labor discount',
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
    const response = await conductor.qbd.discountItems.create({
      accountId: '80000001-1234567890',
      name: '10% labor discount',
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
      barcode: { allowOverride: false, assignEvenIfUsed: false, value: '012345678905' },
      classId: '80000001-1234567890',
      description: '10% discount for early payment on labor charges',
      discountRate: '25.00',
      discountRatePercent: '10.5',
      externalId: '12345678-abcd-1234-abcd-1234567890ab',
      isActive: true,
      parentId: '80000001-1234567890',
      salesTaxCodeId: '80000001-1234567890',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = conductor.qbd.discountItems.retrieve('80000001-1234567890', {
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
    const response = await conductor.qbd.discountItems.retrieve('80000001-1234567890', {
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = conductor.qbd.discountItems.update('80000001-1234567890', {
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
    const response = await conductor.qbd.discountItems.update('80000001-1234567890', {
      revisionNumber: '1721172183',
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
      accountId: '80000001-1234567890',
      barcode: { allowOverride: false, assignEvenIfUsed: false, value: '012345678905' },
      classId: '80000001-1234567890',
      description: '10% discount for early payment on labor charges',
      discountRate: '25.00',
      discountRatePercent: '10.5',
      isActive: true,
      name: '10% labor discount',
      parentId: '80000001-1234567890',
      salesTaxCodeId: '80000001-1234567890',
      updateExistingTransactionsAccount: false,
    });
  });

  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.discountItems.list({
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
    const response = await conductor.qbd.discountItems.list({
      'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
      classIds: ['80000001-1234567890'],
      cursor: '12345678-abcd-abcd-example-1234567890ab',
      fullNames: ['Discounts:10% labor discount'],
      ids: ['80000001-1234567890'],
      limit: 150,
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
