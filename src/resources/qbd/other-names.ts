// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class OtherNames extends APIResource {
  /**
   * Creates a new other-name.
   *
   * @example
   * ```ts
   * const otherName = await conductor.qbd.otherNames.create({
   *   name: 'John Doe',
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  create(params: OtherNameCreateParams, options?: Core.RequestOptions): Core.APIPromise<OtherName> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/other-names', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves an other-name by ID.
   *
   * @example
   * ```ts
   * const otherName = await conductor.qbd.otherNames.retrieve(
   *   '80000001-1234567890',
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * );
   * ```
   */
  retrieve(
    id: string,
    params: OtherNameRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<OtherName> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/other-names/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Updates an existing other-name.
   *
   * @example
   * ```ts
   * const otherName = await conductor.qbd.otherNames.update(
   *   '80000001-1234567890',
   *   {
   *     revisionNumber: '1721172183',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   },
   * );
   * ```
   */
  update(
    id: string,
    params: OtherNameUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<OtherName> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(`/quickbooks-desktop/other-names/${id}`, {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of other-names. NOTE: QuickBooks Desktop does not support
   * pagination for other-names; hence, there is no `cursor` parameter. Users
   * typically have few other-names.
   *
   * @example
   * ```ts
   * const otherNames = await conductor.qbd.otherNames.list({
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  list(params: OtherNameListParams, options?: Core.RequestOptions): Core.APIPromise<OtherNameListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/other-names', {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export interface OtherName {
  /**
   * The unique identifier assigned by QuickBooks to this other-name. This ID is
   * unique across all other-names but not across different QuickBooks object types.
   */
  id: string;

  /**
   * The other-name's account number, which appears in the QuickBooks chart of
   * accounts, reports, and graphs.
   *
   * Note that if the "Use Account Numbers" preference is turned off in QuickBooks,
   * the account number may not be visible in the user interface, but it can still be
   * set and retrieved through the API.
   */
  accountNumber: string | null;

  /**
   * The other-name's address.
   */
  address: OtherName.Address | null;

  /**
   * The name of a alternate contact person for this other-name.
   */
  alternateContact: string | null;

  /**
   * The other-name's alternate telephone number.
   */
  alternatePhone: string | null;

  /**
   * The name of the company associated with this other-name. This name is used on
   * invoices, checks, and other forms.
   */
  companyName: string | null;

  /**
   * The name of the primary contact person for this other-name.
   */
  contact: string | null;

  /**
   * The date and time when this other-name was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The custom fields for the other-name object, added as user-defined data
   * extensions, not included in the standard QuickBooks object.
   */
  customFields: Array<OtherName.CustomField>;

  /**
   * The other-name's email address.
   */
  email: string | null;

  /**
   * A globally unique identifier (GUID) you, the developer, can provide for tracking
   * this object in your external system. This field is immutable and can only be set
   * during object creation.
   */
  externalId: string | null;

  /**
   * The other-name's fax number.
   */
  fax: string | null;

  /**
   * The first name of the contact person for this other-name.
   */
  firstName: string | null;

  /**
   * Indicates whether this other-name is active. Inactive objects are typically
   * hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The last name of the contact person for this other-name.
   */
  lastName: string | null;

  /**
   * The middle name of the contact person for this other-name.
   */
  middleName: string | null;

  /**
   * The case-insensitive unique name of this other-name, unique across all
   * other-names.
   *
   * **NOTE**: Other-names do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   */
  name: string;

  /**
   * A note or comment about this other-name.
   */
  note: string | null;

  /**
   * The type of object. This value is always `"qbd_other_name"`.
   */
  objectType: 'qbd_other_name';

  /**
   * The other-name's primary telephone number.
   */
  phone: string | null;

  /**
   * The current QuickBooks-assigned revision number of this other-name object, which
   * changes each time the object is modified. When updating this object, you must
   * provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The formal salutation title that precedes the name of the contact person for
   * this other-name, such as "Mr.", "Ms.", or "Dr.".
   */
  salutation: string | null;

  /**
   * The date and time when this other-name was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace OtherName {
  /**
   * The other-name's address.
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

export interface OtherNameListResponse {
  /**
   * The array of other-names.
   */
  data: Array<OtherName>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface OtherNameCreateParams {
  /**
   * Body param: The case-insensitive unique name of this other-name, unique across
   * all other-names.
   *
   * **NOTE**: Other-names do not have a `fullName` field because they are not
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
   * Body param: The other-name's account number, which appears in the QuickBooks
   * chart of accounts, reports, and graphs.
   *
   * Note that if the "Use Account Numbers" preference is turned off in QuickBooks,
   * the account number may not be visible in the user interface, but it can still be
   * set and retrieved through the API.
   */
  accountNumber?: string;

  /**
   * Body param: The other-name's address.
   */
  address?: OtherNameCreateParams.Address;

  /**
   * Body param: The name of a alternate contact person for this other-name.
   */
  alternateContact?: string;

  /**
   * Body param: The other-name's alternate telephone number.
   */
  alternatePhone?: string;

  /**
   * Body param: The name of the company associated with this other-name. This name
   * is used on invoices, checks, and other forms.
   */
  companyName?: string;

  /**
   * Body param: The name of the primary contact person for this other-name.
   */
  contact?: string;

  /**
   * Body param: The other-name's email address.
   */
  email?: string;

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
   * Body param: The other-name's fax number.
   */
  fax?: string;

  /**
   * Body param: The first name of the contact person for this other-name.
   *
   * Maximum length: 25 characters.
   */
  firstName?: string;

  /**
   * Body param: Indicates whether this other-name is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The last name of the contact person for this other-name.
   *
   * Maximum length: 25 characters.
   */
  lastName?: string;

  /**
   * Body param: The middle name of the contact person for this other-name.
   *
   * Maximum length: 5 characters.
   */
  middleName?: string;

  /**
   * Body param: A note or comment about this other-name.
   */
  note?: string;

  /**
   * Body param: The other-name's primary telephone number.
   */
  phone?: string;

  /**
   * Body param: The formal salutation title that precedes the name of the contact
   * person for this other-name, such as "Mr.", "Ms.", or "Dr.".
   */
  salutation?: string;
}

export namespace OtherNameCreateParams {
  /**
   * The other-name's address.
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

export interface OtherNameRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface OtherNameUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the other-name
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
   * Body param: The other-name's account number, which appears in the QuickBooks
   * chart of accounts, reports, and graphs.
   *
   * Note that if the "Use Account Numbers" preference is turned off in QuickBooks,
   * the account number may not be visible in the user interface, but it can still be
   * set and retrieved through the API.
   */
  accountNumber?: string;

  /**
   * Body param: The other-name's address.
   */
  address?: OtherNameUpdateParams.Address;

  /**
   * Body param: The name of a alternate contact person for this other-name.
   */
  alternateContact?: string;

  /**
   * Body param: The other-name's alternate telephone number.
   */
  alternatePhone?: string;

  /**
   * Body param: The name of the company associated with this other-name. This name
   * is used on invoices, checks, and other forms.
   */
  companyName?: string;

  /**
   * Body param: The name of the primary contact person for this other-name.
   */
  contact?: string;

  /**
   * Body param: The other-name's email address.
   */
  email?: string;

  /**
   * Body param: The other-name's fax number.
   */
  fax?: string;

  /**
   * Body param: The first name of the contact person for this other-name.
   *
   * Maximum length: 25 characters.
   */
  firstName?: string;

  /**
   * Body param: Indicates whether this other-name is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The last name of the contact person for this other-name.
   *
   * Maximum length: 25 characters.
   */
  lastName?: string;

  /**
   * Body param: The middle name of the contact person for this other-name.
   *
   * Maximum length: 5 characters.
   */
  middleName?: string;

  /**
   * Body param: The case-insensitive unique name of this other-name, unique across
   * all other-names.
   *
   * **NOTE**: Other-names do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   *
   * Maximum length: 31 characters.
   */
  name?: string;

  /**
   * Body param: A note or comment about this other-name.
   */
  note?: string;

  /**
   * Body param: The other-name's primary telephone number.
   */
  phone?: string;

  /**
   * Body param: The formal salutation title that precedes the name of the contact
   * person for this other-name, such as "Mr.", "Ms.", or "Dr.".
   */
  salutation?: string;
}

export namespace OtherNameUpdateParams {
  /**
   * The other-name's address.
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

export interface OtherNameListParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for specific other-names by their QuickBooks-assigned unique
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
   * other-names. This parameter will limit the response size, but you cannot fetch
   * subsequent results using a cursor. For pagination, use the name-range parameters
   * instead (e.g., `nameFrom=A&nameTo=B`).
   *
   * When this parameter is omitted, the endpoint returns all other-names without
   * limit, unlike paginated endpoints which default to 150 records. This is
   * acceptable because other-names typically have low record counts.
   */
  limit?: number;

  /**
   * Query param: Filter for other-names whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for other-names whose `name` ends with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for other-names whose `name` is alphabetically greater than
   * or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific other-names by their name(s), case-insensitive.
   * Like `id`, `name` is a unique identifier for an other-name.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for other-names whose `name` starts with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for other-names whose `name` is alphabetically less than or
   * equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for other-names that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for other-names updated on or after this date/time. Accepts
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
   * Query param: Filter for other-names updated on or before this date/time. Accepts
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

export declare namespace OtherNames {
  export {
    type OtherName as OtherName,
    type OtherNameListResponse as OtherNameListResponse,
    type OtherNameCreateParams as OtherNameCreateParams,
    type OtherNameRetrieveParams as OtherNameRetrieveParams,
    type OtherNameUpdateParams as OtherNameUpdateParams,
    type OtherNameListParams as OtherNameListParams,
  };
}
