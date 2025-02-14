// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class PayrollWageItems extends APIResource {
  /**
   * Creates a new payroll wage item.
   */
  create(
    params: PayrollWageItemCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PayrollWageItem> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/payroll-wage-items', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves a payroll wage item by ID.
   */
  retrieve(
    id: string,
    params: PayrollWageItemRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PayrollWageItem> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/payroll-wage-items/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of payroll wage items. Use the `cursor` parameter to paginate
   * through the results.
   */
  list(
    params: PayrollWageItemListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<PayrollWageItemsCursorPage, PayrollWageItem> {
    const { conductorEndUserId, ...query } = params;
    return this._client.getAPIList('/quickbooks-desktop/payroll-wage-items', PayrollWageItemsCursorPage, {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export class PayrollWageItemsCursorPage extends CursorPage<PayrollWageItem> {}

export interface PayrollWageItem {
  /**
   * The unique identifier assigned by QuickBooks to this payroll wage item. This ID
   * is unique across all payroll wage items but not across different QuickBooks
   * object types.
   */
  id: string;

  /**
   * The date and time when this payroll wage item was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user's time zone
   * in QuickBooks.
   */
  createdAt: string;

  /**
   * The expense account used to track wage expenses paid through this payroll wage
   * item.
   */
  expenseAccount: PayrollWageItem.ExpenseAccount;

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
   * format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user's time
   * zone in QuickBooks.
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
  conductorEndUserId: string;

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
  conductorEndUserId: string;
}

export interface PayrollWageItemListParams extends CursorPageParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

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
   * case-insensitive. NOTE: If you use this parameter, you cannot also use
   * `nameStartsWith` or `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for payroll wage items whose `name` ends with this
   * substring, case-insensitive. NOTE: If you use this parameter, you cannot also
   * use `nameContains` or `nameStartsWith`.
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
   * substring, case-insensitive. NOTE: If you use this parameter, you cannot also
   * use `nameContains` or `nameEndsWith`.
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
   * Query param: Filter for payroll wage items updated on or after this date and
   * time, in ISO 8601 format (YYYY-MM-DDTHH:mm:ss). If you only provide a date
   * (YYYY-MM-DD), the time is assumed to be 00:00:00 of that day.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for payroll wage items updated on or before this date and
   * time, in ISO 8601 format (YYYY-MM-DDTHH:mm:ss). If you only provide a date
   * (YYYY-MM-DD), the time is assumed to be 23:59:59 of that day.
   */
  updatedBefore?: string;
}

PayrollWageItems.PayrollWageItemsCursorPage = PayrollWageItemsCursorPage;

export declare namespace PayrollWageItems {
  export {
    type PayrollWageItem as PayrollWageItem,
    PayrollWageItemsCursorPage as PayrollWageItemsCursorPage,
    type PayrollWageItemCreateParams as PayrollWageItemCreateParams,
    type PayrollWageItemRetrieveParams as PayrollWageItemRetrieveParams,
    type PayrollWageItemListParams as PayrollWageItemListParams,
  };
}
