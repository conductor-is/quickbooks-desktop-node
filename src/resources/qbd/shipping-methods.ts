// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class ShippingMethods extends APIResource {
  /**
   * Creates a new shipping method.
   *
   * @example
   * ```ts
   * const shippingMethod =
   *   await conductor.qbd.shippingMethods.create({
   *     name: 'FedEx Ground',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(params: ShippingMethodCreateParams, options?: RequestOptions): APIPromise<ShippingMethod> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/shipping-methods', {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Retrieves a shipping method by ID.
   *
   * **IMPORTANT:** If you need to fetch multiple specific shipping methods by ID,
   * use the list endpoint instead with the `ids` parameter. It accepts an array of
   * IDs so you can batch the request into a single call, which is significantly
   * faster.
   *
   * @example
   * ```ts
   * const shippingMethod =
   *   await conductor.qbd.shippingMethods.retrieve(
   *     '80000001-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: ShippingMethodRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ShippingMethod> {
    const { conductorEndUserId } = params;
    return this._client.get(path`/quickbooks-desktop/shipping-methods/${id}`, {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Returns a list of shipping methods. NOTE: QuickBooks Desktop does not support
   * pagination for shipping methods; hence, there is no `cursor` parameter. Users
   * typically have few shipping methods.
   *
   * @example
   * ```ts
   * const shippingMethods =
   *   await conductor.qbd.shippingMethods.list({
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(params: ShippingMethodListParams, options?: RequestOptions): APIPromise<ShippingMethodListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/shipping-methods', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }
}

export interface ShippingMethod {
  /**
   * The unique identifier assigned by QuickBooks to this shipping method. This ID is
   * unique across all shipping methods but not across different QuickBooks object
   * types.
   */
  id: string;

  /**
   * The date and time when this shipping method was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * Indicates whether this shipping method is active. Inactive objects are typically
   * hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The case-insensitive unique name of this shipping method, unique across all
   * shipping methods.
   *
   * **NOTE**: Shipping methods do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_shipping_method"`.
   */
  objectType: 'qbd_shipping_method';

  /**
   * The current QuickBooks-assigned revision number of this shipping method object,
   * which changes each time the object is modified. When updating this object, you
   * must provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The date and time when this shipping method was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export interface ShippingMethodListResponse {
  /**
   * The array of shipping methods.
   */
  data: Array<ShippingMethod>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface ShippingMethodCreateParams {
  /**
   * Body param: The case-insensitive unique name of this shipping method, unique
   * across all shipping methods.
   *
   * **NOTE**: Shipping methods do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   *
   * Maximum length: 15 characters.
   */
  name: string;

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Body param: Indicates whether this shipping method is active. Inactive objects
   * are typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;
}

export interface ShippingMethodRetrieveParams {
  /**
   * The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;
}

export interface ShippingMethodListParams {
  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for specific shipping methods by their QuickBooks-assigned
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
   * shipping methods. This parameter will limit the response size, but you cannot
   * fetch subsequent results using a cursor. For pagination, use the name-range
   * parameters instead (e.g., `nameFrom=A&nameTo=B`).
   *
   * When this parameter is omitted, the endpoint returns all shipping methods
   * without limit, unlike paginated endpoints which default to 150 records. This is
   * acceptable because shipping methods typically have low record counts.
   */
  limit?: number;

  /**
   * Query param: Filter for shipping methods whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for shipping methods whose `name` ends with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for shipping methods whose `name` is alphabetically greater
   * than or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific shipping methods by their name(s),
   * case-insensitive. Like `id`, `name` is a unique identifier for a shipping
   * method.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for shipping methods whose `name` starts with this
   * substring, case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for shipping methods whose `name` is alphabetically less
   * than or equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for shipping methods that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for shipping methods updated on or after this date/time.
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
   * Query param: Filter for shipping methods updated on or before this date/time.
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

export declare namespace ShippingMethods {
  export {
    type ShippingMethod as ShippingMethod,
    type ShippingMethodListResponse as ShippingMethodListResponse,
    type ShippingMethodCreateParams as ShippingMethodCreateParams,
    type ShippingMethodRetrieveParams as ShippingMethodRetrieveParams,
    type ShippingMethodListParams as ShippingMethodListParams,
  };
}
