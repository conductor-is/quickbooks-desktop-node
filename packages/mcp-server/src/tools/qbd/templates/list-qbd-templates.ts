// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.templates',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/templates',
};

export const tool: Tool = {
  name: 'list_qbd_templates',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns a list of templates. Use the `cursor` parameter to paginate through the results.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/template_list_response',\n  $defs: {\n    template_list_response: {\n      type: 'object',\n      properties: {\n        data: {\n          type: 'array',\n          description: 'The array of templates.',\n          items: {\n            $ref: '#/$defs/template'\n          }\n        },\n        hasMore: {\n          type: 'boolean',\n          description: 'Indicates whether there are more objects to be fetched.'\n        },\n        nextCursor: {\n          type: 'string',\n          description: 'The `nextCursor` is a pagination token returned in the response when you use the `limit` parameter in your request. To retrieve subsequent pages of results, include this token as the value of the `cursor` request parameter in your following API calls.\\n\\n**NOTE**: The `nextCursor` value remains constant throughout the pagination process for a specific list instance; continue to use the same `nextCursor` token in each request to fetch additional pages.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"list\"`.',\n          enum: [            'list'\n          ]\n        },\n        remainingCount: {\n          type: 'number',\n          description: 'The number of objects remaining to be fetched.'\n        },\n        url: {\n          type: 'string',\n          description: 'The endpoint URL where this list can be accessed.'\n        }\n      },\n      required: [        'data',\n        'hasMore',\n        'nextCursor',\n        'objectType',\n        'remainingCount',\n        'url'\n      ]\n    },\n    template: {\n      type: 'object',\n      title: 'The Template object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this template. This ID is unique across all templates but not across different QuickBooks object types.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this template was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this template is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive unique name of this template, unique across all templates.\\n\\n**NOTE**: Templates do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_template\"`.',\n          enum: [            'qbd_template'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this template object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        templateType: {\n          type: 'string',\n          description: 'The type of transaction that this template is used for.',\n          enum: [            'bill_payment',\n            'build_assembly',\n            'credit_memo',\n            'estimate',\n            'invoice',\n            'payment_receipt',\n            'purchase_order',\n            'sales_order',\n            'sales_receipt'\n          ]\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this template was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'isActive',\n        'name',\n        'objectType',\n        'revisionNumber',\n        'templateType',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
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
    required: ['conductorEndUserId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await conductor.qbd.templates.list(body)));
};

export default { metadata, tool, handler };
