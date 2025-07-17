// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.transactions',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/transactions',
};

export const tool: Tool = {
  name: 'list_qbd_transactions',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSearches across all transaction types. Unlike transaction-specific queries, this endpoint only returns fields common to all transaction types, such as ID, type, dates, account, and reference numbers. For more details specific to that transaction type, make a subsequent call to the relevant transaction-specific endpoint (such as invoices, bills, etc.). NOTE: This endpoint does not support time tracking activities.",
  inputSchema: {
    type: 'object',
    properties: {
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      accountIds: {
        type: 'array',
        description:
          'Filter for transactions associated with these accounts.\n\n**NOTE**: To filter on transaction lines, you must specify the `transactionDetailLevel` parameter as `all` or `transaction_lines_only`.',
        items: {
          type: 'string',
        },
      },
      classIds: {
        type: 'array',
        description:
          'Filter for transactions of these classes. A class is a way end-users can categorize transactions in QuickBooks.\n\n**NOTE**: To filter on transaction lines, you must specify the `transactionDetailLevel` parameter as `all` or `transaction_lines_only`.',
        items: {
          type: 'string',
        },
      },
      currencyIds: {
        type: 'array',
        description: 'Filter for transactions in these currencies.',
        items: {
          type: 'string',
        },
      },
      cursor: {
        type: 'string',
        description:
          'The pagination token to fetch the next set of results when paginating with the `limit` parameter. Do not include this parameter on the first call. Use the `nextCursor` value returned in the previous response to request subsequent results.',
      },
      detailLevel: {
        type: 'string',
        description:
          'Specify whether to return all matching transaction and transaction-line objects (`all`), only transaction objects (`transactions_without_lines`, the default), or only transaction-line objects (`transaction_lines_only`.',
        enum: ['all', 'transaction_lines_only', 'transactions_without_lines'],
      },
      entityIds: {
        type: 'array',
        description:
          'Filter for transactions associated with these entities (customers, vendors, employees, etc.).\n\n**NOTE**: To filter on transaction lines, you must specify the `transactionDetailLevel` parameter as `all` or `transaction_lines_only`.',
        items: {
          type: 'string',
        },
      },
      ids: {
        type: 'array',
        description:
          'Filter for specific transactions by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.\n\n**NOTE**: You cannot supply the ID of a time tracking activity to this request. If you do, you get an error stating that no such record could be found, even though the transaction is in QuickBooks. This limitation is enforced by QuickBooks.',
        items: {
          type: 'string',
        },
      },
      itemIds: {
        type: 'array',
        description:
          'Filter for transactions associated with these items.\n\n**NOTE**: To filter on transaction lines, you must specify the `transactionDetailLevel` parameter as `all` or `transaction_lines_only`.',
        items: {
          type: 'string',
        },
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of objects to return. Accepts values ranging from 1 to 150, defaults to 150. When used with cursor-based pagination, this parameter controls how many results are returned per page. To paginate through results, combine this with the `cursor` parameter. Each response will include a `nextCursor` value that can be passed to subsequent requests to retrieve the next page of results.',
      },
      paymentStatus: {
        type: 'string',
        description:
          'Filter for transactions that are open, closed, or either. Open transactions have a remaining balance, such as credits not fully applied or invoices not fully paid.',
        enum: ['closed', 'either', 'open'],
      },
      postingStatus: {
        type: 'string',
        description:
          'Filter for transactions that are posting, non-posting, or either. Posting status refers to whether QuickBooks records the transaction in an account register.',
        enum: ['either', 'non_posting', 'posting'],
      },
      refNumberContains: {
        type: 'string',
        description:
          'Filter for transactions whose `refNumber` contains this substring.\n\n**NOTE**: If you use this parameter, you cannot also use `refNumberStartsWith` or `refNumberEndsWith`.',
      },
      refNumberEndsWith: {
        type: 'string',
        description:
          'Filter for transactions whose `refNumber` ends with this substring.\n\n**NOTE**: If you use this parameter, you cannot also use `refNumberContains` or `refNumberStartsWith`.',
      },
      refNumberFrom: {
        type: 'string',
        description:
          'Filter for transactions whose `refNumber` is greater than or equal to this value. If omitted, the range will begin with the first number of the list. Uses a numerical comparison for values that contain only digits; otherwise, uses a lexicographical comparison.',
      },
      refNumbers: {
        type: 'array',
        description:
          'Filter for specific transactions by their ref-number(s), case-sensitive. In QuickBooks, ref-numbers are not required to be unique and can be arbitrarily changed by the QuickBooks user.\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      refNumberStartsWith: {
        type: 'string',
        description:
          'Filter for transactions whose `refNumber` starts with this substring.\n\n**NOTE**: If you use this parameter, you cannot also use `refNumberContains` or `refNumberEndsWith`.',
      },
      refNumberTo: {
        type: 'string',
        description:
          'Filter for transactions whose `refNumber` is less than or equal to this value. If omitted, the range will end with the last number of the list. Uses a numerical comparison for values that contain only digits; otherwise, uses a lexicographical comparison.',
      },
      transactionDateFrom: {
        type: 'string',
        description:
          'Filter for transactions whose `date` field is on or after this date, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      transactionDateTo: {
        type: 'string',
        description:
          'Filter for transactions whose `date` field is on or before this date, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      transactionType: {
        type: 'array',
        description:
          'Filter for transactions by their type. You can specify one or more transaction types.\n\n**NOTE**: Filtering for time tracking activities is not supported by QuickBooks for this endpoint.',
        items: {
          type: 'string',
          enum: [
            'all',
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
            'liability_adjustment',
            'paycheck',
            'payroll_liability_check',
            'purchase_order',
            'receive_payment',
            'sales_order',
            'sales_receipt',
            'sales_tax_payment_check',
            'transfer',
            'vendor_credit',
            'ytd_adjustment',
          ],
        },
      },
      updatedAfter: {
        type: 'string',
        description:
          'Filter for transactions updated on or after this date and time, in ISO 8601 format (YYYY-MM-DDTHH:mm:ss). If you only provide a date (YYYY-MM-DD), the time is assumed to be 00:00:00 of that day.',
      },
      updatedBefore: {
        type: 'string',
        description:
          'Filter for transactions updated on or before this date and time, in ISO 8601 format (YYYY-MM-DDTHH:mm:ss). If you only provide a date (YYYY-MM-DD), the time is assumed to be 23:59:59 of that day.',
      },
    },
    required: ['conductorEndUserId'],
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await conductor.qbd.transactions.list(body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
