// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.checks',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/checks',
};

export const tool: Tool = {
  name: 'list_qbd_checks',
  description: 'Returns a list of checks. Use the `cursor` parameter to paginate through the results.',
  inputSchema: {
    type: 'object',
    properties: {
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      accountIds: {
        type: 'array',
        description: 'Filter for checks associated with these accounts.',
        items: {
          type: 'string',
        },
      },
      currencyIds: {
        type: 'array',
        description: 'Filter for checks in these currencies.',
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
          'Filter for specific checks by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      includeLineItems: {
        type: 'boolean',
        description: 'Whether to include line items in the response. Defaults to `true`.',
      },
      includeLinkedTransactions: {
        type: 'boolean',
        description:
          'Whether to include linked transactions in the response. Defaults to `false`. For example, a payment linked to the corresponding check.',
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of objects to return. Accepts values ranging from 1 to 150, defaults to 150. When used with cursor-based pagination, this parameter controls how many results are returned per page. To paginate through results, combine this with the `cursor` parameter. Each response will include a `nextCursor` value that can be passed to subsequent requests to retrieve the next page of results.',
      },
      payeeIds: {
        type: 'array',
        description:
          'Filter for checks addressed to these payees. These are the people or companies who will receive these checks.',
        items: {
          type: 'string',
        },
      },
      refNumberContains: {
        type: 'string',
        description:
          'Filter for checks whose `refNumber` contains this substring. (For checks, this field is the check number.)\n\n**NOTE**: If you use this parameter, you cannot also use `refNumberStartsWith` or `refNumberEndsWith`.',
      },
      refNumberEndsWith: {
        type: 'string',
        description:
          'Filter for checks whose `refNumber` ends with this substring. (For checks, this field is the check number.)\n\n**NOTE**: If you use this parameter, you cannot also use `refNumberContains` or `refNumberStartsWith`.',
      },
      refNumberFrom: {
        type: 'string',
        description:
          'Filter for checks whose `refNumber` is greater than or equal to this value. (For checks, this field is the check number.) If omitted, the range will begin with the first number of the list. Uses a numerical comparison for values that contain only digits; otherwise, uses a lexicographical comparison.',
      },
      refNumbers: {
        type: 'array',
        description:
          'Filter for specific checks by their ref-number(s), case-sensitive. In QuickBooks, ref-numbers are not required to be unique and can be arbitrarily changed by the QuickBooks user.\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      refNumberStartsWith: {
        type: 'string',
        description:
          'Filter for checks whose `refNumber` starts with this substring. (For checks, this field is the check number.)\n\n**NOTE**: If you use this parameter, you cannot also use `refNumberContains` or `refNumberEndsWith`.',
      },
      refNumberTo: {
        type: 'string',
        description:
          'Filter for checks whose `refNumber` is less than or equal to this value. (For checks, this field is the check number.) If omitted, the range will end with the last number of the list. Uses a numerical comparison for values that contain only digits; otherwise, uses a lexicographical comparison.',
      },
      transactionDateFrom: {
        type: 'string',
        description:
          "Filter for checks whose `date` field is on or after this date, in ISO 8601 format (YYYY-MM-DD).\n\n**NOTE**: QuickBooks Desktop interprets date-only values in the local timezone of the end-user's computer (i.e., midnight in that timezone).",
        format: 'date',
      },
      transactionDateTo: {
        type: 'string',
        description:
          "Filter for checks whose `date` field is on or before this date, in ISO 8601 format (YYYY-MM-DD).\n\n**NOTE**: QuickBooks Desktop interprets date-only values in the local timezone of the end-user's computer (i.e., midnight in that timezone).",
        format: 'date',
      },
      updatedAfter: {
        type: 'string',
        description:
          "Filter for checks updated on or after this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets this as midnight in the local timezone of the end-user's computer.\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop uses the local timezone of the end-user's computer to interpret the timestamp.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop uses this timezone to interpret the timestamp.",
      },
      updatedBefore: {
        type: 'string',
        description:
          "Filter for checks updated on or before this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets this as midnight in the local timezone of the end-user's computer.\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop uses the local timezone of the end-user's computer to interpret the timestamp.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop uses this timezone to interpret the timestamp.",
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
  const response = await conductor.qbd.checks.list(body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
