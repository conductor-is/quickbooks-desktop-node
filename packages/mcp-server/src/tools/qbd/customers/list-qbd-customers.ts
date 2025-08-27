// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.customers',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/customers',
};

export const tool: Tool = {
  name: 'list_qbd_customers',
  description: 'Returns a list of customers. Use the `cursor` parameter to paginate through the results.',
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
          'Filter for customers of these classes. A class is a way end-users can categorize customers in QuickBooks.',
        items: {
          type: 'string',
        },
      },
      currencyIds: {
        type: 'array',
        description: 'Filter for customers in these currencies.',
        items: {
          type: 'string',
        },
      },
      cursor: {
        type: 'string',
        description:
          'The pagination token to fetch the next set of results when paginating with the `limit` parameter. Do not include this parameter on the first call. Use the `nextCursor` value returned in the previous response to request subsequent results.',
      },
      fullNames: {
        type: 'array',
        description:
          'Filter for specific customers by their full-name(s), case-insensitive. Like `id`, `fullName` is a unique identifier for a customer, formed by by combining the names of its parent objects with its own `name`, separated by colons. For example, if a customer is under "ABC Corporation" and has the `name` "Website Redesign Project", its `fullName` would be "ABC Corporation:Website Redesign Project".\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      ids: {
        type: 'array',
        description:
          'Filter for specific customers by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
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
          'Filter for customers whose `name` contains this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or `nameEndsWith`.',
      },
      nameEndsWith: {
        type: 'string',
        description:
          'Filter for customers whose `name` ends with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameStartsWith`.',
      },
      nameFrom: {
        type: 'string',
        description:
          'Filter for customers whose `name` is alphabetically greater than or equal to this value.',
      },
      nameStartsWith: {
        type: 'string',
        description:
          'Filter for customers whose `name` starts with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameEndsWith`.',
      },
      nameTo: {
        type: 'string',
        description: 'Filter for customers whose `name` is alphabetically less than or equal to this value.',
      },
      status: {
        type: 'string',
        description: 'Filter for customers that are active, inactive, or both.',
        enum: ['active', 'all', 'inactive'],
      },
      totalBalance: {
        type: 'string',
        description:
          'Filter for customers whose `totalBalance` equals this amount, represented as a decimal string. You can only use one total-balance filter at a time.',
      },
      totalBalanceGreaterThan: {
        type: 'string',
        description:
          'Filter for customers whose `totalBalance` is greater than this amount, represented as a decimal string. You can only use one total-balance filter at a time.',
      },
      totalBalanceGreaterThanOrEqualTo: {
        type: 'string',
        description:
          'Filter for customers whose `totalBalance` is greater than or equal to this amount, represented as a decimal string. You can only use one total-balance filter at a time.',
      },
      totalBalanceLessThan: {
        type: 'string',
        description:
          'Filter for customers whose `totalBalance` is less than this amount, represented as a decimal string. You can only use one total-balance filter at a time.',
      },
      totalBalanceLessThanOrEqualTo: {
        type: 'string',
        description:
          'Filter for customers whose `totalBalance` is less than or equal to this amount, represented as a decimal string. You can only use one total-balance filter at a time.',
      },
      updatedAfter: {
        type: 'string',
        description:
          'Filter for customers updated on or after this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets this as midnight in the host machine’s local timezone.\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop uses the host machine’s local timezone to interpret the timestamp.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop uses this timezone to interpret the timestamp.',
      },
      updatedBefore: {
        type: 'string',
        description:
          'Filter for customers updated on or before this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets this as midnight in the host machine’s local timezone.\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop uses the host machine’s local timezone to interpret the timestamp.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop uses this timezone to interpret the timestamp.',
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
  const response = await conductor.qbd.customers.list(body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
