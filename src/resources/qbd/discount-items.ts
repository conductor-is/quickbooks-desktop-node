// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class DiscountItems extends APIResource {
  /**
   * Creates a discount item that subtracts either a percentage or fixed amount from
   * transaction totals. Percentage discounts only affect the preceding line, while
   * fixed-amount discounts reduce the accumulated amount above them unless you bound
   * the target lines with a subtotal item.
   *
   * @example
   * ```ts
   * const discountItem =
   *   await conductor.qbd.discountItems.create({
   *     accountId: '80000001-1234567890',
   *     name: '10% labor discount',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(params: DiscountItemCreateParams, options?: Core.RequestOptions): Core.APIPromise<DiscountItem> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/discount-items', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves a discount item by ID.
   *
   * @example
   * ```ts
   * const discountItem =
   *   await conductor.qbd.discountItems.retrieve(
   *     '80000001-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: DiscountItemRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DiscountItem> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/discount-items/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Updates a discount item, including its linked account or discount rate. When
   * changing the account, use `updateExistingTransactionsAccount` to control whether
   * existing transactions that reference the item should also be updated.
   *
   * @example
   * ```ts
   * const discountItem =
   *   await conductor.qbd.discountItems.update(
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
    params: DiscountItemUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DiscountItem> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(`/quickbooks-desktop/discount-items/${id}`, {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of discount items. Use the `cursor` parameter to paginate through
   * the results.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const discountItem of conductor.qbd.discountItems.list(
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    params: DiscountItemListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<DiscountItemsCursorPage, DiscountItem> {
    const { conductorEndUserId, ...query } = params;
    return this._client.getAPIList('/quickbooks-desktop/discount-items', DiscountItemsCursorPage, {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export class DiscountItemsCursorPage extends CursorPage<DiscountItem> {}

export interface DiscountItem {
  /**
   * The unique identifier assigned by QuickBooks to this discount item. This ID is
   * unique across all discount items but not across different QuickBooks object
   * types.
   */
  id: string;

  /**
   * The posting account to which transactions involving this discount item are
   * posted for tracking discounts.
   */
  account: DiscountItem.Account;

  /**
   * The discount item's barcode.
   */
  barcode: string | null;

  /**
   * The discount item's class. Classes can be used to categorize objects into
   * meaningful segments, such as department, location, or type of work. In
   * QuickBooks, class tracking is off by default.
   */
  class: DiscountItem.Class | null;

  /**
   * The date and time when this discount item was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The custom fields for the discount item object, added as user-defined data
   * extensions, not included in the standard QuickBooks object.
   */
  customFields: Array<DiscountItem.CustomField>;

  /**
   * The discount item's description that will appear on sales forms that include
   * this item.
   */
  description: string | null;

  /**
   * The monetary amount to subtract from the total or subtotal when applying this
   * discount item to a transaction.
   *
   * **NOTE**: A flat rate discount applies to ALL lines recorded above it and
   * distributes the discount amount equally across those lines, which affects tax
   * calculations. For example, a $10 discount applied to a $100 taxable item and
   * $100 non-taxable item would result in a $5 taxable discount and $5 non-taxable
   * discount.
   */
  discountRate: string | null;

  /**
   * The percentage amount to subtract from the total or subtotal when applying this
   * discount item to a transaction.
   *
   * **NOTE**: A percentage discount only applies to the line immediately above it,
   * so tax implications only affect that specific line.
   */
  discountRatePercent: string | null;

  /**
   * A globally unique identifier (GUID) you, the developer, can provide for tracking
   * this object in your external system. This field is immutable and can only be set
   * during object creation.
   */
  externalId: string | null;

  /**
   * The case-insensitive fully-qualified unique name of this discount item, formed
   * by combining the names of its hierarchical parent objects with its own `name`,
   * separated by colons. For example, if a discount item is under "Discounts" and
   * has the `name` "10% labor discount", its `fullName` would be "Discounts:10%
   * labor discount".
   *
   * **NOTE**: Unlike `name`, `fullName` is guaranteed to be unique across all
   * discount item objects. However, `fullName` can still be arbitrarily changed by
   * the QuickBooks user when they modify the underlying `name` field.
   */
  fullName: string;

  /**
   * Indicates whether this discount item is active. Inactive objects are typically
   * hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The case-insensitive name of this discount item. Not guaranteed to be unique
   * because it does not include the names of its hierarchical parent objects like
   * `fullName` does. For example, two discount items could both have the `name` "10%
   * labor discount", but they could have unique `fullName` values, such as
   * "Discounts:10% labor discount" and "Promotions:10% labor discount".
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_discount_item"`.
   */
  objectType: 'qbd_discount_item';

  /**
   * The parent discount item one level above this one in the hierarchy. For example,
   * if this discount item has a `fullName` of "Discounts:10% labor discount", its
   * parent has a `fullName` of "Discounts". If this discount item is at the top
   * level, this field will be `null`.
   */
  parent: DiscountItem.Parent | null;

  /**
   * The current QuickBooks-assigned revision number of this discount item object,
   * which changes each time the object is modified. When updating this object, you
   * must provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The default sales-tax code for this discount item, determining whether it is
   * taxable or non-taxable. This can be overridden at the transaction-line level.
   *
   * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
   * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
   * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
   * non-taxable code to all sales.
   */
  salesTaxCode: DiscountItem.SalesTaxCode | null;

  /**
   * The depth level of this discount item in the hierarchy. A top-level discount
   * item has a `sublevel` of 0; each subsequent sublevel increases this number by 1.
   * For example, a discount item with a `fullName` of "Discounts:10% labor discount"
   * would have a `sublevel` of 1.
   */
  sublevel: number;

  /**
   * The date and time when this discount item was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace DiscountItem {
  /**
   * The posting account to which transactions involving this discount item are
   * posted for tracking discounts.
   */
  export interface Account {
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

  /**
   * The discount item's class. Classes can be used to categorize objects into
   * meaningful segments, such as department, location, or type of work. In
   * QuickBooks, class tracking is off by default.
   */
  export interface Class {
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

  export interface CustomField {
    /**
     * The name of the custom field, unique for the specified `ownerId`. For public
     * custom fields, this name is visible as a label in the QuickBooks UI.
     */
    name: string;

    /**
     * The identifier of the owner of the custom field, which QuickBooks internally
     * calls a "data extension". For public custom fields visible in the UI, such as
     * those added by the QuickBooks user, this is always "0". For private custom
     * fields that are only visible to the application that created them, this is a
     * valid GUID identifying the owning application. Internally, Conductor always
     * fetches all public custom fields (those with an `ownerId` of "0") for all
     * objects.
     */
    ownerId: string;

    /**
     * The data type of this custom field.
     */
    type:
      | 'amount_type'
      | 'date_time_type'
      | 'integer_type'
      | 'percent_type'
      | 'price_type'
      | 'quantity_type'
      | 'string_1024_type'
      | 'string_255_type';

    /**
     * The value of this custom field. The maximum length depends on the field's data
     * type.
     */
    value: string;
  }

  /**
   * The parent discount item one level above this one in the hierarchy. For example,
   * if this discount item has a `fullName` of "Discounts:10% labor discount", its
   * parent has a `fullName` of "Discounts". If this discount item is at the top
   * level, this field will be `null`.
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

  /**
   * The default sales-tax code for this discount item, determining whether it is
   * taxable or non-taxable. This can be overridden at the transaction-line level.
   *
   * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
   * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
   * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
   * non-taxable code to all sales.
   */
  export interface SalesTaxCode {
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

export interface DiscountItemCreateParams {
  /**
   * Body param: The posting account to which transactions involving this discount
   * item are posted for tracking discounts.
   */
  accountId: string;

  /**
   * Body param: The case-insensitive name of this discount item. Not guaranteed to
   * be unique because it does not include the names of its hierarchical parent
   * objects like `fullName` does. For example, two discount items could both have
   * the `name` "10% labor discount", but they could have unique `fullName` values,
   * such as "Discounts:10% labor discount" and "Promotions:10% labor discount".
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
   * Body param: The discount item's barcode.
   */
  barcode?: DiscountItemCreateParams.Barcode;

  /**
   * Body param: The discount item's class. Classes can be used to categorize objects
   * into meaningful segments, such as department, location, or type of work. In
   * QuickBooks, class tracking is off by default.
   */
  classId?: string;

  /**
   * Body param: The discount item's description that will appear on sales forms that
   * include this item.
   */
  description?: string;

  /**
   * Body param: The monetary amount to subtract from the total or subtotal when
   * applying this discount item to a transaction.
   *
   * **NOTE**: A flat rate discount applies to ALL lines recorded above it and
   * distributes the discount amount equally across those lines, which affects tax
   * calculations. For example, a $10 discount applied to a $100 taxable item and
   * $100 non-taxable item would result in a $5 taxable discount and $5 non-taxable
   * discount.
   */
  discountRate?: string;

  /**
   * Body param: The percentage amount to subtract from the total or subtotal when
   * applying this discount item to a transaction.
   *
   * **NOTE**: A percentage discount only applies to the line immediately above it,
   * so tax implications only affect that specific line.
   */
  discountRatePercent?: string;

  /**
   * Body param: A globally unique identifier (GUID) you, the developer, can provide
   * for tracking this object in your external system. This field is immutable and
   * can only be set during object creation.
   *
   * **IMPORTANT**: This field must be formatted as a valid GUID; otherwise,
   * QuickBooks will return an error.
   */
  externalId?: string;

  /**
   * Body param: Indicates whether this discount item is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The parent discount item one level above this one in the hierarchy.
   * For example, if this discount item has a `fullName` of "Discounts:10% labor
   * discount", its parent has a `fullName` of "Discounts". If this discount item is
   * at the top level, this field will be `null`.
   */
  parentId?: string;

  /**
   * Body param: The default sales-tax code for this discount item, determining
   * whether it is taxable or non-taxable. This can be overridden at the
   * transaction-line level.
   *
   * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
   * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
   * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
   * non-taxable code to all sales.
   */
  salesTaxCodeId?: string;
}

export namespace DiscountItemCreateParams {
  /**
   * The discount item's barcode.
   */
  export interface Barcode {
    /**
     * Indicates whether to allow the barcode to be overridden.
     */
    allowOverride?: boolean;

    /**
     * Indicates whether to assign the barcode even if it is already used.
     */
    assignEvenIfUsed?: boolean;

    /**
     * The item's barcode value.
     */
    value?: string;
  }
}

export interface DiscountItemRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface DiscountItemUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the discount item
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
   * Body param: The posting account to which transactions involving this discount
   * item are posted for tracking discounts.
   */
  accountId?: string;

  /**
   * Body param: The discount item's barcode.
   */
  barcode?: DiscountItemUpdateParams.Barcode;

  /**
   * Body param: The discount item's class. Classes can be used to categorize objects
   * into meaningful segments, such as department, location, or type of work. In
   * QuickBooks, class tracking is off by default.
   */
  classId?: string;

  /**
   * Body param: The discount item's description that will appear on sales forms that
   * include this item.
   */
  description?: string;

  /**
   * Body param: The monetary amount to subtract from the total or subtotal when
   * applying this discount item to a transaction.
   *
   * **NOTE**: A flat rate discount applies to ALL lines recorded above it and
   * distributes the discount amount equally across those lines, which affects tax
   * calculations. For example, a $10 discount applied to a $100 taxable item and
   * $100 non-taxable item would result in a $5 taxable discount and $5 non-taxable
   * discount.
   */
  discountRate?: string;

  /**
   * Body param: The percentage amount to subtract from the total or subtotal when
   * applying this discount item to a transaction.
   *
   * **NOTE**: A percentage discount only applies to the line immediately above it,
   * so tax implications only affect that specific line.
   */
  discountRatePercent?: string;

  /**
   * Body param: Indicates whether this discount item is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The case-insensitive name of this discount item. Not guaranteed to
   * be unique because it does not include the names of its hierarchical parent
   * objects like `fullName` does. For example, two discount items could both have
   * the `name` "10% labor discount", but they could have unique `fullName` values,
   * such as "Discounts:10% labor discount" and "Promotions:10% labor discount".
   *
   * Maximum length: 31 characters.
   */
  name?: string;

  /**
   * Body param: The parent discount item one level above this one in the hierarchy.
   * For example, if this discount item has a `fullName` of "Discounts:10% labor
   * discount", its parent has a `fullName` of "Discounts". If this discount item is
   * at the top level, this field will be `null`.
   */
  parentId?: string;

  /**
   * Body param: The default sales-tax code for this discount item, determining
   * whether it is taxable or non-taxable. This can be overridden at the
   * transaction-line level.
   *
   * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
   * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
   * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
   * non-taxable code to all sales.
   */
  salesTaxCodeId?: string;

  /**
   * Body param: When `true`, applies the new account (specified by the `accountId`
   * field) to all existing transactions associated with this discount item. This
   * updates historical data and should be used with caution. The update will fail if
   * any affected transaction falls within a closed accounting period. If this
   * parameter is not specified, QuickBooks will prompt the user before making any
   * changes.
   */
  updateExistingTransactionsAccount?: boolean;
}

export namespace DiscountItemUpdateParams {
  /**
   * The discount item's barcode.
   */
  export interface Barcode {
    /**
     * Indicates whether to allow the barcode to be overridden.
     */
    allowOverride?: boolean;

    /**
     * Indicates whether to assign the barcode even if it is already used.
     */
    assignEvenIfUsed?: boolean;

    /**
     * The item's barcode value.
     */
    value?: string;
  }
}

export interface DiscountItemListParams extends CursorPageParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for discount items of these classes. A class is a way
   * end-users can categorize discount items in QuickBooks.
   */
  classIds?: Array<string>;

  /**
   * Query param: Filter for specific discount items by their full-name(s),
   * case-insensitive. Like `id`, `fullName` is a unique identifier for a discount
   * item, formed by by combining the names of its parent objects with its own
   * `name`, separated by colons. For example, if a discount item is under
   * "Discounts" and has the `name` "10% labor discount", its `fullName` would be
   * "Discounts:10% labor discount".
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  fullNames?: Array<string>;

  /**
   * Query param: Filter for specific discount items by their QuickBooks-assigned
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
   * Query param: Filter for discount items whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for discount items whose `name` ends with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for discount items whose `name` is alphabetically greater
   * than or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for discount items whose `name` starts with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for discount items whose `name` is alphabetically less than
   * or equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for discount items that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for discount items updated on or after this date/time.
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
   * Query param: Filter for discount items updated on or before this date/time.
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

DiscountItems.DiscountItemsCursorPage = DiscountItemsCursorPage;

export declare namespace DiscountItems {
  export {
    type DiscountItem as DiscountItem,
    DiscountItemsCursorPage as DiscountItemsCursorPage,
    type DiscountItemCreateParams as DiscountItemCreateParams,
    type DiscountItemRetrieveParams as DiscountItemRetrieveParams,
    type DiscountItemUpdateParams as DiscountItemUpdateParams,
    type DiscountItemListParams as DiscountItemListParams,
  };
}
