// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.accounts',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/accounts/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_accounts',
  description:
    'Updates an existing financial account. You can rename the account, adjust numbering, or change supported attributes, but QuickBooks won’t let you convert it to a non-posting type via the API.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the account to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the account object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      accountNumber: {
        type: 'string',
        description:
          'The account\'s account number, which appears in the QuickBooks chart of accounts, reports, and graphs.\n\nNote that if the "Use Account Numbers" preference is turned off in QuickBooks, the account number may not be visible in the user interface, but it can still be set and retrieved through the API.',
      },
      accountType: {
        type: 'string',
        description:
          'The classification of this account, indicating its purpose within the chart of accounts.\n\n**NOTE**: You cannot create an account of type `non_posting` through the API because QuickBooks creates these accounts behind the scenes.',
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
      bankAccountNumber: {
        type: 'string',
        description:
          'The bank account number or identifying note for this account. Access to this field may be restricted based on permissions.',
      },
      currencyId: {
        type: 'string',
        description:
          "The account's currency. For built-in currencies, the name and code are standard international values. For user-defined currencies, all values are editable.",
      },
      description: {
        type: 'string',
        description: 'A description of this account.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this account is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive name of this account. Not guaranteed to be unique because it does not include the names of its hierarchical parent objects like `fullName` does. For example, two accounts could both have the `name` "Accounts-Payable", but they could have unique `fullName` values, such as "Corporate:Accounts-Payable" and "Finance:Accounts-Payable".\n\nMaximum length: 31 characters.',
      },
      openingBalance: {
        type: 'string',
        description:
          'The amount of money in, or the value of, this account as of `openingBalanceDate`. On a bank statement, this would be the amount of money in the account at the beginning of the statement period.',
      },
      openingBalanceDate: {
        type: 'string',
        description: 'The date of the opening balance of this account, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      parentId: {
        type: 'string',
        description:
          'The parent account one level above this one in the hierarchy. For example, if this account has a `fullName` of "Corporate:Accounts-Payable", its parent has a `fullName` of "Corporate". If this account is at the top level, this field will be `null`.',
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The default sales-tax code for transactions with this account, determining whether the transactions are taxable or non-taxable. This can be overridden at the transaction or transaction-line level.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
      taxLineId: {
        type: 'number',
        description:
          'The identifier of the tax line associated with this account. You can see a list of all available values for this field by calling the endpoint for account tax lines.',
      },
    },
    required: ['id', 'revisionNumber', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.accounts.update(id, body));
};

export default { metadata, tool, handler };
