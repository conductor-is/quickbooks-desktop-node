// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const conductor = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource itemGroups', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.qbd.itemGroups.create({
      name: 'Office Supplies Bundle',
      shouldPrintItemsInGroup: true,
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
    const response = await conductor.qbd.itemGroups.create({
      name: 'Office Supplies Bundle',
      shouldPrintItemsInGroup: true,
      conductorEndUserId: 'end_usr_1234567abcdefg',
      barcode: { allowOverride: false, assignEvenIfUsed: false, value: '012345678905' },
      description: 'Complete office starter kit with essential supplies for new employees.',
      externalId: '12345678-abcd-1234-abcd-1234567890ab',
      isActive: true,
      lines: [{ itemId: '80000001-1234567890', quantity: 5, unitOfMeasure: 'Each' }],
      unitOfMeasureSetId: '80000001-1234567890',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = conductor.qbd.itemGroups.retrieve('80000001-1234567890', {
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
    const response = await conductor.qbd.itemGroups.retrieve('80000001-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = conductor.qbd.itemGroups.update('80000001-1234567890', {
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
    const response = await conductor.qbd.itemGroups.update('80000001-1234567890', {
      revisionNumber: '1721172183',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      barcode: { allowOverride: false, assignEvenIfUsed: false, value: '012345678905' },
      clearItemLines: false,
      description: 'Complete office starter kit with essential supplies for new employees.',
      forceUnitOfMeasureChange: false,
      isActive: true,
      lines: [{ itemId: '80000001-1234567890', quantity: 5, unitOfMeasure: 'Each' }],
      name: 'Office Supplies Bundle',
      shouldPrintItemsInGroup: true,
      unitOfMeasureSetId: '80000001-1234567890',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.itemGroups.list({ conductorEndUserId: 'end_usr_1234567abcdefg' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: required and optional params', async () => {
    const response = await conductor.qbd.itemGroups.list({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      cursor: '12345678-abcd-abcd-example-1234567890ab',
      ids: ['80000001-1234567890'],
      limit: 150,
      nameContains: 'ABC',
      nameEndsWith: 'ABC',
      nameFrom: 'A',
      names: ['Office Supplies Bundle'],
      nameStartsWith: 'ABC',
      nameTo: 'Z',
      status: 'active',
      updatedAfter: '2024-01-01T12:34:56+00:00',
      updatedBefore: '2024-02-01T12:34:56+00:00',
    });
  });
});
