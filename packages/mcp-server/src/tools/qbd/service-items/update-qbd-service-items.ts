// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.service_items',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/service-items/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_service_items',
  description:
    'Updates a service item’s details, including its accounts and unit-of-measure set. QuickBooks won’t let you convert a sell-only service into a buy-and-sell service (or the reverse); create a separate item instead. If you’re switching the unit of measure, set `forceUnitOfMeasureChange` so QuickBooks replaces it on existing forms.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the service item to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the service item object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      barcode: {
        type: 'object',
        description: "The service item's barcode.",
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
          "The service item's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default.",
      },
      forceUnitOfMeasureChange: {
        type: 'boolean',
        description:
          "Indicates whether to allow changing the service item's unit-of-measure set (using the `unitOfMeasureSetId` field) when the base unit of the new unit-of-measure set does not match that of the currently assigned set. Without setting this field to `true` in this scenario, the request will fail with an error; hence, this field is equivalent to accepting the warning prompt in the QuickBooks UI.\n\nNOTE: Changing the base unit requires you to update the item's quantities-on-hand and cost to reflect the new unit; otherwise, these values will be inaccurate. Alternatively, consider creating a new item with the desired unit-of-measure set and deactivating the old item.",
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this service item is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive name of this service item. Not guaranteed to be unique because it does not include the names of its hierarchical parent objects like `fullName` does. For example, two service items could both have the `name` "Web-Design", but they could have unique `fullName` values, such as "Consulting:Web-Design" and "Contracting:Web-Design".\n\nMaximum length: 31 characters.',
      },
      parentId: {
        type: 'string',
        description:
          'The parent service item one level above this one in the hierarchy. For example, if this service item has a `fullName` of "Consulting:Web-Design", its parent has a `fullName` of "Consulting". If this service item is at the top level, this field will be `null`.',
      },
      salesAndPurchaseDetails: {
        type: 'object',
        description:
          'Details for service items that are both purchased and sold, such as reimbursable expenses or inventory items that are bought from vendors and sold to customers.\n\n**IMPORTANT**: You cannot specify both `salesAndPurchaseDetails` and `salesOrPurchaseDetails` when modifying a service item because an item cannot have both configurations.',
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
          updateExistingTransactionsExpenseAccount: {
            type: 'boolean',
            description:
              'When `true`, applies the new expense account (specified by the `expenseAccountId` field) to all existing transactions that use this item. This updates historical data and should be used with caution. The update will fail if any affected transaction falls within a closed accounting period. If this parameter is not specified, QuickBooks will prompt the user before making any changes.',
          },
          updateExistingTransactionsIncomeAccount: {
            type: 'boolean',
            description:
              'When `true`, applies the new income account (specified by the `incomeAccountId` field) to all existing transactions that use this item. This updates historical data and should be used with caution. The update will fail if any affected transaction falls within a closed accounting period. If this parameter is not specified, QuickBooks will prompt the user before making any changes.',
          },
        },
      },
      salesOrPurchaseDetails: {
        type: 'object',
        description:
          "Details for service items that are exclusively sold or exclusively purchased, but not both. This typically applies to non-inventory items (like a purchased office supply that isn't resold) or service items (like consulting services that are sold but not purchased).\n\n**IMPORTANT**: You cannot specify both `salesOrPurchaseDetails` and `salesAndPurchaseDetails` when modifying a service item because an item cannot have both configurations.",
        properties: {
          description: {
            type: 'string',
            description: 'A description of this item.',
          },
          postingAccountId: {
            type: 'string',
            description:
              'The posting account to which transactions involving this item are posted. This could be an income account when selling or an expense account when purchasing.',
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
          updateExistingTransactionsAccount: {
            type: 'boolean',
            description:
              'When `true`, applies the new account (specified by the `accountId` field) to all existing transactions associated with this item. This updates historical data and should be used with caution. The update will fail if any affected transaction falls within a closed accounting period. If this parameter is not specified, QuickBooks will prompt the user before making any changes.',
          },
        },
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The default sales-tax code for this service item, determining whether it is taxable or non-taxable. This can be overridden at the transaction-line level.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
      unitOfMeasureSetId: {
        type: 'string',
        description:
          'The unit-of-measure set associated with this service item, which consists of a base unit and related units.',
      },
    },
    required: ['id', 'revisionNumber', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.serviceItems.update(id, body));
};

export default { metadata, tool, handler };
