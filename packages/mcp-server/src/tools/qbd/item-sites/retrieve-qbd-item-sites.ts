// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.item_sites',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/item-sites/{id}',
};

export const tool: Tool = {
  name: 'retrieve_qbd_item_sites',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieves an item site by ID.\n\n**IMPORTANT:** If you need to fetch multiple specific item sites by ID, use the list endpoint instead with the `ids` parameter. It accepts an array of IDs so you can batch the request into a single call, which is significantly faster.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/item_site',\n  $defs: {\n    item_site: {\n      type: 'object',\n      title: 'The Item Site object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this item site. This ID is unique across all item sites but not across different QuickBooks object types.'\n        },\n        assemblyBuildPoint: {\n          type: 'number',\n          description: 'The inventory level of this item site at which a new build assembly should begin. When the combined `quantityOnHand` and `quantityOnPurchaseOrders` drops below this point, QuickBooks flags the need to build additional units.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this item site was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        inventoryAssemblyItem: {\n          type: 'object',\n          description: 'The inventory assembly item associated with this item site. An inventory assembly item is assembled or manufactured from other inventory items, and the items and/or assemblies that make up the assembly are called components.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        inventoryItem: {\n          type: 'object',\n          description: 'The inventory item associated with this item site.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        inventorySite: {\n          type: 'object',\n          description: 'The site location where inventory for the item associated with this item site is stored.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        inventorySiteLocation: {\n          type: 'object',\n          description: 'The specific location (e.g., bin or shelf) within the inventory site where the item associated with this item site is stored.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_item_site\"`.',\n          enum: [            'qbd_item_site'\n          ]\n        },\n        quantityOnHand: {\n          type: 'number',\n          description: 'The number of units of this item site currently in inventory.'\n        },\n        quantityOnPendingTransfers: {\n          type: 'number',\n          description: 'The number of units of this item site that are currently on pending inventory transfer transactions.'\n        },\n        quantityOnPurchaseOrders: {\n          type: 'number',\n          description: 'The number of units of this item site that are currently listed on outstanding purchase orders and have not yet been received.'\n        },\n        quantityOnSalesOrders: {\n          type: 'number',\n          description: 'The number of units of this item site that are currently listed on outstanding sales orders and have not yet been fulfilled or delivered to customers.'\n        },\n        quantityRequiredByPendingBuildTransactions: {\n          type: 'number',\n          description: 'The number of units of this item site required by pending build transactions.'\n        },\n        quantityToBeBuiltByPendingBuildTransactions: {\n          type: 'number',\n          description: 'The number of units of this item site that are scheduled to be built on pending build transactions.'\n        },\n        reorderLevel: {\n          type: 'number',\n          description: 'The inventory level at which QuickBooks prompts you to reorder this item site.'\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this item site object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this item site was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        }\n      },\n      required: [        'id',\n        'assemblyBuildPoint',\n        'createdAt',\n        'inventoryAssemblyItem',\n        'inventoryItem',\n        'inventorySite',\n        'inventorySiteLocation',\n        'objectType',\n        'quantityOnHand',\n        'quantityOnPendingTransfers',\n        'quantityOnPurchaseOrders',\n        'quantityOnSalesOrders',\n        'quantityRequiredByPendingBuildTransactions',\n        'quantityToBeBuiltByPendingBuildTransactions',\n        'reorderLevel',\n        'revisionNumber',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the item site to retrieve.',
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

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await conductor.qbd.itemSites.retrieve(id, body)));
};

export default { metadata, tool, handler };
