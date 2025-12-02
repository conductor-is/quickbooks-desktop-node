// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.deleted_list_objects',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/deleted-list-objects',
};

export const tool: Tool = {
  name: 'list_qbd_deleted_list_objects',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nLists deleted non-transaction list-objects (e.g., customers, vendors, employees, items) from the last 90 days. Results are grouped by list-object type and ordered by actual delete time (ascending). For deleted transactions (e.g., invoices, bills, estimates), see the deleted-transactions endpoint.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/deleted_list_object_list_response',\n  $defs: {\n    deleted_list_object_list_response: {\n      type: 'object',\n      properties: {\n        data: {\n          type: 'array',\n          description: 'The array of deleted list-objects.',\n          items: {\n            $ref: '#/$defs/deleted_list_object'\n          }\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"list\"`.',\n          enum: [            'list'\n          ]\n        },\n        url: {\n          type: 'string',\n          description: 'The endpoint URL where this list can be accessed.'\n        }\n      },\n      required: [        'data',\n        'objectType',\n        'url'\n      ]\n    },\n    deleted_list_object: {\n      type: 'object',\n      title: 'The Deleted List-Object object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier assigned by QuickBooks to this deleted list-object. This ID is unique across all deleted list-objects but not across different QuickBooks object types.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this deleted list-object was created, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        deletedAt: {\n          type: 'string',\n          description: 'The date and time when this deleted list-object was deleted, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local timezone of the end-user\\'s computer.'\n        },\n        listType: {\n          type: 'string',\n          description: 'The type of deleted list object (i.e., non-transaction).',\n          enum: [            'account',\n            'billing_rate',\n            'class',\n            'currency',\n            'customer',\n            'customer_message',\n            'customer_type',\n            'date_driven_terms',\n            'employee',\n            'inventory_site',\n            'item_discount',\n            'item_fixed_asset',\n            'item_group',\n            'item_inventory',\n            'item_inventory_assembly',\n            'item_non_inventory',\n            'item_other_charge',\n            'item_payment',\n            'item_sales_tax',\n            'item_sales_tax_group',\n            'item_service',\n            'item_subtotal',\n            'job_type',\n            'other_name',\n            'payment_method',\n            'payroll_item_non_wage',\n            'payroll_item_wage',\n            'price_level',\n            'sales_representative',\n            'sales_tax_code',\n            'ship_method',\n            'standard_terms',\n            'to_do',\n            'unit_of_measure_set',\n            'vehicle',\n            'vendor',\n            'vendor_type',\n            'workers_comp_code'\n          ]\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_deleted_list_object\"`.',\n          enum: [            'qbd_deleted_list_object'\n          ]\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'deletedAt',\n        'listType',\n        'objectType'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      objectTypes: {
        type: 'array',
        description: 'Filter for deleted list-objects by their list-object type(s).',
        items: {
          type: 'string',
          enum: [
            'account',
            'billing_rate',
            'class',
            'currency',
            'customer',
            'customer_message',
            'customer_type',
            'date_driven_terms',
            'employee',
            'inventory_site',
            'item_discount',
            'item_fixed_asset',
            'item_group',
            'item_inventory',
            'item_inventory_assembly',
            'item_non_inventory',
            'item_other_charge',
            'item_payment',
            'item_sales_tax',
            'item_sales_tax_group',
            'item_service',
            'item_subtotal',
            'job_type',
            'other_name',
            'payment_method',
            'payroll_item_non_wage',
            'payroll_item_wage',
            'price_level',
            'sales_representative',
            'sales_tax_code',
            'ship_method',
            'standard_terms',
            'to_do',
            'unit_of_measure_set',
            'vehicle',
            'vendor',
            'vendor_type',
            'workers_comp_code',
          ],
        },
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      deletedAfter: {
        type: 'string',
        description:
          "Filter for deleted list-objects deleted on or after this date/time, within the last 90 days (QuickBooks limit). Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the **start of the specified day** in the local timezone of the end-user's computer (e.g., `2025-01-01` → `2025-01-01T00:00:00`).\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop interprets the timestamp in the local timezone of the end-user's computer.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop interprets the timestamp using the specified timezone.",
      },
      deletedBefore: {
        type: 'string',
        description:
          "Filter for deleted list-objects deleted on or before this date/time, within the last 90 days (QuickBooks limit). Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the **end of the specified day** in the local timezone of the end-user's computer (e.g., `2025-01-01` → `2025-01-01T23:59:59`).\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop interprets the timestamp in the local timezone of the end-user's computer.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop interprets the timestamp using the specified timezone.",
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['objectTypes', 'conductorEndUserId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await conductor.qbd.deletedListObjects.list(body)),
    );
  } catch (error) {
    if (error instanceof Conductor.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
