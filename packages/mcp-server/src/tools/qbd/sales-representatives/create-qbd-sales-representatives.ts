// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.sales_representatives',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/sales-representatives',
};

export const tool: Tool = {
  name: 'create_qbd_sales_representatives',
  description: 'Creates a new sales representative.',
  inputSchema: {
    type: 'object',
    properties: {
      entityId: {
        type: 'string',
        description:
          "The sales representative's corresponding person entity in QuickBooks, stored as either an employee, vendor, or other-name entry.",
      },
      initial: {
        type: 'string',
        description: "The initials of this sales representative's name.\n\nMaximum length: 5 characters.",
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this sales representative is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
    },
  },
};

export const handler = async (client: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.qbd.salesRepresentatives.create(body));
};

export default { metadata, tool, handler };
