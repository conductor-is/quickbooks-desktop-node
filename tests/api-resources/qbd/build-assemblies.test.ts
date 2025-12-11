// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';

const conductor = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource buildAssemblies', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.qbd.buildAssemblies.create({
      inventoryAssemblyItemId: '80000001-1234567890',
      quantityToBuild: 7,
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
    const response = await conductor.qbd.buildAssemblies.create({
      inventoryAssemblyItemId: '80000001-1234567890',
      quantityToBuild: 7,
      transactionDate: '2024-10-01',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      expirationDate: '2025-12-31',
      externalId: '12345678-abcd-1234-abcd-1234567890ab',
      inventorySiteId: '80000001-1234567890',
      inventorySiteLocationId: '80000001-1234567890',
      lotNumber: 'LOT2023-001',
      markPendingIfRequired: true,
      memo: 'Assembled 25 units of Model ABC-123 Office Chair',
      refNumber: 'BUILD-1234',
      serialNumber: 'SN1234567890',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = conductor.qbd.buildAssemblies.retrieve('123ABC-1234567890', {
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
    const response = await conductor.qbd.buildAssemblies.retrieve('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = conductor.qbd.buildAssemblies.update('123ABC-1234567890', {
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
    const response = await conductor.qbd.buildAssemblies.update('123ABC-1234567890', {
      revisionNumber: '1721172183',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      expirationDate: '2025-12-31',
      inventorySiteId: '80000001-1234567890',
      inventorySiteLocationId: '80000001-1234567890',
      lotNumber: 'LOT2023-001',
      markPendingIfRequired: true,
      memo: 'Assembled 25 units of Model ABC-123 Office Chair',
      quantityToBuild: 7,
      refNumber: 'BUILD-1234',
      removePending: true,
      serialNumber: 'SN1234567890',
      transactionDate: '2024-10-01',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.buildAssemblies.list({
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
    const response = await conductor.qbd.buildAssemblies.list({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      cursor: '12345678-abcd-abcd-example-1234567890ab',
      ids: ['123ABC-1234567890'],
      includeComponentLineItems: true,
      itemIds: ['80000001-1234567890'],
      limit: 150,
      pendingStatus: 'pending',
      refNumberContains: 'BUILD-1234',
      refNumberEndsWith: '1234',
      refNumberFrom: 'BUILD-0001',
      refNumbers: ['BUILD ASSEMBLY-1234'],
      refNumberStartsWith: 'BUILD',
      refNumberTo: 'BUILD-9999',
      transactionDateFrom: '2025-01-01',
      transactionDateTo: '2025-02-01',
      updatedAfter: '2025-01-01T12:34:56+00:00',
      updatedBefore: '2025-02-01T12:34:56+00:00',
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = conductor.qbd.buildAssemblies.delete('123ABC-1234567890', {
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
    const response = await conductor.qbd.buildAssemblies.delete('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });
});
