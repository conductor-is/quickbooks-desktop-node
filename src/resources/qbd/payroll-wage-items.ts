// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class PayrollWageItems extends APIResource {
  /**
   * Creates a new payroll wage item.
   *
   * @example
   * ```ts
   * const payrollWageItem =
   *   await conductor.qbd.payrollWageItems.create({
   *     expenseAccountId: '80000001-1234567890',
   *     name: 'Regular Pay',
   *     wageType: 'hourly_regular',
   *     'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(params: PayrollWageItemCreateParams, options?: RequestOptions): APIPromise<PayrollWageItem> {
    const { 'Conductor-End-User-Id': conductorEndUserID, ...body } = params;
    return this._client.post('/quickbooks-desktop/payroll-wage-items', {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }

  /**
   * Retrieves a payroll wage item by ID.
   *
   * @example
   * ```ts
   * const payrollWageItem =
   *   await conductor.qbd.payrollWageItems.retrieve(
   *     '80000001-1234567890',
   *     { 'Conductor-End-User-Id': 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: PayrollWageItemRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<PayrollWageItem> {
    const { 'Conductor-End-User-Id': conductorEndUserID } = params;
    return this._client.get(path`/quickbooks-desktop/payroll-wage-items/${id}`, {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }

  /**
   * Returns a list of payroll wage items. Use the `cursor` parameter to paginate
   * through the results.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const payrollWageItem of conductor.qbd.payrollWageItems.list(
   *   { 'Conductor-End-User-Id': 'end_usr_1234567abcdefg' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    params: PayrollWageItemListParams,
    options?: RequestOptions,
  ): PagePromise<PayrollWageItemsCursorPage, PayrollWageItem> {
    const { 'Conductor-End-User-Id': conductorEndUserID, ...query } = params;
    return this._client.getAPIList('/quickbooks-desktop/payroll-wage-items', CursorPage<PayrollWageItem>, {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }
}

export type PayrollWageItemsCursorPage = CursorPage<PayrollWageItem>;

export interface PayrollWageItem {
  /**
   * The unique identifier assigned by QuickBooks to this payroll wage item. This ID
   * is unique across all payroll wage items but not across different QuickBooks
   * object types.
   */
  id: string;

  /**
   * The date and time when this payroll wage item was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The expense account used to track wage expenses paid through this payroll wage
   * item.
   */
  expenseAccount: PayrollWageItem.ExpenseAccount | null;

  /**
   * Indicates whether this payroll wage item is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The case-insensitive unique name of this payroll wage item, unique across all
   * payroll wage items.
   *
   * **NOTE**: Payroll wage items do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_payroll_wage_item"`.
   */
  objectType: 'qbd_payroll_wage_item';

  /**
   * The current QuickBooks-assigned revision number of this payroll wage item
   * object, which changes each time the object is modified. When updating this
   * object, you must provide the most recent `revisionNumber` to ensure you're
   * working with the latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The date and time when this payroll wage item was last updated, in ISO 8601
   * format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the
   * local timezone of the end-user's computer.
   */
  updatedAt: string;

  /**
   * Categorizes how this payroll wage item calculates pay - can be hourly (regular,
   * overtime, sick, or vacation), salary (regular, sick, or vacation), bonus, or
   * commission based.
   */
  wageType:
    | 'bonus'
    | 'commission'
    | 'hourly_overtime'
    | 'hourly_regular'
    | 'hourly_sick'
    | 'hourly_vacation'
    | 'salary_regular'
    | 'salary_sick'
    | 'salary_vacation';
}

export namespace PayrollWageItem {
  /**
   * The expense account used to track wage expenses paid through this payroll wage
   * item.
   */
  export interface ExpenseAccount {
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

export interface PayrollWageItemCreateParams {
  /**
   * Body param: The expense account used to track wage expenses paid through this
   * payroll wage item.
   */
  expenseAccountId: string;

  /**
   * Body param: The case-insensitive unique name of this payroll wage item, unique
   * across all payroll wage items.
   *
   * **NOTE**: Payroll wage items do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   *
   * Maximum length: 31 characters.
   */
  name: string;

  /**
   * Body param: Categorizes how this payroll wage item calculates pay - can be
   * hourly (regular, overtime, sick, or vacation), salary (regular, sick, or
   * vacation), bonus, or commission based.
   */
  wageType:
    | 'bonus'
    | 'commission'
    | 'hourly_overtime'
    | 'hourly_regular'
    | 'hourly_sick'
    | 'hourly_vacation'
    | 'salary_regular'
    | 'salary_sick'
    | 'salary_vacation';

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;

  /**
   * Body param: Indicates whether this payroll wage item is active. Inactive objects
   * are typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;
}

export interface PayrollWageItemRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;
}

export interface PayrollWageItemListParams extends CursorPageParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;

  /**
   * Query param: Filter for specific payroll wage items by their QuickBooks-assigned
   * unique identifier(s).
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  ids?: Array<string>;

  /**
   * Query param: Filter for payroll wage items whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for payroll wage items whose `name` ends with this
   * substring, case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for payroll wage items whose `name` is alphabetically
   * greater than or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific payroll wage items by their name(s),
   * case-insensitive. Like `id`, `name` is a unique identifier for a payroll wage
   * item.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for payroll wage items whose `name` starts with this
   * substring, case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for payroll wage items whose `name` is alphabetically less
   * than or equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for payroll wage items that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for payroll wage items updated on or after this date/time.
   * Accepts the following ISO 8601 formats:
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
   * Query param: Filter for payroll wage items updated on or before this date/time.
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

export declare namespace PayrollWageItems {
  export {
    type PayrollWageItem as PayrollWageItem,
    type PayrollWageItemsCursorPage as PayrollWageItemsCursorPage,
    type PayrollWageItemCreateParams as PayrollWageItemCreateParams,
    type PayrollWageItemRetrieveParams as PayrollWageItemRetrieveParams,
    type PayrollWageItemListParams as PayrollWageItemListParams,
  };
}
