// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class PriceLevels extends APIResource {
  /**
   * Creates a new price level.
   *
   * @example
   * ```ts
   * const priceLevel = await conductor.qbd.priceLevels.create({
   *   name: 'Wholesale 20% Discount',
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  create(params: PriceLevelCreateParams, options?: Core.RequestOptions): Core.APIPromise<PriceLevel> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/price-levels', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves a price level by ID.
   *
   * @example
   * ```ts
   * const priceLevel = await conductor.qbd.priceLevels.retrieve(
   *   '80000001-1234567890',
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * );
   * ```
   */
  retrieve(
    id: string,
    params: PriceLevelRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PriceLevel> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/price-levels/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Updates an existing price level.
   *
   * @example
   * ```ts
   * const priceLevel = await conductor.qbd.priceLevels.update(
   *   '80000001-1234567890',
   *   {
   *     revisionNumber: '1721172183',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   },
   * );
   * ```
   */
  update(
    id: string,
    params: PriceLevelUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PriceLevel> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(`/quickbooks-desktop/price-levels/${id}`, {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of price levels. NOTE: QuickBooks Desktop does not support
   * pagination for price levels; hence, there is no `cursor` parameter. Users
   * typically have few price levels.
   *
   * @example
   * ```ts
   * const priceLevels = await conductor.qbd.priceLevels.list({
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  list(params: PriceLevelListParams, options?: Core.RequestOptions): Core.APIPromise<PriceLevelListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/price-levels', {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export interface PriceLevel {
  /**
   * The unique identifier assigned by QuickBooks to this price level. This ID is
   * unique across all price levels but not across different QuickBooks object types.
   */
  id: string;

  /**
   * The date and time when this price level was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The price level's currency. For built-in currencies, the name and code are
   * standard international values. For user-defined currencies, all values are
   * editable.
   */
  currency: PriceLevel.Currency | null;

  /**
   * The fixed percentage adjustment applied to all items for this price level
   * (instead of a per-item price level). Once you create the price level, you cannot
   * change this.
   *
   * When this price level is applied to a customer, it automatically adjusts the
   * `rate` and `amount` columns for applicable line items in sales orders and
   * invoices for that customer. This value supports both positive and negative
   * values - a value of "20" increases prices by 20%, while "-10" decreases prices
   * by 10%.
   */
  fixedPercentage: string | null;

  /**
   * Indicates whether this price level is active. Inactive objects are typically
   * hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The case-insensitive unique name of this price level, unique across all price
   * levels.
   *
   * **NOTE**: Price levels do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_price_level"`.
   */
  objectType: 'qbd_price_level';

  /**
   * The per-item price level configurations for this price level.
   */
  perItemPriceLevels: Array<PriceLevel.PerItemPriceLevel>;

  /**
   * The price level's type.
   */
  priceLevelType: 'fixed_percentage' | 'per_item';

  /**
   * The current QuickBooks-assigned revision number of this price level object,
   * which changes each time the object is modified. When updating this object, you
   * must provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The date and time when this price level was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace PriceLevel {
  /**
   * The price level's currency. For built-in currencies, the name and code are
   * standard international values. For user-defined currencies, all values are
   * editable.
   */
  export interface Currency {
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

  export interface PerItemPriceLevel {
    /**
     * The fixed amount custom price for this per-item price level that overrides the
     * standard price for the specified item. Used when setting an absolute price value
     * for the item in this price level.
     */
    customPrice: string | null;

    /**
     * The fixed discount percentage for this per-item price level that modifies the
     * specified item's standard price. Used to create a fixed percentage markup or
     * discount specific to this item within this price level.
     */
    customPricePercent: string | null;

    /**
     * The item associated with this per-item price level. This can refer to any good
     * or service that the business buys or sells, including item types such as a
     * service item, inventory item, or special calculation item like a discount item
     * or sales-tax item.
     */
    item: PerItemPriceLevel.Item;
  }

  export namespace PerItemPriceLevel {
    /**
     * The item associated with this per-item price level. This can refer to any good
     * or service that the business buys or sells, including item types such as a
     * service item, inventory item, or special calculation item like a discount item
     * or sales-tax item.
     */
    export interface Item {
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
}

export interface PriceLevelListResponse {
  /**
   * The array of price levels.
   */
  data: Array<PriceLevel>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface PriceLevelCreateParams {
  /**
   * Body param: The case-insensitive unique name of this price level, unique across
   * all price levels.
   *
   * **NOTE**: Price levels do not have a `fullName` field because they are not
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
   * Body param: The price level's currency. For built-in currencies, the name and
   * code are standard international values. For user-defined currencies, all values
   * are editable.
   */
  currencyId?: string;

  /**
   * Body param: The fixed percentage adjustment applied to all items for this price
   * level (instead of a per-item price level). Once you create the price level, you
   * cannot change this.
   *
   * When this price level is applied to a customer, it automatically adjusts the
   * `rate` and `amount` columns for applicable line items in sales orders and
   * invoices for that customer. This value supports both positive and negative
   * values - a value of "20" increases prices by 20%, while "-10" decreases prices
   * by 10%.
   */
  fixedPercentage?: string;

  /**
   * Body param: Indicates whether this price level is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The per-item price level configurations for this price level.
   */
  perItemPriceLevels?: Array<PriceLevelCreateParams.PerItemPriceLevel>;
}

export namespace PriceLevelCreateParams {
  export interface PerItemPriceLevel {
    /**
     * The percentage adjustment for this per-item price level when using relative
     * pricing. Specifies a percentage to modify pricing, using positive values (e.g.,
     * "20") to increase prices by that percentage, or negative values (e.g., "-10") to
     * apply a discount.
     */
    adjustPercentage: string;

    /**
     * The base value reference for this per-item price level's percentage adjustment.
     * Specifies which price to use as the starting point for the adjustment
     * calculation in the price level.
     *
     * **NOTE:** The price level must use either a fixed pricing approach
     * (`customPrice` or `customPricePercent`) or a relative adjustment approach
     * (`adjustPercentage` with `adjustRelativeTo`) when configuring per-item price
     * levels.
     */
    adjustRelativeTo: 'cost' | 'current_custom_price' | 'standard_price';

    /**
     * The item associated with this per-item price level. This can refer to any good
     * or service that the business buys or sells, including item types such as a
     * service item, inventory item, or special calculation item like a discount item
     * or sales-tax item.
     */
    itemId: string;

    /**
     * The fixed amount custom price for this per-item price level that overrides the
     * standard price for the specified item. Used when setting an absolute price value
     * for the item in this price level.
     */
    customPrice?: string;

    /**
     * The fixed discount percentage for this per-item price level that modifies the
     * specified item's standard price. Used to create a fixed percentage markup or
     * discount specific to this item within this price level.
     */
    customPricePercent?: string;
  }
}

export interface PriceLevelRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface PriceLevelUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the price level
   * object you are updating, which you can get by fetching the object first. Provide
   * the most recent `revisionNumber` to ensure you're working with the latest data;
   * otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Body param: The price level's currency. For built-in currencies, the name and
   * code are standard international values. For user-defined currencies, all values
   * are editable.
   */
  currencyId?: string;

  /**
   * Body param: The fixed percentage adjustment applied to all items for this price
   * level (instead of a per-item price level). Once you create the price level, you
   * cannot change this.
   *
   * When this price level is applied to a customer, it automatically adjusts the
   * `rate` and `amount` columns for applicable line items in sales orders and
   * invoices for that customer. This value supports both positive and negative
   * values - a value of "20" increases prices by 20%, while "-10" decreases prices
   * by 10%.
   */
  fixedPercentage?: string;

  /**
   * Body param: Indicates whether this price level is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The case-insensitive unique name of this price level, unique across
   * all price levels.
   *
   * **NOTE**: Price levels do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   *
   * Maximum length: 31 characters.
   */
  name?: string;

  /**
   * Body param: The per-item price level configurations for this price level.
   */
  perItemPriceLevels?: Array<PriceLevelUpdateParams.PerItemPriceLevel>;
}

export namespace PriceLevelUpdateParams {
  export interface PerItemPriceLevel {
    /**
     * The percentage adjustment for this per-item price level when using relative
     * pricing. Specifies a percentage to modify pricing, using positive values (e.g.,
     * "20") to increase prices by that percentage, or negative values (e.g., "-10") to
     * apply a discount.
     */
    adjustPercentage: string;

    /**
     * The base value reference for this per-item price level's percentage adjustment.
     * Specifies which price to use as the starting point for the adjustment
     * calculation in the price level.
     *
     * **NOTE:** The price level must use either a fixed pricing approach
     * (`customPrice` or `customPricePercent`) or a relative adjustment approach
     * (`adjustPercentage` with `adjustRelativeTo`) when configuring per-item price
     * levels.
     */
    adjustRelativeTo: 'cost' | 'current_custom_price' | 'standard_price';

    /**
     * The item associated with this per-item price level. This can refer to any good
     * or service that the business buys or sells, including item types such as a
     * service item, inventory item, or special calculation item like a discount item
     * or sales-tax item.
     */
    itemId: string;

    /**
     * The fixed amount custom price for this per-item price level that overrides the
     * standard price for the specified item. Used when setting an absolute price value
     * for the item in this price level.
     */
    customPrice?: string;

    /**
     * The fixed discount percentage for this per-item price level that modifies the
     * specified item's standard price. Used to create a fixed percentage markup or
     * discount specific to this item within this price level.
     */
    customPricePercent?: string;
  }
}

export interface PriceLevelListParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for price levels in these currencies.
   */
  currencyIds?: Array<string>;

  /**
   * Query param: Filter for specific price levels by their QuickBooks-assigned
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
   * Query param: Filter for price levels containing these items.
   */
  itemIds?: Array<string>;

  /**
   * Query param: The maximum number of objects to return.
   *
   * **IMPORTANT**: QuickBooks Desktop does not support cursor-based pagination for
   * price levels. This parameter will limit the response size, but you cannot fetch
   * subsequent results using a cursor. For pagination, use the name-range parameters
   * instead (e.g., `nameFrom=A&nameTo=B`).
   *
   * When this parameter is omitted, the endpoint returns all price levels without
   * limit, unlike paginated endpoints which default to 150 records. This is
   * acceptable because price levels typically have low record counts.
   */
  limit?: number;

  /**
   * Query param: Filter for price levels whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for price levels whose `name` ends with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for price levels whose `name` is alphabetically greater than
   * or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific price levels by their name(s),
   * case-insensitive. Like `id`, `name` is a unique identifier for a price level.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for price levels whose `name` starts with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for price levels whose `name` is alphabetically less than or
   * equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for price levels that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for price levels updated on or after this date/time. Accepts
   * the following ISO 8601 formats:
   *
   * - **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets this as midnight in
   *   the local timezone of the end-user's computer.
   * - **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop uses
   *   the local timezone of the end-user's computer to interpret the timestamp.
   * - **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop
   *   uses this timezone to interpret the timestamp.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for price levels updated on or before this date/time.
   * Accepts the following ISO 8601 formats:
   *
   * - **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets this as midnight in
   *   the local timezone of the end-user's computer.
   * - **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop uses
   *   the local timezone of the end-user's computer to interpret the timestamp.
   * - **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop
   *   uses this timezone to interpret the timestamp.
   */
  updatedBefore?: string;
}

export declare namespace PriceLevels {
  export {
    type PriceLevel as PriceLevel,
    type PriceLevelListResponse as PriceLevelListResponse,
    type PriceLevelCreateParams as PriceLevelCreateParams,
    type PriceLevelRetrieveParams as PriceLevelRetrieveParams,
    type PriceLevelUpdateParams as PriceLevelUpdateParams,
    type PriceLevelListParams as PriceLevelListParams,
  };
}
