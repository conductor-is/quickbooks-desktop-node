// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.inventory_adjustments',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/inventory-adjustments',
};

export const tool: Tool = {
  name: 'create_qbd_inventory_adjustments',
  description:
    "Creates an inventory adjustment to correct on-hand quantities or values. QuickBooks requires single-user mode unless you're on Enterprise with Advanced Inventory enabled.",
  inputSchema: {
    type: 'object',
    properties: {
      accountId: {
        type: 'string',
        description:
          'The account to which this inventory adjustment is posted for tracking inventory value changes.',
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this inventory adjustment, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
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
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
      },
      inventorySiteId: {
        type: 'string',
        description:
          'The site location where inventory for the item associated with this inventory adjustment is stored.',
      },
      lines: {
        type: 'array',
        description:
          "The inventory adjustment's item lines, each representing the adjustment of an inventory item's quantity, value, serial number, or lot number.",
        items: {
          type: 'object',
          properties: {
            itemId: {
              type: 'string',
              description: 'The inventory item associated with this inventory adjustment line.',
            },
            adjustLotNumber: {
              type: 'object',
              description: 'Adjusts the lot number of this inventory adjustment line.',
              properties: {
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
                lotNumber: {
                  type: 'string',
                  description:
                    'The lot number of the item associated with this inventory adjustment line. Used for tracking groups of inventory items that are purchased or manufactured together.',
                },
              },
            },
            adjustQuantity: {
              type: 'object',
              description:
                'Adjusts the inventory quantity of this inventory item either by setting a new quantity or by adjusting the current quantity up or down.',
              properties: {
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
                lotNumber: {
                  type: 'string',
                  description:
                    'The lot number of the item associated with this inventory adjustment line. Used for tracking groups of inventory items that are purchased or manufactured together.',
                },
                newQuantity: {
                  type: 'number',
                  description:
                    'The new quantity for the inventory item associated with this inventory adjustment line.',
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
              },
            },
            adjustSerialNumber: {
              type: 'object',
              description:
                'Adjusts the serial number of this inventory adjustment line. This is used for tracking individual units of serialized inventory items.',
              properties: {
                addSerialNumber: {
                  type: 'string',
                  description:
                    'The serial number, which represents a unique unit of the inventory item associated with this inventory adjustment line, to add to inventory.',
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
                removeSerialNumber: {
                  type: 'string',
                  description:
                    'The serial number, which represents a unique unit of the inventory item associated with this inventory adjustment line, to remove from inventory.',
                },
              },
            },
            adjustValue: {
              type: 'object',
              description:
                'Adjusts the total value of the entire stock of this inventory item by setting a new monetary value, and optionally by setting a new quantity.',
              properties: {
                newQuantity: {
                  type: 'number',
                  description:
                    'The new quantity for the inventory item associated with this inventory adjustment line.',
                },
                newValue: {
                  type: 'string',
                  description:
                    'The new total value of the entire stock of the inventory item associated with this inventory adjustment line.\n\n**NOTE**: The new value does _not_ have to equal `quantityOnHand` times `purchaseCost`.',
                },
                quantityDifference: {
                  type: 'number',
                  description:
                    'Either a positive or negative number that shows the change in quantity for the inventory item associated with this inventory adjustment line. A positive number increases the quantity, while a negative number decreases it.',
                },
                valueDifference: {
                  type: 'number',
                  description:
                    'Either a positive or negative number that shows the change in the total value of the entire stock of the inventory item associated with this inventory adjustment line. A positive number increases the value, while a negative number decreases it.',
                },
              },
            },
          },
          required: ['itemId'],
        },
      },
      memo: {
        type: 'string',
        description: 'A memo or note for this inventory adjustment.',
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this inventory adjustment, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user. When left blank in this create request, this field will be left blank in QuickBooks (i.e., it does *not* auto-increment).',
      },
    },
    required: ['accountId', 'transactionDate', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.qbd.inventoryAdjustments.create(body));
};

export default { metadata, tool, handler };
