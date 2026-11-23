// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class CreditCardCharges extends APIResource {
  /**
   * Creates a new credit card charge for the specified account.
   *
   * @example
   * ```ts
   * const creditCardCharge =
   *   await conductor.qbd.creditCardCharges.create({
   *     accountId: '80000001-1234567890',
   *     transactionDate: '2024-10-01',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(params: CreditCardChargeCreateParams, options?: RequestOptions): APIPromise<CreditCardCharge> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/credit-card-charges', {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Retrieves a credit card charge by ID.
   *
   * **IMPORTANT:** If you need to fetch multiple specific credit card charges by ID,
   * use the list endpoint instead with the `ids` parameter. It accepts an array of
   * IDs so you can batch the request into a single call, which is significantly
   * faster.
   *
   * @example
   * ```ts
   * const creditCardCharge =
   *   await conductor.qbd.creditCardCharges.retrieve(
   *     '123ABC-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: CreditCardChargeRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<CreditCardCharge> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get(path`/quickbooks-desktop/credit-card-charges/${id}`, {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Updates an existing credit card charge so you can adjust the credit card
   * account, payee, memo, transaction date, and expense or item lines. The total is
   * recalculated from the line details.
   *
   * **NOTE:** If you include `expenseLines`, `itemLines`, or `itemGroupLines`,
   * QuickBooks Desktop replaces each included line list with the array you send, so
   * include unchanged lines you want to keep and use `id: "-1"` for new lines.
   *
   * @example
   * ```ts
   * const creditCardCharge =
   *   await conductor.qbd.creditCardCharges.update(
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
    params: CreditCardChargeUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CreditCardCharge> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(path`/quickbooks-desktop/credit-card-charges/${id}`, {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Returns a list of credit card charges. Use the `cursor` parameter to paginate
   * through the results.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const creditCardCharge of conductor.qbd.creditCardCharges.list(
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    params: CreditCardChargeListParams,
    options?: RequestOptions,
  ): PagePromise<CreditCardChargesCursorPage, CreditCardCharge> {
    const { conductorEndUserId, ...query } = params;
    return this._client.getAPIList('/quickbooks-desktop/credit-card-charges', CursorPage<CreditCardCharge>, {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Permanently deletes a credit card charge. The deletion will fail if the credit
   * card charge is currently in use or has any linked transactions that are in use.
   *
   * @example
   * ```ts
   * const creditCardCharge =
   *   await conductor.qbd.creditCardCharges.delete(
   *     '123ABC-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  delete(
    id: string,
    params: CreditCardChargeDeleteParams,
    options?: RequestOptions,
  ): APIPromise<CreditCardChargeDeleteResponse> {
    const { conductorEndUserId } = params;
    return this._client.delete(path`/quickbooks-desktop/credit-card-charges/${id}`, {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Sets or clears custom field values on a credit card charge and its lines. Custom
   * fields defined for items go on the lines, and those defined for customers,
   * vendors, and employees go on the credit card charge itself. Each value you send
   * replaces the custom field's current one, and an empty string clears it. Custom
   * fields you leave out keep their values.
   *
   * If QuickBooks does not save every value, the request fails with an error naming
   * the custom fields that were not saved. The others stay saved, because QuickBooks
   * saves each value separately. Sending the same request again is safe.
   *
   * **NOTE**: This request takes no `revisionNumber` but changes the credit card
   * charge's, so use the one in the response for your next update.
   *
   * @example
   * ```ts
   * const creditCardCharge =
   *   await conductor.qbd.creditCardCharges.setCustomFields(
   *     '123ABC-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  setCustomFields(
    id: string,
    params: CreditCardChargeSetCustomFieldsParams,
    options?: RequestOptions,
  ): APIPromise<CreditCardCharge> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(path`/quickbooks-desktop/credit-card-charges/${id}/set-custom-fields`, {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Voids a credit card charge by setting its amount to zero while keeping a record
   * of it in QuickBooks. The void will fail if the credit card charge is currently
   * in use or has any linked transactions that are in use.
   *
   * @example
   * ```ts
   * const response = await conductor.qbd.creditCardCharges.void(
   *   '123ABC-1234567890',
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * );
   * ```
   */
  void(
    id: string,
    params: CreditCardChargeVoidParams,
    options?: RequestOptions,
  ): APIPromise<CreditCardChargeVoidResponse> {
    const { conductorEndUserId } = params;
    return this._client.post(path`/quickbooks-desktop/credit-card-charges/${id}/void`, {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }
}

export type CreditCardChargesCursorPage = CursorPage<CreditCardCharge>;

export interface CreditCardCharge {
  /**
   * The unique identifier assigned by QuickBooks to this credit card charge. This ID
   * is unique across all transaction types.
   */
  id: string;

  /**
   * The bank or credit card account to which money is owed for this credit card
   * charge.
   */
  account: CreditCardCharge.Account;

  /**
   * The total monetary amount of this credit card charge, represented as a decimal
   * string. This equals the sum of the amounts in the credit card charge's expense
   * lines, item lines, and item group lines.
   */
  amount: string;

  /**
   * The monetary amount of this credit card charge converted to the home currency of
   * the QuickBooks company file. Represented as a decimal string.
   */
  amountInHomeCurrency: string | null;

  /**
   * The date and time when this credit card charge was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The credit card charge's currency. For built-in currencies, the name and code
   * are standard ISO 4217 international values. For user-defined currencies, all
   * values are editable.
   */
  currency: CreditCardCharge.Currency | null;

  /**
   * The custom fields that have a value on this credit card charge, for the owners
   * named in the request's `customFieldOwnerIds` (by default, the public custom
   * fields).
   *
   * **NOTE**: To set or clear custom field values, use the set-custom-fields
   * endpoint. An update cannot change them, and its response returns this as an
   * empty array even when values exist; retrieve the record to see them.
   */
  customFields: Array<CreditCardCharge.CustomField>;

  /**
   * The market exchange rate between this credit card charge's currency and the home
   * currency in QuickBooks at the time of this transaction. Represented as a decimal
   * value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).
   */
  exchangeRate: number | null;

  /**
   * The credit card charge's expense lines, each representing one line in this
   * expense.
   */
  expenseLines: Array<CreditCardCharge.ExpenseLine>;

  /**
   * A globally unique identifier (GUID) you, the developer, can provide for tracking
   * this object in your external system. This field is immutable and can only be set
   * during object creation.
   */
  externalId: string | null;

  /**
   * The credit card charge's item group lines, each representing a predefined set of
   * items bundled together because they are commonly purchased together or grouped
   * for faster entry.
   */
  itemGroupLines: Array<CreditCardCharge.ItemGroupLine>;

  /**
   * The credit card charge's item lines, each representing the purchase of a
   * specific item or service.
   */
  itemLines: Array<CreditCardCharge.ItemLine>;

  /**
   * A memo or note for this credit card charge.
   */
  memo: string | null;

  /**
   * The type of object. This value is always `"qbd_credit_card_charge"`.
   */
  objectType: 'qbd_credit_card_charge';

  /**
   * The vendor or company from whom merchandise or services were purchased for this
   * credit card charge.
   */
  payee: CreditCardCharge.Payee | null;

  /**
   * The case-sensitive user-defined reference number for this credit card charge,
   * which can be used to identify the transaction in QuickBooks. This value is not
   * required to be unique and can be arbitrarily changed by the QuickBooks user.
   */
  refNumber: string | null;

  /**
   * The current QuickBooks-assigned revision number of this credit card charge
   * object, which changes each time the object is modified. When updating this
   * object, you must provide the most recent `revisionNumber` to ensure you're
   * working with the latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The sales-tax code for this credit card charge, determining whether it is
   * taxable or non-taxable. If set, this overrides any sales-tax codes defined on
   * the payee. This can be overridden on the credit card charge's individual lines.
   *
   * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
   * can also be created in QuickBooks Desktop. If QuickBooks Desktop is not set up
   * to charge sales tax (via the "Do You Charge Sales Tax?" preference), it assigns
   * the default non-taxable sales-tax code configured in the company file to all
   * sales.
   */
  salesTaxCode: CreditCardCharge.SalesTaxCode | null;

  /**
   * The date of this credit card charge, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * The date and time when this credit card charge was last updated, in ISO 8601
   * format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the
   * local timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace CreditCardCharge {
  /**
   * The bank or credit card account to which money is owed for this credit card
   * charge.
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
   * The credit card charge's currency. For built-in currencies, the name and code
   * are standard ISO 4217 international values. For user-defined currencies, all
   * values are editable.
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
     * The value of this custom field.
     */
    value: string;
  }

  export interface ExpenseLine {
    /**
     * The unique identifier assigned by QuickBooks to this expense line. This ID is
     * unique across all transaction line types. If QuickBooks omits the identifier,
     * this is null.
     */
    id: string | null;

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
     * The custom fields that have a value on this expense line, for the owners named
     * in the request's `customFieldOwnerIds` (by default, the public custom fields).
     *
     * **NOTE**: To set or clear custom field values, use the transaction's
     * set-custom-fields endpoint. An update cannot change them, and its response
     * returns this as an empty array even when values exist; retrieve the transaction
     * to see them.
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
     * can also be created in QuickBooks Desktop. If QuickBooks Desktop is not set up
     * to charge sales tax (via the "Do You Charge Sales Tax?" preference), it assigns
     * the default non-taxable sales-tax code configured in the company file to all
     * sales.
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
       * The value of this custom field.
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
     * can also be created in QuickBooks Desktop. If QuickBooks Desktop is not set up
     * to charge sales tax (via the "Do You Charge Sales Tax?" preference), it assigns
     * the default non-taxable sales-tax code configured in the company file to all
     * sales.
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

  export interface ItemGroupLine {
    /**
     * The unique identifier assigned by QuickBooks to this item group line. This ID is
     * unique across all transaction line types.
     */
    id: string;

    /**
     * The custom fields that have a value on this item group line, for the owners
     * named in the request's `customFieldOwnerIds` (by default, the public custom
     * fields).
     *
     * **NOTE**: To set or clear custom field values, use the transaction's
     * set-custom-fields endpoint. An update cannot change them, and its response
     * returns this as an empty array even when values exist; retrieve the transaction
     * to see them.
     */
    customFields: Array<ItemGroupLine.CustomField>;

    /**
     * A description of this item group line.
     */
    description: string | null;

    /**
     * The item group line's item group, representing a predefined set of items bundled
     * because they are commonly purchased together or grouped for faster entry.
     */
    itemGroup: ItemGroupLine.ItemGroup;

    /**
     * The item group line's item lines, each representing the purchase of a specific
     * item or service.
     */
    itemLines: Array<ItemGroupLine.ItemLine>;

    /**
     * The type of object. This value is always `"qbd_item_group_line"`.
     */
    objectType: 'qbd_item_group_line';

    /**
     * Specifies an alternative unit-of-measure set when updating this item group
     * line's `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to
     * select units from a different set than the item's default unit-of-measure set,
     * which remains unchanged on the item itself. The override applies only to this
     * specific line. For example, you can sell an item typically measured in volume
     * units using weight units in a specific transaction by specifying a different
     * unit-of-measure set with this field.
     *
     * IMPORTANT: Right after QuickBooks Desktop launches, it can briefly report an
     * alternate `id` for a unit-of-measure set, so match on `fullName` when joining to
     * the unit-of-measure sets list.
     */
    overrideUnitOfMeasureSet: ItemGroupLine.OverrideUnitOfMeasureSet | null;

    /**
     * The quantity of the item group associated with this item group line. This field
     * cannot be cleared.
     *
     * **NOTE**: Do not use this field if the associated item group is a discount item
     * group.
     */
    quantity: number | null;

    /**
     * The total monetary amount of this item group line, equivalent to the sum of the
     * amounts in `lines`, represented as a decimal string.
     */
    totalAmount: string;

    /**
     * The unit-of-measure used for the `quantity` in this item group line. Must be a
     * valid unit within the item's available units of measure.
     */
    unitOfMeasure: string | null;
  }

  export namespace ItemGroupLine {
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
       * The value of this custom field.
       */
      value: string;
    }

    /**
     * The item group line's item group, representing a predefined set of items bundled
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
       * The custom fields that have a value on this item line, for the owners named in
       * the request's `customFieldOwnerIds` (by default, the public custom fields).
       *
       * **NOTE**: To set or clear custom field values, use the transaction's
       * set-custom-fields endpoint. An update cannot change them, and its response
       * returns this as an empty array even when values exist; retrieve the transaction
       * to see them.
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
       *
       * IMPORTANT: Right after QuickBooks Desktop launches, it can briefly report an
       * alternate `id` for a unit-of-measure set, so match on `fullName` when joining to
       * the unit-of-measure sets list.
       */
      overrideUnitOfMeasureSet: ItemLine.OverrideUnitOfMeasureSet | null;

      /**
       * The quantity of the item associated with this item line. This field cannot be
       * cleared.
       *
       * **NOTE**: Do not use this field if the associated item is a discount item.
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
       * can also be created in QuickBooks Desktop. If QuickBooks Desktop is not set up
       * to charge sales tax (via the "Do You Charge Sales Tax?" preference), it assigns
       * the default non-taxable sales-tax code configured in the company file to all
       * sales.
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
         * The value of this custom field.
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
       *
       * IMPORTANT: Right after QuickBooks Desktop launches, it can briefly report an
       * alternate `id` for a unit-of-measure set, so match on `fullName` when joining to
       * the unit-of-measure sets list.
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
       * can also be created in QuickBooks Desktop. If QuickBooks Desktop is not set up
       * to charge sales tax (via the "Do You Charge Sales Tax?" preference), it assigns
       * the default non-taxable sales-tax code configured in the company file to all
       * sales.
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
     * Specifies an alternative unit-of-measure set when updating this item group
     * line's `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to
     * select units from a different set than the item's default unit-of-measure set,
     * which remains unchanged on the item itself. The override applies only to this
     * specific line. For example, you can sell an item typically measured in volume
     * units using weight units in a specific transaction by specifying a different
     * unit-of-measure set with this field.
     *
     * IMPORTANT: Right after QuickBooks Desktop launches, it can briefly report an
     * alternate `id` for a unit-of-measure set, so match on `fullName` when joining to
     * the unit-of-measure sets list.
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
     * The custom fields that have a value on this item line, for the owners named in
     * the request's `customFieldOwnerIds` (by default, the public custom fields).
     *
     * **NOTE**: To set or clear custom field values, use the transaction's
     * set-custom-fields endpoint. An update cannot change them, and its response
     * returns this as an empty array even when values exist; retrieve the transaction
     * to see them.
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
     *
     * IMPORTANT: Right after QuickBooks Desktop launches, it can briefly report an
     * alternate `id` for a unit-of-measure set, so match on `fullName` when joining to
     * the unit-of-measure sets list.
     */
    overrideUnitOfMeasureSet: ItemLine.OverrideUnitOfMeasureSet | null;

    /**
     * The quantity of the item associated with this item line. This field cannot be
     * cleared.
     *
     * **NOTE**: Do not use this field if the associated item is a discount item.
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
     * can also be created in QuickBooks Desktop. If QuickBooks Desktop is not set up
     * to charge sales tax (via the "Do You Charge Sales Tax?" preference), it assigns
     * the default non-taxable sales-tax code configured in the company file to all
     * sales.
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
       * The value of this custom field.
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
     *
     * IMPORTANT: Right after QuickBooks Desktop launches, it can briefly report an
     * alternate `id` for a unit-of-measure set, so match on `fullName` when joining to
     * the unit-of-measure sets list.
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
     * can also be created in QuickBooks Desktop. If QuickBooks Desktop is not set up
     * to charge sales tax (via the "Do You Charge Sales Tax?" preference), it assigns
     * the default non-taxable sales-tax code configured in the company file to all
     * sales.
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
   * The vendor or company from whom merchandise or services were purchased for this
   * credit card charge.
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
   * The sales-tax code for this credit card charge, determining whether it is
   * taxable or non-taxable. If set, this overrides any sales-tax codes defined on
   * the payee. This can be overridden on the credit card charge's individual lines.
   *
   * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
   * can also be created in QuickBooks Desktop. If QuickBooks Desktop is not set up
   * to charge sales tax (via the "Do You Charge Sales Tax?" preference), it assigns
   * the default non-taxable sales-tax code configured in the company file to all
   * sales.
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

export interface CreditCardChargeDeleteResponse {
  /**
   * The QuickBooks-assigned unique identifier of the deleted credit card charge.
   */
  id: string;

  /**
   * Indicates whether the credit card charge was deleted.
   */
  deleted: boolean;

  /**
   * The type of object. This value is always `"qbd_credit_card_charge"`.
   */
  objectType: 'qbd_credit_card_charge';

  /**
   * The case-sensitive user-defined reference number of the deleted credit card
   * charge.
   */
  refNumber: string | null;
}

export interface CreditCardChargeVoidResponse {
  /**
   * The QuickBooks-assigned unique identifier of the voided credit card charge.
   */
  id: string;

  /**
   * The date and time when this credit card charge was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss+hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string | null;

  /**
   * The type of object. This value is always `"qbd_credit_card_charge"`.
   */
  objectType: 'qbd_credit_card_charge';

  /**
   * The case-sensitive user-defined reference number of the voided credit card
   * charge.
   */
  refNumber: string | null;

  /**
   * The date and time when this credit card charge was last updated, in ISO 8601
   * format (YYYY-MM-DDThh:mm:ss+hh:mm), which QuickBooks Desktop interprets in the
   * local timezone of the end-user's computer.
   */
  updatedAt: string | null;

  /**
   * Indicates whether the credit card charge was voided.
   */
  voided: boolean;
}

export interface CreditCardChargeCreateParams {
  /**
   * Body param: The bank or credit card account to which money is owed for this
   * credit card charge.
   */
  accountId: string;

  /**
   * Body param: The date of this credit card charge, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Body param: The market exchange rate between this credit card charge's currency
   * and the home currency in QuickBooks at the time of this transaction. Represented
   * as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home
   * currency).
   */
  exchangeRate?: number;

  /**
   * Body param: The credit card charge's expense lines, each representing one line
   * in this expense.
   */
  expenseLines?: Array<CreditCardChargeCreateParams.ExpenseLine>;

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
   * Body param: The credit card charge's item group lines, each representing a
   * predefined set of items bundled together because they are commonly purchased
   * together or grouped for faster entry.
   */
  itemGroupLines?: Array<CreditCardChargeCreateParams.ItemGroupLine>;

  /**
   * Body param: The credit card charge's item lines, each representing the purchase
   * of a specific item or service.
   */
  itemLines?: Array<CreditCardChargeCreateParams.ItemLine>;

  /**
   * Body param: A memo or note for this credit card charge.
   *
   * Maximum length: 4095 characters.
   */
  memo?: string;

  /**
   * Body param: The vendor or company from whom merchandise or services were
   * purchased for this credit card charge.
   */
  payeeId?: string;

  /**
   * Body param: The case-sensitive user-defined reference number for this credit
   * card charge, which can be used to identify the transaction in QuickBooks. This
   * value is not required to be unique and can be arbitrarily changed by the
   * QuickBooks user. When left blank in this create request, this field will be left
   * blank in QuickBooks (i.e., it does _not_ auto-increment).
   *
   * Maximum length: 11 characters.
   */
  refNumber?: string;

  /**
   * Body param: The sales-tax code for this credit card charge, determining whether
   * it is taxable or non-taxable. If set, this overrides any sales-tax codes defined
   * on the payee. This can be overridden on the credit card charge's individual
   * lines.
   *
   * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
   * can also be created in QuickBooks Desktop. If QuickBooks Desktop is not set up
   * to charge sales tax (via the "Do You Charge Sales Tax?" preference), it assigns
   * the default non-taxable sales-tax code configured in the company file to all
   * sales.
   */
  salesTaxCodeId?: string;
}

export namespace CreditCardChargeCreateParams {
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
     *
     * Decimal string format: exactly 2 decimal places when cents are included and up
     * to 13 digits before the decimal point (for example, "123.45").
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
     * The custom field values to set on this expense line when it is created. To
     * change them afterward, use the transaction's set-custom-fields endpoint.
     */
    customFields?: Array<ExpenseLine.CustomField>;

    /**
     * A memo or note for this expense line.
     *
     * Maximum length: 4095 characters.
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
     * can also be created in QuickBooks Desktop. If QuickBooks Desktop is not set up
     * to charge sales tax (via the "Do You Charge Sales Tax?" preference), it assigns
     * the default non-taxable sales-tax code configured in the company file to all
     * sales.
     */
    salesTaxCodeId?: string;
  }

  export namespace ExpenseLine {
    export interface CustomField {
      /**
       * The name of the custom field, unique for the specified `ownerId`. For public
       * custom fields, this name is visible as a label in the QuickBooks UI.
       *
       * Maximum length: 31 characters.
       */
      name: string;

      /**
       * The owner of this custom field: `"0"` for a public custom field, which
       * QuickBooks users define and see, or an application's GUID in braces for a
       * private custom field, which appears only in requests that name that owner.
       */
      ownerId: string;

      /**
       * The value of this custom field. A public custom field's value can have at most
       * 30 characters.
       */
      value: string;
    }
  }

  export interface ItemGroupLine {
    /**
     * The item group line's item group, representing a predefined set of items bundled
     * because they are commonly purchased together or grouped for faster entry.
     */
    itemGroupId: string;

    /**
     * The custom field values to set on this item group line when it is created. To
     * change them afterward, use the transaction's set-custom-fields endpoint.
     */
    customFields?: Array<ItemGroupLine.CustomField>;

    /**
     * The site location where inventory for the item group associated with this item
     * group line is stored.
     */
    inventorySiteId?: string;

    /**
     * The specific location (e.g., bin or shelf) within the inventory site where the
     * item group associated with this item group line is stored.
     */
    inventorySiteLocationId?: string;

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
     *
     * Maximum length: 31 characters.
     */
    unitOfMeasure?: string;
  }

  export namespace ItemGroupLine {
    export interface CustomField {
      /**
       * The name of the custom field, unique for the specified `ownerId`. For public
       * custom fields, this name is visible as a label in the QuickBooks UI.
       *
       * Maximum length: 31 characters.
       */
      name: string;

      /**
       * The owner of this custom field: `"0"` for a public custom field, which
       * QuickBooks users define and see, or an application's GUID in braces for a
       * private custom field, which appears only in requests that name that owner.
       */
      ownerId: string;

      /**
       * The value of this custom field. A public custom field's value can have at most
       * 30 characters.
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
     *
     * Decimal string format: exactly 2 decimal places when cents are included and up
     * to 13 digits before the decimal point (for example, "123.45").
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
     *
     * Decimal string format: up to 5 decimal places and up to 10 digits before the
     * decimal point (for example, "123.45").
     */
    cost?: string;

    /**
     * The customer or customer-job associated with this item line.
     */
    customerId?: string;

    /**
     * The custom field values to set on this item line when it is created. To change
     * them afterward, use the transaction's set-custom-fields endpoint.
     */
    customFields?: Array<ItemLine.CustomField>;

    /**
     * A description of this item line.
     *
     * Maximum length: 4095 characters.
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
     * use the field `itemId` on this line (QuickBooks will return an error) because
     * this field brings in all of the item information you need. You can, however,
     * specify whatever `quantity` or `cost` that you want, or any other transaction
     * line element other than `itemId`.
     *
     * If the parent transaction supports the `linkToTransactionIds` field, you can use
     * both `linkToTransactionLine` (on this item line) and `linkToTransactionIds` (on
     * its parent transaction) in the same request as long as they do NOT link to the
     * same transaction (otherwise, QuickBooks will return an error). QuickBooks will
     * also return an error if you attempt to link a transaction that is empty or
     * already closed, or if lines linking to the same transaction are not in that
     * transaction's line order.
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
     *
     * Maximum length: 40 characters.
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
     *
     * **NOTE**: Do not use this field if the associated item is a discount item.
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
     * can also be created in QuickBooks Desktop. If QuickBooks Desktop is not set up
     * to charge sales tax (via the "Do You Charge Sales Tax?" preference), it assigns
     * the default non-taxable sales-tax code configured in the company file to all
     * sales.
     */
    salesTaxCodeId?: string;

    /**
     * The serial number of the item associated with this item line. This is used for
     * tracking individual units of serialized inventory items.
     *
     * Maximum length: 4095 characters.
     */
    serialNumber?: string;

    /**
     * The unit-of-measure used for the `quantity` in this item line. Must be a valid
     * unit within the item's available units of measure.
     *
     * Maximum length: 31 characters.
     */
    unitOfMeasure?: string;
  }

  export namespace ItemLine {
    export interface CustomField {
      /**
       * The name of the custom field, unique for the specified `ownerId`. For public
       * custom fields, this name is visible as a label in the QuickBooks UI.
       *
       * Maximum length: 31 characters.
       */
      name: string;

      /**
       * The owner of this custom field: `"0"` for a public custom field, which
       * QuickBooks users define and see, or an application's GUID in braces for a
       * private custom field, which appears only in requests that name that owner.
       */
      ownerId: string;

      /**
       * The value of this custom field. A public custom field's value can have at most
       * 30 characters.
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
     * use the field `itemId` on this line (QuickBooks will return an error) because
     * this field brings in all of the item information you need. You can, however,
     * specify whatever `quantity` or `cost` that you want, or any other transaction
     * line element other than `itemId`.
     *
     * If the parent transaction supports the `linkToTransactionIds` field, you can use
     * both `linkToTransactionLine` (on this item line) and `linkToTransactionIds` (on
     * its parent transaction) in the same request as long as they do NOT link to the
     * same transaction (otherwise, QuickBooks will return an error). QuickBooks will
     * also return an error if you attempt to link a transaction that is empty or
     * already closed, or if lines linking to the same transaction are not in that
     * transaction's line order.
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
}

export interface CreditCardChargeRetrieveParams {
  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: The owners whose custom fields to return on credit card charges.
   * Defaults to `["0"]`, the public custom fields people create and see in
   * QuickBooks. For an application's private custom fields, list its owner ID, a
   * GUID in braces. Only listed owners are returned, so keep `"0"` for the public
   * ones. QuickBooks rejects the whole request if a listed private owner has no
   * custom fields for credit card charges.
   */
  customFieldOwnerIds?: Array<string>;
}

export interface CreditCardChargeUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the credit card
   * charge object you are updating, which you can get by fetching the object first.
   * Provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Body param: The bank or credit card account to which money is owed for this
   * credit card charge.
   */
  accountId?: string;

  /**
   * Body param: When `true`, removes all existing expense lines associated with this
   * credit card charge. To modify or add individual expense lines, use the field
   * `expenseLines` instead.
   */
  clearExpenseLines?: boolean;

  /**
   * Body param: When `true`, removes all existing item lines associated with this
   * credit card charge. To modify or add individual item lines, use the field
   * `itemLines` instead.
   */
  clearItemLines?: boolean;

  /**
   * Body param: The market exchange rate between this credit card charge's currency
   * and the home currency in QuickBooks at the time of this transaction. Represented
   * as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home
   * currency).
   */
  exchangeRate?: number;

  /**
   * Body param: The credit card charge's expense lines, each representing one line
   * in this expense.
   *
   * **IMPORTANT**:
   *
   * 1. Including this array in your update request will **REPLACE** all existing
   *    expense lines for the credit card charge with this array. To keep any
   *    existing expense lines, you must include them in this array even if they have
   *    not changed. **Any expense lines not included will be removed.**
   *
   * 2. To add a new expense line, include it here with the `id` field set to `-1`.
   *
   * 3. If you do not wish to modify any expense lines, omit this field entirely to
   *    keep them unchanged.
   */
  expenseLines?: Array<CreditCardChargeUpdateParams.ExpenseLine>;

  /**
   * Body param: The credit card charge's item group lines, each representing a
   * predefined set of items bundled together because they are commonly purchased
   * together or grouped for faster entry.
   *
   * **IMPORTANT**:
   *
   * 1. Including this array in your update request will **REPLACE** all existing
   *    item group lines for the credit card charge with this array. To keep any
   *    existing item group lines, you must include them in this array even if they
   *    have not changed. **Any item group lines not included will be removed.**
   *
   * 2. To add a new item group line, include it here with the `id` field set to
   *    `-1`.
   *
   * 3. If you do not wish to modify any item group lines, omit this field entirely
   *    to keep them unchanged.
   */
  itemGroupLines?: Array<CreditCardChargeUpdateParams.ItemGroupLine>;

  /**
   * Body param: The credit card charge's item lines, each representing the purchase
   * of a specific item or service.
   *
   * **IMPORTANT**:
   *
   * 1. Including this array in your update request will **REPLACE** all existing
   *    item lines for the credit card charge with this array. To keep any existing
   *    item lines, you must include them in this array even if they have not
   *    changed. **Any item lines not included will be removed.**
   *
   * 2. To add a new item line, include it here with the `id` field set to `-1`.
   *
   * 3. If you do not wish to modify any item lines, omit this field entirely to keep
   *    them unchanged.
   */
  itemLines?: Array<CreditCardChargeUpdateParams.ItemLine>;

  /**
   * Body param: A memo or note for this credit card charge.
   *
   * Maximum length: 4095 characters.
   */
  memo?: string;

  /**
   * Body param: The vendor or company from whom merchandise or services were
   * purchased for this credit card charge.
   */
  payeeId?: string;

  /**
   * Body param: The case-sensitive user-defined reference number for this credit
   * card charge, which can be used to identify the transaction in QuickBooks. This
   * value is not required to be unique and can be arbitrarily changed by the
   * QuickBooks user.
   *
   * Maximum length: 11 characters.
   */
  refNumber?: string;

  /**
   * Body param: The sales-tax code for this credit card charge, determining whether
   * it is taxable or non-taxable. If set, this overrides any sales-tax codes defined
   * on the payee. This can be overridden on the credit card charge's individual
   * lines.
   *
   * Default codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes
   * can also be created in QuickBooks Desktop. If QuickBooks Desktop is not set up
   * to charge sales tax (via the "Do You Charge Sales Tax?" preference), it assigns
   * the default non-taxable sales-tax code configured in the company file to all
   * sales.
   */
  salesTaxCodeId?: string;

  /**
   * Body param: The date of this credit card charge, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  transactionDate?: string;
}

export namespace CreditCardChargeUpdateParams {
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
     *
     * Decimal string format: exactly 2 decimal places when cents are included and up
     * to 13 digits before the decimal point (for example, "123.45").
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
     *
     * Maximum length: 4095 characters.
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
     * can also be created in QuickBooks Desktop. If QuickBooks Desktop is not set up
     * to charge sales tax (via the "Do You Charge Sales Tax?" preference), it assigns
     * the default non-taxable sales-tax code configured in the company file to all
     * sales.
     */
    salesTaxCodeId?: string;
  }

  export interface ItemGroupLine {
    /**
     * The QuickBooks-assigned unique identifier of an existing item group line you
     * wish to retain or update.
     *
     * **IMPORTANT**: Set this field to `-1` for new item group lines you wish to add.
     */
    id: string;

    /**
     * The item group line's item group, representing a predefined set of items bundled
     * because they are commonly purchased together or grouped for faster entry.
     */
    itemGroupId?: string;

    /**
     * The item group line's item lines, each representing the purchase of a specific
     * item or service.
     *
     * **IMPORTANT**:
     *
     * 1. Including this array in your update request will **REPLACE** all existing
     *    item lines for the item group line with this array. To keep any existing item
     *    lines, you must include them in this array even if they have not changed.
     *    **Any item lines not included will be removed.**
     *
     * 2. To add a new item line, include it here with the `id` field set to `-1`.
     *
     * 3. If you do not wish to modify any item lines, omit this field entirely to keep
     *    them unchanged.
     */
    itemLines?: Array<ItemGroupLine.ItemLine>;

    /**
     * Specifies an alternative unit-of-measure set when updating this item group
     * line's `unitOfMeasure` field (e.g., "pound" or "kilogram"). This allows you to
     * select units from a different set than the item's default unit-of-measure set,
     * which remains unchanged on the item itself. The override applies only to this
     * specific line. For example, you can sell an item typically measured in volume
     * units using weight units in a specific transaction by specifying a different
     * unit-of-measure set with this field.
     *
     * IMPORTANT: Right after QuickBooks Desktop launches, it can briefly report an
     * alternate `id` for a unit-of-measure set, so match on `fullName` when joining to
     * the unit-of-measure sets list.
     */
    overrideUnitOfMeasureSetId?: string;

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
     *
     * Maximum length: 31 characters.
     */
    unitOfMeasure?: string;
  }

  export namespace ItemGroupLine {
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
       *
       * Decimal string format: exactly 2 decimal places when cents are included and up
       * to 13 digits before the decimal point (for example, "123.45").
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
       *
       * Decimal string format: up to 5 decimal places and up to 10 digits before the
       * decimal point (for example, "123.45").
       */
      cost?: string;

      /**
       * The customer or customer-job associated with this item line.
       */
      customerId?: string;

      /**
       * A description of this item line.
       *
       * Maximum length: 4095 characters.
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
       *
       * Maximum length: 40 characters.
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
       *
       * IMPORTANT: Right after QuickBooks Desktop launches, it can briefly report an
       * alternate `id` for a unit-of-measure set, so match on `fullName` when joining to
       * the unit-of-measure sets list.
       */
      overrideUnitOfMeasureSetId?: string;

      /**
       * The quantity of the item associated with this item line. This field cannot be
       * cleared.
       *
       * **NOTE**: Do not use this field if the associated item is a discount item.
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
       * can also be created in QuickBooks Desktop. If QuickBooks Desktop is not set up
       * to charge sales tax (via the "Do You Charge Sales Tax?" preference), it assigns
       * the default non-taxable sales-tax code configured in the company file to all
       * sales.
       */
      salesTaxCodeId?: string;

      /**
       * The serial number of the item associated with this item line. This is used for
       * tracking individual units of serialized inventory items.
       *
       * Maximum length: 4095 characters.
       */
      serialNumber?: string;

      /**
       * The unit-of-measure used for the `quantity` in this item line. Must be a valid
       * unit within the item's available units of measure.
       *
       * Maximum length: 31 characters.
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
     *
     * Decimal string format: exactly 2 decimal places when cents are included and up
     * to 13 digits before the decimal point (for example, "123.45").
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
     *
     * Decimal string format: up to 5 decimal places and up to 10 digits before the
     * decimal point (for example, "123.45").
     */
    cost?: string;

    /**
     * The customer or customer-job associated with this item line.
     */
    customerId?: string;

    /**
     * A description of this item line.
     *
     * Maximum length: 4095 characters.
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
     *
     * Maximum length: 40 characters.
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
     *
     * IMPORTANT: Right after QuickBooks Desktop launches, it can briefly report an
     * alternate `id` for a unit-of-measure set, so match on `fullName` when joining to
     * the unit-of-measure sets list.
     */
    overrideUnitOfMeasureSetId?: string;

    /**
     * The quantity of the item associated with this item line. This field cannot be
     * cleared.
     *
     * **NOTE**: Do not use this field if the associated item is a discount item.
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
     * can also be created in QuickBooks Desktop. If QuickBooks Desktop is not set up
     * to charge sales tax (via the "Do You Charge Sales Tax?" preference), it assigns
     * the default non-taxable sales-tax code configured in the company file to all
     * sales.
     */
    salesTaxCodeId?: string;

    /**
     * The serial number of the item associated with this item line. This is used for
     * tracking individual units of serialized inventory items.
     *
     * Maximum length: 4095 characters.
     */
    serialNumber?: string;

    /**
     * The unit-of-measure used for the `quantity` in this item line. Must be a valid
     * unit within the item's available units of measure.
     *
     * Maximum length: 31 characters.
     */
    unitOfMeasure?: string;
  }
}

export interface CreditCardChargeListParams extends CursorPageParams {
  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for credit card charges associated with these accounts.
   */
  accountIds?: Array<string>;

  /**
   * Query param: Filter for credit card charges in these currencies.
   */
  currencyIds?: Array<string>;

  /**
   * Query param: The owners whose custom fields to return on credit card charges.
   * Defaults to `["0"]`, the public custom fields people create and see in
   * QuickBooks. For an application's private custom fields, list its owner ID, a
   * GUID in braces. Only listed owners are returned, so keep `"0"` for the public
   * ones. QuickBooks rejects the whole request if a listed private owner has no
   * custom fields for credit card charges.
   */
  customFieldOwnerIds?: Array<string>;

  /**
   * Query param: Filter for specific credit card charges by their
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
   * Query param: Filter for credit card charges paid to these payees. These are the
   * vendors or companies from whom merchandise or services were purchased for these
   * credit card charges.
   */
  payeeIds?: Array<string>;

  /**
   * Query param: Filter for credit card charges whose `refNumber` contains this
   * substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberStartsWith`
   * or `refNumberEndsWith`.
   */
  refNumberContains?: string;

  /**
   * Query param: Filter for credit card charges whose `refNumber` ends with this
   * substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberContains` or
   * `refNumberStartsWith`.
   */
  refNumberEndsWith?: string;

  /**
   * Query param: Filter for credit card charges whose `refNumber` is greater than or
   * equal to this value. If omitted, the range will begin with the first number of
   * the list. Uses a numerical comparison for values that contain only digits;
   * otherwise, uses a lexicographical comparison.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberContains`,
   * `refNumberStartsWith`, or `refNumberEndsWith`.
   */
  refNumberFrom?: string;

  /**
   * Query param: Filter for specific credit card charges by their ref-number(s),
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
   * Query param: Filter for credit card charges whose `refNumber` starts with this
   * substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberContains` or
   * `refNumberEndsWith`.
   */
  refNumberStartsWith?: string;

  /**
   * Query param: Filter for credit card charges whose `refNumber` is less than or
   * equal to this value. If omitted, the range will end with the last number of the
   * list. Uses a numerical comparison for values that contain only digits;
   * otherwise, uses a lexicographical comparison.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberContains`,
   * `refNumberStartsWith`, or `refNumberEndsWith`.
   */
  refNumberTo?: string;

  /**
   * Query param: Filter for credit card charges whose `date` field is on or after
   * this date, in ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **start of the
   * specified day** in the local timezone of the end-user's computer (e.g.,
   * `2025-01-01` → `2025-01-01T00:00:00`).
   */
  transactionDateFrom?: string;

  /**
   * Query param: Filter for credit card charges whose `date` field is on or before
   * this date, in ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **end of the specified
   * day** in the local timezone of the end-user's computer (e.g., `2025-01-01` →
   * `2025-01-01T23:59:59`).
   */
  transactionDateTo?: string;

  /**
   * Query param: Filter for credit card charges updated on or after this date/time.
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
   * Query param: Filter for credit card charges updated on or before this date/time.
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

export interface CreditCardChargeDeleteParams {
  /**
   * The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;
}

export interface CreditCardChargeSetCustomFieldsParams {
  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Body param: The custom field values to set or clear on the credit card charge
   * itself, not on its lines. Custom fields you leave out keep their values.
   */
  customFields?: Array<CreditCardChargeSetCustomFieldsParams.CustomField>;

  /**
   * Body param: The lines of the credit card charge whose custom field values to set
   * or clear. Lines you leave out are not changed.
   */
  lines?: Array<CreditCardChargeSetCustomFieldsParams.Line>;
}

export namespace CreditCardChargeSetCustomFieldsParams {
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
     * value can have at most 30 characters.
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

  export interface Line {
    /**
     * The QuickBooks-assigned unique identifier of the credit card charge line, line
     * group, or line inside a line group.
     */
    id: string;

    /**
     * The custom field values to set or clear on this line. Custom fields you leave
     * out keep their values.
     */
    customFields: Array<Line.CustomField>;
  }

  export namespace Line {
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
       * value can have at most 30 characters.
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
}

export interface CreditCardChargeVoidParams {
  /**
   * The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;
}

export declare namespace CreditCardCharges {
  export {
    type CreditCardCharge as CreditCardCharge,
    type CreditCardChargeDeleteResponse as CreditCardChargeDeleteResponse,
    type CreditCardChargeVoidResponse as CreditCardChargeVoidResponse,
    type CreditCardChargesCursorPage as CreditCardChargesCursorPage,
    type CreditCardChargeCreateParams as CreditCardChargeCreateParams,
    type CreditCardChargeRetrieveParams as CreditCardChargeRetrieveParams,
    type CreditCardChargeUpdateParams as CreditCardChargeUpdateParams,
    type CreditCardChargeListParams as CreditCardChargeListParams,
    type CreditCardChargeDeleteParams as CreditCardChargeDeleteParams,
    type CreditCardChargeSetCustomFieldsParams as CreditCardChargeSetCustomFieldsParams,
    type CreditCardChargeVoidParams as CreditCardChargeVoidParams,
  };
}
