// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class SalesTaxCodes extends APIResource {
  /**
   * Creates a new sales-tax code.
   *
   * @example
   * ```ts
   * const salesTaxCode =
   *   await conductor.qbd.salesTaxCodes.create({
   *     isTaxable: true,
   *     name: 'Tax',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(params: SalesTaxCodeCreateParams, options?: Core.RequestOptions): Core.APIPromise<SalesTaxCode> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/sales-tax-codes', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves a sales-tax code by ID.
   *
   * @example
   * ```ts
   * const salesTaxCode =
   *   await conductor.qbd.salesTaxCodes.retrieve(
   *     '80000001-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: SalesTaxCodeRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SalesTaxCode> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/sales-tax-codes/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Updates a sales-tax code’s name, activity status, or linked tax items. Once a
   * code has been used you can’t flip it between taxable and non-taxable, and the
   * built-in TAX/NON codes keep their original taxable setting, so plan new codes if
   * you need a different tax status.
   *
   * @example
   * ```ts
   * const salesTaxCode =
   *   await conductor.qbd.salesTaxCodes.update(
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
    params: SalesTaxCodeUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SalesTaxCode> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(`/quickbooks-desktop/sales-tax-codes/${id}`, {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of sales-tax codes. NOTE: QuickBooks Desktop does not support
   * pagination for sales-tax codes; hence, there is no `cursor` parameter. Users
   * typically have few sales-tax codes.
   *
   * @example
   * ```ts
   * const salesTaxCodes =
   *   await conductor.qbd.salesTaxCodes.list({
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(
    params: SalesTaxCodeListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SalesTaxCodeListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/sales-tax-codes', {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export interface SalesTaxCode {
  /**
   * The unique identifier assigned by QuickBooks to this sales-tax code. This ID is
   * unique across all sales-tax codes but not across different QuickBooks object
   * types.
   */
  id: string;

  /**
   * The date and time when this sales-tax code was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * A description of this sales-tax code.
   */
  description: string | null;

  /**
   * Indicates whether this sales-tax code is active. Inactive objects are typically
   * hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * Indicates whether this sales-tax code is tracking taxable sales. This field
   * cannot be modified once the sales-tax code has been used in a transaction.
   */
  isTaxable: boolean;

  /**
   * The case-insensitive unique name of this sales-tax code, unique across all
   * sales-tax codes. This short name will appear on sales forms to identify the tax
   * status of an item.
   *
   * **NOTE**: Sales-tax codes do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_sales_tax_code"`.
   */
  objectType: 'qbd_sales_tax_code';

  /**
   * The current QuickBooks-assigned revision number of this sales-tax code object,
   * which changes each time the object is modified. When updating this object, you
   * must provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The sales-tax item used to calculate the actual tax amount for this sales-tax
   * code's transactions by applying a specific tax rate collected for a single tax
   * agency. Unlike `salesTaxCode`, which only indicates general taxability, this
   * field drives the actual tax calculation and reporting.
   */
  salesTaxItem: SalesTaxCode.SalesTaxItem | null;

  /**
   * The date and time when this sales-tax code was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace SalesTaxCode {
  /**
   * The sales-tax item used to calculate the actual tax amount for this sales-tax
   * code's transactions by applying a specific tax rate collected for a single tax
   * agency. Unlike `salesTaxCode`, which only indicates general taxability, this
   * field drives the actual tax calculation and reporting.
   */
  export interface SalesTaxItem {
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

export interface SalesTaxCodeListResponse {
  /**
   * The array of sales-tax codes.
   */
  data: Array<SalesTaxCode>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface SalesTaxCodeCreateParams {
  /**
   * Body param: Indicates whether this sales-tax code is tracking taxable sales.
   * This field cannot be modified once the sales-tax code has been used in a
   * transaction.
   */
  isTaxable: boolean;

  /**
   * Body param: The case-insensitive unique name of this sales-tax code, unique
   * across all sales-tax codes. This short name will appear on sales forms to
   * identify the tax status of an item.
   *
   * **NOTE**: Sales-tax codes do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   *
   * Maximum length: 3 characters.
   */
  name: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Body param: A description of this sales-tax code.
   */
  description?: string;

  /**
   * Body param: Indicates whether this sales-tax code is active. Inactive objects
   * are typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The sales-tax item used to calculate the actual tax amount for this
   * sales-tax code's transactions by applying a specific tax rate collected for a
   * single tax agency. Unlike `salesTaxCode`, which only indicates general
   * taxability, this field drives the actual tax calculation and reporting.
   */
  salesTaxItemId?: string;
}

export interface SalesTaxCodeRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface SalesTaxCodeUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the sales-tax
   * code object you are updating, which you can get by fetching the object first.
   * Provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Body param: A description of this sales-tax code.
   */
  description?: string;

  /**
   * Body param: Indicates whether this sales-tax code is active. Inactive objects
   * are typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: Indicates whether this sales-tax code is tracking taxable sales.
   * This field cannot be modified once the sales-tax code has been used in a
   * transaction.
   */
  isTaxable?: boolean;

  /**
   * Body param: The case-insensitive unique name of this sales-tax code, unique
   * across all sales-tax codes. This short name will appear on sales forms to
   * identify the tax status of an item.
   *
   * **NOTE**: Sales-tax codes do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   *
   * Maximum length: 3 characters.
   */
  name?: string;

  /**
   * Body param: The sales-tax item used to calculate the actual tax amount for this
   * sales-tax code's transactions by applying a specific tax rate collected for a
   * single tax agency. Unlike `salesTaxCode`, which only indicates general
   * taxability, this field drives the actual tax calculation and reporting.
   */
  salesTaxItemId?: string;
}

export interface SalesTaxCodeListParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for specific sales-tax codes by their QuickBooks-assigned
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
   * sales-tax codes. This parameter will limit the response size, but you cannot
   * fetch subsequent results using a cursor. For pagination, use the name-range
   * parameters instead (e.g., `nameFrom=A&nameTo=B`).
   *
   * When this parameter is omitted, the endpoint returns all sales-tax codes without
   * limit, unlike paginated endpoints which default to 150 records. This is
   * acceptable because sales-tax codes typically have low record counts.
   */
  limit?: number;

  /**
   * Query param: Filter for sales-tax codes whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for sales-tax codes whose `name` ends with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for sales-tax codes whose `name` is alphabetically greater
   * than or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific sales-tax codes by their name(s),
   * case-insensitive. Like `id`, `name` is a unique identifier for a sales-tax code.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for sales-tax codes whose `name` starts with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for sales-tax codes whose `name` is alphabetically less than
   * or equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for sales-tax codes that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for sales-tax codes updated on or after this date/time.
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
   * Query param: Filter for sales-tax codes updated on or before this date/time.
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

export declare namespace SalesTaxCodes {
  export {
    type SalesTaxCode as SalesTaxCode,
    type SalesTaxCodeListResponse as SalesTaxCodeListResponse,
    type SalesTaxCodeCreateParams as SalesTaxCodeCreateParams,
    type SalesTaxCodeRetrieveParams as SalesTaxCodeRetrieveParams,
    type SalesTaxCodeUpdateParams as SalesTaxCodeUpdateParams,
    type SalesTaxCodeListParams as SalesTaxCodeListParams,
  };
}
