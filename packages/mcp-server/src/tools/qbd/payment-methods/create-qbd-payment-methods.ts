// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.payment_methods',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/payment-methods',
};

export const tool: Tool = {
  name: 'create_qbd_payment_methods',
  description: 'Creates a new payment method.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this payment method, unique across all payment methods.\n\n**NOTE**: Payment methods do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
      },
      paymentMethodType: {
        type: 'string',
        description: "This payment method's type.",
        enum: [
          'american_express',
          'cash',
          'check',
          'debit_card',
          'discover',
          'e_check',
          'gift_card',
          'master_card',
          'other',
          'other_credit_card',
          'visa',
        ],
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this payment method is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
    },
  },
};

export const handler = async (client: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.qbd.paymentMethods.create(body));
};

export default { metadata, tool, handler };
