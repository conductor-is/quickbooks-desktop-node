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
  httpPath: '/quickbooks-desktop/sales-representatives/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_sales_representatives',
  description: 'Updates an existing sales representative.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the sales representative to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the sales representative object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      entityId: {
        type: 'string',
        description:
          "The sales representative's corresponding person entity in QuickBooks, stored as either an employee, vendor, or other-name entry.",
      },
      initial: {
        type: 'string',
        description: "The initials of this sales representative's name.\n\nMaximum length: 5 characters.",
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this sales representative is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
    },
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.salesRepresentatives.update(id, body));
};

export default { metadata, tool, handler };
