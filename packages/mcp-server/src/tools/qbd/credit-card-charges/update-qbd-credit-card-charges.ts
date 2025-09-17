// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.credit_card_charges',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/credit-card-charges/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_credit_card_charges',
  description:
    'Updates an existing credit card charge so you can adjust the credit card account, payee, memo, transaction date, and expense or item lines. The total is recalculated from the line details.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the credit card charge to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the credit card charge object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      accountId: {
        type: 'string',
        description: 'The bank or credit card account to which money is owed for this credit card charge.',
      },
      clearExpenseLines: {
        type: 'boolean',
        description:
          'When `true`, removes all existing expense lines associated with this credit card charge. To modify or add individual expense lines, use the field `expenseLines` instead.',
      },
      clearItemLines: {
        type: 'boolean',
        description:
          'When `true`, removes all existing item lines associated with this credit card charge. To modify or add individual item lines, use the field `itemLines` instead.',
      },
      exchangeRate: {
        type: 'number',
        description:
          "The market exchange rate between this credit card charge's currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).",
      },
      expenseLines: {
        type: 'array',
        description:
          "The credit card charge's expense lines, each representing one line in this expense.\n\n**IMPORTANT**:\n\n1. Including this array in your update request will **REPLACE** all existing expense lines for the credit card charge with this array. To keep any existing expense lines, you must include them in this array even if they have not changed. **Any expense lines not included will be removed.**\n\n2. To add a new expense line, include it here with the `id` field set to `-1`.\n\n3. If you do not wish to modify any expense lines, omit this field entirely to keep them unchanged.",
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description:
                'The QuickBooks-assigned unique identifier of an existing expense line you wish to retain or update.\n\n**IMPORTANT**: Set this field to `-1` for new expense lines you wish to add.',
            },
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
          required: ['id'],
        },
      },
      itemGroupLines: {
        type: 'array',
        description:
          "The credit card charge's item group lines, each representing a predefined set of items bundled together because they are commonly purchased together or grouped for faster entry.\n\n**IMPORTANT**:\n\n1. Including this array in your update request will **REPLACE** all existing item group lines for the credit card charge with this array. To keep any existing item group lines, you must include them in this array even if they have not changed. **Any item group lines not included will be removed.**\n\n2. To add a new item group line, include it here with the `id` field set to `-1`.\n\n3. If you do not wish to modify any item group lines, omit this field entirely to keep them unchanged.",
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description:
                'The QuickBooks-assigned unique identifier of an existing item group line you wish to retain or update.\n\n**IMPORTANT**: Set this field to `-1` for new item group lines you wish to add.',
            },
            itemGroupId: {
              type: 'string',
              description:
                "The item group line's item group, representing a predefined set of items bundled because they are commonly purchased together or grouped for faster entry.",
            },
            itemLines: {
              type: 'array',
              description:
                "The item group line's item lines, each representing the purchase of a specific item or service.\n\n**IMPORTANT**:\n\n1. Including this array in your update request will **REPLACE** all existing item lines for the item group line with this array. To keep any existing item lines, you must include them in this array even if they have not changed. **Any item lines not included will be removed.**\n\n2. To add a new item line, include it here with the `id` field set to `-1`.\n\n3. If you do not wish to modify any item lines, omit this field entirely to keep them unchanged.",
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description:
                      'The QuickBooks-assigned unique identifier of an existing item line you wish to retain or update.\n\n**IMPORTANT**: Set this field to `-1` for new item lines you wish to add.',
                  },
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
                  overrideUnitOfMeasureSetId: {
                    type: 'string',
                    description:
                      'Specifies an alternative unit-of-measure set when updating this item line\'s `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select units from a different set than the item\'s default unit-of-measure set, which remains unchanged on the item itself. The override applies only to this specific line. For example, you can sell an item typically measured in volume units using weight units in a specific transaction by specifying a different unit-of-measure set with this field.',
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
                required: ['id'],
              },
            },
            overrideUnitOfMeasureSetId: {
              type: 'string',
              description:
                'Specifies an alternative unit-of-measure set when updating this item group line\'s `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select units from a different set than the item\'s default unit-of-measure set, which remains unchanged on the item itself. The override applies only to this specific line. For example, you can sell an item typically measured in volume units using weight units in a specific transaction by specifying a different unit-of-measure set with this field.',
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
          required: ['id'],
        },
      },
      itemLines: {
        type: 'array',
        description:
          "The credit card charge's item lines, each representing the purchase of a specific item or service.\n\n**IMPORTANT**:\n\n1. Including this array in your update request will **REPLACE** all existing item lines for the credit card charge with this array. To keep any existing item lines, you must include them in this array even if they have not changed. **Any item lines not included will be removed.**\n\n2. To add a new item line, include it here with the `id` field set to `-1`.\n\n3. If you do not wish to modify any item lines, omit this field entirely to keep them unchanged.",
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description:
                'The QuickBooks-assigned unique identifier of an existing item line you wish to retain or update.\n\n**IMPORTANT**: Set this field to `-1` for new item lines you wish to add.',
            },
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
            overrideUnitOfMeasureSetId: {
              type: 'string',
              description:
                'Specifies an alternative unit-of-measure set when updating this item line\'s `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select units from a different set than the item\'s default unit-of-measure set, which remains unchanged on the item itself. The override applies only to this specific line. For example, you can sell an item typically measured in volume units using weight units in a specific transaction by specifying a different unit-of-measure set with this field.',
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
          required: ['id'],
        },
      },
      memo: {
        type: 'string',
        description: 'A memo or note for this credit card charge.',
      },
      payeeId: {
        type: 'string',
        description:
          'The vendor or company from whom merchandise or services were purchased for this credit card charge.',
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this credit card charge, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user.',
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The sales-tax code for this credit card charge, determining whether it is taxable or non-taxable. If set, this overrides any sales-tax codes defined on the payee. This can be overridden on the credit card charge\'s individual lines.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this credit card charge, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
    },
    required: ['id', 'revisionNumber', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.creditCardCharges.update(id, body));
};

export default { metadata, tool, handler };
