// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const conductor = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource salesReceipts', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.qbd.salesReceipts.create({
      transactionDate: '2021-10-01',
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
    const response = await conductor.qbd.salesReceipts.create({
      transactionDate: '2021-10-01',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      billingAddress: {
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
      checkNumber: '1234567890',
      classId: '80000001-1234567890',
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
      customerId: '80000001-1234567890',
      customerMessageId: '80000001-1234567890',
      depositToAccountId: '80000001-1234567890',
      documentTemplateId: '80000001-1234567890',
      dueDate: '2021-10-31',
      exchangeRate: 1.2345,
      externalId: '12345678-abcd-1234-abcd-1234567890ab',
      isPending: false,
      isQueuedForEmail: true,
      isQueuedForPrint: true,
      lineGroups: [
        {
          itemGroupId: '80000001-1234567890',
          customFields: [{ name: 'Customer Rating', ownerId: '0', value: 'Premium' }],
          inventorySiteId: '80000001-1234567890',
          inventorySiteLocationId: '80000001-1234567890',
          quantity: 5,
          unitOfMeasure: 'Each',
        },
      ],
      lines: [
        {
          amount: '1000.00',
          classId: '80000001-1234567890',
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
          customFields: [{ name: 'Customer Rating', ownerId: '0', value: 'Premium' }],
          description: 'New office chair',
          inventorySiteId: '80000001-1234567890',
          inventorySiteLocationId: '80000001-1234567890',
          itemId: '80000001-1234567890',
          lotNumber: 'LOT2023-001',
          otherCustomField1: 'Special handling required',
          otherCustomField2: 'Always ship with a spare',
          overrideItemAccountId: '80000001-1234567890',
          priceLevelId: '80000001-1234567890',
          priceRuleConflictStrategy: 'base_price',
          quantity: 5,
          rate: '10.00',
          ratePercent: '10.5',
          salesTaxCodeId: '80000001-1234567890',
          serialNumber: 'SN1234567890',
          serviceDate: '2024-03-15',
          unitOfMeasure: 'Each',
        },
      ],
      memo: 'Payment received at store location - cash',
      otherCustomField: 'Special handling required',
      paymentMethodId: '80000001-1234567890',
      refNumber: 'RECEIPT-1234',
      salesRepresentativeId: '80000001-1234567890',
      salesTaxCodeId: '80000001-1234567890',
      salesTaxItemId: '80000001-1234567890',
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
      shippingDate: '2021-10-01',
      shippingMethodId: '80000001-1234567890',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = conductor.qbd.salesReceipts.retrieve('123ABC-1234567890', {
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
    const response = await conductor.qbd.salesReceipts.retrieve('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = conductor.qbd.salesReceipts.update('123ABC-1234567890', {
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
    const response = await conductor.qbd.salesReceipts.update('123ABC-1234567890', {
      revisionNumber: '1721172183',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      billingAddress: {
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
      checkNumber: '1234567890',
      classId: '80000001-1234567890',
      customerId: '80000001-1234567890',
      customerMessageId: '80000001-1234567890',
      depositToAccountId: '80000001-1234567890',
      documentTemplateId: '80000001-1234567890',
      dueDate: '2021-10-31',
      exchangeRate: 1.2345,
      isPending: false,
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
              description: 'New office chair',
              inventorySiteId: '80000001-1234567890',
              inventorySiteLocationId: '80000001-1234567890',
              itemId: '80000001-1234567890',
              lotNumber: 'LOT2023-001',
              otherCustomField1: 'Special handling required',
              otherCustomField2: 'Always ship with a spare',
              overrideItemAccountId: '80000001-1234567890',
              overrideUnitOfMeasureSetId: '80000001-1234567890',
              priceLevelId: '80000001-1234567890',
              priceRuleConflictStrategy: 'base_price',
              quantity: 5,
              rate: '10.00',
              ratePercent: '10.5',
              salesTaxCodeId: '80000001-1234567890',
              serialNumber: 'SN1234567890',
              serviceDate: '2024-03-15',
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
          description: 'New office chair',
          inventorySiteId: '80000001-1234567890',
          inventorySiteLocationId: '80000001-1234567890',
          itemId: '80000001-1234567890',
          lotNumber: 'LOT2023-001',
          otherCustomField1: 'Special handling required',
          otherCustomField2: 'Always ship with a spare',
          overrideItemAccountId: '80000001-1234567890',
          overrideUnitOfMeasureSetId: '80000001-1234567890',
          priceLevelId: '80000001-1234567890',
          priceRuleConflictStrategy: 'base_price',
          quantity: 5,
          rate: '10.00',
          ratePercent: '10.5',
          salesTaxCodeId: '80000001-1234567890',
          serialNumber: 'SN1234567890',
          serviceDate: '2024-03-15',
          unitOfMeasure: 'Each',
        },
      ],
      memo: 'Payment received at store location - cash',
      otherCustomField: 'Special handling required',
      paymentMethodId: '80000001-1234567890',
      refNumber: 'RECEIPT-1234',
      salesRepresentativeId: '80000001-1234567890',
      salesTaxCodeId: '80000001-1234567890',
      salesTaxItemId: '80000001-1234567890',
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
      shippingDate: '2021-10-01',
      shippingMethodId: '80000001-1234567890',
      transactionDate: '2021-10-01',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.salesReceipts.list({
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
    const response = await conductor.qbd.salesReceipts.list({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountIds: ['80000001-1234567890'],
      currencyIds: ['80000001-1234567890'],
      cursor: '12345678-abcd-abcd-example-1234567890ab',
      customerIds: ['80000001-1234567890'],
      ids: ['123ABC-1234567890'],
      includeLineItems: true,
      limit: 150,
      refNumberContains: 'RECEIPT-1234',
      refNumberEndsWith: '1234',
      refNumberFrom: 'RECEIPT-0001',
      refNumbers: ['SALES RECEIPT-1234'],
      refNumberStartsWith: 'RECEIPT',
      refNumberTo: 'RECEIPT-9999',
      transactionDateFrom: '2021-01-01',
      transactionDateTo: '2021-02-01',
      updatedAfter: '2021-01-01T12:34:56',
      updatedBefore: '2021-02-01T12:34:56',
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = conductor.qbd.salesReceipts.delete('123ABC-1234567890', {
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
    const response = await conductor.qbd.salesReceipts.delete('123ABC-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });
});
