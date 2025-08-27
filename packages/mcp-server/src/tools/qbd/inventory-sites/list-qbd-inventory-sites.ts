// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.inventory_sites',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/inventory-sites',
};

export const tool: Tool = {
  name: 'list_qbd_inventory_sites',
  description:
    'Returns a list of inventory sites. NOTE: QuickBooks Desktop does not support pagination for inventory sites; hence, there is no `cursor` parameter. Users typically have few inventory sites.',
  inputSchema: {
    type: 'object',
    properties: {
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      ids: {
        type: 'array',
        description:
          'Filter for specific inventory sites by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      nameContains: {
        type: 'string',
        description:
          'Filter for inventory sites whose `name` contains this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or `nameEndsWith`.',
      },
      nameEndsWith: {
        type: 'string',
        description:
          'Filter for inventory sites whose `name` ends with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameStartsWith`.',
      },
      nameFrom: {
        type: 'string',
        description:
          'Filter for inventory sites whose `name` is alphabetically greater than or equal to this value.',
      },
      names: {
        type: 'array',
        description:
          'Filter for specific inventory sites by their name(s), case-insensitive. Like `id`, `name` is a unique identifier for an inventory site.\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      nameStartsWith: {
        type: 'string',
        description:
          'Filter for inventory sites whose `name` starts with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameEndsWith`.',
      },
      nameTo: {
        type: 'string',
        description:
          'Filter for inventory sites whose `name` is alphabetically less than or equal to this value.',
      },
      status: {
        type: 'string',
        description: 'Filter for inventory sites that are active, inactive, or both.',
        enum: ['active', 'all', 'inactive'],
      },
      updatedAfter: {
        type: 'string',
        description:
          'Filter for inventory sites updated on or after this date/time. Format: ISO 8601. Accepts date-only (YYYY-MM-DD), datetime without timezone (YYYY-MM-DDTHH:mm:ss), or datetime with timezone (YYYY-MM-DDTHH:mm:ss±HH:mm). Date-only and timezone-less datetimes are passed through for QuickBooks Desktop to interpret in the host machine’s local timezone. If the datetime includes a timezone (e.g., `+05:30` or `Z`), QuickBooks Desktop uses that timezone to interpret the timestamp.',
      },
      updatedBefore: {
        type: 'string',
        description:
          'Filter for inventory sites updated on or before this date/time. Format: ISO 8601. Accepts date-only (YYYY-MM-DD), datetime without timezone (YYYY-MM-DDTHH:mm:ss), or datetime with timezone (YYYY-MM-DDTHH:mm:ss±HH:mm). Date-only and timezone-less datetimes are passed through for QuickBooks Desktop to interpret in the host machine’s local timezone. If the datetime includes a timezone (e.g., `+05:30` or `Z`), QuickBooks Desktop uses that timezone to interpret the timestamp.',
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
  return asTextContentResult(await conductor.qbd.inventorySites.list(body));
};

export default { metadata, tool, handler };
