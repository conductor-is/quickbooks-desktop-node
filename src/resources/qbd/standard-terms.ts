// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class StandardTerms extends APIResource {
  /**
   * Creates a new standard term.
   *
   * @example
   * ```ts
   * const standardTerm =
   *   await conductor.qbd.standardTerms.create({
   *     name: 'Net 30',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(params: StandardTermCreateParams, options?: Core.RequestOptions): Core.APIPromise<StandardTerm> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/standard-terms', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves a standard term by ID.
   *
   * @example
   * ```ts
   * const standardTerm =
   *   await conductor.qbd.standardTerms.retrieve(
   *     '80000001-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: StandardTermRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<StandardTerm> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/standard-terms/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of standard terms. NOTE: QuickBooks Desktop does not support
   * pagination for standard terms; hence, there is no `cursor` parameter. Users
   * typically have few standard terms.
   *
   * @example
   * ```ts
   * const standardTerms =
   *   await conductor.qbd.standardTerms.list({
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(
    params: StandardTermListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<StandardTermListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/standard-terms', {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export interface StandardTerm {
  /**
   * The unique identifier assigned by QuickBooks to this standard term. This ID is
   * unique across all standard terms but not across different QuickBooks object
   * types.
   */
  id: string;

  /**
   * The date and time when this standard term was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), in the QuickBooks Desktop host machine’s local
   * timezone.
   */
  createdAt: string;

  /**
   * The number of days within which payment must be received to qualify for the
   * discount specified by `discountPercentage`.
   */
  discountDays: number | null;

  /**
   * The discount percentage applied to the payment if received within the number of
   * days specified by `discountDays`. The value is between 0 and 100.
   */
  discountPercentage: string | null;

  /**
   * The number of days until payment is due.
   */
  dueDays: number | null;

  /**
   * Indicates whether this standard term is active. Inactive objects are typically
   * hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The case-insensitive unique name of this standard term, unique across all
   * standard terms.
   *
   * **NOTE**: Standard terms do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_standard_term"`.
   */
  objectType: 'qbd_standard_term';

  /**
   * The current QuickBooks-assigned revision number of this standard term object,
   * which changes each time the object is modified. When updating this object, you
   * must provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The date and time when this standard term was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), in the QuickBooks Desktop host machine’s local
   * timezone.
   */
  updatedAt: string;
}

export interface StandardTermListResponse {
  /**
   * The array of standard terms.
   */
  data: Array<StandardTerm>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface StandardTermCreateParams {
  /**
   * Body param: The case-insensitive unique name of this standard term, unique
   * across all standard terms.
   *
   * **NOTE**: Standard terms do not have a `fullName` field because they are not
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
   * Body param: The number of days within which payment must be received to qualify
   * for the discount specified by `discountPercentage`.
   */
  discountDays?: number;

  /**
   * Body param: The discount percentage applied to the payment if received within
   * the number of days specified by `discountDays`. The value is between 0 and 100.
   */
  discountPercentage?: string;

  /**
   * Body param: The number of days until payment is due.
   */
  dueDays?: number;

  /**
   * Body param: Indicates whether this standard term is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;
}

export interface StandardTermRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface StandardTermListParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for specific standard terms by their QuickBooks-assigned
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
   * standard terms. This parameter will limit the response size, but you cannot
   * fetch subsequent results using a cursor. For pagination, use the name-range
   * parameters instead (e.g., `nameFrom=A&nameTo=B`).
   *
   * When this parameter is omitted, the endpoint returns all standard terms without
   * limit, unlike paginated endpoints which default to 150 records. This is
   * acceptable because standard terms typically have low record counts.
   */
  limit?: number;

  /**
   * Query param: Filter for standard terms whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for standard terms whose `name` ends with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for standard terms whose `name` is alphabetically greater
   * than or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific standard terms by their name(s),
   * case-insensitive. Like `id`, `name` is a unique identifier for a standard term.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for standard terms whose `name` starts with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for standard terms whose `name` is alphabetically less than
   * or equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for standard terms that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for standard terms updated on or after this date/time.
   * Accepts the following ISO 8601 formats:
   *
   * - **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets this as midnight in
   *   the host machine’s local timezone.
   * - **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop uses
   *   the host machine’s local timezone to interpret the timestamp.
   * - **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop
   *   uses this timezone to interpret the timestamp.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for standard terms updated on or before this date/time.
   * Accepts the following ISO 8601 formats:
   *
   * - **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets this as midnight in
   *   the host machine’s local timezone.
   * - **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop uses
   *   the host machine’s local timezone to interpret the timestamp.
   * - **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop
   *   uses this timezone to interpret the timestamp.
   */
  updatedBefore?: string;
}

export declare namespace StandardTerms {
  export {
    type StandardTerm as StandardTerm,
    type StandardTermListResponse as StandardTermListResponse,
    type StandardTermCreateParams as StandardTermCreateParams,
    type StandardTermRetrieveParams as StandardTermRetrieveParams,
    type StandardTermListParams as StandardTermListParams,
  };
}
