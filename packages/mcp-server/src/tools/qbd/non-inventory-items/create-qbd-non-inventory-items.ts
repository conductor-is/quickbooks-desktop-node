// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.non_inventory_items',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/non-inventory-items',
};

export const tool: Tool = {
  name: 'create_qbd_non_inventory_items',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates a new non-inventory item.",
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description:
          'The case-insensitive name of this non-inventory item. Not guaranteed to be unique because it does not include the names of its hierarchical parent objects like `fullName` does. For example, two non-inventory items could both have the `name` "Printer Ink Cartridge", but they could have unique `fullName` values, such as "Office Supplies:Printer Ink Cartridge" and "Miscellaneous:Printer Ink Cartridge".\n\nMaximum length: 31 characters.',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      barcode: {
        type: 'object',
        description: "The non-inventory item's barcode.",
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
          "The non-inventory item's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default.",
      },
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this non-inventory item is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      parentId: {
        type: 'string',
        description:
          'The parent non-inventory item one level above this one in the hierarchy. For example, if this non-inventory item has a `fullName` of "Office Supplies:Printer Ink Cartridge", its parent has a `fullName` of "Office Supplies". If this non-inventory item is at the top level, this field will be `null`.',
      },
      salesAndPurchaseDetails: {
        type: 'object',
        description:
          'Details for non-inventory items that are both purchased and sold, such as reimbursable expenses or inventory items that are bought from vendors and sold to customers.\n\n**IMPORTANT**: You must specify either `salesAndPurchaseDetails` or `salesOrPurchaseDetails` when creating a non-inventory item, but never both because an item cannot have both configurations.',
        properties: {
          expenseAccountId: {
            type: 'string',
            description: 'The expense account used to track costs from purchases of this item.',
          },
          incomeAccountId: {
            type: 'string',
            description: 'The income account used to track revenue from sales of this item.',
          },
          preferredVendorId: {
            type: 'string',
            description: 'The preferred vendor from whom this item is typically purchased.',
          },
          purchaseCost: {
            type: 'string',
            description:
              'The cost at which this item is purchased from vendors, represented as a decimal string.',
          },
          purchaseDescription: {
            type: 'string',
            description:
              'The description of this item that appears on purchase forms (e.g., checks, bills, item receipts) when it is ordered or bought from vendors.',
          },
          purchaseTaxCodeId: {
            type: 'string',
            description:
              'The tax code applied to purchases of this item. Applicable in regions where purchase taxes are used, such as Canada or the UK.',
          },
          salesDescription: {
            type: 'string',
            description:
              'The description of this item that appears on sales forms (e.g., invoices, sales receipts) when sold to customers.',
          },
          salesPrice: {
            type: 'string',
            description:
              'The price at which this item is sold to customers, represented as a decimal string.',
          },
        },
        required: ['expenseAccountId', 'incomeAccountId'],
      },
      salesOrPurchaseDetails: {
        type: 'object',
        description:
          "Details for non-inventory items that are exclusively sold or exclusively purchased, but not both. This typically applies to non-inventory items (like a purchased office supply that isn't resold) or service items (like consulting services that are sold but not purchased).\n\n**IMPORTANT**: You must specify either `salesOrPurchaseDetails` or `salesAndPurchaseDetails` when creating a non-inventory item, but never both because an item cannot have both configurations.",
        properties: {
          postingAccountId: {
            type: 'string',
            description:
              'The posting account to which transactions involving this item are posted. This could be an income account when selling or an expense account when purchasing.',
          },
          description: {
            type: 'string',
            description: 'A description of this item.',
          },
          price: {
            type: 'string',
            description:
              'The price at which this item is purchased or sold, represented as a decimal string.',
          },
          pricePercentage: {
            type: 'string',
            description:
              "The price of this item expressed as a percentage, used instead of `price` when the item's cost is calculated as a percentage of another amount. For example, a service item that costs a percentage of another item's price.",
          },
        },
        required: ['postingAccountId'],
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The default sales-tax code for this non-inventory item, determining whether it is taxable or non-taxable. This can be overridden at the transaction-line level.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
      sku: {
        type: 'string',
        description:
          "The non-inventory item's stock keeping unit (SKU), which is sometimes the manufacturer's part number.",
      },
      unitOfMeasureSetId: {
        type: 'string',
        description:
          'The unit-of-measure set associated with this non-inventory item, which consists of a base unit and related units.',
      },
    },
    required: ['name', 'conductorEndUserId'],
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.qbd.nonInventoryItems.create(body));
};

export default { metadata, tool, handler };
