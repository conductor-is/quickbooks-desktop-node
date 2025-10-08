// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.item_sites',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/item-sites',
};

export const tool: Tool = {
  name: 'list_qbd_item_sites',
  description: 'Returns a list of item sites. Use the `cursor` parameter to paginate through the results.',
  inputSchema: {
    type: 'object',
    properties: {
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      cursor: {
        type: 'string',
        description:
          'The pagination token to fetch the next set of results when paginating with the `limit` parameter. Do not include this parameter on the first call. Use the `nextCursor` value returned in the previous response to request subsequent results.',
      },
      ids: {
        type: 'array',
        description:
          'Filter for specific item sites by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      itemIds: {
        type: 'array',
        description: 'Filter for item sites for these items.',
        items: {
          type: 'string',
        },
      },
      itemType: {
        type: 'string',
        description: 'Filter for item sites that match this item type.',
        enum: [
          'all_except_fixed_asset',
          'assembly',
          'discount',
          'fixed_asset',
          'inventory',
          'inventory_and_assembly',
          'non_inventory',
          'other_charge',
          'payment',
          'sales',
          'sales_tax',
          'service',
        ],
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of objects to return. Accepts values ranging from 1 to 150, defaults to 150. When used with cursor-based pagination, this parameter controls how many results are returned per page. To paginate through results, combine this with the `cursor` parameter. Each response will include a `nextCursor` value that can be passed to subsequent requests to retrieve the next page of results.',
      },
      siteIds: {
        type: 'array',
        description:
          'Filter for item sites at these sites.  A site represents a physical location, such as a warehouse or store.',
        items: {
          type: 'string',
        },
      },
      status: {
        type: 'string',
        description: 'Filter for item sites that are active, inactive, or both.',
        enum: ['active', 'all', 'inactive'],
      },
    },
    required: ['Conductor-End-User-Id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await conductor.qbd.itemSites.list(body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
