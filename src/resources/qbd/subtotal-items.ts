// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class SubtotalItems extends APIResource {
  /**
   * Creates a new subtotal item.
   *
   * @example
   * ```ts
   * const subtotalItem =
   *   await conductor.qbd.subtotalItems.create({
   *     name: 'Labor subtotal',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(params: SubtotalItemCreateParams, options?: Core.RequestOptions): Core.APIPromise<SubtotalItem> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/subtotal-items', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves a subtotal item by ID.
   *
   * @example
   * ```ts
   * const subtotalItem =
   *   await conductor.qbd.subtotalItems.retrieve(
   *     '80000001-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: SubtotalItemRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubtotalItem> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/subtotal-items/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Updates an existing subtotal item.
   *
   * @example
   * ```ts
   * const subtotalItem =
   *   await conductor.qbd.subtotalItems.update(
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
    params: SubtotalItemUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubtotalItem> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(`/quickbooks-desktop/subtotal-items/${id}`, {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of subtotal items. Use the `cursor` parameter to paginate through
   * the results.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const subtotalItem of conductor.qbd.subtotalItems.list(
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    params: SubtotalItemListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<SubtotalItemsCursorPage, SubtotalItem> {
    const { conductorEndUserId, ...query } = params;
    return this._client.getAPIList('/quickbooks-desktop/subtotal-items', SubtotalItemsCursorPage, {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export class SubtotalItemsCursorPage extends CursorPage<SubtotalItem> {}

export interface SubtotalItem {
  /**
   * The unique identifier assigned by QuickBooks to this subtotal item. This ID is
   * unique across all subtotal items but not across different QuickBooks object
   * types.
   */
  id: string;

  /**
   * The subtotal item's barcode.
   */
  barcode: string | null;

  /**
   * The date and time when this subtotal item was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The custom fields for the subtotal item object, added as user-defined data
   * extensions, not included in the standard QuickBooks object.
   */
  customFields: Array<SubtotalItem.CustomField>;

  /**
   * The subtotal item's description that will appear on sales forms that include
   * this item.
   */
  description: string | null;

  /**
   * A globally unique identifier (GUID) you, the developer, can provide for tracking
   * this object in your external system. This field is immutable and can only be set
   * during object creation.
   */
  externalId: string | null;

  /**
   * Indicates whether this subtotal item is active. Inactive objects are typically
   * hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The case-insensitive unique name of this subtotal item, unique across all
   * subtotal items.
   *
   * **NOTE**: Subtotal items do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_subtotal_item"`.
   */
  objectType: 'qbd_subtotal_item';

  /**
   * The current QuickBooks-assigned revision number of this subtotal item object,
   * which changes each time the object is modified. When updating this object, you
   * must provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The type of special item for this subtotal item.
   */
  specialItemType: 'finance_charge' | 'reimbursable_expense_group' | 'reimbursable_expense_subtotal' | null;

  /**
   * The date and time when this subtotal item was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace SubtotalItem {
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
}

export interface SubtotalItemCreateParams {
  /**
   * Body param: The case-insensitive unique name of this subtotal item, unique
   * across all subtotal items.
   *
   * **NOTE**: Subtotal items do not have a `fullName` field because they are not
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
   * Body param: The subtotal item's barcode.
   */
  barcode?: SubtotalItemCreateParams.Barcode;

  /**
   * Body param: The subtotal item's description that will appear on sales forms that
   * include this item.
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
   * Body param: Indicates whether this subtotal item is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;
}

export namespace SubtotalItemCreateParams {
  /**
   * The subtotal item's barcode.
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

export interface SubtotalItemRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface SubtotalItemUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the subtotal item
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
   * Body param: The subtotal item's barcode.
   */
  barcode?: SubtotalItemUpdateParams.Barcode;

  /**
   * Body param: The subtotal item's description that will appear on sales forms that
   * include this item.
   */
  description?: string;

  /**
   * Body param: Indicates whether this subtotal item is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The case-insensitive unique name of this subtotal item, unique
   * across all subtotal items.
   *
   * **NOTE**: Subtotal items do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   *
   * Maximum length: 31 characters.
   */
  name?: string;
}

export namespace SubtotalItemUpdateParams {
  /**
   * The subtotal item's barcode.
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

export interface SubtotalItemListParams extends CursorPageParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for specific subtotal items by their QuickBooks-assigned
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
   * Query param: Filter for subtotal items whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for subtotal items whose `name` ends with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for subtotal items whose `name` is alphabetically greater
   * than or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific subtotal items by their name(s),
   * case-insensitive. Like `id`, `name` is a unique identifier for a subtotal item.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for subtotal items whose `name` starts with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for subtotal items whose `name` is alphabetically less than
   * or equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for subtotal items that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for subtotal items updated on or after this date/time.
   * Accepts the following ISO 8601 formats:
   *
   * - **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets this date as the
   *   **start of the specified day** in the local timezone of the end-user's
   *   computer (e.g., `2025-01-01` → `2025-01-01T00:00:00`).
   * - **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop uses
   *   the local timezone of the end-user's computer to interpret the timestamp.
   * - **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop
   *   uses the specified timezone to interpret the timestamp.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for subtotal items updated on or before this date/time.
   * Accepts the following ISO 8601 formats:
   *
   * - **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets this date as the
   *   **end of the specified day** in the local timezone of the end-user's computer
   *   (e.g., `2025-01-01` → `2025-01-01T23:59:59`).
   * - **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop uses
   *   the local timezone of the end-user's computer to interpret the timestamp.
   * - **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop
   *   uses the specified timezone to interpret the timestamp.
   */
  updatedBefore?: string;
}

SubtotalItems.SubtotalItemsCursorPage = SubtotalItemsCursorPage;

export declare namespace SubtotalItems {
  export {
    type SubtotalItem as SubtotalItem,
    SubtotalItemsCursorPage as SubtotalItemsCursorPage,
    type SubtotalItemCreateParams as SubtotalItemCreateParams,
    type SubtotalItemRetrieveParams as SubtotalItemRetrieveParams,
    type SubtotalItemUpdateParams as SubtotalItemUpdateParams,
    type SubtotalItemListParams as SubtotalItemListParams,
  };
}
