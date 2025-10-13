// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Transactions extends APIResource {
  /**
   * Retrieves a transaction by ID.
   *
   * **IMPORTANT:** If you need to fetch multiple specific transactions by ID, use
   * the list endpoint instead with the `ids` parameter. It accepts an array of IDs
   * so you can batch the request into a single call, which is significantly faster.
   *
   * @example
   * ```ts
   * const transaction =
   *   await conductor.qbd.transactions.retrieve(
   *     '123ABC-1234567890',
   *     { 'Conductor-End-User-Id': 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(id: string, params: TransactionRetrieveParams, options?: RequestOptions): APIPromise<Transaction> {
    const { 'Conductor-End-User-Id': conductorEndUserID } = params;
    return this._client.get(path`/quickbooks-desktop/transactions/${id}`, {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }

  /**
   * Searches across all transaction types. Unlike transaction-specific queries, this
   * endpoint only returns fields common to all transaction types, such as ID, type,
   * dates, account, and reference numbers. For more details specific to that
   * transaction type, make a subsequent call to the relevant transaction-specific
   * endpoint (such as invoices, bills, etc.). NOTE: This endpoint does not support
   * time tracking activities.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const transaction of conductor.qbd.transactions.list(
   *   { 'Conductor-End-User-Id': 'end_usr_1234567abcdefg' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    params: TransactionListParams,
    options?: RequestOptions,
  ): PagePromise<TransactionsCursorPage, Transaction> {
    const { 'Conductor-End-User-Id': conductorEndUserID, ...query } = params;
    return this._client.getAPIList('/quickbooks-desktop/transactions', CursorPage<Transaction>, {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }
}

export type TransactionsCursorPage = CursorPage<Transaction>;

export interface Transaction {
  /**
   * The account associated with this transaction.
   */
  account: Transaction.Account | null;

  /**
   * The monetary amount of this transaction, represented as a decimal string.
   */
  amount: string;

  /**
   * The monetary amount of this transaction converted to the home currency of the
   * QuickBooks company file. Represented as a decimal string.
   */
  amountInHomeCurrency: string | null;

  /**
   * The date and time when this transaction was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The transaction's currency. For built-in currencies, the name and code are
   * standard international values. For user-defined currencies, all values are
   * editable.
   */
  currency: Transaction.Currency | null;

  /**
   * The customer, vendor, employee, or person on QuickBooks's "Other Names" list
   * associated with this transaction.
   */
  entity: Transaction.Entity | null;

  /**
   * The market exchange rate between this transaction's currency and the home
   * currency in QuickBooks at the time of this transaction. Represented as a decimal
   * value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).
   */
  exchangeRate: number | null;

  /**
   * A memo or note for this transaction.
   */
  memo: string | null;

  /**
   * The case-sensitive user-defined reference number for this transaction, which can
   * be used to identify the transaction in QuickBooks. This value is not required to
   * be unique and can be arbitrarily changed by the QuickBooks user.
   */
  refNumber: string | null;

  /**
   * The date of this transaction, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * The QuickBooks-assigned unique identifier of this transaction. If
   * `transactionLineId` is also defined, this is the identifier of the line's parent
   * transaction object.
   */
  transactionId: string;

  /**
   * The QuickBooks-assigned unique identifier of this transaction line. If `null`,
   * this result is a transaction object.
   */
  transactionLineId: string | null;

  /**
   * The type of transaction.
   */
  transactionType:
    | 'ar_refund_credit_card'
    | 'bill'
    | 'bill_payment_check'
    | 'bill_payment_credit_card'
    | 'build_assembly'
    | 'charge'
    | 'check'
    | 'credit_card_charge'
    | 'credit_card_credit'
    | 'credit_memo'
    | 'deposit'
    | 'estimate'
    | 'inventory_adjustment'
    | 'invoice'
    | 'item_receipt'
    | 'journal_entry'
    | 'liability_adjustment'
    | 'paycheck'
    | 'payroll_liability_check'
    | 'purchase_order'
    | 'receive_payment'
    | 'sales_order'
    | 'sales_receipt'
    | 'sales_tax_payment_check'
    | 'transfer'
    | 'vendor_credit'
    | 'ytd_adjustment';

  /**
   * The date and time when this transaction was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace Transaction {
  /**
   * The account associated with this transaction.
   */
  export interface Account {
    /**
     * The unique identifier assigned by QuickBooks to this object. This ID is unique
     * across all objects of the same type, but not across different QuickBooks object
     * types.
     */
    id: string | null;

    /**
     * The fully-qualified unique name for this object, formed by combining the names
     * of its parent objects with its own `name`, separated by colons. Not
     * case-sensitive.
     */
    fullName: string | null;
  }

  /**
   * The transaction's currency. For built-in currencies, the name and code are
   * standard international values. For user-defined currencies, all values are
   * editable.
   */
  export interface Currency {
    /**
     * The unique identifier assigned by QuickBooks to this object. This ID is unique
     * across all objects of the same type, but not across different QuickBooks object
     * types.
     */
    id: string | null;

    /**
     * The fully-qualified unique name for this object, formed by combining the names
     * of its parent objects with its own `name`, separated by colons. Not
     * case-sensitive.
     */
    fullName: string | null;
  }

  /**
   * The customer, vendor, employee, or person on QuickBooks's "Other Names" list
   * associated with this transaction.
   */
  export interface Entity {
    /**
     * The unique identifier assigned by QuickBooks to this object. This ID is unique
     * across all objects of the same type, but not across different QuickBooks object
     * types.
     */
    id: string | null;

    /**
     * The fully-qualified unique name for this object, formed by combining the names
     * of its parent objects with its own `name`, separated by colons. Not
     * case-sensitive.
     */
    fullName: string | null;
  }
}

export interface TransactionRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;
}

export interface TransactionListParams extends CursorPageParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;

  /**
   * Query param: Filter for transactions associated with these accounts.
   *
   * **NOTE**: To filter on transaction lines, you must specify the
   * `transactionDetailLevel` parameter as `all` or `transaction_lines_only`.
   */
  accountIds?: Array<string>;

  /**
   * Query param: Filter for transactions of these classes. A class is a way
   * end-users can categorize transactions in QuickBooks.
   *
   * **NOTE**: To filter on transaction lines, you must specify the
   * `transactionDetailLevel` parameter as `all` or `transaction_lines_only`.
   */
  classIds?: Array<string>;

  /**
   * Query param: Filter for transactions in these currencies.
   */
  currencyIds?: Array<string>;

  /**
   * Query param: Specify whether to return all matching transaction and
   * transaction-line objects (`all`), only transaction objects
   * (`transactions_without_lines`, the default), or only transaction-line objects
   * (`transaction_lines_only`.
   */
  detailLevel?: 'all' | 'transaction_lines_only' | 'transactions_without_lines';

  /**
   * Query param: Filter for transactions associated with these entities (customers,
   * vendors, employees, etc.).
   *
   * **NOTE**: To filter on transaction lines, you must specify the
   * `transactionDetailLevel` parameter as `all` or `transaction_lines_only`.
   */
  entityIds?: Array<string>;

  /**
   * Query param: Filter for specific transactions by their QuickBooks-assigned
   * unique identifier(s).
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   *
   * **NOTE**: You cannot supply the ID of a time tracking activity to this request.
   * If you do, you get an error stating that no such record could be found, even
   * though the transaction is in QuickBooks. This limitation is enforced by
   * QuickBooks.
   */
  ids?: Array<string>;

  /**
   * Query param: Filter for transactions associated with these items.
   *
   * **NOTE**: To filter on transaction lines, you must specify the
   * `transactionDetailLevel` parameter as `all` or `transaction_lines_only`.
   */
  itemIds?: Array<string>;

  /**
   * Query param: Filter for transactions that are open, closed, or either. Open
   * transactions have a remaining balance, such as credits not fully applied or
   * invoices not fully paid.
   */
  paymentStatus?: 'closed' | 'either' | 'open';

  /**
   * Query param: Filter for transactions that are posting, non-posting, or either.
   * Posting status refers to whether QuickBooks records the transaction in an
   * account register.
   */
  postingStatus?: 'either' | 'non_posting' | 'posting';

  /**
   * Query param: Filter for transactions whose `refNumber` contains this substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberStartsWith`
   * or `refNumberEndsWith`.
   */
  refNumberContains?: string;

  /**
   * Query param: Filter for transactions whose `refNumber` ends with this substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberContains` or
   * `refNumberStartsWith`.
   */
  refNumberEndsWith?: string;

  /**
   * Query param: Filter for transactions whose `refNumber` is greater than or equal
   * to this value. If omitted, the range will begin with the first number of the
   * list. Uses a numerical comparison for values that contain only digits;
   * otherwise, uses a lexicographical comparison.
   */
  refNumberFrom?: string;

  /**
   * Query param: Filter for specific transactions by their ref-number(s),
   * case-sensitive. In QuickBooks, ref-numbers are not required to be unique and can
   * be arbitrarily changed by the QuickBooks user.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  refNumbers?: Array<string>;

  /**
   * Query param: Filter for transactions whose `refNumber` starts with this
   * substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberContains` or
   * `refNumberEndsWith`.
   */
  refNumberStartsWith?: string;

  /**
   * Query param: Filter for transactions whose `refNumber` is less than or equal to
   * this value. If omitted, the range will end with the last number of the list.
   * Uses a numerical comparison for values that contain only digits; otherwise, uses
   * a lexicographical comparison.
   */
  refNumberTo?: string;

  /**
   * Query param: Filter for transactions whose `date` field is on or after this
   * date, in ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **start of the
   * specified day** in the local timezone of the end-user's computer (e.g.,
   * `2025-01-01` → `2025-01-01T00:00:00`).
   */
  transactionDateFrom?: string;

  /**
   * Query param: Filter for transactions whose `date` field is on or before this
   * date, in ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **end of the specified
   * day** in the local timezone of the end-user's computer (e.g., `2025-01-01` →
   * `2025-01-01T23:59:59`).
   */
  transactionDateTo?: string;

  /**
   * Query param: Filter for transactions by their transaction type(s).
   *
   * **NOTE**: Filtering for time tracking activities is not supported by QuickBooks
   * for this endpoint.
   */
  transactionTypes?: Array<
    | 'all'
    | 'ar_refund_credit_card'
    | 'bill'
    | 'bill_payment_check'
    | 'bill_payment_credit_card'
    | 'build_assembly'
    | 'charge'
    | 'check'
    | 'credit_card_charge'
    | 'credit_card_credit'
    | 'credit_memo'
    | 'deposit'
    | 'estimate'
    | 'inventory_adjustment'
    | 'invoice'
    | 'item_receipt'
    | 'journal_entry'
    | 'liability_adjustment'
    | 'paycheck'
    | 'payroll_liability_check'
    | 'purchase_order'
    | 'receive_payment'
    | 'sales_order'
    | 'sales_receipt'
    | 'sales_tax_payment_check'
    | 'transfer'
    | 'vendor_credit'
    | 'ytd_adjustment'
  >;

  /**
   * Query param: Filter for transactions updated on or after this date/time. Accepts
   * the following ISO 8601 formats:
   *
   * - **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the
   *   **start of the specified day** in the local timezone of the end-user's
   *   computer (e.g., `2025-01-01` → `2025-01-01T00:00:00`).
   * - **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop
   *   interprets the timestamp in the local timezone of the end-user's computer.
   * - **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop
   *   interprets the timestamp using the specified timezone.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for transactions updated on or before this date/time.
   * Accepts the following ISO 8601 formats:
   *
   * - **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the
   *   **end of the specified day** in the local timezone of the end-user's computer
   *   (e.g., `2025-01-01` → `2025-01-01T23:59:59`).
   * - **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop
   *   interprets the timestamp in the local timezone of the end-user's computer.
   * - **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop
   *   interprets the timestamp using the specified timezone.
   */
  updatedBefore?: string;
}

export declare namespace Transactions {
  export {
    type Transaction as Transaction,
    type TransactionsCursorPage as TransactionsCursorPage,
    type TransactionRetrieveParams as TransactionRetrieveParams,
    type TransactionListParams as TransactionListParams,
  };
}
