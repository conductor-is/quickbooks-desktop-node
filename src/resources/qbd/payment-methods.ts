// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class PaymentMethods extends APIResource {
  /**
   * Creates a new payment method.
   *
   * @example
   * ```ts
   * const paymentMethod =
   *   await client.qbd.paymentMethods.create({
   *     name: 'Cash',
   *     paymentMethodType: 'cash',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(params: PaymentMethodCreateParams, options?: Core.RequestOptions): Core.APIPromise<PaymentMethod> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/payment-methods', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves a payment method by ID.
   *
   * @example
   * ```ts
   * const paymentMethod =
   *   await client.qbd.paymentMethods.retrieve(
   *     '80000001-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: PaymentMethodRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PaymentMethod> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/payment-methods/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of payment methods. Use the `cursor` parameter to paginate
   * through the results.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const paymentMethod of client.qbd.paymentMethods.list(
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    params: PaymentMethodListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<PaymentMethodsCursorPage, PaymentMethod> {
    const { conductorEndUserId, ...query } = params;
    return this._client.getAPIList('/quickbooks-desktop/payment-methods', PaymentMethodsCursorPage, {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export class PaymentMethodsCursorPage extends CursorPage<PaymentMethod> {}

export interface PaymentMethod {
  /**
   * The unique identifier assigned by QuickBooks to this payment method. This ID is
   * unique across all payment methods but not across different QuickBooks object
   * types.
   */
  id: string;

  /**
   * The date and time when this payment method was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user's time zone
   * in QuickBooks.
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
   * (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user's time zone
   * in QuickBooks.
   */
  updatedAt: string;
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
  conductorEndUserId: string;

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
  conductorEndUserId: string;
}

export interface PaymentMethodListParams extends CursorPageParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

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
   * Query param: Filter for payment methods whose `name` contains this substring,
   * case-insensitive. NOTE: If you use this parameter, you cannot also use
   * `nameStartsWith` or `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for payment methods whose `name` ends with this substring,
   * case-insensitive. NOTE: If you use this parameter, you cannot also use
   * `nameContains` or `nameStartsWith`.
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
   * case-insensitive. NOTE: If you use this parameter, you cannot also use
   * `nameContains` or `nameEndsWith`.
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
   * Query param: Filter for payment methods updated on or after this date and time,
   * in ISO 8601 format (YYYY-MM-DDTHH:mm:ss). If you only provide a date
   * (YYYY-MM-DD), the time is assumed to be 00:00:00 of that day.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for payment methods updated on or before this date and time,
   * in ISO 8601 format (YYYY-MM-DDTHH:mm:ss). If you only provide a date
   * (YYYY-MM-DD), the time is assumed to be 23:59:59 of that day.
   */
  updatedBefore?: string;
}

PaymentMethods.PaymentMethodsCursorPage = PaymentMethodsCursorPage;

export declare namespace PaymentMethods {
  export {
    type PaymentMethod as PaymentMethod,
    PaymentMethodsCursorPage as PaymentMethodsCursorPage,
    type PaymentMethodCreateParams as PaymentMethodCreateParams,
    type PaymentMethodRetrieveParams as PaymentMethodRetrieveParams,
    type PaymentMethodListParams as PaymentMethodListParams,
  };
}
