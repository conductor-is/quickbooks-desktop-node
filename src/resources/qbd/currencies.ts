// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Currencies extends APIResource {
  /**
   * Creates a user-defined currency with the specified name and currency code.
   * Exchange rates for user-defined currencies are not updated automatically by
   * QuickBooks Desktop; update them manually as needed.
   *
   * @example
   * ```ts
   * const currency = await conductor.qbd.currencies.create({
   *   currencyCode: 'USD',
   *   name: 'United States Dollar',
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  create(params: CurrencyCreateParams, options?: Core.RequestOptions): Core.APIPromise<Currency> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/currencies', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves a currency by ID.
   *
   * @example
   * ```ts
   * const currency = await conductor.qbd.currencies.retrieve(
   *   '80000001-1234567890',
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * );
   * ```
   */
  retrieve(
    id: string,
    params: CurrencyRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Currency> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/currencies/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Updates an existing currency. For built-in currencies, only the `isActive`
   * status can be changed; name and currency code are not editable. For user-defined
   * currencies, all fields in this request are editable.
   *
   * @example
   * ```ts
   * const currency = await conductor.qbd.currencies.update(
   *   '80000001-1234567890',
   *   {
   *     revisionNumber: '1721172183',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   },
   * );
   * ```
   */
  update(id: string, params: CurrencyUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Currency> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(`/quickbooks-desktop/currencies/${id}`, {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of currencies. NOTE: QuickBooks Desktop does not support
   * pagination for currencies; hence, there is no `cursor` parameter. Users
   * typically have few currencies.
   *
   * @example
   * ```ts
   * const currencies = await conductor.qbd.currencies.list({
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  list(params: CurrencyListParams, options?: Core.RequestOptions): Core.APIPromise<CurrencyListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/currencies', {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export interface Currency {
  /**
   * The unique identifier assigned by QuickBooks to this currency. This ID is unique
   * across all currencies but not across different QuickBooks object types.
   */
  id: string;

  /**
   * The date when the exchange rate for this currency was last updated, in ISO 8601
   * format (YYYY-MM-DD).
   */
  asOfDate: string | null;

  /**
   * The date and time when this currency was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The internationally accepted currency code used by this currency, typically
   * based on the ISO 4217 standard (for example, USD for US Dollars). Built-in
   * QuickBooks currencies follow ISO 4217. For user-defined currencies, following
   * ISO 4217 is recommended but not required. In many cases, the three-letter code
   * is formed from the country's two-letter internet code plus a currency letter
   * (e.g., BZ + D → BZD for Belize Dollar).
   */
  currencyCode: string;

  /**
   * Controls how this currency displays thousands separators, grouping, and decimal
   * places.
   */
  currencyFormat: Currency.CurrencyFormat | null;

  /**
   * The market exchange rate between this currency's currency and the home currency
   * in QuickBooks at the time of this transaction. Represented as a decimal value
   * (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).
   */
  exchangeRate: number | null;

  /**
   * Indicates whether this currency is active. Inactive objects are typically hidden
   * from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * Indicates whether this currency was created by a QuickBooks user (`true`) or is
   * a built-in currency (`false`).
   */
  isUserDefinedCurrency: boolean | null;

  /**
   * The case-insensitive unique name of this currency, unique across all currencies.
   * For built-in currencies, the name is the internationally accepted currency name
   * and is not editable.
   *
   * **NOTE**: Currencies do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_currency"`.
   */
  objectType: 'qbd_currency';

  /**
   * The current QuickBooks-assigned revision number of this currency object, which
   * changes each time the object is modified. When updating this object, you must
   * provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The date and time when this currency was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace Currency {
  /**
   * Controls how this currency displays thousands separators, grouping, and decimal
   * places.
   */
  export interface CurrencyFormat {
    /**
     * Controls the number of decimal places displayed for currency values. Use `0` to
     * hide decimals or `2` to display cents.
     */
    decimalPlaces: '0' | '2' | null;

    /**
     * Controls the decimal separator when displaying currency values (for example,
     * "1.00" vs "1,00"). Defaults to period.
     */
    decimalSeparator: 'comma' | 'period' | null;

    /**
     * Controls the thousands separator when displaying currency values (for example,
     * "1,000,000"). Defaults to comma.
     */
    thousandSeparator: 'apostrophe' | 'comma' | 'period' | 'space' | null;

    /**
     * Controls how digits are grouped for thousands when displaying currency values
     * (for example, "10,000,000").
     */
    thousandSeparatorGrouping: 'x_xx_xx_xxx' | 'xx_xxx_xxx' | null;
  }
}

export interface CurrencyListResponse {
  /**
   * The array of currencies.
   */
  data: Array<Currency>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface CurrencyCreateParams {
  /**
   * Body param: The internationally accepted currency code used by this currency,
   * typically based on the ISO 4217 standard (for example, USD for US Dollars).
   * Built-in QuickBooks currencies follow ISO 4217. For user-defined currencies,
   * following ISO 4217 is recommended but not required. In many cases, the
   * three-letter code is formed from the country's two-letter internet code plus a
   * currency letter (e.g., BZ + D → BZD for Belize Dollar).
   *
   * Maximum length: 3 characters.
   */
  currencyCode: string;

  /**
   * Body param: The case-insensitive unique name of this currency, unique across all
   * currencies. For built-in currencies, the name is the internationally accepted
   * currency name and is not editable.
   *
   * **NOTE**: Currencies do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   *
   * Maximum length: 64 characters.
   */
  name: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Body param: Controls how this currency displays thousands separators, grouping,
   * and decimal places.
   */
  currencyFormat?: CurrencyCreateParams.CurrencyFormat;

  /**
   * Body param: Indicates whether this currency is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;
}

export namespace CurrencyCreateParams {
  /**
   * Controls how this currency displays thousands separators, grouping, and decimal
   * places.
   */
  export interface CurrencyFormat {
    /**
     * Controls the number of decimal places displayed for currency values. Use `0` to
     * hide decimals or `2` to display cents.
     */
    decimalPlaces?: '0' | '2';

    /**
     * Controls the decimal separator when displaying currency values (for example,
     * "1.00" vs "1,00"). Defaults to period.
     */
    decimalSeparator?: 'comma' | 'period';

    /**
     * Controls the thousands separator when displaying currency values (for example,
     * "1,000,000"). Defaults to comma.
     */
    thousandSeparator?: 'apostrophe' | 'comma' | 'period' | 'space';

    /**
     * Controls how digits are grouped for thousands when displaying currency values
     * (for example, "10,000,000").
     */
    thousandSeparatorGrouping?: 'x_xx_xx_xxx' | 'xx_xxx_xxx';
  }
}

export interface CurrencyRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface CurrencyUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the currency
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
   * Body param: The internationally accepted currency code used by this currency,
   * typically based on the ISO 4217 standard (for example, USD for US Dollars).
   * Built-in QuickBooks currencies follow ISO 4217. For user-defined currencies,
   * following ISO 4217 is recommended but not required. In many cases, the
   * three-letter code is formed from the country's two-letter internet code plus a
   * currency letter (e.g., BZ + D → BZD for Belize Dollar).
   *
   * Maximum length: 3 characters.
   */
  currencyCode?: string;

  /**
   * Body param: Controls how this currency displays thousands separators, grouping,
   * and decimal places.
   */
  currencyFormat?: CurrencyUpdateParams.CurrencyFormat;

  /**
   * Body param: Indicates whether this currency is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The case-insensitive unique name of this currency, unique across all
   * currencies. For built-in currencies, the name is the internationally accepted
   * currency name and is not editable.
   *
   * **NOTE**: Currencies do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   *
   * Maximum length: 64 characters.
   */
  name?: string;
}

export namespace CurrencyUpdateParams {
  /**
   * Controls how this currency displays thousands separators, grouping, and decimal
   * places.
   */
  export interface CurrencyFormat {
    /**
     * Controls the number of decimal places displayed for currency values. Use `0` to
     * hide decimals or `2` to display cents.
     */
    decimalPlaces?: '0' | '2';

    /**
     * Controls the decimal separator when displaying currency values (for example,
     * "1.00" vs "1,00"). Defaults to period.
     */
    decimalSeparator?: 'comma' | 'period';

    /**
     * Controls the thousands separator when displaying currency values (for example,
     * "1,000,000"). Defaults to comma.
     */
    thousandSeparator?: 'apostrophe' | 'comma' | 'period' | 'space';

    /**
     * Controls how digits are grouped for thousands when displaying currency values
     * (for example, "10,000,000").
     */
    thousandSeparatorGrouping?: 'x_xx_xx_xxx' | 'xx_xxx_xxx';
  }
}

export interface CurrencyListParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for specific currencies by their QuickBooks-assigned unique
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
   * Query param: The maximum number of objects to return.
   *
   * **IMPORTANT**: QuickBooks Desktop does not support cursor-based pagination for
   * currencies. This parameter will limit the response size, but you cannot fetch
   * subsequent results using a cursor. For pagination, use the name-range parameters
   * instead (e.g., `nameFrom=A&nameTo=B`).
   *
   * When this parameter is omitted, the endpoint returns all currencies without
   * limit, unlike paginated endpoints which default to 150 records. This is
   * acceptable because currencies typically have low record counts.
   */
  limit?: number;

  /**
   * Query param: Filter for currencies whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for currencies whose `name` ends with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for currencies whose `name` is alphabetically greater than
   * or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific currencies by their name(s), case-insensitive.
   * Like `id`, `name` is a unique identifier for a currency.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for currencies whose `name` starts with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for currencies whose `name` is alphabetically less than or
   * equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for currencies that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for currencies updated on or after this date/time. Accepts
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
   * Query param: Filter for currencies updated on or before this date/time. Accepts
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

export declare namespace Currencies {
  export {
    type Currency as Currency,
    type CurrencyListResponse as CurrencyListResponse,
    type CurrencyCreateParams as CurrencyCreateParams,
    type CurrencyRetrieveParams as CurrencyRetrieveParams,
    type CurrencyUpdateParams as CurrencyUpdateParams,
    type CurrencyListParams as CurrencyListParams,
  };
}
