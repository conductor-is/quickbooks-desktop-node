// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class PaymentMethods extends APIResource {
  /**
   * Creates a new payment method.
   *
   * @example
   * ```ts
   * const paymentMethod =
   *   await conductor.qbd.paymentMethods.create({
   *     name: 'Cash',
   *     paymentMethodType: 'cash',
   *     'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(params: PaymentMethodCreateParams, options?: RequestOptions): APIPromise<PaymentMethod> {
    const { 'Conductor-End-User-Id': conductorEndUserID, ...body } = params;
    return this._client.post('/quickbooks-desktop/payment-methods', {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }

  /**
   * Retrieves a payment method by ID.
   *
   * **IMPORTANT:** If you need to fetch multiple specific payment methods by ID, use
   * the list endpoint instead with the `ids` parameter. It accepts an array of IDs
   * so you can batch the request into a single call, which is significantly faster.
   *
   * @example
   * ```ts
   * const paymentMethod =
   *   await conductor.qbd.paymentMethods.retrieve(
   *     '80000001-1234567890',
   *     { 'Conductor-End-User-Id': 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: PaymentMethodRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<PaymentMethod> {
    const { 'Conductor-End-User-Id': conductorEndUserID } = params;
    return this._client.get(path`/quickbooks-desktop/payment-methods/${id}`, {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }

  /**
   * Returns a list of payment methods. NOTE: QuickBooks Desktop does not support
   * pagination for payment methods; hence, there is no `cursor` parameter. Users
   * typically have few payment methods.
   *
   * @example
   * ```ts
   * const paymentMethods =
   *   await conductor.qbd.paymentMethods.list({
   *     'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(params: PaymentMethodListParams, options?: RequestOptions): APIPromise<PaymentMethodListResponse> {
    const { 'Conductor-End-User-Id': conductorEndUserID, ...query } = params;
    return this._client.get('/quickbooks-desktop/payment-methods', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }
}

export interface PaymentMethod {
  /**
   * The unique identifier assigned by QuickBooks to this payment method. This ID is
   * unique across all payment methods but not across different QuickBooks object
   * types.
   */
  id: string;

  /**
   * The date and time when this payment method was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * Indicates whether this payment method is active. Inactive objects are typically
   * hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The case-insensitive unique name of this payment method, unique across all
   * payment methods.
   *
   * **NOTE**: Payment methods do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_payment_method"`.
   */
  objectType: 'qbd_payment_method';

  /**
   * This payment method's type.
   */
  paymentMethodType:
    | 'american_express'
    | 'cash'
    | 'check'
    | 'debit_card'
    | 'discover'
    | 'e_check'
    | 'gift_card'
    | 'master_card'
    | 'other'
    | 'other_credit_card'
    | 'visa';

  /**
   * The current QuickBooks-assigned revision number of this payment method object,
   * which changes each time the object is modified. When updating this object, you
   * must provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The date and time when this payment method was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export interface PaymentMethodListResponse {
  /**
   * The array of payment methods.
   */
  data: Array<PaymentMethod>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface PaymentMethodCreateParams {
  /**
   * Body param: The case-insensitive unique name of this payment method, unique
   * across all payment methods.
   *
   * **NOTE**: Payment methods do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   *
   * Maximum length: 31 characters.
   */
  name: string;

  /**
   * Body param: This payment method's type.
   */
  paymentMethodType:
    | 'american_express'
    | 'cash'
    | 'check'
    | 'debit_card'
    | 'discover'
    | 'e_check'
    | 'gift_card'
    | 'master_card'
    | 'other'
    | 'other_credit_card'
    | 'visa';

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;

  /**
   * Body param: Indicates whether this payment method is active. Inactive objects
   * are typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;
}

export interface PaymentMethodRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;
}

export interface PaymentMethodListParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;

  /**
   * Query param: Filter for specific payment methods by their QuickBooks-assigned
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
   * payment methods. This parameter will limit the response size, but you cannot
   * fetch subsequent results using a cursor. For pagination, use the name-range
   * parameters instead (e.g., `nameFrom=A&nameTo=B`).
   *
   * When this parameter is omitted, the endpoint returns all payment methods without
   * limit, unlike paginated endpoints which default to 150 records. This is
   * acceptable because payment methods typically have low record counts.
   */
  limit?: number;

  /**
   * Query param: Filter for payment methods whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for payment methods whose `name` ends with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for payment methods whose `name` is alphabetically greater
   * than or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific payment methods by their name(s),
   * case-insensitive. Like `id`, `name` is a unique identifier for a payment method.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for payment methods whose `name` starts with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for payment methods whose `name` is alphabetically less than
   * or equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for payment methods of this type.
   */
  paymentMethodType?:
    | 'american_express'
    | 'cash'
    | 'check'
    | 'debit_card'
    | 'discover'
    | 'e_check'
    | 'gift_card'
    | 'master_card'
    | 'other'
    | 'other_credit_card'
    | 'visa';

  /**
   * Query param: Filter for payment methods that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for payment methods updated on or after this date/time.
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
   * Query param: Filter for payment methods updated on or before this date/time.
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

export declare namespace PaymentMethods {
  export {
    type PaymentMethod as PaymentMethod,
    type PaymentMethodListResponse as PaymentMethodListResponse,
    type PaymentMethodCreateParams as PaymentMethodCreateParams,
    type PaymentMethodRetrieveParams as PaymentMethodRetrieveParams,
    type PaymentMethodListParams as PaymentMethodListParams,
  };
}
