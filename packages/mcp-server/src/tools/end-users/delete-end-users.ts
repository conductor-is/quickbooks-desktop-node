// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'end_users',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/end-users/{id}',
};

export const tool: Tool = {
  name: 'delete_end_users',
  description: 'Permanently deletes an end-user object and all of its connections.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the end-user to delete.',
      },
    },
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.endUsers.delete(id));
};

export default { metadata, tool, handler };
