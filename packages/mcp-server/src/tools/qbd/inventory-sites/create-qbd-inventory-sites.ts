// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.inventory_sites',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/inventory-sites',
};

export const tool: Tool = {
  name: 'create_qbd_inventory_sites',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates an inventory site for companies using QuickBooks Enterprise with Advanced Inventory.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/inventory_site',\n  $defs: {\n    inventory_site: {\n      type: 'object',\n      title: 'The Inventory Site object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this inventory site. This ID is unique across all inventory sites but not across different QuickBooks object types.'\n        },\n        address: {\n          type: 'object',\n          title: 'The Site Address object',\n          description: 'The inventory site\\'s address.',\n          properties: {\n            city: {\n              type: 'string',\n              description: 'The city, district, suburb, town, or village name of the site address.'\n            },\n            country: {\n              type: 'string',\n              description: 'The country name of the site address.'\n            },\n            line1: {\n              type: 'string',\n              description: 'The first line of the site address (e.g., street, PO Box, or company name).'\n            },\n            line2: {\n              type: 'string',\n              description: 'The second line of the site address, if needed (e.g., apartment, suite, unit, or building).'\n            },\n            line3: {\n              type: 'string',\n              description: 'The third line of the site address, if needed.'\n            },\n            line4: {\n              type: 'string',\n              description: 'The fourth line of the site address, if needed.'\n            },\n            line5: {\n              type: 'string',\n              description: 'The fifth line of the site address, if needed.'\n            },\n            postalCode: {\n              type: 'string',\n              description: 'The postal code or ZIP code of the site address.'\n            },\n            state: {\n              type: 'string',\n              description: 'The state, county, province, or region name of the site address.'\n            }\n          },\n          required: [            'city',\n            'country',\n            'line1',\n            'line2',\n            'line3',\n            'line4',\n            'line5',\n            'postalCode',\n            'state'\n          ]\n        },\n        contact: {\n          type: 'string',\n          description: 'The name of the primary contact person for this inventory site.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this inventory site was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        description: {\n          type: 'string',\n          description: 'A description of this inventory site.'\n        },\n        email: {\n          type: 'string',\n          description: 'The inventory site\\'s email address.'\n        },\n        fax: {\n          type: 'string',\n          description: 'The inventory site\\'s fax number.'\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this inventory site is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        isDefault: {\n          type: 'boolean',\n          description: 'Indicates whether this inventory site is the default site used when no specific site is provided during the creation of other objects.'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive unique name of this inventory site, unique across all inventory sites.\\n\\n**NOTE**: Inventory sites do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_inventory_site\"`.',\n          enum: [            'qbd_inventory_site'\n          ]\n        },\n        parent: {\n          type: 'object',\n          description: 'The parent inventory site one level above this one in the hierarchy.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        phone: {\n          type: 'string',\n          description: 'The inventory site\\'s primary telephone number.'\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this inventory site object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this inventory site was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        }\n      },\n      required: [        'id',\n        'address',\n        'contact',\n        'createdAt',\n        'description',\n        'email',\n        'fax',\n        'isActive',\n        'isDefault',\n        'name',\n        'objectType',\n        'parent',\n        'phone',\n        'revisionNumber',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this inventory site, unique across all inventory sites.\n\n**NOTE**: Inventory sites do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
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
      },
      description: {
        type: 'string',
        description: 'A description of this inventory site.',
      },
      email: {
        type: 'string',
        description: "The inventory site's email address.",
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this inventory site is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      parentId: {
        type: 'string',
        description: 'The parent inventory site one level above this one in the hierarchy.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['name', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await conductor.qbd.inventorySites.create(body)));
};

export default { metadata, tool, handler };
