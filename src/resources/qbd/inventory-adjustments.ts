// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class InventoryAdjustments extends APIResource {
  /**
   * Creates an inventory adjustment to correct on-hand quantities or values.
   * QuickBooks requires single-user mode unless you're on Enterprise with Advanced
   * Inventory enabled.
   *
   * @example
   * ```ts
   * const inventoryAdjustment =
   *   await conductor.qbd.inventoryAdjustments.create({
   *     accountId: '80000001-1234567890',
   *     transactionDate: '2024-10-01',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(
    params: InventoryAdjustmentCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InventoryAdjustment> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/inventory-adjustments', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves an inventory adjustment by ID.
   *
   * @example
   * ```ts
   * const inventoryAdjustment =
   *   await conductor.qbd.inventoryAdjustments.retrieve(
   *     '123ABC-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: InventoryAdjustmentRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InventoryAdjustment> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/inventory-adjustments/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Updates an existing inventory adjustment.
   *
   * @example
   * ```ts
   * const inventoryAdjustment =
   *   await conductor.qbd.inventoryAdjustments.update(
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
    params: InventoryAdjustmentUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InventoryAdjustment> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(`/quickbooks-desktop/inventory-adjustments/${id}`, {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of inventory adjustments. NOTE: QuickBooks Desktop does not
   * support pagination for inventory adjustments; hence, there is no `cursor`
   * parameter. Users typically have few inventory adjustments.
   *
   * @example
   * ```ts
   * const inventoryAdjustments =
   *   await conductor.qbd.inventoryAdjustments.list({
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(
    params: InventoryAdjustmentListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InventoryAdjustmentListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/inventory-adjustments', {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Permanently deletes a an inventory adjustment. The deletion will fail if the
   * inventory adjustment is currently in use or has any linked transactions that are
   * in use.
   *
   * @example
   * ```ts
   * const inventoryAdjustment =
   *   await conductor.qbd.inventoryAdjustments.delete(
   *     '123ABC-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  delete(
    id: string,
    params: InventoryAdjustmentDeleteParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InventoryAdjustmentDeleteResponse> {
    const { conductorEndUserId } = params;
    return this._client.delete(`/quickbooks-desktop/inventory-adjustments/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export interface InventoryAdjustment {
  /**
   * The unique identifier assigned by QuickBooks to this inventory adjustment. This
   * ID is unique across all transaction types.
   */
  id: string;

  /**
   * The account to which this inventory adjustment is posted for tracking inventory
   * value changes.
   */
  account: InventoryAdjustment.Account;

  /**
   * The inventory adjustment's class. Classes can be used to categorize objects into
   * meaningful segments, such as department, location, or type of work. In
   * QuickBooks, class tracking is off by default. A class defined here is
   * automatically used in this inventory adjustment's line items unless overridden
   * at the line item level.
   */
  class: InventoryAdjustment.Class | null;

  /**
   * The date and time when this inventory adjustment was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The customer or customer-job associated with this inventory adjustment.
   */
  customer: InventoryAdjustment.Customer | null;

  /**
   * The custom fields for the inventory adjustment object, added as user-defined
   * data extensions, not included in the standard QuickBooks object.
   */
  customFields: Array<InventoryAdjustment.CustomField>;

  /**
   * A globally unique identifier (GUID) you, the developer, can provide for tracking
   * this object in your external system. This field is immutable and can only be set
   * during object creation.
   */
  externalId: string | null;

  /**
   * The site location where inventory for the item associated with this inventory
   * adjustment is stored.
   */
  inventorySite: InventoryAdjustment.InventorySite | null;

  /**
   * The inventory adjustment's item lines, each representing the adjustment of an
   * inventory item's quantity, value, serial number, or lot number.
   */
  lines: Array<InventoryAdjustment.Line>;

  /**
   * A memo or note for this inventory adjustment.
   */
  memo: string | null;

  /**
   * The type of object. This value is always `"qbd_inventory_adjustment"`.
   */
  objectType: 'qbd_inventory_adjustment';

  /**
   * The case-sensitive user-defined reference number for this inventory adjustment,
   * which can be used to identify the transaction in QuickBooks. This value is not
   * required to be unique and can be arbitrarily changed by the QuickBooks user.
   */
  refNumber: string | null;

  /**
   * The current QuickBooks-assigned revision number of this inventory adjustment
   * object, which changes each time the object is modified. When updating this
   * object, you must provide the most recent `revisionNumber` to ensure you're
   * working with the latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The date of this inventory adjustment, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * The date and time when this inventory adjustment was last updated, in ISO 8601
   * format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the
   * local timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace InventoryAdjustment {
  /**
   * The account to which this inventory adjustment is posted for tracking inventory
   * value changes.
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
   * The inventory adjustment's class. Classes can be used to categorize objects into
   * meaningful segments, such as department, location, or type of work. In
   * QuickBooks, class tracking is off by default. A class defined here is
   * automatically used in this inventory adjustment's line items unless overridden
   * at the line item level.
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

  /**
   * The customer or customer-job associated with this inventory adjustment.
   */
  export interface Customer {
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
   * The site location where inventory for the item associated with this inventory
   * adjustment is stored.
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

  export interface Line {
    /**
     * The unique identifier assigned by QuickBooks to this inventory adjustment line.
     * This ID is unique across all transaction line types.
     */
    id: string;

    /**
     * The expiration date for the serial number or lot number of the item associated
     * with this inventory adjustment line, in ISO 8601 format (YYYY-MM-DD). This is
     * particularly relevant for perishable or time-sensitive inventory items. Note
     * that this field is only supported on QuickBooks Desktop 2023 or later.
     */
    expirationDate: string | null;

    /**
     * The specific location (e.g., bin or shelf) within the inventory site where the
     * item associated with this inventory adjustment line is stored.
     */
    inventorySiteLocation: Line.InventorySiteLocation | null;

    /**
     * The inventory item associated with this inventory adjustment line.
     */
    item: Line.Item | null;

    /**
     * The lot number of the item associated with this inventory adjustment line. Used
     * for tracking groups of inventory items that are purchased or manufactured
     * together.
     */
    lotNumber: string | null;

    /**
     * The type of object. This value is always `"qbd_inventory_adjustment_line"`.
     */
    objectType: 'qbd_inventory_adjustment_line';

    /**
     * Either a positive or negative number that shows the change in quantity for the
     * inventory item associated with this inventory adjustment line. A positive number
     * increases the quantity, while a negative number decreases it.
     */
    quantityDifference: number | null;

    /**
     * The serial number of the item associated with this inventory adjustment line.
     * This is used for tracking individual units of serialized inventory items.
     */
    serialNumber: string | null;

    /**
     * Indicates whether this inventory adjustment line's serial number was added or
     * removed from the inventory.
     */
    serialNumberAction: 'added' | 'removed' | null;

    /**
     * Either a positive or negative number that shows the change in the total value of
     * the entire stock of the inventory item associated with this inventory adjustment
     * line. A positive number increases the value, while a negative number decreases
     * it.
     */
    valueDifference: number | null;
  }

  export namespace Line {
    /**
     * The specific location (e.g., bin or shelf) within the inventory site where the
     * item associated with this inventory adjustment line is stored.
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
     * The inventory item associated with this inventory adjustment line.
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

export interface InventoryAdjustmentListResponse {
  /**
   * The array of inventory adjustments.
   */
  data: Array<InventoryAdjustment>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface InventoryAdjustmentDeleteResponse {
  /**
   * The QuickBooks-assigned unique identifier of the deleted inventory adjustment.
   */
  id: string;

  /**
   * Indicates whether the inventory adjustment was deleted.
   */
  deleted: boolean;

  /**
   * The type of object. This value is always `"qbd_inventory_adjustment"`.
   */
  objectType: 'qbd_inventory_adjustment';

  /**
   * The case-sensitive user-defined reference number of the deleted inventory
   * adjustment.
   */
  refNumber: string | null;
}

export interface InventoryAdjustmentCreateParams {
  /**
   * Body param: The account to which this inventory adjustment is posted for
   * tracking inventory value changes.
   */
  accountId: string;

  /**
   * Body param: The date of this inventory adjustment, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Body param: The inventory adjustment's class. Classes can be used to categorize
   * objects into meaningful segments, such as department, location, or type of work.
   * In QuickBooks, class tracking is off by default. A class defined here is
   * automatically used in this inventory adjustment's line items unless overridden
   * at the line item level.
   */
  classId?: string;

  /**
   * Body param: The customer or customer-job associated with this inventory
   * adjustment.
   */
  customerId?: string;

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
   * inventory adjustment is stored.
   */
  inventorySiteId?: string;

  /**
   * Body param: The inventory adjustment's item lines, each representing the
   * adjustment of an inventory item's quantity, value, serial number, or lot number.
   */
  lines?: Array<InventoryAdjustmentCreateParams.Line>;

  /**
   * Body param: A memo or note for this inventory adjustment.
   */
  memo?: string;

  /**
   * Body param: The case-sensitive user-defined reference number for this inventory
   * adjustment, which can be used to identify the transaction in QuickBooks. This
   * value is not required to be unique and can be arbitrarily changed by the
   * QuickBooks user. When left blank in this create request, this field will be left
   * blank in QuickBooks (i.e., it does _not_ auto-increment).
   */
  refNumber?: string;
}

export namespace InventoryAdjustmentCreateParams {
  export interface Line {
    /**
     * The inventory item associated with this inventory adjustment line.
     */
    itemId: string;

    /**
     * Adjusts the lot number of this inventory adjustment line.
     */
    adjustLotNumber?: Line.AdjustLotNumber;

    /**
     * Adjusts the inventory quantity of this inventory item either by setting a new
     * quantity or by adjusting the current quantity up or down.
     */
    adjustQuantity?: Line.AdjustQuantity;

    /**
     * Adjusts the serial number of this inventory adjustment line. This is used for
     * tracking individual units of serialized inventory items.
     */
    adjustSerialNumber?: Line.AdjustSerialNumber;

    /**
     * Adjusts the total value of the entire stock of this inventory item by setting a
     * new monetary value, and optionally by setting a new quantity.
     */
    adjustValue?: Line.AdjustValue;
  }

  export namespace Line {
    /**
     * Adjusts the lot number of this inventory adjustment line.
     */
    export interface AdjustLotNumber {
      /**
       * The amount to adjust the count of the inventory item associated with this
       * inventory adjustment line.
       */
      adjustCount?: number;

      /**
       * The expiration date for the serial number or lot number of the item associated
       * with this inventory adjustment line, in ISO 8601 format (YYYY-MM-DD). This is
       * particularly relevant for perishable or time-sensitive inventory items. Note
       * that this field is only supported on QuickBooks Desktop 2023 or later.
       */
      expirationDate?: string;

      /**
       * The specific location (e.g., bin or shelf) within the inventory site where the
       * item associated with this inventory adjustment line is stored.
       */
      inventorySiteLocationId?: string;

      /**
       * The lot number of the item associated with this inventory adjustment line. Used
       * for tracking groups of inventory items that are purchased or manufactured
       * together.
       */
      lotNumber?: string;
    }

    /**
     * Adjusts the inventory quantity of this inventory item either by setting a new
     * quantity or by adjusting the current quantity up or down.
     */
    export interface AdjustQuantity {
      /**
       * The expiration date for the serial number or lot number of the item associated
       * with this inventory adjustment line, in ISO 8601 format (YYYY-MM-DD). This is
       * particularly relevant for perishable or time-sensitive inventory items. Note
       * that this field is only supported on QuickBooks Desktop 2023 or later.
       */
      expirationDate?: string;

      /**
       * The specific location (e.g., bin or shelf) within the inventory site where the
       * item associated with this inventory adjustment line is stored.
       */
      inventorySiteLocationId?: string;

      /**
       * The lot number of the item associated with this inventory adjustment line. Used
       * for tracking groups of inventory items that are purchased or manufactured
       * together.
       */
      lotNumber?: string;

      /**
       * The new quantity for the inventory item associated with this inventory
       * adjustment line.
       */
      newQuantity?: number;

      /**
       * Either a positive or negative number that shows the change in quantity for the
       * inventory item associated with this inventory adjustment line. A positive number
       * increases the quantity, while a negative number decreases it.
       */
      quantityDifference?: number;

      /**
       * The serial number of the item associated with this inventory adjustment line.
       * This is used for tracking individual units of serialized inventory items.
       */
      serialNumber?: string;
    }

    /**
     * Adjusts the serial number of this inventory adjustment line. This is used for
     * tracking individual units of serialized inventory items.
     */
    export interface AdjustSerialNumber {
      /**
       * The serial number, which represents a unique unit of the inventory item
       * associated with this inventory adjustment line, to add to inventory.
       */
      addSerialNumber?: string;

      /**
       * The expiration date for the serial number or lot number of the item associated
       * with this inventory adjustment line, in ISO 8601 format (YYYY-MM-DD). This is
       * particularly relevant for perishable or time-sensitive inventory items. Note
       * that this field is only supported on QuickBooks Desktop 2023 or later.
       */
      expirationDate?: string;

      /**
       * The specific location (e.g., bin or shelf) within the inventory site where the
       * item associated with this inventory adjustment line is stored.
       */
      inventorySiteLocationId?: string;

      /**
       * The serial number, which represents a unique unit of the inventory item
       * associated with this inventory adjustment line, to remove from inventory.
       */
      removeSerialNumber?: string;
    }

    /**
     * Adjusts the total value of the entire stock of this inventory item by setting a
     * new monetary value, and optionally by setting a new quantity.
     */
    export interface AdjustValue {
      /**
       * The new quantity for the inventory item associated with this inventory
       * adjustment line.
       */
      newQuantity?: number;

      /**
       * The new total value of the entire stock of the inventory item associated with
       * this inventory adjustment line.
       *
       * **NOTE**: The new value does _not_ have to equal `quantityOnHand` times
       * `purchaseCost`.
       */
      newValue?: string;

      /**
       * Either a positive or negative number that shows the change in quantity for the
       * inventory item associated with this inventory adjustment line. A positive number
       * increases the quantity, while a negative number decreases it.
       */
      quantityDifference?: number;

      /**
       * Either a positive or negative number that shows the change in the total value of
       * the entire stock of the inventory item associated with this inventory adjustment
       * line. A positive number increases the value, while a negative number decreases
       * it.
       */
      valueDifference?: number;
    }
  }
}

export interface InventoryAdjustmentRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface InventoryAdjustmentUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the inventory
   * adjustment object you are updating, which you can get by fetching the object
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
   * Body param: The account to which this inventory adjustment is posted for
   * tracking inventory value changes.
   */
  accountId?: string;

  /**
   * Body param: The inventory adjustment's class. Classes can be used to categorize
   * objects into meaningful segments, such as department, location, or type of work.
   * In QuickBooks, class tracking is off by default. A class defined here is
   * automatically used in this inventory adjustment's line items unless overridden
   * at the line item level.
   */
  classId?: string;

  /**
   * Body param: The customer or customer-job associated with this inventory
   * adjustment.
   */
  customerId?: string;

  /**
   * Body param: The site location where inventory for the item associated with this
   * inventory adjustment is stored.
   */
  inventorySiteId?: string;

  /**
   * Body param: The inventory adjustment's item lines, each representing the
   * adjustment of an inventory item's quantity, value, serial number, or lot number.
   *
   * **IMPORTANT**:
   *
   * 1. Including this array in your update request will **REPLACE** all existing
   *    item lines for the inventory adjustment with this array. To keep any existing
   *    item lines, you must include them in this array even if they have not
   *    changed. **Any item lines not included will be removed.**
   *
   * 2. To add a new item line, include it here with the `id` field set to `-1`.
   *
   * 3. If you do not wish to modify any item lines, omit this field entirely to keep
   *    them unchanged.
   */
  lines?: Array<InventoryAdjustmentUpdateParams.Line>;

  /**
   * Body param: A memo or note for this inventory adjustment.
   */
  memo?: string;

  /**
   * Body param: The case-sensitive user-defined reference number for this inventory
   * adjustment, which can be used to identify the transaction in QuickBooks. This
   * value is not required to be unique and can be arbitrarily changed by the
   * QuickBooks user.
   */
  refNumber?: string;

  /**
   * Body param: The date of this inventory adjustment, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  transactionDate?: string;
}

export namespace InventoryAdjustmentUpdateParams {
  export interface Line {
    /**
     * The QuickBooks-assigned unique identifier of an existing inventory adjustment
     * line you wish to retain or update.
     *
     * **IMPORTANT**: Set this field to `-1` for new inventory adjustment lines you
     * wish to add.
     */
    id: string;

    /**
     * The amount to adjust the count of the inventory item associated with this
     * inventory adjustment line.
     */
    adjustCount?: number;

    /**
     * The expiration date for the serial number or lot number of the item associated
     * with this inventory adjustment line, in ISO 8601 format (YYYY-MM-DD). This is
     * particularly relevant for perishable or time-sensitive inventory items. Note
     * that this field is only supported on QuickBooks Desktop 2023 or later.
     */
    expirationDate?: string;

    /**
     * The specific location (e.g., bin or shelf) within the inventory site where the
     * item associated with this inventory adjustment line is stored.
     */
    inventorySiteLocationId?: string;

    /**
     * The inventory item associated with this inventory adjustment line.
     */
    itemId?: string;

    /**
     * The lot number of the item associated with this inventory adjustment line. Used
     * for tracking groups of inventory items that are purchased or manufactured
     * together.
     */
    lotNumber?: string;

    /**
     * Either a positive or negative number that shows the change in quantity for the
     * inventory item associated with this inventory adjustment line. A positive number
     * increases the quantity, while a negative number decreases it.
     */
    quantityDifference?: number;

    /**
     * The serial number of the item associated with this inventory adjustment line.
     * This is used for tracking individual units of serialized inventory items.
     */
    serialNumber?: string;

    /**
     * Either a positive or negative number that shows the change in the total value of
     * the entire stock of the inventory item associated with this inventory adjustment
     * line. A positive number increases the value, while a negative number decreases
     * it.
     */
    valueDifference?: number;
  }
}

export interface InventoryAdjustmentListParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for inventory adjustments associated with these accounts.
   */
  accountIds?: Array<string>;

  /**
   * Query param: Filter for inventory adjustments associated with these customers.
   */
  customerIds?: Array<string>;

  /**
   * Query param: Filter for specific inventory adjustments by their
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
   * Query param: Whether to include line items in the response. Defaults to `true`.
   */
  includeLineItems?: boolean;

  /**
   * Query param: Filter for inventory adjustments containing these inventory items.
   */
  itemIds?: Array<string>;

  /**
   * Query param: The maximum number of objects to return.
   *
   * **IMPORTANT**: QuickBooks Desktop does not support cursor-based pagination for
   * inventory adjustments. This parameter will limit the response size, but you
   * cannot fetch subsequent results using a cursor. For pagination, use the
   * name-range parameters instead (e.g., `nameFrom=A&nameTo=B`).
   *
   * When this parameter is omitted, the endpoint returns all inventory adjustments
   * without limit, unlike paginated endpoints which default to 150 records. This is
   * acceptable because inventory adjustments typically have low record counts.
   */
  limit?: number;

  /**
   * Query param: Filter for inventory adjustments whose `refNumber` contains this
   * substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberStartsWith`
   * or `refNumberEndsWith`.
   */
  refNumberContains?: string;

  /**
   * Query param: Filter for inventory adjustments whose `refNumber` ends with this
   * substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberContains` or
   * `refNumberStartsWith`.
   */
  refNumberEndsWith?: string;

  /**
   * Query param: Filter for inventory adjustments whose `refNumber` is greater than
   * or equal to this value. If omitted, the range will begin with the first number
   * of the list. Uses a numerical comparison for values that contain only digits;
   * otherwise, uses a lexicographical comparison.
   */
  refNumberFrom?: string;

  /**
   * Query param: Filter for specific inventory adjustments by their ref-number(s),
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
   * Query param: Filter for inventory adjustments whose `refNumber` starts with this
   * substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberContains` or
   * `refNumberEndsWith`.
   */
  refNumberStartsWith?: string;

  /**
   * Query param: Filter for inventory adjustments whose `refNumber` is less than or
   * equal to this value. If omitted, the range will end with the last number of the
   * list. Uses a numerical comparison for values that contain only digits;
   * otherwise, uses a lexicographical comparison.
   */
  refNumberTo?: string;

  /**
   * Query param: Filter for inventory adjustments whose `date` field is on or after
   * this date, in ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **start of the
   * specified day** in the local timezone of the end-user's computer (e.g.,
   * `2025-01-01` → `2025-01-01T00:00:00`).
   */
  transactionDateFrom?: string;

  /**
   * Query param: Filter for inventory adjustments whose `date` field is on or before
   * this date, in ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **end of the specified
   * day** in the local timezone of the end-user's computer (e.g., `2025-01-01` →
   * `2025-01-01T23:59:59`).
   */
  transactionDateTo?: string;

  /**
   * Query param: Filter for inventory adjustments updated on or after this
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
   * Query param: Filter for inventory adjustments updated on or before this
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

export interface InventoryAdjustmentDeleteParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export declare namespace InventoryAdjustments {
  export {
    type InventoryAdjustment as InventoryAdjustment,
    type InventoryAdjustmentListResponse as InventoryAdjustmentListResponse,
    type InventoryAdjustmentDeleteResponse as InventoryAdjustmentDeleteResponse,
    type InventoryAdjustmentCreateParams as InventoryAdjustmentCreateParams,
    type InventoryAdjustmentRetrieveParams as InventoryAdjustmentRetrieveParams,
    type InventoryAdjustmentUpdateParams as InventoryAdjustmentUpdateParams,
    type InventoryAdjustmentListParams as InventoryAdjustmentListParams,
    type InventoryAdjustmentDeleteParams as InventoryAdjustmentDeleteParams,
  };
}
