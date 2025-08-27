// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.non_inventory_items',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/non-inventory-items',
};

export const tool: Tool = {
  name: 'list_qbd_non_inventory_items',
  description:
    'Returns a list of non-inventory items. Use the `cursor` parameter to paginate through the results.',
  inputSchema: {
    type: 'object',
    properties: {
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      classIds: {
        type: 'array',
        description:
          'Filter for non-inventory items of these classes. A class is a way end-users can categorize non-inventory items in QuickBooks.',
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
          'Filter for specific non-inventory items by their full-name(s), case-insensitive. Like `id`, `fullName` is a unique identifier for a non-inventory item, formed by by combining the names of its parent objects with its own `name`, separated by colons. For example, if a non-inventory item is under "Office Supplies" and has the `name` "Printer Ink Cartridge", its `fullName` would be "Office Supplies:Printer Ink Cartridge".\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      ids: {
        type: 'array',
        description:
          'Filter for specific non-inventory items by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
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
          'Filter for non-inventory items whose `name` contains this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or `nameEndsWith`.',
      },
      nameEndsWith: {
        type: 'string',
        description:
          'Filter for non-inventory items whose `name` ends with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameStartsWith`.',
      },
      nameFrom: {
        type: 'string',
        description:
          'Filter for non-inventory items whose `name` is alphabetically greater than or equal to this value.',
      },
      nameStartsWith: {
        type: 'string',
        description:
          'Filter for non-inventory items whose `name` starts with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameEndsWith`.',
      },
      nameTo: {
        type: 'string',
        description:
          'Filter for non-inventory items whose `name` is alphabetically less than or equal to this value.',
      },
      status: {
        type: 'string',
        description: 'Filter for non-inventory items that are active, inactive, or both.',
        enum: ['active', 'all', 'inactive'],
      },
      updatedAfter: {
        type: 'string',
        description:
          'Filter for non-inventory items updated on or after this date/time. Format: ISO 8601. Accepts date-only (YYYY-MM-DD), datetime without timezone (YYYY-MM-DDTHH:mm:ss), or datetime with timezone (YYYY-MM-DDTHH:mm:ss±HH:mm). **NOTE**: Date-only and timezone-less datetimes are passed through for QuickBooks Desktop to interpret in the QuickBooks Desktop host machine’s local timezone. If the datetime includes a timezone (e.g., `+05:30` or `Z`), QuickBooks Desktop uses that timezone to interpret the timestamp.',
      },
      updatedBefore: {
        type: 'string',
        description:
          'Filter for non-inventory items updated on or before this date/time. Format: ISO 8601. Accepts date-only (YYYY-MM-DD), datetime without timezone (YYYY-MM-DDTHH:mm:ss), or datetime with timezone (YYYY-MM-DDTHH:mm:ss±HH:mm). **NOTE**: Date-only and timezone-less datetimes are passed through for QuickBooks Desktop to interpret in the QuickBooks Desktop host machine’s local timezone. If the datetime includes a timezone (e.g., `+05:30` or `Z`), QuickBooks Desktop uses that timezone to interpret the timestamp.',
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
  const response = await conductor.qbd.nonInventoryItems.list(body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
