// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.deleted_transactions',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/deleted-transactions',
};

export const tool: Tool = {
  name: 'list_qbd_deleted_transactions',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nLists deleted transactions of the specified type(s) (e.g., invoice, bill, estimate) in the last 90 days. Results are grouped by transaction type and ordered by actual delete time (ascending). NOTE: For deleted non-transaction list-objects (e.g., customer, vendor, employee), see the deleted-list-objects endpoint.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'The array of deleted transactions.',\n      items: {\n        $ref: '#/$defs/deleted_transaction'\n      }\n    },\n    objectType: {\n      type: 'string',\n      description: 'The type of object. This value is always `\"list\"`.',\n      enum: [        'list'\n      ]\n    },\n    url: {\n      type: 'string',\n      description: 'The endpoint URL where this list can be accessed.'\n    }\n  },\n  required: [    'data',\n    'objectType',\n    'url'\n  ],\n  $defs: {\n    deleted_transaction: {\n      type: 'object',\n      title: 'The Deleted Transaction object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this deleted transaction. This ID is unique across all transaction types.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this deleted transaction was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user\\'s time zone in QuickBooks.'\n        },\n        deletedAt: {\n          type: 'string',\n          description: 'The date and time when this deleted transaction was deleted, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user\\'s time zone in QuickBooks.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_deleted_transaction\"`.',\n          enum: [            'qbd_deleted_transaction'\n          ]\n        },\n        refNumber: {\n          type: 'string',\n          description: 'The case-sensitive user-defined reference number for this deleted transaction, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user.'\n        },\n        transactionType: {\n          type: 'string',\n          description: 'The type of deleted transaction.',\n          enum: [            'ar_refund_credit_card',\n            'bill',\n            'bill_payment_check',\n            'bill_payment_credit_card',\n            'build_assembly',\n            'charge',\n            'check',\n            'credit_card_charge',\n            'credit_card_credit',\n            'credit_memo',\n            'deposit',\n            'estimate',\n            'inventory_adjustment',\n            'invoice',\n            'item_receipt',\n            'journal_entry',\n            'purchase_order',\n            'receive_payment',\n            'sales_order',\n            'sales_receipt',\n            'sales_tax_payment_check',\n            'time_tracking',\n            'transfer_inventory',\n            'vehicle_mileage',\n            'vendor_credit'\n          ]\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'deletedAt',\n        'objectType',\n        'refNumber',\n        'transactionType'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      transactionTypes: {
        type: 'array',
        description: 'Filter for deleted transactions by their transaction type(s).',
        items: {
          type: 'string',
          enum: [
            'ar_refund_credit_card',
            'bill',
            'bill_payment_check',
            'bill_payment_credit_card',
            'build_assembly',
            'charge',
            'check',
            'credit_card_charge',
            'credit_card_credit',
            'credit_memo',
            'deposit',
            'estimate',
            'inventory_adjustment',
            'invoice',
            'item_receipt',
            'journal_entry',
            'purchase_order',
            'receive_payment',
            'sales_order',
            'sales_receipt',
            'sales_tax_payment_check',
            'time_tracking',
            'transfer_inventory',
            'vehicle_mileage',
            'vendor_credit',
          ],
        },
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      deletedAfter: {
        type: 'string',
        description:
          'Filter for deleted transactions deleted on or after this date/time, within the last 90 days (QuickBooks limit). Format: ISO 8601. Accepts date-only (YYYY-MM-DD), datetime without timezone (YYYY-MM-DDTHH:mm:ss), or datetime with timezone (YYYY-MM-DDTHH:mm:ss±HH:mm). **NOTE**: Date-only and timezone-less datetimes are passed through for QuickBooks Desktop to interpret in the QuickBooks Desktop host machine’s local timezone. If the datetime includes a timezone (e.g., `+05:30` or `Z`), QuickBooks Desktop uses that timezone to interpret the timestamp.',
      },
      deletedBefore: {
        type: 'string',
        description:
          'Filter for deleted transactions deleted on or before this date/time, within the last 90 days (QuickBooks limit). Format: ISO 8601. Accepts date-only (YYYY-MM-DD), datetime without timezone (YYYY-MM-DDTHH:mm:ss), or datetime with timezone (YYYY-MM-DDTHH:mm:ss±HH:mm). **NOTE**: Date-only and timezone-less datetimes are passed through for QuickBooks Desktop to interpret in the QuickBooks Desktop host machine’s local timezone. If the datetime includes a timezone (e.g., `+05:30` or `Z`), QuickBooks Desktop uses that timezone to interpret the timestamp.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['transactionTypes', 'conductorEndUserId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await conductor.qbd.deletedTransactions.list(body)),
  );
};

export default { metadata, tool, handler };
