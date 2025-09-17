// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.date_driven_terms',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/date-driven-terms',
};

export const tool: Tool = {
  name: 'create_qbd_date_driven_terms',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates a date-driven term that sets the payment due on a specific day of the month and can optionally grant an early-payment discount before `discountDayOfMonth`. Use it when you need due dates tied to calendar days instead of a fixed number of days after the transaction.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/date_driven_term',\n  $defs: {\n    date_driven_term: {\n      type: 'object',\n      title: 'The Date-Driven Term object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this date-driven term. This ID is unique across all date-driven terms but not across different QuickBooks object types.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this date-driven term was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        discountDayOfMonth: {\n          type: 'number',\n          description: 'The day of the month within which payment must be received to qualify for the discount specified by `discountPercentage`.'\n        },\n        discountPercentage: {\n          type: 'string',\n          description: 'The discount percentage applied to the payment if received on or before the specified `discountDayOfMonth`. The value is between 0 and 100.'\n        },\n        dueDayOfMonth: {\n          type: 'number',\n          description: 'The day of the month when full payment is due without discount.'\n        },\n        gracePeriodDays: {\n          type: 'number',\n          description: 'The number of days before `dueDayOfMonth` when an invoice or bill issued within this threshold is considered due the following month. For example, with `dueDayOfMonth` set to 15 and `gracePeriodDays` set to 2, an invoice issued on the 13th would be due on the 15th of the next month, while an invoice issued on the 12th would be due on the 15th of the current month.'\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this date-driven term is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive unique name of this date-driven term, unique across all date-driven terms.\\n\\n**NOTE**: Date-driven terms do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_date_driven_term\"`.',\n          enum: [            'qbd_date_driven_term'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this date-driven term object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this date-driven term was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'discountDayOfMonth',\n        'discountPercentage',\n        'dueDayOfMonth',\n        'gracePeriodDays',\n        'isActive',\n        'name',\n        'objectType',\n        'revisionNumber',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      dueDayOfMonth: {
        type: 'number',
        description: 'The day of the month when full payment is due without discount.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this date-driven term, unique across all date-driven terms.\n\n**NOTE**: Date-driven terms do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      discountDayOfMonth: {
        type: 'number',
        description:
          'The day of the month within which payment must be received to qualify for the discount specified by `discountPercentage`.',
      },
      discountPercentage: {
        type: 'string',
        description:
          'The discount percentage applied to the payment if received on or before the specified `discountDayOfMonth`. The value is between 0 and 100.',
      },
      gracePeriodDays: {
        type: 'number',
        description:
          'The number of days before `dueDayOfMonth` when an invoice or bill issued within this threshold is considered due the following month. For example, with `dueDayOfMonth` set to 15 and `gracePeriodDays` set to 2, an invoice issued on the 13th would be due on the 15th of the next month, while an invoice issued on the 12th would be due on the 15th of the current month.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this date-driven term is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['dueDayOfMonth', 'name', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await conductor.qbd.dateDrivenTerms.create(body)));
};

export default { metadata, tool, handler };
