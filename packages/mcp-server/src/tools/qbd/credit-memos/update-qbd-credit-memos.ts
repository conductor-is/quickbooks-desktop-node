// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.credit_memos',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/credit-memos/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_credit_memos',
  description: 'Updates an existing credit memo.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the credit memo to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the credit memo object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      billingAddress: {
        type: 'object',
        description: "The credit memo's billing address.",
        properties: {
          city: {
            type: 'string',
            description:
              'The city, district, suburb, town, or village name of the address.\n\nMaximum length: 31 characters.',
          },
          country: {
            type: 'string',
            description: 'The country name of the address.',
          },
          line1: {
            type: 'string',
            description:
              'The first line of the address (e.g., street, PO Box, or company name).\n\nMaximum length: 41 characters.',
          },
          line2: {
            type: 'string',
            description:
              'The second line of the address, if needed (e.g., apartment, suite, unit, or building).\n\nMaximum length: 41 characters.',
          },
          line3: {
            type: 'string',
            description: 'The third line of the address, if needed.\n\nMaximum length: 41 characters.',
          },
          line4: {
            type: 'string',
            description: 'The fourth line of the address, if needed.\n\nMaximum length: 41 characters.',
          },
          line5: {
            type: 'string',
            description: 'The fifth line of the address, if needed.\n\nMaximum length: 41 characters.',
          },
          note: {
            type: 'string',
            description:
              'A note written at the bottom of the address in the form in which it appears, such as the invoice form.',
          },
          postalCode: {
            type: 'string',
            description: 'The postal code or ZIP code of the address.\n\nMaximum length: 13 characters.',
          },
          state: {
            type: 'string',
            description:
              'The state, county, province, or region name of the address.\n\nMaximum length: 21 characters.',
          },
        },
      },
      classId: {
        type: 'string',
        description:
          "The credit memo's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. A class defined here is automatically used in this credit memo's line items unless overridden at the line item level.",
      },
      customerId: {
        type: 'string',
        description: 'The customer or customer-job associated with this credit memo.',
      },
      customerMessageId: {
        type: 'string',
        description: 'The message to display to the customer on the credit memo.',
      },
      documentTemplateId: {
        type: 'string',
        description:
          'The predefined template in QuickBooks that determines the layout and formatting for this credit memo when printed or displayed.',
      },
      dueDate: {
        type: 'string',
        description: 'The date by which this credit memo must be paid, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      exchangeRate: {
        type: 'number',
        description:
          "The market exchange rate between this credit memo's currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).",
      },
      isPending: {
        type: 'boolean',
        description: 'Indicates whether this credit memo has not been completed.',
      },
      isQueuedForEmail: {
        type: 'boolean',
        description:
          'Indicates whether this credit memo is included in the queue of documents for QuickBooks to email to the customer.',
      },
      isQueuedForPrint: {
        type: 'boolean',
        description:
          'Indicates whether this credit memo is included in the queue of documents for QuickBooks to print.',
      },
      lineGroups: {
        type: 'array',
        description:
          "The credit memo's line item groups, each representing a predefined set of related items.\n\n**IMPORTANT**:\n\n1. Including this array in your update request will **REPLACE** all existing line item groups for the credit memo with this array. To keep any existing line item groups, you must include them in this array even if they have not changed. **Any line item groups not included will be removed.**\n\n2. To add a new line item group, include it here with the `id` field set to `-1`.\n\n3. If you do not wish to modify any line item groups, omit this field entirely to keep them unchanged.",
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description:
                'The QuickBooks-assigned unique identifier of an existing credit memo line group you wish to retain or update.\n\n**IMPORTANT**: Set this field to `-1` for new credit memo line groups you wish to add.',
            },
            itemGroupId: {
              type: 'string',
              description:
                "The credit memo line group's item group, representing a predefined set of items bundled because they are commonly purchased together or grouped for faster entry.",
            },
            lines: {
              type: 'array',
              description:
                "The credit memo line group's line items, each representing a single product or service sold.\n\n**IMPORTANT**:\n\n1. Including this array in your update request will **REPLACE** all existing line items for the credit memo line group with this array. To keep any existing line items, you must include them in this array even if they have not changed. **Any line items not included will be removed.**\n\n2. To add a new line item, include it here with the `id` field set to `-1`.\n\n3. If you do not wish to modify any line items, omit this field entirely to keep them unchanged.",
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description:
                      'The QuickBooks-assigned unique identifier of an existing credit memo line you wish to retain or update.\n\n**IMPORTANT**: Set this field to `-1` for new credit memo lines you wish to add.',
                  },
                  amount: {
                    type: 'string',
                    description:
                      'The monetary amount of this credit memo line, represented as a decimal string. If both `quantity` and `rate` are specified but not `amount`, QuickBooks will use them to calculate `amount`. If `amount`, `rate`, and `quantity` are all unspecified, then QuickBooks will calculate `amount` based on a `quantity` of `1` and the suggested `rate`. This field cannot be cleared.',
                  },
                  classId: {
                    type: 'string',
                    description:
                      "The credit memo line's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. If a class is specified for the entire parent transaction, it is automatically applied to all credit memo lines unless overridden here, at the transaction line level.",
                  },
                  description: {
                    type: 'string',
                    description: 'A description of this credit memo line.',
                  },
                  inventorySiteId: {
                    type: 'string',
                    description:
                      'The site location where inventory for the item associated with this credit memo line is stored.',
                  },
                  inventorySiteLocationId: {
                    type: 'string',
                    description:
                      'The specific location (e.g., bin or shelf) within the inventory site where the item associated with this credit memo line is stored.',
                  },
                  itemId: {
                    type: 'string',
                    description:
                      'The item associated with this credit memo line. This can refer to any good or service that the business buys or sells, including item types such as a service item, inventory item, or special calculation item like a discount item or sales-tax item.',
                  },
                  lotNumber: {
                    type: 'string',
                    description:
                      'The lot number of the item associated with this credit memo line. Used for tracking groups of inventory items that are purchased or manufactured together.',
                  },
                  otherCustomField1: {
                    type: 'string',
                    description:
                      "A built-in custom field for additional information specific to this credit memo line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all credit memo lines for convenience. Developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
                  },
                  otherCustomField2: {
                    type: 'string',
                    description:
                      "A second built-in custom field for additional information specific to this credit memo line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all credit memo lines for convenience. Like `otherCustomField1`, developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
                  },
                  overrideItemAccountId: {
                    type: 'string',
                    description:
                      'The account to use for this credit memo line, overriding the default account associated with the item.',
                  },
                  overrideUnitOfMeasureSetId: {
                    type: 'string',
                    description:
                      'Specifies an alternative unit-of-measure set when updating this credit memo line\'s `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select units from a different set than the item\'s default unit-of-measure set, which remains unchanged on the item itself. The override applies only to this specific line. For example, you can sell an item typically measured in volume units using weight units in a specific transaction by specifying a different unit-of-measure set with this field.',
                  },
                  priceLevelId: {
                    type: 'string',
                    description:
                      'The price level applied to this credit memo line. This overrides any price level set on the corresponding customer. The resulting credit memo line will not show this price level, only the final `rate` calculated from it.',
                  },
                  quantity: {
                    type: 'number',
                    description:
                      'The quantity of the item associated with this credit memo line. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item is a discount item.',
                  },
                  rate: {
                    type: 'string',
                    description:
                      'The price per unit for this credit memo line. If both `rate` and `amount` are specified, `rate` will be ignored. If both `quantity` and `amount` are specified but not `rate`, QuickBooks will use them to calculate `rate`. Represented as a decimal string. This field cannot be cleared.',
                  },
                  ratePercent: {
                    type: 'string',
                    description:
                      'The price of this credit memo line expressed as a percentage. Typically used for discount or markup items.',
                  },
                  salesTaxCodeId: {
                    type: 'string',
                    description:
                      'The sales-tax code for this credit memo line, determining whether it is taxable or non-taxable. If set, this overrides any sales-tax codes defined on the parent transaction or the associated item.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
                  },
                  serialNumber: {
                    type: 'string',
                    description:
                      'The serial number of the item associated with this credit memo line. This is used for tracking individual units of serialized inventory items.',
                  },
                  serviceDate: {
                    type: 'string',
                    description:
                      'The date on which the service for this credit memo line was or will be performed, in ISO 8601 format (YYYY-MM-DD). This is particularly relevant for service items.',
                    format: 'date',
                  },
                  unitOfMeasure: {
                    type: 'string',
                    description:
                      "The unit-of-measure used for the `quantity` in this credit memo line. Must be a valid unit within the item's available units of measure.",
                  },
                },
                required: ['id'],
              },
            },
            overrideUnitOfMeasureSetId: {
              type: 'string',
              description:
                'Specifies an alternative unit-of-measure set when updating this credit memo line group\'s `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select units from a different set than the item\'s default unit-of-measure set, which remains unchanged on the item itself. The override applies only to this specific line. For example, you can sell an item typically measured in volume units using weight units in a specific transaction by specifying a different unit-of-measure set with this field.',
            },
            quantity: {
              type: 'number',
              description:
                'The quantity of the item group associated with this credit memo line group. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item group is a discount item group.',
            },
            unitOfMeasure: {
              type: 'string',
              description:
                "The unit-of-measure used for the `quantity` in this credit memo line group. Must be a valid unit within the item's available units of measure.",
            },
          },
          required: ['id'],
        },
      },
      lines: {
        type: 'array',
        description:
          "The credit memo's line items, each representing a single product or service sold.\n\n**IMPORTANT**:\n\n1. Including this array in your update request will **REPLACE** all existing line items for the credit memo with this array. To keep any existing line items, you must include them in this array even if they have not changed. **Any line items not included will be removed.**\n\n2. To add a new line item, include it here with the `id` field set to `-1`.\n\n3. If you do not wish to modify any line items, omit this field entirely to keep them unchanged.",
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description:
                'The QuickBooks-assigned unique identifier of an existing credit memo line you wish to retain or update.\n\n**IMPORTANT**: Set this field to `-1` for new credit memo lines you wish to add.',
            },
            amount: {
              type: 'string',
              description:
                'The monetary amount of this credit memo line, represented as a decimal string. If both `quantity` and `rate` are specified but not `amount`, QuickBooks will use them to calculate `amount`. If `amount`, `rate`, and `quantity` are all unspecified, then QuickBooks will calculate `amount` based on a `quantity` of `1` and the suggested `rate`. This field cannot be cleared.',
            },
            classId: {
              type: 'string',
              description:
                "The credit memo line's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. If a class is specified for the entire parent transaction, it is automatically applied to all credit memo lines unless overridden here, at the transaction line level.",
            },
            description: {
              type: 'string',
              description: 'A description of this credit memo line.',
            },
            inventorySiteId: {
              type: 'string',
              description:
                'The site location where inventory for the item associated with this credit memo line is stored.',
            },
            inventorySiteLocationId: {
              type: 'string',
              description:
                'The specific location (e.g., bin or shelf) within the inventory site where the item associated with this credit memo line is stored.',
            },
            itemId: {
              type: 'string',
              description:
                'The item associated with this credit memo line. This can refer to any good or service that the business buys or sells, including item types such as a service item, inventory item, or special calculation item like a discount item or sales-tax item.',
            },
            lotNumber: {
              type: 'string',
              description:
                'The lot number of the item associated with this credit memo line. Used for tracking groups of inventory items that are purchased or manufactured together.',
            },
            otherCustomField1: {
              type: 'string',
              description:
                "A built-in custom field for additional information specific to this credit memo line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all credit memo lines for convenience. Developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
            },
            otherCustomField2: {
              type: 'string',
              description:
                "A second built-in custom field for additional information specific to this credit memo line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all credit memo lines for convenience. Like `otherCustomField1`, developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
            },
            overrideItemAccountId: {
              type: 'string',
              description:
                'The account to use for this credit memo line, overriding the default account associated with the item.',
            },
            overrideUnitOfMeasureSetId: {
              type: 'string',
              description:
                'Specifies an alternative unit-of-measure set when updating this credit memo line\'s `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select units from a different set than the item\'s default unit-of-measure set, which remains unchanged on the item itself. The override applies only to this specific line. For example, you can sell an item typically measured in volume units using weight units in a specific transaction by specifying a different unit-of-measure set with this field.',
            },
            priceLevelId: {
              type: 'string',
              description:
                'The price level applied to this credit memo line. This overrides any price level set on the corresponding customer. The resulting credit memo line will not show this price level, only the final `rate` calculated from it.',
            },
            quantity: {
              type: 'number',
              description:
                'The quantity of the item associated with this credit memo line. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item is a discount item.',
            },
            rate: {
              type: 'string',
              description:
                'The price per unit for this credit memo line. If both `rate` and `amount` are specified, `rate` will be ignored. If both `quantity` and `amount` are specified but not `rate`, QuickBooks will use them to calculate `rate`. Represented as a decimal string. This field cannot be cleared.',
            },
            ratePercent: {
              type: 'string',
              description:
                'The price of this credit memo line expressed as a percentage. Typically used for discount or markup items.',
            },
            salesTaxCodeId: {
              type: 'string',
              description:
                'The sales-tax code for this credit memo line, determining whether it is taxable or non-taxable. If set, this overrides any sales-tax codes defined on the parent transaction or the associated item.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
            },
            serialNumber: {
              type: 'string',
              description:
                'The serial number of the item associated with this credit memo line. This is used for tracking individual units of serialized inventory items.',
            },
            serviceDate: {
              type: 'string',
              description:
                'The date on which the service for this credit memo line was or will be performed, in ISO 8601 format (YYYY-MM-DD). This is particularly relevant for service items.',
              format: 'date',
            },
            unitOfMeasure: {
              type: 'string',
              description:
                "The unit-of-measure used for the `quantity` in this credit memo line. Must be a valid unit within the item's available units of measure.",
            },
          },
          required: ['id'],
        },
      },
      memo: {
        type: 'string',
        description:
          'A memo or note for this credit memo that appears in the account register and customer register, but not on the credit memo itself.',
      },
      otherCustomField: {
        type: 'string',
        description:
          "A built-in custom field for additional information specific to this credit memo. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all credit memos for convenience. Developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Unlike `otherCustomField1` and `otherCustomField2`, which are line item fields, this exists at the transaction level. Hidden by default in the QuickBooks UI.",
      },
      purchaseOrderNumber: {
        type: 'string',
        description:
          "The customer's Purchase Order (PO) number associated with this credit memo. This field is often used to cross-reference the credit memo with the customer's purchasing system.",
      },
      receivablesAccountId: {
        type: 'string',
        description:
          'The Accounts-Receivable (A/R) account to which this credit memo is assigned, used to track the amount owed. If not specified, QuickBooks Desktop will use its default A/R account.\n\n**IMPORTANT**: If this credit memo is linked to other transactions, this A/R account must match the `receivablesAccount` used in all linked transactions.',
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this credit memo, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user.',
      },
      salesRepresentativeId: {
        type: 'string',
        description:
          "The credit memo's sales representative. Sales representatives can be employees, vendors, or other names in QuickBooks.",
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The sales-tax code for this credit memo, determining whether it is taxable or non-taxable. This can be overridden at the transaction-line level.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
      salesTaxItemId: {
        type: 'string',
        description:
          "The sales-tax item used to calculate the actual tax amount for this credit memo's transactions by applying a specific tax rate collected for a single tax agency. Unlike `salesTaxCode`, which only indicates general taxability, this field drives the actual tax calculation and reporting.",
      },
      shipmentOrigin: {
        type: 'string',
        description:
          'The origin location from where the product associated with this credit memo is shipped. This is the point at which ownership and liability for goods transfer from seller to buyer. Internally, QuickBooks uses the term "FOB" for this field, which stands for "freight on board". This field is informational and has no accounting implications.',
      },
      shippingAddress: {
        type: 'object',
        description: "The credit memo's shipping address.",
        properties: {
          city: {
            type: 'string',
            description:
              'The city, district, suburb, town, or village name of the address.\n\nMaximum length: 31 characters.',
          },
          country: {
            type: 'string',
            description: 'The country name of the address.',
          },
          line1: {
            type: 'string',
            description:
              'The first line of the address (e.g., street, PO Box, or company name).\n\nMaximum length: 41 characters.',
          },
          line2: {
            type: 'string',
            description:
              'The second line of the address, if needed (e.g., apartment, suite, unit, or building).\n\nMaximum length: 41 characters.',
          },
          line3: {
            type: 'string',
            description: 'The third line of the address, if needed.\n\nMaximum length: 41 characters.',
          },
          line4: {
            type: 'string',
            description: 'The fourth line of the address, if needed.\n\nMaximum length: 41 characters.',
          },
          line5: {
            type: 'string',
            description: 'The fifth line of the address, if needed.\n\nMaximum length: 41 characters.',
          },
          note: {
            type: 'string',
            description:
              'A note written at the bottom of the address in the form in which it appears, such as the invoice form.',
          },
          postalCode: {
            type: 'string',
            description: 'The postal code or ZIP code of the address.\n\nMaximum length: 13 characters.',
          },
          state: {
            type: 'string',
            description:
              'The state, county, province, or region name of the address.\n\nMaximum length: 21 characters.',
          },
        },
      },
      shippingDate: {
        type: 'string',
        description:
          'The date when the products or services for this credit memo were shipped or are expected to be shipped, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      shippingMethodId: {
        type: 'string',
        description:
          'The shipping method used for this credit memo, such as standard mail or overnight delivery.',
      },
      termsId: {
        type: 'string',
        description:
          "The credit memo's payment terms, defining when payment is due and any applicable discounts.",
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this credit memo, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
    },
    required: ['id', 'revisionNumber', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.creditMemos.update(id, body));
};

export default { metadata, tool, handler };
