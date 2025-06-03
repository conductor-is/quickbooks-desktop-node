// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.inventory_assembly_items',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/inventory-assembly-items',
};

export const tool: Tool = {
  name: 'list_qbd_inventory_assembly_items',
  description:
    'Returns a list of inventory assembly items. Use the `cursor` parameter to paginate through the results.',
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
          'Filter for inventory assembly items of these classes. A class is a way end-users can categorize inventory assembly items in QuickBooks.',
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
          'Filter for specific inventory assembly items by their full-name(s), case-insensitive. Like `id`, `fullName` is a unique identifier for an inventory assembly item, formed by by combining the names of its parent objects with its own `name`, separated by colons. For example, if an inventory assembly item is under "Assemblies" and has the `name` "Deluxe Kit", its `fullName` would be "Assemblies:Deluxe Kit".\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      ids: {
        type: 'array',
        description:
          'Filter for specific inventory assembly items by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
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
          'Filter for inventory assembly items whose `name` contains this substring, case-insensitive. NOTE: If you use this parameter, you cannot also use `nameStartsWith` or `nameEndsWith`.',
      },
      nameEndsWith: {
        type: 'string',
        description:
          'Filter for inventory assembly items whose `name` ends with this substring, case-insensitive. NOTE: If you use this parameter, you cannot also use `nameContains` or `nameStartsWith`.',
      },
      nameFrom: {
        type: 'string',
        description:
          'Filter for inventory assembly items whose `name` is alphabetically greater than or equal to this value.',
      },
      nameStartsWith: {
        type: 'string',
        description:
          'Filter for inventory assembly items whose `name` starts with this substring, case-insensitive. NOTE: If you use this parameter, you cannot also use `nameContains` or `nameEndsWith`.',
      },
      nameTo: {
        type: 'string',
        description:
          'Filter for inventory assembly items whose `name` is alphabetically less than or equal to this value.',
      },
      status: {
        type: 'string',
        description: 'Filter for inventory assembly items that are active, inactive, or both.',
        enum: ['active', 'all', 'inactive'],
      },
      updatedAfter: {
        type: 'string',
        description:
          'Filter for inventory assembly items updated on or after this date and time, in ISO 8601 format (YYYY-MM-DDTHH:mm:ss). If you only provide a date (YYYY-MM-DD), the time is assumed to be 00:00:00 of that day.\n\n**WARNING**: Due to a known issue in QuickBooks Desktop, the `updatedAfter` parameter may not correctly filter inventory assembly items by their updated dates. To accurately retrieve the desired inventory assembly items, we recommend avoiding this parameter and instead fetching a broader dataset, then filtering the results locally using the `updatedAt` property.',
      },
      updatedBefore: {
        type: 'string',
        description:
          'Filter for inventory assembly items updated on or before this date and time, in ISO 8601 format (YYYY-MM-DDTHH:mm:ss). If you only provide a date (YYYY-MM-DD), the time is assumed to be 23:59:59 of that day.\n\n**WARNING**: Due to a known issue in QuickBooks Desktop, the `updatedBefore` parameter may not correctly filter inventory assembly items by their updated dates. To accurately retrieve the desired inventory assembly items, we recommend avoiding this parameter and instead fetching a broader dataset, then filtering the results locally using the `updatedAt` property.',
      },
    },
  },
};

export const handler = (client: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.qbd.inventoryAssemblyItems.list(body);
};

export default { metadata, tool, handler };
