// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { Metadata, McpRequestContext, asTextContentResult } from './types';

import type { LocalDocsSearch } from './local-docs-search';

export const metadata: Metadata = {
  resource: 'all',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
};

export const tool: Tool = {
  name: 'search_docs',
  description:
    'Search SDK documentation to find methods, parameters, and usage examples for interacting with the API. Use this before writing code when you need to discover the right approach.',
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

let _localSearch: LocalDocsSearch | undefined;

export function setLocalSearch(search: LocalDocsSearch): void {
  _localSearch = search;
}

async function searchLocal(args: Record<string, unknown>): Promise<unknown> {
  if (!_localSearch) {
    throw new Error('Local search not initialized');
  }

  const query = (args['query'] as string) ?? '';
  const language = (args['language'] as string) ?? 'typescript';
  const detail = (args['detail'] as string) ?? 'default';

  return _localSearch.search({
    query,
    language,
    detail,
    maxResults: 10,
  }).results;
}

export const handler = async ({
  reqContext,
  args,
}: {
  reqContext: McpRequestContext;
  args: Record<string, unknown> | undefined;
}) => {
  const body = args ?? {};

  return asTextContentResult(await searchLocal(body));
};

export default { metadata, tool, handler };
