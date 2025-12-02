// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.price_levels',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/price-levels',
};

export const tool: Tool = {
  name: 'list_qbd_price_levels',
  description:
    'Returns a list of price levels. NOTE: QuickBooks Desktop does not support pagination for price levels; hence, there is no `cursor` parameter. Users typically have few price levels.',
  inputSchema: {
    type: 'object',
    properties: {
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      currencyIds: {
        type: 'array',
        description: 'Filter for price levels in these currencies.',
        items: {
          type: 'string',
        },
      },
      ids: {
        type: 'array',
        description:
          'Filter for specific price levels by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      itemIds: {
        type: 'array',
        description: 'Filter for price levels containing these items.',
        items: {
          type: 'string',
        },
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of objects to return.\n\n**IMPORTANT**: QuickBooks Desktop does not support cursor-based pagination for price levels. This parameter will limit the response size, but you cannot fetch subsequent results using a cursor. For pagination, use the name-range parameters instead (e.g., `nameFrom=A&nameTo=B`).\n\nWhen this parameter is omitted, the endpoint returns all price levels without limit, unlike paginated endpoints which default to 150 records. This is acceptable because price levels typically have low record counts.',
      },
      nameContains: {
        type: 'string',
        description:
          'Filter for price levels whose `name` contains this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or `nameEndsWith`.',
      },
      nameEndsWith: {
        type: 'string',
        description:
          'Filter for price levels whose `name` ends with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameStartsWith`.',
      },
      nameFrom: {
        type: 'string',
        description:
          'Filter for price levels whose `name` is alphabetically greater than or equal to this value.',
      },
      names: {
        type: 'array',
        description:
          'Filter for specific price levels by their name(s), case-insensitive. Like `id`, `name` is a unique identifier for a price level.\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      nameStartsWith: {
        type: 'string',
        description:
          'Filter for price levels whose `name` starts with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameEndsWith`.',
      },
      nameTo: {
        type: 'string',
        description:
          'Filter for price levels whose `name` is alphabetically less than or equal to this value.',
      },
      status: {
        type: 'string',
        description: 'Filter for price levels that are active, inactive, or both.',
        enum: ['active', 'all', 'inactive'],
      },
      updatedAfter: {
        type: 'string',
        description:
          "Filter for price levels updated on or after this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the **start of the specified day** in the local timezone of the end-user's computer (e.g., `2025-01-01` → `2025-01-01T00:00:00`).\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop interprets the timestamp in the local timezone of the end-user's computer.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop interprets the timestamp using the specified timezone.",
      },
      updatedBefore: {
        type: 'string',
        description:
          "Filter for price levels updated on or before this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the **end of the specified day** in the local timezone of the end-user's computer (e.g., `2025-01-01` → `2025-01-01T23:59:59`).\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop interprets the timestamp in the local timezone of the end-user's computer.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop interprets the timestamp using the specified timezone.",
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
  try {
    return asTextContentResult(await conductor.qbd.priceLevels.list(body));
  } catch (error) {
    if (error instanceof Conductor.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
