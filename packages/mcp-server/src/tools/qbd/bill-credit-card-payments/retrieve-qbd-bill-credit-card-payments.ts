// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.bill_credit_card_payments',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/bill-credit-card-payments/{id}',
};

export const tool: Tool = {
  name: 'retrieve_qbd_bill_credit_card_payments',
  description:
    'Retrieves a bill credit card payment by ID.\n\n**IMPORTANT:** If you need to fetch multiple specific bill credit card payments by ID, use the list endpoint instead with the `ids` parameter. It accepts an array of IDs so you can batch the request into a single call, which is significantly faster.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the bill credit card payment to retrieve.',
      },
      conductorEndUserId: {
        type: 'string',
        description: 'The ID of the End-User to receive this request.',
      },
    },
    required: ['id', 'conductorEndUserId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  try {
    return asTextContentResult(await conductor.qbd.billCreditCardPayments.retrieve(id, body));
  } catch (error) {
    if (error instanceof Conductor.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
