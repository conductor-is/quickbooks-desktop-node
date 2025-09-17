// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class SalesRepresentatives extends APIResource {
  /**
   * Creates a sales representative that references an existing employee, vendor, or
   * other-name record so it can be assigned on sales forms.
   *
   * @example
   * ```ts
   * const salesRepresentative =
   *   await conductor.qbd.salesRepresentatives.create({
   *     entityId: '80000001-1234567890',
   *     initial: 'JD',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(
    params: SalesRepresentativeCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SalesRepresentative> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/sales-representatives', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves a sales representative by ID.
   *
   * @example
   * ```ts
   * const salesRepresentative =
   *   await conductor.qbd.salesRepresentatives.retrieve(
   *     '80000001-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: SalesRepresentativeRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SalesRepresentative> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/sales-representatives/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Updates an existing sales representative.
   *
   * @example
   * ```ts
   * const salesRepresentative =
   *   await conductor.qbd.salesRepresentatives.update(
   *     '80000001-1234567890',
   *     {
   *       revisionNumber: '1721172183',
   *       conductorEndUserId: 'end_usr_1234567abcdefg',
   *     },
   *   );
   * ```
   */
  update(
    id: string,
    params: SalesRepresentativeUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SalesRepresentative> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(`/quickbooks-desktop/sales-representatives/${id}`, {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of sales representatives. NOTE: QuickBooks Desktop does not
   * support pagination for sales representatives; hence, there is no `cursor`
   * parameter. Users typically have few sales representatives.
   *
   * @example
   * ```ts
   * const salesRepresentatives =
   *   await conductor.qbd.salesRepresentatives.list({
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(
    params: SalesRepresentativeListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SalesRepresentativeListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/sales-representatives', {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export interface SalesRepresentative {
  /**
   * The unique identifier assigned by QuickBooks to this sales representative. This
   * ID is unique across all sales representatives but not across different
   * QuickBooks object types.
   */
  id: string;

  /**
   * The date and time when this sales representative was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The sales representative's corresponding person entity in QuickBooks, stored as
   * either an employee, vendor, or other-name entry.
   */
  entity: SalesRepresentative.Entity;

  /**
   * The initials of this sales representative's name.
   */
  initial: string;

  /**
   * Indicates whether this sales representative is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The type of object. This value is always `"qbd_sales_representative"`.
   */
  objectType: 'qbd_sales_representative';

  /**
   * The current QuickBooks-assigned revision number of this sales representative
   * object, which changes each time the object is modified. When updating this
   * object, you must provide the most recent `revisionNumber` to ensure you're
   * working with the latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The date and time when this sales representative was last updated, in ISO 8601
   * format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the
   * local timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace SalesRepresentative {
  /**
   * The sales representative's corresponding person entity in QuickBooks, stored as
   * either an employee, vendor, or other-name entry.
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

export interface SalesRepresentativeListResponse {
  /**
   * The array of sales representatives.
   */
  data: Array<SalesRepresentative>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface SalesRepresentativeCreateParams {
  /**
   * Body param: The sales representative's corresponding person entity in
   * QuickBooks, stored as either an employee, vendor, or other-name entry.
   */
  entityId: string;

  /**
   * Body param: The initials of this sales representative's name.
   *
   * Maximum length: 5 characters.
   */
  initial: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Body param: Indicates whether this sales representative is active. Inactive
   * objects are typically hidden from views and reports in QuickBooks. Defaults to
   * `true`.
   */
  isActive?: boolean;
}

export interface SalesRepresentativeRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface SalesRepresentativeUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the sales
   * representative object you are updating, which you can get by fetching the object
   * first. Provide the most recent `revisionNumber` to ensure you're working with
   * the latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Body param: The sales representative's corresponding person entity in
   * QuickBooks, stored as either an employee, vendor, or other-name entry.
   */
  entityId?: string;

  /**
   * Body param: The initials of this sales representative's name.
   *
   * Maximum length: 5 characters.
   */
  initial?: string;

  /**
   * Body param: Indicates whether this sales representative is active. Inactive
   * objects are typically hidden from views and reports in QuickBooks. Defaults to
   * `true`.
   */
  isActive?: boolean;
}

export interface SalesRepresentativeListParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for specific sales representatives by their
   * QuickBooks-assigned unique identifier(s).
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
   * sales representatives. This parameter will limit the response size, but you
   * cannot fetch subsequent results using a cursor. For pagination, use the
   * name-range parameters instead (e.g., `nameFrom=A&nameTo=B`).
   *
   * When this parameter is omitted, the endpoint returns all sales representatives
   * without limit, unlike paginated endpoints which default to 150 records. This is
   * acceptable because sales representatives typically have low record counts.
   */
  limit?: number;

  /**
   * Query param: Filter for sales representatives whose `name` contains this
   * substring, case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for sales representatives whose `name` ends with this
   * substring, case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for sales representatives whose `name` is alphabetically
   * greater than or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific sales representatives by their name(s),
   * case-insensitive. Like `id`, `name` is a unique identifier for a sales
   * representative.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for sales representatives whose `name` starts with this
   * substring, case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for sales representatives whose `name` is alphabetically
   * less than or equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for sales representatives that are active, inactive, or
   * both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for sales representatives updated on or after this
   * date/time. Accepts the following ISO 8601 formats:
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
   * Query param: Filter for sales representatives updated on or before this
   * date/time. Accepts the following ISO 8601 formats:
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

export declare namespace SalesRepresentatives {
  export {
    type SalesRepresentative as SalesRepresentative,
    type SalesRepresentativeListResponse as SalesRepresentativeListResponse,
    type SalesRepresentativeCreateParams as SalesRepresentativeCreateParams,
    type SalesRepresentativeRetrieveParams as SalesRepresentativeRetrieveParams,
    type SalesRepresentativeUpdateParams as SalesRepresentativeUpdateParams,
    type SalesRepresentativeListParams as SalesRepresentativeListParams,
  };
}
