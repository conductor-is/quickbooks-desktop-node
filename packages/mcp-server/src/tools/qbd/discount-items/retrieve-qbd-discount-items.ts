// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.discount_items',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/discount-items/{id}',
};

export const tool: Tool = {
  name: 'retrieve_qbd_discount_items',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieves a discount item by ID.",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the discount item to retrieve.',
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
    },
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.discountItems.retrieve(id, body));
};

export default { metadata, tool, handler };
