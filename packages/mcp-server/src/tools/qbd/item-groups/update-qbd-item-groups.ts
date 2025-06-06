// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.item_groups',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/item-groups/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_item_groups',
  description: 'Updates an existing item group.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the item group to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the item group object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
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
      clearItemLines: {
        type: 'boolean',
        description:
          'When `true`, removes all existing item lines associated with this item group. To modify or add individual item lines, use the field `itemLines` instead.',
      },
      description: {
        type: 'string',
        description: "The item group's description that will appear on sales forms that include this item.",
      },
      forceUnitOfMeasureChange: {
        type: 'boolean',
        description:
          "Indicates whether to allow changing the item group's unit-of-measure set (using the `unitOfMeasureSetId` field) when the base unit of the new unit-of-measure set does not match that of the currently assigned set. Without setting this field to `true` in this scenario, the request will fail with an error; hence, this field is equivalent to accepting the warning prompt in the QuickBooks UI.\n\nNOTE: Changing the base unit requires you to update the item's quantities-on-hand and cost to reflect the new unit; otherwise, these values will be inaccurate. Alternatively, consider creating a new item with the desired unit-of-measure set and deactivating the old item.",
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
      unitOfMeasureSetId: {
        type: 'string',
        description:
          'The unit-of-measure set associated with this item group, which consists of a base unit and related units.',
      },
    },
  },
};

export const handler = async (client: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await client.qbd.itemGroups.update(id, body));
};

export default { metadata, tool, handler };
