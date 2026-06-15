// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class SalesTaxPaymentChecks extends APIResource {
  /**
   * Creates a new sales-tax payment check.
   *
   * @example
   * ```ts
   * const salesTaxPaymentCheck =
   *   await conductor.qbd.salesTaxPaymentChecks.create({
   *     bankAccountId: '80000001-1234567890',
   *     lines: [{ amount: '1000.00' }],
   *     transactionDate: '2024-10-01',
   *     vendorId: '80000001-1234567890',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(
    params: SalesTaxPaymentCheckCreateParams,
    options?: RequestOptions,
  ): APIPromise<SalesTaxPaymentCheck> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/sales-tax-payment-checks', {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Retrieves a sales-tax payment check by ID.
   *
   * **IMPORTANT:** If you need to fetch multiple specific sales-tax payment checks
   * by ID, use the list endpoint instead with the `ids` parameter. It accepts an
   * array of IDs so you can batch the request into a single call, which is
   * significantly faster.
   *
   * @example
   * ```ts
   * const salesTaxPaymentCheck =
   *   await conductor.qbd.salesTaxPaymentChecks.retrieve(
   *     '123ABC-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: SalesTaxPaymentCheckRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<SalesTaxPaymentCheck> {
    const { conductorEndUserId } = params;
    return this._client.get(path`/quickbooks-desktop/sales-tax-payment-checks/${id}`, {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Updates an existing sales-tax payment check.
   *
   * @example
   * ```ts
   * const salesTaxPaymentCheck =
   *   await conductor.qbd.salesTaxPaymentChecks.update(
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
    params: SalesTaxPaymentCheckUpdateParams,
    options?: RequestOptions,
  ): APIPromise<SalesTaxPaymentCheck> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(path`/quickbooks-desktop/sales-tax-payment-checks/${id}`, {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Returns a list of sales-tax payment checks. Use the `cursor` parameter to
   * paginate through the results.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const salesTaxPaymentCheck of conductor.qbd.salesTaxPaymentChecks.list(
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    params: SalesTaxPaymentCheckListParams,
    options?: RequestOptions,
  ): PagePromise<SalesTaxPaymentChecksCursorPage, SalesTaxPaymentCheck> {
    const { conductorEndUserId, ...query } = params;
    return this._client.getAPIList(
      '/quickbooks-desktop/sales-tax-payment-checks',
      CursorPage<SalesTaxPaymentCheck>,
      {
        query,
        ...options,
        headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
      },
    );
  }

  /**
   * Permanently deletes a sales-tax payment check. The deletion will fail if the
   * sales-tax payment check is currently in use or has any linked transactions that
   * are in use.
   *
   * @example
   * ```ts
   * const salesTaxPaymentCheck =
   *   await conductor.qbd.salesTaxPaymentChecks.delete(
   *     '123ABC-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  delete(
    id: string,
    params: SalesTaxPaymentCheckDeleteParams,
    options?: RequestOptions,
  ): APIPromise<SalesTaxPaymentCheckDeleteResponse> {
    const { conductorEndUserId } = params;
    return this._client.delete(path`/quickbooks-desktop/sales-tax-payment-checks/${id}`, {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Voids a sales-tax payment check by setting its amount to zero while keeping a
   * record of it in QuickBooks. The void will fail if the sales-tax payment check is
   * currently in use or has any linked transactions that are in use.
   *
   * @example
   * ```ts
   * const response =
   *   await conductor.qbd.salesTaxPaymentChecks.void(
   *     '123ABC-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  void(
    id: string,
    params: SalesTaxPaymentCheckVoidParams,
    options?: RequestOptions,
  ): APIPromise<SalesTaxPaymentCheckVoidResponse> {
    const { conductorEndUserId } = params;
    return this._client.post(path`/quickbooks-desktop/sales-tax-payment-checks/${id}/void`, {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }
}

export type SalesTaxPaymentChecksCursorPage = CursorPage<SalesTaxPaymentCheck>;

export interface SalesTaxPaymentCheck {
  /**
   * The unique identifier assigned by QuickBooks to this sales-tax payment check.
   * This ID is unique across all transaction types.
   */
  id: string;

  /**
   * The address that is printed on the sales-tax payment check.
   */
  address: SalesTaxPaymentCheck.Address | null;

  /**
   * The total monetary amount of this sales-tax payment check, represented as a
   * decimal string. This equals the sum of the amounts in the sales-tax payment
   * check lines.
   */
  amount: string;

  /**
   * The bank account from which the funds are being drawn for this sales-tax payment
   * check; e.g., Checking or Savings. This sales-tax payment check will decrease the
   * balance of this account.
   */
  bankAccount: SalesTaxPaymentCheck.BankAccount;

  /**
   * The date and time when this sales-tax payment check was created, in ISO 8601
   * format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the
   * local timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The custom fields for the sales-tax payment check object, added as user-defined
   * data extensions, not included in the standard QuickBooks object.
   */
  customFields: Array<SalesTaxPaymentCheck.CustomField>;

  /**
   * A globally unique identifier (GUID) you, the developer, can provide for tracking
   * this object in your external system. This field is immutable and can only be set
   * during object creation.
   */
  externalId: string | null;

  /**
   * Indicates whether this sales-tax payment check is included in the queue of
   * documents for QuickBooks to print.
   */
  isQueuedForPrint: boolean | null;

  /**
   * The payment lines in this sales-tax payment check, each recording an amount paid
   * toward a sales-tax item.
   */
  lines: Array<SalesTaxPaymentCheck.Line>;

  /**
   * A memo or note for this sales-tax payment check.
   */
  memo: string | null;

  /**
   * The type of object. This value is always `"qbd_sales_tax_payment_check"`.
   */
  objectType: 'qbd_sales_tax_payment_check';

  /**
   * The case-sensitive user-defined reference number for this sales-tax payment
   * check, which can be used to identify the transaction in QuickBooks. This value
   * is not required to be unique and can be arbitrarily changed by the QuickBooks
   * user.
   *
   * **IMPORTANT**: For checks, this field is the check number.
   */
  refNumber: string | null;

  /**
   * The current QuickBooks-assigned revision number of this sales-tax payment check
   * object, which changes each time the object is modified. When updating this
   * object, you must provide the most recent `revisionNumber` to ensure you're
   * working with the latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The date of this sales-tax payment check, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * The date and time when this sales-tax payment check was last updated, in ISO
   * 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in
   * the local timezone of the end-user's computer.
   */
  updatedAt: string;

  /**
   * The sales-tax agency, represented as a QuickBooks vendor, receiving this
   * sales-tax payment check. This must match the tax vendor associated with the
   * sales-tax items in the payment lines.
   */
  vendor: SalesTaxPaymentCheck.Vendor | null;
}

export namespace SalesTaxPaymentCheck {
  /**
   * The address that is printed on the sales-tax payment check.
   */
  export interface Address {
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

  /**
   * The bank account from which the funds are being drawn for this sales-tax payment
   * check; e.g., Checking or Savings. This sales-tax payment check will decrease the
   * balance of this account.
   */
  export interface BankAccount {
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

  export interface Line {
    /**
     * The unique identifier assigned by QuickBooks to this sales-tax payment check
     * line. This ID is unique across all transaction line types.
     */
    id: string;

    /**
     * The sales-tax payment amount paid toward this line's sales-tax item, represented
     * as a decimal string.
     */
    amount: string | null;

    /**
     * The type of object. This value is always `"qbd_sales_tax_payment_check_line"`.
     */
    objectType: 'qbd_sales_tax_payment_check_line';

    /**
     * The sales-tax item whose payable balance this sales-tax payment check line is
     * paying.
     */
    salesTaxItem: Line.SalesTaxItem | null;

    /**
     * The sales-tax amount due on this sales-tax payment check line, represented as a
     * decimal string. QuickBooks Desktop returns this field only for Australian
     * company files.
     */
    taxAmount: string | null;
  }

  export namespace Line {
    /**
     * The sales-tax item whose payable balance this sales-tax payment check line is
     * paying.
     */
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

  /**
   * The sales-tax agency, represented as a QuickBooks vendor, receiving this
   * sales-tax payment check. This must match the tax vendor associated with the
   * sales-tax items in the payment lines.
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
}

export interface SalesTaxPaymentCheckDeleteResponse {
  /**
   * The QuickBooks-assigned unique identifier of the deleted sales-tax payment
   * check.
   */
  id: string;

  /**
   * Indicates whether the sales-tax payment check was deleted.
   */
  deleted: boolean;

  /**
   * The type of object. This value is always `"qbd_sales_tax_payment_check"`.
   */
  objectType: 'qbd_sales_tax_payment_check';

  /**
   * The case-sensitive user-defined reference number of the deleted sales-tax
   * payment check.
   */
  refNumber: string | null;
}

export interface SalesTaxPaymentCheckVoidResponse {
  /**
   * The QuickBooks-assigned unique identifier of the voided sales-tax payment check.
   */
  id: string;

  /**
   * The date and time when this sales-tax payment check was created, in ISO 8601
   * format (YYYY-MM-DDThh:mm:ss+hh:mm), which QuickBooks Desktop interprets in the
   * local timezone of the end-user's computer.
   */
  createdAt: string | null;

  /**
   * The type of object. This value is always `"qbd_sales_tax_payment_check"`.
   */
  objectType: 'qbd_sales_tax_payment_check';

  /**
   * The case-sensitive user-defined reference number of the voided sales-tax payment
   * check.
   */
  refNumber: string | null;

  /**
   * The date and time when this sales-tax payment check was last updated, in ISO
   * 8601 format (YYYY-MM-DDThh:mm:ss+hh:mm), which QuickBooks Desktop interprets in
   * the local timezone of the end-user's computer.
   */
  updatedAt: string | null;

  /**
   * Indicates whether the sales-tax payment check was voided.
   */
  voided: boolean;
}

export interface SalesTaxPaymentCheckCreateParams {
  /**
   * Body param: The bank account from which the funds are being drawn for this
   * sales-tax payment check; e.g., Checking or Savings. This sales-tax payment check
   * will decrease the balance of this account.
   */
  bankAccountId: string;

  /**
   * Body param: The payment lines in this sales-tax payment check, each recording an
   * amount paid toward a sales-tax item.
   */
  lines: Array<SalesTaxPaymentCheckCreateParams.Line>;

  /**
   * Body param: The date of this sales-tax payment check, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * Body param: The sales-tax agency, represented as a QuickBooks vendor, receiving
   * this sales-tax payment check. This must match the tax vendor associated with the
   * sales-tax items in the payment lines.
   */
  vendorId: string;

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Body param: The address that is printed on the sales-tax payment check.
   */
  address?: SalesTaxPaymentCheckCreateParams.Address;

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
   * Body param: Indicates whether this sales-tax payment check is included in the
   * queue of documents for QuickBooks to print.
   */
  isQueuedForPrint?: boolean;

  /**
   * Body param: A memo or note for this sales-tax payment check.
   */
  memo?: string;

  /**
   * Body param: The case-sensitive user-defined reference number for this sales-tax
   * payment check, which can be used to identify the transaction in QuickBooks. This
   * value is not required to be unique and can be arbitrarily changed by the
   * QuickBooks user. When left blank in this create request, this field will be left
   * blank in QuickBooks (i.e., it does _not_ auto-increment).
   *
   * **IMPORTANT**: For checks, this field is the check number.
   *
   * Maximum length: 11 characters.
   */
  refNumber?: string;
}

export namespace SalesTaxPaymentCheckCreateParams {
  export interface Line {
    /**
     * The sales-tax payment amount paid toward this line's sales-tax item, represented
     * as a decimal string.
     *
     * Decimal string format: exactly 2 decimal places when cents are included and up
     * to 13 digits before the decimal point (for example, "123.45").
     */
    amount: string;

    /**
     * The sales-tax item whose payable balance this sales-tax payment check line is
     * paying.
     */
    salesTaxItemId?: string;
  }

  /**
   * The address that is printed on the sales-tax payment check.
   */
  export interface Address {
    /**
     * The city, district, suburb, town, or village name of the address.
     *
     * Maximum length: 31 characters.
     */
    city?: string;

    /**
     * The country name of the address.
     */
    country?: string;

    /**
     * The first line of the address (e.g., street, PO Box, or company name).
     *
     * Maximum length: 41 characters.
     */
    line1?: string;

    /**
     * The second line of the address, if needed (e.g., apartment, suite, unit, or
     * building).
     *
     * Maximum length: 41 characters.
     */
    line2?: string;

    /**
     * The third line of the address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line3?: string;

    /**
     * The fourth line of the address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line4?: string;

    /**
     * The fifth line of the address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line5?: string;

    /**
     * A note written at the bottom of the address in the form in which it appears,
     * such as the invoice form.
     */
    note?: string;

    /**
     * The postal code or ZIP code of the address.
     *
     * Maximum length: 13 characters.
     */
    postalCode?: string;

    /**
     * The state, county, province, or region name of the address.
     *
     * Maximum length: 21 characters.
     */
    state?: string;
  }
}

export interface SalesTaxPaymentCheckRetrieveParams {
  /**
   * The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;
}

export interface SalesTaxPaymentCheckUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the sales-tax
   * payment check object you are updating, which you can get by fetching the object
   * first. Provide the most recent `revisionNumber` to ensure you're working with
   * the latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Body param: The address that is printed on the sales-tax payment check.
   */
  address?: SalesTaxPaymentCheckUpdateParams.Address;

  /**
   * Body param: The bank account from which the funds are being drawn for this
   * sales-tax payment check; e.g., Checking or Savings. This sales-tax payment check
   * will decrease the balance of this account.
   */
  bankAccountId?: string;

  /**
   * Body param: Indicates whether this sales-tax payment check is included in the
   * queue of documents for QuickBooks to print.
   */
  isQueuedForPrint?: boolean;

  /**
   * Body param: A memo or note for this sales-tax payment check.
   */
  memo?: string;

  /**
   * Body param: The case-sensitive user-defined reference number for this sales-tax
   * payment check, which can be used to identify the transaction in QuickBooks. This
   * value is not required to be unique and can be arbitrarily changed by the
   * QuickBooks user.
   *
   * **IMPORTANT**: For checks, this field is the check number.
   *
   * Maximum length: 11 characters.
   */
  refNumber?: string;

  /**
   * Body param: The date of this sales-tax payment check, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  transactionDate?: string;
}

export namespace SalesTaxPaymentCheckUpdateParams {
  /**
   * The address that is printed on the sales-tax payment check.
   */
  export interface Address {
    /**
     * The city, district, suburb, town, or village name of the address.
     *
     * Maximum length: 31 characters.
     */
    city?: string;

    /**
     * The country name of the address.
     */
    country?: string;

    /**
     * The first line of the address (e.g., street, PO Box, or company name).
     *
     * Maximum length: 41 characters.
     */
    line1?: string;

    /**
     * The second line of the address, if needed (e.g., apartment, suite, unit, or
     * building).
     *
     * Maximum length: 41 characters.
     */
    line2?: string;

    /**
     * The third line of the address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line3?: string;

    /**
     * The fourth line of the address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line4?: string;

    /**
     * The fifth line of the address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line5?: string;

    /**
     * A note written at the bottom of the address in the form in which it appears,
     * such as the invoice form.
     */
    note?: string;

    /**
     * The postal code or ZIP code of the address.
     *
     * Maximum length: 13 characters.
     */
    postalCode?: string;

    /**
     * The state, county, province, or region name of the address.
     *
     * Maximum length: 21 characters.
     */
    state?: string;
  }
}

export interface SalesTaxPaymentCheckListParams extends CursorPageParams {
  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for sales-tax payment checks associated with these accounts.
   */
  accountIds?: Array<string>;

  /**
   * Query param: Filter for specific sales-tax payment checks by their
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
   * Query param: Filter for sales-tax payment checks containing these items.
   */
  itemIds?: Array<string>;

  /**
   * Query param: Filter for sales-tax payment checks whose `refNumber` contains this
   * substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberStartsWith`
   * or `refNumberEndsWith`.
   */
  refNumberContains?: string;

  /**
   * Query param: Filter for sales-tax payment checks whose `refNumber` ends with
   * this substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberContains` or
   * `refNumberStartsWith`.
   */
  refNumberEndsWith?: string;

  /**
   * Query param: Filter for sales-tax payment checks whose `refNumber` is greater
   * than or equal to this value. If omitted, the range will begin with the first
   * number of the list. Uses a numerical comparison for values that contain only
   * digits; otherwise, uses a lexicographical comparison.
   */
  refNumberFrom?: string;

  /**
   * Query param: Filter for specific sales-tax payment checks by their
   * ref-number(s), case-sensitive. In QuickBooks, ref-numbers are not required to be
   * unique and can be arbitrarily changed by the QuickBooks user.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  refNumbers?: Array<string>;

  /**
   * Query param: Filter for sales-tax payment checks whose `refNumber` starts with
   * this substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberContains` or
   * `refNumberEndsWith`.
   */
  refNumberStartsWith?: string;

  /**
   * Query param: Filter for sales-tax payment checks whose `refNumber` is less than
   * or equal to this value. If omitted, the range will end with the last number of
   * the list. Uses a numerical comparison for values that contain only digits;
   * otherwise, uses a lexicographical comparison.
   */
  refNumberTo?: string;

  /**
   * Query param: Filter for sales-tax payment checks whose `date` field is on or
   * after this date, in ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **start of the
   * specified day** in the local timezone of the end-user's computer (e.g.,
   * `2025-01-01` → `2025-01-01T00:00:00`).
   */
  transactionDateFrom?: string;

  /**
   * Query param: Filter for sales-tax payment checks whose `date` field is on or
   * before this date, in ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **end of the specified
   * day** in the local timezone of the end-user's computer (e.g., `2025-01-01` →
   * `2025-01-01T23:59:59`).
   */
  transactionDateTo?: string;

  /**
   * Query param: Filter for sales-tax payment checks updated on or after this
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
   * Query param: Filter for sales-tax payment checks updated on or before this
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

  /**
   * Query param: Filter for sales-tax payment checks paid to these vendors. These
   * are the sales-tax agencies, represented as QuickBooks vendors, paid by these
   * checks.
   */
  vendorIds?: Array<string>;
}

export interface SalesTaxPaymentCheckDeleteParams {
  /**
   * The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;
}

export interface SalesTaxPaymentCheckVoidParams {
  /**
   * The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;
}

export declare namespace SalesTaxPaymentChecks {
  export {
    type SalesTaxPaymentCheck as SalesTaxPaymentCheck,
    type SalesTaxPaymentCheckDeleteResponse as SalesTaxPaymentCheckDeleteResponse,
    type SalesTaxPaymentCheckVoidResponse as SalesTaxPaymentCheckVoidResponse,
    type SalesTaxPaymentChecksCursorPage as SalesTaxPaymentChecksCursorPage,
    type SalesTaxPaymentCheckCreateParams as SalesTaxPaymentCheckCreateParams,
    type SalesTaxPaymentCheckRetrieveParams as SalesTaxPaymentCheckRetrieveParams,
    type SalesTaxPaymentCheckUpdateParams as SalesTaxPaymentCheckUpdateParams,
    type SalesTaxPaymentCheckListParams as SalesTaxPaymentCheckListParams,
    type SalesTaxPaymentCheckDeleteParams as SalesTaxPaymentCheckDeleteParams,
    type SalesTaxPaymentCheckVoidParams as SalesTaxPaymentCheckVoidParams,
  };
}
