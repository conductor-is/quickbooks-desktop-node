// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Deposits extends APIResource {
  /**
   * Creates a deposit into a QuickBooks Desktop bank or other asset account. Lines
   * can either reference existing payments waiting to be deposited, using
   * `paymentTransactionId` and optionally `paymentTransactionLineId`, or describe a
   * manual transfer from another account using `accountId` and related line details.
   *
   * @example
   * ```ts
   * const deposit = await conductor.qbd.deposits.create({
   *   depositToAccountId: '80000001-1234567890',
   *   transactionDate: '2024-10-01',
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  create(params: DepositCreateParams, options?: RequestOptions): APIPromise<Deposit> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/deposits', {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Retrieves a deposit by ID.
   *
   * **IMPORTANT:** If you need to fetch multiple specific deposits by ID, use the
   * list endpoint instead with the `ids` parameter. It accepts an array of IDs so
   * you can batch the request into a single call, which is significantly faster.
   *
   * @example
   * ```ts
   * const deposit = await conductor.qbd.deposits.retrieve(
   *   '123ABC-1234567890',
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * );
   * ```
   */
  retrieve(id: string, params: DepositRetrieveParams, options?: RequestOptions): APIPromise<Deposit> {
    const { conductorEndUserId } = params;
    return this._client.get(path`/quickbooks-desktop/deposits/${id}`, {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Updates an existing deposit.
   *
   * **NOTE:** If you include `lines`, QuickBooks Desktop replaces that line list
   * with the array you send, so include unchanged lines you want to keep and use
   * `id: "-1"` for new lines.
   *
   * @example
   * ```ts
   * const deposit = await conductor.qbd.deposits.update(
   *   '123ABC-1234567890',
   *   {
   *     revisionNumber: '1721172183',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   },
   * );
   * ```
   */
  update(id: string, params: DepositUpdateParams, options?: RequestOptions): APIPromise<Deposit> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(path`/quickbooks-desktop/deposits/${id}`, {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Returns a list of deposits. Use the `cursor` parameter to paginate through the
   * results.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const deposit of conductor.qbd.deposits.list({
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(params: DepositListParams, options?: RequestOptions): PagePromise<DepositsCursorPage, Deposit> {
    const { conductorEndUserId, ...query } = params;
    return this._client.getAPIList('/quickbooks-desktop/deposits', CursorPage<Deposit>, {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Permanently deletes a deposit. The deletion will fail if the deposit is
   * currently in use or has any linked transactions that are in use.
   *
   * @example
   * ```ts
   * const deposit = await conductor.qbd.deposits.delete(
   *   '123ABC-1234567890',
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * );
   * ```
   */
  delete(
    id: string,
    params: DepositDeleteParams,
    options?: RequestOptions,
  ): APIPromise<DepositDeleteResponse> {
    const { conductorEndUserId } = params;
    return this._client.delete(path`/quickbooks-desktop/deposits/${id}`, {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Voids a deposit by setting its amount to zero while keeping a record of it in
   * QuickBooks. The void will fail if the deposit is currently in use or has any
   * linked transactions that are in use.
   *
   * @example
   * ```ts
   * const response = await conductor.qbd.deposits.void(
   *   '123ABC-1234567890',
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * );
   * ```
   */
  void(id: string, params: DepositVoidParams, options?: RequestOptions): APIPromise<DepositVoidResponse> {
    const { conductorEndUserId } = params;
    return this._client.post(path`/quickbooks-desktop/deposits/${id}/void`, {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }
}

export type DepositsCursorPage = CursorPage<Deposit>;

export interface Deposit {
  /**
   * The unique identifier assigned by QuickBooks to this deposit. This ID is unique
   * across all transaction types.
   */
  id: string;

  /**
   * Cash back taken out of this deposit and recorded to another account, such as
   * Petty Cash.
   */
  cashBack: Deposit.CashBack | null;

  /**
   * The date and time when this deposit was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The deposit's currency. For built-in currencies, the name and code are standard
   * ISO 4217 international values. For user-defined currencies, all values are
   * editable.
   */
  currency: Deposit.Currency | null;

  /**
   * The custom fields for the deposit object, added as user-defined data extensions,
   * not included in the standard QuickBooks object.
   */
  customFields: Array<Deposit.CustomField>;

  /**
   * The account where the funds for this deposit have been deposited.
   */
  depositToAccount: Deposit.DepositToAccount | null;

  /**
   * The market exchange rate between this deposit's currency and the home currency
   * in QuickBooks at the time of this transaction. Represented as a decimal value
   * (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).
   */
  exchangeRate: number | null;

  /**
   * A globally unique identifier (GUID) you, the developer, can provide for tracking
   * this object in your external system. This field is immutable and can only be set
   * during object creation.
   */
  externalId: string | null;

  /**
   * The deposit's deposit lines, each representing either an existing payment
   * selected for deposit or a manual transfer from another account into the deposit
   * account.
   */
  lines: Array<Deposit.Line>;

  /**
   * A memo or note for this deposit.
   */
  memo: string | null;

  /**
   * The type of object. This value is always `"qbd_deposit"`.
   */
  objectType: 'qbd_deposit';

  /**
   * The current QuickBooks-assigned revision number of this deposit object, which
   * changes each time the object is modified. When updating this object, you must
   * provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The total monetary amount deposited into this deposit's destination account,
   * represented as a decimal string.
   */
  totalAmount: string | null;

  /**
   * This deposit's total monetary amount converted to the home currency of the
   * QuickBooks company file, represented as a decimal string.
   */
  totalAmountInHomeCurrency: string | null;

  /**
   * The date of this deposit, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * The date and time when this deposit was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace Deposit {
  /**
   * Cash back taken out of this deposit and recorded to another account, such as
   * Petty Cash.
   */
  export interface CashBack {
    /**
     * The unique identifier assigned by QuickBooks to this deposit cash-back line.
     * This ID is unique across all transaction line types.
     */
    id: string;

    /**
     * The account where this deposit cash-back line's cash-back amount is recorded,
     * such as Petty Cash. This amount reduces the total credited to the deposit's
     * destination account.
     */
    account: CashBack.Account;

    /**
     * The cash-back amount taken out of the deposit and recorded to this deposit
     * cash-back line's account, represented as a decimal string.
     */
    amount: string | null;

    /**
     * A memo or note for this deposit cash-back line.
     */
    memo: string | null;

    /**
     * The type of object. This value is always `"qbd_deposit_cash_back_line"`.
     */
    objectType: 'qbd_deposit_cash_back_line';
  }

  export namespace CashBack {
    /**
     * The account where this deposit cash-back line's cash-back amount is recorded,
     * such as Petty Cash. This amount reduces the total credited to the deposit's
     * destination account.
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
  }

  /**
   * The deposit's currency. For built-in currencies, the name and code are standard
   * ISO 4217 international values. For user-defined currencies, all values are
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

  export interface CustomField {
    /**
     * The name of the custom field, unique for the specified `ownerId`. For public
     * custom fields, this name is visible as a label in the QuickBooks UI.
     */
    name: string;

    /**
     * The identifier of the owner of the custom field, which QuickBooks internally
     * calls a "data extension". For public custom fields visible in the UI, such as
     * those added by the QuickBooks user, this is always "0". For private custom
     * fields that are only visible to the application that created them, this is a
     * valid GUID identifying the owning application. Internally, Conductor always
     * fetches all public custom fields (those with an `ownerId` of "0") for all
     * objects.
     */
    ownerId: string;

    /**
     * The data type of this custom field.
     */
    type:
      | 'amount_type'
      | 'date_time_type'
      | 'integer_type'
      | 'percent_type'
      | 'price_type'
      | 'quantity_type'
      | 'string_1024_type'
      | 'string_255_type';

    /**
     * The value of this custom field. The maximum length depends on the field's data
     * type.
     */
    value: string;
  }

  /**
   * The account where the funds for this deposit have been deposited.
   */
  export interface DepositToAccount {
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

  export interface Line {
    /**
     * The unique identifier assigned by QuickBooks to this deposit line. This ID is
     * unique across all transaction line types.
     */
    id: string;

    /**
     * The account associated with this deposit line. For manual deposit lines, this is
     * the account the funds were transferred from into the deposit's destination
     * account.
     */
    account: Line.Account | null;

    /**
     * The amount this deposit line contributes to the deposit's destination account,
     * represented as a decimal string.
     */
    amount: string | null;

    /**
     * The check number of a check received for this deposit line.
     */
    checkNumber: string | null;

    /**
     * The deposit line's class. Classes can be used to categorize objects into
     * meaningful segments, such as department, location, or type of work. In
     * QuickBooks, class tracking is off by default.
     */
    class: Line.Class | null;

    /**
     * The customer, vendor, employee, or person on QuickBooks's "Other Names" list
     * associated with this deposit line.
     */
    entity: Line.Entity | null;

    /**
     * A memo or note for this deposit line.
     */
    memo: string | null;

    /**
     * The type of object. This value is always `"qbd_deposit_line"`.
     */
    objectType: 'qbd_deposit_line';

    /**
     * The deposit line's payment method (e.g., cash, check, credit card).
     */
    paymentMethod: Line.PaymentMethod | null;

    /**
     * For payment-based deposit lines, the ID of the source payment included in this
     * deposit line. For manual deposit lines, this is null.
     */
    paymentTransactionId: string | null;

    /**
     * For payment-based deposit lines, the line ID of the specific source payment line
     * included in this deposit line. For manual deposit lines, this is null.
     */
    paymentTransactionLineId: string | null;

    /**
     * The type of transaction for this deposit line.
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
      | 'ytd_adjustment'
      | 'unknown'
      | null;
  }

  export namespace Line {
    /**
     * The account associated with this deposit line. For manual deposit lines, this is
     * the account the funds were transferred from into the deposit's destination
     * account.
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
     * The deposit line's class. Classes can be used to categorize objects into
     * meaningful segments, such as department, location, or type of work. In
     * QuickBooks, class tracking is off by default.
     */
    export interface Class {
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
     * associated with this deposit line.
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

    /**
     * The deposit line's payment method (e.g., cash, check, credit card).
     */
    export interface PaymentMethod {
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
}

export interface DepositDeleteResponse {
  /**
   * The QuickBooks-assigned unique identifier of the deleted deposit.
   */
  id: string;

  /**
   * Indicates whether the deposit was deleted.
   */
  deleted: boolean;

  /**
   * The type of object. This value is always `"qbd_deposit"`.
   */
  objectType: 'qbd_deposit';
}

export interface DepositVoidResponse {
  /**
   * The QuickBooks-assigned unique identifier of the voided deposit.
   */
  id: string;

  /**
   * The date and time when this deposit was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss+hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string | null;

  /**
   * The type of object. This value is always `"qbd_deposit"`.
   */
  objectType: 'qbd_deposit';

  /**
   * The date and time when this deposit was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss+hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string | null;

  /**
   * Indicates whether the deposit was voided.
   */
  voided: boolean;
}

export interface DepositCreateParams {
  /**
   * Body param: The account where the funds for this deposit will be deposited.
   */
  depositToAccountId: string;

  /**
   * Body param: The date of this deposit, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Body param: Cash back taken out of this deposit and recorded to another account,
   * such as Petty Cash.
   */
  cashBack?: DepositCreateParams.CashBack;

  /**
   * Body param: The deposit's currency. For built-in currencies, the name and code
   * are standard ISO 4217 international values. For user-defined currencies, all
   * values are editable.
   */
  currencyId?: string;

  /**
   * Body param: The market exchange rate between this deposit's currency and the
   * home currency in QuickBooks at the time of this transaction. Represented as a
   * decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).
   */
  exchangeRate?: number;

  /**
   * Body param: A globally unique identifier (GUID) you, the developer, can provide
   * for tracking this object in your external system. This field is immutable and
   * can only be set during object creation.
   *
   * **IMPORTANT**: This field must be formatted as a valid GUID; otherwise,
   * QuickBooks will return an error.
   */
  externalId?: string;

  /**
   * Body param: The deposit's deposit lines, each representing either an existing
   * payment selected for deposit or a manual transfer from another account into the
   * deposit account.
   */
  lines?: Array<DepositCreateParams.Line>;

  /**
   * Body param: A memo or note for this deposit.
   */
  memo?: string;
}

export namespace DepositCreateParams {
  /**
   * Cash back taken out of this deposit and recorded to another account, such as
   * Petty Cash.
   */
  export interface CashBack {
    /**
     * The account where this deposit cash-back line's cash-back amount is recorded,
     * such as Petty Cash. This amount reduces the total credited to the deposit's
     * destination account.
     */
    accountId: string;

    /**
     * The cash-back amount taken out of the deposit and recorded to this deposit
     * cash-back line's account, represented as a decimal string.
     *
     * Decimal string format: exactly 2 decimal places when cents are included and up
     * to 13 digits before the decimal point (for example, "123.45").
     */
    amount?: string;

    /**
     * A memo or note for this deposit cash-back line.
     */
    memo?: string;
  }

  export interface Line {
    /**
     * For a manual deposit line, the account that the funds are transferred from into
     * the deposit's destination account. To deposit an existing payment instead, use
     * `paymentTransactionId` and, when needed, `paymentTransactionLineId`.
     */
    accountId?: string;

    /**
     * For a manual deposit line, the amount transferred from the line's account into
     * the deposit's destination account, represented as a decimal string.
     *
     * Decimal string format: exactly 2 decimal places when cents are included and up
     * to 13 digits before the decimal point (for example, "123.45").
     */
    amount?: string;

    /**
     * The check number of a check received for this deposit line.
     */
    checkNumber?: string;

    /**
     * The deposit line's class. Classes can be used to categorize objects into
     * meaningful segments, such as department, location, or type of work. In
     * QuickBooks, class tracking is off by default.
     */
    classId?: string;

    /**
     * The customer, vendor, employee, or person on QuickBooks's "Other Names" list
     * associated with this manual deposit line.
     */
    entityId?: string;

    /**
     * A memo or note for this deposit line.
     */
    memo?: string;

    /**
     * The check number to use for this deposit line, overriding the check number from
     * the existing payment line.
     *
     * Maximum length: 11 characters.
     */
    overrideCheckNumber?: string;

    /**
     * The class to use for this deposit line, overriding the class from the existing
     * payment line.
     */
    overrideClassId?: string;

    /**
     * The memo to use for this deposit line, overriding the memo from the existing
     * payment line.
     *
     * Maximum length: 4095 characters.
     */
    overrideMemo?: string;

    /**
     * The deposit line's payment method (e.g., cash, check, credit card).
     */
    paymentMethodId?: string;

    /**
     * The ID of an existing undeposited payment to include in this deposit line. Use
     * the `paymentTransactionId` from a payments-to-deposit result, or the `id` from
     * the original receive-payment response. If the source payment has multiple
     * depositable lines and you omit `paymentTransactionLineId`, QuickBooks Desktop
     * deposits only the first line.
     */
    paymentTransactionId?: string;

    /**
     * The line ID for the specific undeposited payment line to include in this deposit
     * line. Use the `paymentTransactionLineId` from a payments-to-deposit result. If
     * the source payment has multiple depositable lines, provide this field with
     * `paymentTransactionId` to choose the exact line.
     */
    paymentTransactionLineId?: string;
  }
}

export interface DepositRetrieveParams {
  /**
   * The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;
}

export interface DepositUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the deposit
   * object you are updating, which you can get by fetching the object first. Provide
   * the most recent `revisionNumber` to ensure you're working with the latest data;
   * otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Body param: Cash back taken out of this deposit and recorded to another account,
   * such as Petty Cash.
   */
  cashBack?: DepositUpdateParams.CashBack;

  /**
   * Body param: The deposit's currency. For built-in currencies, the name and code
   * are standard ISO 4217 international values. For user-defined currencies, all
   * values are editable.
   */
  currencyId?: string;

  /**
   * Body param: The account where the funds for this deposit will be deposited.
   */
  depositToAccountId?: string;

  /**
   * Body param: The market exchange rate between this deposit's currency and the
   * home currency in QuickBooks at the time of this transaction. Represented as a
   * decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).
   */
  exchangeRate?: number;

  /**
   * Body param: The deposit's deposit lines, each representing either an existing
   * payment selected for deposit or a manual transfer from another account into the
   * deposit account.
   *
   * **IMPORTANT**:
   *
   * 1. Including this array in your update request will **REPLACE** all existing
   *    deposit lines for the deposit with this array. To keep any existing deposit
   *    lines, you must include them in this array even if they have not changed.
   *    **Any deposit lines not included will be removed.**
   *
   * 2. To add a new deposit line, include it here with the `id` field set to `-1`.
   *
   * 3. If you do not wish to modify any deposit lines, omit this field entirely to
   *    keep them unchanged.
   */
  lines?: Array<DepositUpdateParams.Line>;

  /**
   * Body param: A memo or note for this deposit.
   */
  memo?: string;

  /**
   * Body param: The date of this deposit, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate?: string;
}

export namespace DepositUpdateParams {
  /**
   * Cash back taken out of this deposit and recorded to another account, such as
   * Petty Cash.
   */
  export interface CashBack {
    /**
     * The account where this deposit cash-back line's cash-back amount is recorded,
     * such as Petty Cash. This amount reduces the total credited to the deposit's
     * destination account.
     */
    accountId?: string;

    /**
     * The cash-back amount taken out of the deposit and recorded to this deposit
     * cash-back line's account, represented as a decimal string.
     *
     * Decimal string format: exactly 2 decimal places when cents are included and up
     * to 13 digits before the decimal point (for example, "123.45").
     */
    amount?: string;

    /**
     * A memo or note for this deposit cash-back line.
     */
    memo?: string;
  }

  export interface Line {
    /**
     * The QuickBooks-assigned unique identifier of an existing deposit line you wish
     * to retain or update.
     *
     * **IMPORTANT**: Set this field to `-1` for new deposit lines you wish to add.
     */
    id: string;

    /**
     * For a manual deposit line, the account that the funds are transferred from into
     * the deposit's destination account. To deposit an existing payment instead, use
     * `paymentTransactionId` and, when needed, `paymentTransactionLineId`.
     */
    accountId?: string;

    /**
     * For a manual deposit line, the amount transferred from the line's account into
     * the deposit's destination account, represented as a decimal string.
     *
     * Decimal string format: exactly 2 decimal places when cents are included and up
     * to 13 digits before the decimal point (for example, "123.45").
     */
    amount?: string;

    /**
     * The check number of a check received for this deposit line.
     */
    checkNumber?: string;

    /**
     * The deposit line's class. Classes can be used to categorize objects into
     * meaningful segments, such as department, location, or type of work. In
     * QuickBooks, class tracking is off by default.
     */
    classId?: string;

    /**
     * The customer, vendor, employee, or person on QuickBooks's "Other Names" list
     * associated with this manual deposit line.
     */
    entityId?: string;

    /**
     * A memo or note for this deposit line.
     */
    memo?: string;

    /**
     * The check number to use for this deposit line, overriding the check number from
     * the existing payment line.
     *
     * Maximum length: 11 characters.
     */
    overrideCheckNumber?: string;

    /**
     * The class to use for this deposit line, overriding the class from the existing
     * payment line.
     */
    overrideClassId?: string;

    /**
     * The memo to use for this deposit line, overriding the memo from the existing
     * payment line.
     *
     * Maximum length: 4095 characters.
     */
    overrideMemo?: string;

    /**
     * The deposit line's payment method (e.g., cash, check, credit card).
     */
    paymentMethodId?: string;

    /**
     * The ID of an existing undeposited payment to include in this deposit line. Use
     * the `paymentTransactionId` from a payments-to-deposit result, or the `id` from
     * the original receive-payment response. If the source payment has multiple
     * depositable lines and you omit `paymentTransactionLineId`, QuickBooks Desktop
     * deposits only the first line.
     */
    paymentTransactionId?: string;

    /**
     * The line ID for the specific undeposited payment line to include in this deposit
     * line. Use the `paymentTransactionLineId` from a payments-to-deposit result. If
     * the source payment has multiple depositable lines, provide this field with
     * `paymentTransactionId` to choose the exact line.
     */
    paymentTransactionLineId?: string;
  }
}

export interface DepositListParams extends CursorPageParams {
  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for deposits associated with these accounts.
   */
  accountIds?: Array<string>;

  /**
   * Query param: Filter for deposits in these currencies.
   */
  currencyIds?: Array<string>;

  /**
   * Query param: Filter for deposits associated with these entities (customers,
   * vendors, employees, etc.). These are the entities referenced on the deposit's
   * manual lines.
   */
  entityIds?: Array<string>;

  /**
   * Query param: Filter for specific deposits by their QuickBooks-assigned unique
   * identifier(s).
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  ids?: Array<string>;

  /**
   * Query param: Whether to include line items in the response. Defaults to `true`.
   */
  includeLineItems?: boolean;

  /**
   * Query param: Filter for deposits whose `date` field is on or after this date, in
   * ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **start of the
   * specified day** in the local timezone of the end-user's computer (e.g.,
   * `2025-01-01` → `2025-01-01T00:00:00`).
   */
  transactionDateFrom?: string;

  /**
   * Query param: Filter for deposits whose `date` field is on or before this date,
   * in ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **end of the specified
   * day** in the local timezone of the end-user's computer (e.g., `2025-01-01` →
   * `2025-01-01T23:59:59`).
   */
  transactionDateTo?: string;

  /**
   * Query param: Filter for deposits updated on or after this date/time. Accepts the
   * following ISO 8601 formats:
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
   * Query param: Filter for deposits updated on or before this date/time. Accepts
   * the following ISO 8601 formats:
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

export interface DepositDeleteParams {
  /**
   * The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;
}

export interface DepositVoidParams {
  /**
   * The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;
}

export declare namespace Deposits {
  export {
    type Deposit as Deposit,
    type DepositDeleteResponse as DepositDeleteResponse,
    type DepositVoidResponse as DepositVoidResponse,
    type DepositsCursorPage as DepositsCursorPage,
    type DepositCreateParams as DepositCreateParams,
    type DepositRetrieveParams as DepositRetrieveParams,
    type DepositUpdateParams as DepositUpdateParams,
    type DepositListParams as DepositListParams,
    type DepositDeleteParams as DepositDeleteParams,
    type DepositVoidParams as DepositVoidParams,
  };
}
