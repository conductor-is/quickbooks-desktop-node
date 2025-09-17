// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.receive_payments',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/receive-payments',
};

export const tool: Tool = {
  name: 'create_qbd_receive_payments',
  description:
    'Records a customer payment and optionally applies it to specific invoices or credits. All allocations must target the same accounts receivable account as those invoices, and each one has to include a payment amount, discount, or credit so QuickBooks can close out the balance.',
  inputSchema: {
    type: 'object',
    properties: {
      customerId: {
        type: 'string',
        description:
          'The customer or customer-job to which the payment for this receive-payment is credited.',
      },
      totalAmount: {
        type: 'string',
        description:
          'The total monetary amount of this receive-payment, represented as a decimal string.\n\n**NOTE**: The sum of the `paymentAmount` amounts in the `applyToTransactions` array cannot exceed the `totalAmount`, or you will receive an error.',
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this receive-payment, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      applyToTransactions: {
        type: 'array',
        description:
          'The invoices to be paid by this receive-payment. This will create a link between this receive-payment and the specified invoices.\n\n**IMPORTANT**: In each `applyToTransactions` object, you must specify either `paymentAmount`, `applyCredits`, `discountAmount`, or any combination of these; if none of these are specified, you will receive an error for an empty transaction.\n\n**IMPORTANT**: The target invoice must have `isPaid=false`, otherwise, QuickBooks will report this object as "cannot be found".\n\n**NOTE**: You must specify either `isAutoApply` or `applyToTransactions` when creating a receive-payment, but never both.',
        items: {
          type: 'object',
          properties: {
            transactionId: {
              type: 'string',
              description: 'The ID of the receivable transaction to which this payment is applied.',
            },
            applyCredits: {
              type: 'array',
              description:
                "Credit memos to apply to this receivable transaction, reducing its balance. This creates a link between this receivable transaction and the specified credit memos.\n\n**IMPORTANT**: By default, QuickBooks will not return any information about the linked transactions in this endpoint's response even when this request is successful. To see the transactions linked via this field, refetch the receivable transaction and check the `linkedTransactions` response field. If fetching a list of receivable transactions, you must also specify the parameter `includeLinkedTransactions=true` to see the `linkedTransactions` response field.",
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
            discountAccountId: {
              type: 'string',
              description: "The financial account used to track this receivable transaction's discount.",
            },
            discountAmount: {
              type: 'string',
              description:
                "The monetary amount by which to reduce the receivable transaction's receivable amount, represented as a decimal string.",
            },
            discountClassId: {
              type: 'string',
              description: "The class used to track this receivable transaction's discount.",
            },
            paymentAmount: {
              type: 'string',
              description:
                'The monetary amount to apply to the receivable transaction, represented as a decimal string.',
            },
          },
          required: ['transactionId'],
        },
      },
      creditCardTransaction: {
        type: 'object',
        description:
          "The credit card transaction data for this receive-payment's payment when using QuickBooks Merchant Services (QBMS). If specifying this field, you must also specify the `paymentMethod` field.",
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
      depositToAccountId: {
        type: 'string',
        description:
          'The account where the funds for this receive-payment will be or have been deposited. If omitted, QuickBooks will use the default Undeposited Funds account.',
      },
      exchangeRate: {
        type: 'number',
        description:
          "The market exchange rate between this receive-payment's currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).",
      },
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
      },
      isAutoApply: {
        type: 'boolean',
        description:
          "When `true`, QuickBooks applies `totalAmount` to any outstanding transaction that exactly matches `totalAmount`. If no exact match is found, this receive-payment is applied to the oldest outstanding transaction for the customer-job. When `false`, QuickBooks records the payment but does not apply it to any specific transaction, causing the amount to appear as a credit on the customer-job's next transaction.\n\n**IMPORTANT**: You must specify either `isAutoApply` or `applyToTransactions` when creating a receive-payment, but never both.",
      },
      memo: {
        type: 'string',
        description:
          'A memo or note for this receive-payment that will be displayed at the beginning of reports containing details about this receive-payment.',
      },
      paymentMethodId: {
        type: 'string',
        description:
          'The receive-payment\'s payment method (e.g., cash, check, credit card).\n\n**NOTE**: If this receive-payment contains credit card transaction data supplied from QuickBooks Merchant Services (QBMS) transaction responses, you must specify a credit card payment method (e.g., "Visa", "MasterCard", etc.).',
      },
      receivablesAccountId: {
        type: 'string',
        description:
          'The Accounts-Receivable (A/R) account to which this receive-payment is assigned, used to track the amount owed. If not specified, QuickBooks Desktop will use its default A/R account.\n\n**IMPORTANT**: If this receive-payment is linked to other transactions, this A/R account must match the `receivablesAccount` used in all linked transactions.',
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this receive-payment, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user. When left blank in this create request, this field will be left blank in QuickBooks (i.e., it does *not* auto-increment).',
      },
    },
    required: ['customerId', 'totalAmount', 'transactionDate', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.qbd.receivePayments.create(body));
};

export default { metadata, tool, handler };
