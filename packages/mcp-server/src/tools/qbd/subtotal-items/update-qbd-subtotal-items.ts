// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.subtotal_items',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/subtotal-items/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_subtotal_items',
  description: 'Updates an existing subtotal item.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the subtotal item to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the subtotal item object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      barcode: {
        type: 'object',
        description: "The subtotal item's barcode.",
        properties: {
          allowOverride: {
            type: 'boolean',
            description: 'Indicates whether to allow the barcode to be overridden.',
          },
          assignEvenIfUsed: {
            type: 'boolean',
            description: 'Indicates whether to assign the barcode even if it is already used.',
          },
          value: {
            type: 'string',
            description: "The item's barcode value.",
          },
        },
        required: [],
      },
      description: {
        type: 'string',
        description:
          "The subtotal item's description that will appear on sales forms that include this item.",
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this subtotal item is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this subtotal item, unique across all subtotal items.\n\n**NOTE**: Subtotal items do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
      },
    },
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.subtotalItems.update(id, body));
};

export default { metadata, tool, handler };
