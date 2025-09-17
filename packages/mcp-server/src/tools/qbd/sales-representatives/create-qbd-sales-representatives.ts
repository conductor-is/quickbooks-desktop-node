// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.sales_representatives',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/sales-representatives',
};

export const tool: Tool = {
  name: 'create_qbd_sales_representatives',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates a sales representative that references an existing employee, vendor, or other-name record so it can be assigned on sales forms.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/sales_representative',\n  $defs: {\n    sales_representative: {\n      type: 'object',\n      title: 'The Sales Representative object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this sales representative. This ID is unique across all sales representatives but not across different QuickBooks object types.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this sales representative was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        entity: {\n          type: 'object',\n          description: 'The sales representative\\'s corresponding person entity in QuickBooks, stored as either an employee, vendor, or other-name entry.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        initial: {\n          type: 'string',\n          description: 'The initials of this sales representative\\'s name.'\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this sales representative is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_sales_representative\"`.',\n          enum: [            'qbd_sales_representative'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this sales representative object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this sales representative was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'entity',\n        'initial',\n        'isActive',\n        'objectType',\n        'revisionNumber',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      entityId: {
        type: 'string',
        description:
          "The sales representative's corresponding person entity in QuickBooks, stored as either an employee, vendor, or other-name entry.",
      },
      initial: {
        type: 'string',
        description: "The initials of this sales representative's name.\n\nMaximum length: 5 characters.",
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this sales representative is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['entityId', 'initial', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await conductor.qbd.salesRepresentatives.create(body)),
  );
};

export default { metadata, tool, handler };
