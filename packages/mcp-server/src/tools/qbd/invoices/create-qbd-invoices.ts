// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.invoices',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/invoices',
};

export const tool: Tool = {
  name: 'create_qbd_invoices',
  description:
    'Creates an invoice to bill a customer when goods or services were delivered before payment. Use a sales receipt instead if the sale was paid in full.',
  inputSchema: {
    type: 'object',
    properties: {
      customerId: {
        type: 'string',
        description: 'The customer or customer-job associated with this invoice.',
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this invoice, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      applyCredits: {
        type: 'array',
        description:
          "Credit memos to apply to this invoice, reducing its balance. This creates a link between this invoice and the specified credit memos.\n\n**IMPORTANT**: By default, QuickBooks will not return any information about the linked transactions in this endpoint's response even when this request is successful. To see the transactions linked via this field, refetch the invoice and check the `linkedTransactions` response field. If fetching a list of invoices, you must also specify the parameter `includeLinkedTransactions=true` to see the `linkedTransactions` response field.",
        items: {
          type: 'object',
          properties: {
            appliedAmount: {
              type: 'string',
              description:
                'The amount of credit applied to this transaction. This could include customer deposits, payments, or credits. Represented as a decimal string.',
            },
            creditTransactionId: {
              type: 'string',
              description:
                'The unique identifier of the credit transaction (credit memo or vendor credit) to apply to this transaction.',
            },
            overrideCreditApplication: {
              type: 'boolean',
              description: 'Indicates whether to override the credit.',
            },
          },
          required: ['appliedAmount', 'creditTransactionId'],
        },
      },
      billingAddress: {
        type: 'object',
        description: "The invoice's billing address.",
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
          "The invoice's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. A class defined here is automatically used in this invoice's line items unless overridden at the line item level.",
      },
      customerMessageId: {
        type: 'string',
        description: 'The message to display to the customer on the invoice.',
      },
      documentTemplateId: {
        type: 'string',
        description:
          'The predefined template in QuickBooks that determines the layout and formatting for this invoice when printed or displayed.',
      },
      dueDate: {
        type: 'string',
        description:
          'The date by which this invoice must be paid, in ISO 8601 format (YYYY-MM-DD).\n\n**NOTE**: If `dueDate` is excluded when creating this invoice, QuickBooks might determine the due date according to the terms set for this customer.',
        format: 'date',
      },
      exchangeRate: {
        type: 'number',
        description:
          "The market exchange rate between this invoice's currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).",
      },
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
      },
      isFinanceCharge: {
        type: 'boolean',
        description:
          'Whether this invoice includes a finance charge. This field is immutable and can only be set during invoice creation.',
      },
      isPending: {
        type: 'boolean',
        description: 'Indicates whether this invoice has not been completed or is in a draft version.',
      },
      isQueuedForEmail: {
        type: 'boolean',
        description:
          'Indicates whether this invoice is included in the queue of documents for QuickBooks to email to the customer.',
      },
      isQueuedForPrint: {
        type: 'boolean',
        description:
          'Indicates whether this invoice is included in the queue of documents for QuickBooks to print.',
      },
      lineGroups: {
        type: 'array',
        description: "The invoice's line item groups, each representing a predefined set of related items.",
        items: {
          type: 'object',
          properties: {
            itemGroupId: {
              type: 'string',
              description:
                "The invoice line group's item group, representing a predefined set of items bundled because they are commonly purchased together or grouped for faster entry.",
            },
            customFields: {
              type: 'array',
              description:
                'The custom fields for the invoice line group object, added as user-defined data extensions, not included in the standard QuickBooks object.',
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
                'The site location where inventory for the item group associated with this invoice line group is stored.',
            },
            inventorySiteLocationId: {
              type: 'string',
              description:
                'The specific location (e.g., bin or shelf) within the inventory site where the item group associated with this invoice line group is stored.',
            },
            quantity: {
              type: 'number',
              description:
                'The quantity of the item group associated with this invoice line group. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item group is a discount item group.',
            },
            unitOfMeasure: {
              type: 'string',
              description:
                "The unit-of-measure used for the `quantity` in this invoice line group. Must be a valid unit within the item's available units of measure.",
            },
          },
          required: ['itemGroupId'],
        },
      },
      lines: {
        type: 'array',
        description: "The invoice's line items, each representing a single product or service sold.",
        items: {
          type: 'object',
          properties: {
            amount: {
              type: 'string',
              description:
                'The monetary amount of this invoice line, represented as a decimal string. If both `quantity` and `rate` are specified but not `amount`, QuickBooks will use them to calculate `amount`. If `amount`, `rate`, and `quantity` are all unspecified, then QuickBooks will calculate `amount` based on a `quantity` of `1` and the suggested `rate`. This field cannot be cleared.',
            },
            classId: {
              type: 'string',
              description:
                "The invoice line's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. If a class is specified for the entire parent transaction, it is automatically applied to all invoice lines unless overridden here, at the transaction line level.",
            },
            customFields: {
              type: 'array',
              description:
                'The custom fields for the invoice line object, added as user-defined data extensions, not included in the standard QuickBooks object.',
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
              description: 'A description of this invoice line.',
            },
            inventorySiteId: {
              type: 'string',
              description:
                'The site location where inventory for the item associated with this invoice line is stored.',
            },
            inventorySiteLocationId: {
              type: 'string',
              description:
                'The specific location (e.g., bin or shelf) within the inventory site where the item associated with this invoice line is stored.',
            },
            itemId: {
              type: 'string',
              description:
                'The item associated with this invoice line. This can refer to any good or service that the business buys or sells, including item types such as a service item, inventory item, or special calculation item like a discount item or sales-tax item.',
            },
            linkToTransactionLine: {
              type: 'object',
              description:
                "An existing transaction line that you wish to link to this invoice line. Note that this only links to a single transaction line item, not an entire transaction. If you want to link an entire transaction and bring in all its lines, instead use the field `linkToTransactionIds` on the parent transaction, if available. For invoice lines, you can only link to sales orders; QuickBooks does not support linking invoice lines to other transaction types.\n\nTransaction lines can only be linked when creating this invoice line and cannot be unlinked later.\n\n**IMPORTANT**: If you use `linkToTransactionLine` on this invoice line, you cannot use the field `item` on this line (QuickBooks will return an error) because this field brings in all of the item information you need. You can, however, specify whatever `quantity` or `rate` that you want, or any other transaction line element other than `item`.\n\nIf the parent transaction supports the `linkToTransactionIds` field, you can use both `linkToTransactionLine` (on this invoice line) and `linkToTransactionIds` (on its parent transaction) in the same request as long as they do NOT link to the same transaction (otherwise, QuickBooks will return an error). QuickBooks will also return an error if you attempt to link a transaction that is empty or already closed.\n\n**IMPORTANT**: By default, QuickBooks will not return any information about the linked transaction line in this endpoint's response even when this request is successful. To see the transaction line linked via this field, refetch the parent invoice and check the `linkedTransactions` response field. If fetching a list of invoices, you must also specify the parameter `includeLinkedTransactions=true` to see the `linkedTransactions` response field.",
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
                'The lot number of the item associated with this invoice line. Used for tracking groups of inventory items that are purchased or manufactured together.',
            },
            otherCustomField1: {
              type: 'string',
              description:
                "A built-in custom field for additional information specific to this invoice line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all invoice lines for convenience. Developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
            },
            otherCustomField2: {
              type: 'string',
              description:
                "A second built-in custom field for additional information specific to this invoice line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all invoice lines for convenience. Like `otherCustomField1`, developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
            },
            overrideItemAccountId: {
              type: 'string',
              description:
                'The account to use for this invoice line, overriding the default account associated with the item.',
            },
            priceLevelId: {
              type: 'string',
              description:
                'The price level applied to this invoice line. This overrides any price level set on the corresponding customer. The resulting invoice line will not show this price level, only the final `rate` calculated from it.',
            },
            priceRuleConflictStrategy: {
              type: 'string',
              description:
                'Specifies how to resolve price rule conflicts when adding or modifying this invoice line.',
              enum: ['base_price', 'zero'],
            },
            quantity: {
              type: 'number',
              description:
                'The quantity of the item associated with this invoice line. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item is a discount item.',
            },
            rate: {
              type: 'string',
              description:
                'The price per unit for this invoice line. If both `rate` and `amount` are specified, `rate` will be ignored. If both `quantity` and `amount` are specified but not `rate`, QuickBooks will use them to calculate `rate`. Represented as a decimal string. This field cannot be cleared.',
            },
            ratePercent: {
              type: 'string',
              description:
                'The price of this invoice line expressed as a percentage. Typically used for discount or markup items.',
            },
            salesTaxCodeId: {
              type: 'string',
              description:
                'The sales-tax code for this invoice line, determining whether it is taxable or non-taxable. If set, this overrides any sales-tax codes defined on the parent transaction or the associated item.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
            },
            serialNumber: {
              type: 'string',
              description:
                'The serial number of the item associated with this invoice line. This is used for tracking individual units of serialized inventory items.',
            },
            serviceDate: {
              type: 'string',
              description:
                'The date on which the service for this invoice line was or will be performed, in ISO 8601 format (YYYY-MM-DD). This is particularly relevant for service items.',
              format: 'date',
            },
            unitOfMeasure: {
              type: 'string',
              description:
                "The unit-of-measure used for the `quantity` in this invoice line. Must be a valid unit within the item's available units of measure.",
            },
          },
        },
      },
      linkToTransactionIds: {
        type: 'array',
        description:
          "IDs of existing transactions that you wish to link to this invoice, such as payments applied, credits used, or associated purchase orders. Note that this links entire transactions, not individual transaction lines. If you want to link individual lines in a transaction, instead use the field `linkToTransactionLine` on this invoice's lines, if available.\n\nTransactions can only be linked when creating this invoice and cannot be unlinked later.\n\nYou can use both `linkToTransactionIds` (on this invoice) and `linkToTransactionLine` (on its transaction lines) as long as they do NOT link to the same transaction (otherwise, QuickBooks will return an error). QuickBooks will also return an error if you attempt to link a transaction that is empty or already closed.\n\n**IMPORTANT**: By default, QuickBooks will not return any information about the linked transactions in this endpoint's response even when this request is successful. To see the transactions linked via this field, refetch the invoice and check the `linkedTransactions` response field. If fetching a list of invoices, you must also specify the parameter `includeLinkedTransactions=true` to see the `linkedTransactions` response field.",
        items: {
          type: 'string',
        },
      },
      memo: {
        type: 'string',
        description:
          'A memo or note for this invoice that appears in reports, but not on the invoice. Use `customerMessage` to add a note to this invoice.',
      },
      otherCustomField: {
        type: 'string',
        description:
          "A built-in custom field for additional information specific to this invoice. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all invoices for convenience. Developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Unlike `otherCustomField1` and `otherCustomField2`, which are line item fields, this exists at the transaction level. Hidden by default in the QuickBooks UI.",
      },
      purchaseOrderNumber: {
        type: 'string',
        description:
          "The customer's Purchase Order (PO) number associated with this invoice. This field is often used to cross-reference the invoice with the customer's purchasing system.",
      },
      receivablesAccountId: {
        type: 'string',
        description:
          'The Accounts-Receivable (A/R) account to which this invoice is assigned, used to track the amount owed. If not specified, QuickBooks Desktop will use its default A/R account.\n\n**IMPORTANT**: If this invoice is linked to other transactions, this A/R account must match the `receivablesAccount` used in all linked transactions.',
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this invoice, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user. When left blank in this create request, this field will be left blank in QuickBooks (i.e., it does *not* auto-increment).',
      },
      salesRepresentativeId: {
        type: 'string',
        description:
          "The invoice's sales representative. Sales representatives can be employees, vendors, or other names in QuickBooks.",
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The sales-tax code for this invoice, determining whether it is taxable or non-taxable. This can be overridden at the transaction-line level.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
      salesTaxItemId: {
        type: 'string',
        description:
          'The sales-tax item used to calculate the actual tax amount for this invoice\'s transactions by applying a specific tax rate collected for a single tax agency. Unlike `salesTaxCode`, which only indicates general taxability, this field drives the actual tax calculation and reporting.\n\nFor invoices, while using this field to specify a single tax item/group that applies uniformly is recommended, complex tax scenarios may require alternative approaches. In such cases, you can set this field to a 0% tax item (conventionally named "Tax Calculated On Invoice") and handle tax calculations through line items instead. When using line items for taxes, note that only individual tax items (not tax groups) can be used, subtotals can help apply a tax to multiple items but only the first tax line after a subtotal is calculated automatically (subsequent tax lines require manual amounts), and the rate column will always display the actual tax amount rather than the rate percentage.',
      },
      shipmentOrigin: {
        type: 'string',
        description:
          'The origin location from where the product associated with this invoice is shipped. This is the point at which ownership and liability for goods transfer from seller to buyer. Internally, QuickBooks uses the term "FOB" for this field, which stands for "freight on board". This field is informational and has no accounting implications.',
      },
      shippingAddress: {
        type: 'object',
        description: "The invoice's shipping address.",
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
          'The date when the products or services for this invoice were shipped or are expected to be shipped, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      shippingMethodId: {
        type: 'string',
        description:
          'The shipping method used for this invoice, such as standard mail or overnight delivery.',
      },
      termsId: {
        type: 'string',
        description:
          "The invoice's payment terms, defining when payment is due and any applicable discounts.",
      },
    },
    required: ['customerId', 'transactionDate', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.qbd.invoices.create(body));
};

export default { metadata, tool, handler };
