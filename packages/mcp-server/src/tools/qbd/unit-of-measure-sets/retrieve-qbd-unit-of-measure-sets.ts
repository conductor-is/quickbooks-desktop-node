// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.unit_of_measure_sets',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/unit-of-measure-sets/{id}',
};

export const tool: Tool = {
  name: 'retrieve_qbd_unit_of_measure_sets',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieves an unit-of-measure set by ID.\n\n**IMPORTANT:** If you need to fetch multiple specific unit-of-measure sets by ID, use the list endpoint instead with the `ids` parameter. It accepts an array of IDs so you can batch the request into a single call, which is significantly faster.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/unit_of_measure_set',\n  $defs: {\n    unit_of_measure_set: {\n      type: 'object',\n      title: 'The Unit-Of-Measure Set object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this unit-of-measure set. This ID is unique across all unit-of-measure sets but not across different QuickBooks object types.'\n        },\n        baseUnit: {\n          type: 'object',\n          title: 'The Base Unit object',\n          description: 'The unit-of-measure set\\'s base unit used to track and price item quantities. If the company file is enabled for a single unit of measure per item, the base unit is the only unit available on transaction line items. If enabled for multiple units per item, the base unit is the default unless overridden by the set\\'s default units.',\n          properties: {\n            abbreviation: {\n              type: 'string',\n              description: 'The base unit\\'s short identifier shown in the QuickBooks U/M field on transaction line items.'\n            },\n            name: {\n              type: 'string',\n              description: 'The case-insensitive unique name of this base unit, unique across all base units.\\n\\n**NOTE**: Base units do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.'\n            }\n          },\n          required: [            'abbreviation',\n            'name'\n          ]\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this unit-of-measure set was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        defaultUnits: {\n          type: 'array',\n          description: 'The unit-of-measure set\\'s default units to appear in the U/M field on transaction line items. You can specify separate defaults for purchases, sales, and shipping.',\n          items: {\n            type: 'object',\n            title: 'The Default Unit object',\n            properties: {\n              unit: {\n                type: 'string',\n                description: 'The unit name for this default unit, as displayed in the U/M field. If the company file is enabled for multiple units per item, this appears as an available unit for the item. Must correspond to the base unit or a related unit defined in this set.'\n              },\n              unitUsedFor: {\n                type: 'string',\n                description: 'Where this default unit is used as the default: purchase line items, sales line items, or shipping lines.',\n                enum: [                  'purchase',\n                  'sales',\n                  'shipping'\n                ]\n              }\n            },\n            required: [              'unit',\n              'unitUsedFor'\n            ]\n          }\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this unit-of-measure set is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive unique name of this unit-of-measure set, unique across all unit-of-measure sets. To ensure this set appears in the QuickBooks UI for companies configured with a single unit per item, prefix the name with \"By the\" (e.g., \"By the Barrel\").\\n\\n**NOTE**: Unit-of-measure sets do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_unit_of_measure_set\"`.',\n          enum: [            'qbd_unit_of_measure_set'\n          ]\n        },\n        relatedUnits: {\n          type: 'array',\n          description: 'The unit-of-measure set\\'s related units, each specifying how many base units they represent (conversion ratio).',\n          items: {\n            type: 'object',\n            title: 'The Related Unit object',\n            properties: {\n              abbreviation: {\n                type: 'string',\n                description: 'The related unit\\'s short identifier shown in the QuickBooks U/M field on transaction line items.'\n              },\n              conversionRatio: {\n                type: 'string',\n                description: 'The number of base units in this related unit, represented as a decimal string. For example, if the base unit is \"box\" and this related unit is \"case\" with `conversionRatio` = \"10\", that means there are 10 boxes in one case.'\n              },\n              name: {\n                type: 'string',\n                description: 'The case-insensitive unique name of this related unit, unique across all related units.\\n\\n**NOTE**: Related units do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.'\n              }\n            },\n            required: [              'abbreviation',\n              'conversionRatio',\n              'name'\n            ]\n          }\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this unit-of-measure set object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        unitOfMeasureType: {\n          type: 'string',\n          description: 'The unit-of-measure set\\'s type. Use \"other\" for a custom type defined in QuickBooks.',\n          enum: [            'area',\n            'count',\n            'length',\n            'other',\n            'time',\n            'volume',\n            'weight'\n          ]\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this unit-of-measure set was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        }\n      },\n      required: [        'id',\n        'baseUnit',\n        'createdAt',\n        'defaultUnits',\n        'isActive',\n        'name',\n        'objectType',\n        'relatedUnits',\n        'revisionNumber',\n        'unitOfMeasureType',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the unit-of-measure set to retrieve.',
      },
      'Conductor-End-User-Id': {
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
    required: ['id', 'Conductor-End-User-Id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await conductor.qbd.unitOfMeasureSets.retrieve(id, body)),
    );
  } catch (error) {
    if (error instanceof Conductor.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
