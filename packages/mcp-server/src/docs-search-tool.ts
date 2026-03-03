// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { Metadata, McpRequestContext, asTextContentResult } from './types';
import { getLogger } from './logger';

export const metadata: Metadata = {
  resource: 'all',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
};

export const tool: Tool = {
  name: 'search_docs',
  description: 'Search for documentation for how to use the client to interact with the API.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The query to search for.',
      },
      language: {
        type: 'string',
        description: 'The language for the SDK to search for.',
        enum: ['http', 'python', 'go', 'typescript', 'javascript', 'terraform', 'ruby', 'java', 'kotlin'],
      },
      detail: {
        type: 'string',
        description: 'The amount of detail to return.',
        enum: ['default', 'verbose'],
      },
    },
    required: ['query', 'language'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

const docsSearchURL =
  process.env['DOCS_SEARCH_URL'] || 'https://api.stainless.com/api/projects/conductor/docs/search';

export const handler = async ({
  reqContext,
  args,
}: {
  reqContext: McpRequestContext;
  args: Record<string, unknown> | undefined;
}) => {
  const body = args as any;
  const query = new URLSearchParams(body).toString();

  const startTime = Date.now();
  const result = await fetch(`${docsSearchURL}?${query}`, {
    headers: {
      ...(reqContext.stainlessApiKey && { Authorization: reqContext.stainlessApiKey }),
    },
  });

  const logger = getLogger();

  if (!result.ok) {
    const errorText = await result.text();
    logger.warn(
      {
        durationMs: Date.now() - startTime,
        query: body.query,
        status: result.status,
        statusText: result.statusText,
        errorText,
      },
      'Got error response from docs search tool',
    );
    throw new Error(
      `${result.status}: ${result.statusText} when using doc search tool. Details: ${errorText}`,
    );
  }

  const resultBody = await result.json();
  logger.info(
    {
      durationMs: Date.now() - startTime,
      query: body.query,
    },
    'Got docs search result',
  );
  return asTextContentResult(resultBody);
};

export default { metadata, tool, handler };
