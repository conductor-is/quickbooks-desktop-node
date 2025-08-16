// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { APIUserAbortError } from 'conductor-node';
import { Headers } from 'conductor-node/core';
import defaultFetch, { Response, type RequestInit, type RequestInfo } from 'node-fetch';

describe('instantiate client', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };

    console.warn = jest.fn();
  });

  afterEach(() => {
    process.env = env;
  });

  describe('defaultHeaders', () => {
    const conductor = new Conductor({
      baseURL: 'http://localhost:5000/',
      defaultHeaders: { 'X-My-Default-Header': '2' },
      apiKey: 'sk_conductor_...',
    });

    test('they are used in the request', async () => {
      const { req } = await conductor.buildRequest({ path: '/foo', method: 'post' });
      expect((req.headers as Headers)['x-my-default-header']).toEqual('2');
    });

    test('can ignore `undefined` and leave the default', async () => {
      const { req } = await conductor.buildRequest({
        path: '/foo',
        method: 'post',
        headers: { 'X-My-Default-Header': undefined },
      });
      expect((req.headers as Headers)['x-my-default-header']).toEqual('2');
    });

    test('can be removed with `null`', async () => {
      const { req } = await conductor.buildRequest({
        path: '/foo',
        method: 'post',
        headers: { 'X-My-Default-Header': null },
      });
      expect(req.headers as Headers).not.toHaveProperty('x-my-default-header');
    });
  });

  describe('defaultQuery', () => {
    test('with null query params given', () => {
      const conductor = new Conductor({
        baseURL: 'http://localhost:5000/',
        defaultQuery: { apiVersion: 'foo' },
        apiKey: 'sk_conductor_...',
      });
      expect(conductor.buildURL('/foo', null)).toEqual('http://localhost:5000/foo?apiVersion=foo');
    });

    test('multiple default query params', () => {
      const conductor = new Conductor({
        baseURL: 'http://localhost:5000/',
        defaultQuery: { apiVersion: 'foo', hello: 'world' },
        apiKey: 'sk_conductor_...',
      });
      expect(conductor.buildURL('/foo', null)).toEqual(
        'http://localhost:5000/foo?apiVersion=foo&hello=world',
      );
    });

    test('overriding with `undefined`', () => {
      const conductor = new Conductor({
        baseURL: 'http://localhost:5000/',
        defaultQuery: { hello: 'world' },
        apiKey: 'sk_conductor_...',
      });
      expect(conductor.buildURL('/foo', { hello: undefined })).toEqual('http://localhost:5000/foo');
    });
  });

  test('custom fetch', async () => {
    const conductor = new Conductor({
      baseURL: 'http://localhost:5000/',
      apiKey: 'sk_conductor_...',
      fetch: (url) => {
        return Promise.resolve(
          new Response(JSON.stringify({ url, custom: true }), {
            headers: { 'Content-Type': 'application/json' },
          }),
        );
      },
    });

    const response = await conductor.get('/foo');
    expect(response).toEqual({ url: 'http://localhost:5000/foo', custom: true });
  });

  test('explicit global fetch', async () => {
    // make sure the global fetch type is assignable to our Fetch type
    const conductor = new Conductor({
      baseURL: 'http://localhost:5000/',
      apiKey: 'sk_conductor_...',
      fetch: defaultFetch,
    });
  });

  test('custom signal', async () => {
    const conductor = new Conductor({
      baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
      apiKey: 'sk_conductor_...',
      fetch: (...args) => {
        return new Promise((resolve, reject) =>
          setTimeout(
            () =>
              defaultFetch(...args)
                .then(resolve)
                .catch(reject),
            300,
          ),
        );
      },
    });

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 200);

    const spy = jest.spyOn(conductor, 'request');

    await expect(conductor.get('/foo', { signal: controller.signal })).rejects.toThrowError(
      APIUserAbortError,
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('normalized method', async () => {
    let capturedRequest: RequestInit | undefined;
    const testFetch = async (url: RequestInfo, init: RequestInit = {}): Promise<Response> => {
      capturedRequest = init;
      return new Response(JSON.stringify({}), { headers: { 'Content-Type': 'application/json' } });
    };

    const conductor = new Conductor({
      baseURL: 'http://localhost:5000/',
      apiKey: 'sk_conductor_...',
      fetch: testFetch,
    });

    await conductor.patch('/foo');
    expect(capturedRequest?.method).toEqual('PATCH');
  });

  describe('baseUrl', () => {
    test('trailing slash', () => {
      const conductor = new Conductor({
        baseURL: 'http://localhost:5000/custom/path/',
        apiKey: 'sk_conductor_...',
      });
      expect(conductor.buildURL('/foo', null)).toEqual('http://localhost:5000/custom/path/foo');
    });

    test('no trailing slash', () => {
      const conductor = new Conductor({
        baseURL: 'http://localhost:5000/custom/path',
        apiKey: 'sk_conductor_...',
      });
      expect(conductor.buildURL('/foo', null)).toEqual('http://localhost:5000/custom/path/foo');
    });

    afterEach(() => {
      process.env['CONDUCTOR_BASE_URL'] = undefined;
    });

    test('explicit option', () => {
      const conductor = new Conductor({ baseURL: 'https://example.com', apiKey: 'sk_conductor_...' });
      expect(conductor.baseURL).toEqual('https://example.com');
    });

    test('env variable', () => {
      process.env['CONDUCTOR_BASE_URL'] = 'https://example.com/from_env';
      const conductor = new Conductor({ apiKey: 'sk_conductor_...' });
      expect(conductor.baseURL).toEqual('https://example.com/from_env');
    });

    test('empty env variable', () => {
      process.env['CONDUCTOR_BASE_URL'] = ''; // empty
      const conductor = new Conductor({ apiKey: 'sk_conductor_...' });
      expect(conductor.baseURL).toEqual('https://api.conductor.is/v1');
    });

    test('blank env variable', () => {
      process.env['CONDUCTOR_BASE_URL'] = '  '; // blank
      const conductor = new Conductor({ apiKey: 'sk_conductor_...' });
      expect(conductor.baseURL).toEqual('https://api.conductor.is/v1');
    });

    test('in request options', () => {
      const conductor = new Conductor({ apiKey: 'sk_conductor_...' });
      expect(conductor.buildURL('/foo', null, 'http://localhost:5000/option')).toEqual(
        'http://localhost:5000/option/foo',
      );
    });

    test('in request options overridden by client options', () => {
      const conductor = new Conductor({
        apiKey: 'sk_conductor_...',
        baseURL: 'http://localhost:5000/client',
      });
      expect(conductor.buildURL('/foo', null, 'http://localhost:5000/option')).toEqual(
        'http://localhost:5000/client/foo',
      );
    });

    test('in request options overridden by env variable', () => {
      process.env['CONDUCTOR_BASE_URL'] = 'http://localhost:5000/env';
      const conductor = new Conductor({ apiKey: 'sk_conductor_...' });
      expect(conductor.buildURL('/foo', null, 'http://localhost:5000/option')).toEqual(
        'http://localhost:5000/env/foo',
      );
    });
  });

  test('maxRetries option is correctly set', () => {
    const conductor = new Conductor({ maxRetries: 4, apiKey: 'sk_conductor_...' });
    expect(conductor.maxRetries).toEqual(4);

    // default
    const conductor2 = new Conductor({ apiKey: 'sk_conductor_...' });
    expect(conductor2.maxRetries).toEqual(2);
  });

  test('with environment variable arguments', () => {
    // set options via env var
    process.env['CONDUCTOR_SECRET_KEY'] = 'sk_conductor_...';
    const conductor = new Conductor();
    expect(conductor.apiKey).toBe('sk_conductor_...');
  });

  test('with overridden environment variable arguments', () => {
    // set options via env var
    process.env['CONDUCTOR_SECRET_KEY'] = 'another sk_conductor_...';
    const conductor = new Conductor({ apiKey: 'sk_conductor_...' });
    expect(conductor.apiKey).toBe('sk_conductor_...');
  });
});

describe('request building', () => {
  const conductor = new Conductor({ apiKey: 'sk_conductor_...' });

  describe('Content-Length', () => {
    test('handles multi-byte characters', async () => {
      const { req } = await conductor.buildRequest({ path: '/foo', method: 'post', body: { value: '—' } });
      expect((req.headers as Record<string, string>)['content-length']).toEqual('20');
    });

    test('handles standard characters', async () => {
      const { req } = await conductor.buildRequest({
        path: '/foo',
        method: 'post',
        body: { value: 'hello' },
      });
      expect((req.headers as Record<string, string>)['content-length']).toEqual('22');
    });
  });

  describe('custom headers', () => {
    test('handles undefined', async () => {
      const { req } = await conductor.buildRequest({
        path: '/foo',
        method: 'post',
        body: { value: 'hello' },
        headers: { 'X-Foo': 'baz', 'x-foo': 'bar', 'x-Foo': undefined, 'x-baz': 'bam', 'X-Baz': null },
      });
      expect((req.headers as Record<string, string>)['x-foo']).toEqual('bar');
      expect((req.headers as Record<string, string>)['x-Foo']).toEqual(undefined);
      expect((req.headers as Record<string, string>)['X-Foo']).toEqual(undefined);
      expect((req.headers as Record<string, string>)['x-baz']).toEqual(undefined);
    });
  });
});

describe('retries', () => {
  test('retry on timeout', async () => {
    let count = 0;
    const testFetch = async (url: RequestInfo, { signal }: RequestInit = {}): Promise<Response> => {
      if (count++ === 0) {
        return new Promise(
          (resolve, reject) => signal?.addEventListener('abort', () => reject(new Error('timed out'))),
        );
      }
      return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
    };

    const conductor = new Conductor({ apiKey: 'sk_conductor_...', timeout: 10, fetch: testFetch });

    expect(await conductor.request({ path: '/foo', method: 'get' })).toEqual({ a: 1 });
    expect(count).toEqual(2);
    expect(
      await conductor
        .request({ path: '/foo', method: 'get' })
        .asResponse()
        .then((r) => r.text()),
    ).toEqual(JSON.stringify({ a: 1 }));
    expect(count).toEqual(3);
  });

  test('retry count header', async () => {
    let count = 0;
    let capturedRequest: RequestInit | undefined;
    const testFetch = async (url: RequestInfo, init: RequestInit = {}): Promise<Response> => {
      count++;
      if (count <= 2) {
        return new Response(undefined, {
          status: 429,
          headers: {
            'Retry-After': '0.1',
          },
        });
      }
      capturedRequest = init;
      return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
    };

    const conductor = new Conductor({ apiKey: 'sk_conductor_...', fetch: testFetch, maxRetries: 4 });

    expect(await conductor.request({ path: '/foo', method: 'get' })).toEqual({ a: 1 });

    expect((capturedRequest!.headers as Headers)['x-stainless-retry-count']).toEqual('2');
    expect(count).toEqual(3);
  });

  test('omit retry count header', async () => {
    let count = 0;
    let capturedRequest: RequestInit | undefined;
    const testFetch = async (url: RequestInfo, init: RequestInit = {}): Promise<Response> => {
      count++;
      if (count <= 2) {
        return new Response(undefined, {
          status: 429,
          headers: {
            'Retry-After': '0.1',
          },
        });
      }
      capturedRequest = init;
      return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
    };
    const conductor = new Conductor({ apiKey: 'sk_conductor_...', fetch: testFetch, maxRetries: 4 });

    expect(
      await conductor.request({
        path: '/foo',
        method: 'get',
        headers: { 'X-Stainless-Retry-Count': null },
      }),
    ).toEqual({ a: 1 });

    expect(capturedRequest!.headers as Headers).not.toHaveProperty('x-stainless-retry-count');
  });

  test('omit retry count header by default', async () => {
    let count = 0;
    let capturedRequest: RequestInit | undefined;
    const testFetch = async (url: RequestInfo, init: RequestInit = {}): Promise<Response> => {
      count++;
      if (count <= 2) {
        return new Response(undefined, {
          status: 429,
          headers: {
            'Retry-After': '0.1',
          },
        });
      }
      capturedRequest = init;
      return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
    };
    const conductor = new Conductor({
      apiKey: 'sk_conductor_...',
      fetch: testFetch,
      maxRetries: 4,
      defaultHeaders: { 'X-Stainless-Retry-Count': null },
    });

    expect(
      await conductor.request({
        path: '/foo',
        method: 'get',
      }),
    ).toEqual({ a: 1 });

    expect(capturedRequest!.headers as Headers).not.toHaveProperty('x-stainless-retry-count');
  });

  test('overwrite retry count header', async () => {
    let count = 0;
    let capturedRequest: RequestInit | undefined;
    const testFetch = async (url: RequestInfo, init: RequestInit = {}): Promise<Response> => {
      count++;
      if (count <= 2) {
        return new Response(undefined, {
          status: 429,
          headers: {
            'Retry-After': '0.1',
          },
        });
      }
      capturedRequest = init;
      return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
    };
    const conductor = new Conductor({ apiKey: 'sk_conductor_...', fetch: testFetch, maxRetries: 4 });

    expect(
      await conductor.request({
        path: '/foo',
        method: 'get',
        headers: { 'X-Stainless-Retry-Count': '42' },
      }),
    ).toEqual({ a: 1 });

    expect((capturedRequest!.headers as Headers)['x-stainless-retry-count']).toBe('42');
  });

  test('retry on 429 with retry-after', async () => {
    let count = 0;
    const testFetch = async (url: RequestInfo, { signal }: RequestInit = {}): Promise<Response> => {
      if (count++ === 0) {
        return new Response(undefined, {
          status: 429,
          headers: {
            'Retry-After': '0.1',
          },
        });
      }
      return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
    };

    const conductor = new Conductor({ apiKey: 'sk_conductor_...', fetch: testFetch });

    expect(await conductor.request({ path: '/foo', method: 'get' })).toEqual({ a: 1 });
    expect(count).toEqual(2);
    expect(
      await conductor
        .request({ path: '/foo', method: 'get' })
        .asResponse()
        .then((r) => r.text()),
    ).toEqual(JSON.stringify({ a: 1 }));
    expect(count).toEqual(3);
  });

  test('retry on 429 with retry-after-ms', async () => {
    let count = 0;
    const testFetch = async (url: RequestInfo, { signal }: RequestInit = {}): Promise<Response> => {
      if (count++ === 0) {
        return new Response(undefined, {
          status: 429,
          headers: {
            'Retry-After-Ms': '10',
          },
        });
      }
      return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
    };

    const conductor = new Conductor({ apiKey: 'sk_conductor_...', fetch: testFetch });

    expect(await conductor.request({ path: '/foo', method: 'get' })).toEqual({ a: 1 });
    expect(count).toEqual(2);
    expect(
      await conductor
        .request({ path: '/foo', method: 'get' })
        .asResponse()
        .then((r) => r.text()),
    ).toEqual(JSON.stringify({ a: 1 }));
    expect(count).toEqual(3);
  });
});
