// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.standard_terms',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/standard-terms',
};

export const tool: Tool = {
  name: 'create_qbd_standard_terms',
  description: 'Creates a new standard term.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this standard term, unique across all standard terms.\n\n**NOTE**: Standard terms do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      discountDays: {
        type: 'number',
        description:
          'The number of days within which payment must be received to qualify for the discount specified by `discountPercentage`.',
      },
      discountPercentage: {
        type: 'string',
        description:
          'The discount percentage applied to the payment if received within the number of days specified by `discountDays`. The value is between 0 and 100.',
      },
      dueDays: {
        type: 'number',
        description: 'The number of days until payment is due.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this standard term is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
    },
  },
};

export const handler = async (client: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.qbd.standardTerms.create(body));
};

export default { metadata, tool, handler };
