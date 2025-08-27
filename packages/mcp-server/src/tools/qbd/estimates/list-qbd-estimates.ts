// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.estimates',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/estimates',
};

export const tool: Tool = {
  name: 'list_qbd_estimates',
  description: 'Returns a list of estimates. Use the `cursor` parameter to paginate through the results.',
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
        description: 'Filter for estimates associated with these accounts.',
        items: {
          type: 'string',
        },
      },
      currencyIds: {
        type: 'array',
        description: 'Filter for estimates in these currencies.',
        items: {
          type: 'string',
        },
      },
      cursor: {
        type: 'string',
        description:
          'The pagination token to fetch the next set of results when paginating with the `limit` parameter. Do not include this parameter on the first call. Use the `nextCursor` value returned in the previous response to request subsequent results.',
      },
      customerIds: {
        type: 'array',
        description: 'Filter for estimates created for these customers.',
        items: {
          type: 'string',
        },
      },
      ids: {
        type: 'array',
        description:
          'Filter for specific estimates by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
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
          'Whether to include linked transactions in the response. Defaults to `false`. For example, a payment linked to the corresponding estimate.',
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of objects to return. Accepts values ranging from 1 to 150, defaults to 150. When used with cursor-based pagination, this parameter controls how many results are returned per page. To paginate through results, combine this with the `cursor` parameter. Each response will include a `nextCursor` value that can be passed to subsequent requests to retrieve the next page of results.',
      },
      refNumberContains: {
        type: 'string',
        description:
          'Filter for estimates whose `refNumber` contains this substring.\n\n**NOTE**: If you use this parameter, you cannot also use `refNumberStartsWith` or `refNumberEndsWith`.',
      },
      refNumberEndsWith: {
        type: 'string',
        description:
          'Filter for estimates whose `refNumber` ends with this substring.\n\n**NOTE**: If you use this parameter, you cannot also use `refNumberContains` or `refNumberStartsWith`.',
      },
      refNumberFrom: {
        type: 'string',
        description:
          'Filter for estimates whose `refNumber` is greater than or equal to this value. If omitted, the range will begin with the first number of the list. Uses a numerical comparison for values that contain only digits; otherwise, uses a lexicographical comparison.',
      },
      refNumbers: {
        type: 'array',
        description:
          'Filter for specific estimates by their ref-number(s), case-sensitive. In QuickBooks, ref-numbers are not required to be unique and can be arbitrarily changed by the QuickBooks user.\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      refNumberStartsWith: {
        type: 'string',
        description:
          'Filter for estimates whose `refNumber` starts with this substring.\n\n**NOTE**: If you use this parameter, you cannot also use `refNumberContains` or `refNumberEndsWith`.',
      },
      refNumberTo: {
        type: 'string',
        description:
          'Filter for estimates whose `refNumber` is less than or equal to this value. If omitted, the range will end with the last number of the list. Uses a numerical comparison for values that contain only digits; otherwise, uses a lexicographical comparison.',
      },
      transactionDateFrom: {
        type: 'string',
        description:
          "Filter for estimates whose `date` field is on or after this date, in ISO 8601 format (YYYY-MM-DD). QuickBooks Desktop interprets this date-only value in the host machine’s local timezone; i.e., midnight in the timezone of the end-user's computer running QuickBooks Desktop.",
        format: 'date',
      },
      transactionDateTo: {
        type: 'string',
        description:
          "Filter for estimates whose `date` field is on or before this date, in ISO 8601 format (YYYY-MM-DD). QuickBooks Desktop interprets this date-only value in the host machine’s local timezone; i.e., midnight in the timezone of the end-user's computer running QuickBooks Desktop.",
        format: 'date',
      },
      updatedAfter: {
        type: 'string',
        description:
          'Filter for estimates updated on or after this date/time. Format: ISO 8601. Accepts date-only (YYYY-MM-DD), datetime without timezone (YYYY-MM-DDTHH:mm:ss), or datetime with timezone (YYYY-MM-DDTHH:mm:ss±HH:mm). Date-only and timezone-less datetimes are passed through for QuickBooks Desktop to interpret in the host machine’s local timezone. If the datetime includes a timezone (e.g., `+05:30` or `Z`), QuickBooks Desktop uses that timezone to interpret the timestamp.',
      },
      updatedBefore: {
        type: 'string',
        description:
          'Filter for estimates updated on or before this date/time. Format: ISO 8601. Accepts date-only (YYYY-MM-DD), datetime without timezone (YYYY-MM-DDTHH:mm:ss), or datetime with timezone (YYYY-MM-DDTHH:mm:ss±HH:mm). Date-only and timezone-less datetimes are passed through for QuickBooks Desktop to interpret in the host machine’s local timezone. If the datetime includes a timezone (e.g., `+05:30` or `Z`), QuickBooks Desktop uses that timezone to interpret the timestamp.',
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
  const response = await conductor.qbd.estimates.list(body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
