// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.transfers',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/transfers/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_transfers',
  description: 'Updates an existing transfer.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the transfer to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the transfer object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      amount: {
        type: 'string',
        description: 'The monetary amount of this transfer, represented as a decimal string.',
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
    },
  },
};

export const handler = (client: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return client.qbd.transfers.update(id, body);
};

export default { metadata, tool, handler };
