// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class Bills extends APIResource {
  /**
   * Creates a new bill.
   */
  create(params: BillCreateParams, options?: Core.RequestOptions): Core.APIPromise<Bill> {
    const { 'Conductor-End-User-Id': conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/bills', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves a bill by ID.
   */
  retrieve(id: string, params: BillRetrieveParams, options?: Core.RequestOptions): Core.APIPromise<Bill> {
    const { 'Conductor-End-User-Id': conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/bills/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Updates an existing bill.
   */
  update(id: string, params: BillUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Bill> {
    const { 'Conductor-End-User-Id': conductorEndUserId, ...body } = params;
    return this._client.post(`/quickbooks-desktop/bills/${id}`, {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of bills. Use the `cursor` parameter to paginate through the
   * results.
   */
  list(params: BillListParams, options?: Core.RequestOptions): Core.PagePromise<BillsCursorPage, Bill> {
    const { 'Conductor-End-User-Id': conductorEndUserId, ...query } = params;
    return this._client.getAPIList('/quickbooks-desktop/bills', BillsCursorPage, {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export class BillsCursorPage extends CursorPage<Bill> {}

export interface Bill {
  /**
   * The unique identifier assigned by QuickBooks to this bill. This ID is unique
   * across all transaction types.
   */
  id: string;

  /**
   * The total monetary amount due for this bill, represented as a decimal string.
   * This equals the sum of the amounts in the bill's expense lines, item lines, and
   * item group lines. It also equals `openAmount` plus any credits or discounts.
   */
  amountDue: string;

  /**
   * The monetary amount due for this bill converted to the home currency of the
   * QuickBooks company file. Represented as a decimal string.
   */
  amountDueInHomeCurrency: string | null;

  /**
   * The date and time when this bill was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user's time zone
   * in QuickBooks.
   */
  createdAt: string;

  /**
   * The bill's currency. For built-in currencies, the name and code are standard
   * international values. For user-defined currencies, all values are editable.
   */
  currency: Bill.Currency | null;

  /**
   * The custom fields for the bill object, added as user-defined data extensions,
   * not included in the standard QuickBooks object.
   */
  customFields: Array<Bill.CustomField>;

  /**
   * The date by which this bill must be paid, in ISO 8601 format (YYYY-MM-DD).
   */
  dueDate: string | null;

  /**
   * The market exchange rate between this bill's currency and the home currency in
   * QuickBooks at the time of this transaction. Represented as a decimal value
   * (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).
   */
  exchangeRate: number | null;

  /**
   * The bill's expense lines, each representing one line in this expense.
   */
  expenseLines: Array<Bill.ExpenseLine>;

  /**
   * A globally unique identifier (GUID) you can provide for tracking this object in
   * your external system.
   *
   * **IMPORTANT**: Must be formatted as a valid GUID; otherwise, QuickBooks will
   * return an error. This field is immutable and can only be set during object
   * creation.
   */
  externalId: string | null;

  /**
   * Indicates whether this bill has been paid in full. When `true`, `openAmount`
   * will be 0.
   */
  isPaid: boolean | null;

  /**
   * Indicates whether this bill has not been completed or is in a draft version.
   */
  isPending: boolean | null;

  /**
   * The bill's item group lines, each representing a predefined set of items bundled
   * together because they are commonly purchased together or grouped for faster
   * entry.
   */
  itemLineGroups: Array<Bill.ItemLineGroup>;

  /**
   * The bill's item lines, each representing the purchase of a specific item or
   * service.
   */
  itemLines: Array<Bill.ItemLine>;

  /**
   * The bill's linked transactions, such as payments applied, credits used, or
   * associated purchase orders.
   *
   * **IMPORTANT**: You must specify the parameter `includeLinkedTransactions` when
   * fetching a list of bills to receive this field because it is not returned by
   * default.
   */
  linkedTransactions: Array<Bill.LinkedTransaction>;

  /**
   * A memo or note for this bill that appears in the Accounts-Payable register and
   * in reports that include this bill.
   */
  memo: string | null;

  /**
   * The type of object. This value is always `"qbd_bill"`.
   */
  objectType: 'qbd_bill';

  /**
   * The remaining amount owed on this bill after subtracting any credits or
   * discounts from the `openAmount`. Represented as a decimal string.
   */
  openAmount: string;

  /**
   * The Accounts-Payable (A/P) account to which this bill is assigned, used to track
   * the amount owed. If not specified, QuickBooks Desktop will use its default A/P
   * account.
   *
   * **IMPORTANT**: If this bill is linked to other transactions, this A/P account
   * must match the `payablesAccount` used in those other transactions.
   */
  payablesAccount: Bill.PayablesAccount | null;

  /**
   * The case-sensitive user-defined reference number for this bill, which can be
   * used to identify the transaction in QuickBooks. This value is not required to be
   * unique and can be arbitrarily changed by the QuickBooks user.
   */
  refNumber: string | null;

  /**
   * The current revision number of this bill object, which changes each time the
   * object is modified. When updating this object, you must provide the most recent
   * `revisionNumber` to ensure you're working with the latest data; otherwise, the
   * update will return an error.
   */
  revisionNumber: string;

  /**
   * The sales-tax code for this bill, determining whether it is taxable or
   * non-taxable. If set, this overrides any sales-tax codes defined on the vendor.
   * This can be overridden on the bill's individual lines.
   *
   * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
   * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
   * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
   * non-taxable code to all sales.
   */
  salesTaxCode: Bill.SalesTaxCode | null;

  /**
   * The bill's payment terms, defining when payment is due and any applicable
   * discounts.
   */
  terms: Bill.Terms | null;

  /**
   * The date of this bill, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * The date and time when this bill was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user's time zone
   * in QuickBooks.
   */
  updatedAt: string;

  /**
   * The vendor who sent this bill for goods or services purchased.
   */
  vendor: Bill.Vendor;

  /**
   * The address of the vendor who sent this bill.
   */
  vendorAddress: Bill.VendorAddress | null;
}

export namespace Bill {
  /**
   * The bill's currency. For built-in currencies, the name and code are standard
   * international values. For user-defined currencies, all values are editable.
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

  export interface ExpenseLine {
    /**
     * The unique identifier assigned by QuickBooks to this expense line. This ID is
     * unique across all transaction line types.
     */
    id: string;

    /**
     * The expense account being debited (increased) for this expense line. The
     * corresponding account being credited is usually a liability account (e.g.,
     * Accounts-Payable) or an asset account (e.g., Cash), depending on the transaction
     * type.
     */
    account: ExpenseLine.Account | null;

    /**
     * The monetary amount of this expense line, represented as a decimal string.
     */
    amount: string | null;

    /**
     * The billing status of this expense line.
     */
    billingStatus: 'billable' | 'has_been_billed' | 'not_billable' | null;

    /**
     * The expense line's class. Classes can be used to categorize objects into
     * meaningful segments, such as department, location, or type of work. In
     * QuickBooks, class tracking is off by default. If a class is specified for the
     * entire parent transaction, it is automatically applied to all expense lines
     * unless overridden here, at the transaction line level.
     */
    class: ExpenseLine.Class | null;

    /**
     * The custom fields for the expense line object, added as user-defined data
     * extensions, not included in the standard QuickBooks object.
     */
    customFields: Array<ExpenseLine.CustomField>;

    /**
     * A memo or note for this expense line.
     */
    memo: string | null;

    /**
     * The type of object. This value is always `"qbd_expense_line"`.
     */
    objectType: 'qbd_expense_line';

    /**
     * If `account` refers to an Accounts-Payable (A/P) account, `payee` refers to the
     * expense's vendor (not the customer). If `account` refers to any other type of
     * account, `payee` refers to the expense's customer (not the vendor).
     */
    payee: ExpenseLine.Payee | null;

    /**
     * The expense line's sales representative. Sales representatives can be employees,
     * vendors, or other names in QuickBooks.
     */
    salesRepresentative: ExpenseLine.SalesRepresentative | null;

    /**
     * The sales-tax code for this expense line, determining whether it is taxable or
     * non-taxable. If set, this overrides any sales-tax codes defined on the parent
     * transaction or the associated item.
     *
     * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
     * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
     * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
     * non-taxable code to all sales.
     */
    salesTaxCode: ExpenseLine.SalesTaxCode | null;
  }

  export namespace ExpenseLine {
    /**
     * The expense account being debited (increased) for this expense line. The
     * corresponding account being credited is usually a liability account (e.g.,
     * Accounts-Payable) or an asset account (e.g., Cash), depending on the transaction
     * type.
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
     * The expense line's class. Classes can be used to categorize objects into
     * meaningful segments, such as department, location, or type of work. In
     * QuickBooks, class tracking is off by default. If a class is specified for the
     * entire parent transaction, it is automatically applied to all expense lines
     * unless overridden here, at the transaction line level.
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
     * If `account` refers to an Accounts-Payable (A/P) account, `payee` refers to the
     * expense's vendor (not the customer). If `account` refers to any other type of
     * account, `payee` refers to the expense's customer (not the vendor).
     */
    export interface Payee {
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
     * The expense line's sales representative. Sales representatives can be employees,
     * vendors, or other names in QuickBooks.
     */
    export interface SalesRepresentative {
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
     * The sales-tax code for this expense line, determining whether it is taxable or
     * non-taxable. If set, this overrides any sales-tax codes defined on the parent
     * transaction or the associated item.
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

  export interface ItemLineGroup {
    /**
     * The unique identifier assigned by QuickBooks to this item line group. This ID is
     * unique across all transaction line types.
     */
    id: string;

    /**
     * The custom fields for the item line group object, added as user-defined data
     * extensions, not included in the standard QuickBooks object.
     */
    customFields: Array<ItemLineGroup.CustomField>;

    /**
     * A description of this item line group.
     */
    description: string | null;

    /**
     * The item line group's item group, representing a predefined set of items bundled
     * because they are commonly purchased together or grouped for faster entry.
     */
    itemGroup: ItemLineGroup.ItemGroup;

    /**
     * The item line group's item lines, each representing the purchase of a specific
     * item or service.
     */
    itemLines: Array<ItemLineGroup.ItemLine>;

    /**
     * The type of object. This value is always `"qbd_item_line_group"`.
     */
    objectType: 'qbd_item_line_group';

    /**
     * Specifies an alternative unit-of-measure set when updating this item line
     * group's `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to
     * select units from a different set than the item's default unit-of-measure set,
     * which remains unchanged on the item itself. The override applies only to this
     * specific line. For example, you can sell an item typically measured in volume
     * units using weight units in a specific transaction by specifying a different
     * unit-of-measure set with this field.
     */
    overrideUnitOfMeasureSet: ItemLineGroup.OverrideUnitOfMeasureSet | null;

    /**
     * The quantity of the item group associated with this item line group. This field
     * cannot be cleared.
     */
    quantity: number | null;

    /**
     * The total monetary amount of this item line group, equivalent to the sum of the
     * amounts in `lines`, represented as a decimal string.
     */
    totalAmount: string;

    /**
     * The unit-of-measure used for the `quantity` in this item line group. Must be a
     * valid unit within the item's available units of measure.
     */
    unitOfMeasure: string | null;
  }

  export namespace ItemLineGroup {
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
     * The item line group's item group, representing a predefined set of items bundled
     * because they are commonly purchased together or grouped for faster entry.
     */
    export interface ItemGroup {
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

    export interface ItemLine {
      /**
       * The unique identifier assigned by QuickBooks to this item line. This ID is
       * unique across all transaction line types.
       */
      id: string;

      /**
       * The monetary amount of this item line, represented as a decimal string. If both
       * `quantity` and `cost` are specified but not `amount`, QuickBooks will use them
       * to calculate `amount`. If `amount`, `cost`, and `quantity` are all unspecified,
       * then QuickBooks will calculate `amount` based on a `quantity` of `1` and the
       * suggested `cost`. This field cannot be cleared.
       */
      amount: string | null;

      /**
       * The billing status of this item line.
       */
      billingStatus: 'billable' | 'has_been_billed' | 'not_billable' | null;

      /**
       * The item line's class. Classes can be used to categorize objects into meaningful
       * segments, such as department, location, or type of work. In QuickBooks, class
       * tracking is off by default. If a class is specified for the entire parent
       * transaction, it is automatically applied to all item lines unless overridden
       * here, at the transaction line level.
       */
      class: ItemLine.Class | null;

      /**
       * The cost of this item line, represented as a decimal string. If both `quantity`
       * and `amount` are specified but not `cost`, QuickBooks will use them to calculate
       * `cost`.
       */
      cost: string | null;

      /**
       * The customer or customer-job associated with this item line.
       */
      customer: ItemLine.Customer | null;

      /**
       * The custom fields for the item line object, added as user-defined data
       * extensions, not included in the standard QuickBooks object.
       */
      customFields: Array<ItemLine.CustomField>;

      /**
       * A description of this item line.
       */
      description: string | null;

      /**
       * The expiration date for the serial number or lot number of the item associated
       * with this item line, in ISO 8601 format (YYYY-MM-DD). This is particularly
       * relevant for perishable or time-sensitive inventory items. Note that this field
       * is only supported on QuickBooks Desktop 2023 or later.
       */
      expirationDate: string | null;

      /**
       * The site location where inventory for the item associated with this item line is
       * stored.
       */
      inventorySite: ItemLine.InventorySite | null;

      /**
       * The specific location (e.g., bin or shelf) within the inventory site where the
       * item associated with this item line is stored.
       */
      inventorySiteLocation: ItemLine.InventorySiteLocation | null;

      /**
       * The item associated with this item line. This can refer to any good or service
       * that the business buys or sells, including item types such as a service item,
       * inventory item, or special calculation item like a discount item or sales-tax
       * item.
       */
      item: ItemLine.Item | null;

      /**
       * The lot number of the item associated with this item line. Used for tracking
       * groups of inventory items that are purchased or manufactured together.
       */
      lotNumber: string | null;

      /**
       * The type of object. This value is always `"qbd_item_line"`.
       */
      objectType: 'qbd_item_line';

      /**
       * Specifies an alternative unit-of-measure set when updating this item line's
       * `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select
       * units from a different set than the item's default unit-of-measure set, which
       * remains unchanged on the item itself. The override applies only to this specific
       * line. For example, you can sell an item typically measured in volume units using
       * weight units in a specific transaction by specifying a different unit-of-measure
       * set with this field.
       */
      overrideUnitOfMeasureSet: ItemLine.OverrideUnitOfMeasureSet | null;

      /**
       * The quantity of the item associated with this item line. This field cannot be
       * cleared.
       */
      quantity: number | null;

      /**
       * The item line's sales representative. Sales representatives can be employees,
       * vendors, or other names in QuickBooks.
       */
      salesRepresentative: ItemLine.SalesRepresentative | null;

      /**
       * The sales-tax code for this item line, determining whether it is taxable or
       * non-taxable. If set, this overrides any sales-tax codes defined on the parent
       * transaction or the associated item.
       *
       * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
       * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
       * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
       * non-taxable code to all sales.
       */
      salesTaxCode: ItemLine.SalesTaxCode | null;

      /**
       * The serial number of the item associated with this item line. This is used for
       * tracking individual units of serialized inventory items.
       */
      serialNumber: string | null;

      /**
       * The unit-of-measure used for the `quantity` in this item line. Must be a valid
       * unit within the item's available units of measure.
       */
      unitOfMeasure: string | null;
    }

    export namespace ItemLine {
      /**
       * The item line's class. Classes can be used to categorize objects into meaningful
       * segments, such as department, location, or type of work. In QuickBooks, class
       * tracking is off by default. If a class is specified for the entire parent
       * transaction, it is automatically applied to all item lines unless overridden
       * here, at the transaction line level.
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
       * The customer or customer-job associated with this item line.
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
       * The site location where inventory for the item associated with this item line is
       * stored.
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
       * item associated with this item line is stored.
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
       * The item associated with this item line. This can refer to any good or service
       * that the business buys or sells, including item types such as a service item,
       * inventory item, or special calculation item like a discount item or sales-tax
       * item.
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

      /**
       * Specifies an alternative unit-of-measure set when updating this item line's
       * `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select
       * units from a different set than the item's default unit-of-measure set, which
       * remains unchanged on the item itself. The override applies only to this specific
       * line. For example, you can sell an item typically measured in volume units using
       * weight units in a specific transaction by specifying a different unit-of-measure
       * set with this field.
       */
      export interface OverrideUnitOfMeasureSet {
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
       * The item line's sales representative. Sales representatives can be employees,
       * vendors, or other names in QuickBooks.
       */
      export interface SalesRepresentative {
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
       * The sales-tax code for this item line, determining whether it is taxable or
       * non-taxable. If set, this overrides any sales-tax codes defined on the parent
       * transaction or the associated item.
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

    /**
     * Specifies an alternative unit-of-measure set when updating this item line
     * group's `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to
     * select units from a different set than the item's default unit-of-measure set,
     * which remains unchanged on the item itself. The override applies only to this
     * specific line. For example, you can sell an item typically measured in volume
     * units using weight units in a specific transaction by specifying a different
     * unit-of-measure set with this field.
     */
    export interface OverrideUnitOfMeasureSet {
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

  export interface ItemLine {
    /**
     * The unique identifier assigned by QuickBooks to this item line. This ID is
     * unique across all transaction line types.
     */
    id: string;

    /**
     * The monetary amount of this item line, represented as a decimal string. If both
     * `quantity` and `cost` are specified but not `amount`, QuickBooks will use them
     * to calculate `amount`. If `amount`, `cost`, and `quantity` are all unspecified,
     * then QuickBooks will calculate `amount` based on a `quantity` of `1` and the
     * suggested `cost`. This field cannot be cleared.
     */
    amount: string | null;

    /**
     * The billing status of this item line.
     */
    billingStatus: 'billable' | 'has_been_billed' | 'not_billable' | null;

    /**
     * The item line's class. Classes can be used to categorize objects into meaningful
     * segments, such as department, location, or type of work. In QuickBooks, class
     * tracking is off by default. If a class is specified for the entire parent
     * transaction, it is automatically applied to all item lines unless overridden
     * here, at the transaction line level.
     */
    class: ItemLine.Class | null;

    /**
     * The cost of this item line, represented as a decimal string. If both `quantity`
     * and `amount` are specified but not `cost`, QuickBooks will use them to calculate
     * `cost`.
     */
    cost: string | null;

    /**
     * The customer or customer-job associated with this item line.
     */
    customer: ItemLine.Customer | null;

    /**
     * The custom fields for the item line object, added as user-defined data
     * extensions, not included in the standard QuickBooks object.
     */
    customFields: Array<ItemLine.CustomField>;

    /**
     * A description of this item line.
     */
    description: string | null;

    /**
     * The expiration date for the serial number or lot number of the item associated
     * with this item line, in ISO 8601 format (YYYY-MM-DD). This is particularly
     * relevant for perishable or time-sensitive inventory items. Note that this field
     * is only supported on QuickBooks Desktop 2023 or later.
     */
    expirationDate: string | null;

    /**
     * The site location where inventory for the item associated with this item line is
     * stored.
     */
    inventorySite: ItemLine.InventorySite | null;

    /**
     * The specific location (e.g., bin or shelf) within the inventory site where the
     * item associated with this item line is stored.
     */
    inventorySiteLocation: ItemLine.InventorySiteLocation | null;

    /**
     * The item associated with this item line. This can refer to any good or service
     * that the business buys or sells, including item types such as a service item,
     * inventory item, or special calculation item like a discount item or sales-tax
     * item.
     */
    item: ItemLine.Item | null;

    /**
     * The lot number of the item associated with this item line. Used for tracking
     * groups of inventory items that are purchased or manufactured together.
     */
    lotNumber: string | null;

    /**
     * The type of object. This value is always `"qbd_item_line"`.
     */
    objectType: 'qbd_item_line';

    /**
     * Specifies an alternative unit-of-measure set when updating this item line's
     * `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select
     * units from a different set than the item's default unit-of-measure set, which
     * remains unchanged on the item itself. The override applies only to this specific
     * line. For example, you can sell an item typically measured in volume units using
     * weight units in a specific transaction by specifying a different unit-of-measure
     * set with this field.
     */
    overrideUnitOfMeasureSet: ItemLine.OverrideUnitOfMeasureSet | null;

    /**
     * The quantity of the item associated with this item line. This field cannot be
     * cleared.
     */
    quantity: number | null;

    /**
     * The item line's sales representative. Sales representatives can be employees,
     * vendors, or other names in QuickBooks.
     */
    salesRepresentative: ItemLine.SalesRepresentative | null;

    /**
     * The sales-tax code for this item line, determining whether it is taxable or
     * non-taxable. If set, this overrides any sales-tax codes defined on the parent
     * transaction or the associated item.
     *
     * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
     * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
     * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
     * non-taxable code to all sales.
     */
    salesTaxCode: ItemLine.SalesTaxCode | null;

    /**
     * The serial number of the item associated with this item line. This is used for
     * tracking individual units of serialized inventory items.
     */
    serialNumber: string | null;

    /**
     * The unit-of-measure used for the `quantity` in this item line. Must be a valid
     * unit within the item's available units of measure.
     */
    unitOfMeasure: string | null;
  }

  export namespace ItemLine {
    /**
     * The item line's class. Classes can be used to categorize objects into meaningful
     * segments, such as department, location, or type of work. In QuickBooks, class
     * tracking is off by default. If a class is specified for the entire parent
     * transaction, it is automatically applied to all item lines unless overridden
     * here, at the transaction line level.
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
     * The customer or customer-job associated with this item line.
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
     * The site location where inventory for the item associated with this item line is
     * stored.
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
     * item associated with this item line is stored.
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
     * The item associated with this item line. This can refer to any good or service
     * that the business buys or sells, including item types such as a service item,
     * inventory item, or special calculation item like a discount item or sales-tax
     * item.
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

    /**
     * Specifies an alternative unit-of-measure set when updating this item line's
     * `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select
     * units from a different set than the item's default unit-of-measure set, which
     * remains unchanged on the item itself. The override applies only to this specific
     * line. For example, you can sell an item typically measured in volume units using
     * weight units in a specific transaction by specifying a different unit-of-measure
     * set with this field.
     */
    export interface OverrideUnitOfMeasureSet {
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
     * The item line's sales representative. Sales representatives can be employees,
     * vendors, or other names in QuickBooks.
     */
    export interface SalesRepresentative {
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
     * The sales-tax code for this item line, determining whether it is taxable or
     * non-taxable. If set, this overrides any sales-tax codes defined on the parent
     * transaction or the associated item.
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

  export interface LinkedTransaction {
    /**
     * The unique identifier assigned by QuickBooks to this linked transaction. This ID
     * is unique across all transaction types.
     */
    id: string;

    /**
     * The monetary amount of this linked transaction, represented as a decimal string.
     */
    amount: string | null;

    /**
     * Indicates the nature of the link between the transactions: `amount` denotes an
     * amount-based link (e.g., an invoice linked to a payment), and `quantity` denotes
     * a quantity-based link (e.g., an invoice created from a sales order based on the
     * quantity of items received).
     */
    linkType: 'amount' | 'quantity' | null;

    /**
     * The type of object. This value is always `"qbd_linked_transaction"`.
     */
    objectType: 'qbd_linked_transaction';

    /**
     * The case-sensitive user-defined reference number for this linked transaction,
     * which can be used to identify the transaction in QuickBooks. This value is not
     * required to be unique and can be arbitrarily changed by the QuickBooks user.
     */
    refNumber: string | null;

    /**
     * The date of this linked transaction, in ISO 8601 format (YYYY-MM-DD).
     */
    transactionDate: string;

    /**
     * The type of transaction for this linked transaction.
     */
    transactionType:
      | 'ar_refund_credit_card'
      | 'bill'
      | 'bill_payment_check'
      | 'bill_payment_credit_card'
      | 'build_assembly'
      | 'charge'
      | 'check'
      | 'credit_card_charge'
      | 'credit_card_credit'
      | 'credit_memo'
      | 'deposit'
      | 'estimate'
      | 'inventory_adjustment'
      | 'invoice'
      | 'item_receipt'
      | 'journal_entry'
      | 'liability_adjustment'
      | 'paycheck'
      | 'payroll_liability_check'
      | 'purchase_order'
      | 'receive_payment'
      | 'sales_order'
      | 'sales_receipt'
      | 'sales_tax_payment_check'
      | 'transfer'
      | 'vendor_credit'
      | 'ytd_adjustment';
  }

  /**
   * The Accounts-Payable (A/P) account to which this bill is assigned, used to track
   * the amount owed. If not specified, QuickBooks Desktop will use its default A/P
   * account.
   *
   * **IMPORTANT**: If this bill is linked to other transactions, this A/P account
   * must match the `payablesAccount` used in those other transactions.
   */
  export interface PayablesAccount {
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
   * The sales-tax code for this bill, determining whether it is taxable or
   * non-taxable. If set, this overrides any sales-tax codes defined on the vendor.
   * This can be overridden on the bill's individual lines.
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

  /**
   * The bill's payment terms, defining when payment is due and any applicable
   * discounts.
   */
  export interface Terms {
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
   * The vendor who sent this bill for goods or services purchased.
   */
  export interface Vendor {
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
   * The address of the vendor who sent this bill.
   */
  export interface VendorAddress {
    /**
     * The city, district, suburb, town, or village name of the address.
     */
    city: string | null;

    /**
     * The country name of the address.
     */
    country: string | null;

    /**
     * The first line of the address (e.g., street, PO Box, or company name).
     */
    line1: string | null;

    /**
     * The second line of the address, if needed (e.g., apartment, suite, unit, or
     * building).
     */
    line2: string | null;

    /**
     * The third line of the address, if needed.
     */
    line3: string | null;

    /**
     * The fourth line of the address, if needed.
     */
    line4: string | null;

    /**
     * The fifth line of the address, if needed.
     */
    line5: string | null;

    /**
     * A note written at the bottom of the address in the form in which it appears,
     * such as the invoice form.
     */
    note: string | null;

    /**
     * The postal code or ZIP code of the address.
     */
    postalCode: string | null;

    /**
     * The state, county, province, or region name of the address.
     */
    state: string | null;
  }
}

export interface BillCreateParams {
  /**
   * Body param: The date of this bill, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * Body param: The vendor who sent this bill for goods or services purchased.
   */
  vendorId: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;

  /**
   * Body param: The date by which this bill must be paid, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  dueDate?: string;

  /**
   * Body param: The market exchange rate between this bill's currency and the home
   * currency in QuickBooks at the time of this transaction. Represented as a decimal
   * value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).
   */
  exchangeRate?: number;

  /**
   * Body param: The bill's expense lines, each representing one line in this
   * expense.
   */
  expenseLines?: Array<BillCreateParams.ExpenseLine>;

  /**
   * Body param: A globally unique identifier (GUID) you can provide for tracking
   * this object in your external system.
   *
   * **IMPORTANT**: Must be formatted as a valid GUID; otherwise, QuickBooks will
   * return an error. This field is immutable and can only be set during object
   * creation.
   */
  externalId?: string;

  /**
   * Body param: The bill's item group lines, each representing a predefined set of
   * items bundled together because they are commonly purchased together or grouped
   * for faster entry.
   */
  itemLineGroups?: Array<BillCreateParams.ItemLineGroup>;

  /**
   * Body param: The bill's item lines, each representing the purchase of a specific
   * item or service.
   */
  itemLines?: Array<BillCreateParams.ItemLine>;

  /**
   * Body param: IDs of existing transactions that you wish to link to this bill,
   * such as payments applied, credits used, or associated purchase orders. Note that
   * this links entire transactions, not individual transaction lines. If you want to
   * link individual lines in a transaction, instead use the field
   * `linkToTransactionLine` on this bill's lines, if available.
   *
   * Transactions can only be linked when creating this bill and cannot be unlinked
   * later.
   *
   * You can use both `linkToTransactionIds` (on this bill) and
   * `linkToTransactionLine` (on its transaction lines) as long as they do NOT link
   * to the same transaction (otherwise, QuickBooks will return an error). QuickBooks
   * will also return an error if you attempt to link a transaction that is empty or
   * already closed.
   *
   * **IMPORTANT**: By default, QuickBooks will not return any information about the
   * linked transactions in this endpoint's response even when this request is
   * successful. To see the transactions linked via this field, refetch the bill and
   * check the `linkedTransactions` response field. If fetching a list of bills, you
   * must also specify the parameter `includeLinkedTransactions=true` to see the
   * `linkedTransactions` response field.
   */
  linkToTransactionIds?: Array<string>;

  /**
   * Body param: A memo or note for this bill that appears in the Accounts-Payable
   * register and in reports that include this bill.
   */
  memo?: string;

  /**
   * Body param: The Accounts-Payable (A/P) account to which this bill is assigned,
   * used to track the amount owed. If not specified, QuickBooks Desktop will use its
   * default A/P account.
   *
   * **IMPORTANT**: If this bill is linked to other transactions, this A/P account
   * must match the `payablesAccount` used in those other transactions.
   */
  payablesAccountId?: string;

  /**
   * Body param: The case-sensitive user-defined reference number for this bill,
   * which can be used to identify the transaction in QuickBooks. This value is not
   * required to be unique and can be arbitrarily changed by the QuickBooks user.
   */
  refNumber?: string;

  /**
   * Body param: The sales-tax code for this bill, determining whether it is taxable
   * or non-taxable. If set, this overrides any sales-tax codes defined on the
   * vendor. This can be overridden on the bill's individual lines.
   *
   * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
   * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
   * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
   * non-taxable code to all sales.
   */
  salesTaxCodeId?: string;

  /**
   * Body param: The bill's payment terms, defining when payment is due and any
   * applicable discounts.
   */
  termsId?: string;

  /**
   * Body param: The address of the vendor who sent this bill.
   */
  vendorAddress?: BillCreateParams.VendorAddress;
}

export namespace BillCreateParams {
  export interface ExpenseLine {
    /**
     * The expense account being debited (increased) for this expense line. The
     * corresponding account being credited is usually a liability account (e.g.,
     * Accounts-Payable) or an asset account (e.g., Cash), depending on the transaction
     * type.
     */
    accountId?: string;

    /**
     * The monetary amount of this expense line, represented as a decimal string.
     */
    amount?: string;

    /**
     * The billing status of this expense line.
     */
    billingStatus?: 'billable' | 'has_been_billed' | 'not_billable';

    /**
     * The expense line's class. Classes can be used to categorize objects into
     * meaningful segments, such as department, location, or type of work. In
     * QuickBooks, class tracking is off by default. If a class is specified for the
     * entire parent transaction, it is automatically applied to all expense lines
     * unless overridden here, at the transaction line level.
     */
    classId?: string;

    /**
     * The custom fields for the expense line object, added as user-defined data
     * extensions, not included in the standard QuickBooks object.
     */
    customFields?: Array<ExpenseLine.CustomField>;

    /**
     * A memo or note for this expense line.
     */
    memo?: string;

    /**
     * If `account` refers to an Accounts-Payable (A/P) account, `payee` refers to the
     * expense's vendor (not the customer). If `account` refers to any other type of
     * account, `payee` refers to the expense's customer (not the vendor).
     */
    payeeId?: string;

    /**
     * The expense line's sales representative. Sales representatives can be employees,
     * vendors, or other names in QuickBooks.
     */
    salesRepresentativeId?: string;

    /**
     * The sales-tax code for this expense line, determining whether it is taxable or
     * non-taxable. If set, this overrides any sales-tax codes defined on the parent
     * transaction or the associated item.
     *
     * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
     * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
     * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
     * non-taxable code to all sales.
     */
    salesTaxCodeId?: string;
  }

  export namespace ExpenseLine {
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
       * The value of this custom field. The maximum length depends on the field's data
       * type.
       */
      value: string;
    }
  }

  export interface ItemLineGroup {
    /**
     * The item line group's item group, representing a predefined set of items bundled
     * because they are commonly purchased together or grouped for faster entry.
     */
    itemGroupId: string;

    /**
     * The custom fields for the item line group object, added as user-defined data
     * extensions, not included in the standard QuickBooks object.
     */
    customFields?: Array<ItemLineGroup.CustomField>;

    /**
     * The site location where inventory for the item group associated with this item
     * line group is stored.
     */
    inventorySiteId?: string;

    /**
     * The specific location (e.g., bin or shelf) within the inventory site where the
     * item group associated with this item line group is stored.
     */
    inventorySiteLocationId?: string;

    /**
     * The quantity of the item group associated with this item line group. This field
     * cannot be cleared.
     */
    quantity?: number;

    /**
     * The unit-of-measure used for the `quantity` in this item line group. Must be a
     * valid unit within the item's available units of measure.
     */
    unitOfMeasure?: string;
  }

  export namespace ItemLineGroup {
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
       * The value of this custom field. The maximum length depends on the field's data
       * type.
       */
      value: string;
    }
  }

  export interface ItemLine {
    /**
     * The monetary amount of this item line, represented as a decimal string. If both
     * `quantity` and `cost` are specified but not `amount`, QuickBooks will use them
     * to calculate `amount`. If `amount`, `cost`, and `quantity` are all unspecified,
     * then QuickBooks will calculate `amount` based on a `quantity` of `1` and the
     * suggested `cost`. This field cannot be cleared.
     */
    amount?: string;

    /**
     * The billing status of this item line.
     */
    billingStatus?: 'billable' | 'has_been_billed' | 'not_billable';

    /**
     * The item line's class. Classes can be used to categorize objects into meaningful
     * segments, such as department, location, or type of work. In QuickBooks, class
     * tracking is off by default. If a class is specified for the entire parent
     * transaction, it is automatically applied to all item lines unless overridden
     * here, at the transaction line level.
     */
    classId?: string;

    /**
     * The cost of this item line, represented as a decimal string. If both `quantity`
     * and `amount` are specified but not `cost`, QuickBooks will use them to calculate
     * `cost`.
     */
    cost?: string;

    /**
     * The customer or customer-job associated with this item line.
     */
    customerId?: string;

    /**
     * The custom fields for the item line object, added as user-defined data
     * extensions, not included in the standard QuickBooks object.
     */
    customFields?: Array<ItemLine.CustomField>;

    /**
     * A description of this item line.
     */
    description?: string;

    /**
     * The expiration date for the serial number or lot number of the item associated
     * with this item line, in ISO 8601 format (YYYY-MM-DD). This is particularly
     * relevant for perishable or time-sensitive inventory items. Note that this field
     * is only supported on QuickBooks Desktop 2023 or later.
     */
    expirationDate?: string;

    /**
     * The site location where inventory for the item associated with this item line is
     * stored.
     */
    inventorySiteId?: string;

    /**
     * The specific location (e.g., bin or shelf) within the inventory site where the
     * item associated with this item line is stored.
     */
    inventorySiteLocationId?: string;

    /**
     * The item associated with this item line. This can refer to any good or service
     * that the business buys or sells, including item types such as a service item,
     * inventory item, or special calculation item like a discount item or sales-tax
     * item.
     */
    itemId?: string;

    /**
     * An existing transaction line that you wish to link to this item line. Note that
     * this only links to a single transaction line item, not an entire transaction. If
     * you want to link an entire transaction and bring in all its lines, instead use
     * the field `linkToTransactionIds` on the parent transaction, if available. If the
     * parent transaction is a bill or an item receipt, you can only link to purchase
     * orders; QuickBooks does not support linking these transactions to other
     * transaction types.
     *
     * Transaction lines can only be linked when creating this item line and cannot be
     * unlinked later.
     *
     * **IMPORTANT**: If you use `linkToTransactionLine` on this item line, you cannot
     * use the field `item` on this line (QuickBooks will return an error) because this
     * field brings in all of the item information you need. You can, however, specify
     * whatever `quantity` or `rate` that you want, or any other transaction line
     * element other than `item`.
     *
     * If the parent transaction supports the `linkToTransactionIds` field, you can use
     * both `linkToTransactionLine` (on this item line) and `linkToTransactionIds` (on
     * its parent transaction) in the same request as long as they do NOT link to the
     * same transaction (otherwise, QuickBooks will return an error). QuickBooks will
     * also return an error if you attempt to link a transaction that is empty or
     * already closed.
     *
     * **IMPORTANT**: By default, QuickBooks will not return any information about the
     * linked transaction line in this endpoint's response even when this request is
     * successful. To see the transaction line linked via this field, refetch the
     * parent transaction and check the `linkedTransactions` response field. If
     * fetching a list of transactions, you must also specify the parameter
     * `includeLinkedTransactions=true` to see the `linkedTransactions` response field.
     */
    linkToTransactionLine?: ItemLine.LinkToTransactionLine;

    /**
     * The lot number of the item associated with this item line. Used for tracking
     * groups of inventory items that are purchased or manufactured together.
     */
    lotNumber?: string;

    /**
     * The account to use for this item line, overriding the default account associated
     * with the item.
     */
    overrideItemAccountId?: string;

    /**
     * The quantity of the item associated with this item line. This field cannot be
     * cleared.
     */
    quantity?: number;

    /**
     * The item line's sales representative. Sales representatives can be employees,
     * vendors, or other names in QuickBooks.
     */
    salesRepresentativeId?: string;

    /**
     * The sales-tax code for this item line, determining whether it is taxable or
     * non-taxable. If set, this overrides any sales-tax codes defined on the parent
     * transaction or the associated item.
     *
     * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
     * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
     * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
     * non-taxable code to all sales.
     */
    salesTaxCodeId?: string;

    /**
     * The serial number of the item associated with this item line. This is used for
     * tracking individual units of serialized inventory items.
     */
    serialNumber?: string;

    /**
     * The unit-of-measure used for the `quantity` in this item line. Must be a valid
     * unit within the item's available units of measure.
     */
    unitOfMeasure?: string;
  }

  export namespace ItemLine {
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
       * The value of this custom field. The maximum length depends on the field's data
       * type.
       */
      value: string;
    }

    /**
     * An existing transaction line that you wish to link to this item line. Note that
     * this only links to a single transaction line item, not an entire transaction. If
     * you want to link an entire transaction and bring in all its lines, instead use
     * the field `linkToTransactionIds` on the parent transaction, if available. If the
     * parent transaction is a bill or an item receipt, you can only link to purchase
     * orders; QuickBooks does not support linking these transactions to other
     * transaction types.
     *
     * Transaction lines can only be linked when creating this item line and cannot be
     * unlinked later.
     *
     * **IMPORTANT**: If you use `linkToTransactionLine` on this item line, you cannot
     * use the field `item` on this line (QuickBooks will return an error) because this
     * field brings in all of the item information you need. You can, however, specify
     * whatever `quantity` or `rate` that you want, or any other transaction line
     * element other than `item`.
     *
     * If the parent transaction supports the `linkToTransactionIds` field, you can use
     * both `linkToTransactionLine` (on this item line) and `linkToTransactionIds` (on
     * its parent transaction) in the same request as long as they do NOT link to the
     * same transaction (otherwise, QuickBooks will return an error). QuickBooks will
     * also return an error if you attempt to link a transaction that is empty or
     * already closed.
     *
     * **IMPORTANT**: By default, QuickBooks will not return any information about the
     * linked transaction line in this endpoint's response even when this request is
     * successful. To see the transaction line linked via this field, refetch the
     * parent transaction and check the `linkedTransactions` response field. If
     * fetching a list of transactions, you must also specify the parameter
     * `includeLinkedTransactions=true` to see the `linkedTransactions` response field.
     */
    export interface LinkToTransactionLine {
      /**
       * The ID of the transaction to which to link this transaction.
       */
      transactionId: string;

      /**
       * The ID of the transaction line to which to link this transaction.
       */
      transactionLineId: string;
    }
  }

  /**
   * The address of the vendor who sent this bill.
   */
  export interface VendorAddress {
    /**
     * The city, district, suburb, town, or village name of the address.
     */
    city?: string;

    /**
     * The country name of the address.
     */
    country?: string;

    /**
     * The first line of the address (e.g., street, PO Box, or company name).
     */
    line1?: string;

    /**
     * The second line of the address, if needed (e.g., apartment, suite, unit, or
     * building).
     */
    line2?: string;

    /**
     * The third line of the address, if needed.
     */
    line3?: string;

    /**
     * The fourth line of the address, if needed.
     */
    line4?: string;

    /**
     * The fifth line of the address, if needed.
     */
    line5?: string;

    /**
     * A note written at the bottom of the address in the form in which it appears,
     * such as the invoice form.
     */
    note?: string;

    /**
     * The postal code or ZIP code of the address.
     */
    postalCode?: string;

    /**
     * The state, county, province, or region name of the address.
     */
    state?: string;
  }
}

export interface BillRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;
}

export interface BillUpdateParams {
  /**
   * Body param: The current revision number of the bill object you are updating,
   * which you can get by fetching the object first. Provide the most recent
   * `revisionNumber` to ensure you're working with the latest data; otherwise, the
   * update will return an error.
   */
  revisionNumber: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;

  /**
   * Body param: When `true`, removes all existing expense lines associated with this
   * bill. To modify or add individual expense lines, use the field `expenseLines`
   * instead.
   */
  clearExpenseLines?: boolean;

  /**
   * Body param: When `true`, removes all existing item lines associated with this
   * bill. To modify or add individual item lines, use the field `itemLines` instead.
   */
  clearItemLines?: boolean;

  /**
   * Body param: The date by which this bill must be paid, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  dueDate?: string;

  /**
   * Body param: The market exchange rate between this bill's currency and the home
   * currency in QuickBooks at the time of this transaction. Represented as a decimal
   * value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).
   */
  exchangeRate?: number;

  /**
   * Body param: The bill's expense lines, each representing one line in this
   * expense.
   *
   * **IMPORTANT**: When updating a bill's expense lines, this array completely
   * REPLACES all existing expense lines for that bill. To retain any current expense
   * lines, include them in this array, even if they have not changed. Any expense
   * lines not included will be removed. To add a new expense line, include it with
   * its `id` set to `-1`. If you do not wish to modify the expense lines, you can
   * omit this field entirely to keep them unchanged.
   */
  expenseLines?: Array<BillUpdateParams.ExpenseLine>;

  /**
   * Body param: The bill's item group lines, each representing a predefined set of
   * items bundled together because they are commonly purchased together or grouped
   * for faster entry.
   *
   * **IMPORTANT**: When updating a bill's item group lines, this array completely
   * REPLACES all existing item group lines for that bill. To retain any current item
   * group lines, include them in this array, even if they have not changed. Any item
   * group lines not included will be removed. To add a new item group line, include
   * it with its `id` set to `-1`. If you do not wish to modify the item group lines,
   * you can omit this field entirely to keep them unchanged.
   */
  itemLineGroups?: Array<BillUpdateParams.ItemLineGroup>;

  /**
   * Body param: The bill's item lines, each representing the purchase of a specific
   * item or service.
   *
   * **IMPORTANT**: When updating a bill's item lines, this array completely REPLACES
   * all existing item lines for that bill. To retain any current item lines, include
   * them in this array, even if they have not changed. Any item lines not included
   * will be removed. To add a new item line, include it with its `id` set to `-1`.
   * If you do not wish to modify the item lines, you can omit this field entirely to
   * keep them unchanged.
   */
  itemLines?: Array<BillUpdateParams.ItemLine>;

  /**
   * Body param: A memo or note for this bill that appears in the Accounts-Payable
   * register and in reports that include this bill.
   */
  memo?: string;

  /**
   * Body param: The Accounts-Payable (A/P) account to which this bill is assigned,
   * used to track the amount owed. If not specified, QuickBooks Desktop will use its
   * default A/P account.
   *
   * **IMPORTANT**: If this bill is linked to other transactions, this A/P account
   * must match the `payablesAccount` used in those other transactions.
   */
  payablesAccountId?: string;

  /**
   * Body param: The case-sensitive user-defined reference number for this bill,
   * which can be used to identify the transaction in QuickBooks. This value is not
   * required to be unique and can be arbitrarily changed by the QuickBooks user.
   */
  refNumber?: string;

  /**
   * Body param: The sales-tax code for this bill, determining whether it is taxable
   * or non-taxable. If set, this overrides any sales-tax codes defined on the
   * vendor. This can be overridden on the bill's individual lines.
   *
   * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
   * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
   * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
   * non-taxable code to all sales.
   */
  salesTaxCodeId?: string;

  /**
   * Body param: The bill's payment terms, defining when payment is due and any
   * applicable discounts.
   */
  termsId?: string;

  /**
   * Body param: The date of this bill, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate?: string;

  /**
   * Body param: The address of the vendor who sent this bill.
   */
  vendorAddress?: BillUpdateParams.VendorAddress;

  /**
   * Body param: The vendor who sent this bill for goods or services purchased.
   */
  vendorId?: string;
}

export namespace BillUpdateParams {
  export interface ExpenseLine {
    /**
     * The QuickBooks-assigned unique identifier of an existing expense line you wish
     * to retain or update.
     *
     * **IMPORTANT**: Set this field to `-1` for new expense lines you wish to add.
     */
    id: string;

    /**
     * The expense account being debited (increased) for this expense line. The
     * corresponding account being credited is usually a liability account (e.g.,
     * Accounts-Payable) or an asset account (e.g., Cash), depending on the transaction
     * type.
     */
    accountId?: string;

    /**
     * The monetary amount of this expense line, represented as a decimal string.
     */
    amount?: string;

    /**
     * The billing status of this expense line.
     */
    billingStatus?: 'billable' | 'has_been_billed' | 'not_billable';

    /**
     * The expense line's class. Classes can be used to categorize objects into
     * meaningful segments, such as department, location, or type of work. In
     * QuickBooks, class tracking is off by default. If a class is specified for the
     * entire parent transaction, it is automatically applied to all expense lines
     * unless overridden here, at the transaction line level.
     */
    classId?: string;

    /**
     * A memo or note for this expense line.
     */
    memo?: string;

    /**
     * If `account` refers to an Accounts-Payable (A/P) account, `payee` refers to the
     * expense's vendor (not the customer). If `account` refers to any other type of
     * account, `payee` refers to the expense's customer (not the vendor).
     */
    payeeId?: string;

    /**
     * The expense line's sales representative. Sales representatives can be employees,
     * vendors, or other names in QuickBooks.
     */
    salesRepresentativeId?: string;

    /**
     * The sales-tax code for this expense line, determining whether it is taxable or
     * non-taxable. If set, this overrides any sales-tax codes defined on the parent
     * transaction or the associated item.
     *
     * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
     * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
     * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
     * non-taxable code to all sales.
     */
    salesTaxCodeId?: string;
  }

  export interface ItemLineGroup {
    /**
     * The QuickBooks-assigned unique identifier of an existing item line group you
     * wish to retain or update.
     *
     * **IMPORTANT**: Set this field to `-1` for new item line groups you wish to add.
     */
    id: string;

    /**
     * The item line group's item group, representing a predefined set of items bundled
     * because they are commonly purchased together or grouped for faster entry.
     */
    itemGroupId?: string;

    /**
     * The item line group's item lines, each representing the purchase of a specific
     * item or service.
     *
     * **IMPORTANT**: When updating an item line group's item lines, this array
     * completely REPLACES all existing item lines for that item line group. To retain
     * any current item lines, include them in this array, even if they have not
     * changed. Any item lines not included will be removed. To add a new item line,
     * include it with its `id` set to `-1`. If you do not wish to modify the item
     * lines, you can omit this field entirely to keep them unchanged.
     */
    itemLines?: Array<ItemLineGroup.ItemLine>;

    /**
     * Specifies an alternative unit-of-measure set when updating this item line
     * group's `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to
     * select units from a different set than the item's default unit-of-measure set,
     * which remains unchanged on the item itself. The override applies only to this
     * specific line. For example, you can sell an item typically measured in volume
     * units using weight units in a specific transaction by specifying a different
     * unit-of-measure set with this field.
     */
    overrideUnitOfMeasureSetId?: string;

    /**
     * The quantity of the item group associated with this item line group. This field
     * cannot be cleared.
     */
    quantity?: number;

    /**
     * The unit-of-measure used for the `quantity` in this item line group. Must be a
     * valid unit within the item's available units of measure.
     */
    unitOfMeasure?: string;
  }

  export namespace ItemLineGroup {
    export interface ItemLine {
      /**
       * The QuickBooks-assigned unique identifier of an existing item line you wish to
       * retain or update.
       *
       * **IMPORTANT**: Set this field to `-1` for new item lines you wish to add.
       */
      id: string;

      /**
       * The monetary amount of this item line, represented as a decimal string. If both
       * `quantity` and `cost` are specified but not `amount`, QuickBooks will use them
       * to calculate `amount`. If `amount`, `cost`, and `quantity` are all unspecified,
       * then QuickBooks will calculate `amount` based on a `quantity` of `1` and the
       * suggested `cost`. This field cannot be cleared.
       */
      amount?: string;

      /**
       * The billing status of this item line.
       */
      billingStatus?: 'billable' | 'has_been_billed' | 'not_billable';

      /**
       * The item line's class. Classes can be used to categorize objects into meaningful
       * segments, such as department, location, or type of work. In QuickBooks, class
       * tracking is off by default. If a class is specified for the entire parent
       * transaction, it is automatically applied to all item lines unless overridden
       * here, at the transaction line level.
       */
      classId?: string;

      /**
       * The cost of this item line, represented as a decimal string. If both `quantity`
       * and `amount` are specified but not `cost`, QuickBooks will use them to calculate
       * `cost`.
       */
      cost?: string;

      /**
       * The customer or customer-job associated with this item line.
       */
      customerId?: string;

      /**
       * A description of this item line.
       */
      description?: string;

      /**
       * The expiration date for the serial number or lot number of the item associated
       * with this item line, in ISO 8601 format (YYYY-MM-DD). This is particularly
       * relevant for perishable or time-sensitive inventory items. Note that this field
       * is only supported on QuickBooks Desktop 2023 or later.
       */
      expirationDate?: string;

      /**
       * The site location where inventory for the item associated with this item line is
       * stored.
       */
      inventorySiteId?: string;

      /**
       * The specific location (e.g., bin or shelf) within the inventory site where the
       * item associated with this item line is stored.
       */
      inventorySiteLocationId?: string;

      /**
       * The item associated with this item line. This can refer to any good or service
       * that the business buys or sells, including item types such as a service item,
       * inventory item, or special calculation item like a discount item or sales-tax
       * item.
       */
      itemId?: string;

      /**
       * The lot number of the item associated with this item line. Used for tracking
       * groups of inventory items that are purchased or manufactured together.
       */
      lotNumber?: string;

      /**
       * The account to use for this item line, overriding the default account associated
       * with the item.
       */
      overrideItemAccountId?: string;

      /**
       * Specifies an alternative unit-of-measure set when updating this item line's
       * `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select
       * units from a different set than the item's default unit-of-measure set, which
       * remains unchanged on the item itself. The override applies only to this specific
       * line. For example, you can sell an item typically measured in volume units using
       * weight units in a specific transaction by specifying a different unit-of-measure
       * set with this field.
       */
      overrideUnitOfMeasureSetId?: string;

      /**
       * The quantity of the item associated with this item line. This field cannot be
       * cleared.
       */
      quantity?: number;

      /**
       * The item line's sales representative. Sales representatives can be employees,
       * vendors, or other names in QuickBooks.
       */
      salesRepresentativeId?: string;

      /**
       * The sales-tax code for this item line, determining whether it is taxable or
       * non-taxable. If set, this overrides any sales-tax codes defined on the parent
       * transaction or the associated item.
       *
       * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
       * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
       * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
       * non-taxable code to all sales.
       */
      salesTaxCodeId?: string;

      /**
       * The serial number of the item associated with this item line. This is used for
       * tracking individual units of serialized inventory items.
       */
      serialNumber?: string;

      /**
       * The unit-of-measure used for the `quantity` in this item line. Must be a valid
       * unit within the item's available units of measure.
       */
      unitOfMeasure?: string;
    }
  }

  export interface ItemLine {
    /**
     * The QuickBooks-assigned unique identifier of an existing item line you wish to
     * retain or update.
     *
     * **IMPORTANT**: Set this field to `-1` for new item lines you wish to add.
     */
    id: string;

    /**
     * The monetary amount of this item line, represented as a decimal string. If both
     * `quantity` and `cost` are specified but not `amount`, QuickBooks will use them
     * to calculate `amount`. If `amount`, `cost`, and `quantity` are all unspecified,
     * then QuickBooks will calculate `amount` based on a `quantity` of `1` and the
     * suggested `cost`. This field cannot be cleared.
     */
    amount?: string;

    /**
     * The billing status of this item line.
     */
    billingStatus?: 'billable' | 'has_been_billed' | 'not_billable';

    /**
     * The item line's class. Classes can be used to categorize objects into meaningful
     * segments, such as department, location, or type of work. In QuickBooks, class
     * tracking is off by default. If a class is specified for the entire parent
     * transaction, it is automatically applied to all item lines unless overridden
     * here, at the transaction line level.
     */
    classId?: string;

    /**
     * The cost of this item line, represented as a decimal string. If both `quantity`
     * and `amount` are specified but not `cost`, QuickBooks will use them to calculate
     * `cost`.
     */
    cost?: string;

    /**
     * The customer or customer-job associated with this item line.
     */
    customerId?: string;

    /**
     * A description of this item line.
     */
    description?: string;

    /**
     * The expiration date for the serial number or lot number of the item associated
     * with this item line, in ISO 8601 format (YYYY-MM-DD). This is particularly
     * relevant for perishable or time-sensitive inventory items. Note that this field
     * is only supported on QuickBooks Desktop 2023 or later.
     */
    expirationDate?: string;

    /**
     * The site location where inventory for the item associated with this item line is
     * stored.
     */
    inventorySiteId?: string;

    /**
     * The specific location (e.g., bin or shelf) within the inventory site where the
     * item associated with this item line is stored.
     */
    inventorySiteLocationId?: string;

    /**
     * The item associated with this item line. This can refer to any good or service
     * that the business buys or sells, including item types such as a service item,
     * inventory item, or special calculation item like a discount item or sales-tax
     * item.
     */
    itemId?: string;

    /**
     * The lot number of the item associated with this item line. Used for tracking
     * groups of inventory items that are purchased or manufactured together.
     */
    lotNumber?: string;

    /**
     * The account to use for this item line, overriding the default account associated
     * with the item.
     */
    overrideItemAccountId?: string;

    /**
     * Specifies an alternative unit-of-measure set when updating this item line's
     * `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to select
     * units from a different set than the item's default unit-of-measure set, which
     * remains unchanged on the item itself. The override applies only to this specific
     * line. For example, you can sell an item typically measured in volume units using
     * weight units in a specific transaction by specifying a different unit-of-measure
     * set with this field.
     */
    overrideUnitOfMeasureSetId?: string;

    /**
     * The quantity of the item associated with this item line. This field cannot be
     * cleared.
     */
    quantity?: number;

    /**
     * The item line's sales representative. Sales representatives can be employees,
     * vendors, or other names in QuickBooks.
     */
    salesRepresentativeId?: string;

    /**
     * The sales-tax code for this item line, determining whether it is taxable or
     * non-taxable. If set, this overrides any sales-tax codes defined on the parent
     * transaction or the associated item.
     *
     * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
     * can also be created in QuickBooks. If QuickBooks is not set up to charge sales
     * tax (via the "Do You Charge Sales Tax?" preference), it will assign the default
     * non-taxable code to all sales.
     */
    salesTaxCodeId?: string;

    /**
     * The serial number of the item associated with this item line. This is used for
     * tracking individual units of serialized inventory items.
     */
    serialNumber?: string;

    /**
     * The unit-of-measure used for the `quantity` in this item line. Must be a valid
     * unit within the item's available units of measure.
     */
    unitOfMeasure?: string;
  }

  /**
   * The address of the vendor who sent this bill.
   */
  export interface VendorAddress {
    /**
     * The city, district, suburb, town, or village name of the address.
     */
    city?: string;

    /**
     * The country name of the address.
     */
    country?: string;

    /**
     * The first line of the address (e.g., street, PO Box, or company name).
     */
    line1?: string;

    /**
     * The second line of the address, if needed (e.g., apartment, suite, unit, or
     * building).
     */
    line2?: string;

    /**
     * The third line of the address, if needed.
     */
    line3?: string;

    /**
     * The fourth line of the address, if needed.
     */
    line4?: string;

    /**
     * The fifth line of the address, if needed.
     */
    line5?: string;

    /**
     * A note written at the bottom of the address in the form in which it appears,
     * such as the invoice form.
     */
    note?: string;

    /**
     * The postal code or ZIP code of the address.
     */
    postalCode?: string;

    /**
     * The state, county, province, or region name of the address.
     */
    state?: string;
  }
}

export interface BillListParams extends CursorPageParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;

  /**
   * Query param: Filter for bills associated with these accounts.
   */
  accountIds?: Array<string>;

  /**
   * Query param: Filter for bills in these currencies.
   */
  currencyIds?: Array<string>;

  /**
   * Query param: Filter for specific bills by their QuickBooks-assigned unique
   * identifier(s).
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   */
  ids?: Array<string>;

  /**
   * Query param: Whether to include line items in the response. Defaults to `true`.
   */
  includeLineItems?: boolean;

  /**
   * Query param: Whether to include linked transactions in the response. Defaults to
   * `false`. For example, a payment linked to the corresponding bill.
   */
  includeLinkedTransactions?: boolean;

  /**
   * Query param: Filter for bills that are paid, not paid, or both.
   */
  paymentStatus?: 'all' | 'paid' | 'not_paid';

  /**
   * Query param: Filter for bills whose `refNumber` contains this substring. NOTE:
   * If you use this parameter, you cannot also use `refNumberStartsWith` or
   * `refNumberEndsWith`.
   */
  refNumberContains?: string;

  /**
   * Query param: Filter for bills whose `refNumber` ends with this substring. NOTE:
   * If you use this parameter, you cannot also use `refNumberContains` or
   * `refNumberStartsWith`.
   */
  refNumberEndsWith?: string;

  /**
   * Query param: Filter for bills whose `refNumber` is greater than or equal to this
   * value. If omitted, the range will begin with the first number of the list. Uses
   * a numerical comparison for values that contain only digits; otherwise, uses a
   * lexicographical comparison.
   */
  refNumberFrom?: string;

  /**
   * Query param: Filter for specific bills by their ref-number(s), case-sensitive.
   * In QuickBooks, ref-numbers are not required to be unique and can be arbitrarily
   * changed by the QuickBooks user.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   */
  refNumbers?: Array<string>;

  /**
   * Query param: Filter for bills whose `refNumber` starts with this substring.
   * NOTE: If you use this parameter, you cannot also use `refNumberContains` or
   * `refNumberEndsWith`.
   */
  refNumberStartsWith?: string;

  /**
   * Query param: Filter for bills whose `refNumber` is less than or equal to this
   * value. If omitted, the range will end with the last number of the list. Uses a
   * numerical comparison for values that contain only digits; otherwise, uses a
   * lexicographical comparison.
   */
  refNumberTo?: string;

  /**
   * Query param: Filter for bills created on or after this date, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  transactionDateFrom?: string;

  /**
   * Query param: Filter for bills created on or before this date, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  transactionDateTo?: string;

  /**
   * Query param: Filter for bills updated on or after this date and time, in ISO
   * 8601 format (YYYY-MM-DDTHH:mm:ss). If you only provide a date (YYYY-MM-DD), the
   * time is assumed to be 00:00:00 of that day.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for bills updated on or before this date and time, in ISO
   * 8601 format (YYYY-MM-DDTHH:mm:ss). If you only provide a date (YYYY-MM-DD), the
   * time is assumed to be 23:59:59 of that day.
   */
  updatedBefore?: string;

  /**
   * Query param: Filter for bills received from these vendors.
   */
  vendorIds?: Array<string>;
}

Bills.BillsCursorPage = BillsCursorPage;

export declare namespace Bills {
  export {
    type Bill as Bill,
    BillsCursorPage as BillsCursorPage,
    type BillCreateParams as BillCreateParams,
    type BillRetrieveParams as BillRetrieveParams,
    type BillUpdateParams as BillUpdateParams,
    type BillListParams as BillListParams,
  };
}
