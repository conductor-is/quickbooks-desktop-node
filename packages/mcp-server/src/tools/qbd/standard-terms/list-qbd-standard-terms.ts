// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.standard_terms',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/standard-terms',
};

export const tool: Tool = {
  name: 'list_qbd_standard_terms',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns a list of standard terms. NOTE: QuickBooks Desktop does not support pagination for standard terms; hence, there is no `cursor` parameter. Users typically have few standard terms.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'The array of standard terms.',\n      items: {\n        $ref: '#/$defs/standard_term'\n      }\n    },\n    objectType: {\n      type: 'string',\n      description: 'The type of object. This value is always `\"list\"`.',\n      enum: [        'list'\n      ]\n    },\n    url: {\n      type: 'string',\n      description: 'The endpoint URL where this list can be accessed.'\n    }\n  },\n  required: [    'data',\n    'objectType',\n    'url'\n  ],\n  $defs: {\n    standard_term: {\n      type: 'object',\n      title: 'The Standard Term object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this standard term. This ID is unique across all standard terms but not across different QuickBooks object types.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this standard term was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user\\'s time zone in QuickBooks.'\n        },\n        discountDays: {\n          type: 'number',\n          description: 'The number of days within which payment must be received to qualify for the discount specified by `discountPercentage`.'\n        },\n        discountPercentage: {\n          type: 'string',\n          description: 'The discount percentage applied to the payment if received within the number of days specified by `discountDays`. The value is between 0 and 100.'\n        },\n        dueDays: {\n          type: 'number',\n          description: 'The number of days until payment is due.'\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this standard term is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive unique name of this standard term, unique across all standard terms.\\n\\n**NOTE**: Standard terms do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_standard_term\"`.',\n          enum: [            'qbd_standard_term'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this standard term object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this standard term was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user\\'s time zone in QuickBooks.'\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'discountDays',\n        'discountPercentage',\n        'dueDays',\n        'isActive',\n        'name',\n        'objectType',\n        'revisionNumber',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
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
          'Filter for specific standard terms by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of objects to return.\n\n**IMPORTANT**: QuickBooks Desktop does not support cursor-based pagination for standard terms. This parameter will limit the response size, but you cannot fetch subsequent results using a cursor. For pagination, use the name-range parameters instead (e.g., `nameFrom=A&nameTo=B`).\n\nWhen this parameter is omitted, the endpoint returns all standard terms without limit, unlike paginated endpoints which default to 150 records. This is acceptable because standard terms typically have low record counts.',
      },
      nameContains: {
        type: 'string',
        description:
          'Filter for standard terms whose `name` contains this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or `nameEndsWith`.',
      },
      nameEndsWith: {
        type: 'string',
        description:
          'Filter for standard terms whose `name` ends with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameStartsWith`.',
      },
      nameFrom: {
        type: 'string',
        description:
          'Filter for standard terms whose `name` is alphabetically greater than or equal to this value.',
      },
      names: {
        type: 'array',
        description:
          'Filter for specific standard terms by their name(s), case-insensitive. Like `id`, `name` is a unique identifier for a standard term.\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      nameStartsWith: {
        type: 'string',
        description:
          'Filter for standard terms whose `name` starts with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameEndsWith`.',
      },
      nameTo: {
        type: 'string',
        description:
          'Filter for standard terms whose `name` is alphabetically less than or equal to this value.',
      },
      status: {
        type: 'string',
        description: 'Filter for standard terms that are active, inactive, or both.',
        enum: ['active', 'all', 'inactive'],
      },
      updatedAfter: {
        type: 'string',
        description:
          'Filter for standard terms updated on or after this date/time. Format: ISO 8601. Accepts date-only (YYYY-MM-DD), datetime without timezone (YYYY-MM-DDTHH:mm:ss), or datetime with timezone (YYYY-MM-DDTHH:mm:ss±HH:mm). Date-only and timezone-less datetimes are passed through for QuickBooks Desktop to interpret in the host machine’s local timezone. If the datetime includes a timezone (e.g., `+05:30` or `Z`), QuickBooks Desktop uses that timezone to interpret the timestamp.',
      },
      updatedBefore: {
        type: 'string',
        description:
          'Filter for standard terms updated on or before this date/time. Format: ISO 8601. Accepts date-only (YYYY-MM-DD), datetime without timezone (YYYY-MM-DDTHH:mm:ss), or datetime with timezone (YYYY-MM-DDTHH:mm:ss±HH:mm). Date-only and timezone-less datetimes are passed through for QuickBooks Desktop to interpret in the host machine’s local timezone. If the datetime includes a timezone (e.g., `+05:30` or `Z`), QuickBooks Desktop uses that timezone to interpret the timestamp.',
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
  return asTextContentResult(await maybeFilter(jq_filter, await conductor.qbd.standardTerms.list(body)));
};

export default { metadata, tool, handler };
