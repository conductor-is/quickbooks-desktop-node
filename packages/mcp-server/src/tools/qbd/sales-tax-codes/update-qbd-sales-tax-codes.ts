// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.sales_tax_codes',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/sales-tax-codes/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_sales_tax_codes',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdates a sales-tax code’s name, activity status, or linked tax items. Once a code has been used you can’t flip it between taxable and non-taxable, and the built-in TAX/NON codes keep their original taxable setting, so plan new codes if you need a different tax status.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/sales_tax_code',\n  $defs: {\n    sales_tax_code: {\n      type: 'object',\n      title: 'The Sales-Tax Code object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this sales-tax code. This ID is unique across all sales-tax codes but not across different QuickBooks object types.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this sales-tax code was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        description: {\n          type: 'string',\n          description: 'A description of this sales-tax code.'\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this sales-tax code is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        isTaxable: {\n          type: 'boolean',\n          description: 'Indicates whether this sales-tax code is tracking taxable sales. This field cannot be modified once the sales-tax code has been used in a transaction.'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive unique name of this sales-tax code, unique across all sales-tax codes. This short name will appear on sales forms to identify the tax status of an item.\\n\\n**NOTE**: Sales-tax codes do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_sales_tax_code\"`.',\n          enum: [            'qbd_sales_tax_code'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this sales-tax code object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        salesTaxItem: {\n          type: 'object',\n          description: 'The sales-tax item used to calculate the actual tax amount for this sales-tax code\\'s transactions by applying a specific tax rate collected for a single tax agency. Unlike `salesTaxCode`, which only indicates general taxability, this field drives the actual tax calculation and reporting.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this sales-tax code was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'description',\n        'isActive',\n        'isTaxable',\n        'name',\n        'objectType',\n        'revisionNumber',\n        'salesTaxItem',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the sales-tax code to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the sales-tax code object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      description: {
        type: 'string',
        description: 'A description of this sales-tax code.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this sales-tax code is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      isTaxable: {
        type: 'boolean',
        description:
          'Indicates whether this sales-tax code is tracking taxable sales. This field cannot be modified once the sales-tax code has been used in a transaction.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this sales-tax code, unique across all sales-tax codes. This short name will appear on sales forms to identify the tax status of an item.\n\n**NOTE**: Sales-tax codes do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 3 characters.',
      },
      salesTaxItemId: {
        type: 'string',
        description:
          "The sales-tax item used to calculate the actual tax amount for this sales-tax code's transactions by applying a specific tax rate collected for a single tax agency. Unlike `salesTaxCode`, which only indicates general taxability, this field drives the actual tax calculation and reporting.",
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id', 'revisionNumber', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await conductor.qbd.salesTaxCodes.update(id, body)),
  );
};

export default { metadata, tool, handler };
