// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.transfers',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/transfers',
};

export const tool: Tool = {
  name: 'list_qbd_transfers',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns a list of transfers. Use the `cursor` parameter to paginate through the results.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'The array of transfers.',\n      items: {\n        $ref: '#/$defs/transfer'\n      }\n    },\n    hasMore: {\n      type: 'boolean',\n      description: 'Indicates whether there are more objects to be fetched.'\n    },\n    nextCursor: {\n      type: 'string',\n      description: 'The `nextCursor` is a pagination token returned in the response when you use the `limit` parameter in your request. To retrieve subsequent pages of results, include this token as the value of the `cursor` request parameter in your following API calls.\\n\\n**NOTE**: The `nextCursor` value remains constant throughout the pagination process for a specific list instance; continue to use the same `nextCursor` token in each request to fetch additional pages.'\n    },\n    objectType: {\n      type: 'string',\n      description: 'The type of object. This value is always `\"list\"`.',\n      enum: [        'list'\n      ]\n    },\n    remainingCount: {\n      type: 'number',\n      description: 'The number of objects remaining to be fetched.'\n    },\n    url: {\n      type: 'string',\n      description: 'The endpoint URL where this list can be accessed.'\n    }\n  },\n  required: [    'data',\n    'hasMore',\n    'nextCursor',\n    'objectType',\n    'remainingCount',\n    'url'\n  ],\n  $defs: {\n    transfer: {\n      type: 'object',\n      title: 'The Transfer object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this transfer. This ID is unique across all transaction types.'\n        },\n        amount: {\n          type: 'string',\n          description: 'The monetary amount of this transfer, represented as a decimal string.'\n        },\n        class: {\n          type: 'object',\n          description: 'The transfer\\'s class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this transfer was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user\\'s time zone in QuickBooks.'\n        },\n        memo: {\n          type: 'string',\n          description: 'A memo or note for this transfer.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_transfer\"`.',\n          enum: [            'qbd_transfer'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this transfer object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        sourceAccount: {\n          type: 'object',\n          description: 'The account from which money will be transferred.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        sourceAccountBalance: {\n          type: 'string',\n          description: 'The balance of the account from which money will be transferred.'\n        },\n        targetAccount: {\n          type: 'object',\n          description: 'The account to which money will be transferred.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        targetAccountBalance: {\n          type: 'string',\n          description: 'The balance of the account to which money will be transferred.'\n        },\n        transactionDate: {\n          type: 'string',\n          description: 'The date of this transfer, in ISO 8601 format (YYYY-MM-DD).',\n          format: 'date'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this transfer was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user\\'s time zone in QuickBooks.'\n        }\n      },\n      required: [        'id',\n        'amount',\n        'class',\n        'createdAt',\n        'memo',\n        'objectType',\n        'revisionNumber',\n        'sourceAccount',\n        'sourceAccountBalance',\n        'targetAccount',\n        'targetAccountBalance',\n        'transactionDate',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      cursor: {
        type: 'string',
        description:
          'The pagination token to fetch the next set of results when paginating with the `limit` parameter. Do not include this parameter on the first call. Use the `nextCursor` value returned in the previous response to request subsequent results.',
      },
      ids: {
        type: 'array',
        description:
          'Filter for specific transfers by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of objects to return. Accepts values ranging from 1 to 150, defaults to 150. When used with cursor-based pagination, this parameter controls how many results are returned per page. To paginate through results, combine this with the `cursor` parameter. Each response will include a `nextCursor` value that can be passed to subsequent requests to retrieve the next page of results.',
      },
      transactionDateFrom: {
        type: 'string',
        description:
          'Filter for transfers whose `date` field is on or after this date, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      transactionDateTo: {
        type: 'string',
        description:
          'Filter for transfers whose `date` field is on or before this date, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      updatedAfter: {
        type: 'string',
        description:
          'Filter for transfers updated on or after this date and time, in ISO 8601 format (YYYY-MM-DDTHH:mm:ss). If you only provide a date (YYYY-MM-DD), the time is assumed to be 00:00:00 of that day.',
      },
      updatedBefore: {
        type: 'string',
        description:
          'Filter for transfers updated on or before this date and time, in ISO 8601 format (YYYY-MM-DDTHH:mm:ss). If you only provide a date (YYYY-MM-DD), the time is assumed to be 23:59:59 of that day.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await conductor.qbd.transfers.list(body).asResponse();
  return asTextContentResult(await maybeFilter(args, await response.json()));
};

export default { metadata, tool, handler };
