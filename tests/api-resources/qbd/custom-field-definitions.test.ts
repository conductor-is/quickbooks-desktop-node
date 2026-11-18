// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';

const conductor = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource customFieldDefinitions', () => {
  test('create: only required params', async () => {
    const responsePromise = conductor.qbd.customFieldDefinitions.create({
      name: 'Customer Rating',
      objectTypes: ['customer'],
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
    const response = await conductor.qbd.customFieldDefinitions.create({
      name: 'Customer Rating',
      objectTypes: ['customer'],
      conductorEndUserId: 'end_usr_1234567abcdefg',
      ownerId: '0',
      type: 'string_255_type',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = conductor.qbd.customFieldDefinitions.update('Customer Rating', {
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
    const response = await conductor.qbd.customFieldDefinitions.update('Customer Rating', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
      addObjectTypes: ['vendor'],
      name: 'Customer Tier',
      ownerId: '0',
      removeObjectTypes: ['employee'],
    });
  });

  test('list: only required params', async () => {
    const responsePromise = conductor.qbd.customFieldDefinitions.list({
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
    const response = await conductor.qbd.customFieldDefinitions.list({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      ownerIds: ['0'],
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = conductor.qbd.customFieldDefinitions.delete('Customer Rating', {
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
    const response = await conductor.qbd.customFieldDefinitions.delete('Customer Rating', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
      ownerId: '0',
    });
  });
});
