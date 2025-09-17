// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.sales_receipts',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/sales-receipts',
};

export const tool: Tool = {
  name: 'create_qbd_sales_receipts',
  description:
    'Creates a sales receipt for a sale paid in full. If you include credit card transaction details, QuickBooks requires the payment method to reference a credit card type and automatically deposits the funds to Undeposited Funds rather than a specific bank account.',
  inputSchema: {
    type: 'object',
    properties: {
      transactionDate: {
        type: 'string',
        description: 'The date of this sales receipt, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      billingAddress: {
        type: 'object',
        description: "The sales receipt's billing address.",
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
      checkNumber: {
        type: 'string',
        description: 'The check number of a check received for this sales receipt.',
      },
      classId: {
        type: 'string',
        description:
          "The sales receipt's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. A class defined here is automatically used in this sales receipt's line items unless overridden at the line item level.",
      },
      creditCardTransaction: {
        type: 'object',
        description:
          "The credit card transaction data for this sales receipt's payment when using QuickBooks Merchant Services (QBMS). If specifying this field, you must also specify the `paymentMethod` field.",
        properties: {
          request: {
            type: 'object',
            description:
              'The transaction request data originally supplied for this credit card transaction when using QuickBooks Merchant Services (QBMS).',
            properties: {
              expirationMonth: {
                type: 'number',
                description: 'The month when the credit card expires.',
              },
              expirationYear: {
                type: 'number',
                description: 'The year when the credit card expires.',
              },
              name: {
                type: 'string',
                description: "The cardholder's name on the card.",
              },
              number: {
                type: 'string',
                description: 'The credit card number. Must be masked with lower case "x" and no dashes.',
              },
              address: {
                type: 'string',
                description: "The card's billing address.",
              },
              commercialCardCode: {
                type: 'string',
                description:
                  'The commercial card code identifies the type of business credit card being used (purchase, corporate, or business) for Visa and Mastercard transactions only. When provided, this code may qualify the transaction for lower processing fees compared to the standard rates that apply when no code is specified.',
              },
              postalCode: {
                type: 'string',
                description: "The card's billing address ZIP or postal code.",
              },
              transactionMode: {
                type: 'string',
                description:
                  'Indicates whether this credit card transaction came from a card swipe (`card_present`) or not (`card_not_present`).',
                enum: ['card_not_present', 'card_present'],
              },
              transactionType: {
                type: 'string',
                description: 'The QBMS transaction type from which the current transaction data originated.',
                enum: ['authorization', 'capture', 'charge', 'refund', 'voice_authorization'],
              },
            },
            required: ['expirationMonth', 'expirationYear', 'name', 'number'],
          },
          response: {
            type: 'object',
            description:
              'The transaction response data for this credit card transaction when using QuickBooks Merchant Services (QBMS).',
            properties: {
              creditCardTransactionId: {
                type: 'string',
                description:
                  'The ID returned from the credit card processor for this credit card transaction.',
              },
              merchantAccountNumber: {
                type: 'string',
                description:
                  "The QBMS account number of the merchant who is running this transaction using the customer's credit card.",
              },
              paymentStatus: {
                type: 'string',
                description:
                  'Indicates whether this credit card transaction is known to have been successfully processed by the card issuer.',
                enum: ['completed', 'unknown'],
              },
              statusCode: {
                type: 'number',
                description:
                  'The status code returned in the original QBMS transaction response for this credit card transaction.',
              },
              statusMessage: {
                type: 'string',
                description:
                  'The status message returned in the original QBMS transaction response for this credit card transaction.',
              },
              transactionAuthorizedAt: {
                type: 'string',
                description:
                  'The date and time when the credit card processor authorized this credit card transaction.',
              },
              authorizationCode: {
                type: 'string',
                description:
                  'The authorization code returned from the credit card processor to indicate that this charge will be paid by the card issuer.',
              },
              avsStreetStatus: {
                type: 'string',
                description:
                  "Indicates whether the street address supplied in the transaction request matches the customer's address on file at the card issuer.",
                enum: ['fail', 'not_available', 'pass'],
              },
              avsZipStatus: {
                type: 'string',
                description:
                  "Indicates whether the customer postal ZIP code supplied in the transaction request matches the customer's postal code recognized at the card issuer.",
                enum: ['fail', 'not_available', 'pass'],
              },
              cardSecurityCodeMatch: {
                type: 'string',
                description:
                  'Indicates whether the card security code supplied in the transaction request matches the card security code recognized for that credit card number at the card issuer.',
                enum: ['fail', 'not_available', 'pass'],
              },
              clientTransactionId: {
                type: 'string',
                description:
                  'A value returned from QBMS transactions for future use by the QuickBooks Reconciliation feature.',
              },
              paymentGroupingCode: {
                type: 'number',
                description:
                  'An internal code returned by QuickBooks Merchant Services (QBMS) from the transaction request, needed for the QuickBooks reconciliation feature.',
              },
              reconBatchId: {
                type: 'string',
                description:
                  'An internal ID returned by QuickBooks Merchant Services (QBMS) from the transaction request, needed for the QuickBooks reconciliation feature.',
              },
              transactionAuthorizationStamp: {
                type: 'number',
                description:
                  'An internal value for this credit card transaction, needed for the QuickBooks reconciliation feature.',
              },
            },
            required: [
              'creditCardTransactionId',
              'merchantAccountNumber',
              'paymentStatus',
              'statusCode',
              'statusMessage',
              'transactionAuthorizedAt',
            ],
          },
        },
      },
      customerId: {
        type: 'string',
        description: 'The customer or customer-job to which the payment for this sales receipt is credited.',
      },
      customerMessageId: {
        type: 'string',
        description: 'The message to display to the customer on the sales receipt.',
      },
      depositToAccountId: {
        type: 'string',
        description: 'The account where the funds for this sales receipt will be or have been deposited.',
      },
      documentTemplateId: {
        type: 'string',
        description:
          'The predefined template in QuickBooks that determines the layout and formatting for this sales receipt when printed or displayed.',
      },
      dueDate: {
        type: 'string',
        description:
          'The date by which this sales receipt must be paid, in ISO 8601 format (YYYY-MM-DD).\n\n**NOTE**: For sales receipts, this field is often `null` because sales receipts are generally used for point-of-sale payments, where full payment is received at the time of purchase.',
        format: 'date',
      },
      exchangeRate: {
        type: 'number',
        description:
          "The market exchange rate between this sales receipt's currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).",
      },
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
      },
      isPending: {
        type: 'boolean',
        description: 'Indicates whether this sales receipt has not been completed.',
      },
      isQueuedForEmail: {
        type: 'boolean',
        description:
          'Indicates whether this sales receipt is included in the queue of documents for QuickBooks to email to the customer.',
      },
      isQueuedForPrint: {
        type: 'boolean',
        description:
          'Indicates whether this sales receipt is included in the queue of documents for QuickBooks to print.',
      },
      lineGroups: {
        type: 'array',
        description:
          "The sales receipt's line item groups, each representing a predefined set of related items.\n\n**IMPORTANT**: You must specify `lines`, `lineGroups`, or both when creating a sales receipt.",
        items: {
          type: 'object',
          properties: {
            itemGroupId: {
              type: 'string',
              description:
                "The sales receipt line group's item group, representing a predefined set of items bundled because they are commonly purchased together or grouped for faster entry.",
            },
            customFields: {
              type: 'array',
              description:
                'The custom fields for the sales receipt line group object, added as user-defined data extensions, not included in the standard QuickBooks object.',
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
                'The site location where inventory for the item group associated with this sales receipt line group is stored.',
            },
            inventorySiteLocationId: {
              type: 'string',
              description:
                'The specific location (e.g., bin or shelf) within the inventory site where the item group associated with this sales receipt line group is stored.',
            },
            quantity: {
              type: 'number',
              description:
                'The quantity of the item group associated with this sales receipt line group. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item group is a discount item group.',
            },
            unitOfMeasure: {
              type: 'string',
              description:
                "The unit-of-measure used for the `quantity` in this sales receipt line group. Must be a valid unit within the item's available units of measure.",
            },
          },
          required: ['itemGroupId'],
        },
      },
      lines: {
        type: 'array',
        description:
          "The sales receipt's line items, each representing a single product or service sold.\n\n**IMPORTANT**: You must specify `lines`, `lineGroups`, or both when creating a sales receipt.",
        items: {
          type: 'object',
          properties: {
            amount: {
              type: 'string',
              description:
                'The monetary amount of this sales receipt line, represented as a decimal string. If both `quantity` and `rate` are specified but not `amount`, QuickBooks will use them to calculate `amount`. If `amount`, `rate`, and `quantity` are all unspecified, then QuickBooks will calculate `amount` based on a `quantity` of `1` and the suggested `rate`. This field cannot be cleared.',
            },
            classId: {
              type: 'string',
              description:
                "The sales receipt line's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. If a class is specified for the entire parent transaction, it is automatically applied to all sales receipt lines unless overridden here, at the transaction line level.",
            },
            creditCardTransaction: {
              type: 'object',
              description:
                "The credit card transaction data for this sales receipt line's payment when using QuickBooks Merchant Services (QBMS). If specifying this field, you must also specify the `paymentMethod` field.",
              properties: {
                request: {
                  type: 'object',
                  description:
                    'The transaction request data originally supplied for this credit card transaction when using QuickBooks Merchant Services (QBMS).',
                  properties: {
                    expirationMonth: {
                      type: 'number',
                      description: 'The month when the credit card expires.',
                    },
                    expirationYear: {
                      type: 'number',
                      description: 'The year when the credit card expires.',
                    },
                    name: {
                      type: 'string',
                      description: "The cardholder's name on the card.",
                    },
                    number: {
                      type: 'string',
                      description:
                        'The credit card number. Must be masked with lower case "x" and no dashes.',
                    },
                    address: {
                      type: 'string',
                      description: "The card's billing address.",
                    },
                    commercialCardCode: {
                      type: 'string',
                      description:
                        'The commercial card code identifies the type of business credit card being used (purchase, corporate, or business) for Visa and Mastercard transactions only. When provided, this code may qualify the transaction for lower processing fees compared to the standard rates that apply when no code is specified.',
                    },
                    postalCode: {
                      type: 'string',
                      description: "The card's billing address ZIP or postal code.",
                    },
                    transactionMode: {
                      type: 'string',
                      description:
                        'Indicates whether this credit card transaction came from a card swipe (`card_present`) or not (`card_not_present`).',
                      enum: ['card_not_present', 'card_present'],
                    },
                    transactionType: {
                      type: 'string',
                      description:
                        'The QBMS transaction type from which the current transaction data originated.',
                      enum: ['authorization', 'capture', 'charge', 'refund', 'voice_authorization'],
                    },
                  },
                  required: ['expirationMonth', 'expirationYear', 'name', 'number'],
                },
                response: {
                  type: 'object',
                  description:
                    'The transaction response data for this credit card transaction when using QuickBooks Merchant Services (QBMS).',
                  properties: {
                    creditCardTransactionId: {
                      type: 'string',
                      description:
                        'The ID returned from the credit card processor for this credit card transaction.',
                    },
                    merchantAccountNumber: {
                      type: 'string',
                      description:
                        "The QBMS account number of the merchant who is running this transaction using the customer's credit card.",
                    },
                    paymentStatus: {
                      type: 'string',
                      description:
                        'Indicates whether this credit card transaction is known to have been successfully processed by the card issuer.',
                      enum: ['completed', 'unknown'],
                    },
                    statusCode: {
                      type: 'number',
                      description:
                        'The status code returned in the original QBMS transaction response for this credit card transaction.',
                    },
                    statusMessage: {
                      type: 'string',
                      description:
                        'The status message returned in the original QBMS transaction response for this credit card transaction.',
                    },
                    transactionAuthorizedAt: {
                      type: 'string',
                      description:
                        'The date and time when the credit card processor authorized this credit card transaction.',
                    },
                    authorizationCode: {
                      type: 'string',
                      description:
                        'The authorization code returned from the credit card processor to indicate that this charge will be paid by the card issuer.',
                    },
                    avsStreetStatus: {
                      type: 'string',
                      description:
                        "Indicates whether the street address supplied in the transaction request matches the customer's address on file at the card issuer.",
                      enum: ['fail', 'not_available', 'pass'],
                    },
                    avsZipStatus: {
                      type: 'string',
                      description:
                        "Indicates whether the customer postal ZIP code supplied in the transaction request matches the customer's postal code recognized at the card issuer.",
                      enum: ['fail', 'not_available', 'pass'],
                    },
                    cardSecurityCodeMatch: {
                      type: 'string',
                      description:
                        'Indicates whether the card security code supplied in the transaction request matches the card security code recognized for that credit card number at the card issuer.',
                      enum: ['fail', 'not_available', 'pass'],
                    },
                    clientTransactionId: {
                      type: 'string',
                      description:
                        'A value returned from QBMS transactions for future use by the QuickBooks Reconciliation feature.',
                    },
                    paymentGroupingCode: {
                      type: 'number',
                      description:
                        'An internal code returned by QuickBooks Merchant Services (QBMS) from the transaction request, needed for the QuickBooks reconciliation feature.',
                    },
                    reconBatchId: {
                      type: 'string',
                      description:
                        'An internal ID returned by QuickBooks Merchant Services (QBMS) from the transaction request, needed for the QuickBooks reconciliation feature.',
                    },
                    transactionAuthorizationStamp: {
                      type: 'number',
                      description:
                        'An internal value for this credit card transaction, needed for the QuickBooks reconciliation feature.',
                    },
                  },
                  required: [
                    'creditCardTransactionId',
                    'merchantAccountNumber',
                    'paymentStatus',
                    'statusCode',
                    'statusMessage',
                    'transactionAuthorizedAt',
                  ],
                },
              },
            },
            customFields: {
              type: 'array',
              description:
                'The custom fields for the sales receipt line object, added as user-defined data extensions, not included in the standard QuickBooks object.',
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
              description: 'A description of this sales receipt line.',
            },
            inventorySiteId: {
              type: 'string',
              description:
                'The site location where inventory for the item associated with this sales receipt line is stored.',
            },
            inventorySiteLocationId: {
              type: 'string',
              description:
                'The specific location (e.g., bin or shelf) within the inventory site where the item associated with this sales receipt line is stored.',
            },
            itemId: {
              type: 'string',
              description:
                'The item associated with this sales receipt line. This can refer to any good or service that the business buys or sells, including item types such as a service item, inventory item, or special calculation item like a discount item or sales-tax item.',
            },
            lotNumber: {
              type: 'string',
              description:
                'The lot number of the item associated with this sales receipt line. Used for tracking groups of inventory items that are purchased or manufactured together.',
            },
            otherCustomField1: {
              type: 'string',
              description:
                "A built-in custom field for additional information specific to this sales receipt line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all sales receipt lines for convenience. Developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
            },
            otherCustomField2: {
              type: 'string',
              description:
                "A second built-in custom field for additional information specific to this sales receipt line. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all sales receipt lines for convenience. Like `otherCustomField1`, developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Hidden by default in the QuickBooks UI.",
            },
            overrideItemAccountId: {
              type: 'string',
              description:
                'The account to use for this sales receipt line, overriding the default account associated with the item.',
            },
            priceLevelId: {
              type: 'string',
              description:
                'The price level applied to this sales receipt line. This overrides any price level set on the corresponding customer. The resulting sales receipt line will not show this price level, only the final `rate` calculated from it.',
            },
            priceRuleConflictStrategy: {
              type: 'string',
              description:
                'Specifies how to resolve price rule conflicts when adding or modifying this sales receipt line.',
              enum: ['base_price', 'zero'],
            },
            quantity: {
              type: 'number',
              description:
                'The quantity of the item associated with this sales receipt line. This field cannot be cleared.\n\n**NOTE**: Do not use this field if the associated item is a discount item.',
            },
            rate: {
              type: 'string',
              description:
                'The price per unit for this sales receipt line. If both `rate` and `amount` are specified, `rate` will be ignored. If both `quantity` and `amount` are specified but not `rate`, QuickBooks will use them to calculate `rate`. Represented as a decimal string. This field cannot be cleared.',
            },
            ratePercent: {
              type: 'string',
              description:
                'The price of this sales receipt line expressed as a percentage. Typically used for discount or markup items.',
            },
            salesTaxCodeId: {
              type: 'string',
              description:
                'The sales-tax code for this sales receipt line, determining whether it is taxable or non-taxable. If set, this overrides any sales-tax codes defined on the parent transaction or the associated item.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
            },
            serialNumber: {
              type: 'string',
              description:
                'The serial number of the item associated with this sales receipt line. This is used for tracking individual units of serialized inventory items.',
            },
            serviceDate: {
              type: 'string',
              description:
                'The date on which the service for this sales receipt line was or will be performed, in ISO 8601 format (YYYY-MM-DD). This is particularly relevant for service items.',
              format: 'date',
            },
            unitOfMeasure: {
              type: 'string',
              description:
                "The unit-of-measure used for the `quantity` in this sales receipt line. Must be a valid unit within the item's available units of measure.",
            },
          },
        },
      },
      memo: {
        type: 'string',
        description:
          'A memo or note for this sales receipt that appears in reports, but not on the sales receipt.',
      },
      otherCustomField: {
        type: 'string',
        description:
          "A built-in custom field for additional information specific to this sales receipt. Unlike the user-defined fields in the `customFields` array, this is a standard QuickBooks field that exists for all sales receipts for convenience. Developers often use this field for tracking information that doesn't fit into other standard QuickBooks fields. Unlike `otherCustomField1` and `otherCustomField2`, which are line item fields, this exists at the transaction level. Hidden by default in the QuickBooks UI.",
      },
      paymentMethodId: {
        type: 'string',
        description:
          'The sales receipt\'s payment method (e.g., cash, check, credit card).\n\n**NOTE**: If this sales receipt contains credit card transaction data supplied from QuickBooks Merchant Services (QBMS) transaction responses, you must specify a credit card payment method (e.g., "Visa", "MasterCard", etc.).',
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this sales receipt, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user. When left blank in this create request, this field will be left blank in QuickBooks (i.e., it does *not* auto-increment).',
      },
      salesRepresentativeId: {
        type: 'string',
        description:
          "The sales receipt's sales representative. Sales representatives can be employees, vendors, or other names in QuickBooks.",
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The sales-tax code for this sales receipt, determining whether it is taxable or non-taxable. This can be overridden at the transaction-line level.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
      salesTaxItemId: {
        type: 'string',
        description:
          'The sales-tax item used to calculate the actual tax amount for this sales receipt\'s transactions by applying a specific tax rate collected for a single tax agency. Unlike `salesTaxCode`, which only indicates general taxability, this field drives the actual tax calculation and reporting.\n\nFor sales receipts, while using this field to specify a single tax item/group that applies uniformly is recommended, complex tax scenarios may require alternative approaches. In such cases, you can set this field to a 0% tax item (conventionally named "Tax Calculated On Invoice") and handle tax calculations through line items instead. When using line items for taxes, note that only individual tax items (not tax groups) can be used, subtotals can help apply a tax to multiple items but only the first tax line after a subtotal is calculated automatically (subsequent tax lines require manual amounts), and the rate column will always display the actual tax amount rather than the rate percentage.',
      },
      shipmentOrigin: {
        type: 'string',
        description:
          'The origin location from where the product associated with this sales receipt is shipped. This is the point at which ownership and liability for goods transfer from seller to buyer. Internally, QuickBooks uses the term "FOB" for this field, which stands for "freight on board". This field is informational and has no accounting implications.',
      },
      shippingAddress: {
        type: 'object',
        description: "The sales receipt's shipping address.",
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
          'The date when the products or services for this sales receipt were shipped or are expected to be shipped, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      shippingMethodId: {
        type: 'string',
        description:
          'The shipping method used for this sales receipt, such as standard mail or overnight delivery.',
      },
    },
    required: ['transactionDate', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.qbd.salesReceipts.create(body));
};

export default { metadata, tool, handler };
