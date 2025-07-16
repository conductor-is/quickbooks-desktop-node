// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.standard_terms',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/standard-terms',
};

export const tool: Tool = {
  name: 'create_qbd_standard_terms',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates a new standard term.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/standard_term',\n  $defs: {\n    standard_term: {\n      type: 'object',\n      title: 'The Standard Term object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this standard term. This ID is unique across all standard terms but not across different QuickBooks object types.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this standard term was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user\\'s time zone in QuickBooks.'\n        },\n        discountDays: {\n          type: 'number',\n          description: 'The number of days within which payment must be received to qualify for the discount specified by `discountPercentage`.'\n        },\n        discountPercentage: {\n          type: 'string',\n          description: 'The discount percentage applied to the payment if received within the number of days specified by `discountDays`. The value is between 0 and 100.'\n        },\n        dueDays: {\n          type: 'number',\n          description: 'The number of days until payment is due.'\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this standard term is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive unique name of this standard term, unique across all standard terms.\\n\\n**NOTE**: Standard terms do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_standard_term\"`.',\n          enum: [            'qbd_standard_term'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this standard term object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this standard term was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user\\'s time zone in QuickBooks.'\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'discountDays',\n        'discountPercentage',\n        'dueDays',\n        'isActive',\n        'name',\n        'objectType',\n        'revisionNumber',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this standard term, unique across all standard terms.\n\n**NOTE**: Standard terms do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      discountDays: {
        type: 'number',
        description:
          'The number of days within which payment must be received to qualify for the discount specified by `discountPercentage`.',
      },
      discountPercentage: {
        type: 'string',
        description:
          'The discount percentage applied to the payment if received within the number of days specified by `discountDays`. The value is between 0 and 100.',
      },
      dueDays: {
        type: 'number',
        description: 'The number of days until payment is due.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this standard term is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
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
  return asTextContentResult(await maybeFilter(args, await conductor.qbd.standardTerms.create(body)));
};

export default { metadata, tool, handler };
