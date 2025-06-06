// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.bill_check_payments',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/bill-check-payments/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_bill_check_payments',
  description: 'Updates an existing bill check payment.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the bill check payment to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the bill check payment object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      amount: {
        type: 'string',
        description: 'The monetary amount of this bill check payment, represented as a decimal string.',
      },
      applyToTransactions: {
        type: 'array',
        description:
          'The bills to be paid by this bill check payment. This will create a link between this bill check payment and the specified bills.\n\n**IMPORTANT**: In each `applyToTransactions` object, you must specify either `paymentAmount`, `applyCredits`, `discountAmount`, or any combination of these; if none of these are specified, you will receive an error for an empty transaction.\n\n**IMPORTANT**: The target bill must have `isPaid=false`, otherwise, QuickBooks will report this object as "cannot be found".',
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
      bankAccountId: {
        type: 'string',
        description:
          'The bank account from which the funds are being drawn for this bill check payment; e.g., Checking or Savings. This bill check payment will decrease the balance of this account.',
      },
      exchangeRate: {
        type: 'number',
        description:
          "The market exchange rate between this bill check payment's currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).",
      },
      isQueuedForPrint: {
        type: 'boolean',
        description:
          'Indicates whether this bill check payment is included in the queue of documents for QuickBooks to print.',
      },
      memo: {
        type: 'string',
        description: 'A memo or note for this bill check payment.',
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this bill check payment, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user.\n\n**IMPORTANT**: For checks, this field is the check number.',
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this bill check payment, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
    },
  },
};

export const handler = async (client: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await client.qbd.billCheckPayments.update(id, body));
};

export default { metadata, tool, handler };
