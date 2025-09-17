// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class InventorySites extends APIResource {
  /**
   * Creates an inventory site for companies using QuickBooks Enterprise with
   * Advanced Inventory.
   *
   * @example
   * ```ts
   * const inventorySite =
   *   await conductor.qbd.inventorySites.create({
   *     name: 'Stockroom',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(params: InventorySiteCreateParams, options?: Core.RequestOptions): Core.APIPromise<InventorySite> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/inventory-sites', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves an inventory site by ID.
   *
   * @example
   * ```ts
   * const inventorySite =
   *   await conductor.qbd.inventorySites.retrieve(
   *     '80000001-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: InventorySiteRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InventorySite> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/inventory-sites/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Updates an existing inventory site.
   *
   * @example
   * ```ts
   * const inventorySite =
   *   await conductor.qbd.inventorySites.update(
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
    params: InventorySiteUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InventorySite> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(`/quickbooks-desktop/inventory-sites/${id}`, {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of inventory sites. NOTE: QuickBooks Desktop does not support
   * pagination for inventory sites; hence, there is no `cursor` parameter. Users
   * typically have few inventory sites.
   *
   * @example
   * ```ts
   * const inventorySites =
   *   await conductor.qbd.inventorySites.list({
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(
    params: InventorySiteListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InventorySiteListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/inventory-sites', {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export interface InventorySite {
  /**
   * The unique identifier assigned by QuickBooks to this inventory site. This ID is
   * unique across all inventory sites but not across different QuickBooks object
   * types.
   */
  id: string;

  /**
   * The inventory site's address.
   */
  address: InventorySite.Address | null;

  /**
   * The name of the primary contact person for this inventory site.
   */
  contact: string | null;

  /**
   * The date and time when this inventory site was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * A description of this inventory site.
   */
  description: string | null;

  /**
   * The inventory site's email address.
   */
  email: string | null;

  /**
   * The inventory site's fax number.
   */
  fax: string | null;

  /**
   * Indicates whether this inventory site is active. Inactive objects are typically
   * hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * Indicates whether this inventory site is the default site used when no specific
   * site is provided during the creation of other objects.
   */
  isDefault: boolean | null;

  /**
   * The case-insensitive unique name of this inventory site, unique across all
   * inventory sites.
   *
   * **NOTE**: Inventory sites do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_inventory_site"`.
   */
  objectType: 'qbd_inventory_site';

  /**
   * The parent inventory site one level above this one in the hierarchy.
   */
  parent: InventorySite.Parent | null;

  /**
   * The inventory site's primary telephone number.
   */
  phone: string | null;

  /**
   * The current QuickBooks-assigned revision number of this inventory site object,
   * which changes each time the object is modified. When updating this object, you
   * must provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The date and time when this inventory site was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace InventorySite {
  /**
   * The inventory site's address.
   */
  export interface Address {
    /**
     * The city, district, suburb, town, or village name of the site address.
     */
    city: string | null;

    /**
     * The country name of the site address.
     */
    country: string | null;

    /**
     * The first line of the site address (e.g., street, PO Box, or company name).
     */
    line1: string | null;

    /**
     * The second line of the site address, if needed (e.g., apartment, suite, unit, or
     * building).
     */
    line2: string | null;

    /**
     * The third line of the site address, if needed.
     */
    line3: string | null;

    /**
     * The fourth line of the site address, if needed.
     */
    line4: string | null;

    /**
     * The fifth line of the site address, if needed.
     */
    line5: string | null;

    /**
     * The postal code or ZIP code of the site address.
     */
    postalCode: string | null;

    /**
     * The state, county, province, or region name of the site address.
     */
    state: string | null;
  }

  /**
   * The parent inventory site one level above this one in the hierarchy.
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

export interface InventorySiteListResponse {
  /**
   * The array of inventory sites.
   */
  data: Array<InventorySite>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface InventorySiteCreateParams {
  /**
   * Body param: The case-insensitive unique name of this inventory site, unique
   * across all inventory sites.
   *
   * **NOTE**: Inventory sites do not have a `fullName` field because they are not
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
   * Body param: The inventory site's address.
   */
  address?: InventorySiteCreateParams.Address;

  /**
   * Body param: A description of this inventory site.
   */
  description?: string;

  /**
   * Body param: The inventory site's email address.
   */
  email?: string;

  /**
   * Body param: Indicates whether this inventory site is active. Inactive objects
   * are typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The parent inventory site one level above this one in the hierarchy.
   */
  parentId?: string;
}

export namespace InventorySiteCreateParams {
  /**
   * The inventory site's address.
   */
  export interface Address {
    /**
     * The city, district, suburb, town, or village name of the site address.
     *
     * Maximum length: 31 characters.
     */
    city?: string;

    /**
     * The country name of the site address.
     */
    country?: string;

    /**
     * The first line of the site address (e.g., street, PO Box, or company name).
     *
     * Maximum length: 41 characters.
     */
    line1?: string;

    /**
     * The second line of the site address, if needed (e.g., apartment, suite, unit, or
     * building).
     *
     * Maximum length: 41 characters.
     */
    line2?: string;

    /**
     * The third line of the site address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line3?: string;

    /**
     * The fourth line of the site address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line4?: string;

    /**
     * The fifth line of the site address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line5?: string;

    /**
     * The postal code or ZIP code of the site address.
     *
     * Maximum length: 13 characters.
     */
    postalCode?: string;

    /**
     * The state, county, province, or region name of the site address.
     *
     * Maximum length: 21 characters.
     */
    state?: string;
  }
}

export interface InventorySiteRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface InventorySiteUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the inventory
   * site object you are updating, which you can get by fetching the object first.
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
   * Body param: The inventory site's address.
   */
  address?: InventorySiteUpdateParams.Address;

  /**
   * Body param: The name of the primary contact person for this inventory site.
   */
  contact?: string;

  /**
   * Body param: A description of this inventory site.
   */
  description?: string;

  /**
   * Body param: The inventory site's email address.
   */
  email?: string;

  /**
   * Body param: The inventory site's fax number.
   */
  fax?: string;

  /**
   * Body param: Indicates whether this inventory site is active. Inactive objects
   * are typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The case-insensitive unique name of this inventory site, unique
   * across all inventory sites.
   *
   * **NOTE**: Inventory sites do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   *
   * Maximum length: 31 characters.
   */
  name?: string;

  /**
   * Body param: The parent inventory site one level above this one in the hierarchy.
   */
  parentId?: string;

  /**
   * Body param: The inventory site's primary telephone number.
   */
  phone?: string;
}

export namespace InventorySiteUpdateParams {
  /**
   * The inventory site's address.
   */
  export interface Address {
    /**
     * The city, district, suburb, town, or village name of the site address.
     *
     * Maximum length: 31 characters.
     */
    city?: string;

    /**
     * The country name of the site address.
     */
    country?: string;

    /**
     * The first line of the site address (e.g., street, PO Box, or company name).
     *
     * Maximum length: 41 characters.
     */
    line1?: string;

    /**
     * The second line of the site address, if needed (e.g., apartment, suite, unit, or
     * building).
     *
     * Maximum length: 41 characters.
     */
    line2?: string;

    /**
     * The third line of the site address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line3?: string;

    /**
     * The fourth line of the site address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line4?: string;

    /**
     * The fifth line of the site address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line5?: string;

    /**
     * The postal code or ZIP code of the site address.
     *
     * Maximum length: 13 characters.
     */
    postalCode?: string;

    /**
     * The state, county, province, or region name of the site address.
     *
     * Maximum length: 21 characters.
     */
    state?: string;
  }
}

export interface InventorySiteListParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for specific inventory sites by their QuickBooks-assigned
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
   * Query param: Filter for inventory sites whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for inventory sites whose `name` ends with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for inventory sites whose `name` is alphabetically greater
   * than or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific inventory sites by their name(s),
   * case-insensitive. Like `id`, `name` is a unique identifier for an inventory
   * site.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for inventory sites whose `name` starts with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for inventory sites whose `name` is alphabetically less than
   * or equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for inventory sites that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for inventory sites updated on or after this date/time.
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
   * Query param: Filter for inventory sites updated on or before this date/time.
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

export declare namespace InventorySites {
  export {
    type InventorySite as InventorySite,
    type InventorySiteListResponse as InventorySiteListResponse,
    type InventorySiteCreateParams as InventorySiteCreateParams,
    type InventorySiteRetrieveParams as InventorySiteRetrieveParams,
    type InventorySiteUpdateParams as InventorySiteUpdateParams,
    type InventorySiteListParams as InventorySiteListParams,
  };
}
