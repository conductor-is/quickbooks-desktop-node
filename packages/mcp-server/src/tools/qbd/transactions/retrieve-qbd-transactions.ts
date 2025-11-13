// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.transactions',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/transactions/{id}',
};

export const tool: Tool = {
  name: 'retrieve_qbd_transactions',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieves a transaction by ID.\n\n**IMPORTANT:** If you need to fetch multiple specific transactions by ID, use the list endpoint instead with the `ids` parameter. It accepts an array of IDs so you can batch the request into a single call, which is significantly faster.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/transaction',\n  $defs: {\n    transaction: {\n      type: 'object',\n      title: 'The Transaction object',\n      properties: {\n        account: {\n          type: 'object',\n          description: 'The account associated with this transaction.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        amount: {\n          type: 'string',\n          description: 'The monetary amount of this transaction, represented as a decimal string.'\n        },\n        amountInHomeCurrency: {\n          type: 'string',\n          description: 'The monetary amount of this transaction converted to the home currency of the QuickBooks company file. Represented as a decimal string.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this transaction was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        currency: {\n          type: 'object',\n          description: 'The transaction\\'s currency. For built-in currencies, the name and code are standard international values. For user-defined currencies, all values are editable.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        entity: {\n          type: 'object',\n          description: 'The customer, vendor, employee, or person on QuickBooks\\'s \"Other Names\" list associated with this transaction.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        exchangeRate: {\n          type: 'number',\n          description: 'The market exchange rate between this transaction\\'s currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).'\n        },\n        memo: {\n          type: 'string',\n          description: 'A memo or note for this transaction.'\n        },\n        refNumber: {\n          type: 'string',\n          description: 'The case-sensitive user-defined reference number for this transaction, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user.'\n        },\n        transactionDate: {\n          type: 'string',\n          description: 'The date of this transaction, in ISO 8601 format (YYYY-MM-DD).',\n          format: 'date'\n        },\n        transactionId: {\n          type: 'string',\n          description: 'The QuickBooks-assigned unique identifier of this transaction. If `transactionLineId` is also defined, this is the identifier of the line\\'s parent transaction object.'\n        },\n        transactionLineId: {\n          type: 'string',\n          description: 'The QuickBooks-assigned unique identifier of this transaction line. If `null`, this result is a transaction object.'\n        },\n        transactionType: {\n          type: 'string',\n          description: 'The type of transaction.',\n          enum: [            'ar_refund_credit_card',\n            'bill',\n            'bill_payment_check',\n            'bill_payment_credit_card',\n            'build_assembly',\n            'charge',\n            'check',\n            'credit_card_charge',\n            'credit_card_credit',\n            'credit_memo',\n            'deposit',\n            'estimate',\n            'inventory_adjustment',\n            'invoice',\n            'item_receipt',\n            'journal_entry',\n            'liability_adjustment',\n            'paycheck',\n            'payroll_liability_check',\n            'purchase_order',\n            'receive_payment',\n            'sales_order',\n            'sales_receipt',\n            'sales_tax_payment_check',\n            'transfer',\n            'vendor_credit',\n            'ytd_adjustment'\n          ]\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this transaction was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        }\n      },\n      required: [        'account',\n        'amount',\n        'amountInHomeCurrency',\n        'createdAt',\n        'currency',\n        'entity',\n        'exchangeRate',\n        'memo',\n        'refNumber',\n        'transactionDate',\n        'transactionId',\n        'transactionLineId',\n        'transactionType',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the transaction to retrieve.',
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id', 'Conductor-End-User-Id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await conductor.qbd.transactions.retrieve(id, body)),
    );
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
