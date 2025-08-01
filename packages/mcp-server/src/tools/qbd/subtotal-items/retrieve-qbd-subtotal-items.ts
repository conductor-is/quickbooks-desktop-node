// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.subtotal_items',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/subtotal-items/{id}',
};

export const tool: Tool = {
  name: 'retrieve_qbd_subtotal_items',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieves a subtotal item by ID.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/subtotal_item',\n  $defs: {\n    subtotal_item: {\n      type: 'object',\n      title: 'The Subtotal Item object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this subtotal item. This ID is unique across all subtotal items but not across different QuickBooks object types.'\n        },\n        barcode: {\n          type: 'string',\n          description: 'The subtotal item\\'s barcode.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this subtotal item was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user\\'s time zone in QuickBooks.'\n        },\n        customFields: {\n          type: 'array',\n          description: 'The custom fields for the subtotal item object, added as user-defined data extensions, not included in the standard QuickBooks object.',\n          items: {\n            type: 'object',\n            title: 'The Custom Field object',\n            properties: {\n              name: {\n                type: 'string',\n                description: 'The name of the custom field, unique for the specified `ownerId`. For public custom fields, this name is visible as a label in the QuickBooks UI.'\n              },\n              ownerId: {\n                type: 'string',\n                description: 'The identifier of the owner of the custom field, which QuickBooks internally calls a \"data extension\". For public custom fields visible in the UI, such as those added by the QuickBooks user, this is always \"0\". For private custom fields that are only visible to the application that created them, this is a valid GUID identifying the owning application. Internally, Conductor always fetches all public custom fields (those with an `ownerId` of \"0\") for all objects.'\n              },\n              type: {\n                type: 'string',\n                description: 'The data type of this custom field.',\n                enum: [                  'amount_type',\n                  'date_time_type',\n                  'integer_type',\n                  'percent_type',\n                  'price_type',\n                  'quantity_type',\n                  'string_1024_type',\n                  'string_255_type'\n                ]\n              },\n              value: {\n                type: 'string',\n                description: 'The value of this custom field. The maximum length depends on the field\\'s data type.'\n              }\n            },\n            required: [              'name',\n              'ownerId',\n              'type',\n              'value'\n            ]\n          }\n        },\n        description: {\n          type: 'string',\n          description: 'The subtotal item\\'s description that will appear on sales forms that include this item.'\n        },\n        externalId: {\n          type: 'string',\n          description: 'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.'\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this subtotal item is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive unique name of this subtotal item, unique across all subtotal items.\\n\\n**NOTE**: Subtotal items do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_subtotal_item\"`.',\n          enum: [            'qbd_subtotal_item'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this subtotal item object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        specialItemType: {\n          type: 'string',\n          description: 'The type of special item for this subtotal item.',\n          enum: [            'finance_charge',\n            'reimbursable_expense_group',\n            'reimbursable_expense_subtotal'\n          ]\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this subtotal item was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user\\'s time zone in QuickBooks.'\n        }\n      },\n      required: [        'id',\n        'barcode',\n        'createdAt',\n        'customFields',\n        'description',\n        'externalId',\n        'isActive',\n        'name',\n        'objectType',\n        'revisionNumber',\n        'specialItemType',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the subtotal item to retrieve.',
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
  return asTextContentResult(
    await maybeFilter(jq_filter, await conductor.qbd.subtotalItems.retrieve(id, body)),
  );
};

export default { metadata, tool, handler };
