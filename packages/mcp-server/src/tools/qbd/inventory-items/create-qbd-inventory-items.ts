// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.inventory_items',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/inventory-items',
};

export const tool: Tool = {
  name: 'create_qbd_inventory_items',
  description: 'Creates a new inventory item.',
  inputSchema: {
    type: 'object',
    properties: {
      assetAccountId: {
        type: 'string',
        description: 'The asset account used to track the current value of this inventory item in inventory.',
      },
      cogsAccountId: {
        type: 'string',
        description:
          'The Cost of Goods Sold (COGS) account for this inventory item, tracking the original direct costs of producing goods sold.',
      },
      incomeAccountId: {
        type: 'string',
        description: 'The income account used to track revenue from sales of this inventory item.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive name of this inventory item. Not guaranteed to be unique because it does not include the names of its hierarchical parent objects like `fullName` does. For example, two inventory items could both have the `name` "Cabinet", but they could have unique `fullName` values, such as "Kitchen:Cabinet" and "Inventory:Cabinet".\n\nMaximum length: 31 characters.',
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      barcode: {
        type: 'object',
        description: "The inventory item's barcode.",
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
      },
      classId: {
        type: 'string',
        description:
          "The inventory item's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default.",
      },
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
      },
      inventoryDate: {
        type: 'string',
        description:
          'The date when this inventory item was converted into an inventory item from some other type of item, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this inventory item is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      maximumQuantityOnHand: {
        type: 'number',
        description: 'The maximum quantity of this inventory item desired in inventory.',
      },
      parentId: {
        type: 'string',
        description:
          'The parent inventory item one level above this one in the hierarchy. For example, if this inventory item has a `fullName` of "Kitchen:Cabinet", its parent has a `fullName` of "Kitchen". If this inventory item is at the top level, this field will be `null`.',
      },
      preferredVendorId: {
        type: 'string',
        description: 'The preferred vendor from whom this inventory item is typically purchased.',
      },
      purchaseCost: {
        type: 'string',
        description:
          'The cost at which this inventory item is purchased from vendors, represented as a decimal string.',
      },
      purchaseDescription: {
        type: 'string',
        description:
          'The description of this inventory item that appears on purchase forms (e.g., checks, bills, item receipts) when it is ordered or bought from vendors.',
      },
      purchaseTaxCodeId: {
        type: 'string',
        description:
          'The tax code applied to purchases of this inventory item. Applicable in regions where purchase taxes are used, such as Canada or the UK.',
      },
      quantityOnHand: {
        type: 'number',
        description:
          'The number of units of this inventory item currently in inventory. `quantityOnHand` multiplied by `averageCost` equals `totalValue` for inventory item lists. To change the `quantityOnHand` for an inventory item, you must use an inventory-adjustment instead of updating the inventory item directly.',
      },
      reorderPoint: {
        type: 'number',
        description:
          'The minimum quantity of this inventory item at which QuickBooks prompts for reordering.',
      },
      salesDescription: {
        type: 'string',
        description:
          'The description of this inventory item that appears on sales forms (e.g., invoices, sales receipts) when sold to customers.',
      },
      salesPrice: {
        type: 'string',
        description:
          'The price at which this inventory item is sold to customers, represented as a decimal string.',
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The default sales-tax code for this inventory item, determining whether it is taxable or non-taxable. This can be overridden at the transaction-line level.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
      sku: {
        type: 'string',
        description:
          "The inventory item's stock keeping unit (SKU), which is sometimes the manufacturer's part number.",
      },
      totalValue: {
        type: 'string',
        description:
          'The total value of this inventory item. If `totalValue` is provided, `quantityOnHand` must also be provided and must be greater than zero. If both `quantityOnHand` and `purchaseCost` are provided, then `totalValue` will be set to `quantityOnHand` times `purchaseCost`, regardless of what `totalValue` is explicitly set to.',
      },
      unitOfMeasureSetId: {
        type: 'string',
        description:
          'The unit-of-measure set associated with this inventory item, which consists of a base unit and related units.',
      },
    },
    required: ['assetAccountId', 'cogsAccountId', 'incomeAccountId', 'name', 'Conductor-End-User-Id'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  try {
    return asTextContentResult(await conductor.qbd.inventoryItems.create(body));
  } catch (error) {
    if (error instanceof Conductor.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
