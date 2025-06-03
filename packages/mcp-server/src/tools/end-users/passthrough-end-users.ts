// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'end_users',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/end-users/{id}/passthrough/{integrationSlug}',
};

export const tool: Tool = {
  name: 'passthrough_end_users',
  description:
    'Sends a request directly to the specified integration connection (e.g., QuickBooks Desktop) on behalf of the end-user.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the end-user who owns the integration connection.',
      },
      integrationSlug: {
        type: 'string',
        description: "The integration identifier for the end-user's connection.",
        enum: ['quickbooks_desktop'],
      },
      qbd_payload: {
        type: 'object',
        description: 'The request body to send to the integration connection.',
      },
    },
  },
};

export const handler = (client: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, integrationSlug, ...body } = args as any;
  return client.endUsers.passthrough(id, integrationSlug, body['qbd_payload']);
};

export default { metadata, tool, handler };
