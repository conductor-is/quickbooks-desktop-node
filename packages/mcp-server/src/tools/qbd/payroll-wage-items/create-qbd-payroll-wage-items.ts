// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.payroll_wage_items',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/payroll-wage-items',
};

export const tool: Tool = {
  name: 'create_qbd_payroll_wage_items',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates a new payroll wage item.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/payroll_wage_item',\n  $defs: {\n    payroll_wage_item: {\n      type: 'object',\n      title: 'The Payroll Wage Item object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this payroll wage item. This ID is unique across all payroll wage items but not across different QuickBooks object types.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this payroll wage item was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        expenseAccount: {\n          type: 'object',\n          description: 'The expense account used to track wage expenses paid through this payroll wage item.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this payroll wage item is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive unique name of this payroll wage item, unique across all payroll wage items.\\n\\n**NOTE**: Payroll wage items do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_payroll_wage_item\"`.',\n          enum: [            'qbd_payroll_wage_item'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this payroll wage item object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this payroll wage item was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        wageType: {\n          type: 'string',\n          description: 'Categorizes how this payroll wage item calculates pay - can be hourly (regular, overtime, sick, or vacation), salary (regular, sick, or vacation), bonus, or commission based.',\n          enum: [            'bonus',\n            'commission',\n            'hourly_overtime',\n            'hourly_regular',\n            'hourly_sick',\n            'hourly_vacation',\n            'salary_regular',\n            'salary_sick',\n            'salary_vacation'\n          ]\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'expenseAccount',\n        'isActive',\n        'name',\n        'objectType',\n        'revisionNumber',\n        'updatedAt',\n        'wageType'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      expenseAccountId: {
        type: 'string',
        description: 'The expense account used to track wage expenses paid through this payroll wage item.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this payroll wage item, unique across all payroll wage items.\n\n**NOTE**: Payroll wage items do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
      },
      wageType: {
        type: 'string',
        description:
          'Categorizes how this payroll wage item calculates pay - can be hourly (regular, overtime, sick, or vacation), salary (regular, sick, or vacation), bonus, or commission based.',
        enum: [
          'bonus',
          'commission',
          'hourly_overtime',
          'hourly_regular',
          'hourly_sick',
          'hourly_vacation',
          'salary_regular',
          'salary_sick',
          'salary_vacation',
        ],
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this payroll wage item is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['expenseAccountId', 'name', 'wageType', 'Conductor-End-User-Id'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await conductor.qbd.payrollWageItems.create(body)));
};

export default { metadata, tool, handler };
