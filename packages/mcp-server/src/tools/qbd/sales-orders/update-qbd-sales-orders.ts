// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.sales_orders',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/sales-orders/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_sales_orders',
  description: 'Updates an existing sales order.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the sales order to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the sales order object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      billingAddress: {
        type: 'object',
        description: "The sales order's billing address.",
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
        required: [],
      },
      classId: {
        type: 'string',
        description:
          "The sales order's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. A class defined here is automatically used in this sales order's line items unless overridden at the line item level.",
      },
      customerId: {
        type: 'string',
        description: 'The customer or customer-job associated with this sales order.',
      },
      customerMessageId: {
        type: 'string',
        description: 'The message to display to the customer on the sales order.',
      },
      documentTemplateId: {
        type: 'string',
        description:
          'The predefined template in QuickBooks that determines the layout and formatting for this sales order when printed or displayed.',
      },
      dueDate: {
        type: 'string',
        description: 'The date by which this sales order must be paid, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      exchangeRate: {
        type: 'number',
        description:
          "The market exchange rate between this sales order's currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).",
      },
      isManuallyClosed: {
        type: 'boolean',
        description:
          'Indicates whether this sales order has been manually marked as closed, even if it has not been invoiced.',
      },
      isQueuedForEmail: {
        type: 'boolean',
        description:
          'Indicates whether this sales order is included in the queue of documents for QuickBooks to email to the customer.',
      },
      isQueuedForPrint: {
        type: 'boolean',
        description:
          'Indicates whether this sales order is included in the queue of documents for QuickBooks to print.',
      },
      lineGroups: {
        type: 'array',
        description:
          "The sales order's line item groups, each representing a predefined set of related items.\n\n**IMPORTANT**:\n\n1. Including this array in your update request will **REPLACE** all existing line item groups for the sales order with this array. To keep any existing line item groups, you must include them in this array even if they have not changed. **Any line item groups not included will be removed.**\n\n2. To add a new line item group, include it here with the `id` field set to `-1`.\n\n3. If you do not wish to modify any line item groups, omit this field entirely to keep them unchanged.",
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description:
                'The QuickBooks-assigned unique identifier of an existing sales order line group you wish to retain or update.\n\n**IMPORTANT**: Set this field to `-1` for new sales order line groups you wish to add.',
            },
            itemGroupId: {
              type: 'string',
              description:
                "The sales order line group's item group, representing a predefined set of items bundled because they are commonly purchased together or grouped for faster entry.",
            },
            lines: {
              type: 'array',
              description:
                "The sales order line group's line items, each representing a single product or service ordered.\n\n**IMPORTANT**:\n\n1. Including this array in your update request will **REPLACE** all existing line items for the sales order line group with this array. To keep any existing line items, you must include them in this array even if they have not changed. **Any line items not included will be removed.**\n\n2. To add a new line item, include it here with the `id` field set to `-1`.\n\n3. If you do not wish to modify any line items, omit this field entirely to keep them unchanged.",
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description:
                      'The QuickBooks-assigned unique identifier of an existing sales order line you wish to retain or update.\n\n**IMPORTANT**: Set this field to `-1` for new sales order lines you wish to add.',
                  },
                  amount: {
                    type: 'string',
                    description:
                      'The monetary amount of this sales order line, represented as a decimal string. If both `quantity` and `rate` are specified but not `amount`, QuickBooks will use them to calculate `amount`. If `amount`, `rate`, and `quantity` are all unspecified, then QuickBooks will calculate `amount` based on a `quantity` of `1` and the suggested `rate`. This field cannot be cleared.',
                  },
                  classId: {
                    type: 'string',
                    description:
                      "The sales order line's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. If a class is specified for the entire parent transaction, it is automatically applied to all sales order lines unless overridden here, at the transaction line level.",
                  },
                  description: {
                    type: 'string',
                    description: 'A description of this sales order line.',
                  },
                  inventorySiteId: {
                    type: 'string',
                    description:
                      'The site location where inventory for the item associated with this sales order line is stored.',
                  },
                  inventorySiteLocationId: {
                    type: 'string',
                    description:
                      'The specific location (e.g., bin or shelf) within the inventory site where the item associated with this sales order line is stored.',
                  },
                  isManuallyClosed: {
                    type: 'boolean',
                    description:
                      'Indicates whether this sales order line has been manually marked as closed, even if it has not been invoiced.',
                  },
                  itemId: {
                    type: 'string',
                    description:
                      'The item associated with this sales order line. This can refer to any good or service that the business buys or sells, including item types such as a service item, inventory item, or special calculation item like a discount item or sales-tax item.',
                  },
                  lotNumber: {
                    type: 'string',
                    description:
                      'The lot number of the item associated with this sales order line. Used for tracking groups of inventory items that are purchased or manufactured together.',
                  },
                  otherCustomField1: {
                    type: 'string',
                    description:
                      "A built-in custom field for additional information specific to this sales order line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all sales order lines for convenience. Developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
                  },
                  otherCustomField2: {
                    type: 'string',
                    description:
                      "A second built-in custom field for additional information specific to this sales order line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all sales order lines for convenience. Like `otherCustomField1`, developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
                  },
                  overrideUnitOfMeasureSetId: {
                    type: 'string',
                    description:
                      'Specifies an alternative unit-of-measure set when updating this sales order line\'s `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select units from a different set than the item\'s default unit-of-measure set, which remains unchanged on the item itself. The override applies only to this specific line. For example, you can sell an item typically measured in volume units using weight units in a specific transaction by specifying a different unit-of-measure set with this field.',
                  },
                  priceLevelId: {
                    type: 'string',
                    description:
                      'The price level applied to this sales order line. This overrides any price level set on the corresponding customer. The resulting sales order line will not show this price level, only the final `rate` calculated from it.',
                  },
                  priceRuleConflictStrategy: {
                    type: 'string',
                    description:
                      'Specifies how to resolve price rule conflicts when adding or modifying this sales order line.',
                    enum: ['base_price', 'zero'],
                  },
                  quantity: {
                    type: 'number',
                    description:
                      'The quantity of the item associated with this sales order line. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item is a discount item.',
                  },
                  rate: {
                    type: 'string',
                    description:
                      'The price per unit for this sales order line. If both `rate` and `amount` are specified, `rate` will be ignored. If both `quantity` and `amount` are specified but not `rate`, QuickBooks will use them to calculate `rate`. Represented as a decimal string. This field cannot be cleared.',
                  },
                  ratePercent: {
                    type: 'string',
                    description:
                      'The price of this sales order line expressed as a percentage. Typically used for discount or markup items.',
                  },
                  salesTaxCodeId: {
                    type: 'string',
                    description:
                      'The sales-tax code for this sales order line, determining whether it is taxable or non-taxable. If set, this overrides any sales-tax codes defined on the parent transaction or the associated item.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
                  },
                  serialNumber: {
                    type: 'string',
                    description:
                      'The serial number of the item associated with this sales order line. This is used for tracking individual units of serialized inventory items.',
                  },
                  unitOfMeasure: {
                    type: 'string',
                    description:
                      "The unit-of-measure used for the `quantity` in this sales order line. Must be a valid unit within the item's available units of measure.",
                  },
                },
                required: ['id'],
              },
            },
            overrideUnitOfMeasureSetId: {
              type: 'string',
              description:
                'Specifies an alternative unit-of-measure set when updating this sales order line group\'s `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select units from a different set than the item\'s default unit-of-measure set, which remains unchanged on the item itself. The override applies only to this specific line. For example, you can sell an item typically measured in volume units using weight units in a specific transaction by specifying a different unit-of-measure set with this field.',
            },
            quantity: {
              type: 'number',
              description:
                'The quantity of the item group associated with this sales order line group. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item group is a discount item group.',
            },
            unitOfMeasure: {
              type: 'string',
              description:
                "The unit-of-measure used for the `quantity` in this sales order line group. Must be a valid unit within the item's available units of measure.",
            },
          },
          required: ['id'],
        },
      },
      lines: {
        type: 'array',
        description:
          "The sales order's line items, each representing a single product or service ordered.\n\n**IMPORTANT**:\n\n1. Including this array in your update request will **REPLACE** all existing line items for the sales order with this array. To keep any existing line items, you must include them in this array even if they have not changed. **Any line items not included will be removed.**\n\n2. To add a new line item, include it here with the `id` field set to `-1`.\n\n3. If you do not wish to modify any line items, omit this field entirely to keep them unchanged.",
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description:
                'The QuickBooks-assigned unique identifier of an existing sales order line you wish to retain or update.\n\n**IMPORTANT**: Set this field to `-1` for new sales order lines you wish to add.',
            },
            amount: {
              type: 'string',
              description:
                'The monetary amount of this sales order line, represented as a decimal string. If both `quantity` and `rate` are specified but not `amount`, QuickBooks will use them to calculate `amount`. If `amount`, `rate`, and `quantity` are all unspecified, then QuickBooks will calculate `amount` based on a `quantity` of `1` and the suggested `rate`. This field cannot be cleared.',
            },
            classId: {
              type: 'string',
              description:
                "The sales order line's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. If a class is specified for the entire parent transaction, it is automatically applied to all sales order lines unless overridden here, at the transaction line level.",
            },
            description: {
              type: 'string',
              description: 'A description of this sales order line.',
            },
            inventorySiteId: {
              type: 'string',
              description:
                'The site location where inventory for the item associated with this sales order line is stored.',
            },
            inventorySiteLocationId: {
              type: 'string',
              description:
                'The specific location (e.g., bin or shelf) within the inventory site where the item associated with this sales order line is stored.',
            },
            isManuallyClosed: {
              type: 'boolean',
              description:
                'Indicates whether this sales order line has been manually marked as closed, even if it has not been invoiced.',
            },
            itemId: {
              type: 'string',
              description:
                'The item associated with this sales order line. This can refer to any good or service that the business buys or sells, including item types such as a service item, inventory item, or special calculation item like a discount item or sales-tax item.',
            },
            lotNumber: {
              type: 'string',
              description:
                'The lot number of the item associated with this sales order line. Used for tracking groups of inventory items that are purchased or manufactured together.',
            },
            otherCustomField1: {
              type: 'string',
              description:
                "A built-in custom field for additional information specific to this sales order line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all sales order lines for convenience. Developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
            },
            otherCustomField2: {
              type: 'string',
              description:
                "A second built-in custom field for additional information specific to this sales order line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all sales order lines for convenience. Like `otherCustomField1`, developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
            },
            overrideUnitOfMeasureSetId: {
              type: 'string',
              description:
                'Specifies an alternative unit-of-measure set when updating this sales order line\'s `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select units from a different set than the item\'s default unit-of-measure set, which remains unchanged on the item itself. The override applies only to this specific line. For example, you can sell an item typically measured in volume units using weight units in a specific transaction by specifying a different unit-of-measure set with this field.',
            },
            priceLevelId: {
              type: 'string',
              description:
                'The price level applied to this sales order line. This overrides any price level set on the corresponding customer. The resulting sales order line will not show this price level, only the final `rate` calculated from it.',
            },
            priceRuleConflictStrategy: {
              type: 'string',
              description:
                'Specifies how to resolve price rule conflicts when adding or modifying this sales order line.',
              enum: ['base_price', 'zero'],
            },
            quantity: {
              type: 'number',
              description:
                'The quantity of the item associated with this sales order line. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item is a discount item.',
            },
            rate: {
              type: 'string',
              description:
                'The price per unit for this sales order line. If both `rate` and `amount` are specified, `rate` will be ignored. If both `quantity` and `amount` are specified but not `rate`, QuickBooks will use them to calculate `rate`. Represented as a decimal string. This field cannot be cleared.',
            },
            ratePercent: {
              type: 'string',
              description:
                'The price of this sales order line expressed as a percentage. Typically used for discount or markup items.',
            },
            salesTaxCodeId: {
              type: 'string',
              description:
                'The sales-tax code for this sales order line, determining whether it is taxable or non-taxable. If set, this overrides any sales-tax codes defined on the parent transaction or the associated item.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
            },
            serialNumber: {
              type: 'string',
              description:
                'The serial number of the item associated with this sales order line. This is used for tracking individual units of serialized inventory items.',
            },
            unitOfMeasure: {
              type: 'string',
              description:
                "The unit-of-measure used for the `quantity` in this sales order line. Must be a valid unit within the item's available units of measure.",
            },
          },
          required: ['id'],
        },
      },
      memo: {
        type: 'string',
        description: 'A memo or note for this sales order.',
      },
      otherCustomField: {
        type: 'string',
        description:
          "A built-in custom field for additional information specific to this sales order. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all sales orders for convenience. Developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Unlike `otherCustomField1` and `otherCustomField2`, which are line item fields, this exists at the transaction level. Hidden by default in the QuickBooks UI.",
      },
      purchaseOrderNumber: {
        type: 'string',
        description:
          "The customer's Purchase Order (PO) number associated with this sales order. This field is often used to cross-reference the sales order with the customer's purchasing system.",
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this sales order, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user.',
      },
      salesChannelName: {
        type: 'string',
        description: 'The type of the sales channel for this sales order.',
        enum: ['blank', 'ecommerce'],
      },
      salesRepresentativeId: {
        type: 'string',
        description:
          "The sales order's sales representative. Sales representatives can be employees, vendors, or other names in QuickBooks.",
      },
      salesStoreName: {
        type: 'string',
        description: 'The name of the sales store for this sales order.',
      },
      salesStoreType: {
        type: 'string',
        description: 'The type of the sales store for this sales order.',
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The sales-tax code for this sales order, determining whether it is taxable or non-taxable. This can be overridden at the transaction-line level.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
      salesTaxItemId: {
        type: 'string',
        description:
          "The sales-tax item used to calculate the actual tax amount for this sales order's transactions by applying a specific tax rate collected for a single tax agency. Unlike `salesTaxCode`, which only indicates general taxability, this field drives the actual tax calculation and reporting.",
      },
      shipmentOrigin: {
        type: 'string',
        description:
          'The origin location from where the product associated with this sales order is shipped. This is the point at which ownership and liability for goods transfer from seller to buyer. Internally, QuickBooks uses the term "FOB" for this field, which stands for "freight on board". This field is informational and has no accounting implications.',
      },
      shippingAddress: {
        type: 'object',
        description: "The sales order's shipping address.",
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
        required: [],
      },
      shippingDate: {
        type: 'string',
        description:
          'The date when the products or services for this sales order were shipped or are expected to be shipped, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      shippingMethodId: {
        type: 'string',
        description:
          'The shipping method used for this sales order, such as standard mail or overnight delivery.',
      },
      termsId: {
        type: 'string',
        description:
          "The sales order's payment terms, defining when payment is due and any applicable discounts.",
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this sales order, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
    },
  },
};

export const handler = (client: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return client.qbd.salesOrders.update(id, body);
};

export default { metadata, tool, handler };
