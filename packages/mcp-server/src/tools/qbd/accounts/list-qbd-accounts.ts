// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.accounts',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/accounts',
};

export const tool: Tool = {
  name: 'list_qbd_accounts',
  description:
    'Returns a list of accounts. NOTE: QuickBooks Desktop does not support pagination for accounts; hence, there is no `cursor` parameter. Users typically have few accounts.',
  inputSchema: {
    type: 'object',
    properties: {
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      accountType: {
        type: 'string',
        description: 'Filter for accounts of this type.',
        enum: [
          'accounts_payable',
          'accounts_receivable',
          'bank',
          'cost_of_goods_sold',
          'credit_card',
          'equity',
          'expense',
          'fixed_asset',
          'income',
          'long_term_liability',
          'non_posting',
          'other_asset',
          'other_current_asset',
          'other_current_liability',
          'other_expense',
          'other_income',
        ],
      },
      currencyIds: {
        type: 'array',
        description: 'Filter for accounts in these currencies.',
        items: {
          type: 'string',
        },
      },
      fullNames: {
        type: 'array',
        description:
          'Filter for specific accounts by their full-name(s), case-insensitive. Like `id`, `fullName` is a unique identifier for an account, formed by by combining the names of its parent objects with its own `name`, separated by colons. For example, if an account is under "Corporate" and has the `name` "Accounts-Payable", its `fullName` would be "Corporate:Accounts-Payable".\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      ids: {
        type: 'array',
        description:
          'Filter for specific accounts by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of objects to return.\n\n**IMPORTANT**: QuickBooks Desktop does not support cursor-based pagination for accounts. This parameter will limit the response size, but you cannot fetch subsequent results using a cursor. For pagination, use the name-range parameters instead (e.g., `nameFrom=A&nameTo=B`).\n\nWhen this parameter is omitted, the endpoint returns all accounts without limit, unlike paginated endpoints which default to 150 records. This is acceptable because accounts typically have low record counts.',
      },
      nameContains: {
        type: 'string',
        description:
          'Filter for accounts whose `name` contains this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or `nameEndsWith`.',
      },
      nameEndsWith: {
        type: 'string',
        description:
          'Filter for accounts whose `name` ends with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameStartsWith`.',
      },
      nameFrom: {
        type: 'string',
        description:
          'Filter for accounts whose `name` is alphabetically greater than or equal to this value.',
      },
      nameStartsWith: {
        type: 'string',
        description:
          'Filter for accounts whose `name` starts with this substring, case-insensitive.\n\n**NOTE**: If you use this parameter, you cannot also use `nameContains` or `nameEndsWith`.',
      },
      nameTo: {
        type: 'string',
        description: 'Filter for accounts whose `name` is alphabetically less than or equal to this value.',
      },
      status: {
        type: 'string',
        description: 'Filter for accounts that are active, inactive, or both.',
        enum: ['active', 'all', 'inactive'],
      },
      updatedAfter: {
        type: 'string',
        description:
          'Filter for accounts updated on or after this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets this as midnight in the host machine’s local timezone.\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop uses the host machine’s local timezone to interpret the timestamp.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop uses this timezone to interpret the timestamp.',
      },
      updatedBefore: {
        type: 'string',
        description:
          'Filter for accounts updated on or before this date/time. Accepts the following ISO 8601 formats:\n- **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets this as midnight in the host machine’s local timezone.\n- **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop uses the host machine’s local timezone to interpret the timestamp.\n- **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop uses this timezone to interpret the timestamp.',
      },
    },
    required: ['conductorEndUserId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.qbd.accounts.list(body));
};

export default { metadata, tool, handler };
