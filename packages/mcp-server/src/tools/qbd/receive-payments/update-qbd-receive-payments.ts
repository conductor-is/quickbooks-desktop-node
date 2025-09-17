// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.receive_payments',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/receive-payments/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_receive_payments',
  description:
    'Updates a received payment. When you resubmit applications to invoices, keep them on the same accounts receivable account and include the payment amount, discount, or credit on every allocation you send.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the receive-payment to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the receive-payment object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      applyToTransactions: {
        type: 'array',
        description:
          'The invoices to be paid by this receive-payment. This will create a link between this receive-payment and the specified invoices.\n\n**IMPORTANT**: In each `applyToTransactions` object, you must specify either `paymentAmount`, `applyCredits`, `discountAmount`, or any combination of these; if none of these are specified, you will receive an error for an empty transaction.\n\n**IMPORTANT**: The target invoice must have `isPaid=false`, otherwise, QuickBooks will report this object as "cannot be found".',
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
              address: {
                type: 'string',
                description: "The card's billing address.",
              },
              commercialCardCode: {
                type: 'string',
                description:
                  'The commercial card code identifies the type of business credit card being used (purchase, corporate, or business) for Visa and Mastercard transactions only. When provided, this code may qualify the transaction for lower processing fees compared to the standard rates that apply when no code is specified.',
              },
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
          },
          response: {
            type: 'object',
            description:
              'The transaction response data for this credit card transaction when using QuickBooks Merchant Services (QBMS).',
            properties: {
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
              paymentGroupingCode: {
                type: 'number',
                description:
                  'An internal code returned by QuickBooks Merchant Services (QBMS) from the transaction request, needed for the QuickBooks reconciliation feature.',
              },
              paymentStatus: {
                type: 'string',
                description:
                  'Indicates whether this credit card transaction is known to have been successfully processed by the card issuer.',
                enum: ['completed', 'unknown'],
              },
              reconBatchId: {
                type: 'string',
                description:
                  'An internal ID returned by QuickBooks Merchant Services (QBMS) from the transaction request, needed for the QuickBooks reconciliation feature.',
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
              transactionAuthorizationStamp: {
                type: 'number',
                description:
                  'An internal value for this credit card transaction, needed for the QuickBooks reconciliation feature.',
              },
              transactionAuthorizedAt: {
                type: 'string',
                description:
                  'The date and time when the credit card processor authorized this credit card transaction.',
              },
            },
          },
        },
      },
      customerId: {
        type: 'string',
        description:
          'The customer or customer-job to which the payment for this receive-payment is credited.',
      },
      depositToAccountId: {
        type: 'string',
        description: 'The account where the funds for this receive-payment will be or have been deposited.',
      },
      exchangeRate: {
        type: 'number',
        description:
          "The market exchange rate between this receive-payment's currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).",
      },
      memo: {
        type: 'string',
        description:
          'A memo or note for this receive-payment that will be displayed at the beginning of reports containing details about this receive-payment.',
      },
      paymentMethodId: {
        type: 'string',
        description: "The receive-payment's payment method (e.g., cash, check, credit card).",
      },
      receivablesAccountId: {
        type: 'string',
        description:
          'The Accounts-Receivable (A/R) account to which this receive-payment is assigned, used to track the amount owed. If not specified, QuickBooks Desktop will use its default A/R account.\n\n**IMPORTANT**: If this receive-payment is linked to other transactions, this A/R account must match the `receivablesAccount` used in all linked transactions.',
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this receive-payment, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user.',
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
    },
    required: ['id', 'revisionNumber', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.receivePayments.update(id, body));
};

export default { metadata, tool, handler };
