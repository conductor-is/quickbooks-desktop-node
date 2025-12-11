// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.estimates',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/estimates',
};

export const tool: Tool = {
  name: 'create_qbd_estimates',
  description: 'Creates a new estimate.',
  inputSchema: {
    type: 'object',
    properties: {
      customerId: {
        type: 'string',
        description: 'The customer or customer-job associated with this estimate.',
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this estimate, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      billingAddress: {
        type: 'object',
        description: "The estimate's billing address.",
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
          "The estimate's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. A class defined here is automatically used in this estimate's line items unless overridden at the line item level.",
      },
      customerMessageId: {
        type: 'string',
        description: 'The message to display to the customer on the estimate.',
      },
      documentTemplateId: {
        type: 'string',
        description:
          'The predefined template in QuickBooks that determines the layout and formatting for this estimate when printed or displayed.',
      },
      dueDate: {
        type: 'string',
        description: 'The date by which this estimate must be paid, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      exchangeRate: {
        type: 'number',
        description:
          "The market exchange rate between this estimate's currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).",
      },
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this estimate is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      isQueuedForEmail: {
        type: 'boolean',
        description:
          'Indicates whether this estimate is included in the queue of documents for QuickBooks to email to the customer.',
      },
      lineGroups: {
        type: 'array',
        description:
          "The estimate's line item groups, each representing a predefined set of related items.\n\n**IMPORTANT**: You must specify `lines`, `lineGroups`, or both when creating an estimate.",
        items: {
          type: 'object',
          properties: {
            itemGroupId: {
              type: 'string',
              description:
                "The estimate line group's item group, representing a predefined set of items bundled because they are commonly purchased together or grouped for faster entry.",
            },
            customFields: {
              type: 'array',
              description:
                'The custom fields for the estimate line group object, added as user-defined data extensions, not included in the standard QuickBooks object.',
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
                'The site location where inventory for the item group associated with this estimate line group is stored.',
            },
            inventorySiteLocationId: {
              type: 'string',
              description:
                'The specific location (e.g., bin or shelf) within the inventory site where the item group associated with this estimate line group is stored.',
            },
            quantity: {
              type: 'number',
              description:
                'The quantity of the item group associated with this estimate line group. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item group is a discount item group.',
            },
            unitOfMeasure: {
              type: 'string',
              description:
                "The unit-of-measure used for the `quantity` in this estimate line group. Must be a valid unit within the item's available units of measure.",
            },
          },
          required: ['itemGroupId'],
        },
      },
      lines: {
        type: 'array',
        description:
          "The estimate's line items, each representing a single product or service quoted.\n\n**IMPORTANT**: You must specify `lines`, `lineGroups`, or both when creating an estimate.",
        items: {
          type: 'object',
          properties: {
            amount: {
              type: 'string',
              description:
                'The monetary amount of this estimate line, represented as a decimal string. If both `quantity` and `rate` are specified but not `amount`, QuickBooks will calculate `amount` using the rate and any markup you supply. The calculation is `amount = (quantity * rate) * (1 + markupRate)` when `markupRate` is provided, or `amount = (quantity * rate) * (1 + markupRatePercent/100)` when `markupRatePercent` is provided. If `amount`, `rate`, and `quantity` are all unspecified, QuickBooks will calculate `amount` based on a `quantity` of `1` and the suggested `rate`. This field cannot be cleared.',
            },
            classId: {
              type: 'string',
              description:
                "The estimate line's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. If a class is specified for the entire parent transaction, it is automatically applied to all estimate lines unless overridden here, at the transaction line level.",
            },
            customFields: {
              type: 'array',
              description:
                'The custom fields for the estimate line object, added as user-defined data extensions, not included in the standard QuickBooks object.',
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
              description: 'A description of this estimate line.',
            },
            inventorySiteId: {
              type: 'string',
              description:
                'The site location where inventory for the item associated with this estimate line is stored.',
            },
            inventorySiteLocationId: {
              type: 'string',
              description:
                'The specific location (e.g., bin or shelf) within the inventory site where the item associated with this estimate line is stored.',
            },
            itemId: {
              type: 'string',
              description:
                'The item associated with this estimate line. This can refer to any good or service that the business buys or sells, including item types such as a service item, inventory item, or special calculation item like a discount item or sales-tax item.',
            },
            markupRate: {
              type: 'string',
              description:
                'The markup that will be passed on to the customer for this item on this estimate line. `amount = (quantity * rate) * (1 + markupRate)`',
            },
            markupRatePercent: {
              type: 'string',
              description:
                'The markup, expressed as a percentage, that will be passed on to the customer for this item on this estimate line. `amount = (quantity * rate) * (1 + markupRatePercent/100)`',
            },
            otherCustomField1: {
              type: 'string',
              description:
                "A built-in custom field for additional information specific to this estimate line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all estimate lines for convenience. Developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
            },
            otherCustomField2: {
              type: 'string',
              description:
                "A second built-in custom field for additional information specific to this estimate line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all estimate lines for convenience. Like `otherCustomField1`, developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
            },
            overrideItemAccountId: {
              type: 'string',
              description:
                'The account to use for this estimate line, overriding the default account associated with the item.',
            },
            priceLevelId: {
              type: 'string',
              description:
                'The price level applied to this estimate line. This overrides any price level set on the corresponding customer. The resulting estimate line will not show this price level, only the final `rate` calculated from it.',
            },
            priceRuleConflictStrategy: {
              type: 'string',
              description:
                'Specifies how to resolve price rule conflicts when adding or modifying this estimate line.',
              enum: ['base_price', 'zero'],
            },
            quantity: {
              type: 'number',
              description:
                'The quantity of the item associated with this estimate line. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item is a discount item.',
            },
            rate: {
              type: 'string',
              description:
                'The price per unit for this estimate line. If both `rate` and `amount` are specified, `rate` will be ignored. If both `quantity` and `amount` are specified but not `rate`, QuickBooks will use them to calculate `rate`. Represented as a decimal string. This field cannot be cleared.',
            },
            ratePercent: {
              type: 'string',
              description:
                'The price of this estimate line expressed as a percentage. Typically used for discount or markup items.',
            },
            salesTaxCodeId: {
              type: 'string',
              description:
                'The sales-tax code for this estimate line, determining whether it is taxable or non-taxable. If set, this overrides any sales-tax codes defined on the parent transaction or the associated item.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
            },
            unitOfMeasure: {
              type: 'string',
              description:
                "The unit-of-measure used for the `quantity` in this estimate line. Must be a valid unit within the item's available units of measure.",
            },
          },
        },
      },
      memo: {
        type: 'string',
        description:
          'A memo or note for this estimate that appears in reports, but not on the estimate. Use `customerMessage` to add a note to this estimate.',
      },
      otherCustomField: {
        type: 'string',
        description:
          "A built-in custom field for additional information specific to this estimate. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all estimates for convenience. Developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Unlike `otherCustomField1` and `otherCustomField2`, which are line item fields, this exists at the transaction level. Hidden by default in the QuickBooks UI.",
      },
      purchaseOrderNumber: {
        type: 'string',
        description:
          "The customer's Purchase Order (PO) number associated with this estimate. This field is often used to cross-reference the estimate with the customer's purchasing system.\n\nMaximum length: 25 characters.",
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this estimate, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user. When left blank in this create request, this field will be left blank in QuickBooks (i.e., it does *not* auto-increment).',
      },
      salesRepresentativeId: {
        type: 'string',
        description:
          "The estimate's sales representative. Sales representatives can be employees, vendors, or other names in QuickBooks.",
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The sales-tax code for this estimate, determining whether it is taxable or non-taxable. This can be overridden at the transaction-line level.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
      salesTaxItemId: {
        type: 'string',
        description:
          "The sales-tax item used to calculate the actual tax amount for this estimate's transactions by applying a specific tax rate collected for a single tax agency. Unlike `salesTaxCode`, which only indicates general taxability, this field drives the actual tax calculation and reporting.",
      },
      shipmentOrigin: {
        type: 'string',
        description:
          'The origin location from where the product associated with this estimate is shipped. This is the point at which ownership and liability for goods transfer from seller to buyer. Internally, QuickBooks uses the term "FOB" for this field, which stands for "freight on board". This field is informational and has no accounting implications.',
      },
      shippingAddress: {
        type: 'object',
        description: "The estimate's shipping address.",
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
      termsId: {
        type: 'string',
        description:
          "The estimate's payment terms, defining when payment is due and any applicable discounts.",
      },
    },
    required: ['customerId', 'transactionDate', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  try {
    return asTextContentResult(await conductor.qbd.estimates.create(body));
  } catch (error) {
    if (error instanceof Conductor.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
