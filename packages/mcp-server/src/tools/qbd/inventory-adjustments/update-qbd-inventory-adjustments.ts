// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.inventory_adjustments',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/inventory-adjustments/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_inventory_adjustments',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdates an existing inventory adjustment.",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the inventory adjustment to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the inventory adjustment object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      accountId: {
        type: 'string',
        description:
          'The account to which this inventory adjustment is posted for tracking inventory value changes.',
      },
      classId: {
        type: 'string',
        description:
          "The inventory adjustment's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. A class defined here is automatically used in this inventory adjustment's line items unless overridden at the line item level.",
      },
      customerId: {
        type: 'string',
        description: 'The customer or customer-job associated with this inventory adjustment.',
      },
      inventorySiteId: {
        type: 'string',
        description:
          'The site location where inventory for the item associated with this inventory adjustment is stored.',
      },
      lines: {
        type: 'array',
        description:
          "The inventory adjustment's item lines, each representing the adjustment of an inventory item's quantity, value, serial number, or lot number.\n\n**IMPORTANT**:\n\n1. Including this array in your update request will **REPLACE** all existing item lines for the inventory adjustment with this array. To keep any existing item lines, you must include them in this array even if they have not changed. **Any item lines not included will be removed.**\n\n2. To add a new item line, include it here with the `id` field set to `-1`.\n\n3. If you do not wish to modify any item lines, omit this field entirely to keep them unchanged.",
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description:
                'The QuickBooks-assigned unique identifier of an existing inventory adjustment line you wish to retain or update.\n\n**IMPORTANT**: Set this field to `-1` for new inventory adjustment lines you wish to add.',
            },
            adjustCount: {
              type: 'number',
              description:
                'The amount to adjust the count of the inventory item associated with this inventory adjustment line.',
            },
            expirationDate: {
              type: 'string',
              description:
                'The expiration date for the serial number or lot number of the item associated with this inventory adjustment line, in ISO 8601 format (YYYY-MM-DD). This is particularly relevant for perishable or time-sensitive inventory items. Note that this field is only supported on QuickBooks Desktop 2023 or later.',
              format: 'date',
            },
            inventorySiteLocationId: {
              type: 'string',
              description:
                'The specific location (e.g., bin or shelf) within the inventory site where the item associated with this inventory adjustment line is stored.',
            },
            itemId: {
              type: 'string',
              description: 'The inventory item associated with this inventory adjustment line.',
            },
            lotNumber: {
              type: 'string',
              description:
                'The lot number of the item associated with this inventory adjustment line. Used for tracking groups of inventory items that are purchased or manufactured together.',
            },
            quantityDifference: {
              type: 'number',
              description:
                'Either a positive or negative number that shows the change in quantity for the inventory item associated with this inventory adjustment line. A positive number increases the quantity, while a negative number decreases it.',
            },
            serialNumber: {
              type: 'string',
              description:
                'The serial number of the item associated with this inventory adjustment line. This is used for tracking individual units of serialized inventory items.',
            },
            valueDifference: {
              type: 'number',
              description:
                'Either a positive or negative number that shows the change in the total value of the entire stock of the inventory item associated with this inventory adjustment line. A positive number increases the value, while a negative number decreases it.',
            },
          },
          required: ['id'],
        },
      },
      memo: {
        type: 'string',
        description: 'A memo or note for this inventory adjustment.',
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this inventory adjustment, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user.',
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this inventory adjustment, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
    },
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.inventoryAdjustments.update(id, body));
};

export default { metadata, tool, handler };
