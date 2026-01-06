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

## MCP Server

Use the Conductor MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=conductor-node-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImNvbmR1Y3Rvci1ub2RlLW1jcCJdfQ)
[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22conductor-node-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22conductor-node-mcp%22%5D%7D)

> Note: You may need to set environment variables in your MCP client.

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

The full API of this library can be found with code samples at [docs.conductor.is/qbd-api](https://docs.conductor.is/api-ref).

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
const page = await conductor.qbd.invoices
  .list({ conductorEndUserId: 'YOUR_END_USER_ID' })
  .catch(async (err) => {
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
This method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.
Unlike `.asResponse()` this method consumes the body, returning once it is parsed.

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

### Logging

> [!IMPORTANT]
> All log messages are intended for debugging only. The format and content of log messages
> may change between releases.

#### Log levels

The log level can be configured in two ways:

1. Via the `CONDUCTOR_LOG` environment variable
2. Using the `logLevel` client option (overrides the environment variable if set)

```ts
import Conductor from 'conductor-node';

const conductor = new Conductor({
  logLevel: 'debug', // Show all log messages
});
```

Available log levels, from most to least verbose:

- `'debug'` - Show debug messages, info, warnings, and errors
- `'info'` - Show info messages, warnings, and errors
- `'warn'` - Show warnings and errors (default)
- `'error'` - Show only errors
- `'off'` - Disable all logging

At the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.
Some authentication-related headers are redacted, but sensitive data in request and response bodies
may still be visible.

#### Custom logger

By default, this library logs to `globalThis.console`. You can also provide a custom logger.
Most logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.

When providing a custom logger, the `logLevel` option still controls which messages are emitted, messages
below the configured level will not be sent to your logger.

```ts
import Conductor from 'conductor-node';
import pino from 'pino';

const logger = pino();

const conductor = new Conductor({
  logger: logger.child({ name: 'Conductor' }),
  logLevel: 'debug', // Send all messages to pino, allowing it to filter
});
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
conductor.qbd.invoices.list({
  // ...
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

By default, this library expects a global `fetch` function is defined.

If you want to use a different `fetch` function, you can either polyfill the global:

```ts
import fetch from 'my-fetch';

globalThis.fetch = fetch;
```

Or pass it to the client:

```ts
import Conductor from 'conductor-node';
import fetch from 'my-fetch';

const conductor = new Conductor({ fetch });
```

### Fetch options

If you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)

```ts
import Conductor from 'conductor-node';

const conductor = new Conductor({
  fetchOptions: {
    // `RequestInit` options
  },
});
```

#### Configuring proxies

To modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy
options to requests:

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg" align="top" width="18" height="21"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>

```ts
import Conductor from 'conductor-node';
import * as undici from 'undici';

const proxyAgent = new undici.ProxyAgent('http://localhost:8888');
const conductor = new Conductor({
  fetchOptions: {
    dispatcher: proxyAgent,
  },
});
```

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg" align="top" width="18" height="21"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>

```ts
import Conductor from 'conductor-node';

const conductor = new Conductor({
  fetchOptions: {
    proxy: 'http://localhost:8888',
  },
});
```

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg" align="top" width="18" height="21"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>

```ts
import Conductor from 'npm:conductor-node';

const httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });
const conductor = new Conductor({
  fetchOptions: {
    client: httpClient,
  },
});
```

## Frequently Asked Questions

## Semantic versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

We are keen for your feedback; please open an [issue](https://www.github.com/conductor-is/quickbooks-desktop-node/issues) with questions, bugs, or suggestions.

## Requirements

TypeScript >= 4.9 is supported.

The following runtimes are supported:

- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)
- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
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
