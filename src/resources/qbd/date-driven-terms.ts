// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class DateDrivenTerms extends APIResource {
  /**
   * Creates a date-driven term that sets the payment due on a specific day of the
   * month and can optionally grant an early-payment discount before
   * `discountDayOfMonth`. Use it when you need due dates tied to calendar days
   * instead of a fixed number of days after the transaction.
   *
   * @example
   * ```ts
   * const dateDrivenTerm =
   *   await conductor.qbd.dateDrivenTerms.create({
   *     dueDayOfMonth: 15,
   *     name: '2% 5th Net 25th',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(params: DateDrivenTermCreateParams, options?: Core.RequestOptions): Core.APIPromise<DateDrivenTerm> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/date-driven-terms', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves a date-driven term by ID.
   *
   * @example
   * ```ts
   * const dateDrivenTerm =
   *   await conductor.qbd.dateDrivenTerms.retrieve(
   *     '80000001-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: DateDrivenTermRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DateDrivenTerm> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/date-driven-terms/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of date-driven terms. NOTE: QuickBooks Desktop does not support
   * pagination for date-driven terms; hence, there is no `cursor` parameter. Users
   * typically have few date-driven terms.
   *
   * @example
   * ```ts
   * const dateDrivenTerms =
   *   await conductor.qbd.dateDrivenTerms.list({
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(
    params: DateDrivenTermListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DateDrivenTermListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/date-driven-terms', {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export interface DateDrivenTerm {
  /**
   * The unique identifier assigned by QuickBooks to this date-driven term. This ID
   * is unique across all date-driven terms but not across different QuickBooks
   * object types.
   */
  id: string;

  /**
   * The date and time when this date-driven term was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The day of the month within which payment must be received to qualify for the
   * discount specified by `discountPercentage`.
   */
  discountDayOfMonth: number | null;

  /**
   * The discount percentage applied to the payment if received on or before the
   * specified `discountDayOfMonth`. The value is between 0 and 100.
   */
  discountPercentage: string | null;

  /**
   * The day of the month when full payment is due without discount.
   */
  dueDayOfMonth: number;

  /**
   * The number of days before `dueDayOfMonth` when an invoice or bill issued within
   * this threshold is considered due the following month. For example, with
   * `dueDayOfMonth` set to 15 and `gracePeriodDays` set to 2, an invoice issued on
   * the 13th would be due on the 15th of the next month, while an invoice issued on
   * the 12th would be due on the 15th of the current month.
   */
  gracePeriodDays: number | null;

  /**
   * Indicates whether this date-driven term is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The case-insensitive unique name of this date-driven term, unique across all
   * date-driven terms.
   *
   * **NOTE**: Date-driven terms do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_date_driven_term"`.
   */
  objectType: 'qbd_date_driven_term';

  /**
   * The current QuickBooks-assigned revision number of this date-driven term object,
   * which changes each time the object is modified. When updating this object, you
   * must provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The date and time when this date-driven term was last updated, in ISO 8601
   * format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the
   * local timezone of the end-user's computer.
   */
  updatedAt: string;
}

export interface DateDrivenTermListResponse {
  /**
   * The array of date-driven terms.
   */
  data: Array<DateDrivenTerm>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface DateDrivenTermCreateParams {
  /**
   * Body param: The day of the month when full payment is due without discount.
   */
  dueDayOfMonth: number;

  /**
   * Body param: The case-insensitive unique name of this date-driven term, unique
   * across all date-driven terms.
   *
   * **NOTE**: Date-driven terms do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   *
   * Maximum length: 31 characters.
   */
  name: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Body param: The day of the month within which payment must be received to
   * qualify for the discount specified by `discountPercentage`.
   */
  discountDayOfMonth?: number;

  /**
   * Body param: The discount percentage applied to the payment if received on or
   * before the specified `discountDayOfMonth`. The value is between 0 and 100.
   */
  discountPercentage?: string;

  /**
   * Body param: The number of days before `dueDayOfMonth` when an invoice or bill
   * issued within this threshold is considered due the following month. For example,
   * with `dueDayOfMonth` set to 15 and `gracePeriodDays` set to 2, an invoice issued
   * on the 13th would be due on the 15th of the next month, while an invoice issued
   * on the 12th would be due on the 15th of the current month.
   */
  gracePeriodDays?: number;

  /**
   * Body param: Indicates whether this date-driven term is active. Inactive objects
   * are typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;
}

export interface DateDrivenTermRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface DateDrivenTermListParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for specific date-driven terms by their QuickBooks-assigned
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
   * Query param: The maximum number of objects to return.
   *
   * **IMPORTANT**: QuickBooks Desktop does not support cursor-based pagination for
   * date-driven terms. This parameter will limit the response size, but you cannot
   * fetch subsequent results using a cursor. For pagination, use the name-range
   * parameters instead (e.g., `nameFrom=A&nameTo=B`).
   *
   * When this parameter is omitted, the endpoint returns all date-driven terms
   * without limit, unlike paginated endpoints which default to 150 records. This is
   * acceptable because date-driven terms typically have low record counts.
   */
  limit?: number;

  /**
   * Query param: Filter for date-driven terms whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for date-driven terms whose `name` ends with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for date-driven terms whose `name` is alphabetically greater
   * than or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific date-driven terms by their name(s),
   * case-insensitive. Like `id`, `name` is a unique identifier for a date-driven
   * term.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for date-driven terms whose `name` starts with this
   * substring, case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for date-driven terms whose `name` is alphabetically less
   * than or equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for date-driven terms that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for date-driven terms updated on or after this date/time.
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
   * Query param: Filter for date-driven terms updated on or before this date/time.
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

export declare namespace DateDrivenTerms {
  export {
    type DateDrivenTerm as DateDrivenTerm,
    type DateDrivenTermListResponse as DateDrivenTermListResponse,
    type DateDrivenTermCreateParams as DateDrivenTermCreateParams,
    type DateDrivenTermRetrieveParams as DateDrivenTermRetrieveParams,
    type DateDrivenTermListParams as DateDrivenTermListParams,
  };
}
