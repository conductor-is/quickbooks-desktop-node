// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.sales_tax_items',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/sales-tax-items',
};

export const tool: Tool = {
  name: 'list_qbd_sales_tax_items',
  description:
    'Returns a list of sales-tax items. Use the `cursor` parameter to paginate through the results.',
  inputSchema: {
    type: 'object',
    properties: {
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      classIds: {
        type: 'array',
        description:
          'Filter for sales-tax items of these classes. A class is a way end-users can categorize sales-tax items in QuickBooks.',
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
          'Filter for specific sales-tax items by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
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
          'Filter for sales-tax items whose `name` contains this substring, case-insensitive. NOTE: If you use this parameter, you cannot also use `nameStartsWith` or `nameEndsWith`.',
      },
      nameEndsWith: {
        type: 'string',
        description:
          'Filter for sales-tax items whose `name` ends with this substring, case-insensitive. NOTE: If you use this parameter, you cannot also use `nameContains` or `nameStartsWith`.',
      },
      nameFrom: {
        type: 'string',
        description:
          'Filter for sales-tax items whose `name` is alphabetically greater than or equal to this value.',
      },
      names: {
        type: 'array',
        description:
          'Filter for specific sales-tax items by their name(s), case-insensitive. Like `id`, `name` is a unique identifier for a sales-tax item.\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      nameStartsWith: {
        type: 'string',
        description:
          'Filter for sales-tax items whose `name` starts with this substring, case-insensitive. NOTE: If you use this parameter, you cannot also use `nameContains` or `nameEndsWith`.',
      },
      nameTo: {
        type: 'string',
        description:
          'Filter for sales-tax items whose `name` is alphabetically less than or equal to this value.',
      },
      status: {
        type: 'string',
        description: 'Filter for sales-tax items that are active, inactive, or both.',
        enum: ['active', 'all', 'inactive'],
      },
      updatedAfter: {
        type: 'string',
        description:
          'Filter for sales-tax items updated on or after this date and time, in ISO 8601 format (YYYY-MM-DDTHH:mm:ss). If you only provide a date (YYYY-MM-DD), the time is assumed to be 00:00:00 of that day.',
      },
      updatedBefore: {
        type: 'string',
        description:
          'Filter for sales-tax items updated on or before this date and time, in ISO 8601 format (YYYY-MM-DDTHH:mm:ss). If you only provide a date (YYYY-MM-DD), the time is assumed to be 23:59:59 of that day.',
      },
    },
  },
};

export const handler = (client: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.qbd.salesTaxItems.list(body);
};

export default { metadata, tool, handler };
