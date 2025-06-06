// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'end_users',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/end-users',
};

export const tool: Tool = {
  name: 'list_end_users',
  description: 'Returns a list of your end-users.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = async (client: Conductor, args: Record<string, unknown> | undefined) => {
  return asTextContentResult(await client.endUsers.list());
};

export default { metadata, tool, handler };
