// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';

const conductor = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource purchaseOrders', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.qbd.purchaseOrders.create({
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
    const response = await conductor.qbd.purchaseOrders.create({
      transactionDate: '2024-10-01',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      classId: '80000001-1234567890',
      documentTemplateId: '80000001-1234567890',
      dueDate: '2024-10-31',
      exchangeRate: 1.2345,
      expectedDate: '2024-01-01',
      externalId: '12345678-abcd-1234-abcd-1234567890ab',
      inventorySiteId: '80000001-1234567890',
      isQueuedForEmail: true,
      isQueuedForPrint: true,
      lineGroups: [
        {
          itemGroupId: '80000001-1234567890',
          customFields: [
            {
              name: 'Customer Rating',
              ownerId: '0',
              value: 'Premium',
            },
          ],
          inventorySiteLocationId: '80000001-1234567890',
          quantity: 5,
          unitOfMeasure: 'Each',
        },
      ],
      lines: [
        {
          amount: '1000.00',
          classId: '80000001-1234567890',
          customFields: [
            {
              name: 'Customer Rating',
              ownerId: '0',
              value: 'Premium',
            },
          ],
          description: 'Office chairs - Herman Miller Aeron (Black)',
          inventorySiteLocationId: '80000001-1234567890',
          itemId: '80000001-1234567890',
          otherCustomField1: 'Special handling required',
          otherCustomField2: 'Always ship with a spare',
          overrideItemAccountId: '80000001-1234567890',
          payeeId: '80000001-1234567890',
          quantity: 5,
          rate: '10.00',
          salesTaxCodeId: '80000001-1234567890',
          serviceDate: '2024-03-15',
          sku: 'MPN-123456',
          unitOfMeasure: 'Each',
        },
      ],
      memo: 'Office supplies for September',
      otherCustomField1: 'Special handling required',
      otherCustomField2: 'Always ship with a spare',
      refNumber: 'PO-1234',
      salesTaxCodeId: '80000001-1234567890',
      shipmentOrigin: 'San Francisco, CA',
      shippingAddress: {
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
      shippingMethodId: '80000001-1234567890',
      shipToEntityId: '80000001-1234567890',
      termsId: '80000001-1234567890',
      vendorAddress: {
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
      vendorId: '80000001-1234567890',
      vendorMessage: 'Please include packing slip with shipment',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = conductor.qbd.purchaseOrders.retrieve('123ABC-1234567890', {
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
    const response = await conductor.qbd.purchaseOrders.retrieve('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = conductor.qbd.purchaseOrders.update('123ABC-1234567890', {
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
    const response = await conductor.qbd.purchaseOrders.update('123ABC-1234567890', {
      revisionNumber: '1721172183',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      classId: '80000001-1234567890',
      documentTemplateId: '80000001-1234567890',
      dueDate: '2024-10-31',
      exchangeRate: 1.2345,
      expectedDate: '2024-01-01',
      inventorySiteId: '80000001-1234567890',
      isManuallyClosed: true,
      isQueuedForEmail: true,
      isQueuedForPrint: true,
      lineGroups: [
        {
          id: '456DEF-1234567890',
          itemGroupId: '80000001-1234567890',
          lines: [
            {
              id: '456DEF-1234567890',
              amount: '1000.00',
              classId: '80000001-1234567890',
              description: 'Office chairs - Herman Miller Aeron (Black)',
              inventorySiteLocationId: '80000001-1234567890',
              isManuallyClosed: true,
              itemId: '80000001-1234567890',
              otherCustomField1: 'Special handling required',
              otherCustomField2: 'Always ship with a spare',
              overrideItemAccountId: '80000001-1234567890',
              overrideUnitOfMeasureSetId: '80000001-1234567890',
              payeeId: '80000001-1234567890',
              quantity: 5,
              rate: '10.00',
              salesTaxCodeId: '80000001-1234567890',
              serviceDate: '2024-03-15',
              sku: 'MPN-123456',
              unitOfMeasure: 'Each',
            },
          ],
          overrideUnitOfMeasureSetId: '80000001-1234567890',
          quantity: 5,
          unitOfMeasure: 'Each',
        },
      ],
      lines: [
        {
          id: '456DEF-1234567890',
          amount: '1000.00',
          classId: '80000001-1234567890',
          description: 'Office chairs - Herman Miller Aeron (Black)',
          inventorySiteLocationId: '80000001-1234567890',
          isManuallyClosed: true,
          itemId: '80000001-1234567890',
          otherCustomField1: 'Special handling required',
          otherCustomField2: 'Always ship with a spare',
          overrideItemAccountId: '80000001-1234567890',
          overrideUnitOfMeasureSetId: '80000001-1234567890',
          payeeId: '80000001-1234567890',
          quantity: 5,
          rate: '10.00',
          salesTaxCodeId: '80000001-1234567890',
          serviceDate: '2024-03-15',
          sku: 'MPN-123456',
          unitOfMeasure: 'Each',
        },
      ],
      memo: 'Office supplies for September',
      otherCustomField1: 'Special handling required',
      otherCustomField2: 'Always ship with a spare',
      refNumber: 'PO-1234',
      salesTaxCodeId: '80000001-1234567890',
      shipmentOrigin: 'San Francisco, CA',
      shippingAddress: {
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
      shippingMethodId: '80000001-1234567890',
      shipToEntityId: '80000001-1234567890',
      termsId: '80000001-1234567890',
      transactionDate: '2024-10-01',
      vendorAddress: {
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
      vendorId: '80000001-1234567890',
      vendorMessage: 'Please include packing slip with shipment',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.purchaseOrders.list({
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
    const response = await conductor.qbd.purchaseOrders.list({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountIds: ['80000001-1234567890'],
      currencyIds: ['80000001-1234567890'],
      cursor: '12345678-abcd-abcd-example-1234567890ab',
      ids: ['123ABC-1234567890'],
      includeLineItems: true,
      includeLinkedTransactions: false,
      limit: 150,
      refNumberContains: 'PO-1234',
      refNumberEndsWith: '1234',
      refNumberFrom: 'PO-0001',
      refNumbers: ['PURCHASE ORDER-1234'],
      refNumberStartsWith: 'PO',
      refNumberTo: 'PO-9999',
      transactionDateFrom: '2025-01-01',
      transactionDateTo: '2025-02-01',
      updatedAfter: '2025-01-01T12:34:56+00:00',
      updatedBefore: '2025-02-01T12:34:56+00:00',
      vendorIds: ['80000001-1234567890'],
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = conductor.qbd.purchaseOrders.delete('123ABC-1234567890', {
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
    const response = await conductor.qbd.purchaseOrders.delete('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });
});
