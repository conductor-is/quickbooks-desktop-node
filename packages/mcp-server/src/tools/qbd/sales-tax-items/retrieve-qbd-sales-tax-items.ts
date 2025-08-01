// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.sales_tax_items',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/sales-tax-items/{id}',
};

export const tool: Tool = {
  name: 'retrieve_qbd_sales_tax_items',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieves a sales-tax item by ID.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/sales_tax_item',\n  $defs: {\n    sales_tax_item: {\n      type: 'object',\n      title: 'The Sales-Tax Item object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this sales-tax item. This ID is unique across all sales-tax items but not across different QuickBooks object types.'\n        },\n        barcode: {\n          type: 'string',\n          description: 'The sales-tax item\\'s barcode.'\n        },\n        class: {\n          type: 'object',\n          description: 'The sales-tax item\\'s class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this sales-tax item was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user\\'s time zone in QuickBooks.'\n        },\n        customFields: {\n          type: 'array',\n          description: 'The custom fields for the sales-tax item object, added as user-defined data extensions, not included in the standard QuickBooks object.',\n          items: {\n            type: 'object',\n            title: 'The Custom Field object',\n            properties: {\n              name: {\n                type: 'string',\n                description: 'The name of the custom field, unique for the specified `ownerId`. For public custom fields, this name is visible as a label in the QuickBooks UI.'\n              },\n              ownerId: {\n                type: 'string',\n                description: 'The identifier of the owner of the custom field, which QuickBooks internally calls a \"data extension\". For public custom fields visible in the UI, such as those added by the QuickBooks user, this is always \"0\". For private custom fields that are only visible to the application that created them, this is a valid GUID identifying the owning application. Internally, Conductor always fetches all public custom fields (those with an `ownerId` of \"0\") for all objects.'\n              },\n              type: {\n                type: 'string',\n                description: 'The data type of this custom field.',\n                enum: [                  'amount_type',\n                  'date_time_type',\n                  'integer_type',\n                  'percent_type',\n                  'price_type',\n                  'quantity_type',\n                  'string_1024_type',\n                  'string_255_type'\n                ]\n              },\n              value: {\n                type: 'string',\n                description: 'The value of this custom field. The maximum length depends on the field\\'s data type.'\n              }\n            },\n            required: [              'name',\n              'ownerId',\n              'type',\n              'value'\n            ]\n          }\n        },\n        description: {\n          type: 'string',\n          description: 'The sales-tax item\\'s description that will appear on sales forms that include this item.'\n        },\n        externalId: {\n          type: 'string',\n          description: 'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.'\n        },\n        isActive: {\n          type: 'boolean',\n          description: 'Indicates whether this sales-tax item is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.'\n        },\n        name: {\n          type: 'string',\n          description: 'The case-insensitive unique name of this sales-tax item, unique across all sales-tax items.\\n\\n**NOTE**: Sales-tax items do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_sales_tax_item\"`.',\n          enum: [            'qbd_sales_tax_item'\n          ]\n        },\n        revisionNumber: {\n          type: 'string',\n          description: 'The current QuickBooks-assigned revision number of this sales-tax item object, which changes each time the object is modified. When updating this object, you must provide the most recent `revisionNumber` to ensure you\\'re working with the latest data; otherwise, the update will return an error.'\n        },\n        salesTaxReturnLine: {\n          type: 'object',\n          description: 'The specific line on the sales tax return form where the tax collected using this sales-tax item should be reported.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        taxRate: {\n          type: 'string',\n          description: 'The tax rate defined by this sales-tax item, represented as a decimal string. For example, \"7.5\" represents a 7.5% tax rate. This rate determines the amount of sales tax applied when this item is used in transactions. If a non-zero `taxRate` is specified, then the `taxVendor` field is required.'\n        },\n        taxVendor: {\n          type: 'object',\n          description: 'The tax agency (vendor) to whom collected sales taxes are owed for this sales-tax item. This field refers to a vendor in QuickBooks that represents the tax authority. If a non-zero `taxRate` is specified, then `taxVendor` is required.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The unique identifier assigned by QuickBooks to this object. This ID is unique across all objects of the same type, but not across different QuickBooks object types.'\n            },\n            fullName: {\n              type: 'string',\n              description: 'The fully-qualified unique name for this object, formed by combining the names of its parent objects with its own `name`, separated by colons. Not case-sensitive.'\n            }\n          },\n          required: [            'id',\n            'fullName'\n          ]\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time when this sales-tax item was last updated, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user\\'s time zone in QuickBooks.'\n        }\n      },\n      required: [        'id',\n        'barcode',\n        'class',\n        'createdAt',\n        'customFields',\n        'description',\n        'externalId',\n        'isActive',\n        'name',\n        'objectType',\n        'revisionNumber',\n        'salesTaxReturnLine',\n        'taxRate',\n        'taxVendor',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the sales-tax item to retrieve.',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
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
  return asTextContentResult(
    await maybeFilter(jq_filter, await conductor.qbd.salesTaxItems.retrieve(id, body)),
  );
};

export default { metadata, tool, handler };
