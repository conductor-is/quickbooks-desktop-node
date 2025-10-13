// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.service_items',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/service-items/{id}',
};

export const tool: Tool = {
  name: 'retrieve_qbd_service_items',
  description:
    'Retrieves a service item by ID.\n\n**IMPORTANT:** If you need to fetch multiple specific service items by ID, use the list endpoint instead with the `ids` parameter. It accepts an array of IDs so you can batch the request into a single call, which is significantly faster.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the service item to retrieve.',
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
    },
    required: ['id', 'Conductor-End-User-Id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.serviceItems.retrieve(id, body));
};

export default { metadata, tool, handler };
