// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.bill_credit_card_payments',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/bill-credit-card-payments',
};

export const tool: Tool = {
  name: 'create_qbd_bill_credit_card_payments',
  description:
    'Charges one vendor’s bills to a credit card account. Each bill allocation must supply a payment amount, discount, or credit, and you have to use the same accounts payable account that’s on the bills being closed.',
  inputSchema: {
    type: 'object',
    properties: {
      applyToTransactions: {
        type: 'array',
        description:
          'The bills to be paid by this bill credit card payment. This will create a link between this bill credit card payment and the specified bills.\n\n**IMPORTANT**: In each `applyToTransactions` object, you must specify either `paymentAmount`, `applyCredits`, `discountAmount`, or any combination of these; if none of these are specified, you will receive an error for an empty transaction.\n\n**IMPORTANT**: The target bill must have `isPaid=false`, otherwise, QuickBooks will report this object as "cannot be found".',
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
      creditCardAccountId: {
        type: 'string',
        description:
          'The credit card account to which this bill credit card payment is being charged. This bill credit card payment will decrease the balance of this account.',
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this bill credit card payment, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      vendorId: {
        type: 'string',
        description:
          'The vendor who sent the bill(s) that this bill credit card payment is paying and who will receive this payment.\n\n**IMPORTANT**: This vendor must match the `vendor` on the bill(s) specified in `applyToTransactions`; otherwise, QuickBooks will say the `transactionId` in `applyToTransactions` "does not exist".',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      exchangeRate: {
        type: 'number',
        description:
          "The market exchange rate between this bill credit card payment's currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).",
      },
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
      },
      memo: {
        type: 'string',
        description: 'A memo or note for this bill credit card payment.',
      },
      payablesAccountId: {
        type: 'string',
        description:
          'The Accounts-Payable (A/P) account to which this bill credit card payment is assigned, used to track the amount owed. If not specified, QuickBooks Desktop will use its default A/P account.\n\n**IMPORTANT**: If this bill credit card payment is linked to other transactions, this A/P account must match the `payablesAccount` used in those other transactions.',
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this bill credit card payment, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user. When left blank in this create request, this field will be left blank in QuickBooks (i.e., it does *not* auto-increment).',
      },
    },
    required: [
      'applyToTransactions',
      'creditCardAccountId',
      'transactionDate',
      'vendorId',
      'conductorEndUserId',
    ],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.qbd.billCreditCardPayments.create(body));
};

export default { metadata, tool, handler };
