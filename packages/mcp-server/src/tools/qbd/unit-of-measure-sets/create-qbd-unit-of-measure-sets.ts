// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.unit_of_measure_sets',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/unit-of-measure-sets',
};

export const tool: Tool = {
  name: 'create_qbd_unit_of_measure_sets',
  description:
    'Creates a new unit-of-measure set.\n\nNOTE: The QuickBooks company file must have unit-of-measure enabled (either a single unit per item or multiple units per item). To support both configurations, prefix all UOM set names with "By the" (for example, "By the Barrel"); otherwise, the set may not appear in the QuickBooks UI when the company file is configured for a single unit per item.',
  inputSchema: {
    type: 'object',
    properties: {
      baseUnit: {
        type: 'object',
        description:
          "The unit-of-measure set's base unit used to track and price item quantities. If the company file is enabled for a single unit of measure per item, the base unit is the only unit available on transaction line items. If enabled for multiple units per item, the base unit is the default unless overridden by the set's default units.",
        properties: {
          abbreviation: {
            type: 'string',
            description:
              "The base unit's short identifier shown in the QuickBooks U/M field on transaction line items.\n\nMaximum length: 31 characters.",
          },
          name: {
            type: 'string',
            description:
              'The case-insensitive unique name of this base unit, unique across all base units.\n\n**NOTE**: Base units do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
          },
        },
        required: ['abbreviation', 'name'],
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this unit-of-measure set, unique across all unit-of-measure sets. To ensure this set appears in the QuickBooks UI for companies configured with a single unit per item, prefix the name with "By the" (e.g., "By the Barrel").\n\n**NOTE**: Unit-of-measure sets do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
      },
      unitOfMeasureType: {
        type: 'string',
        description: 'The unit-of-measure set\'s type. Use "other" for a custom type defined in QuickBooks.',
        enum: ['area', 'count', 'length', 'other', 'time', 'volume', 'weight'],
      },
      conductorEndUserId: {
        type: 'string',
        description: 'The ID of the End-User to receive this request.',
      },
      defaultUnits: {
        type: 'array',
        description:
          "The unit-of-measure set's default units to appear in the U/M field on transaction line items. You can specify separate defaults for purchases, sales, and shipping.",
        items: {
          type: 'object',
          properties: {
            unit: {
              type: 'string',
              description:
                'The unit name for this default unit, as displayed in the U/M field. If the company file is enabled for multiple units per item, this appears as an available unit for the item. Must correspond to the base unit or a related unit defined in this set.\n\nMaximum length: 31 characters.',
            },
            unitUsedFor: {
              type: 'string',
              description:
                'Where this default unit is used as the default: purchase line items, sales line items, or shipping lines.',
              enum: ['purchase', 'sales', 'shipping'],
            },
          },
          required: ['unit', 'unitUsedFor'],
        },
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this unit-of-measure set is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      relatedUnits: {
        type: 'array',
        description:
          "The unit-of-measure set's related units, each specifying how many base units they represent (conversion ratio).",
        items: {
          type: 'object',
          properties: {
            abbreviation: {
              type: 'string',
              description:
                "The related unit's short identifier shown in the QuickBooks U/M field on transaction line items.\n\nMaximum length: 31 characters.",
            },
            conversionRatio: {
              type: 'string',
              description:
                'The number of base units in this related unit, represented as a decimal string. For example, if the base unit is "box" and this related unit is "case" with `conversionRatio` = "10", that means there are 10 boxes in one case.',
            },
            name: {
              type: 'string',
              description:
                'The case-insensitive unique name of this related unit, unique across all related units.\n\n**NOTE**: Related units do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
            },
          },
          required: ['abbreviation', 'conversionRatio', 'name'],
        },
      },
    },
    required: ['baseUnit', 'name', 'unitOfMeasureType', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  try {
    return asTextContentResult(await conductor.qbd.unitOfMeasureSets.create(body));
  } catch (error) {
    if (error instanceof Conductor.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
