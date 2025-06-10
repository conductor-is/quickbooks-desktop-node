// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.transfers',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/transfers',
};

export const tool: Tool = {
  name: 'create_qbd_transfers',
  description: 'Creates a new transfer.',
  inputSchema: {
    type: 'object',
    properties: {
      amount: {
        type: 'string',
        description: 'The monetary amount of this transfer, represented as a decimal string.',
      },
      sourceAccountId: {
        type: 'string',
        description: 'The account from which money will be transferred.',
      },
      targetAccountId: {
        type: 'string',
        description: 'The account to which money will be transferred.',
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this transfer, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      classId: {
        type: 'string',
        description:
          "The transfer's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default.",
      },
      memo: {
        type: 'string',
        description: 'A memo or note for this transfer.',
      },
    },
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.qbd.transfers.create(body));
};

export default { metadata, tool, handler };
