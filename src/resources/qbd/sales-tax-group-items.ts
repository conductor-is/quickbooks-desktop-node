// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class SalesTaxGroupItems extends APIResource {
  /**
   * Creates a new sales-tax group item.
   *
   * @example
   * ```ts
   * const salesTaxGroupItem =
   *   await conductor.qbd.salesTaxGroupItems.create({
   *     name: 'Standard Tax Group',
   *     salesTaxItemIds: ['80000001-1234567890'],
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(params: SalesTaxGroupItemCreateParams, options?: RequestOptions): APIPromise<SalesTaxGroupItem> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/sales-tax-group-items', {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Retrieves a sales-tax group item by ID.
   *
   * **IMPORTANT:** If you need to fetch multiple specific sales-tax group items by
   * ID, use the list endpoint instead with the `ids` parameter. It accepts an array
   * of IDs so you can batch the request into a single call, which is significantly
   * faster.
   *
   * @example
   * ```ts
   * const salesTaxGroupItem =
   *   await conductor.qbd.salesTaxGroupItems.retrieve(
   *     '80000001-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: SalesTaxGroupItemRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<SalesTaxGroupItem> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get(path`/quickbooks-desktop/sales-tax-group-items/${id}`, {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Updates an existing sales-tax group item. To set or clear custom field values,
   * use the set-custom-fields endpoint.
   *
   * @example
   * ```ts
   * const salesTaxGroupItem =
   *   await conductor.qbd.salesTaxGroupItems.update(
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
    params: SalesTaxGroupItemUpdateParams,
    options?: RequestOptions,
  ): APIPromise<SalesTaxGroupItem> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(path`/quickbooks-desktop/sales-tax-group-items/${id}`, {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Returns a list of sales-tax group items. Use the `cursor` parameter to paginate
   * through the results.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const salesTaxGroupItem of conductor.qbd.salesTaxGroupItems.list(
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    params: SalesTaxGroupItemListParams,
    options?: RequestOptions,
  ): PagePromise<SalesTaxGroupItemsCursorPage, SalesTaxGroupItem> {
    const { conductorEndUserId, ...query } = params;
    return this._client.getAPIList(
      '/quickbooks-desktop/sales-tax-group-items',
      CursorPage<SalesTaxGroupItem>,
      {
        query,
        ...options,
        headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
      },
    );
  }

  /**
   * Sets or clears custom field values on a sales-tax group item. A value replaces
   * the custom field's current value if it has one, and an empty string clears it.
   * Custom fields you leave out keep their values, and no `revisionNumber` is
   * needed.
   *
   * If QuickBooks does not save every value, or the sales-tax group item cannot be
   * returned, the request fails with an error that names the custom fields
   * QuickBooks did not save and any whose outcome could not be confirmed. The values
   * QuickBooks did save stay saved. Sending the same request again is safe.
   *
   * **NOTE**: This request changes the sales-tax group item's `revisionNumber`, so
   * use the one in its response for your next update.
   *
   * @example
   * ```ts
   * const salesTaxGroupItem =
   *   await conductor.qbd.salesTaxGroupItems.setCustomFields(
   *     '80000001-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  setCustomFields(
    id: string,
    params: SalesTaxGroupItemSetCustomFieldsParams,
    options?: RequestOptions,
  ): APIPromise<SalesTaxGroupItem> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(path`/quickbooks-desktop/sales-tax-group-items/${id}/set-custom-fields`, {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }
}

export type SalesTaxGroupItemsCursorPage = CursorPage<SalesTaxGroupItem>;

export interface SalesTaxGroupItem {
  /**
   * The unique identifier assigned by QuickBooks to this sales-tax group item. This
   * ID is unique across all sales-tax group items but not across different
   * QuickBooks object types.
   */
  id: string;

  /**
   * The sales-tax group item's barcode.
   */
  barcode: string | null;

  /**
   * The date and time when this sales-tax group item was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The custom fields that have a value on this sales-tax group item, for the owners
   * named in the request's `customFieldOwnerIds` (by default, the public custom
   * fields).
   *
   * **NOTE**: To set or clear custom field values, use the set-custom-fields
   * endpoint. An update cannot change them, and its response returns this as an
   * empty array even when values exist; retrieve the record to see them.
   */
  customFields: Array<SalesTaxGroupItem.CustomField>;

  /**
   * The sales-tax group item's description that will appear on sales forms that
   * include this item.
   */
  description: string | null;

  /**
   * A globally unique identifier (GUID) you, the developer, can provide for tracking
   * this object in your external system. This field is immutable and can only be set
   * during object creation.
   */
  externalId: string | null;

  /**
   * Indicates whether this sales-tax group item is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The case-insensitive unique name of this sales-tax group item, unique across all
   * sales-tax group items.
   *
   * **NOTE**: Sales-tax group items do not have a `fullName` field because they are
   * not hierarchical objects, which is why `name` is unique for them but not for
   * objects that have parents.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_sales_tax_group_item"`.
   */
  objectType: 'qbd_sales_tax_group_item';

  /**
   * The current QuickBooks-assigned revision number of this sales-tax group item
   * object, which changes each time the object is modified. When updating this
   * object, you must provide the most recent `revisionNumber` to ensure you're
   * working with the latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The sales-tax items that make up this sales-tax group item. QuickBooks Desktop
   * applies these sales-tax items together as one tax selection while tracking each
   * sales tax separately.
   */
  salesTaxItems: Array<SalesTaxGroupItem.SalesTaxItem>;

  /**
   * The date and time when this sales-tax group item was last updated, in ISO 8601
   * format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the
   * local timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace SalesTaxGroupItem {
  export interface CustomField {
    /**
     * The name of the custom field, unique for the specified `ownerId`. For public
     * custom fields, this name is visible as a label in the QuickBooks UI.
     */
    name: string;

    /**
     * The owner of this custom field: `"0"` for a public custom field, which
     * QuickBooks users define and see, or an application's GUID in braces for a
     * private custom field, which appears only in requests that name that owner.
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
     * The value of this custom field. QuickBooks keeps at most 30 characters of a
     * public custom field's value: it refuses a longer one on a customer or item, and
     * on a transaction or line it stores only the first 30 without an error. A private
     * custom field's limit depends on its type.
     */
    value: string;
  }

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

export interface SalesTaxGroupItemCreateParams {
  /**
   * Body param: The case-insensitive unique name of this sales-tax group item,
   * unique across all sales-tax group items.
   *
   * **NOTE**: Sales-tax group items do not have a `fullName` field because they are
   * not hierarchical objects, which is why `name` is unique for them but not for
   * objects that have parents.
   *
   * Maximum length: 31 characters.
   */
  name: string;

  /**
   * Body param: The sales-tax items that make up this sales-tax group item.
   * QuickBooks Desktop applies these sales-tax items together as one tax selection
   * while tracking each sales tax separately.
   */
  salesTaxItemIds: Array<string>;

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Body param: The sales-tax group item's barcode.
   */
  barcode?: SalesTaxGroupItemCreateParams.Barcode;

  /**
   * Body param: The sales-tax group item's description that will appear on sales
   * forms that include this item.
   *
   * Maximum length: 4095 characters.
   */
  description?: string;

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
   * Body param: Indicates whether this sales-tax group item is active. Inactive
   * objects are typically hidden from views and reports in QuickBooks. Defaults to
   * `true`.
   */
  isActive?: boolean;
}

export namespace SalesTaxGroupItemCreateParams {
  /**
   * The sales-tax group item's barcode.
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
     *
     * Maximum length: 50 characters.
     */
    value?: string;
  }
}

export interface SalesTaxGroupItemRetrieveParams {
  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: The owners whose custom fields to return on sales-tax group items.
   * Defaults to `["0"]`, the owner of public custom fields, which QuickBooks users
   * define and see. To get an application's private custom fields, add its owner ID,
   * a GUID in braces. Only the owners you list are returned, so keep `"0"` in the
   * list to also get the public ones. QuickBooks refuses the whole request if a
   * private owner you list has no custom field defined for sales-tax group items, so
   * list an owner only for record types that have its custom fields.
   */
  customFieldOwnerIds?: Array<string>;
}

export interface SalesTaxGroupItemUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the sales-tax
   * group item object you are updating, which you can get by fetching the object
   * first. Provide the most recent `revisionNumber` to ensure you're working with
   * the latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Body param: The sales-tax group item's barcode.
   */
  barcode?: SalesTaxGroupItemUpdateParams.Barcode;

  /**
   * Body param: The sales-tax group item's description that will appear on sales
   * forms that include this item.
   *
   * Maximum length: 4095 characters.
   */
  description?: string;

  /**
   * Body param: Indicates whether this sales-tax group item is active. Inactive
   * objects are typically hidden from views and reports in QuickBooks. Defaults to
   * `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The case-insensitive unique name of this sales-tax group item,
   * unique across all sales-tax group items.
   *
   * **NOTE**: Sales-tax group items do not have a `fullName` field because they are
   * not hierarchical objects, which is why `name` is unique for them but not for
   * objects that have parents.
   *
   * Maximum length: 31 characters.
   */
  name?: string;

  /**
   * Body param: The sales-tax items that make up this sales-tax group item.
   * QuickBooks Desktop applies these sales-tax items together as one tax selection
   * while tracking each sales tax separately.
   */
  salesTaxItemIds?: Array<string>;
}

export namespace SalesTaxGroupItemUpdateParams {
  /**
   * The sales-tax group item's barcode.
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
     *
     * Maximum length: 50 characters.
     */
    value?: string;
  }
}

export interface SalesTaxGroupItemListParams extends CursorPageParams {
  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: The owners whose custom fields to return on sales-tax group items.
   * Defaults to `["0"]`, the owner of public custom fields, which QuickBooks users
   * define and see. To get an application's private custom fields, add its owner ID,
   * a GUID in braces. Only the owners you list are returned, so keep `"0"` in the
   * list to also get the public ones. QuickBooks refuses the whole request if a
   * private owner you list has no custom field defined for sales-tax group items, so
   * list an owner only for record types that have its custom fields.
   */
  customFieldOwnerIds?: Array<string>;

  /**
   * Query param: Filter for specific sales-tax group items by their
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
   * Query param: Filter for sales-tax group items whose `name` contains this
   * substring, case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for sales-tax group items whose `name` ends with this
   * substring, case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for sales-tax group items whose `name` sorts at or after
   * this value (inclusive), compared case-insensitively in QuickBooks' sort order:
   * punctuation first, then digits, then letters.
   *
   * When you set `nameFrom` or `nameTo`, QuickBooks returns sales-tax group items
   * sorted by `name` in that order; without either, the order is not guaranteed. To
   * page through sales-tax group items by name, see
   * [Paging by name](https://docs.conductor.is/api-ref/pagination#paging-by-name).
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains`,
   * `nameStartsWith`, or `nameEndsWith`.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific sales-tax group items by their name(s),
   * case-insensitive. Like `id`, `name` is a unique identifier for a sales-tax group
   * item.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for sales-tax group items whose `name` starts with this
   * substring, case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for sales-tax group items whose `name` sorts at or before
   * this value (inclusive), compared case-insensitively in QuickBooks' sort order:
   * punctuation first, then digits, then letters. If you also set `nameFrom`, it
   * must not sort after this value, or QuickBooks returns an error.
   *
   * When you set `nameFrom` or `nameTo`, QuickBooks returns sales-tax group items
   * sorted by `name` in that order; without either, the order is not guaranteed.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains`,
   * `nameStartsWith`, or `nameEndsWith`.
   */
  nameTo?: string;

  /**
   * Query param: Filter for sales-tax group items that are active, inactive, or
   * both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for sales-tax group items updated on or after this
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
   * Query param: Filter for sales-tax group items updated on or before this
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

export interface SalesTaxGroupItemSetCustomFieldsParams {
  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Body param: The custom field values to set or clear on the sales-tax group item.
   * Custom fields you leave out keep their values.
   */
  customFields?: Array<SalesTaxGroupItemSetCustomFieldsParams.CustomField>;
}

export namespace SalesTaxGroupItemSetCustomFieldsParams {
  export interface CustomField {
    /**
     * The name of the custom field, as its definition and a record's `customFields`
     * show it. The custom field must already be defined for this type of record; to
     * list or create definitions, use the custom-field-definitions endpoint.
     * QuickBooks matches the name without regard to letter case.
     */
    name: string;

    /**
     * The value to set, which replaces the custom field's current value if it has one.
     * Send an empty string (`""`) to clear the custom field. A public custom field's
     * value can have at most 30 characters, the most QuickBooks keeps.
     */
    value: string;

    /**
     * The owner of the custom field. Defaults to `"0"`, the owner of public custom
     * fields, which QuickBooks users define and see. Any other owner is an
     * application's GUID in braces, such as
     * `"{6B063959-81B0-4622-85D6-F548C8CCB517}"`, whose private custom fields appear
     * only in requests that name it.
     */
    ownerId?: string;
  }
}

export declare namespace SalesTaxGroupItems {
  export {
    type SalesTaxGroupItem as SalesTaxGroupItem,
    type SalesTaxGroupItemsCursorPage as SalesTaxGroupItemsCursorPage,
    type SalesTaxGroupItemCreateParams as SalesTaxGroupItemCreateParams,
    type SalesTaxGroupItemRetrieveParams as SalesTaxGroupItemRetrieveParams,
    type SalesTaxGroupItemUpdateParams as SalesTaxGroupItemUpdateParams,
    type SalesTaxGroupItemListParams as SalesTaxGroupItemListParams,
    type SalesTaxGroupItemSetCustomFieldsParams as SalesTaxGroupItemSetCustomFieldsParams,
  };
}
