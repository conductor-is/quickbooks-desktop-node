// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class TimeTrackingActivities extends APIResource {
  /**
   * Creates a new time tracking activity.
   *
   * @example
   * ```ts
   * const timeTrackingActivity =
   *   await conductor.qbd.timeTrackingActivities.create({
   *     duration: 'PT1H30M',
   *     entityId: '80000001-1234567890',
   *     transactionDate: '2024-10-01',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(
    params: TimeTrackingActivityCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TimeTrackingActivity> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/time-tracking-activities', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves a time tracking activity by ID.
   *
   * @example
   * ```ts
   * const timeTrackingActivity =
   *   await conductor.qbd.timeTrackingActivities.retrieve(
   *     '123ABC-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: TimeTrackingActivityRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TimeTrackingActivity> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/time-tracking-activities/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Updates an existing time tracking activity.
   *
   * @example
   * ```ts
   * const timeTrackingActivity =
   *   await conductor.qbd.timeTrackingActivities.update(
   *     '123ABC-1234567890',
   *     {
   *       duration: 'PT1H30M',
   *       entityId: '80000001-1234567890',
   *       revisionNumber: '1721172183',
   *       conductorEndUserId: 'end_usr_1234567abcdefg',
   *     },
   *   );
   * ```
   */
  update(
    id: string,
    params: TimeTrackingActivityUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TimeTrackingActivity> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(`/quickbooks-desktop/time-tracking-activities/${id}`, {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of time tracking activities. Use the `cursor` parameter to
   * paginate through the results.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const timeTrackingActivity of conductor.qbd.timeTrackingActivities.list(
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    params: TimeTrackingActivityListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<TimeTrackingActivitiesCursorPage, TimeTrackingActivity> {
    const { conductorEndUserId, ...query } = params;
    return this._client.getAPIList(
      '/quickbooks-desktop/time-tracking-activities',
      TimeTrackingActivitiesCursorPage,
      { query, ...options, headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers } },
    );
  }

  /**
   * Permanently deletes a a time tracking activity. The deletion will fail if the
   * time tracking activity is currently in use or has any linked transactions that
   * are in use.
   *
   * @example
   * ```ts
   * const timeTrackingActivity =
   *   await conductor.qbd.timeTrackingActivities.delete(
   *     '123ABC-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  delete(
    id: string,
    params: TimeTrackingActivityDeleteParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TimeTrackingActivityDeleteResponse> {
    const { conductorEndUserId } = params;
    return this._client.delete(`/quickbooks-desktop/time-tracking-activities/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export class TimeTrackingActivitiesCursorPage extends CursorPage<TimeTrackingActivity> {}

export interface TimeTrackingActivity {
  /**
   * The unique identifier assigned by QuickBooks to this time tracking activity.
   * This ID is unique across all transaction types.
   */
  id: string;

  /**
   * The billing status of this time tracking activity.
   *
   * **IMPORTANT**: When this field is set to "billable" for time tracking
   * activities, both `customer` and `serviceItem` are required so that an invoice
   * can be created.
   */
  billingStatus: 'billable' | 'has_been_billed' | 'not_billable' | null;

  /**
   * The time tracking activity's class. Classes can be used to categorize objects
   * into meaningful segments, such as department, location, or type of work. In
   * QuickBooks, class tracking is off by default.
   */
  class: TimeTrackingActivity.Class | null;

  /**
   * The date and time when this time tracking activity was created, in ISO 8601
   * format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user's time
   * zone in QuickBooks.
   */
  createdAt: string;

  /**
   * The customer or customer-job to which this time tracking activity could be
   * billed. If `billingStatus` is set to "billable", this field is required.
   */
  customer: TimeTrackingActivity.Customer | null;

  /**
   * The time spent performing the service during this time tracking activity, in ISO
   * 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is
   * represented as PT1H30M.
   *
   * **NOTE**: Although seconds can be specified when creating a time tracking
   * activity, they are not returned in responses since QuickBooks Desktop's UI does
   * not display seconds.
   *
   * **IMPORTANT**: This field is required for updating time tracking activities,
   * even if the field is not being modified, because of a bug in QuickBooks itself.
   */
  duration: string;

  /**
   * The employee, vendor, or person on QuickBooks's "Other Names" list whose time is
   * being tracked in this time tracking activity. This cannot refer to a customer -
   * use the `customer` field to associate a customer or customer-job with this time
   * tracking activity.
   */
  entity: TimeTrackingActivity.Entity;

  /**
   * A globally unique identifier (GUID) you, the developer, can provide for tracking
   * this object in your external system. This field is immutable and can only be set
   * during object creation.
   */
  externalId: string | null;

  /**
   * Indicates whether this time tracking activity has been billed.
   */
  isBilled: boolean | null;

  /**
   * A note or comment about this time tracking activity.
   */
  note: string | null;

  /**
   * The type of object. This value is always `"qbd_time_tracking_activity"`.
   */
  objectType: 'qbd_time_tracking_activity';

  /**
   * The payroll wage item (e.g., Regular Pay, Overtime Pay) to use for this time
   * tracking activity. This field can only be used for time tracking if: (1) the
   * person specified in `entity` is an employee in QuickBooks, and (2) the "Use time
   * data to create paychecks" preference is enabled in their payroll settings.
   */
  payrollWageItem: TimeTrackingActivity.PayrollWageItem | null;

  /**
   * The current QuickBooks-assigned revision number of this time tracking activity
   * object, which changes each time the object is modified. When updating this
   * object, you must provide the most recent `revisionNumber` to ensure you're
   * working with the latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The type of service performed during this time tracking activity, referring to
   * billable or purchasable services such as specialized labor, consulting hours,
   * and professional fees.
   *
   * **NOTE**: This field is not required if no `customer` is specified. However, if
   * `billingStatus` is set to "billable", both this field and `customer` are
   * required.
   */
  serviceItem: TimeTrackingActivity.ServiceItem | null;

  /**
   * The date of this time tracking activity, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * The date and time when this time tracking activity was last updated, in ISO 8601
   * format (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user's time
   * zone in QuickBooks.
   */
  updatedAt: string;
}

export namespace TimeTrackingActivity {
  /**
   * The time tracking activity's class. Classes can be used to categorize objects
   * into meaningful segments, such as department, location, or type of work. In
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

  /**
   * The customer or customer-job to which this time tracking activity could be
   * billed. If `billingStatus` is set to "billable", this field is required.
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

  /**
   * The employee, vendor, or person on QuickBooks's "Other Names" list whose time is
   * being tracked in this time tracking activity. This cannot refer to a customer -
   * use the `customer` field to associate a customer or customer-job with this time
   * tracking activity.
   */
  export interface Entity {
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
   * The payroll wage item (e.g., Regular Pay, Overtime Pay) to use for this time
   * tracking activity. This field can only be used for time tracking if: (1) the
   * person specified in `entity` is an employee in QuickBooks, and (2) the "Use time
   * data to create paychecks" preference is enabled in their payroll settings.
   */
  export interface PayrollWageItem {
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
   * The type of service performed during this time tracking activity, referring to
   * billable or purchasable services such as specialized labor, consulting hours,
   * and professional fees.
   *
   * **NOTE**: This field is not required if no `customer` is specified. However, if
   * `billingStatus` is set to "billable", both this field and `customer` are
   * required.
   */
  export interface ServiceItem {
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

export interface TimeTrackingActivityDeleteResponse {
  /**
   * The QuickBooks-assigned unique identifier of the deleted time tracking activity.
   */
  id: string;

  /**
   * Indicates whether the time tracking activity was deleted.
   */
  deleted: boolean;

  /**
   * The type of object. This value is always `"qbd_time_tracking_activity"`.
   */
  objectType: 'qbd_time_tracking_activity';

  /**
   * The case-sensitive user-defined reference number of the deleted time tracking
   * activity.
   */
  refNumber: string | null;
}

export interface TimeTrackingActivityCreateParams {
  /**
   * Body param: The time spent performing the service during this time tracking
   * activity, in ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour
   * and 30 minutes is represented as PT1H30M.
   *
   * **NOTE**: Although seconds can be specified when creating a time tracking
   * activity, they are not returned in responses since QuickBooks Desktop's UI does
   * not display seconds.
   *
   * **IMPORTANT**: This field is required for updating time tracking activities,
   * even if the field is not being modified, because of a bug in QuickBooks itself.
   */
  duration: string;

  /**
   * Body param: The employee, vendor, or person on QuickBooks's "Other Names" list
   * whose time is being tracked in this time tracking activity. This cannot refer to
   * a customer - use the `customer` field to associate a customer or customer-job
   * with this time tracking activity.
   */
  entityId: string;

  /**
   * Body param: The date of this time tracking activity, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Body param: The billing status of this time tracking activity.
   *
   * **IMPORTANT**: When this field is set to "billable" for time tracking
   * activities, both `customer` and `serviceItem` are required so that an invoice
   * can be created.
   */
  billingStatus?: 'billable' | 'has_been_billed' | 'not_billable';

  /**
   * Body param: The time tracking activity's class. Classes can be used to
   * categorize objects into meaningful segments, such as department, location, or
   * type of work. In QuickBooks, class tracking is off by default.
   */
  classId?: string;

  /**
   * Body param: The customer or customer-job to which this time tracking activity
   * could be billed. If `billingStatus` is set to "billable", this field is
   * required.
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
   * Body param: A note or comment about this time tracking activity.
   */
  note?: string;

  /**
   * Body param: The payroll wage item (e.g., Regular Pay, Overtime Pay) to use for
   * this time tracking activity. This field can only be used for time tracking if:
   * (1) the person specified in `entity` is an employee in QuickBooks, and (2) the
   * "Use time data to create paychecks" preference is enabled in their payroll
   * settings.
   */
  payrollWageItemId?: string;

  /**
   * Body param: The type of service performed during this time tracking activity,
   * referring to billable or purchasable services such as specialized labor,
   * consulting hours, and professional fees.
   *
   * **NOTE**: This field is not required if no `customer` is specified. However, if
   * `billingStatus` is set to "billable", both this field and `customer` are
   * required.
   */
  serviceItemId?: string;
}

export interface TimeTrackingActivityRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface TimeTrackingActivityUpdateParams {
  /**
   * Body param: The time spent performing the service during this time tracking
   * activity, in ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour
   * and 30 minutes is represented as PT1H30M.
   *
   * **NOTE**: Although seconds can be specified when creating a time tracking
   * activity, they are not returned in responses since QuickBooks Desktop's UI does
   * not display seconds.
   *
   * **IMPORTANT**: This field is required for updating time tracking activities,
   * even if the field is not being modified, because of a bug in QuickBooks itself.
   */
  duration: string;

  /**
   * Body param: The employee, vendor, or person on QuickBooks's "Other Names" list
   * whose time is being tracked in this time tracking activity. This cannot refer to
   * a customer - use the `customer` field to associate a customer or customer-job
   * with this time tracking activity.
   *
   * **IMPORTANT**: This field is required for updating time tracking activities,
   * even if the field is not being modified, because of a bug in QuickBooks itself.
   */
  entityId: string;

  /**
   * Body param: The current QuickBooks-assigned revision number of the time tracking
   * activity object you are updating, which you can get by fetching the object
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
   * Body param: The billing status of this time tracking activity.
   *
   * **IMPORTANT**: When this field is set to "billable" for time tracking
   * activities, both `customer` and `serviceItem` are required so that an invoice
   * can be created.
   */
  billingStatus?: 'billable' | 'has_been_billed' | 'not_billable';

  /**
   * Body param: The time tracking activity's class. Classes can be used to
   * categorize objects into meaningful segments, such as department, location, or
   * type of work. In QuickBooks, class tracking is off by default.
   */
  classId?: string;

  /**
   * Body param: The customer or customer-job to which this time tracking activity
   * could be billed. If `billingStatus` is set to "billable", this field is
   * required.
   */
  customerId?: string;

  /**
   * Body param: A note or comment about this time tracking activity.
   */
  note?: string;

  /**
   * Body param: The payroll wage item (e.g., Regular Pay, Overtime Pay) to use for
   * this time tracking activity. This field can only be used for time tracking if:
   * (1) the person specified in `entity` is an employee in QuickBooks, and (2) the
   * "Use time data to create paychecks" preference is enabled in their payroll
   * settings.
   */
  payrollWageItemId?: string;

  /**
   * Body param: The type of service performed during this time tracking activity,
   * referring to billable or purchasable services such as specialized labor,
   * consulting hours, and professional fees.
   *
   * **NOTE**: This field is not required if no `customer` is specified. However, if
   * `billingStatus` is set to "billable", both this field and `customer` are
   * required.
   */
  serviceItemId?: string;

  /**
   * Body param: The date of this time tracking activity, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  transactionDate?: string;
}

export interface TimeTrackingActivityListParams extends CursorPageParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for time tracking activities tracking the time of these
   * employees, vendors, or persons on QuickBooks's "Other Names" list.
   */
  entityIds?: Array<string>;

  /**
   * Query param: Filter for specific time tracking activities by their
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
   * Query param: Filter for time tracking activities whose `date` field is on or
   * after this date, in ISO 8601 format (YYYY-MM-DD). **NOTE**: QuickBooks Desktop
   * interprets date-only values in the QuickBooks Desktop host machine’s local
   * timezone (i.e., midnight in that timezone).
   */
  transactionDateFrom?: string;

  /**
   * Query param: Filter for time tracking activities whose `date` field is on or
   * before this date, in ISO 8601 format (YYYY-MM-DD). **NOTE**: QuickBooks Desktop
   * interprets date-only values in the QuickBooks Desktop host machine’s local
   * timezone (i.e., midnight in that timezone).
   */
  transactionDateTo?: string;

  /**
   * Query param: Filter for time tracking activities updated on or after this
   * date/time. Format: ISO 8601. Accepts date-only (YYYY-MM-DD), datetime without
   * timezone (YYYY-MM-DDTHH:mm:ss), or datetime with timezone
   * (YYYY-MM-DDTHH:mm:ss±HH:mm). **NOTE**: Date-only and timezone-less datetimes are
   * passed through for QuickBooks Desktop to interpret in the QuickBooks Desktop
   * host machine’s local timezone. If the datetime includes a timezone (e.g.,
   * `+05:30` or `Z`), QuickBooks Desktop uses that timezone to interpret the
   * timestamp.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for time tracking activities updated on or before this
   * date/time. Format: ISO 8601. Accepts date-only (YYYY-MM-DD), datetime without
   * timezone (YYYY-MM-DDTHH:mm:ss), or datetime with timezone
   * (YYYY-MM-DDTHH:mm:ss±HH:mm). **NOTE**: Date-only and timezone-less datetimes are
   * passed through for QuickBooks Desktop to interpret in the QuickBooks Desktop
   * host machine’s local timezone. If the datetime includes a timezone (e.g.,
   * `+05:30` or `Z`), QuickBooks Desktop uses that timezone to interpret the
   * timestamp.
   */
  updatedBefore?: string;
}

export interface TimeTrackingActivityDeleteParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

TimeTrackingActivities.TimeTrackingActivitiesCursorPage = TimeTrackingActivitiesCursorPage;

export declare namespace TimeTrackingActivities {
  export {
    type TimeTrackingActivity as TimeTrackingActivity,
    type TimeTrackingActivityDeleteResponse as TimeTrackingActivityDeleteResponse,
    TimeTrackingActivitiesCursorPage as TimeTrackingActivitiesCursorPage,
    type TimeTrackingActivityCreateParams as TimeTrackingActivityCreateParams,
    type TimeTrackingActivityRetrieveParams as TimeTrackingActivityRetrieveParams,
    type TimeTrackingActivityUpdateParams as TimeTrackingActivityUpdateParams,
    type TimeTrackingActivityListParams as TimeTrackingActivityListParams,
    type TimeTrackingActivityDeleteParams as TimeTrackingActivityDeleteParams,
  };
}
