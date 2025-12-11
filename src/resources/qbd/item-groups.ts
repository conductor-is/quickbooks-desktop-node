// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class ItemGroups extends APIResource {
  /**
   * Creates a new item group.
   *
   * @example
   * ```ts
   * const itemGroup = await conductor.qbd.itemGroups.create({
   *   name: 'Office Supplies Bundle',
   *   shouldPrintItemsInGroup: true,
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  create(params: ItemGroupCreateParams, options?: RequestOptions): APIPromise<ItemGroup> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/item-groups', {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Retrieves an item group by ID.
   *
   * **IMPORTANT:** If you need to fetch multiple specific item groups by ID, use the
   * list endpoint instead with the `ids` parameter. It accepts an array of IDs so
   * you can batch the request into a single call, which is significantly faster.
   *
   * @example
   * ```ts
   * const itemGroup = await conductor.qbd.itemGroups.retrieve(
   *   '80000001-1234567890',
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * );
   * ```
   */
  retrieve(id: string, params: ItemGroupRetrieveParams, options?: RequestOptions): APIPromise<ItemGroup> {
    const { conductorEndUserId } = params;
    return this._client.get(path`/quickbooks-desktop/item-groups/${id}`, {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Updates an existing item group.
   *
   * @example
   * ```ts
   * const itemGroup = await conductor.qbd.itemGroups.update(
   *   '80000001-1234567890',
   *   {
   *     revisionNumber: '1721172183',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   },
   * );
   * ```
   */
  update(id: string, params: ItemGroupUpdateParams, options?: RequestOptions): APIPromise<ItemGroup> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(path`/quickbooks-desktop/item-groups/${id}`, {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Returns a list of item groups. Use the `cursor` parameter to paginate through
   * the results.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const itemGroup of conductor.qbd.itemGroups.list(
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(params: ItemGroupListParams, options?: RequestOptions): PagePromise<ItemGroupsCursorPage, ItemGroup> {
    const { conductorEndUserId, ...query } = params;
    return this._client.getAPIList('/quickbooks-desktop/item-groups', CursorPage<ItemGroup>, {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }
}

export type ItemGroupsCursorPage = CursorPage<ItemGroup>;

export interface ItemGroup {
  /**
   * The unique identifier assigned by QuickBooks to this item group. This ID is
   * unique across all item groups but not across different QuickBooks object types.
   */
  id: string;

  /**
   * The item group's barcode.
   */
  barcode: string | null;

  /**
   * The date and time when this item group was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The custom fields for the item group object, added as user-defined data
   * extensions, not included in the standard QuickBooks object.
   */
  customFields: Array<ItemGroup.CustomField>;

  /**
   * The item group's description that will appear on sales forms that include this
   * item.
   */
  description: string | null;

  /**
   * A globally unique identifier (GUID) you, the developer, can provide for tracking
   * this object in your external system. This field is immutable and can only be set
   * during object creation.
   */
  externalId: string | null;

  /**
   * Indicates whether this item group is active. Inactive objects are typically
   * hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The item lines in this item group.
   */
  lines: Array<ItemGroup.Line>;

  /**
   * The case-insensitive unique name of this item group, unique across all item
   * groups.
   *
   * **NOTE**: Item groups do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_item_group"`.
   */
  objectType: 'qbd_item_group';

  /**
   * The current QuickBooks-assigned revision number of this item group object, which
   * changes each time the object is modified. When updating this object, you must
   * provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * Indicates whether the individual items in this item group and their separate
   * amounts appear on printed forms.
   */
  shouldPrintItemsInGroup: boolean;

  /**
   * The type of special item for this item group.
   */
  specialItemType: 'finance_charge' | 'reimbursable_expense_group' | 'reimbursable_expense_subtotal' | null;

  /**
   * The unit-of-measure set associated with this item group, which consists of a
   * base unit and related units.
   */
  unitOfMeasureSet: ItemGroup.UnitOfMeasureSet | null;

  /**
   * The date and time when this item group was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace ItemGroup {
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

  export interface Line {
    /**
     * The item associated with this item group line. This can refer to any good or
     * service that the business buys or sells, including item types such as a service
     * item, inventory item, or special calculation item like a discount item or
     * sales-tax item.
     */
    item: Line.Item | null;

    /**
     * The quantity of the item group associated with this item group line. This field
     * cannot be cleared.
     *
     * **NOTE**: Do not use this field if the associated item group is a discount item
     * group.
     */
    quantity: number | null;

    /**
     * The unit-of-measure used for the `quantity` in this item group line. Must be a
     * valid unit within the item's available units of measure.
     */
    unitOfMeasure: string | null;
  }

  export namespace Line {
    /**
     * The item associated with this item group line. This can refer to any good or
     * service that the business buys or sells, including item types such as a service
     * item, inventory item, or special calculation item like a discount item or
     * sales-tax item.
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

  /**
   * The unit-of-measure set associated with this item group, which consists of a
   * base unit and related units.
   */
  export interface UnitOfMeasureSet {
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

export interface ItemGroupCreateParams {
  /**
   * Body param: The case-insensitive unique name of this item group, unique across
   * all item groups.
   *
   * **NOTE**: Item groups do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   *
   * Maximum length: 31 characters.
   */
  name: string;

  /**
   * Body param: Indicates whether the individual items in this item group and their
   * separate amounts appear on printed forms.
   */
  shouldPrintItemsInGroup: boolean;

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Body param: The item group's barcode.
   */
  barcode?: ItemGroupCreateParams.Barcode;

  /**
   * Body param: The item group's description that will appear on sales forms that
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
   * Body param: Indicates whether this item group is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The item lines in this item group.
   */
  lines?: Array<ItemGroupCreateParams.Line>;

  /**
   * Body param: The unit-of-measure set associated with this item group, which
   * consists of a base unit and related units.
   */
  unitOfMeasureSetId?: string;
}

export namespace ItemGroupCreateParams {
  /**
   * The item group's barcode.
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

  export interface Line {
    /**
     * The item associated with this item group line. This can refer to any good or
     * service that the business buys or sells, including item types such as a service
     * item, inventory item, or special calculation item like a discount item or
     * sales-tax item.
     */
    itemId?: string;

    /**
     * The quantity of the item group associated with this item group line. This field
     * cannot be cleared.
     *
     * **NOTE**: Do not use this field if the associated item group is a discount item
     * group.
     */
    quantity?: number;

    /**
     * The unit-of-measure used for the `quantity` in this item group line. Must be a
     * valid unit within the item's available units of measure.
     */
    unitOfMeasure?: string;
  }
}

export interface ItemGroupRetrieveParams {
  /**
   * The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;
}

export interface ItemGroupUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the item group
   * object you are updating, which you can get by fetching the object first. Provide
   * the most recent `revisionNumber` to ensure you're working with the latest data;
   * otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Body param: The item group's barcode.
   */
  barcode?: ItemGroupUpdateParams.Barcode;

  /**
   * Body param: When `true`, removes all existing item lines associated with this
   * item group. To modify or add individual item lines, use the field `itemLines`
   * instead.
   */
  clearItemLines?: boolean;

  /**
   * Body param: The item group's description that will appear on sales forms that
   * include this item.
   */
  description?: string;

  /**
   * Body param: Indicates whether to allow changing the item group's unit-of-measure
   * set (using the `unitOfMeasureSetId` field) when the base unit of the new
   * unit-of-measure set does not match that of the currently assigned set. Without
   * setting this field to `true` in this scenario, the request will fail with an
   * error; hence, this field is equivalent to accepting the warning prompt in the
   * QuickBooks UI.
   *
   * NOTE: Changing the base unit requires you to update the item's
   * quantities-on-hand and cost to reflect the new unit; otherwise, these values
   * will be inaccurate. Alternatively, consider creating a new item with the desired
   * unit-of-measure set and deactivating the old item.
   */
  forceUnitOfMeasureChange?: boolean;

  /**
   * Body param: Indicates whether this item group is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The item lines in this item group.
   */
  lines?: Array<ItemGroupUpdateParams.Line>;

  /**
   * Body param: The case-insensitive unique name of this item group, unique across
   * all item groups.
   *
   * **NOTE**: Item groups do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   *
   * Maximum length: 31 characters.
   */
  name?: string;

  /**
   * Body param: Indicates whether the individual items in this item group and their
   * separate amounts appear on printed forms.
   */
  shouldPrintItemsInGroup?: boolean;

  /**
   * Body param: The unit-of-measure set associated with this item group, which
   * consists of a base unit and related units.
   */
  unitOfMeasureSetId?: string;
}

export namespace ItemGroupUpdateParams {
  /**
   * The item group's barcode.
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

  export interface Line {
    /**
     * The item associated with this item group line. This can refer to any good or
     * service that the business buys or sells, including item types such as a service
     * item, inventory item, or special calculation item like a discount item or
     * sales-tax item.
     */
    itemId?: string;

    /**
     * The quantity of the item group associated with this item group line. This field
     * cannot be cleared.
     *
     * **NOTE**: Do not use this field if the associated item group is a discount item
     * group.
     */
    quantity?: number;

    /**
     * The unit-of-measure used for the `quantity` in this item group line. Must be a
     * valid unit within the item's available units of measure.
     */
    unitOfMeasure?: string;
  }
}

export interface ItemGroupListParams extends CursorPageParams {
  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for specific item groups by their QuickBooks-assigned unique
   * identifier(s).
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  ids?: Array<string>;

  /**
   * Query param: Filter for item groups whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for item groups whose `name` ends with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for item groups whose `name` is alphabetically greater than
   * or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific item groups by their name(s), case-insensitive.
   * Like `id`, `name` is a unique identifier for an item group.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for item groups whose `name` starts with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for item groups whose `name` is alphabetically less than or
   * equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for item groups that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for item groups updated on or after this date/time. Accepts
   * the following ISO 8601 formats:
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
   * Query param: Filter for item groups updated on or before this date/time. Accepts
   * the following ISO 8601 formats:
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

export declare namespace ItemGroups {
  export {
    type ItemGroup as ItemGroup,
    type ItemGroupsCursorPage as ItemGroupsCursorPage,
    type ItemGroupCreateParams as ItemGroupCreateParams,
    type ItemGroupRetrieveParams as ItemGroupRetrieveParams,
    type ItemGroupUpdateParams as ItemGroupUpdateParams,
    type ItemGroupListParams as ItemGroupListParams,
  };
}
