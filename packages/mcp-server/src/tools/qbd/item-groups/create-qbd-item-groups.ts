// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.item_groups',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/item-groups',
};

export const tool: Tool = {
  name: 'create_qbd_item_groups',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates a new item group.",
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this item group, unique across all item groups.\n\n**NOTE**: Item groups do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
      },
      shouldPrintItemsInGroup: {
        type: 'boolean',
        description:
          'Indicates whether the individual items in this item group and their separate amounts appear on printed forms.',
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      barcode: {
        type: 'object',
        description: "The item group's barcode.",
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
        description: "The item group's description that will appear on sales forms that include this item.",
      },
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this item group is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      lines: {
        type: 'array',
        description: 'The item lines in this item group.',
        items: {
          type: 'object',
          properties: {
            itemId: {
              type: 'string',
              description:
                'The item associated with this item group line. This can refer to any good or service that the business buys or sells, including item types such as a service item, inventory item, or special calculation item like a discount item or sales-tax item.',
            },
            quantity: {
              type: 'number',
              description:
                'The quantity of the item group associated with this item group line. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item group is a discount item group.',
            },
            unitOfMeasure: {
              type: 'string',
              description:
                "The unit-of-measure used for the `quantity` in this item group line. Must be a valid unit within the item's available units of measure.",
            },
          },
          required: [],
        },
      },
      unitOfMeasureSetId: {
        type: 'string',
        description:
          'The unit-of-measure set associated with this item group, which consists of a base unit and related units.',
      },
    },
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.qbd.itemGroups.create(body));
};

export default { metadata, tool, handler };
