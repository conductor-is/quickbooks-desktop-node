// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.payroll_wage_items',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/payroll-wage-items',
};

export const tool: Tool = {
  name: 'create_qbd_payroll_wage_items',
  description: 'Creates a new payroll wage item.',
  inputSchema: {
    type: 'object',
    properties: {
      expenseAccountId: {
        type: 'string',
        description: 'The expense account used to track wage expenses paid through this payroll wage item.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this payroll wage item, unique across all payroll wage items.\n\n**NOTE**: Payroll wage items do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
      },
      wageType: {
        type: 'string',
        description:
          'Categorizes how this payroll wage item calculates pay - can be hourly (regular, overtime, sick, or vacation), salary (regular, sick, or vacation), bonus, or commission based.',
        enum: [
          'bonus',
          'commission',
          'hourly_overtime',
          'hourly_regular',
          'hourly_sick',
          'hourly_vacation',
          'salary_regular',
          'salary_sick',
          'salary_vacation',
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
          'Indicates whether this payroll wage item is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
    },
  },
};

export const handler = async (client: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.qbd.payrollWageItems.create(body));
};

export default { metadata, tool, handler };
