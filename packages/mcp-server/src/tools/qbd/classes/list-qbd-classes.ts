// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.classes',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/classes',
};

export const tool: Tool = {
  name: 'list_qbd_classes',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns a list of classes. NOTE: QuickBooks Desktop does not support pagination for classes; hence, there is no `cursor` parameter. Users typically have few classes.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/class_list_response',\n  $defs: {\n    class_list_response: {\n      type: 'object',\n      properties: {\n        data: {\n          type: 'array',\n          description: 'The array of classes.',\n          items: {\n            $ref: '#/$defs/class'\n          }\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"list\"`.',\n          enum: [            'list'\n          ]\n        },\n        url: {\n          type: 'string',\n          description: 'The endpoint URL where this list can be accessed.'\n        }\n      },\n      required: [        'data',\n        'objectType',\n        'url'\n      ]\n    },\n    class: {\n      type: 'object',\n      title: 'The Class object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this class. This ID is unique across all classes but not across different QuickBooks object types.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this class was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        fullName: {\n          type: 'string',\n          description: 'The case-insensitive fully-qualified unique name of this class, formed by combining the names of its hierarchical parent objects with its own `name`, separated by colons. For example, if a class is under \"Department\" and has the `name` \"Marketing\", its `fullName` would be \"Department:Marketing\".\\n\\n**NOTE**: Unlike `name`, `fullName` is guaranteed to be unique across all class objects. However, `fullName` can still be arbitrarily changed by the QuickBooks user when they modify the underlying `name` field.'\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this class is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive name of this class. Not guaranteed to be unique because it does not include the names of its hierarchical parent objects like `fullName` does. For example, two classes could both have the `name` \"Marketing\", but they could have unique `fullName` values, such as \"Department:Marketing\" and \"Internal:Marketing\".'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_class\"`.',\n          enum: [            'qbd_class'\n          ]\n        },\n        parent: {\n          type: 'object',\n          description: 'The parent class one level above this one in the hierarchy. For example, if this class has a `fullName` of \"Department:Marketing\", its parent has a `fullName` of \"Department\". If this class is at the top level, this field will be `null`.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this class object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        sublevel: {\n          type: 'number',\n          description: 'The depth level of this class in the hierarchy. A top-level class has a `sublevel` of 0; each subsequent sublevel increases this number by 1. For example, a class with a `fullName` of \"Department:Marketing\" would have a `sublevel` of 1.'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this class was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'fullName',\n        'isActive',\n        'name',\n        'objectType',\n        'parent',\n        'revisionNumber',\n        'sublevel',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      fullNames: {
        type: 'array',
        description:
          'Filter for specific classes by their full-name(s), case-insensitive. Like `id`, `fullName` is a unique identifier for a class, formed by by combining the names of its parent objects with its own `name`, separated by colons. For example, if a class is under "Department" and has the `name` "Marketing", its `fullName` would be "Department:Marketing".\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      ids: {
        type: 'array',
        description:
          'Filter for specific classes by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of objects to return.\n\n**IMPORTANT**: QuickBooks Desktop does not support cursor-based pagination for classes. This parameter will limit the response size, but you cannot fetch subsequent results using a cursor. For pagination, use the name-range parameters instead (e.g., `nameFrom=A&nameTo=B`).\n\nWhen this parameter is omitted, the endpoint returns all classes without limit, unlike paginated endpoints which default to 150 records. This is acceptable because classes typically have low record counts.',
      },
      nameContains: {
        type: 'string',
        description:
          'Filter for classes whose `name` contains this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or `nameEndsWith`.',
      },
      nameEndsWith: {
        type: 'string',
        description:
          'Filter for classes whose `name` ends with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameStartsWith`.',
      },
      nameFrom: {
        type: 'string',
        description: 'Filter for classes whose `name` is alphabetically greater than or equal to this value.',
      },
      nameStartsWith: {
        type: 'string',
        description:
          'Filter for classes whose `name` starts with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameEndsWith`.',
      },
      nameTo: {
        type: 'string',
        description: 'Filter for classes whose `name` is alphabetically less than or equal to this value.',
      },
      status: {
        type: 'string',
        description: 'Filter for classes that are active, inactive, or both.',
        enum: ['active', 'all', 'inactive'],
      },
      updatedAfter: {
        type: 'string',
        description:
          "Filter for classes updated on or after this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the **start of the specified day** in the local timezone of the end-user's computer (e.g., `2025-01-01` → `2025-01-01T00:00:00`).\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop interprets the timestamp in the local timezone of the end-user's computer.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop interprets the timestamp using the specified timezone.",
      },
      updatedBefore: {
        type: 'string',
        description:
          "Filter for classes updated on or before this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the **end of the specified day** in the local timezone of the end-user's computer (e.g., `2025-01-01` → `2025-01-01T23:59:59`).\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop interprets the timestamp in the local timezone of the end-user's computer.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop interprets the timestamp using the specified timezone.",
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['Conductor-End-User-Id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await conductor.qbd.classes.list(body)));
  } catch (error) {
    if (error instanceof Conductor.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
