// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.inventory_assembly_items',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/inventory-assembly-items/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_inventory_assembly_items',
  description:
    'Updates an inventory assembly item. If you change the income account, set `updateExistingTransactionsIncomeAccount` to true so QuickBooks applies the new account to existing transactions that use the assembly.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the inventory assembly item to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the inventory assembly item object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      assetAccountId: {
        type: 'string',
        description:
          'The asset account used to track the current value of this inventory assembly item in inventory.',
      },
      barcode: {
        type: 'object',
        description: "The inventory assembly item's barcode.",
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
      buildNotificationThreshold: {
        type: 'number',
        description:
          "The inventory assembly item's minimum quantity threshold that triggers a build notification in QuickBooks. When the sum of `quantityOnHand` (current inventory) and `quantityOnOrder` (pending purchase orders) drops below this threshold, QuickBooks will notify users that more units need to be built or assembled. This helps ensure adequate inventory levels for inventory assembly items.",
      },
      classId: {
        type: 'string',
        description:
          "The inventory assembly item's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default.",
      },
      clearItemLines: {
        type: 'boolean',
        description:
          'When `true`, removes all existing item lines associated with this inventory assembly item. To modify or add individual item lines, use the field `itemLines` instead.',
      },
      cogsAccountId: {
        type: 'string',
        description:
          'The Cost of Goods Sold (COGS) account for this inventory assembly item, tracking the original direct costs of producing goods sold.',
      },
      forceUnitOfMeasureChange: {
        type: 'boolean',
        description:
          "Indicates whether to allow changing the inventory assembly item's unit-of-measure set (using the `unitOfMeasureSetId` field) when the base unit of the new unit-of-measure set does not match that of the currently assigned set. Without setting this field to `true` in this scenario, the request will fail with an error; hence, this field is equivalent to accepting the warning prompt in the QuickBooks UI.\n\nNOTE: Changing the base unit requires you to update the item's quantities-on-hand and cost to reflect the new unit; otherwise, these values will be inaccurate. Alternatively, consider creating a new item with the desired unit-of-measure set and deactivating the old item.",
      },
      incomeAccountId: {
        type: 'string',
        description: 'The income account used to track revenue from sales of this inventory assembly item.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this inventory assembly item is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      lines: {
        type: 'array',
        description: "The inventory assembly item's lines.",
        items: {
          type: 'object',
          properties: {
            inventoryItemId: {
              type: 'string',
              description: 'The inventory item associated with this inventory assembly item line.',
            },
            quantity: {
              type: 'number',
              description:
                'The quantity of the item associated with this inventory assembly item line. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item is a discount item.',
            },
          },
        },
      },
      maximumQuantityOnHand: {
        type: 'number',
        description: 'The maximum quantity of this inventory assembly item desired in inventory.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive name of this inventory assembly item. Not guaranteed to be unique because it does not include the names of its hierarchical parent objects like `fullName` does. For example, two inventory assembly items could both have the `name` "Deluxe Kit", but they could have unique `fullName` values, such as "Assemblies:Deluxe Kit" and "Inventory:Deluxe Kit".\n\nMaximum length: 31 characters.',
      },
      parentId: {
        type: 'string',
        description:
          'The parent inventory assembly item one level above this one in the hierarchy. For example, if this inventory assembly item has a `fullName` of "Assemblies:Deluxe Kit", its parent has a `fullName` of "Assemblies". If this inventory assembly item is at the top level, this field will be `null`.',
      },
      preferredVendorId: {
        type: 'string',
        description: 'The preferred vendor from whom this inventory assembly item is typically purchased.',
      },
      purchaseCost: {
        type: 'string',
        description:
          'The cost at which this inventory assembly item is purchased from vendors, represented as a decimal string.',
      },
      purchaseDescription: {
        type: 'string',
        description:
          'The description of this inventory assembly item that appears on purchase forms (e.g., checks, bills, item receipts) when it is ordered or bought from vendors.',
      },
      purchaseTaxCodeId: {
        type: 'string',
        description:
          'The tax code applied to purchases of this inventory assembly item. Applicable in regions where purchase taxes are used, such as Canada or the UK.',
      },
      salesDescription: {
        type: 'string',
        description:
          'The description of this inventory assembly item that appears on sales forms (e.g., invoices, sales receipts) when sold to customers.',
      },
      salesPrice: {
        type: 'string',
        description:
          'The price at which this inventory assembly item is sold to customers, represented as a decimal string.',
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The default sales-tax code for this inventory assembly item, determining whether it is taxable or non-taxable. This can be overridden at the transaction-line level.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
      sku: {
        type: 'string',
        description:
          "The inventory assembly item's stock keeping unit (SKU), which is sometimes the manufacturer's part number.",
      },
      unitOfMeasureSetId: {
        type: 'string',
        description:
          'The unit-of-measure set associated with this inventory assembly item, which consists of a base unit and related units.',
      },
      updateExistingTransactionsIncomeAccount: {
        type: 'boolean',
        description:
          'When `true`, applies the new income account (specified by the `incomeAccountId` field) to all existing transactions that use this inventory assembly item. This updates historical data and should be used with caution. The update will fail if any affected transaction falls within a closed accounting period. If this parameter is not specified, QuickBooks will prompt the user before making any changes.',
      },
    },
    required: ['id', 'revisionNumber', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.inventoryAssemblyItems.update(id, body));
};

export default { metadata, tool, handler };
