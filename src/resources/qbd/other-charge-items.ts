// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class OtherChargeItems extends APIResource {
  /**
   * Creates a new other charge item.
   *
   * @example
   * ```ts
   * const otherChargeItem =
   *   await conductor.qbd.otherChargeItems.create({
   *     name: 'Overnight Delivery',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(
    params: OtherChargeItemCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<OtherChargeItem> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/other-charge-items', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves an other charge item by ID.
   *
   * @example
   * ```ts
   * const otherChargeItem =
   *   await conductor.qbd.otherChargeItems.retrieve(
   *     '80000001-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: OtherChargeItemRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<OtherChargeItem> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/other-charge-items/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Updates an existing other charge item.
   *
   * @example
   * ```ts
   * const otherChargeItem =
   *   await conductor.qbd.otherChargeItems.update(
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
    params: OtherChargeItemUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<OtherChargeItem> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(`/quickbooks-desktop/other-charge-items/${id}`, {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of other charge items. Use the `cursor` parameter to paginate
   * through the results.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const otherChargeItem of conductor.qbd.otherChargeItems.list(
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    params: OtherChargeItemListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<OtherChargeItemsCursorPage, OtherChargeItem> {
    const { conductorEndUserId, ...query } = params;
    return this._client.getAPIList('/quickbooks-desktop/other-charge-items', OtherChargeItemsCursorPage, {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export class OtherChargeItemsCursorPage extends CursorPage<OtherChargeItem> {}

export interface OtherChargeItem {
  /**
   * The unique identifier assigned by QuickBooks to this other charge item. This ID
   * is unique across all other charge items but not across different QuickBooks
   * object types.
   */
  id: string;

  /**
   * The other charge item's barcode.
   */
  barcode: string | null;

  /**
   * The other charge item's class. Classes can be used to categorize objects into
   * meaningful segments, such as department, location, or type of work. In
   * QuickBooks, class tracking is off by default.
   */
  class: OtherChargeItem.Class | null;

  /**
   * The date and time when this other charge item was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The custom fields for the other charge item object, added as user-defined data
   * extensions, not included in the standard QuickBooks object.
   */
  customFields: Array<OtherChargeItem.CustomField>;

  /**
   * A globally unique identifier (GUID) you, the developer, can provide for tracking
   * this object in your external system. This field is immutable and can only be set
   * during object creation.
   */
  externalId: string | null;

  /**
   * The case-insensitive fully-qualified unique name of this other charge item,
   * formed by combining the names of its hierarchical parent objects with its own
   * `name`, separated by colons. For example, if an other charge item is under
   * "Shipping Charges" and has the `name` "Overnight Delivery", its `fullName` would
   * be "Shipping Charges:Overnight Delivery".
   *
   * **NOTE**: Unlike `name`, `fullName` is guaranteed to be unique across all other
   * charge item objects. However, `fullName` can still be arbitrarily changed by the
   * QuickBooks user when they modify the underlying `name` field.
   */
  fullName: string;

  /**
   * Indicates whether this other charge item is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The case-insensitive name of this other charge item. Not guaranteed to be unique
   * because it does not include the names of its hierarchical parent objects like
   * `fullName` does. For example, two other charge items could both have the `name`
   * "Overnight Delivery", but they could have unique `fullName` values, such as
   * "Shipping Charges:Overnight Delivery" and "Misc Fees:Overnight Delivery".
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_other_charge_item"`.
   */
  objectType: 'qbd_other_charge_item';

  /**
   * The parent other charge item one level above this one in the hierarchy. For
   * example, if this other charge item has a `fullName` of "Shipping
   * Charges:Overnight Delivery", its parent has a `fullName` of "Shipping Charges".
   * If this other charge item is at the top level, this field will be `null`.
   */
  parent: OtherChargeItem.Parent | null;

  /**
   * The current QuickBooks-assigned revision number of this other charge item
   * object, which changes each time the object is modified. When updating this
   * object, you must provide the most recent `revisionNumber` to ensure you're
   * working with the latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * Details for other charge items that are both purchased and sold, such as
   * reimbursable expenses or inventory items that are bought from vendors and sold
   * to customers.
   *
   * **IMPORTANT**: An other charge item will have either `salesAndPurchaseDetails`
   * or `salesOrPurchaseDetails`, but never both because an item cannot have both
   * configurations.
   */
  salesAndPurchaseDetails: OtherChargeItem.SalesAndPurchaseDetails | null;

  /**
   * Details for other charge items that are exclusively sold or exclusively
   * purchased, but not both. This typically applies to non-inventory items (like a
   * purchased office supply that isn't resold) or service items (like consulting
   * services that are sold but not purchased).
   *
   * **IMPORTANT**: An other charge item will have either `salesAndPurchaseDetails`
   * or `salesOrPurchaseDetails`, but never both because an item cannot have both
   * configurations.
   */
  salesOrPurchaseDetails: OtherChargeItem.SalesOrPurchaseDetails | null;

  /**
   * The default sales-tax code for this other charge item, determining whether it is
   * taxable or non-taxable. This can be overridden at the transaction-line level.
   *
   * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
   * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
   * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
   * non-taxable code to all sales.
   */
  salesTaxCode: OtherChargeItem.SalesTaxCode | null;

  /**
   * The type of special item for this other charge item.
   */
  specialItemType: 'finance_charge' | 'reimbursable_expense_group' | 'reimbursable_expense_subtotal' | null;

  /**
   * The depth level of this other charge item in the hierarchy. A top-level other
   * charge item has a `sublevel` of 0; each subsequent sublevel increases this
   * number by 1. For example, an other charge item with a `fullName` of "Shipping
   * Charges:Overnight Delivery" would have a `sublevel` of 1.
   */
  sublevel: number;

  /**
   * The date and time when this other charge item was last updated, in ISO 8601
   * format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the
   * local timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace OtherChargeItem {
  /**
   * The other charge item's class. Classes can be used to categorize objects into
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
   * The parent other charge item one level above this one in the hierarchy. For
   * example, if this other charge item has a `fullName` of "Shipping
   * Charges:Overnight Delivery", its parent has a `fullName` of "Shipping Charges".
   * If this other charge item is at the top level, this field will be `null`.
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
   * Details for other charge items that are both purchased and sold, such as
   * reimbursable expenses or inventory items that are bought from vendors and sold
   * to customers.
   *
   * **IMPORTANT**: An other charge item will have either `salesAndPurchaseDetails`
   * or `salesOrPurchaseDetails`, but never both because an item cannot have both
   * configurations.
   */
  export interface SalesAndPurchaseDetails {
    /**
     * The expense account used to track costs from purchases of this item.
     */
    expenseAccount: SalesAndPurchaseDetails.ExpenseAccount | null;

    /**
     * The income account used to track revenue from sales of this item.
     */
    incomeAccount: SalesAndPurchaseDetails.IncomeAccount;

    /**
     * The preferred vendor from whom this item is typically purchased.
     */
    preferredVendor: SalesAndPurchaseDetails.PreferredVendor | null;

    /**
     * The cost at which this item is purchased from vendors, represented as a decimal
     * string.
     */
    purchaseCost: string | null;

    /**
     * The description of this item that appears on purchase forms (e.g., checks,
     * bills, item receipts) when it is ordered or bought from vendors.
     */
    purchaseDescription: string | null;

    /**
     * The tax code applied to purchases of this item. Applicable in regions where
     * purchase taxes are used, such as Canada or the UK.
     */
    purchaseTaxCode: SalesAndPurchaseDetails.PurchaseTaxCode | null;

    /**
     * The description of this item that appears on sales forms (e.g., invoices, sales
     * receipts) when sold to customers.
     */
    salesDescription: string | null;

    /**
     * The price at which this item is sold to customers, represented as a decimal
     * string.
     */
    salesPrice: string | null;
  }

  export namespace SalesAndPurchaseDetails {
    /**
     * The expense account used to track costs from purchases of this item.
     */
    export interface ExpenseAccount {
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
     * The income account used to track revenue from sales of this item.
     */
    export interface IncomeAccount {
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
     * The preferred vendor from whom this item is typically purchased.
     */
    export interface PreferredVendor {
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
     * The tax code applied to purchases of this item. Applicable in regions where
     * purchase taxes are used, such as Canada or the UK.
     */
    export interface PurchaseTaxCode {
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
   * Details for other charge items that are exclusively sold or exclusively
   * purchased, but not both. This typically applies to non-inventory items (like a
   * purchased office supply that isn't resold) or service items (like consulting
   * services that are sold but not purchased).
   *
   * **IMPORTANT**: An other charge item will have either `salesAndPurchaseDetails`
   * or `salesOrPurchaseDetails`, but never both because an item cannot have both
   * configurations.
   */
  export interface SalesOrPurchaseDetails {
    /**
     * A description of this item.
     */
    description: string | null;

    /**
     * The posting account to which transactions involving this item are posted. This
     * could be an income account when selling or an expense account when purchasing.
     */
    postingAccount: SalesOrPurchaseDetails.PostingAccount | null;

    /**
     * The price at which this item is purchased or sold, represented as a decimal
     * string.
     */
    price: string | null;

    /**
     * The price of this item expressed as a percentage, used instead of `price` when
     * the item's cost is calculated as a percentage of another amount. For example, a
     * service item that costs a percentage of another item's price.
     */
    pricePercentage: string | null;
  }

  export namespace SalesOrPurchaseDetails {
    /**
     * The posting account to which transactions involving this item are posted. This
     * could be an income account when selling or an expense account when purchasing.
     */
    export interface PostingAccount {
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
   * The default sales-tax code for this other charge item, determining whether it is
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

export interface OtherChargeItemCreateParams {
  /**
   * Body param: The case-insensitive name of this other charge item. Not guaranteed
   * to be unique because it does not include the names of its hierarchical parent
   * objects like `fullName` does. For example, two other charge items could both
   * have the `name` "Overnight Delivery", but they could have unique `fullName`
   * values, such as "Shipping Charges:Overnight Delivery" and "Misc Fees:Overnight
   * Delivery".
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
   * Body param: The other charge item's barcode.
   */
  barcode?: OtherChargeItemCreateParams.Barcode;

  /**
   * Body param: The other charge item's class. Classes can be used to categorize
   * objects into meaningful segments, such as department, location, or type of work.
   * In QuickBooks, class tracking is off by default.
   */
  classId?: string;

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
   * Body param: Indicates whether this other charge item is active. Inactive objects
   * are typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The parent other charge item one level above this one in the
   * hierarchy. For example, if this other charge item has a `fullName` of "Shipping
   * Charges:Overnight Delivery", its parent has a `fullName` of "Shipping Charges".
   * If this other charge item is at the top level, this field will be `null`.
   */
  parentId?: string;

  /**
   * Body param: Details for other charge items that are both purchased and sold,
   * such as reimbursable expenses or inventory items that are bought from vendors
   * and sold to customers.
   *
   * **IMPORTANT**: You must specify either `salesAndPurchaseDetails` or
   * `salesOrPurchaseDetails` when creating an other charge item, but never both
   * because an item cannot have both configurations.
   */
  salesAndPurchaseDetails?: OtherChargeItemCreateParams.SalesAndPurchaseDetails;

  /**
   * Body param: Details for other charge items that are exclusively sold or
   * exclusively purchased, but not both. This typically applies to non-inventory
   * items (like a purchased office supply that isn't resold) or service items (like
   * consulting services that are sold but not purchased).
   *
   * **IMPORTANT**: You must specify either `salesOrPurchaseDetails` or
   * `salesAndPurchaseDetails` when creating an other charge item, but never both
   * because an item cannot have both configurations.
   */
  salesOrPurchaseDetails?: OtherChargeItemCreateParams.SalesOrPurchaseDetails;

  /**
   * Body param: The default sales-tax code for this other charge item, determining
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

export namespace OtherChargeItemCreateParams {
  /**
   * The other charge item's barcode.
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

  /**
   * Details for other charge items that are both purchased and sold, such as
   * reimbursable expenses or inventory items that are bought from vendors and sold
   * to customers.
   *
   * **IMPORTANT**: You must specify either `salesAndPurchaseDetails` or
   * `salesOrPurchaseDetails` when creating an other charge item, but never both
   * because an item cannot have both configurations.
   */
  export interface SalesAndPurchaseDetails {
    /**
     * The expense account used to track costs from purchases of this item.
     */
    expenseAccountId: string;

    /**
     * The income account used to track revenue from sales of this item.
     */
    incomeAccountId: string;

    /**
     * The preferred vendor from whom this item is typically purchased.
     */
    preferredVendorId?: string;

    /**
     * The cost at which this item is purchased from vendors, represented as a decimal
     * string.
     */
    purchaseCost?: string;

    /**
     * The description of this item that appears on purchase forms (e.g., checks,
     * bills, item receipts) when it is ordered or bought from vendors.
     */
    purchaseDescription?: string;

    /**
     * The tax code applied to purchases of this item. Applicable in regions where
     * purchase taxes are used, such as Canada or the UK.
     */
    purchaseTaxCodeId?: string;

    /**
     * The description of this item that appears on sales forms (e.g., invoices, sales
     * receipts) when sold to customers.
     */
    salesDescription?: string;

    /**
     * The price at which this item is sold to customers, represented as a decimal
     * string.
     */
    salesPrice?: string;
  }

  /**
   * Details for other charge items that are exclusively sold or exclusively
   * purchased, but not both. This typically applies to non-inventory items (like a
   * purchased office supply that isn't resold) or service items (like consulting
   * services that are sold but not purchased).
   *
   * **IMPORTANT**: You must specify either `salesOrPurchaseDetails` or
   * `salesAndPurchaseDetails` when creating an other charge item, but never both
   * because an item cannot have both configurations.
   */
  export interface SalesOrPurchaseDetails {
    /**
     * The posting account to which transactions involving this item are posted. This
     * could be an income account when selling or an expense account when purchasing.
     */
    postingAccountId: string;

    /**
     * A description of this item.
     */
    description?: string;

    /**
     * The price at which this item is purchased or sold, represented as a decimal
     * string.
     */
    price?: string;

    /**
     * The price of this item expressed as a percentage, used instead of `price` when
     * the item's cost is calculated as a percentage of another amount. For example, a
     * service item that costs a percentage of another item's price.
     */
    pricePercentage?: string;
  }
}

export interface OtherChargeItemRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface OtherChargeItemUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the other charge
   * item object you are updating, which you can get by fetching the object first.
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
   * Body param: The other charge item's barcode.
   */
  barcode?: OtherChargeItemUpdateParams.Barcode;

  /**
   * Body param: The other charge item's class. Classes can be used to categorize
   * objects into meaningful segments, such as department, location, or type of work.
   * In QuickBooks, class tracking is off by default.
   */
  classId?: string;

  /**
   * Body param: Indicates whether this other charge item is active. Inactive objects
   * are typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The case-insensitive name of this other charge item. Not guaranteed
   * to be unique because it does not include the names of its hierarchical parent
   * objects like `fullName` does. For example, two other charge items could both
   * have the `name` "Overnight Delivery", but they could have unique `fullName`
   * values, such as "Shipping Charges:Overnight Delivery" and "Misc Fees:Overnight
   * Delivery".
   *
   * Maximum length: 31 characters.
   */
  name?: string;

  /**
   * Body param: The parent other charge item one level above this one in the
   * hierarchy. For example, if this other charge item has a `fullName` of "Shipping
   * Charges:Overnight Delivery", its parent has a `fullName` of "Shipping Charges".
   * If this other charge item is at the top level, this field will be `null`.
   */
  parentId?: string;

  /**
   * Body param: Details for other charge items that are both purchased and sold,
   * such as reimbursable expenses or inventory items that are bought from vendors
   * and sold to customers.
   *
   * **IMPORTANT**: You cannot specify both `salesAndPurchaseDetails` and
   * `salesOrPurchaseDetails` when modifying an other charge item because an item
   * cannot have both configurations.
   */
  salesAndPurchaseDetails?: OtherChargeItemUpdateParams.SalesAndPurchaseDetails;

  /**
   * Body param: Details for other charge items that are exclusively sold or
   * exclusively purchased, but not both. This typically applies to non-inventory
   * items (like a purchased office supply that isn't resold) or service items (like
   * consulting services that are sold but not purchased).
   *
   * **IMPORTANT**: You cannot specify both `salesOrPurchaseDetails` and
   * `salesAndPurchaseDetails` when modifying an other charge item because an item
   * cannot have both configurations.
   */
  salesOrPurchaseDetails?: OtherChargeItemUpdateParams.SalesOrPurchaseDetails;

  /**
   * Body param: The default sales-tax code for this other charge item, determining
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

export namespace OtherChargeItemUpdateParams {
  /**
   * The other charge item's barcode.
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

  /**
   * Details for other charge items that are both purchased and sold, such as
   * reimbursable expenses or inventory items that are bought from vendors and sold
   * to customers.
   *
   * **IMPORTANT**: You cannot specify both `salesAndPurchaseDetails` and
   * `salesOrPurchaseDetails` when modifying an other charge item because an item
   * cannot have both configurations.
   */
  export interface SalesAndPurchaseDetails {
    /**
     * The expense account used to track costs from purchases of this item.
     */
    expenseAccountId?: string;

    /**
     * The income account used to track revenue from sales of this item.
     */
    incomeAccountId?: string;

    /**
     * The preferred vendor from whom this item is typically purchased.
     */
    preferredVendorId?: string;

    /**
     * The cost at which this item is purchased from vendors, represented as a decimal
     * string.
     */
    purchaseCost?: string;

    /**
     * The description of this item that appears on purchase forms (e.g., checks,
     * bills, item receipts) when it is ordered or bought from vendors.
     */
    purchaseDescription?: string;

    /**
     * The tax code applied to purchases of this item. Applicable in regions where
     * purchase taxes are used, such as Canada or the UK.
     */
    purchaseTaxCodeId?: string;

    /**
     * The description of this item that appears on sales forms (e.g., invoices, sales
     * receipts) when sold to customers.
     */
    salesDescription?: string;

    /**
     * The price at which this item is sold to customers, represented as a decimal
     * string.
     */
    salesPrice?: string;

    /**
     * When `true`, applies the new expense account (specified by the
     * `expenseAccountId` field) to all existing transactions that use this item. This
     * updates historical data and should be used with caution. The update will fail if
     * any affected transaction falls within a closed accounting period. If this
     * parameter is not specified, QuickBooks will prompt the user before making any
     * changes.
     */
    updateExistingTransactionsExpenseAccount?: boolean;

    /**
     * When `true`, applies the new income account (specified by the `incomeAccountId`
     * field) to all existing transactions that use this item. This updates historical
     * data and should be used with caution. The update will fail if any affected
     * transaction falls within a closed accounting period. If this parameter is not
     * specified, QuickBooks will prompt the user before making any changes.
     */
    updateExistingTransactionsIncomeAccount?: boolean;
  }

  /**
   * Details for other charge items that are exclusively sold or exclusively
   * purchased, but not both. This typically applies to non-inventory items (like a
   * purchased office supply that isn't resold) or service items (like consulting
   * services that are sold but not purchased).
   *
   * **IMPORTANT**: You cannot specify both `salesOrPurchaseDetails` and
   * `salesAndPurchaseDetails` when modifying an other charge item because an item
   * cannot have both configurations.
   */
  export interface SalesOrPurchaseDetails {
    /**
     * A description of this item.
     */
    description?: string;

    /**
     * The posting account to which transactions involving this item are posted. This
     * could be an income account when selling or an expense account when purchasing.
     */
    postingAccountId?: string;

    /**
     * The price at which this item is purchased or sold, represented as a decimal
     * string.
     */
    price?: string;

    /**
     * The price of this item expressed as a percentage, used instead of `price` when
     * the item's cost is calculated as a percentage of another amount. For example, a
     * service item that costs a percentage of another item's price.
     */
    pricePercentage?: string;

    /**
     * When `true`, applies the new account (specified by the `accountId` field) to all
     * existing transactions associated with this item. This updates historical data
     * and should be used with caution. The update will fail if any affected
     * transaction falls within a closed accounting period. If this parameter is not
     * specified, QuickBooks will prompt the user before making any changes.
     */
    updateExistingTransactionsAccount?: boolean;
  }
}

export interface OtherChargeItemListParams extends CursorPageParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for other charge items of these classes. A class is a way
   * end-users can categorize other charge items in QuickBooks.
   */
  classIds?: Array<string>;

  /**
   * Query param: Filter for specific other charge items by their full-name(s),
   * case-insensitive. Like `id`, `fullName` is a unique identifier for an other
   * charge item, formed by by combining the names of its parent objects with its own
   * `name`, separated by colons. For example, if an other charge item is under
   * "Shipping Charges" and has the `name` "Overnight Delivery", its `fullName` would
   * be "Shipping Charges:Overnight Delivery".
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  fullNames?: Array<string>;

  /**
   * Query param: Filter for specific other charge items by their QuickBooks-assigned
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
   * Query param: Filter for other charge items whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for other charge items whose `name` ends with this
   * substring, case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for other charge items whose `name` is alphabetically
   * greater than or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for other charge items whose `name` starts with this
   * substring, case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for other charge items whose `name` is alphabetically less
   * than or equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for other charge items that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for other charge items updated on or after this date/time.
   * Accepts the following ISO 8601 formats:
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
   * Query param: Filter for other charge items updated on or before this date/time.
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

OtherChargeItems.OtherChargeItemsCursorPage = OtherChargeItemsCursorPage;

export declare namespace OtherChargeItems {
  export {
    type OtherChargeItem as OtherChargeItem,
    OtherChargeItemsCursorPage as OtherChargeItemsCursorPage,
    type OtherChargeItemCreateParams as OtherChargeItemCreateParams,
    type OtherChargeItemRetrieveParams as OtherChargeItemRetrieveParams,
    type OtherChargeItemUpdateParams as OtherChargeItemUpdateParams,
    type OtherChargeItemListParams as OtherChargeItemListParams,
  };
}
