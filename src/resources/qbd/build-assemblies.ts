// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class BuildAssemblies extends APIResource {
  /**
   * Creates a build assembly transaction that consumes component quantities and
   * increases the finished assembly on hand. If components are short you can mark
   * the build as pending instead of failing.
   *
   * @example
   * ```ts
   * const buildAssembly =
   *   await conductor.qbd.buildAssemblies.create({
   *     inventoryAssemblyItemId: '80000001-1234567890',
   *     quantityToBuild: 7,
   *     transactionDate: '2024-10-01',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(params: BuildAssemblyCreateParams, options?: Core.RequestOptions): Core.APIPromise<BuildAssembly> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/build-assemblies', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves a build assembly by ID.
   *
   * @example
   * ```ts
   * const buildAssembly =
   *   await conductor.qbd.buildAssemblies.retrieve(
   *     '123ABC-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: BuildAssemblyRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<BuildAssembly> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/build-assemblies/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Updates an existing build assembly.
   *
   * @example
   * ```ts
   * const buildAssembly =
   *   await conductor.qbd.buildAssemblies.update(
   *     '123ABC-1234567890',
   *     {
   *       revisionNumber: '1721172183',
   *       conductorEndUserId: 'end_usr_1234567abcdefg',
   *     },
   *   );
   * ```
   */
  update(
    id: string,
    params: BuildAssemblyUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<BuildAssembly> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(`/quickbooks-desktop/build-assemblies/${id}`, {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of build assemblies. Use the `cursor` parameter to paginate
   * through the results.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const buildAssembly of conductor.qbd.buildAssemblies.list(
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    params: BuildAssemblyListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<BuildAssembliesCursorPage, BuildAssembly> {
    const { conductorEndUserId, ...query } = params;
    return this._client.getAPIList('/quickbooks-desktop/build-assemblies', BuildAssembliesCursorPage, {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Permanently deletes a a build assembly. The deletion will fail if the build
   * assembly is currently in use or has any linked transactions that are in use.
   *
   * @example
   * ```ts
   * const buildAssembly =
   *   await conductor.qbd.buildAssemblies.delete(
   *     '123ABC-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  delete(
    id: string,
    params: BuildAssemblyDeleteParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<BuildAssemblyDeleteResponse> {
    const { conductorEndUserId } = params;
    return this._client.delete(`/quickbooks-desktop/build-assemblies/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export class BuildAssembliesCursorPage extends CursorPage<BuildAssembly> {}

export interface BuildAssembly {
  /**
   * The unique identifier assigned by QuickBooks to this build assembly. This ID is
   * unique across all transaction types.
   */
  id: string;

  /**
   * The date and time when this build assembly was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The custom fields for the build assembly object, added as user-defined data
   * extensions, not included in the standard QuickBooks object.
   */
  customFields: Array<BuildAssembly.CustomField>;

  /**
   * The expiration date for the serial number or lot number of the item associated
   * with this build assembly, in ISO 8601 format (YYYY-MM-DD). This is particularly
   * relevant for perishable or time-sensitive inventory items. Note that this field
   * is only supported on QuickBooks Desktop 2023 or later.
   */
  expirationDate: string | null;

  /**
   * A globally unique identifier (GUID) you, the developer, can provide for tracking
   * this object in your external system. This field is immutable and can only be set
   * during object creation.
   */
  externalId: string | null;

  /**
   * The inventory assembly item associated with this build assembly. An inventory
   * assembly item is assembled or manufactured from other inventory items, and the
   * items and/or assemblies that make up the assembly are called components.
   */
  inventoryAssemblyItem: BuildAssembly.InventoryAssemblyItem;

  /**
   * The site location where inventory for the item associated with this build
   * assembly is stored.
   */
  inventorySite: BuildAssembly.InventorySite | null;

  /**
   * The specific location (e.g., bin or shelf) within the inventory site where the
   * item associated with this build assembly is stored.
   */
  inventorySiteLocation: BuildAssembly.InventorySiteLocation | null;

  /**
   * Indicates whether this build assembly has not been completed.
   */
  isPending: boolean | null;

  /**
   * The component item lines in this build assembly.
   */
  lines: Array<BuildAssembly.Line>;

  /**
   * The lot number of the item associated with this build assembly. Used for
   * tracking groups of inventory items that are purchased or manufactured together.
   */
  lotNumber: string | null;

  /**
   * A memo or note for this build assembly.
   */
  memo: string | null;

  /**
   * The type of object. This value is always `"qbd_build_assembly"`.
   */
  objectType: 'qbd_build_assembly';

  /**
   * The number of this build assembly that can be built from the parts on hand.
   */
  quantityCanBuild: number;

  /**
   * The number of units of this build assembly currently in inventory.
   */
  quantityOnHand: number;

  /**
   * The number of units of this build assembly that have been sold (as recorded in
   * sales orders) but not yet fulfilled or delivered to customers.
   */
  quantityOnSalesOrder: number;

  /**
   * The number of build assembly to be built. The transaction will fail if the
   * number specified here exceeds the number of on-hand components.
   */
  quantityToBuild: number;

  /**
   * The case-sensitive user-defined reference number for this build assembly, which
   * can be used to identify the transaction in QuickBooks. This value is not
   * required to be unique and can be arbitrarily changed by the QuickBooks user.
   */
  refNumber: string | null;

  /**
   * The current QuickBooks-assigned revision number of this build assembly object,
   * which changes each time the object is modified. When updating this object, you
   * must provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The serial number of the item associated with this build assembly. This is used
   * for tracking individual units of serialized inventory items.
   */
  serialNumber: string | null;

  /**
   * The date of this build assembly, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * The date and time when this build assembly was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace BuildAssembly {
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
   * The inventory assembly item associated with this build assembly. An inventory
   * assembly item is assembled or manufactured from other inventory items, and the
   * items and/or assemblies that make up the assembly are called components.
   */
  export interface InventoryAssemblyItem {
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
   * The site location where inventory for the item associated with this build
   * assembly is stored.
   */
  export interface InventorySite {
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
   * The specific location (e.g., bin or shelf) within the inventory site where the
   * item associated with this build assembly is stored.
   */
  export interface InventorySiteLocation {
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

  export interface Line {
    /**
     * A description of this component item line.
     */
    description: string | null;

    /**
     * The expiration date for the serial number or lot number of the item associated
     * with this component item line, in ISO 8601 format (YYYY-MM-DD). This is
     * particularly relevant for perishable or time-sensitive inventory items. Note
     * that this field is only supported on QuickBooks Desktop 2023 or later.
     */
    expirationDate: string | null;

    /**
     * The site location where inventory for the item associated with this component
     * item line is stored.
     */
    inventorySite: Line.InventorySite | null;

    /**
     * The specific location (e.g., bin or shelf) within the inventory site where the
     * item associated with this component item line is stored.
     */
    inventorySiteLocation: Line.InventorySiteLocation | null;

    /**
     * The item associated with this component item line. This can refer to any good or
     * service that the business buys or sells, including item types such as a service
     * item, inventory item, or special calculation item like a discount item or
     * sales-tax item.
     */
    item: Line.Item;

    /**
     * The lot number of the item associated with this component item line. Used for
     * tracking groups of inventory items that are purchased or manufactured together.
     */
    lotNumber: string | null;

    /**
     * The quantity of this component item line that is needed to build the assembly.
     * For example, if the `itemId` references a bolt, the `quantityNeeded` field
     * indicates how many of these bolts are used in the assembly.
     */
    quantityNeeded: number | null;

    /**
     * The number of units of this component item line currently in inventory.
     */
    quantityOnHand: number | null;

    /**
     * The serial number of the item associated with this component item line. This is
     * used for tracking individual units of serialized inventory items.
     */
    serialNumber: string | null;
  }

  export namespace Line {
    /**
     * The site location where inventory for the item associated with this component
     * item line is stored.
     */
    export interface InventorySite {
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
     * The specific location (e.g., bin or shelf) within the inventory site where the
     * item associated with this component item line is stored.
     */
    export interface InventorySiteLocation {
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
     * The item associated with this component item line. This can refer to any good or
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
}

export interface BuildAssemblyDeleteResponse {
  /**
   * The QuickBooks-assigned unique identifier of the deleted build assembly.
   */
  id: string;

  /**
   * Indicates whether the build assembly was deleted.
   */
  deleted: boolean;

  /**
   * The type of object. This value is always `"qbd_build_assembly"`.
   */
  objectType: 'qbd_build_assembly';

  /**
   * The case-sensitive user-defined reference number of the deleted build assembly.
   */
  refNumber: string | null;
}

export interface BuildAssemblyCreateParams {
  /**
   * Body param: The inventory assembly item associated with this build assembly. An
   * inventory assembly item is assembled or manufactured from other inventory items,
   * and the items and/or assemblies that make up the assembly are called components.
   */
  inventoryAssemblyItemId: string;

  /**
   * Body param: The number of build assembly to be built. The transaction will fail
   * if the number specified here exceeds the number of on-hand components.
   */
  quantityToBuild: number;

  /**
   * Body param: The date of this build assembly, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Body param: The expiration date for the serial number or lot number of the item
   * associated with this build assembly, in ISO 8601 format (YYYY-MM-DD). This is
   * particularly relevant for perishable or time-sensitive inventory items. Note
   * that this field is only supported on QuickBooks Desktop 2023 or later.
   */
  expirationDate?: string;

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
   * Body param: The site location where inventory for the item associated with this
   * build assembly is stored.
   */
  inventorySiteId?: string;

  /**
   * Body param: The specific location (e.g., bin or shelf) within the inventory site
   * where the item associated with this build assembly is stored.
   */
  inventorySiteLocationId?: string;

  /**
   * Body param: The lot number of the item associated with this build assembly. Used
   * for tracking groups of inventory items that are purchased or manufactured
   * together.
   */
  lotNumber?: string;

  /**
   * Body param: When `true`, the build assembly will be marked pending if there are
   * insufficient quantities to complete the build assembly.
   */
  markPendingIfRequired?: boolean;

  /**
   * Body param: A memo or note for this build assembly.
   */
  memo?: string;

  /**
   * Body param: The case-sensitive user-defined reference number for this build
   * assembly, which can be used to identify the transaction in QuickBooks. This
   * value is not required to be unique and can be arbitrarily changed by the
   * QuickBooks user. When left blank in this create request, this field will be left
   * blank in QuickBooks (i.e., it does _not_ auto-increment).
   */
  refNumber?: string;

  /**
   * Body param: The serial number of the item associated with this build assembly.
   * This is used for tracking individual units of serialized inventory items.
   */
  serialNumber?: string;
}

export interface BuildAssemblyRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface BuildAssemblyUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the build
   * assembly object you are updating, which you can get by fetching the object
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
   * Body param: The expiration date for the serial number or lot number of the item
   * associated with this build assembly, in ISO 8601 format (YYYY-MM-DD). This is
   * particularly relevant for perishable or time-sensitive inventory items. Note
   * that this field is only supported on QuickBooks Desktop 2023 or later.
   */
  expirationDate?: string;

  /**
   * Body param: The site location where inventory for the item associated with this
   * build assembly is stored.
   */
  inventorySiteId?: string;

  /**
   * Body param: The specific location (e.g., bin or shelf) within the inventory site
   * where the item associated with this build assembly is stored.
   */
  inventorySiteLocationId?: string;

  /**
   * Body param: The lot number of the item associated with this build assembly. Used
   * for tracking groups of inventory items that are purchased or manufactured
   * together.
   */
  lotNumber?: string;

  /**
   * Body param: When `true`, the build assembly will be marked pending if there are
   * insufficient quantities to complete the build assembly.
   */
  markPendingIfRequired?: boolean;

  /**
   * Body param: A memo or note for this build assembly.
   */
  memo?: string;

  /**
   * Body param: The number of build assembly to be built. The transaction will fail
   * if the number specified here exceeds the number of on-hand components.
   */
  quantityToBuild?: number;

  /**
   * Body param: The case-sensitive user-defined reference number for this build
   * assembly, which can be used to identify the transaction in QuickBooks. This
   * value is not required to be unique and can be arbitrarily changed by the
   * QuickBooks user.
   */
  refNumber?: string;

  /**
   * Body param: When `true`, changes this build assembly's status from pending to
   * non-pending, which effectively performs the build transaction. The operation
   * will fail if there are insufficient component quantities on hand to complete the
   * build.
   */
  removePending?: boolean;

  /**
   * Body param: The serial number of the item associated with this build assembly.
   * This is used for tracking individual units of serialized inventory items.
   */
  serialNumber?: string;

  /**
   * Body param: The date of this build assembly, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate?: string;
}

export interface BuildAssemblyListParams extends CursorPageParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for specific build assemblies by their QuickBooks-assigned
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
   * Query param: Whether to include component line items in the response. Defaults
   * to `true`.
   */
  includeComponentLineItems?: boolean;

  /**
   * Query param: Filter for build assemblies containing these items.
   */
  itemIds?: Array<string>;

  /**
   * Query param: Filter for build assemblies that are pending, not pending, or both.
   */
  pendingStatus?: 'all' | 'not_pending' | 'pending';

  /**
   * Query param: Filter for build assemblies whose `refNumber` contains this
   * substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberStartsWith`
   * or `refNumberEndsWith`.
   */
  refNumberContains?: string;

  /**
   * Query param: Filter for build assemblies whose `refNumber` ends with this
   * substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberContains` or
   * `refNumberStartsWith`.
   */
  refNumberEndsWith?: string;

  /**
   * Query param: Filter for build assemblies whose `refNumber` is greater than or
   * equal to this value. If omitted, the range will begin with the first number of
   * the list. Uses a numerical comparison for values that contain only digits;
   * otherwise, uses a lexicographical comparison.
   */
  refNumberFrom?: string;

  /**
   * Query param: Filter for specific build assemblies by their ref-number(s),
   * case-sensitive. In QuickBooks, ref-numbers are not required to be unique and can
   * be arbitrarily changed by the QuickBooks user.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  refNumbers?: Array<string>;

  /**
   * Query param: Filter for build assemblies whose `refNumber` starts with this
   * substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberContains` or
   * `refNumberEndsWith`.
   */
  refNumberStartsWith?: string;

  /**
   * Query param: Filter for build assemblies whose `refNumber` is less than or equal
   * to this value. If omitted, the range will end with the last number of the list.
   * Uses a numerical comparison for values that contain only digits; otherwise, uses
   * a lexicographical comparison.
   */
  refNumberTo?: string;

  /**
   * Query param: Filter for build assemblies whose `date` field is on or after this
   * date, in ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **start of the
   * specified day** in the local timezone of the end-user's computer (e.g.,
   * `2025-01-01` → `2025-01-01T00:00:00`).
   */
  transactionDateFrom?: string;

  /**
   * Query param: Filter for build assemblies whose `date` field is on or before this
   * date, in ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **end of the specified
   * day** in the local timezone of the end-user's computer (e.g., `2025-01-01` →
   * `2025-01-01T23:59:59`).
   */
  transactionDateTo?: string;

  /**
   * Query param: Filter for build assemblies updated on or after this date/time.
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
   * Query param: Filter for build assemblies updated on or before this date/time.
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

export interface BuildAssemblyDeleteParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

BuildAssemblies.BuildAssembliesCursorPage = BuildAssembliesCursorPage;

export declare namespace BuildAssemblies {
  export {
    type BuildAssembly as BuildAssembly,
    type BuildAssemblyDeleteResponse as BuildAssemblyDeleteResponse,
    BuildAssembliesCursorPage as BuildAssembliesCursorPage,
    type BuildAssemblyCreateParams as BuildAssemblyCreateParams,
    type BuildAssemblyRetrieveParams as BuildAssemblyRetrieveParams,
    type BuildAssemblyUpdateParams as BuildAssemblyUpdateParams,
    type BuildAssemblyListParams as BuildAssemblyListParams,
    type BuildAssemblyDeleteParams as BuildAssemblyDeleteParams,
  };
}
