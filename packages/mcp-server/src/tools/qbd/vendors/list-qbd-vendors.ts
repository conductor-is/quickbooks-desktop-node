// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.vendors',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/vendors',
};

export const tool: Tool = {
  name: 'list_qbd_vendors',
  description: 'Returns a list of vendors. Use the `cursor` parameter to paginate through the results.',
  inputSchema: {
    type: 'object',
    properties: {
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      classIds: {
        type: 'array',
        description:
          'Filter for vendors of these classes. A class is a way end-users can categorize vendors in QuickBooks.',
        items: {
          type: 'string',
        },
      },
      currencyIds: {
        type: 'array',
        description: 'Filter for vendors in these currencies.',
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
          'Filter for specific vendors by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of objects to return. Accepts values ranging from 1 to 150, defaults to 150. When used with cursor-based pagination, this parameter controls how many results are returned per page. To paginate through results, combine this with the `cursor` parameter. Each response will include a `nextCursor` value that can be passed to subsequent requests to retrieve the next page of results.',
      },
      nameContains: {
        type: 'string',
        description:
          'Filter for vendors whose `name` contains this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or `nameEndsWith`.',
      },
      nameEndsWith: {
        type: 'string',
        description:
          'Filter for vendors whose `name` ends with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameStartsWith`.',
      },
      nameFrom: {
        type: 'string',
        description: 'Filter for vendors whose `name` is alphabetically greater than or equal to this value.',
      },
      names: {
        type: 'array',
        description:
          'Filter for specific vendors by their name(s), case-insensitive. Like `id`, `name` is a unique identifier for a vendor.\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      nameStartsWith: {
        type: 'string',
        description:
          'Filter for vendors whose `name` starts with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameEndsWith`.',
      },
      nameTo: {
        type: 'string',
        description: 'Filter for vendors whose `name` is alphabetically less than or equal to this value.',
      },
      status: {
        type: 'string',
        description: 'Filter for vendors that are active, inactive, or both.',
        enum: ['active', 'all', 'inactive'],
      },
      totalBalance: {
        type: 'string',
        description:
          'Filter for vendors whose `totalBalance` equals this amount, represented as a decimal string. You can only use one total-balance filter at a time.',
      },
      totalBalanceGreaterThan: {
        type: 'string',
        description:
          'Filter for vendors whose `totalBalance` is greater than this amount, represented as a decimal string. You can only use one total-balance filter at a time.',
      },
      totalBalanceGreaterThanOrEqualTo: {
        type: 'string',
        description:
          'Filter for vendors whose `totalBalance` is greater than or equal to this amount, represented as a decimal string. You can only use one total-balance filter at a time.',
      },
      totalBalanceLessThan: {
        type: 'string',
        description:
          'Filter for vendors whose `totalBalance` is less than this amount, represented as a decimal string. You can only use one total-balance filter at a time.',
      },
      totalBalanceLessThanOrEqualTo: {
        type: 'string',
        description:
          'Filter for vendors whose `totalBalance` is less than or equal to this amount, represented as a decimal string. You can only use one total-balance filter at a time.',
      },
      updatedAfter: {
        type: 'string',
        description:
          "Filter for vendors updated on or after this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the **start of the specified day** in the local timezone of the end-user's computer (e.g., `2025-01-01` → `2025-01-01T00:00:00`).\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop interprets the timestamp in the local timezone of the end-user's computer.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop interprets the timestamp using the specified timezone.",
      },
      updatedBefore: {
        type: 'string',
        description:
          "Filter for vendors updated on or before this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the **end of the specified day** in the local timezone of the end-user's computer (e.g., `2025-01-01` → `2025-01-01T23:59:59`).\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop interprets the timestamp in the local timezone of the end-user's computer.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop interprets the timestamp using the specified timezone.",
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
  const response = await conductor.qbd.vendors.list(body).asResponse();
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
