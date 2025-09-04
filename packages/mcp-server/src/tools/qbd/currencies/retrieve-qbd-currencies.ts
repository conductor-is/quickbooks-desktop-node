// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.currencies',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/currencies/{id}',
};

export const tool: Tool = {
  name: 'retrieve_qbd_currencies',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieves a currency by ID.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/currency',\n  $defs: {\n    currency: {\n      type: 'object',\n      title: 'The Currency object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this currency. This ID is unique across all currencies but not across different QuickBooks object types.'\n        },\n        asOfDate: {\n          type: 'string',\n          description: 'The date when the exchange rate for this currency was last updated, in ISO 8601 format (YYYY-MM-DD).',\n          format: 'date'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this currency was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        currencyCode: {\n          type: 'string',\n          description: 'The internationally accepted currency code used by this currency, typically based on the ISO 4217 standard (for example, USD for US Dollars). Built-in QuickBooks currencies follow ISO 4217. For user-defined currencies, following ISO 4217 is recommended but not required. In many cases, the three-letter code is formed from the country\\'s two-letter internet code plus a currency letter (e.g., BZ + D → BZD for Belize Dollar).'\n        },\n        currencyFormat: {\n          type: 'object',\n          title: 'The Currency Format object',\n          description: 'Controls how this currency displays thousands separators, grouping, and decimal places.',\n          properties: {\n            decimalPlaces: {\n              type: 'string',\n              description: 'Controls the number of decimal places displayed for currency values. Use `0` to hide decimals or `2` to display cents.',\n              enum: [                '0',\n                '2'\n              ]\n            },\n            decimalSeparator: {\n              type: 'string',\n              description: 'Controls the decimal separator when displaying currency values (for example, \"1.00\" vs \"1,00\"). Defaults to period.',\n              enum: [                'comma',\n                'period'\n              ]\n            },\n            thousandSeparator: {\n              type: 'string',\n              description: 'Controls the thousands separator when displaying currency values (for example, \"1,000,000\"). Defaults to comma.',\n              enum: [                'apostrophe',\n                'comma',\n                'period',\n                'space'\n              ]\n            },\n            thousandSeparatorGrouping: {\n              type: 'string',\n              description: 'Controls how digits are grouped for thousands when displaying currency values (for example, \"10,000,000\").',\n              enum: [                'x_xx_xx_xxx',\n                'xx_xxx_xxx'\n              ]\n            }\n          },\n          required: [            'decimalPlaces',\n            'decimalSeparator',\n            'thousandSeparator',\n            'thousandSeparatorGrouping'\n          ]\n        },\n        exchangeRate: {\n          type: 'number',\n          description: 'The market exchange rate between this currency\\'s currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).'\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this currency is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        isUserDefinedCurrency: {\n          type: 'boolean',\n          description: 'Indicates whether this currency was created by a QuickBooks user (`true`) or is a built-in currency (`false`).'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive unique name of this currency, unique across all currencies. For built-in currencies, the name is the internationally accepted currency name and is not editable.\\n\\n**NOTE**: Currencies do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_currency\"`.',\n          enum: [            'qbd_currency'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this currency object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this currency was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        }\n      },\n      required: [        'id',\n        'asOfDate',\n        'createdAt',\n        'currencyCode',\n        'currencyFormat',\n        'exchangeRate',\n        'isActive',\n        'isUserDefinedCurrency',\n        'name',\n        'objectType',\n        'revisionNumber',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the currency to retrieve.',
      },
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
    required: ['id', 'conductorEndUserId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await conductor.qbd.currencies.retrieve(id, body)));
};

export default { metadata, tool, handler };
