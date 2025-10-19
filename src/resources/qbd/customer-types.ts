// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class CustomerTypes extends APIResource {
  /**
   * Creates a new customer type.
   *
   * @example
   * ```ts
   * const customerType =
   *   await conductor.qbd.customerTypes.create({
   *     name: 'Healthcare',
   *     'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(params: CustomerTypeCreateParams, options?: RequestOptions): APIPromise<CustomerType> {
    const { 'Conductor-End-User-Id': conductorEndUserID, ...body } = params;
    return this._client.post('/quickbooks-desktop/customer-types', {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }

  /**
   * Retrieves a customer type by ID.
   *
   * **IMPORTANT:** If you need to fetch multiple specific customer types by ID, use
   * the list endpoint instead with the `ids` parameter. It accepts an array of IDs
   * so you can batch the request into a single call, which is significantly faster.
   *
   * @example
   * ```ts
   * const customerType =
   *   await conductor.qbd.customerTypes.retrieve(
   *     '80000001-1234567890',
   *     { 'Conductor-End-User-Id': 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: CustomerTypeRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<CustomerType> {
    const { 'Conductor-End-User-Id': conductorEndUserID } = params;
    return this._client.get(path`/quickbooks-desktop/customer-types/${id}`, {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }

  /**
   * Returns a list of customer types. NOTE: QuickBooks Desktop does not support
   * pagination for customer types; hence, there is no `cursor` parameter. Users
   * typically have few customer types.
   *
   * @example
   * ```ts
   * const customerTypes =
   *   await conductor.qbd.customerTypes.list({
   *     'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(params: CustomerTypeListParams, options?: RequestOptions): APIPromise<CustomerTypeListResponse> {
    const { 'Conductor-End-User-Id': conductorEndUserID, ...query } = params;
    return this._client.get('/quickbooks-desktop/customer-types', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }
}

export interface CustomerType {
  /**
   * The unique identifier assigned by QuickBooks to this customer type. This ID is
   * unique across all customer types but not across different QuickBooks object
   * types.
   */
  id: string;

  /**
   * The date and time when this customer type was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The case-insensitive fully-qualified unique name of this customer type, formed
   * by combining the names of its hierarchical parent objects with its own `name`,
   * separated by colons. For example, if a customer type is under "Industry" and has
   * the `name` "Healthcare", its `fullName` would be "Industry:Healthcare".
   *
   * **NOTE**: Unlike `name`, `fullName` is guaranteed to be unique across all
   * customer type objects. However, `fullName` can still be arbitrarily changed by
   * the QuickBooks user when they modify the underlying `name` field.
   */
  fullName: string;

  /**
   * Indicates whether this customer type is active. Inactive objects are typically
   * hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The case-insensitive name of this customer type. Not guaranteed to be unique
   * because it does not include the names of its hierarchical parent objects like
   * `fullName` does. For example, two customer types could both have the `name`
   * "Healthcare", but they could have unique `fullName` values, such as
   * "Industry:Healthcare" and "Region:Healthcare".
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_customer_type"`.
   */
  objectType: 'qbd_customer_type';

  /**
   * The parent customer type one level above this one in the hierarchy. For example,
   * if this customer type has a `fullName` of "Industry:Healthcare", its parent has
   * a `fullName` of "Industry". If this customer type is at the top level, this
   * field will be `null`.
   */
  parent: CustomerType.Parent | null;

  /**
   * The current QuickBooks-assigned revision number of this customer type object,
   * which changes each time the object is modified. When updating this object, you
   * must provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The depth level of this customer type in the hierarchy. A top-level customer
   * type has a `sublevel` of 0; each subsequent sublevel increases this number by 1.
   * For example, a customer type with a `fullName` of "Industry:Healthcare" would
   * have a `sublevel` of 1.
   */
  sublevel: number;

  /**
   * The date and time when this customer type was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace CustomerType {
  /**
   * The parent customer type one level above this one in the hierarchy. For example,
   * if this customer type has a `fullName` of "Industry:Healthcare", its parent has
   * a `fullName` of "Industry". If this customer type is at the top level, this
   * field will be `null`.
   */
  export interface Parent {
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

export interface CustomerTypeListResponse {
  /**
   * The array of customer types.
   */
  data: Array<CustomerType>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface CustomerTypeCreateParams {
  /**
   * Body param: The case-insensitive name of this customer type. Not guaranteed to
   * be unique because it does not include the names of its hierarchical parent
   * objects like `fullName` does. For example, two customer types could both have
   * the `name` "Healthcare", but they could have unique `fullName` values, such as
   * "Industry:Healthcare" and "Region:Healthcare".
   *
   * Maximum length: 31 characters.
   */
  name: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;

  /**
   * Body param: Indicates whether this customer type is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The parent customer type one level above this one in the hierarchy.
   * For example, if this customer type has a `fullName` of "Industry:Healthcare",
   * its parent has a `fullName` of "Industry". If this customer type is at the top
   * level, this field will be `null`.
   */
  parentId?: string;
}

export interface CustomerTypeRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;
}

export interface CustomerTypeListParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;

  /**
   * Query param: Filter for specific customer types by their full-name(s),
   * case-insensitive. Like `id`, `fullName` is a unique identifier for a customer
   * type, formed by by combining the names of its parent objects with its own
   * `name`, separated by colons. For example, if a customer type is under "Industry"
   * and has the `name` "Healthcare", its `fullName` would be "Industry:Healthcare".
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  fullNames?: Array<string>;

  /**
   * Query param: Filter for specific customer types by their QuickBooks-assigned
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
   * customer types. This parameter will limit the response size, but you cannot
   * fetch subsequent results using a cursor. For pagination, use the name-range
   * parameters instead (e.g., `nameFrom=A&nameTo=B`).
   *
   * When this parameter is omitted, the endpoint returns all customer types without
   * limit, unlike paginated endpoints which default to 150 records. This is
   * acceptable because customer types typically have low record counts.
   */
  limit?: number;

  /**
   * Query param: Filter for customer types whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for customer types whose `name` ends with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for customer types whose `name` is alphabetically greater
   * than or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for customer types whose `name` starts with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for customer types whose `name` is alphabetically less than
   * or equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for customer types that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for customer types updated on or after this date/time.
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
   * Query param: Filter for customer types updated on or before this date/time.
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

export declare namespace CustomerTypes {
  export {
    type CustomerType as CustomerType,
    type CustomerTypeListResponse as CustomerTypeListResponse,
    type CustomerTypeCreateParams as CustomerTypeCreateParams,
    type CustomerTypeRetrieveParams as CustomerTypeRetrieveParams,
    type CustomerTypeListParams as CustomerTypeListParams,
  };
}
