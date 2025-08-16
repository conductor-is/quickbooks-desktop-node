// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.price_levels',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/price-levels/{id}',
};

export const tool: Tool = {
  name: 'retrieve_qbd_price_levels',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieves a price level by ID.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/price_level',\n  $defs: {\n    price_level: {\n      type: 'object',\n      title: 'The Price Level object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this price level. This ID is unique across all price levels but not across different QuickBooks object types.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this price level was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user\\'s time zone in QuickBooks.'\n        },\n        currency: {\n          type: 'object',\n          description: 'The price level\\'s currency. For built-in currencies, the name and code are standard international values. For user-defined currencies, all values are editable.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        fixedPercentage: {\n          type: 'string',\n          description: 'The fixed percentage adjustment applied to all items for this price level (instead of a per-item price level). Once you create the price level, you cannot change this.\\n\\nWhen this price level is applied to a customer, it automatically adjusts the `rate` and `amount` columns for applicable line items in sales orders and invoices for that customer. This value supports both positive and negative values - a value of \"20\" increases prices by 20%, while \"-10\" decreases prices by 10%.'\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this price level is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive unique name of this price level, unique across all price levels.\\n\\n**NOTE**: Price levels do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_price_level\"`.',\n          enum: [            'qbd_price_level'\n          ]\n        },\n        perItemPriceLevels: {\n          type: 'array',\n          description: 'The per-item price level configurations for this price level.',\n          items: {\n            type: 'object',\n            title: 'The Per-Item Price Level object',\n            properties: {\n              customPrice: {\n                type: 'string',\n                description: 'The fixed amount custom price for this per-item price level that overrides the standard price for the specified item. Used when setting an absolute price value for the item in this price level.'\n              },\n              customPricePercent: {\n                type: 'string',\n                description: 'The fixed discount percentage for this per-item price level that modifies the specified item\\'s standard price. Used to create a fixed percentage markup or discount specific to this item within this price level.'\n              },\n              item: {\n                type: 'object',\n                description: 'The item associated with this per-item price level. This can refer to any good or service that the business buys or sells, including item types such as a service item, inventory item, or special calculation item like a discount item or sales-tax item.',\n                properties: {\n                  id: {\n                    type: 'string',\n                    description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n                  },\n                  fullName: {\n                    type: 'string',\n                    description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n                  }\n                },\n                required: [                  'id',\n                  'fullName'\n                ]\n              }\n            },\n            required: [              'customPrice',\n              'customPricePercent',\n              'item'\n            ]\n          }\n        },\n        priceLevelType: {\n          type: 'string',\n          description: 'The price level\\'s type.',\n          enum: [            'fixed_percentage',\n            'per_item'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this price level object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this price level was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user\\'s time zone in QuickBooks.'\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'currency',\n        'fixedPercentage',\n        'isActive',\n        'name',\n        'objectType',\n        'perItemPriceLevels',\n        'priceLevelType',\n        'revisionNumber',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the price level to retrieve.',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id', 'conductorEndUserId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.qbd.priceLevels.retrieve(id, body)));
};

export default { metadata, tool, handler };
