// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.sales_tax_items',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/sales-tax-items',
};

export const tool: Tool = {
  name: 'create_qbd_sales_tax_items',
  description: 'Creates a new sales-tax item.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this sales-tax item, unique across all sales-tax items.\n\n**NOTE**: Sales-tax items do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
      },
      conductorEndUserId: {
        type: 'string',
        description: 'The ID of the End-User to receive this request.',
      },
      barcode: {
        type: 'object',
        description: "The sales-tax item's barcode.",
        properties: {
          allowOverride: {
            type: 'boolean',
            description: 'Indicates whether to allow the barcode to be overridden.',
          },
          assignEvenIfUsed: {
            type: 'boolean',
            description: 'Indicates whether to assign the barcode even if it is already used.',
          },
          value: {
            type: 'string',
            description: "The item's barcode value.",
          },
        },
      },
      classId: {
        type: 'string',
        description:
          "The sales-tax item's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default.",
      },
      description: {
        type: 'string',
        description:
          "The sales-tax item's description that will appear on sales forms that include this item.",
      },
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this sales-tax item is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      salesTaxReturnLineId: {
        type: 'string',
        description:
          'The specific line on the sales tax return form where the tax collected using this sales-tax item should be reported.',
      },
      taxRate: {
        type: 'string',
        description:
          'The tax rate defined by this sales-tax item, represented as a decimal string. For example, "7.5" represents a 7.5% tax rate. This rate determines the amount of sales tax applied when this item is used in transactions. If a non-zero `taxRate` is specified, then the `taxVendor` field is required.',
      },
      taxVendorId: {
        type: 'string',
        description:
          'The tax agency (vendor) to whom collected sales taxes are owed for this sales-tax item. This field refers to a vendor in QuickBooks that represents the tax authority. If a non-zero `taxRate` is specified, then `taxVendor` is required.',
      },
    },
    required: ['name', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  try {
    return asTextContentResult(await conductor.qbd.salesTaxItems.create(body));
  } catch (error) {
    if (error instanceof Conductor.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
