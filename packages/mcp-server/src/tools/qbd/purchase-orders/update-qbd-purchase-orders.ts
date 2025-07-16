// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.purchase_orders',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/purchase-orders/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_purchase_orders',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdates an existing purchase order.",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the purchase order to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the purchase order object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      classId: {
        type: 'string',
        description:
          "The purchase order's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. A class defined here is automatically used in this purchase order's line items unless overridden at the line item level.",
      },
      documentTemplateId: {
        type: 'string',
        description:
          'The predefined template in QuickBooks that determines the layout and formatting for this purchase order when printed or displayed.',
      },
      dueDate: {
        type: 'string',
        description: 'The date by which this purchase order must be paid, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      exchangeRate: {
        type: 'number',
        description:
          "The market exchange rate between this purchase order's currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).",
      },
      expectedDate: {
        type: 'string',
        description:
          'The date on which shipment of this purchase order is expected to be completed, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      inventorySiteId: {
        type: 'string',
        description:
          'The site location where inventory for the item associated with this purchase order is stored.',
      },
      isManuallyClosed: {
        type: 'boolean',
        description:
          'Indicates whether this purchase order has been manually marked as closed, even if all items have not been received or the sale has not been cancelled. Once the purchase order is marked as closed, all of its line items become closed as well. You cannot change `isManuallyClosed` to `false` after the purchase order has been fully received.',
      },
      isQueuedForEmail: {
        type: 'boolean',
        description:
          'Indicates whether this purchase order is included in the queue of documents for QuickBooks to email to the customer.',
      },
      isQueuedForPrint: {
        type: 'boolean',
        description:
          'Indicates whether this purchase order is included in the queue of documents for QuickBooks to print.',
      },
      lineGroups: {
        type: 'array',
        description:
          "The purchase order's line item groups, each representing a predefined set of related items.\n\n**IMPORTANT**:\n\n1. Including this array in your update request will **REPLACE** all existing line item groups for the purchase order with this array. To keep any existing line item groups, you must include them in this array even if they have not changed. **Any line item groups not included will be removed.**\n\n2. To add a new line item group, include it here with the `id` field set to `-1`.\n\n3. If you do not wish to modify any line item groups, omit this field entirely to keep them unchanged.",
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description:
                'The QuickBooks-assigned unique identifier of an existing purchase order line group you wish to retain or update.\n\n**IMPORTANT**: Set this field to `-1` for new purchase order line groups you wish to add.',
            },
            itemGroupId: {
              type: 'string',
              description:
                "The purchase order line group's item group, representing a predefined set of items bundled because they are commonly purchased together or grouped for faster entry.",
            },
            lines: {
              type: 'array',
              description:
                "The purchase order line group's line items, each representing a single product or service ordered.\n\n**IMPORTANT**:\n\n1. Including this array in your update request will **REPLACE** all existing line items for the purchase order line group with this array. To keep any existing line items, you must include them in this array even if they have not changed. **Any line items not included will be removed.**\n\n2. To add a new line item, include it here with the `id` field set to `-1`.\n\n3. If you do not wish to modify any line items, omit this field entirely to keep them unchanged.",
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description:
                      'The QuickBooks-assigned unique identifier of an existing purchase order line you wish to retain or update.\n\n**IMPORTANT**: Set this field to `-1` for new purchase order lines you wish to add.',
                  },
                  amount: {
                    type: 'string',
                    description:
                      'The monetary amount of this purchase order line, represented as a decimal string. If both `quantity` and `rate` are specified but not `amount`, QuickBooks will use them to calculate `amount`. If `amount`, `rate`, and `quantity` are all unspecified, then QuickBooks will calculate `amount` based on a `quantity` of `1` and the suggested `rate`. This field cannot be cleared.',
                  },
                  classId: {
                    type: 'string',
                    description:
                      "The purchase order line's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. If a class is specified for the entire parent transaction, it is automatically applied to all purchase order lines unless overridden here, at the transaction line level.",
                  },
                  description: {
                    type: 'string',
                    description: 'A description of this purchase order line.',
                  },
                  inventorySiteLocationId: {
                    type: 'string',
                    description:
                      'The specific location (e.g., bin or shelf) within the inventory site where the item associated with this purchase order line is stored.',
                  },
                  isManuallyClosed: {
                    type: 'boolean',
                    description:
                      'Indicates whether this purchase order line has been manually marked as closed, even if this item has not been received or its sale has not been cancelled. If all the purchase order lines are marked as closed, the purchase order itself is marked as closed as well. You cannot change `isManuallyClosed` to `false` after the purchase order line has been fully received.',
                  },
                  itemId: {
                    type: 'string',
                    description:
                      'The item associated with this purchase order line. This can refer to any good or service that the business buys or sells, including item types such as a service item, inventory item, or special calculation item like a discount item or sales-tax item.',
                  },
                  otherCustomField1: {
                    type: 'string',
                    description:
                      "A built-in custom field for additional information specific to this purchase order line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all purchase order lines for convenience. Developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
                  },
                  otherCustomField2: {
                    type: 'string',
                    description:
                      "A second built-in custom field for additional information specific to this purchase order line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all purchase order lines for convenience. Like `otherCustomField1`, developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
                  },
                  overrideItemAccountId: {
                    type: 'string',
                    description:
                      'The account to use for this purchase order line, overriding the default account associated with the item.',
                  },
                  overrideUnitOfMeasureSetId: {
                    type: 'string',
                    description:
                      'Specifies an alternative unit-of-measure set when updating this purchase order line\'s `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select units from a different set than the item\'s default unit-of-measure set, which remains unchanged on the item itself. The override applies only to this specific line. For example, you can sell an item typically measured in volume units using weight units in a specific transaction by specifying a different unit-of-measure set with this field.',
                  },
                  payeeId: {
                    type: 'string',
                    description:
                      "If `account` refers to an Accounts-Payable (A/P) account, `payee` refers to the expense's vendor (not the customer). If `account` refers to any other type of account, `payee` refers to the expense's customer (not the vendor).",
                  },
                  quantity: {
                    type: 'number',
                    description:
                      'The quantity of the item associated with this purchase order line. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item is a discount item.',
                  },
                  rate: {
                    type: 'string',
                    description:
                      'The price per unit for this purchase order line. If both `rate` and `amount` are specified, `rate` will be ignored. If both `quantity` and `amount` are specified but not `rate`, QuickBooks will use them to calculate `rate`. Represented as a decimal string. This field cannot be cleared.',
                  },
                  salesTaxCodeId: {
                    type: 'string',
                    description:
                      'The sales-tax code for this purchase order line, determining whether it is taxable or non-taxable. If set, this overrides any sales-tax codes defined on the parent transaction or the associated item.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
                  },
                  serviceDate: {
                    type: 'string',
                    description:
                      'The date on which the service for this purchase order line was or will be performed, in ISO 8601 format (YYYY-MM-DD). This is particularly relevant for service items.',
                    format: 'date',
                  },
                  sku: {
                    type: 'string',
                    description:
                      "The purchase order line's stock keeping unit (SKU), which is sometimes the manufacturer's part number.",
                  },
                  unitOfMeasure: {
                    type: 'string',
                    description:
                      "The unit-of-measure used for the `quantity` in this purchase order line. Must be a valid unit within the item's available units of measure.",
                  },
                },
                required: ['id'],
              },
            },
            overrideUnitOfMeasureSetId: {
              type: 'string',
              description:
                'Specifies an alternative unit-of-measure set when updating this purchase order line group\'s `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select units from a different set than the item\'s default unit-of-measure set, which remains unchanged on the item itself. The override applies only to this specific line. For example, you can sell an item typically measured in volume units using weight units in a specific transaction by specifying a different unit-of-measure set with this field.',
            },
            quantity: {
              type: 'number',
              description:
                'The quantity of the item group associated with this purchase order line group. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item group is a discount item group.',
            },
            unitOfMeasure: {
              type: 'string',
              description:
                "The unit-of-measure used for the `quantity` in this purchase order line group. Must be a valid unit within the item's available units of measure.",
            },
          },
          required: ['id'],
        },
      },
      lines: {
        type: 'array',
        description:
          "The purchase order's line items, each representing a single product or service ordered.\n\n**IMPORTANT**:\n\n1. Including this array in your update request will **REPLACE** all existing line items for the purchase order with this array. To keep any existing line items, you must include them in this array even if they have not changed. **Any line items not included will be removed.**\n\n2. To add a new line item, include it here with the `id` field set to `-1`.\n\n3. If you do not wish to modify any line items, omit this field entirely to keep them unchanged.",
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description:
                'The QuickBooks-assigned unique identifier of an existing purchase order line you wish to retain or update.\n\n**IMPORTANT**: Set this field to `-1` for new purchase order lines you wish to add.',
            },
            amount: {
              type: 'string',
              description:
                'The monetary amount of this purchase order line, represented as a decimal string. If both `quantity` and `rate` are specified but not `amount`, QuickBooks will use them to calculate `amount`. If `amount`, `rate`, and `quantity` are all unspecified, then QuickBooks will calculate `amount` based on a `quantity` of `1` and the suggested `rate`. This field cannot be cleared.',
            },
            classId: {
              type: 'string',
              description:
                "The purchase order line's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. If a class is specified for the entire parent transaction, it is automatically applied to all purchase order lines unless overridden here, at the transaction line level.",
            },
            description: {
              type: 'string',
              description: 'A description of this purchase order line.',
            },
            inventorySiteLocationId: {
              type: 'string',
              description:
                'The specific location (e.g., bin or shelf) within the inventory site where the item associated with this purchase order line is stored.',
            },
            isManuallyClosed: {
              type: 'boolean',
              description:
                'Indicates whether this purchase order line has been manually marked as closed, even if this item has not been received or its sale has not been cancelled. If all the purchase order lines are marked as closed, the purchase order itself is marked as closed as well. You cannot change `isManuallyClosed` to `false` after the purchase order line has been fully received.',
            },
            itemId: {
              type: 'string',
              description:
                'The item associated with this purchase order line. This can refer to any good or service that the business buys or sells, including item types such as a service item, inventory item, or special calculation item like a discount item or sales-tax item.',
            },
            otherCustomField1: {
              type: 'string',
              description:
                "A built-in custom field for additional information specific to this purchase order line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all purchase order lines for convenience. Developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
            },
            otherCustomField2: {
              type: 'string',
              description:
                "A second built-in custom field for additional information specific to this purchase order line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all purchase order lines for convenience. Like `otherCustomField1`, developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
            },
            overrideItemAccountId: {
              type: 'string',
              description:
                'The account to use for this purchase order line, overriding the default account associated with the item.',
            },
            overrideUnitOfMeasureSetId: {
              type: 'string',
              description:
                'Specifies an alternative unit-of-measure set when updating this purchase order line\'s `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select units from a different set than the item\'s default unit-of-measure set, which remains unchanged on the item itself. The override applies only to this specific line. For example, you can sell an item typically measured in volume units using weight units in a specific transaction by specifying a different unit-of-measure set with this field.',
            },
            payeeId: {
              type: 'string',
              description:
                "If `account` refers to an Accounts-Payable (A/P) account, `payee` refers to the expense's vendor (not the customer). If `account` refers to any other type of account, `payee` refers to the expense's customer (not the vendor).",
            },
            quantity: {
              type: 'number',
              description:
                'The quantity of the item associated with this purchase order line. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item is a discount item.',
            },
            rate: {
              type: 'string',
              description:
                'The price per unit for this purchase order line. If both `rate` and `amount` are specified, `rate` will be ignored. If both `quantity` and `amount` are specified but not `rate`, QuickBooks will use them to calculate `rate`. Represented as a decimal string. This field cannot be cleared.',
            },
            salesTaxCodeId: {
              type: 'string',
              description:
                'The sales-tax code for this purchase order line, determining whether it is taxable or non-taxable. If set, this overrides any sales-tax codes defined on the parent transaction or the associated item.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
            },
            serviceDate: {
              type: 'string',
              description:
                'The date on which the service for this purchase order line was or will be performed, in ISO 8601 format (YYYY-MM-DD). This is particularly relevant for service items.',
              format: 'date',
            },
            sku: {
              type: 'string',
              description:
                "The purchase order line's stock keeping unit (SKU), which is sometimes the manufacturer's part number.",
            },
            unitOfMeasure: {
              type: 'string',
              description:
                "The unit-of-measure used for the `quantity` in this purchase order line. Must be a valid unit within the item's available units of measure.",
            },
          },
          required: ['id'],
        },
      },
      memo: {
        type: 'string',
        description:
          'A memo or note for this purchase order that appears in reports, but not on the purchase order.',
      },
      otherCustomField1: {
        type: 'string',
        description:
          "A built-in custom field for additional information specific to this purchase order. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all purchase orders for convenience. Developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
      },
      otherCustomField2: {
        type: 'string',
        description:
          "A second built-in custom field for additional information specific to this purchase order. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all purchase orders for convenience. Like `otherCustomField1`, developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this purchase order, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user.',
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The sales-tax code for this purchase order, determining whether it is taxable or non-taxable. If set, this overrides any sales-tax codes defined on the vendor. This can be overridden on the purchase order\'s individual lines.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
      shipmentOrigin: {
        type: 'string',
        description:
          'The origin location from where the product associated with this purchase order is shipped. This is the point at which ownership and liability for goods transfer from seller to buyer. Internally, QuickBooks uses the term "FOB" for this field, which stands for "freight on board". This field is informational and has no accounting implications.',
      },
      shippingAddress: {
        type: 'object',
        description: "The purchase order's shipping address.",
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
      shippingMethodId: {
        type: 'string',
        description:
          'The shipping method used for this purchase order, such as standard mail or overnight delivery.',
      },
      shipToEntityId: {
        type: 'string',
        description:
          'The customer, vendor, employee, or other entity to whom this purchase order is to be shipped.',
      },
      termsId: {
        type: 'string',
        description:
          "The purchase order's payment terms, defining when payment is due and any applicable discounts.",
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this purchase order, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      vendorAddress: {
        type: 'object',
        description: 'The address of the vendor who sent this purchase order.',
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
      vendorId: {
        type: 'string',
        description: 'The vendor who sent this purchase order for goods or services purchased.',
      },
      vendorMessage: {
        type: 'string',
        description: 'A message to be printed on this purchase order for the vendor to read.',
      },
    },
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.purchaseOrders.update(id, body));
};

export default { metadata, tool, handler };
