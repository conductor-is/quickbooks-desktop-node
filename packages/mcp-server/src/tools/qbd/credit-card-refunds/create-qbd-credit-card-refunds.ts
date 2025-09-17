// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.credit_card_refunds',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/credit-card-refunds',
};

export const tool: Tool = {
  name: 'create_qbd_credit_card_refunds',
  description:
    'Creates a credit card refund linked to one or more existing credit transactions, such as credit memos or overpayments. You must supply at least one entry in `refundAppliedToTransactions`, and the refund amount cannot exceed the available balance on the linked credits.',
  inputSchema: {
    type: 'object',
    properties: {
      customerId: {
        type: 'string',
        description: 'The customer or customer-job associated with this credit card refund.',
      },
      refundAppliedToTransactions: {
        type: 'array',
        description:
          "The credit transactions to refund in this credit card refund. Each entry links this credit card refund to an existing credit (for example, a credit memo or unused receive-payment credit).\n\n**IMPORTANT**: The `refundAmount` for each linked credit cannot exceed that credit's remaining balance, and the combined `refundAmount` across all links cannot exceed this credit card refund's `totalAmount`.",
        items: {
          type: 'object',
          properties: {
            refundAmount: {
              type: 'string',
              description:
                'The monetary amount to refund from the linked credit transaction within this credit transaction, represented as a decimal string.',
            },
            transactionId: {
              type: 'string',
              description: 'The ID of the credit transaction being refunded by this credit card refund.',
            },
          },
          required: ['refundAmount', 'transactionId'],
        },
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this credit card refund, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      address: {
        type: 'object',
        description: 'The address that is printed on the credit card refund.',
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
      creditCardTransaction: {
        type: 'object',
        description:
          "The credit card transaction data for this credit card refund's payment when using QuickBooks Merchant Services (QBMS). If specifying this field, you must also specify the `paymentMethod` field.",
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
      exchangeRate: {
        type: 'number',
        description:
          "The market exchange rate between this credit card refund's currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).",
      },
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
      },
      memo: {
        type: 'string',
        description: 'A memo or note for this credit card refund.',
      },
      paymentMethodId: {
        type: 'string',
        description:
          'The credit card refund\'s payment method (e.g., cash, check, credit card).\n\n**NOTE**: If this credit card refund contains credit card transaction data supplied from QuickBooks Merchant Services (QBMS) transaction responses, you must specify a credit card payment method (e.g., "Visa", "MasterCard", etc.).',
      },
      receivablesAccountId: {
        type: 'string',
        description:
          'The Accounts-Receivable (A/R) account to which this credit card refund is assigned, used to track the amount owed. If not specified, QuickBooks Desktop will use its default A/R account.\n\n**IMPORTANT**: If this credit card refund is linked to other transactions, this A/R account must match the `receivablesAccount` used in all linked transactions. For example, when refunding a credit card payment, the A/R account must match the one used in each linked credit transaction being refunded.',
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this credit card refund, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user. When left blank in this create request, this field will be left blank in QuickBooks (i.e., it does *not* auto-increment).',
      },
      refundFromAccountId: {
        type: 'string',
        description:
          'The account providing funds for this credit card refund. This is typically the Undeposited Funds account used to hold customer payments. If omitted, QuickBooks Desktop will use the default Undeposited Funds account.',
      },
    },
    required: ['customerId', 'refundAppliedToTransactions', 'transactionDate', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.qbd.creditCardRefunds.create(body));
};

export default { metadata, tool, handler };
