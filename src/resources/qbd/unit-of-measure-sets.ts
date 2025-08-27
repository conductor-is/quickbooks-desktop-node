// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class UnitOfMeasureSets extends APIResource {
  /**
   * Creates a new unit-of-measure set.
   *
   * NOTE: The QuickBooks company file must have unit-of-measure enabled (either a
   * single unit per item or multiple units per item). To support both
   * configurations, prefix all UOM set names with "By the" (for example, "By the
   * Barrel"); otherwise, the set may not appear in the QuickBooks UI when the
   * company file is configured for a single unit per item.
   *
   * @example
   * ```ts
   * const unitOfMeasureSet =
   *   await conductor.qbd.unitOfMeasureSets.create({
   *     baseUnit: { abbreviation: 'ea', name: 'Each' },
   *     name: 'Weight Units',
   *     unitOfMeasureType: 'count',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(
    params: UnitOfMeasureSetCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<UnitOfMeasureSet> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/unit-of-measure-sets', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves an unit-of-measure set by ID.
   *
   * @example
   * ```ts
   * const unitOfMeasureSet =
   *   await conductor.qbd.unitOfMeasureSets.retrieve(
   *     '80000001-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: UnitOfMeasureSetRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<UnitOfMeasureSet> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/unit-of-measure-sets/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Lists all unit-of-measure sets. NOTE: QuickBooks Desktop does not support
   * pagination for unit-of-measure sets; hence, there is no cursor parameter. Users
   * typically have few unit-of-measure sets.
   *
   * NOTE: The QuickBooks company file must have unit-of-measure enabled (either a
   * single unit per item or multiple units per item).
   *
   * @example
   * ```ts
   * const unitOfMeasureSets =
   *   await conductor.qbd.unitOfMeasureSets.list({
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(
    params: UnitOfMeasureSetListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<UnitOfMeasureSetListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/unit-of-measure-sets', {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export interface UnitOfMeasureSet {
  /**
   * The unique identifier assigned by QuickBooks to this unit-of-measure set. This
   * ID is unique across all unit-of-measure sets but not across different QuickBooks
   * object types.
   */
  id: string;

  /**
   * The unit-of-measure set's base unit used to track and price item quantities. If
   * the company file is enabled for a single unit of measure per item, the base unit
   * is the only unit available on transaction line items. If enabled for multiple
   * units per item, the base unit is the default unless overridden by the set's
   * default units.
   */
  baseUnit: UnitOfMeasureSet.BaseUnit;

  /**
   * The date and time when this unit-of-measure set was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The unit-of-measure set's default units to appear in the U/M field on
   * transaction line items. You can specify separate defaults for purchases, sales,
   * and shipping.
   */
  defaultUnits: Array<UnitOfMeasureSet.DefaultUnit>;

  /**
   * Indicates whether this unit-of-measure set is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The case-insensitive unique name of this unit-of-measure set, unique across all
   * unit-of-measure sets. To ensure this set appears in the QuickBooks UI for
   * companies configured with a single unit per item, prefix the name with "By the"
   * (e.g., "By the Barrel").
   *
   * **NOTE**: Unit-of-measure sets do not have a `fullName` field because they are
   * not hierarchical objects, which is why `name` is unique for them but not for
   * objects that have parents.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_unit_of_measure_set"`.
   */
  objectType: 'qbd_unit_of_measure_set';

  /**
   * The unit-of-measure set's related units, each specifying how many base units
   * they represent (conversion ratio).
   */
  relatedUnits: Array<UnitOfMeasureSet.RelatedUnit>;

  /**
   * The current QuickBooks-assigned revision number of this unit-of-measure set
   * object, which changes each time the object is modified. When updating this
   * object, you must provide the most recent `revisionNumber` to ensure you're
   * working with the latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The unit-of-measure set's type. Use "other" for a custom type defined in
   * QuickBooks.
   */
  unitOfMeasureType: 'area' | 'count' | 'length' | 'other' | 'time' | 'volume' | 'weight';

  /**
   * The date and time when this unit-of-measure set was last updated, in ISO 8601
   * format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the
   * local timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace UnitOfMeasureSet {
  /**
   * The unit-of-measure set's base unit used to track and price item quantities. If
   * the company file is enabled for a single unit of measure per item, the base unit
   * is the only unit available on transaction line items. If enabled for multiple
   * units per item, the base unit is the default unless overridden by the set's
   * default units.
   */
  export interface BaseUnit {
    /**
     * The base unit's short identifier shown in the QuickBooks U/M field on
     * transaction line items.
     */
    abbreviation: string;

    /**
     * The case-insensitive unique name of this base unit, unique across all base
     * units.
     *
     * **NOTE**: Base units do not have a `fullName` field because they are not
     * hierarchical objects, which is why `name` is unique for them but not for objects
     * that have parents.
     */
    name: string;
  }

  export interface DefaultUnit {
    /**
     * The unit name for this default unit, as displayed in the U/M field. If the
     * company file is enabled for multiple units per item, this appears as an
     * available unit for the item. Must correspond to the base unit or a related unit
     * defined in this set.
     */
    unit: string;

    /**
     * Where this default unit is used as the default: purchase line items, sales line
     * items, or shipping lines.
     */
    unitUsedFor: 'purchase' | 'sales' | 'shipping';
  }

  export interface RelatedUnit {
    /**
     * The related unit's short identifier shown in the QuickBooks U/M field on
     * transaction line items.
     */
    abbreviation: string;

    /**
     * The number of base units in this related unit, represented as a decimal string.
     * For example, if the base unit is "box" and this related unit is "case" with
     * `conversionRatio` = "10", that means there are 10 boxes in one case.
     */
    conversionRatio: string;

    /**
     * The case-insensitive unique name of this related unit, unique across all related
     * units.
     *
     * **NOTE**: Related units do not have a `fullName` field because they are not
     * hierarchical objects, which is why `name` is unique for them but not for objects
     * that have parents.
     */
    name: string;
  }
}

export interface UnitOfMeasureSetListResponse {
  /**
   * The array of unit-of-measure sets.
   */
  data: Array<UnitOfMeasureSet>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface UnitOfMeasureSetCreateParams {
  /**
   * Body param: The unit-of-measure set's base unit used to track and price item
   * quantities. If the company file is enabled for a single unit of measure per
   * item, the base unit is the only unit available on transaction line items. If
   * enabled for multiple units per item, the base unit is the default unless
   * overridden by the set's default units.
   */
  baseUnit: UnitOfMeasureSetCreateParams.BaseUnit;

  /**
   * Body param: The case-insensitive unique name of this unit-of-measure set, unique
   * across all unit-of-measure sets. To ensure this set appears in the QuickBooks UI
   * for companies configured with a single unit per item, prefix the name with "By
   * the" (e.g., "By the Barrel").
   *
   * **NOTE**: Unit-of-measure sets do not have a `fullName` field because they are
   * not hierarchical objects, which is why `name` is unique for them but not for
   * objects that have parents.
   *
   * Maximum length: 31 characters.
   */
  name: string;

  /**
   * Body param: The unit-of-measure set's type. Use "other" for a custom type
   * defined in QuickBooks.
   */
  unitOfMeasureType: 'area' | 'count' | 'length' | 'other' | 'time' | 'volume' | 'weight';

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Body param: The unit-of-measure set's default units to appear in the U/M field
   * on transaction line items. You can specify separate defaults for purchases,
   * sales, and shipping.
   */
  defaultUnits?: Array<UnitOfMeasureSetCreateParams.DefaultUnit>;

  /**
   * Body param: Indicates whether this unit-of-measure set is active. Inactive
   * objects are typically hidden from views and reports in QuickBooks. Defaults to
   * `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The unit-of-measure set's related units, each specifying how many
   * base units they represent (conversion ratio).
   */
  relatedUnits?: Array<UnitOfMeasureSetCreateParams.RelatedUnit>;
}

export namespace UnitOfMeasureSetCreateParams {
  /**
   * The unit-of-measure set's base unit used to track and price item quantities. If
   * the company file is enabled for a single unit of measure per item, the base unit
   * is the only unit available on transaction line items. If enabled for multiple
   * units per item, the base unit is the default unless overridden by the set's
   * default units.
   */
  export interface BaseUnit {
    /**
     * The base unit's short identifier shown in the QuickBooks U/M field on
     * transaction line items.
     *
     * Maximum length: 31 characters.
     */
    abbreviation: string;

    /**
     * The case-insensitive unique name of this base unit, unique across all base
     * units.
     *
     * **NOTE**: Base units do not have a `fullName` field because they are not
     * hierarchical objects, which is why `name` is unique for them but not for objects
     * that have parents.
     *
     * Maximum length: 31 characters.
     */
    name: string;
  }

  export interface DefaultUnit {
    /**
     * The unit name for this default unit, as displayed in the U/M field. If the
     * company file is enabled for multiple units per item, this appears as an
     * available unit for the item. Must correspond to the base unit or a related unit
     * defined in this set.
     *
     * Maximum length: 31 characters.
     */
    unit: string;

    /**
     * Where this default unit is used as the default: purchase line items, sales line
     * items, or shipping lines.
     */
    unitUsedFor: 'purchase' | 'sales' | 'shipping';
  }

  export interface RelatedUnit {
    /**
     * The related unit's short identifier shown in the QuickBooks U/M field on
     * transaction line items.
     *
     * Maximum length: 31 characters.
     */
    abbreviation: string;

    /**
     * The number of base units in this related unit, represented as a decimal string.
     * For example, if the base unit is "box" and this related unit is "case" with
     * `conversionRatio` = "10", that means there are 10 boxes in one case.
     */
    conversionRatio: string;

    /**
     * The case-insensitive unique name of this related unit, unique across all related
     * units.
     *
     * **NOTE**: Related units do not have a `fullName` field because they are not
     * hierarchical objects, which is why `name` is unique for them but not for objects
     * that have parents.
     *
     * Maximum length: 31 characters.
     */
    name: string;
  }
}

export interface UnitOfMeasureSetRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface UnitOfMeasureSetListParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for specific unit-of-measure sets by their
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
   * Query param: The maximum number of objects to return.
   *
   * **IMPORTANT**: QuickBooks Desktop does not support cursor-based pagination for
   * unit-of-measure sets. This parameter will limit the response size, but you
   * cannot fetch subsequent results using a cursor. For pagination, use the
   * name-range parameters instead (e.g., `nameFrom=A&nameTo=B`).
   *
   * When this parameter is omitted, the endpoint returns all unit-of-measure sets
   * without limit, unlike paginated endpoints which default to 150 records. This is
   * acceptable because unit-of-measure sets typically have low record counts.
   */
  limit?: number;

  /**
   * Query param: Filter for unit-of-measure sets whose `name` contains this
   * substring, case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for unit-of-measure sets whose `name` ends with this
   * substring, case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for unit-of-measure sets whose `name` is alphabetically
   * greater than or equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific unit-of-measure sets by their name(s),
   * case-insensitive. Like `id`, `name` is a unique identifier for an
   * unit-of-measure set.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for unit-of-measure sets whose `name` starts with this
   * substring, case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for unit-of-measure sets whose `name` is alphabetically less
   * than or equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for unit-of-measure sets that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for unit-of-measure sets updated on or after this date/time.
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
   * Query param: Filter for unit-of-measure sets updated on or before this
   * date/time. Accepts the following ISO 8601 formats:
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

export declare namespace UnitOfMeasureSets {
  export {
    type UnitOfMeasureSet as UnitOfMeasureSet,
    type UnitOfMeasureSetListResponse as UnitOfMeasureSetListResponse,
    type UnitOfMeasureSetCreateParams as UnitOfMeasureSetCreateParams,
    type UnitOfMeasureSetRetrieveParams as UnitOfMeasureSetRetrieveParams,
    type UnitOfMeasureSetListParams as UnitOfMeasureSetListParams,
  };
}
