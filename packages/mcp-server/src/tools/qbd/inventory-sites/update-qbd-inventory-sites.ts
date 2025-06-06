// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.inventory_sites',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/inventory-sites/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_inventory_sites',
  description: 'Updates an existing inventory site.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the inventory site to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the inventory site object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      address: {
        type: 'object',
        description: "The inventory site's address.",
        properties: {
          city: {
            type: 'string',
            description:
              'The city, district, suburb, town, or village name of the site address.\n\nMaximum length: 31 characters.',
          },
          country: {
            type: 'string',
            description: 'The country name of the site address.',
          },
          line1: {
            type: 'string',
            description:
              'The first line of the site address (e.g., street, PO Box, or company name).\n\nMaximum length: 41 characters.',
          },
          line2: {
            type: 'string',
            description:
              'The second line of the site address, if needed (e.g., apartment, suite, unit, or building).\n\nMaximum length: 41 characters.',
          },
          line3: {
            type: 'string',
            description: 'The third line of the site address, if needed.\n\nMaximum length: 41 characters.',
          },
          line4: {
            type: 'string',
            description: 'The fourth line of the site address, if needed.\n\nMaximum length: 41 characters.',
          },
          line5: {
            type: 'string',
            description: 'The fifth line of the site address, if needed.\n\nMaximum length: 41 characters.',
          },
          postalCode: {
            type: 'string',
            description: 'The postal code or ZIP code of the site address.\n\nMaximum length: 13 characters.',
          },
          state: {
            type: 'string',
            description:
              'The state, county, province, or region name of the site address.\n\nMaximum length: 21 characters.',
          },
        },
        required: [],
      },
      contact: {
        type: 'string',
        description: 'The name of the primary contact person for this inventory site.',
      },
      description: {
        type: 'string',
        description: 'A description of this inventory site.',
      },
      email: {
        type: 'string',
        description: "The inventory site's email address.",
      },
      fax: {
        type: 'string',
        description: "The inventory site's fax number.",
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this inventory site is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this inventory site, unique across all inventory sites.\n\n**NOTE**: Inventory sites do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
      },
      parentId: {
        type: 'string',
        description: 'The parent inventory site one level above this one in the hierarchy.',
      },
      phone: {
        type: 'string',
        description: "The inventory site's primary telephone number.",
      },
    },
  },
};

export const handler = async (client: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await client.qbd.inventorySites.update(id, body));
};

export default { metadata, tool, handler };
