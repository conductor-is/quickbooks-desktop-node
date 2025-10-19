// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.customer_types',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/customer-types/{id}',
};

export const tool: Tool = {
  name: 'retrieve_qbd_customer_types',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieves a customer type by ID.\n\n**IMPORTANT:** If you need to fetch multiple specific customer types by ID, use the list endpoint instead with the `ids` parameter. It accepts an array of IDs so you can batch the request into a single call, which is significantly faster.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/customer_type',\n  $defs: {\n    customer_type: {\n      type: 'object',\n      title: 'The Customer Type object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this customer type. This ID is unique across all customer types but not across different QuickBooks object types.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this customer type was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        fullName: {\n          type: 'string',\n          description: 'The case-insensitive fully-qualified unique name of this customer type, formed by combining the names of its hierarchical parent objects with its own `name`, separated by colons. For example, if a customer type is under \"Industry\" and has the `name` \"Healthcare\", its `fullName` would be \"Industry:Healthcare\".\\n\\n**NOTE**: Unlike `name`, `fullName` is guaranteed to be unique across all customer type objects. However, `fullName` can still be arbitrarily changed by the QuickBooks user when they modify the underlying `name` field.'\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this customer type is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive name of this customer type. Not guaranteed to be unique because it does not include the names of its hierarchical parent objects like `fullName` does. For example, two customer types could both have the `name` \"Healthcare\", but they could have unique `fullName` values, such as \"Industry:Healthcare\" and \"Region:Healthcare\".'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_customer_type\"`.',\n          enum: [            'qbd_customer_type'\n          ]\n        },\n        parent: {\n          type: 'object',\n          description: 'The parent customer type one level above this one in the hierarchy. For example, if this customer type has a `fullName` of \"Industry:Healthcare\", its parent has a `fullName` of \"Industry\". If this customer type is at the top level, this field will be `null`.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this customer type object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        sublevel: {\n          type: 'number',\n          description: 'The depth level of this customer type in the hierarchy. A top-level customer type has a `sublevel` of 0; each subsequent sublevel increases this number by 1. For example, a customer type with a `fullName` of \"Industry:Healthcare\" would have a `sublevel` of 1.'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this customer type was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'fullName',\n        'isActive',\n        'name',\n        'objectType',\n        'parent',\n        'revisionNumber',\n        'sublevel',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the customer type to retrieve.',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
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
    await maybeFilter(jq_filter, await conductor.qbd.customerTypes.retrieve(id, body)),
  );
};

export default { metadata, tool, handler };
