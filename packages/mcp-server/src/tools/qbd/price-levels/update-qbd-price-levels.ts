// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.price_levels',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/price-levels/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_price_levels',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdates an existing price level.",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the price level to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the price level object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      currencyId: {
        type: 'string',
        description:
          "The price level's currency. For built-in currencies, the name and code are standard international values. For user-defined currencies, all values are editable.",
      },
      fixedPercentage: {
        type: 'string',
        description:
          'The fixed percentage adjustment applied to all items for this price level (instead of a per-item price level). Once you create the price level, you cannot change this.\n\nWhen this price level is applied to a customer, it automatically adjusts the `rate` and `amount` columns for applicable line items in sales orders and invoices for that customer. This value supports both positive and negative values - a value of "20" increases prices by 20%, while "-10" decreases prices by 10%.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this price level is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this price level, unique across all price levels.\n\n**NOTE**: Price levels do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
      },
      perItemPriceLevels: {
        type: 'array',
        description: 'The per-item price level configurations for this price level.',
        items: {
          type: 'object',
          properties: {
            adjustPercentage: {
              type: 'string',
              description:
                'The percentage adjustment for this per-item price level when using relative pricing. Specifies a percentage to modify pricing, using positive values (e.g., "20") to increase prices by that percentage, or negative values (e.g., "-10") to apply a discount.',
            },
            adjustRelativeTo: {
              type: 'string',
              description:
                "The base value reference for this per-item price level's percentage adjustment. Specifies which price to use as the starting point for the adjustment calculation in the price level.\n\n**NOTE:** The price level must use either a fixed pricing approach (`customPrice` or `customPricePercent`) or a relative adjustment approach (`adjustPercentage` with `adjustRelativeTo`) when configuring per-item price levels.",
              enum: ['cost', 'current_custom_price', 'standard_price'],
            },
            itemId: {
              type: 'string',
              description:
                'The item associated with this per-item price level. This can refer to any good or service that the business buys or sells, including item types such as a service item, inventory item, or special calculation item like a discount item or sales-tax item.',
            },
            customPrice: {
              type: 'string',
              description:
                'The fixed amount custom price for this per-item price level that overrides the standard price for the specified item. Used when setting an absolute price value for the item in this price level.',
            },
            customPricePercent: {
              type: 'string',
              description:
                "The fixed discount percentage for this per-item price level that modifies the specified item's standard price. Used to create a fixed percentage markup or discount specific to this item within this price level.",
            },
          },
          required: ['adjustPercentage', 'adjustRelativeTo', 'itemId'],
        },
      },
    },
    required: ['id', 'revisionNumber', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.priceLevels.update(id, body));
};

export default { metadata, tool, handler };
