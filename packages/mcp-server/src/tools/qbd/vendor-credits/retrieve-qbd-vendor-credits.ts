// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.vendor_credits',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/vendor-credits/{id}',
};

export const tool: Tool = {
  name: 'retrieve_qbd_vendor_credits',
  description:
    'Retrieves a vendor credit by ID.\n\n**IMPORTANT:** If you need to fetch multiple specific vendor credits by ID, use the list endpoint instead with the `ids` parameter. It accepts an array of IDs so you can batch the request into a single call, which is significantly faster.\n\nNOTE: The response automatically includes any linked transactions.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the vendor credit to retrieve.',
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
  return asTextContentResult(await conductor.qbd.vendorCredits.retrieve(id, body));
};

export default { metadata, tool, handler };
