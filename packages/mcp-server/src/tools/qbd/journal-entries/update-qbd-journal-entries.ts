// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.journal_entries',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/journal-entries/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_journal_entries',
  description:
    'Updates an existing journal entry. Keep the debits and credits in balance, and include the related customer or vendor on any A/R or A/P line you submit in the update body.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the journal entry to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the journal entry object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      areAmountsEnteredInHomeCurrency: {
        type: 'boolean',
        description:
          "Indicates whether the amounts in this journal entry were entered in the company's home currency rather than a foreign currency. When `true`, amounts are in the home currency regardless of the `currency` field.",
      },
      currencyId: {
        type: 'string',
        description:
          "The journal entry's currency. For built-in currencies, the name and code are standard international values. For user-defined currencies, all values are editable.",
      },
      exchangeRate: {
        type: 'number',
        description:
          "The market exchange rate between this journal entry's currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).",
      },
      isAdjustment: {
        type: 'boolean',
        description:
          'Indicates whether this journal entry is an adjustment entry. When `true`, QuickBooks retains the original entry information to maintain an audit trail of the adjustments.',
      },
      lines: {
        type: 'array',
        description:
          "The journal entry's credit and debit lines.\n\n**IMPORTANT**: When updating journal entries, you must include ALL existing journal lines (both credit and debit) in your update request, even if you only want to modify a single line. QuickBooks will automatically delete any existing lines that are not included in the update request, which is why all lines must be provided in a single array when updating.",
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description:
                'The QuickBooks-assigned unique identifier of an existing journal line you wish to retain or update.\n\n**IMPORTANT**: Set this field to `-1` for new journal lines you wish to add.',
            },
            accountId: {
              type: 'string',
              description: 'The account to which this journal line is being credited or debited.',
            },
            amount: {
              type: 'string',
              description: 'The monetary amount of this journal line, represented as a decimal string.',
            },
            billingStatus: {
              type: 'string',
              description: 'The billing status of this journal line.',
              enum: ['billable', 'has_been_billed', 'not_billable'],
            },
            classId: {
              type: 'string',
              description:
                "The journal line's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. If a class is specified for the entire parent transaction, it is automatically applied to all journal lines unless overridden here, at the transaction line level.",
            },
            entityId: {
              type: 'string',
              description:
                "The customer, vendor, employee, or other entity associated with this journal line.\n\n**IMPORTANT**: If the journal line's `account` is an Accounts Receivable (A/R) account, this field must refer to a customer. If the journal line's `account` is an Accounts Payable (A/P) account, this field must refer to a vendor. If these requirements are not met, QuickBooks Desktop will not record the transaction.",
            },
            journalLineType: {
              type: 'string',
              description: 'The type of journal line (debit or credit).',
              enum: ['debit', 'credit'],
            },
            memo: {
              type: 'string',
              description: 'A memo or note for this journal line.',
            },
            salesTaxItemId: {
              type: 'string',
              description:
                "The sales-tax item used to calculate the actual tax amount for this journal line's transactions by applying a specific tax rate collected for a single tax agency. Unlike `salesTaxCode`, which only indicates general taxability, this field drives the actual tax calculation and reporting.",
            },
          },
          required: ['id'],
        },
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this journal entry, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user.',
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this journal entry, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
    },
    required: ['id', 'revisionNumber', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.journalEntries.update(id, body));
};

export default { metadata, tool, handler };
