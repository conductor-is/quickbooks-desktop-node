// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.transfers',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/transfers',
};

export const tool: Tool = {
  name: 'create_qbd_transfers',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates a new transfer.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/transfer',\n  $defs: {\n    transfer: {\n      type: 'object',\n      title: 'The Transfer object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this transfer. This ID is unique across all transaction types.'\n        },\n        amount: {\n          type: 'string',\n          description: 'The monetary amount of this transfer, represented as a decimal string.'\n        },\n        class: {\n          type: 'object',\n          description: 'The transfer\\'s class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this transfer was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        memo: {\n          type: 'string',\n          description: 'A memo or note for this transfer.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_transfer\"`.',\n          enum: [            'qbd_transfer'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this transfer object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        sourceAccount: {\n          type: 'object',\n          description: 'The account from which money will be transferred.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        sourceAccountBalance: {\n          type: 'string',\n          description: 'The balance of the account from which money will be transferred.'\n        },\n        targetAccount: {\n          type: 'object',\n          description: 'The account to which money will be transferred.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        targetAccountBalance: {\n          type: 'string',\n          description: 'The balance of the account to which money will be transferred.'\n        },\n        transactionDate: {\n          type: 'string',\n          description: 'The date of this transfer, in ISO 8601 format (YYYY-MM-DD).',\n          format: 'date'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this transfer was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        }\n      },\n      required: [        'id',\n        'amount',\n        'class',\n        'createdAt',\n        'memo',\n        'objectType',\n        'revisionNumber',\n        'sourceAccount',\n        'sourceAccountBalance',\n        'targetAccount',\n        'targetAccountBalance',\n        'transactionDate',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      amount: {
        type: 'string',
        description: 'The monetary amount of this transfer, represented as a decimal string.',
      },
      sourceAccountId: {
        type: 'string',
        description: 'The account from which money will be transferred.',
      },
      targetAccountId: {
        type: 'string',
        description: 'The account to which money will be transferred.',
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this transfer, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      classId: {
        type: 'string',
        description:
          "The transfer's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default.",
      },
      memo: {
        type: 'string',
        description: 'A memo or note for this transfer.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['amount', 'sourceAccountId', 'targetAccountId', 'transactionDate', 'Conductor-End-User-Id'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await conductor.qbd.transfers.create(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
