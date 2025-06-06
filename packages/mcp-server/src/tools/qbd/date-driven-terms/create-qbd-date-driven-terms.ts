// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.date_driven_terms',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/date-driven-terms',
};

export const tool: Tool = {
  name: 'create_qbd_date_driven_terms',
  description: 'Creates a new date-driven term.',
  inputSchema: {
    type: 'object',
    properties: {
      dueDayOfMonth: {
        type: 'number',
        description: 'The day of the month when full payment is due without discount.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this date-driven term, unique across all date-driven terms.\n\n**NOTE**: Date-driven terms do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      discountDayOfMonth: {
        type: 'number',
        description:
          'The day of the month within which payment must be received to qualify for the discount specified by `discountPercentage`.',
      },
      discountPercentage: {
        type: 'string',
        description:
          'The discount percentage applied to the payment if received on or before the specified `discountDayOfMonth`. The value is between 0 and 100.',
      },
      gracePeriodDays: {
        type: 'number',
        description:
          'The number of days before `dueDayOfMonth` when an invoice or bill issued within this threshold is considered due the following month. For example, with `dueDayOfMonth` set to 15 and `gracePeriodDays` set to 2, an invoice issued on the 13th would be due on the 15th of the next month, while an invoice issued on the 12th would be due on the 15th of the current month.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this date-driven term is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
    },
  },
};

export const handler = async (client: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.qbd.dateDrivenTerms.create(body));
};

export default { metadata, tool, handler };
