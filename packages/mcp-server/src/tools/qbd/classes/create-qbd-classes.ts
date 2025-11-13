// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.classes',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/classes',
};

export const tool: Tool = {
  name: 'create_qbd_classes',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates a new class.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/class',\n  $defs: {\n    class: {\n      type: 'object',\n      title: 'The Class object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this class. This ID is unique across all classes but not across different QuickBooks object types.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this class was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        fullName: {\n          type: 'string',\n          description: 'The case-insensitive fully-qualified unique name of this class, formed by combining the names of its hierarchical parent objects with its own `name`, separated by colons. For example, if a class is under \"Department\" and has the `name` \"Marketing\", its `fullName` would be \"Department:Marketing\".\\n\\n**NOTE**: Unlike `name`, `fullName` is guaranteed to be unique across all class objects. However, `fullName` can still be arbitrarily changed by the QuickBooks user when they modify the underlying `name` field.'\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this class is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive name of this class. Not guaranteed to be unique because it does not include the names of its hierarchical parent objects like `fullName` does. For example, two classes could both have the `name` \"Marketing\", but they could have unique `fullName` values, such as \"Department:Marketing\" and \"Internal:Marketing\".'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_class\"`.',\n          enum: [            'qbd_class'\n          ]\n        },\n        parent: {\n          type: 'object',\n          description: 'The parent class one level above this one in the hierarchy. For example, if this class has a `fullName` of \"Department:Marketing\", its parent has a `fullName` of \"Department\". If this class is at the top level, this field will be `null`.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this class object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        sublevel: {\n          type: 'number',\n          description: 'The depth level of this class in the hierarchy. A top-level class has a `sublevel` of 0; each subsequent sublevel increases this number by 1. For example, a class with a `fullName` of \"Department:Marketing\" would have a `sublevel` of 1.'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this class was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'fullName',\n        'isActive',\n        'name',\n        'objectType',\n        'parent',\n        'revisionNumber',\n        'sublevel',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description:
          'The case-insensitive name of this class. Not guaranteed to be unique because it does not include the names of its hierarchical parent objects like `fullName` does. For example, two classes could both have the `name` "Marketing", but they could have unique `fullName` values, such as "Department:Marketing" and "Internal:Marketing".\n\nMaximum length: 31 characters.',
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this class is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      parentId: {
        type: 'string',
        description:
          'The parent class one level above this one in the hierarchy. For example, if this class has a `fullName` of "Department:Marketing", its parent has a `fullName` of "Department". If this class is at the top level, this field will be `null`.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['name', 'Conductor-End-User-Id'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await conductor.qbd.classes.create(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
