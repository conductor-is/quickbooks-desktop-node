// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const client = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource priceLevels', () => {
  test('create: only required params', async () => {
    const responsePromise = client.qbd.priceLevels.create({
      name: 'Wholesale 20% Discount',
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
    const response = await client.qbd.priceLevels.create({
      name: 'Wholesale 20% Discount',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      currencyId: '80000001-1234567890',
      fixedPercentage: '-10.0',
      isActive: true,
      perItemPriceLevels: [
        {
          adjustPercentage: '-10.0',
          adjustRelativeTo: 'standard_price',
          itemId: '80000001-1234567890',
          customPrice: '19.99',
          customPricePercent: '15.0',
        },
      ],
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.qbd.priceLevels.retrieve('80000001-1234567890', {
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
    const response = await client.qbd.priceLevels.retrieve('80000001-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = client.qbd.priceLevels.update('80000001-1234567890', {
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
    const response = await client.qbd.priceLevels.update('80000001-1234567890', {
      revisionNumber: '1721172183',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      currencyId: '80000001-1234567890',
      fixedPercentage: '-10.0',
      isActive: true,
      name: 'Wholesale 20% Discount',
      perItemPriceLevels: [
        {
          adjustPercentage: '-10.0',
          adjustRelativeTo: 'standard_price',
          itemId: '80000001-1234567890',
          customPrice: '19.99',
          customPricePercent: '15.0',
        },
      ],
    });
  });

  test('list: only required params', async () => {
    const responsePromise = client.qbd.priceLevels.list({ conductorEndUserId: 'end_usr_1234567abcdefg' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: required and optional params', async () => {
    const response = await client.qbd.priceLevels.list({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      currencyIds: ['80000001-1234567890'],
      ids: ['80000001-1234567890'],
      itemIds: ['80000001-1234567890'],
      limit: 10,
      nameContains: 'ABC',
      nameEndsWith: 'ABC',
      nameFrom: 'A',
      names: ['Wholesale 20% Discount'],
      nameStartsWith: 'ABC',
      nameTo: 'Z',
      status: 'active',
      updatedAfter: '2021-01-01T12:34:56',
      updatedBefore: '2021-02-01T12:34:56',
    });
  });
});
