// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.journal_entries',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/journal-entries',
};

export const tool: Tool = {
  name: 'create_qbd_journal_entries',
  description:
    'Creates a journal entry with balanced debit and credit lines. QuickBooks Desktop requires total debits to equal total credits, and any line that posts to Accounts Receivable or Accounts Payable must include the related customer or vendor reference.',
  inputSchema: {
    type: 'object',
    properties: {
      transactionDate: {
        type: 'string',
        description: 'The date of this journal entry, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
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
      creditLines: {
        type: 'array',
        description: "The journal entry's credit lines.",
        items: {
          type: 'object',
          properties: {
            accountId: {
              type: 'string',
              description:
                'The account to which this journal credit line is being credited. This will increase the balance of this account.',
            },
            amount: {
              type: 'string',
              description:
                'The monetary amount of this journal credit line, represented as a decimal string.',
            },
            billingStatus: {
              type: 'string',
              description: 'The billing status of this journal credit line.',
              enum: ['billable', 'has_been_billed', 'not_billable'],
            },
            classId: {
              type: 'string',
              description:
                "The journal credit line's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. If a class is specified for the entire parent transaction, it is automatically applied to all journal credit lines unless overridden here, at the transaction line level.",
            },
            entityId: {
              type: 'string',
              description:
                "The customer, vendor, employee, or other entity associated with this journal credit line.\n\n**IMPORTANT**: If the journal credit line's `account` is an Accounts Receivable (A/R) account, this field must refer to a customer. If the journal credit line's `account` is an Accounts Payable (A/P) account, this field must refer to a vendor. If these requirements are not met, QuickBooks Desktop will not record the transaction.",
            },
            memo: {
              type: 'string',
              description: 'A memo or note for this journal credit line.',
            },
            salesTaxItemId: {
              type: 'string',
              description:
                "The sales-tax item used to calculate the actual tax amount for this journal credit line's transactions by applying a specific tax rate collected for a single tax agency. Unlike `salesTaxCode`, which only indicates general taxability, this field drives the actual tax calculation and reporting.",
            },
          },
          required: ['accountId'],
        },
      },
      currencyId: {
        type: 'string',
        description:
          "The journal entry's currency. For built-in currencies, the name and code are standard international values. For user-defined currencies, all values are editable.",
      },
      debitLines: {
        type: 'array',
        description: "The journal entry's debit lines.",
        items: {
          type: 'object',
          properties: {
            accountId: {
              type: 'string',
              description:
                'The account to which this journal debit line is being debited. This will decrease the balance of this account.',
            },
            amount: {
              type: 'string',
              description: 'The monetary amount of this journal debit line, represented as a decimal string.',
            },
            billingStatus: {
              type: 'string',
              description: 'The billing status of this journal debit line.',
              enum: ['billable', 'has_been_billed', 'not_billable'],
            },
            classId: {
              type: 'string',
              description:
                "The journal debit line's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default. If a class is specified for the entire parent transaction, it is automatically applied to all journal debit lines unless overridden here, at the transaction line level.",
            },
            entityId: {
              type: 'string',
              description:
                "The customer, vendor, employee, or other entity associated with this journal debit line.\n\n**IMPORTANT**: If the journal debit line's `account` is an Accounts Receivable (A/R) account, this field must refer to a customer. If the journal debit line's `account` is an Accounts Payable (A/P) account, this field must refer to a vendor. If these requirements are not met, QuickBooks Desktop will not record the transaction.",
            },
            memo: {
              type: 'string',
              description: 'A memo or note for this journal debit line.',
            },
            salesTaxItemId: {
              type: 'string',
              description:
                "The sales-tax item used to calculate the actual tax amount for this journal debit line's transactions by applying a specific tax rate collected for a single tax agency. Unlike `salesTaxCode`, which only indicates general taxability, this field drives the actual tax calculation and reporting.",
            },
          },
          required: ['accountId'],
        },
      },
      exchangeRate: {
        type: 'number',
        description:
          "The market exchange rate between this journal entry's currency and the home currency in QuickBooks at the time of this transaction. Represented as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).",
      },
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
      },
      isAdjustment: {
        type: 'boolean',
        description:
          'Indicates whether this journal entry is an adjustment entry. When `true`, QuickBooks retains the original entry information to maintain an audit trail of the adjustments.',
      },
      isHomeCurrencyAdjustment: {
        type: 'boolean',
        description:
          "Indicates whether this journal entry is an adjustment made in the company's home currency for a transaction that was originally recorded in a foreign currency.",
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this journal entry, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user. When left blank in this create request, this field will be left blank in QuickBooks (i.e., it does *not* auto-increment).',
      },
    },
    required: ['transactionDate', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.qbd.journalEntries.create(body));
};

export default { metadata, tool, handler };
