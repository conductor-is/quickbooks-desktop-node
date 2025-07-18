// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.credit_card_credits',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/credit-card-credits',
};

export const tool: Tool = {
  name: 'create_qbd_credit_card_credits',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates a new credit card credit for the specified account.",
  inputSchema: {
    type: 'object',
    properties: {
      accountId: {
        type: 'string',
        description: 'The bank or credit card account to which this credit card credit is posted.',
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this credit card credit, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      exchangeRate: {
        type: 'number',
        description:
          "The market exchange rate between this credit card credit's currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).",
      },
      expenseLines: {
        type: 'array',
        description: "The credit card credit's expense lines, each representing one line in this expense.",
        items: {
          type: 'object',
          properties: {
            accountId: {
              type: 'string',
              description:
                'The expense account being debited (increased) for this expense line. The corresponding account being credited is usually a liability account (e.g., Accounts-Payable) or an asset account (e.g., Cash), depending on the transaction type.',
            },
            amount: {
              type: 'string',
              description: 'The monetary amount of this expense line, represented as a decimal string.',
            },
            billingStatus: {
              type: 'string',
              description: 'The billing status of this expense line.',
              enum: ['billable', 'has_been_billed', 'not_billable'],
            },
            classId: {
              type: 'string',
              description:
                "The expense line's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. If a class is specified for the entire parent transaction, it is automatically applied to all expense lines unless overridden here, at the transaction line level.",
            },
            customFields: {
              type: 'array',
              description:
                'The custom fields for the expense line object, added as user-defined data extensions, not included in the standard QuickBooks object.',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description:
                      'The name of the custom field, unique for the specified `ownerId`. For public custom fields, this name is visible as a label in the QuickBooks UI.',
                  },
                  ownerId: {
                    type: 'string',
                    description:
                      'The identifier of the owner of the custom field, which QuickBooks internally calls a "data extension". For public custom fields visible in the UI, such as those added by the QuickBooks user, this is always "0". For private custom fields that are only visible to the application that created them, this is a valid GUID identifying the owning application. Internally, Conductor always fetches all public custom fields (those with an `ownerId` of "0") for all objects.',
                  },
                  value: {
                    type: 'string',
                    description:
                      "The value of this custom field. The maximum length depends on the field's data type.",
                  },
                },
                required: ['name', 'ownerId', 'value'],
              },
            },
            memo: {
              type: 'string',
              description: 'A memo or note for this expense line.',
            },
            payeeId: {
              type: 'string',
              description:
                "If `account` refers to an Accounts-Payable (A/P) account, `payee` refers to the expense's vendor (not the customer). If `account` refers to any other type of account, `payee` refers to the expense's customer (not the vendor).",
            },
            salesRepresentativeId: {
              type: 'string',
              description:
                "The expense line's sales representative. Sales representatives can be employees, vendors, or other names in QuickBooks.",
            },
            salesTaxCodeId: {
              type: 'string',
              description:
                'The sales-tax code for this expense line, determining whether it is taxable or non-taxable. If set, this overrides any sales-tax codes defined on the parent transaction or the associated item.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
            },
          },
        },
      },
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
      },
      itemGroupLines: {
        type: 'array',
        description:
          "The credit card credit's item group lines, each representing a predefined set of items bundled together because they are commonly purchased together or grouped for faster entry.",
        items: {
          type: 'object',
          properties: {
            itemGroupId: {
              type: 'string',
              description:
                "The item group line's item group, representing a predefined set of items bundled because they are commonly purchased together or grouped for faster entry.",
            },
            customFields: {
              type: 'array',
              description:
                'The custom fields for the item group line object, added as user-defined data extensions, not included in the standard QuickBooks object.',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description:
                      'The name of the custom field, unique for the specified `ownerId`. For public custom fields, this name is visible as a label in the QuickBooks UI.',
                  },
                  ownerId: {
                    type: 'string',
                    description:
                      'The identifier of the owner of the custom field, which QuickBooks internally calls a "data extension". For public custom fields visible in the UI, such as those added by the QuickBooks user, this is always "0". For private custom fields that are only visible to the application that created them, this is a valid GUID identifying the owning application. Internally, Conductor always fetches all public custom fields (those with an `ownerId` of "0") for all objects.',
                  },
                  value: {
                    type: 'string',
                    description:
                      "The value of this custom field. The maximum length depends on the field's data type.",
                  },
                },
                required: ['name', 'ownerId', 'value'],
              },
            },
            inventorySiteId: {
              type: 'string',
              description:
                'The site location where inventory for the item group associated with this item group line is stored.',
            },
            inventorySiteLocationId: {
              type: 'string',
              description:
                'The specific location (e.g., bin or shelf) within the inventory site where the item group associated with this item group line is stored.',
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
          required: ['itemGroupId'],
        },
      },
      itemLines: {
        type: 'array',
        description:
          "The credit card credit's item lines, each representing the purchase of a specific item or service.",
        items: {
          type: 'object',
          properties: {
            amount: {
              type: 'string',
              description:
                'The monetary amount of this item line, represented as a decimal string. If both `quantity` and `cost` are specified but not `amount`, QuickBooks will use them to calculate `amount`. If `amount`, `cost`, and `quantity` are all unspecified, then QuickBooks will calculate `amount` based on a `quantity` of `1` and the suggested `cost`. This field cannot be cleared.',
            },
            billingStatus: {
              type: 'string',
              description: 'The billing status of this item line.',
              enum: ['billable', 'has_been_billed', 'not_billable'],
            },
            classId: {
              type: 'string',
              description:
                "The item line's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. If a class is specified for the entire parent transaction, it is automatically applied to all item lines unless overridden here, at the transaction line level.",
            },
            cost: {
              type: 'string',
              description:
                'The cost of this item line, represented as a decimal string. If both `quantity` and `amount` are specified but not `cost`, QuickBooks will use them to calculate `cost`.',
            },
            customerId: {
              type: 'string',
              description: 'The customer or customer-job associated with this item line.',
            },
            customFields: {
              type: 'array',
              description:
                'The custom fields for the item line object, added as user-defined data extensions, not included in the standard QuickBooks object.',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description:
                      'The name of the custom field, unique for the specified `ownerId`. For public custom fields, this name is visible as a label in the QuickBooks UI.',
                  },
                  ownerId: {
                    type: 'string',
                    description:
                      'The identifier of the owner of the custom field, which QuickBooks internally calls a "data extension". For public custom fields visible in the UI, such as those added by the QuickBooks user, this is always "0". For private custom fields that are only visible to the application that created them, this is a valid GUID identifying the owning application. Internally, Conductor always fetches all public custom fields (those with an `ownerId` of "0") for all objects.',
                  },
                  value: {
                    type: 'string',
                    description:
                      "The value of this custom field. The maximum length depends on the field's data type.",
                  },
                },
                required: ['name', 'ownerId', 'value'],
              },
            },
            description: {
              type: 'string',
              description: 'A description of this item line.',
            },
            expirationDate: {
              type: 'string',
              description:
                'The expiration date for the serial number or lot number of the item associated with this item line, in ISO 8601 format (YYYY-MM-DD). This is particularly relevant for perishable or time-sensitive inventory items. Note that this field is only supported on QuickBooks Desktop 2023 or later.',
              format: 'date',
            },
            inventorySiteId: {
              type: 'string',
              description:
                'The site location where inventory for the item associated with this item line is stored.',
            },
            inventorySiteLocationId: {
              type: 'string',
              description:
                'The specific location (e.g., bin or shelf) within the inventory site where the item associated with this item line is stored.',
            },
            itemId: {
              type: 'string',
              description:
                'The item associated with this item line. This can refer to any good or service that the business buys or sells, including item types such as a service item, inventory item, or special calculation item like a discount item or sales-tax item.',
            },
            linkToTransactionLine: {
              type: 'object',
              description:
                "An existing transaction line that you wish to link to this item line. Note that this only links to a single transaction line item, not an entire transaction. If you want to link an entire transaction and bring in all its lines, instead use the field `linkToTransactionIds` on the parent transaction, if available. If the parent transaction is a bill or an item receipt, you can only link to purchase orders; QuickBooks does not support linking these transactions to other transaction types.\n\nTransaction lines can only be linked when creating this item line and cannot be unlinked later.\n\n**IMPORTANT**: If you use `linkToTransactionLine` on this item line, you cannot use the field `item` on this line (QuickBooks will return an error) because this field brings in all of the item information you need. You can, however, specify whatever `quantity` or `rate` that you want, or any other transaction line element other than `item`.\n\nIf the parent transaction supports the `linkToTransactionIds` field, you can use both `linkToTransactionLine` (on this item line) and `linkToTransactionIds` (on its parent transaction) in the same request as long as they do NOT link to the same transaction (otherwise, QuickBooks will return an error). QuickBooks will also return an error if you attempt to link a transaction that is empty or already closed.\n\n**IMPORTANT**: By default, QuickBooks will not return any information about the linked transaction line in this endpoint's response even when this request is successful. To see the transaction line linked via this field, refetch the parent transaction and check the `linkedTransactions` response field. If fetching a list of transactions, you must also specify the parameter `includeLinkedTransactions=true` to see the `linkedTransactions` response field.",
              properties: {
                transactionId: {
                  type: 'string',
                  description: 'The ID of the transaction to which to link this transaction.',
                },
                transactionLineId: {
                  type: 'string',
                  description: 'The ID of the transaction line to which to link this transaction.',
                },
              },
              required: ['transactionId', 'transactionLineId'],
            },
            lotNumber: {
              type: 'string',
              description:
                'The lot number of the item associated with this item line. Used for tracking groups of inventory items that are purchased or manufactured together.',
            },
            overrideItemAccountId: {
              type: 'string',
              description:
                'The account to use for this item line, overriding the default account associated with the item.',
            },
            quantity: {
              type: 'number',
              description:
                'The quantity of the item associated with this item line. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item is a discount item.',
            },
            salesRepresentativeId: {
              type: 'string',
              description:
                "The item line's sales representative. Sales representatives can be employees, vendors, or other names in QuickBooks.",
            },
            salesTaxCodeId: {
              type: 'string',
              description:
                'The sales-tax code for this item line, determining whether it is taxable or non-taxable. If set, this overrides any sales-tax codes defined on the parent transaction or the associated item.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
            },
            serialNumber: {
              type: 'string',
              description:
                'The serial number of the item associated with this item line. This is used for tracking individual units of serialized inventory items.',
            },
            unitOfMeasure: {
              type: 'string',
              description:
                "The unit-of-measure used for the `quantity` in this item line. Must be a valid unit within the item's available units of measure.",
            },
          },
        },
      },
      memo: {
        type: 'string',
        description: 'A memo or note for this credit card credit.',
      },
      payeeId: {
        type: 'string',
        description:
          'The vendor or company from whom this credit card credit was received for purchased merchandise or services.',
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this credit card credit, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user. When left blank in this create request, this field will be left blank in QuickBooks (i.e., it does *not* auto-increment).',
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The sales-tax code for this credit card credit, determining whether it is taxable or non-taxable. If set, this overrides any sales-tax codes defined on the payee. This can be overridden on the credit card credit\'s individual lines.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
    },
    required: ['accountId', 'transactionDate', 'conductorEndUserId'],
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.qbd.creditCardCredits.create(body));
};

export default { metadata, tool, handler };
