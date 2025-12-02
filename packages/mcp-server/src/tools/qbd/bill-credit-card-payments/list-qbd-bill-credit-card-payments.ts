// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.bill_credit_card_payments',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/bill-credit-card-payments',
};

export const tool: Tool = {
  name: 'list_qbd_bill_credit_card_payments',
  description:
    'Returns a list of bill credit card payments. Use the `cursor` parameter to paginate through the results.',
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
        description: 'Filter for bill credit card payments associated with these accounts.',
        items: {
          type: 'string',
        },
      },
      currencyIds: {
        type: 'array',
        description: 'Filter for bill credit card payments in these currencies.',
        items: {
          type: 'string',
        },
      },
      cursor: {
        type: 'string',
        description:
          'The pagination token to fetch the next set of results when paginating with the `limit` parameter. Do not include this parameter on the first call. Use the `nextCursor` value returned in the previous response to request subsequent results.',
      },
      ids: {
        type: 'array',
        description:
          'Filter for specific bill credit card payments by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      includeLineItems: {
        type: 'boolean',
        description: 'Whether to include line items in the response. Defaults to `true`.',
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of objects to return. Accepts values ranging from 1 to 150, defaults to 150. When used with cursor-based pagination, this parameter controls how many results are returned per page. To paginate through results, combine this with the `cursor` parameter. Each response will include a `nextCursor` value that can be passed to subsequent requests to retrieve the next page of results.',
      },
      refNumberContains: {
        type: 'string',
        description:
          'Filter for bill credit card payments whose `refNumber` contains this substring.\n\n**NOTE**: If you use this parameter, you cannot also use `refNumberStartsWith` or `refNumberEndsWith`.',
      },
      refNumberEndsWith: {
        type: 'string',
        description:
          'Filter for bill credit card payments whose `refNumber` ends with this substring.\n\n**NOTE**: If you use this parameter, you cannot also use `refNumberContains` or `refNumberStartsWith`.',
      },
      refNumberFrom: {
        type: 'string',
        description:
          'Filter for bill credit card payments whose `refNumber` is greater than or equal to this value. If omitted, the range will begin with the first number of the list. Uses a numerical comparison for values that contain only digits; otherwise, uses a lexicographical comparison.',
      },
      refNumbers: {
        type: 'array',
        description:
          'Filter for specific bill credit card payments by their ref-number(s), case-sensitive. In QuickBooks, ref-numbers are not required to be unique and can be arbitrarily changed by the QuickBooks user.\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      refNumberStartsWith: {
        type: 'string',
        description:
          'Filter for bill credit card payments whose `refNumber` starts with this substring.\n\n**NOTE**: If you use this parameter, you cannot also use `refNumberContains` or `refNumberEndsWith`.',
      },
      refNumberTo: {
        type: 'string',
        description:
          'Filter for bill credit card payments whose `refNumber` is less than or equal to this value. If omitted, the range will end with the last number of the list. Uses a numerical comparison for values that contain only digits; otherwise, uses a lexicographical comparison.',
      },
      transactionDateFrom: {
        type: 'string',
        description:
          "Filter for bill credit card payments whose `date` field is on or after this date, in ISO 8601 format (YYYY-MM-DD).\n\n**NOTE:** QuickBooks Desktop interprets this date as the **start of the specified day** in the local timezone of the end-user's computer (e.g., `2025-01-01` → `2025-01-01T00:00:00`).",
        format: 'date',
      },
      transactionDateTo: {
        type: 'string',
        description:
          "Filter for bill credit card payments whose `date` field is on or before this date, in ISO 8601 format (YYYY-MM-DD).\n\n**NOTE:** QuickBooks Desktop interprets this date as the **end of the specified day** in the local timezone of the end-user's computer (e.g., `2025-01-01` → `2025-01-01T23:59:59`).",
        format: 'date',
      },
      updatedAfter: {
        type: 'string',
        description:
          "Filter for bill credit card payments updated on or after this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the **start of the specified day** in the local timezone of the end-user's computer (e.g., `2025-01-01` → `2025-01-01T00:00:00`).\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop interprets the timestamp in the local timezone of the end-user's computer.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop interprets the timestamp using the specified timezone.",
      },
      updatedBefore: {
        type: 'string',
        description:
          "Filter for bill credit card payments updated on or before this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the **end of the specified day** in the local timezone of the end-user's computer (e.g., `2025-01-01` → `2025-01-01T23:59:59`).\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop interprets the timestamp in the local timezone of the end-user's computer.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop interprets the timestamp using the specified timezone.",
      },
      vendorIds: {
        type: 'array',
        description:
          'Filter for bill credit card payments sent to these vendors. These are the vendors who sent the bills paid by these credit card payments.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['conductorEndUserId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await conductor.qbd.billCreditCardPayments.list(body).asResponse();
  try {
    return asTextContentResult(await response.json());
  } catch (error) {
    if (error instanceof Conductor.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
