// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const conductor = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource serviceItems', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.qbd.serviceItems.create({
      name: 'Web-Design',
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
    const response = await conductor.qbd.serviceItems.create({
      name: 'Web-Design',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      barcode: { allowOverride: false, assignEvenIfUsed: false, value: '012345678905' },
      classId: '80000001-1234567890',
      externalId: '12345678-abcd-1234-abcd-1234567890ab',
      isActive: true,
      parentId: '80000001-1234567890',
      salesAndPurchaseDetails: {
        expenseAccountId: '80000001-1234567890',
        incomeAccountId: '80000001-1234567890',
        preferredVendorId: '80000001-1234567890',
        purchaseCost: '15.75',
        purchaseDescription: 'Bulk purchase of steel bolts for inventory',
        purchaseTaxCodeId: '80000001-1234567890',
        salesDescription: 'High-quality steel bolts suitable for construction',
        salesPrice: '19.99',
      },
      salesOrPurchaseDetails: {
        postingAccountId: '80000001-1234567890',
        description: 'Hourly Consulting Service',
        price: '19.99',
        pricePercentage: '10.5',
      },
      salesTaxCodeId: '80000001-1234567890',
      unitOfMeasureSetId: '80000001-1234567890',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = conductor.qbd.serviceItems.retrieve('80000001-1234567890', {
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
    const response = await conductor.qbd.serviceItems.retrieve('80000001-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = conductor.qbd.serviceItems.update('80000001-1234567890', {
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
    const response = await conductor.qbd.serviceItems.update('80000001-1234567890', {
      revisionNumber: '1721172183',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      barcode: { allowOverride: false, assignEvenIfUsed: false, value: '012345678905' },
      classId: '80000001-1234567890',
      forceUnitOfMeasureChange: false,
      isActive: true,
      name: 'Web-Design',
      parentId: '80000001-1234567890',
      salesAndPurchaseDetails: {
        expenseAccountId: '80000001-1234567890',
        incomeAccountId: '80000001-1234567890',
        preferredVendorId: '80000001-1234567890',
        purchaseCost: '15.75',
        purchaseDescription: 'Bulk purchase of steel bolts for inventory',
        purchaseTaxCodeId: '80000001-1234567890',
        salesDescription: 'High-quality steel bolts suitable for construction',
        salesPrice: '19.99',
        updateExistingTransactionsExpenseAccount: false,
        updateExistingTransactionsIncomeAccount: false,
      },
      salesOrPurchaseDetails: {
        description: 'Hourly Consulting Service',
        postingAccountId: '80000001-1234567890',
        price: '19.99',
        pricePercentage: '10.5',
        updateExistingTransactionsAccount: false,
      },
      salesTaxCodeId: '80000001-1234567890',
      unitOfMeasureSetId: '80000001-1234567890',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.serviceItems.list({ conductorEndUserId: 'end_usr_1234567abcdefg' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: required and optional params', async () => {
    const response = await conductor.qbd.serviceItems.list({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      classIds: ['80000001-1234567890'],
      cursor: '12345678-abcd-abcd-example-1234567890ab',
      fullNames: ['Consulting:Web-Design'],
      ids: ['80000001-1234567890'],
      limit: 150,
      nameContains: 'ABC',
      nameEndsWith: 'ABC',
      nameFrom: 'A',
      nameStartsWith: 'ABC',
      nameTo: 'Z',
      status: 'active',
      updatedAfter: '2024-01-01T12:34:56',
      updatedBefore: '2024-02-01T12:34:56',
    });
  });
});
