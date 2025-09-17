// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.discount_items',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/discount-items/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_discount_items',
  description:
    'Updates a discount item, including its linked account or discount rate. When changing the account, use `updateExistingTransactionsAccount` to control whether existing transactions that reference the item should also be updated.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the discount item to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the discount item object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      accountId: {
        type: 'string',
        description:
          'The posting account to which transactions involving this discount item are posted for tracking discounts.',
      },
      barcode: {
        type: 'object',
        description: "The discount item's barcode.",
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
          "The discount item's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default.",
      },
      description: {
        type: 'string',
        description:
          "The discount item's description that will appear on sales forms that include this item.",
      },
      discountRate: {
        type: 'string',
        description:
          'The monetary amount to subtract from the total or subtotal when applying this discount item to a transaction.\n\n**NOTE**: A flat rate discount applies to ALL lines recorded above it and distributes the discount amount equally across those lines, which affects tax calculations. For example, a $10 discount applied to a $100 taxable item and $100 non-taxable item would result in a $5 taxable discount and $5 non-taxable discount.',
      },
      discountRatePercent: {
        type: 'string',
        description:
          'The percentage amount to subtract from the total or subtotal when applying this discount item to a transaction.\n\n**NOTE**: A percentage discount only applies to the line immediately above it, so tax implications only affect that specific line.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this discount item is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive name of this discount item. Not guaranteed to be unique because it does not include the names of its hierarchical parent objects like `fullName` does. For example, two discount items could both have the `name` "10% labor discount", but they could have unique `fullName` values, such as "Discounts:10% labor discount" and "Promotions:10% labor discount".\n\nMaximum length: 31 characters.',
      },
      parentId: {
        type: 'string',
        description:
          'The parent discount item one level above this one in the hierarchy. For example, if this discount item has a `fullName` of "Discounts:10% labor discount", its parent has a `fullName` of "Discounts". If this discount item is at the top level, this field will be `null`.',
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The default sales-tax code for this discount item, determining whether it is taxable or non-taxable. This can be overridden at the transaction-line level.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
      updateExistingTransactionsAccount: {
        type: 'boolean',
        description:
          'When `true`, applies the new account (specified by the `accountId` field) to all existing transactions associated with this discount item. This updates historical data and should be used with caution. The update will fail if any affected transaction falls within a closed accounting period. If this parameter is not specified, QuickBooks will prompt the user before making any changes.',
      },
    },
    required: ['id', 'revisionNumber', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.discountItems.update(id, body));
};

export default { metadata, tool, handler };
