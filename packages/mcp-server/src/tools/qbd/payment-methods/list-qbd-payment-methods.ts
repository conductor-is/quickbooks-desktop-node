// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.payment_methods',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/payment-methods',
};

export const tool: Tool = {
  name: 'list_qbd_payment_methods',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns a list of payment methods. NOTE: QuickBooks Desktop does not support pagination for payment methods; hence, there is no `cursor` parameter. Users typically have few payment methods.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'The array of payment methods.',\n      items: {\n        $ref: '#/$defs/payment_method'\n      }\n    },\n    objectType: {\n      type: 'string',\n      description: 'The type of object. This value is always `\"list\"`.',\n      enum: [        'list'\n      ]\n    },\n    url: {\n      type: 'string',\n      description: 'The endpoint URL where this list can be accessed.'\n    }\n  },\n  required: [    'data',\n    'objectType',\n    'url'\n  ],\n  $defs: {\n    payment_method: {\n      type: 'object',\n      title: 'The Payment Method object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this payment method. This ID is unique across all payment methods but not across different QuickBooks object types.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this payment method was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this payment method is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive unique name of this payment method, unique across all payment methods.\\n\\n**NOTE**: Payment methods do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_payment_method\"`.',\n          enum: [            'qbd_payment_method'\n          ]\n        },\n        paymentMethodType: {\n          type: 'string',\n          description: 'This payment method\\'s type.',\n          enum: [            'american_express',\n            'cash',\n            'check',\n            'debit_card',\n            'discover',\n            'e_check',\n            'gift_card',\n            'master_card',\n            'other',\n            'other_credit_card',\n            'visa'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this payment method object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this payment method was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'isActive',\n        'name',\n        'objectType',\n        'paymentMethodType',\n        'revisionNumber',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      ids: {
        type: 'array',
        description:
          'Filter for specific payment methods by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of objects to return.\n\n**IMPORTANT**: QuickBooks Desktop does not support cursor-based pagination for payment methods. This parameter will limit the response size, but you cannot fetch subsequent results using a cursor. For pagination, use the name-range parameters instead (e.g., `nameFrom=A&nameTo=B`).\n\nWhen this parameter is omitted, the endpoint returns all payment methods without limit, unlike paginated endpoints which default to 150 records. This is acceptable because payment methods typically have low record counts.',
      },
      nameContains: {
        type: 'string',
        description:
          'Filter for payment methods whose `name` contains this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or `nameEndsWith`.',
      },
      nameEndsWith: {
        type: 'string',
        description:
          'Filter for payment methods whose `name` ends with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameStartsWith`.',
      },
      nameFrom: {
        type: 'string',
        description:
          'Filter for payment methods whose `name` is alphabetically greater than or equal to this value.',
      },
      names: {
        type: 'array',
        description:
          'Filter for specific payment methods by their name(s), case-insensitive. Like `id`, `name` is a unique identifier for a payment method.\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      nameStartsWith: {
        type: 'string',
        description:
          'Filter for payment methods whose `name` starts with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameEndsWith`.',
      },
      nameTo: {
        type: 'string',
        description:
          'Filter for payment methods whose `name` is alphabetically less than or equal to this value.',
      },
      paymentMethodType: {
        type: 'string',
        description: 'Filter for payment methods of this type.',
        enum: [
          'american_express',
          'cash',
          'check',
          'debit_card',
          'discover',
          'e_check',
          'gift_card',
          'master_card',
          'other',
          'other_credit_card',
          'visa',
        ],
      },
      status: {
        type: 'string',
        description: 'Filter for payment methods that are active, inactive, or both.',
        enum: ['active', 'all', 'inactive'],
      },
      updatedAfter: {
        type: 'string',
        description:
          "Filter for payment methods updated on or after this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets this as midnight in the local timezone of the end-user's computer.\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop uses the local timezone of the end-user's computer to interpret the timestamp.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop uses this timezone to interpret the timestamp.",
      },
      updatedBefore: {
        type: 'string',
        description:
          "Filter for payment methods updated on or before this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets this as midnight in the local timezone of the end-user's computer.\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop uses the local timezone of the end-user's computer to interpret the timestamp.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop uses this timezone to interpret the timestamp.",
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
  return asTextContentResult(await maybeFilter(jq_filter, await conductor.qbd.paymentMethods.list(body)));
};

export default { metadata, tool, handler };
