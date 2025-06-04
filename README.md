<!-- markdownlint-disable MD033 MD041 -->
<div align="center">
  <a href="https://conductor.is">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/conductor-is/quickbooks-desktop-api/assets/170023/162ee6a9-75ac-41e9-9f1e-2ecc1d88f841">
      <img alt="Conductor logo" src="https://github.com/conductor-is/quickbooks-desktop-api/assets/170023/d67464b8-53a7-4d33-afeb-05a2efde1fa8" width="325">
    </picture>
  </a>
  <h3>QuickBooks Desktop/Enterprise real-time API for Node.js, Python, and REST</h3>
  <a href="https://docs.conductor.is/quickstart">Quickstart</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://conductor.is">Website</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://docs.conductor.is">Docs</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://docs.conductor.is/qbd-api">Examples</a>
  <br />
  <br />
  <a href="https://npmjs.com/package/conductor-node"><img src="https://img.shields.io/npm/dm/conductor-node.svg?logo=npm" alt="NPM download count"></a>
  <a href="https://npmjs.org/package/conductor-node"><img src="https://img.shields.io/npm/v/conductor-node.svg?logo=npm" alt="NPM version"></a>
  <a href="https://npmjs.org/package/conductor-node"><img src="https://img.shields.io/bundlephobia/minzip/conductor-node" alt="NPM bundle size"></a>
  <img src="https://img.shields.io/badge/coverage-100%25-brightgreen" alt="Code coverage">
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/conductor-node.svg?color=blue&logo=github" alt="License" /></a>
  <hr />
</div>

[Conductor](https://conductor.is) is a real-time, fully-typed API for **QuickBooks Desktop** (sometimes called QuickBooks Enterprise). In just a few lines, get real-time access to fetch, create, or update _any_ QuickBooks Desktop object type and receive a fully-typed response.

⭐ **Follow our [Quickstart guide](https://docs.conductor.is/quickstart) to get started.**

This repository contains the official Conductor **Node.js** library, which provides convenient access to our QuickBooks Desktop API from any server-side TypeScript or JavaScript application.

- For Python, see [conductor-python](https://github.com/conductor-is/quickbooks-desktop-python).

## Documentation

The REST API documentation can be found on [docs.conductor.is](https://docs.conductor.is/api-ref). The full API of this library can be found in [api.md](api.md).

## Installation

```sh
npm install conductor-node
```

> [!IMPORTANT]
> If you're migrating from the old `conductor-node` package (v11 or earlier), please see the [upgrade guide](https://docs.conductor.is/qbd-api/upgrade-node).

## Key features

- **Any data type**: Query, create, or update any QuickBooks Desktop data type.
- **Real-time**: Get real-time updates on your QuickBooks Desktop data. No queues, no jobs, no cache layer -- just direct access to the data.
- **Modern API**: JSON-based REST API, replacing the old XML-based SOAP model.
- **Typed client libraries**: Fully typed libraries in Node.js and Python with autocomplete, inline docs, and type validation for endpoints, parameters, and responses.
- **Request handling**: Invisibly manages queues, timeouts, retries, and pagination.
- **Auto-pagination**: Automatically handles paginated responses to retrieve complete datasets.
- **Multi-company support**: Connects to multiple QuickBooks Desktop company files.
- **Validation**: Sanitizes and validates all inputs and outputs.
- **Unified error handling**: Streamlines error handling across the QuickBooks stack.
- **Authentication flow UI**: Simple UI for securely connecting QuickBooks Desktop accounts.
- **Dashboard**: UI to monitor and manage your QuickBooks Desktop connections and data.
- **Error resolution**: Detailed guides and instructions for resolving errors and handling edge cases.

## Usage

The full API of this library can be found with code samples at [docs.conductor.is/qbd-api](https://docs.conductor.is/qbd-api).

<!-- prettier-ignore -->
```js
import Conductor from 'conductor-node';

const conductor = new Conductor({
  apiKey: process.env['CONDUCTOR_SECRET_KEY'], // This is the default and can be omitted
});

const page = await conductor.qbd.invoices.list({ conductorEndUserId: 'YOUR_END_USER_ID' });
const invoice = page.data[0];

console.log(invoice.id);
```

### Request & Response types

This library includes TypeScript definitions for all request params and response fields. You may import and use them like so:

<!-- prettier-ignore -->
```ts
import Conductor from 'conductor-node';

const conductor = new Conductor({
  apiKey: process.env['CONDUCTOR_SECRET_KEY'], // This is the default and can be omitted
});

const params: Conductor.Qbd.InvoiceListParams = { conductorEndUserId: 'YOUR_END_USER_ID' };
const [invoice]: [Conductor.Qbd.Invoice] = await conductor.qbd.invoices.list(params);
```

Documentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

<!-- prettier-ignore -->
```ts
const page = await conductor.qbd.invoices.list({ conductorEndUserId: 'YOUR_END_USER_ID' }).catch(async (err) => {
  if (err instanceof Conductor.APIError) {
    console.log(err.status); // 400
    console.log(err.name); // BadRequestError
    console.log(err.headers); // {server: 'nginx', ...}
  } else {
    throw err;
  }
});
```

Error codes are as follows:

| Status Code | Error Type                 |
| ----------- | -------------------------- |
| 400         | `BadRequestError`          |
| 401         | `AuthenticationError`      |
| 403         | `PermissionDeniedError`    |
| 404         | `NotFoundError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
429 Rate Limit, and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

<!-- prettier-ignore -->
```js
// Configure the default for all requests:
const conductor = new Conductor({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await conductor.qbd.invoices.list({ conductorEndUserId: 'YOUR_END_USER_ID' }, {
  maxRetries: 5,
});
```

### Timeouts

Requests time out after 2 minutes by default. You can configure this with a `timeout` option:

<!-- prettier-ignore -->
```ts
// Configure the default for all requests:
const conductor = new Conductor({
  timeout: 20 * 1000, // 20 seconds (default is 2 minutes)
});

// Override per-request:
await conductor.qbd.invoices.list({ conductorEndUserId: 'YOUR_END_USER_ID' }, {
  timeout: 5 * 1000,
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be [retried twice by default](#retries).

## Auto-pagination

List methods in the Conductor API are paginated.
You can use the `for await … of` syntax to iterate through items across all pages:

```ts
async function fetchAllInvoices(params) {
  const allInvoices = [];
  // Automatically fetches more pages as needed.
  for await (const invoice of conductor.qbd.invoices.list({ conductorEndUserId: 'YOUR_END_USER_ID' })) {
    allInvoices.push(invoice);
  }
  return allInvoices;
}
```

Alternatively, you can request a single page at a time:

```ts
let page = await conductor.qbd.invoices.list({ conductorEndUserId: 'YOUR_END_USER_ID' });
for (const invoice of page.data) {
  console.log(invoice);
}

// Convenience methods are provided for manually paginating:
while (page.hasNextPage()) {
  page = await page.getNextPage();
  // ...
}
```

## Advanced Usage

### Accessing raw Response data (e.g., headers)

The "raw" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.

<!-- prettier-ignore -->
```ts
const conductor = new Conductor();

const response = await conductor.qbd.invoices.list({ conductorEndUserId: 'YOUR_END_USER_ID' }).asResponse();
console.log(response.headers.get('X-My-Header'));
console.log(response.statusText); // access the underlying Response object

const { data: page, response: raw } = await conductor.qbd.invoices
  .list({ conductorEndUserId: 'YOUR_END_USER_ID' })
  .withResponse();
console.log(raw.headers.get('X-My-Header'));
for await (const invoice of page) {
  console.log(invoice.id);
}
```

### Making custom/undocumented requests

This library is typed for convenient access to the documented API. If you need to access undocumented
endpoints, params, or response properties, the library can still be used.

#### Undocumented endpoints

To make requests to undocumented endpoints, you can use `conductor.get`, `conductor.post`, and other HTTP verbs.
Options on the client, such as retries, will be respected when making these requests.

```ts
await conductor.post('/some/path', {
  body: { some_prop: 'foo' },
  query: { some_query_arg: 'bar' },
});
```

#### Undocumented request params

To make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented
parameter. This library doesn't validate at runtime that the request matches the type, so any extra values you
send will be sent as-is.

```ts
conductor.foo.create({
  foo: 'my_param',
  bar: 12,
  // @ts-expect-error baz is not yet public
  baz: 'undocumented option',
});
```

For requests with the `GET` verb, any extra params will be in the query, all other requests will send the
extra param in the body.

If you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request
options.

#### Undocumented response properties

To access undocumented response properties, you may access the response object with `// @ts-expect-error` on
the response object, or cast the response object to the requisite type. Like the request params, we do not
validate or strip extra properties from the response from the API.

### Customizing the fetch client

By default, this library uses `node-fetch` in Node, and expects a global `fetch` function in other environments.

If you would prefer to use a global, web-standards-compliant `fetch` function even in a Node environment,
(for example, if you are running Node with `--experimental-fetch` or using NextJS which polyfills with `undici`),
add the following import before your first import `from "Conductor"`:

```ts
// Tell TypeScript and the package to use the global web fetch instead of node-fetch.
// Note, despite the name, this does not add any polyfills, but expects them to be provided if needed.
import 'conductor-node/shims/web';
import Conductor from 'conductor-node';
```

To do the inverse, add `import "conductor-node/shims/node"` (which does import polyfills).
This can also be useful if you are getting the wrong TypeScript types for `Response` ([more details](https://github.com/conductor-is/quickbooks-desktop-node/tree/main/src/_shims#readme)).

### Logging and middleware

You may also provide a custom `fetch` function when instantiating the client,
which can be used to inspect or alter the `Request` or `Response` before/after each request:

```ts
import { fetch } from 'undici'; // as one example
import Conductor from 'conductor-node';

const conductor = new Conductor({
  fetch: async (url: RequestInfo, init?: RequestInit): Promise<Response> => {
    console.log('About to make a request', url, init);
    const response = await fetch(url, init);
    console.log('Got response', response);
    return response;
  },
});
```

Note that if given a `DEBUG=true` environment variable, this library will log all requests and responses automatically.
This is intended for debugging purposes only and may change in the future without notice.

### Configuring an HTTP(S) Agent (e.g., for proxies)

By default, this library uses a stable agent for all http/https requests to reuse TCP connections, eliminating many TCP & TLS handshakes and shaving around 100ms off most requests.

If you would like to disable or customize this behavior, for example to use the API behind a proxy, you can pass an `httpAgent` which is used for all requests (be they http or https), for example:

<!-- prettier-ignore -->
```ts
import http from 'http';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Configure the default for all requests:
const conductor = new Conductor({
  httpAgent: new HttpsProxyAgent(process.env.PROXY_URL),
});

// Override per-request:
await conductor.qbd.invoices.list(
  { conductorEndUserId: 'YOUR_END_USER_ID' },
  {
    httpAgent: new http.Agent({ keepAlive: false }),
  },
);
```

## Semantic versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

We are keen for your feedback; please open an [issue](https://www.github.com/conductor-is/quickbooks-desktop-node/issues) with questions, bugs, or suggestions.

## Requirements

TypeScript >= 4.5 is supported.

The following runtimes are supported:

- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)
- Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.

## Contributing

See [the contributing documentation](./CONTRIBUTING.md).
