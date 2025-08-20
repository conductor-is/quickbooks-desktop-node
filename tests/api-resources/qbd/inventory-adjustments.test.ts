// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const conductor = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource inventoryAdjustments', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.qbd.inventoryAdjustments.create({
      accountId: '80000001-1234567890',
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
    const response = await conductor.qbd.inventoryAdjustments.create({
      accountId: '80000001-1234567890',
      transactionDate: '2024-10-01',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      classId: '80000001-1234567890',
      customerId: '80000001-1234567890',
      externalId: '12345678-abcd-1234-abcd-1234567890ab',
      inventorySiteId: '80000001-1234567890',
      lines: [
        {
          itemId: '80000001-1234567890',
          adjustLotNumber: {
            adjustCount: 2,
            expirationDate: '2025-12-31',
            inventorySiteLocationId: '80000001-1234567890',
            lotNumber: 'LOT2023-001',
          },
          adjustQuantity: {
            expirationDate: '2025-12-31',
            inventorySiteLocationId: '80000001-1234567890',
            lotNumber: 'LOT2023-001',
            newQuantity: 10,
            quantityDifference: 5,
            serialNumber: 'SN1234567890',
          },
          adjustSerialNumber: {
            addSerialNumber: '123456',
            expirationDate: '2025-12-31',
            inventorySiteLocationId: '80000001-1234567890',
            removeSerialNumber: '123456',
          },
          adjustValue: { newQuantity: 10, newValue: '100.00', quantityDifference: 5, valueDifference: 7 },
        },
      ],
      memo: 'Adjusted quantity due to physical count discrepancy',
      refNumber: 'INVADJ-1234',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = conductor.qbd.inventoryAdjustments.retrieve('123ABC-1234567890', {
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
    const response = await conductor.qbd.inventoryAdjustments.retrieve('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = conductor.qbd.inventoryAdjustments.update('123ABC-1234567890', {
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
    const response = await conductor.qbd.inventoryAdjustments.update('123ABC-1234567890', {
      revisionNumber: '1721172183',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountId: '80000001-1234567890',
      classId: '80000001-1234567890',
      customerId: '80000001-1234567890',
      inventorySiteId: '80000001-1234567890',
      lines: [
        {
          id: '456DEF-1234567890',
          adjustCount: 2,
          expirationDate: '2025-12-31',
          inventorySiteLocationId: '80000001-1234567890',
          itemId: '80000001-1234567890',
          lotNumber: 'LOT2023-001',
          quantityDifference: 5,
          serialNumber: 'SN1234567890',
          valueDifference: 7,
        },
      ],
      memo: 'Adjusted quantity due to physical count discrepancy',
      refNumber: 'INVADJ-1234',
      transactionDate: '2024-10-01',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.inventoryAdjustments.list({
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
    const response = await conductor.qbd.inventoryAdjustments.list({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountIds: ['80000001-1234567890'],
      customerIds: ['80000001-1234567890'],
      ids: ['123ABC-1234567890'],
      includeLineItems: true,
      itemIds: ['80000001-1234567890'],
      limit: 10,
      refNumberContains: 'INVADJ-1234',
      refNumberEndsWith: '1234',
      refNumberFrom: 'INVADJ-0001',
      refNumbers: ['INVENTORY ADJUSTMENT-1234'],
      refNumberStartsWith: 'INVADJ',
      refNumberTo: 'INVADJ-9999',
      transactionDateFrom: '2024-01-01',
      transactionDateTo: '2024-02-01',
      updatedAfter: '2024-01-01T12:34:56',
      updatedBefore: '2024-02-01T12:34:56',
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = conductor.qbd.inventoryAdjustments.delete('123ABC-1234567890', {
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
    const response = await conductor.qbd.inventoryAdjustments.delete('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });
});
