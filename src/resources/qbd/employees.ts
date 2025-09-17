// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Employees extends APIResource {
  /**
   * Creates an employee record that captures personal details, contact information,
   * employment dates, and payroll settings in a single request so the employee is
   * ready for scheduling, time tracking, and payroll processing.
   *
   * @example
   * ```ts
   * const employee = await conductor.qbd.employees.create({
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  create(params: EmployeeCreateParams, options?: Core.RequestOptions): Core.APIPromise<Employee> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/employees', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves an employee by ID.
   *
   * @example
   * ```ts
   * const employee = await conductor.qbd.employees.retrieve(
   *   '80000001-1234567890',
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * );
   * ```
   */
  retrieve(
    id: string,
    params: EmployeeRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Employee> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/employees/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Updates an employee record, allowing you to revise contact details, employment
   * status dates, supervisory assignments, payroll configuration, and additional
   * notes to keep workforce data current.
   *
   * @example
   * ```ts
   * const employee = await conductor.qbd.employees.update(
   *   '80000001-1234567890',
   *   {
   *     revisionNumber: '1721172183',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   },
   * );
   * ```
   */
  update(id: string, params: EmployeeUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Employee> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(`/quickbooks-desktop/employees/${id}`, {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of employees. NOTE: QuickBooks Desktop does not support
   * pagination for employees; hence, there is no `cursor` parameter. Users typically
   * have few employees.
   *
   * @example
   * ```ts
   * const employees = await conductor.qbd.employees.list({
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  list(params: EmployeeListParams, options?: Core.RequestOptions): Core.APIPromise<EmployeeListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/employees', {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export interface Employee {
  /**
   * The unique identifier assigned by QuickBooks to this employee. This ID is unique
   * across all employees but not across different QuickBooks object types.
   */
  id: string;

  /**
   * The employee's account number, which appears in the QuickBooks chart of
   * accounts, reports, and graphs.
   *
   * Note that if the "Use Account Numbers" preference is turned off in QuickBooks,
   * the account number may not be visible in the user interface, but it can still be
   * set and retrieved through the API.
   */
  accountNumber: string | null;

  /**
   * Additional notes about this employee.
   */
  additionalNotes: Array<Employee.AdditionalNote>;

  /**
   * The employee's address.
   *
   * If the company uses QuickBooks Payroll for this employee, this address must
   * specify a complete address, including city, state, ZIP (or postal) code, and at
   * least one line of the street address.
   */
  address: Employee.Address | null;

  /**
   * The adjusted service date for this employee, in ISO 8601 format (YYYY-MM-DD).
   * This date accounts for previous employment periods or leaves that affect
   * seniority.
   */
  adjustedServiceDate: string | null;

  /**
   * The employee's alternate telephone number.
   */
  alternatePhone: string | null;

  /**
   * The employee's billing rate, used to override service item rates in time
   * tracking activities.
   */
  billingRate: Employee.BillingRate | null;

  /**
   * This employee's date of birth, in ISO 8601 format (YYYY-MM-DD).
   */
  birthDate: string | null;

  /**
   * The date and time when this employee was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * Additional custom contact fields for this employee, such as phone numbers or
   * email addresses.
   */
  customContactFields: Array<Employee.CustomContactField>;

  /**
   * The custom fields for the employee object, added as user-defined data
   * extensions, not included in the standard QuickBooks object.
   */
  customFields: Array<Employee.CustomField>;

  /**
   * The employee's department. Found in the "employment job details" section of the
   * employee's record in QuickBooks.
   */
  department: string | null;

  /**
   * A description of this employee. Found in the "employment job details" section of
   * the employee's record in QuickBooks.
   */
  description: string | null;

  /**
   * A description of this employee's disability.
   */
  disabilityDescription: string | null;

  /**
   * Indicates whether this employee is disabled.
   */
  disabilityStatus: 'disabled' | 'non_disabled' | null;

  /**
   * The employee's email address.
   */
  email: string | null;

  /**
   * The employee's emergency contacts.
   */
  emergencyContact: Employee.EmergencyContact | null;

  /**
   * The employee's payroll information.
   */
  employeePayroll: Employee.EmployeePayroll | null;

  /**
   * The employee type. This affects payroll taxes - a statutory employee is defined
   * as an employee by statute. Note that owners/partners are typically on the "Other
   * Names" list in QuickBooks, but if listed as an employee their type will be
   * `owner`.
   */
  employeeType: 'officer' | 'owner' | 'regular' | 'statutory' | null;

  /**
   * Indicates whether this employee is a part-time or full-time employee.
   */
  employmentStatus: 'full_time' | 'part_time' | null;

  /**
   * This employee's ethnicity.
   */
  ethnicity:
    | 'american_indian'
    | 'asian'
    | 'black'
    | 'hawaiian'
    | 'hispanic'
    | 'white'
    | 'two_or_more_races'
    | null;

  /**
   * A globally unique identifier (GUID) you, the developer, can provide for tracking
   * this object in your external system. This field is immutable and can only be set
   * during object creation.
   */
  externalId: string | null;

  /**
   * The employee's fax number.
   */
  fax: string | null;

  /**
   * The employee's first name.
   */
  firstName: string | null;

  /**
   * This employee's gender.
   */
  gender: 'male' | 'female' | null;

  /**
   * The date this employee was hired, in ISO 8601 format (YYYY-MM-DD).
   */
  hiredDate: string | null;

  /**
   * Indicates whether this employee's I-9 is on file.
   */
  i9OnFileStatus: 'on_file' | 'not_on_file' | null;

  /**
   * Indicates whether this employee is active. Inactive objects are typically hidden
   * from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The employee's job title.
   */
  jobTitle: string | null;

  /**
   * Indicates whether this employee is a key employee.
   */
  keyEmployeeStatus: 'key_employee' | 'non_key_employee' | null;

  /**
   * The employee's last name.
   */
  lastName: string | null;

  /**
   * The employee's middle name.
   */
  middleName: string | null;

  /**
   * This employee's military status if they are a U.S. veteran.
   */
  militaryStatus: 'active' | 'reserve' | null;

  /**
   * The employee's mobile phone number.
   */
  mobile: string | null;

  /**
   * The case-insensitive unique name of this employee, unique across all employees.
   * A concatenation of the employee's `firstName`, `middleName`, and `lastName`
   * fields.
   *
   * **NOTE**: Employees do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   */
  name: string;

  /**
   * A note or comment about this employee.
   */
  note: string | null;

  /**
   * The type of object. This value is always `"qbd_employee"`.
   */
  objectType: 'qbd_employee';

  /**
   * The original hire date for this employee, in ISO 8601 format (YYYY-MM-DD).
   */
  originalHireDate: string | null;

  /**
   * Indicates whether this employee is exempt from overtime pay. This classification
   * is based on U.S. labor laws (FLSA).
   */
  overtimeExemptStatus: 'exempt' | 'non_exempt' | null;

  /**
   * The employee's pager number.
   */
  pager: string | null;

  /**
   * The employee's pager PIN.
   */
  pagerPin: string | null;

  /**
   * The employee's primary telephone number.
   */
  phone: string | null;

  /**
   * The name to use when printing this employee from QuickBooks. By default, this is
   * the same as the `name` field.
   */
  printAs: string | null;

  /**
   * The current QuickBooks-assigned revision number of this employee object, which
   * changes each time the object is modified. When updating this object, you must
   * provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The employee's formal salutation title that precedes their name, such as "Mr.",
   * "Ms.", or "Dr.".
   */
  salutation: string | null;

  /**
   * The employee's Social Security Number. The value can be with or without dashes.
   *
   * **NOTE**: This field cannot be changed after the employee is created.
   */
  ssn: string | null;

  /**
   * The employee's supervisor. Found in the "employment job details" section of the
   * employee's record in QuickBooks.
   */
  supervisor: Employee.Supervisor | null;

  /**
   * The target bonus for this employee, represented as a decimal string. Found in
   * the "employment job details" section of the employee's record in QuickBooks.
   */
  targetBonus: string | null;

  /**
   * The date this employee's employment ended with the company, in ISO 8601 format
   * (YYYY-MM-DD). This is also known as the released date or separation date.
   */
  terminationDate: string | null;

  /**
   * The date and time when this employee was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;

  /**
   * Indicates whether this employee is a U.S. citizen.
   */
  usCitizenshipStatus: 'citizen' | 'non_citizen' | null;

  /**
   * Indicates whether this employee is a U.S. veteran.
   */
  usVeteranStatus: 'veteran' | 'non_veteran' | null;

  /**
   * The date this employee's work authorization expires, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  workAuthorizationExpirationDate: string | null;
}

export namespace Employee {
  export interface AdditionalNote {
    /**
     * The auto-incrementing identifier assigned by QuickBooks to this note.
     */
    id: number;

    /**
     * The date this note was last updated, in ISO 8601 format (YYYY-MM-DD).
     */
    date: string | null;

    /**
     * The text of this note.
     */
    note: string;
  }

  /**
   * The employee's address.
   *
   * If the company uses QuickBooks Payroll for this employee, this address must
   * specify a complete address, including city, state, ZIP (or postal) code, and at
   * least one line of the street address.
   */
  export interface Address {
    /**
     * The city, district, suburb, town, or village name of the employee address.
     */
    city: string | null;

    /**
     * The country name of the employee address.
     */
    country: string | null;

    /**
     * The first line of the employee address (e.g., street, PO Box, or company name).
     */
    line1: string | null;

    /**
     * The second line of the employee address, if needed (e.g., apartment, suite,
     * unit, or building).
     */
    line2: string | null;

    /**
     * The third line of the employee address, if needed.
     */
    line3: string | null;

    /**
     * The fourth line of the employee address, if needed.
     */
    line4: string | null;

    /**
     * The postal code or ZIP code of the employee address.
     */
    postalCode: string | null;

    /**
     * The U.S. state of the employee address. QuickBooks requires this field to be a
     * U.S. state abbreviation (e.g., "CA" for California). See enum for all possible
     * values.
     *
     * **NOTE:** This `state` field stays enum-constrained when creating or updating an
     * employee because QuickBooks Desktop rejects non-standard values on input. In
     * responses, though, we've seen QuickBooks return values outside its own enum
     * (like 'ON'), so Conductor surfaces the raw QuickBooks string unchanged instead
     * of enforcing the enum.
     */
    state: string | null;
  }

  /**
   * The employee's billing rate, used to override service item rates in time
   * tracking activities.
   */
  export interface BillingRate {
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

  export interface CustomContactField {
    /**
     * The name of the contact field (e.g., "old address", "secondary phone").
     */
    name: string;

    /**
     * The value of the contact field.
     */
    value: string | null;
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
   * The employee's emergency contacts.
   */
  export interface EmergencyContact {
    /**
     * The employee's primary emergency contact.
     */
    primaryContact: EmergencyContact.PrimaryContact | null;

    /**
     * The employee's secondary emergency contact.
     */
    secondaryContact: EmergencyContact.SecondaryContact | null;
  }

  export namespace EmergencyContact {
    /**
     * The employee's primary emergency contact.
     */
    export interface PrimaryContact {
      /**
       * The name of the contact field (e.g., "old address", "secondary phone").
       */
      name: string;

      /**
       * The relationship of the employee to the employee.
       */
      relation:
        | 'brother'
        | 'daughter'
        | 'father'
        | 'friend'
        | 'mother'
        | 'other'
        | 'partner'
        | 'sister'
        | 'son'
        | 'spouse'
        | null;

      /**
       * The value of the contact field.
       */
      value: string | null;
    }

    /**
     * The employee's secondary emergency contact.
     */
    export interface SecondaryContact {
      /**
       * The name of the contact field (e.g., "old address", "secondary phone").
       */
      name: string;

      /**
       * The relationship of the employee to the employee.
       */
      relation:
        | 'brother'
        | 'daughter'
        | 'father'
        | 'friend'
        | 'mother'
        | 'other'
        | 'partner'
        | 'sister'
        | 'son'
        | 'spouse'
        | null;

      /**
       * The value of the contact field.
       */
      value: string | null;
    }
  }

  /**
   * The employee's payroll information.
   */
  export interface EmployeePayroll {
    /**
     * The employee's class. Classes can be used to categorize objects into meaningful
     * segments, such as department, location, or type of work. In QuickBooks, class
     * tracking is off by default.
     */
    class: EmployeePayroll.Class | null;

    /**
     * The employee's earnings.
     */
    earnings: Array<EmployeePayroll.Earning>;

    /**
     * How frequently this employee is paid (e.g., weekly, biweekly, monthly). This
     * determines the schedule for generating paychecks.
     */
    payPeriod: 'biweekly' | 'daily' | 'monthly' | 'quarterly' | 'semimonthly' | 'weekly' | 'yearly' | null;

    /**
     * The employee's sick hours, including how sick time is accrued and the total
     * hours accrued.
     */
    sickHours: EmployeePayroll.SickHours | null;

    /**
     * Indicates whether this employee is using time-tracking data to create paychecks.
     */
    useTimeDataToCreatePaychecks: 'does_not_use_time_data' | 'not_set' | 'uses_time_data' | null;

    /**
     * The employee's vacation hours, including how vacation time is accrued and the
     * total hours accrued.
     */
    vacationHours: EmployeePayroll.VacationHours | null;
  }

  export namespace EmployeePayroll {
    /**
     * The employee's class. Classes can be used to categorize objects into meaningful
     * segments, such as department, location, or type of work. In QuickBooks, class
     * tracking is off by default.
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

    export interface Earning {
      /**
       * The payroll wage item that defines how this employee is paid (e.g., Regular Pay,
       * Overtime Pay). This determines the payment scheme used for payroll calculations.
       */
      payrollWageItem: Earning.PayrollWageItem;

      /**
       * The hourly rate for this employee, represented as a decimal string.
       */
      rate: string | null;

      /**
       * The hourly rate for this employee expressed as a percentage.
       */
      ratePercent: string | null;
    }

    export namespace Earning {
      /**
       * The payroll wage item that defines how this employee is paid (e.g., Regular Pay,
       * Overtime Pay). This determines the payment scheme used for payroll calculations.
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
    }

    /**
     * The employee's sick hours, including how sick time is accrued and the total
     * hours accrued.
     */
    export interface SickHours {
      /**
       * How frequently the employee's sick hours are accrued.
       */
      accrualPeriod: 'accrues_annually' | 'accrues_hourly' | 'accrues_per_paycheck' | null;

      /**
       * The date the employee's sick hours began to accrue, in ISO 8601 format
       * (YYYY-MM-DD).
       */
      accrualStartDate: string | null;

      /**
       * The number of sick hours the employee will accrue per accrual period, in ISO
       * 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is
       * represented as PT1H30M.
       */
      hoursAccruedPerPeriod: string | null;

      /**
       * The total number of sick hours currently available for the employee to use, in
       * ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30
       * minutes is represented as PT1H30M. Defaults to 0.
       */
      hoursAvailable: string | null;

      /**
       * The number of sick hours the employee has used, in ISO 8601 format for time
       * intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as
       * PT1H30M.
       */
      hoursUsed: string | null;

      /**
       * The maximum number of sick hours the employee can accrue, in ISO 8601 format for
       * time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as
       * PT1H30M.
       */
      maximumHours: string | null;

      /**
       * Indicates whether the employee's sick hours reset to zero at the beginning of
       * the new year.
       */
      resetsHoursEachYear: boolean | null;
    }

    /**
     * The employee's vacation hours, including how vacation time is accrued and the
     * total hours accrued.
     */
    export interface VacationHours {
      /**
       * How frequently the employee's vacation hours are accrued.
       */
      accrualPeriod: 'accrues_annually' | 'accrues_hourly' | 'accrues_per_paycheck' | null;

      /**
       * The date the employee's vacation hours began to accrue, in ISO 8601 format
       * (YYYY-MM-DD).
       */
      accrualStartDate: string | null;

      /**
       * The number of vacation hours the employee will accrue per accrual period, in ISO
       * 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is
       * represented as PT1H30M.
       */
      hoursAccruedPerPeriod: string | null;

      /**
       * The total number of vacation hours currently available for the employee to use,
       * in ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30
       * minutes is represented as PT1H30M. Defaults to 0.
       */
      hoursAvailable: string | null;

      /**
       * The number of vacation hours the employee has used, in ISO 8601 format for time
       * intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as
       * PT1H30M.
       */
      hoursUsed: string | null;

      /**
       * The maximum number of vacation hours the employee can accrue, in ISO 8601 format
       * for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented
       * as PT1H30M.
       */
      maximumHours: string | null;

      /**
       * Indicates whether the employee's vacation hours reset to zero at the beginning
       * of the new year.
       */
      resetsHoursEachYear: boolean | null;
    }
  }

  /**
   * The employee's supervisor. Found in the "employment job details" section of the
   * employee's record in QuickBooks.
   */
  export interface Supervisor {
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

export interface EmployeeListResponse {
  /**
   * The array of employees.
   */
  data: Array<Employee>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface EmployeeCreateParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Body param: The employee's account number, which appears in the QuickBooks chart
   * of accounts, reports, and graphs.
   *
   * Note that if the "Use Account Numbers" preference is turned off in QuickBooks,
   * the account number may not be visible in the user interface, but it can still be
   * set and retrieved through the API.
   */
  accountNumber?: string;

  /**
   * Body param: Additional notes about this employee.
   */
  additionalNotes?: Array<EmployeeCreateParams.AdditionalNote>;

  /**
   * Body param: The employee's address.
   *
   * If the company uses QuickBooks Payroll for this employee, this address must
   * specify a complete address, including city, state, ZIP (or postal) code, and at
   * least one line of the street address.
   */
  address?: EmployeeCreateParams.Address;

  /**
   * Body param: The adjusted service date for this employee, in ISO 8601 format
   * (YYYY-MM-DD). This date accounts for previous employment periods or leaves that
   * affect seniority.
   */
  adjustedServiceDate?: string;

  /**
   * Body param: The employee's alternate telephone number.
   */
  alternatePhone?: string;

  /**
   * Body param: The employee's billing rate, used to override service item rates in
   * time tracking activities.
   */
  billingRateId?: string;

  /**
   * Body param: This employee's date of birth, in ISO 8601 format (YYYY-MM-DD).
   */
  birthDate?: string;

  /**
   * Body param: Additional custom contact fields for this employee, such as phone
   * numbers or email addresses.
   */
  customContactFields?: Array<EmployeeCreateParams.CustomContactField>;

  /**
   * Body param: The employee's department. Found in the "employment job details"
   * section of the employee's record in QuickBooks.
   */
  department?: string;

  /**
   * Body param: A description of this employee. Found in the "employment job
   * details" section of the employee's record in QuickBooks.
   */
  description?: string;

  /**
   * Body param: A description of this employee's disability.
   */
  disabilityDescription?: string;

  /**
   * Body param: Indicates whether this employee is disabled.
   */
  disabilityStatus?: 'disabled' | 'non_disabled';

  /**
   * Body param: The employee's email address.
   */
  email?: string;

  /**
   * Body param: The employee's emergency contacts.
   */
  emergencyContact?: EmployeeCreateParams.EmergencyContact;

  /**
   * Body param: The employee's payroll information.
   */
  employeePayroll?: EmployeeCreateParams.EmployeePayroll;

  /**
   * Body param: The employee type. This affects payroll taxes - a statutory employee
   * is defined as an employee by statute. Note that owners/partners are typically on
   * the "Other Names" list in QuickBooks, but if listed as an employee their type
   * will be `owner`.
   */
  employeeType?: 'officer' | 'owner' | 'regular' | 'statutory';

  /**
   * Body param: Indicates whether this employee is a part-time or full-time
   * employee.
   */
  employmentStatus?: 'full_time' | 'part_time';

  /**
   * Body param: This employee's ethnicity.
   */
  ethnicity?: 'american_indian' | 'asian' | 'black' | 'hawaiian' | 'hispanic' | 'white' | 'two_or_more_races';

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
   * Body param: The employee's fax number.
   */
  fax?: string;

  /**
   * Body param: The employee's first name.
   *
   * Maximum length: 25 characters.
   */
  firstName?: string;

  /**
   * Body param: This employee's gender.
   */
  gender?: 'male' | 'female';

  /**
   * Body param: The date this employee was hired, in ISO 8601 format (YYYY-MM-DD).
   */
  hiredDate?: string;

  /**
   * Body param: Indicates whether this employee's I-9 is on file.
   */
  i9OnFileStatus?: 'on_file' | 'not_on_file';

  /**
   * Body param: Indicates whether this employee is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The employee's job title.
   */
  jobTitle?: string;

  /**
   * Body param: Indicates whether this employee is a key employee.
   */
  keyEmployeeStatus?: 'key_employee' | 'non_key_employee';

  /**
   * Body param: The employee's last name.
   *
   * Maximum length: 25 characters.
   */
  lastName?: string;

  /**
   * Body param: The employee's middle name.
   *
   * Maximum length: 5 characters.
   */
  middleName?: string;

  /**
   * Body param: This employee's military status if they are a U.S. veteran.
   */
  militaryStatus?: 'active' | 'reserve';

  /**
   * Body param: The employee's mobile phone number.
   */
  mobile?: string;

  /**
   * Body param: A note or comment about this employee.
   */
  note?: string;

  /**
   * Body param: The original hire date for this employee, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  originalHireDate?: string;

  /**
   * Body param: Indicates whether this employee is exempt from overtime pay. This
   * classification is based on U.S. labor laws (FLSA).
   */
  overtimeExemptStatus?: 'exempt' | 'non_exempt';

  /**
   * Body param: The employee's pager number.
   */
  pager?: string;

  /**
   * Body param: The employee's pager PIN.
   */
  pagerPin?: string;

  /**
   * Body param: The employee's primary telephone number.
   */
  phone?: string;

  /**
   * Body param: The name to use when printing this employee from QuickBooks. By
   * default, this is the same as the `name` field.
   */
  printAs?: string;

  /**
   * Body param: The employee's formal salutation title that precedes their name,
   * such as "Mr.", "Ms.", or "Dr.".
   */
  salutation?: string;

  /**
   * Body param: The employee's Social Security Number. The value can be with or
   * without dashes.
   *
   * **NOTE**: This field cannot be changed after the employee is created.
   */
  ssn?: string;

  /**
   * Body param: The employee's supervisor. Found in the "employment job details"
   * section of the employee's record in QuickBooks.
   */
  supervisorId?: string;

  /**
   * Body param: The target bonus for this employee, represented as a decimal string.
   * Found in the "employment job details" section of the employee's record in
   * QuickBooks.
   */
  targetBonus?: string;

  /**
   * Body param: The date this employee's employment ended with the company, in ISO
   * 8601 format (YYYY-MM-DD). This is also known as the released date or separation
   * date.
   */
  terminationDate?: string;

  /**
   * Body param: Indicates whether this employee is a U.S. citizen.
   */
  usCitizenshipStatus?: 'citizen' | 'non_citizen';

  /**
   * Body param: Indicates whether this employee is a U.S. veteran.
   */
  usVeteranStatus?: 'veteran' | 'non_veteran';

  /**
   * Body param: The date this employee's work authorization expires, in ISO 8601
   * format (YYYY-MM-DD).
   */
  workAuthorizationExpirationDate?: string;
}

export namespace EmployeeCreateParams {
  export interface AdditionalNote {
    /**
     * The text of this note.
     */
    note: string;
  }

  /**
   * The employee's address.
   *
   * If the company uses QuickBooks Payroll for this employee, this address must
   * specify a complete address, including city, state, ZIP (or postal) code, and at
   * least one line of the street address.
   */
  export interface Address {
    /**
     * The city, district, suburb, town, or village name of the employee address.
     *
     * Maximum length: 31 characters.
     */
    city?: string;

    /**
     * The country name of the employee address.
     */
    country?: string;

    /**
     * The first line of the employee address (e.g., street, PO Box, or company name).
     *
     * Maximum length: 41 characters.
     */
    line1?: string;

    /**
     * The second line of the employee address, if needed (e.g., apartment, suite,
     * unit, or building).
     *
     * Maximum length: 41 characters.
     */
    line2?: string;

    /**
     * The third line of the employee address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line3?: string;

    /**
     * The fourth line of the employee address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line4?: string;

    /**
     * The postal code or ZIP code of the employee address.
     *
     * Maximum length: 13 characters.
     */
    postalCode?: string;

    /**
     * The U.S. state of the employee address. QuickBooks requires this field to be a
     * U.S. state abbreviation (e.g., "CA" for California). See enum for all possible
     * values.
     */
    state?:
      | 'none'
      | 'armed_forces_americas'
      | 'armed_forces_europe'
      | 'armed_forces_pacific'
      | 'AK'
      | 'AL'
      | 'AR'
      | 'AZ'
      | 'CA'
      | 'CO'
      | 'CT'
      | 'DC'
      | 'DE'
      | 'FL'
      | 'GA'
      | 'HI'
      | 'IA'
      | 'ID'
      | 'IL'
      | 'IN'
      | 'KS'
      | 'KY'
      | 'LA'
      | 'MA'
      | 'MD'
      | 'ME'
      | 'MI'
      | 'MN'
      | 'MO'
      | 'MS'
      | 'MT'
      | 'NB'
      | 'NC'
      | 'ND'
      | 'NE'
      | 'NH'
      | 'NJ'
      | 'NM'
      | 'NV'
      | 'NY'
      | 'OH'
      | 'OK'
      | 'OR'
      | 'PA'
      | 'PR'
      | 'RI'
      | 'SC'
      | 'SD'
      | 'TN'
      | 'TX'
      | 'UT'
      | 'VA'
      | 'VT'
      | 'WA'
      | 'WI'
      | 'WV'
      | 'WY';
  }

  export interface CustomContactField {
    /**
     * The name of the contact field (e.g., "old address", "secondary phone").
     */
    name: string;

    /**
     * The value of the contact field.
     */
    value: string;
  }

  /**
   * The employee's emergency contacts.
   */
  export interface EmergencyContact {
    /**
     * The employee's primary emergency contact.
     */
    primaryContact?: EmergencyContact.PrimaryContact;

    /**
     * The employee's secondary emergency contact.
     */
    secondaryContact?: EmergencyContact.SecondaryContact;
  }

  export namespace EmergencyContact {
    /**
     * The employee's primary emergency contact.
     */
    export interface PrimaryContact {
      /**
       * The name of the contact field (e.g., "old address", "secondary phone").
       */
      name: string;

      /**
       * The value of the contact field.
       */
      value: string;

      /**
       * The relationship of the employee to the employee.
       */
      relation?:
        | 'brother'
        | 'daughter'
        | 'father'
        | 'friend'
        | 'mother'
        | 'other'
        | 'partner'
        | 'sister'
        | 'son'
        | 'spouse';
    }

    /**
     * The employee's secondary emergency contact.
     */
    export interface SecondaryContact {
      /**
       * The name of the contact field (e.g., "old address", "secondary phone").
       */
      name: string;

      /**
       * The value of the contact field.
       */
      value: string;

      /**
       * The relationship of the employee to the employee.
       */
      relation?:
        | 'brother'
        | 'daughter'
        | 'father'
        | 'friend'
        | 'mother'
        | 'other'
        | 'partner'
        | 'sister'
        | 'son'
        | 'spouse';
    }
  }

  /**
   * The employee's payroll information.
   */
  export interface EmployeePayroll {
    /**
     * The employee's class. Classes can be used to categorize objects into meaningful
     * segments, such as department, location, or type of work. In QuickBooks, class
     * tracking is off by default.
     */
    classId?: string;

    /**
     * The employee's earnings.
     */
    earnings?: Array<EmployeePayroll.Earning>;

    /**
     * How frequently this employee is paid (e.g., weekly, biweekly, monthly). This
     * determines the schedule for generating paychecks.
     */
    payPeriod?: 'biweekly' | 'daily' | 'monthly' | 'quarterly' | 'semimonthly' | 'weekly' | 'yearly';

    /**
     * The employee's sick hours, including how sick time is accrued and the total
     * hours accrued.
     */
    sickHours?: EmployeePayroll.SickHours;

    /**
     * Indicates whether this employee is using time-tracking data to create paychecks.
     */
    useTimeDataToCreatePaychecks?: 'does_not_use_time_data' | 'not_set' | 'uses_time_data';

    /**
     * The employee's vacation hours, including how vacation time is accrued and the
     * total hours accrued.
     */
    vacationHours?: EmployeePayroll.VacationHours;
  }

  export namespace EmployeePayroll {
    export interface Earning {
      /**
       * The payroll wage item that defines how this employee is paid (e.g., Regular Pay,
       * Overtime Pay). This determines the payment scheme used for payroll calculations.
       */
      payrollWageItemId: string;

      /**
       * The hourly rate for this employee, represented as a decimal string.
       */
      rate?: string;

      /**
       * The hourly rate for this employee expressed as a percentage.
       */
      ratePercent?: string;
    }

    /**
     * The employee's sick hours, including how sick time is accrued and the total
     * hours accrued.
     */
    export interface SickHours {
      /**
       * How frequently the employee's sick hours are accrued.
       */
      accrualPeriod?: 'accrues_annually' | 'accrues_hourly' | 'accrues_per_paycheck';

      /**
       * The date the employee's sick hours began to accrue, in ISO 8601 format
       * (YYYY-MM-DD).
       */
      accrualStartDate?: string;

      /**
       * The number of sick hours the employee will accrue per accrual period, in ISO
       * 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is
       * represented as PT1H30M.
       */
      hoursAccruedPerPeriod?: string;

      /**
       * The total number of sick hours currently available for the employee to use, in
       * ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30
       * minutes is represented as PT1H30M. Defaults to 0.
       */
      hoursAvailable?: string;

      /**
       * The number of sick hours the employee has used, in ISO 8601 format for time
       * intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as
       * PT1H30M.
       */
      hoursUsed?: string;

      /**
       * The maximum number of sick hours the employee can accrue, in ISO 8601 format for
       * time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as
       * PT1H30M.
       */
      maximumHours?: string;

      /**
       * Indicates whether the employee's sick hours reset to zero at the beginning of
       * the new year.
       */
      resetsHoursEachYear?: boolean;
    }

    /**
     * The employee's vacation hours, including how vacation time is accrued and the
     * total hours accrued.
     */
    export interface VacationHours {
      /**
       * How frequently the employee's vacation hours are accrued.
       */
      accrualPeriod?: 'accrues_annually' | 'accrues_hourly' | 'accrues_per_paycheck';

      /**
       * The date the employee's vacation hours began to accrue, in ISO 8601 format
       * (YYYY-MM-DD).
       */
      accrualStartDate?: string;

      /**
       * The number of vacation hours the employee will accrue per accrual period, in ISO
       * 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is
       * represented as PT1H30M.
       */
      hoursAccruedPerPeriod?: string;

      /**
       * The total number of vacation hours currently available for the employee to use,
       * in ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30
       * minutes is represented as PT1H30M. Defaults to 0.
       */
      hoursAvailable?: string;

      /**
       * The number of vacation hours the employee has used, in ISO 8601 format for time
       * intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as
       * PT1H30M.
       */
      hoursUsed?: string;

      /**
       * The maximum number of vacation hours the employee can accrue, in ISO 8601 format
       * for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented
       * as PT1H30M.
       */
      maximumHours?: string;

      /**
       * Indicates whether the employee's vacation hours reset to zero at the beginning
       * of the new year.
       */
      resetsHoursEachYear?: boolean;
    }
  }
}

export interface EmployeeRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface EmployeeUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the employee
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
   * Body param: The employee's account number, which appears in the QuickBooks chart
   * of accounts, reports, and graphs.
   *
   * Note that if the "Use Account Numbers" preference is turned off in QuickBooks,
   * the account number may not be visible in the user interface, but it can still be
   * set and retrieved through the API.
   */
  accountNumber?: string;

  /**
   * Body param: Additional notes about this employee.
   */
  additionalNotes?: Array<EmployeeUpdateParams.AdditionalNote>;

  /**
   * Body param: The employee's address.
   *
   * If the company uses QuickBooks Payroll for this employee, this address must
   * specify a complete address, including city, state, ZIP (or postal) code, and at
   * least one line of the street address.
   */
  address?: EmployeeUpdateParams.Address;

  /**
   * Body param: The adjusted service date for this employee, in ISO 8601 format
   * (YYYY-MM-DD). This date accounts for previous employment periods or leaves that
   * affect seniority.
   */
  adjustedServiceDate?: string;

  /**
   * Body param: The employee's alternate telephone number.
   */
  alternatePhone?: string;

  /**
   * Body param: The employee's billing rate, used to override service item rates in
   * time tracking activities.
   */
  billingRateId?: string;

  /**
   * Body param: This employee's date of birth, in ISO 8601 format (YYYY-MM-DD).
   */
  birthDate?: string;

  /**
   * Body param: Additional custom contact fields for this employee, such as phone
   * numbers or email addresses.
   */
  customContactFields?: Array<EmployeeUpdateParams.CustomContactField>;

  /**
   * Body param: The employee's department. Found in the "employment job details"
   * section of the employee's record in QuickBooks.
   */
  department?: string;

  /**
   * Body param: A description of this employee. Found in the "employment job
   * details" section of the employee's record in QuickBooks.
   */
  description?: string;

  /**
   * Body param: A description of this employee's disability.
   */
  disabilityDescription?: string;

  /**
   * Body param: Indicates whether this employee is disabled.
   */
  disabilityStatus?: 'disabled' | 'non_disabled';

  /**
   * Body param: The employee's email address.
   */
  email?: string;

  /**
   * Body param: The employee's emergency contacts.
   */
  emergencyContact?: EmployeeUpdateParams.EmergencyContact;

  /**
   * Body param: The employee's payroll information.
   */
  employeePayroll?: EmployeeUpdateParams.EmployeePayroll;

  /**
   * Body param: The employee type. This affects payroll taxes - a statutory employee
   * is defined as an employee by statute. Note that owners/partners are typically on
   * the "Other Names" list in QuickBooks, but if listed as an employee their type
   * will be `owner`.
   */
  employeeType?: 'officer' | 'owner' | 'regular' | 'statutory';

  /**
   * Body param: Indicates whether this employee is a part-time or full-time
   * employee.
   */
  employmentStatus?: 'full_time' | 'part_time';

  /**
   * Body param: This employee's ethnicity.
   */
  ethnicity?: 'american_indian' | 'asian' | 'black' | 'hawaiian' | 'hispanic' | 'white' | 'two_or_more_races';

  /**
   * Body param: The employee's fax number.
   */
  fax?: string;

  /**
   * Body param: The employee's first name.
   *
   * Maximum length: 25 characters.
   */
  firstName?: string;

  /**
   * Body param: The date this employee was hired, in ISO 8601 format (YYYY-MM-DD).
   */
  hiredDate?: string;

  /**
   * Body param: Indicates whether this employee's I-9 is on file.
   */
  i9OnFileStatus?: 'on_file' | 'not_on_file';

  /**
   * Body param: Indicates whether this employee is active. Inactive objects are
   * typically hidden from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive?: boolean;

  /**
   * Body param: The employee's job title.
   */
  jobTitle?: string;

  /**
   * Body param: Indicates whether this employee is a key employee.
   */
  keyEmployeeStatus?: 'key_employee' | 'non_key_employee';

  /**
   * Body param: The employee's last name.
   *
   * Maximum length: 25 characters.
   */
  lastName?: string;

  /**
   * Body param: The employee's middle name.
   *
   * Maximum length: 5 characters.
   */
  middleName?: string;

  /**
   * Body param: This employee's military status if they are a U.S. veteran.
   */
  militaryStatus?: 'active' | 'reserve';

  /**
   * Body param: The employee's mobile phone number.
   */
  mobile?: string;

  /**
   * Body param: A note or comment about this employee.
   */
  note?: string;

  /**
   * Body param: The original hire date for this employee, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  originalHireDate?: string;

  /**
   * Body param: Indicates whether this employee is exempt from overtime pay. This
   * classification is based on U.S. labor laws (FLSA).
   */
  overtimeExemptStatus?: 'exempt' | 'non_exempt';

  /**
   * Body param: The employee's pager number.
   */
  pager?: string;

  /**
   * Body param: The employee's pager PIN.
   */
  pagerPin?: string;

  /**
   * Body param: The employee's primary telephone number.
   */
  phone?: string;

  /**
   * Body param: The name to use when printing this employee from QuickBooks. By
   * default, this is the same as the `name` field.
   */
  printAs?: string;

  /**
   * Body param: The employee's formal salutation title that precedes their name,
   * such as "Mr.", "Ms.", or "Dr.".
   */
  salutation?: string;

  /**
   * Body param: The employee's supervisor. Found in the "employment job details"
   * section of the employee's record in QuickBooks.
   */
  supervisorId?: string;

  /**
   * Body param: The target bonus for this employee, represented as a decimal string.
   * Found in the "employment job details" section of the employee's record in
   * QuickBooks.
   */
  targetBonus?: string;

  /**
   * Body param: The date this employee's employment ended with the company, in ISO
   * 8601 format (YYYY-MM-DD). This is also known as the released date or separation
   * date.
   */
  terminationDate?: string;

  /**
   * Body param: Indicates whether this employee is a U.S. citizen.
   */
  usCitizenshipStatus?: 'citizen' | 'non_citizen';

  /**
   * Body param: Indicates whether this employee is a U.S. veteran.
   */
  usVeteranStatus?: 'veteran' | 'non_veteran';

  /**
   * Body param: The date this employee's work authorization expires, in ISO 8601
   * format (YYYY-MM-DD).
   */
  workAuthorizationExpirationDate?: string;
}

export namespace EmployeeUpdateParams {
  export interface AdditionalNote {
    /**
     * The ID of the note to update.
     */
    id: number;

    /**
     * The text of this note.
     */
    note: string;
  }

  /**
   * The employee's address.
   *
   * If the company uses QuickBooks Payroll for this employee, this address must
   * specify a complete address, including city, state, ZIP (or postal) code, and at
   * least one line of the street address.
   */
  export interface Address {
    /**
     * The city, district, suburb, town, or village name of the employee address.
     *
     * Maximum length: 31 characters.
     */
    city?: string;

    /**
     * The country name of the employee address.
     */
    country?: string;

    /**
     * The first line of the employee address (e.g., street, PO Box, or company name).
     *
     * Maximum length: 41 characters.
     */
    line1?: string;

    /**
     * The second line of the employee address, if needed (e.g., apartment, suite,
     * unit, or building).
     *
     * Maximum length: 41 characters.
     */
    line2?: string;

    /**
     * The third line of the employee address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line3?: string;

    /**
     * The fourth line of the employee address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line4?: string;

    /**
     * The postal code or ZIP code of the employee address.
     *
     * Maximum length: 13 characters.
     */
    postalCode?: string;

    /**
     * The U.S. state of the employee address. QuickBooks requires this field to be a
     * U.S. state abbreviation (e.g., "CA" for California). See enum for all possible
     * values.
     */
    state?:
      | 'none'
      | 'armed_forces_americas'
      | 'armed_forces_europe'
      | 'armed_forces_pacific'
      | 'AK'
      | 'AL'
      | 'AR'
      | 'AZ'
      | 'CA'
      | 'CO'
      | 'CT'
      | 'DC'
      | 'DE'
      | 'FL'
      | 'GA'
      | 'HI'
      | 'IA'
      | 'ID'
      | 'IL'
      | 'IN'
      | 'KS'
      | 'KY'
      | 'LA'
      | 'MA'
      | 'MD'
      | 'ME'
      | 'MI'
      | 'MN'
      | 'MO'
      | 'MS'
      | 'MT'
      | 'NB'
      | 'NC'
      | 'ND'
      | 'NE'
      | 'NH'
      | 'NJ'
      | 'NM'
      | 'NV'
      | 'NY'
      | 'OH'
      | 'OK'
      | 'OR'
      | 'PA'
      | 'PR'
      | 'RI'
      | 'SC'
      | 'SD'
      | 'TN'
      | 'TX'
      | 'UT'
      | 'VA'
      | 'VT'
      | 'WA'
      | 'WI'
      | 'WV'
      | 'WY';
  }

  export interface CustomContactField {
    /**
     * The name of the contact field (e.g., "old address", "secondary phone").
     */
    name: string;

    /**
     * The value of the contact field.
     */
    value: string;
  }

  /**
   * The employee's emergency contacts.
   */
  export interface EmergencyContact {
    /**
     * The employee's primary emergency contact.
     */
    primaryContact?: EmergencyContact.PrimaryContact;

    /**
     * The employee's secondary emergency contact.
     */
    secondaryContact?: EmergencyContact.SecondaryContact;
  }

  export namespace EmergencyContact {
    /**
     * The employee's primary emergency contact.
     */
    export interface PrimaryContact {
      /**
       * The name of the contact field (e.g., "old address", "secondary phone").
       */
      name: string;

      /**
       * The value of the contact field.
       */
      value: string;

      /**
       * The relationship of the employee to the employee.
       */
      relation?:
        | 'brother'
        | 'daughter'
        | 'father'
        | 'friend'
        | 'mother'
        | 'other'
        | 'partner'
        | 'sister'
        | 'son'
        | 'spouse';
    }

    /**
     * The employee's secondary emergency contact.
     */
    export interface SecondaryContact {
      /**
       * The name of the contact field (e.g., "old address", "secondary phone").
       */
      name: string;

      /**
       * The value of the contact field.
       */
      value: string;

      /**
       * The relationship of the employee to the employee.
       */
      relation?:
        | 'brother'
        | 'daughter'
        | 'father'
        | 'friend'
        | 'mother'
        | 'other'
        | 'partner'
        | 'sister'
        | 'son'
        | 'spouse';
    }
  }

  /**
   * The employee's payroll information.
   */
  export interface EmployeePayroll {
    /**
     * The employee's class. Classes can be used to categorize objects into meaningful
     * segments, such as department, location, or type of work. In QuickBooks, class
     * tracking is off by default.
     */
    classId?: string;

    /**
     * When `true`, deletes all earnings records for this employee.
     */
    deleteAllEarnings?: boolean;

    /**
     * The employee's earnings.
     *
     * **IMPORTANT**: When updating employees, if you include any earnings records in
     * your update request, QuickBooks will delete all existing earnings records for
     * this employee and replace them with the new records you provide. If you do not
     * include any earnings records, the existing earnings records will remain
     * unchanged. To delete all earnings records without adding new ones, set the
     * `deleteAllEarnings` field to `true`.
     */
    earnings?: Array<EmployeePayroll.Earning>;

    /**
     * How frequently this employee is paid (e.g., weekly, biweekly, monthly). This
     * determines the schedule for generating paychecks.
     */
    payPeriod?: 'biweekly' | 'daily' | 'monthly' | 'quarterly' | 'semimonthly' | 'weekly' | 'yearly';

    /**
     * The employee's sick hours, including how sick time is accrued and the total
     * hours accrued.
     */
    sickHours?: EmployeePayroll.SickHours;

    /**
     * Indicates whether this employee is using time-tracking data to create paychecks.
     */
    useTimeDataToCreatePaychecks?: 'does_not_use_time_data' | 'not_set' | 'uses_time_data';

    /**
     * The employee's vacation hours, including how vacation time is accrued and the
     * total hours accrued.
     */
    vacationHours?: EmployeePayroll.VacationHours;
  }

  export namespace EmployeePayroll {
    export interface Earning {
      /**
       * The payroll wage item that defines how this employee is paid (e.g., Regular Pay,
       * Overtime Pay). This determines the payment scheme used for payroll calculations.
       */
      payrollWageItemId: string;

      /**
       * The hourly rate for this employee, represented as a decimal string.
       */
      rate?: string;

      /**
       * The hourly rate for this employee expressed as a percentage.
       */
      ratePercent?: string;
    }

    /**
     * The employee's sick hours, including how sick time is accrued and the total
     * hours accrued.
     */
    export interface SickHours {
      /**
       * How frequently the employee's sick hours are accrued.
       */
      accrualPeriod?: 'accrues_annually' | 'accrues_hourly' | 'accrues_per_paycheck';

      /**
       * The date the employee's sick hours began to accrue, in ISO 8601 format
       * (YYYY-MM-DD).
       */
      accrualStartDate?: string;

      /**
       * The number of sick hours the employee will accrue per accrual period, in ISO
       * 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is
       * represented as PT1H30M.
       */
      hoursAccruedPerPeriod?: string;

      /**
       * The total number of sick hours currently available for the employee to use, in
       * ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30
       * minutes is represented as PT1H30M. Defaults to 0.
       */
      hoursAvailable?: string;

      /**
       * The number of sick hours the employee has used, in ISO 8601 format for time
       * intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as
       * PT1H30M.
       */
      hoursUsed?: string;

      /**
       * The maximum number of sick hours the employee can accrue, in ISO 8601 format for
       * time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as
       * PT1H30M.
       */
      maximumHours?: string;

      /**
       * Indicates whether the employee's sick hours reset to zero at the beginning of
       * the new year.
       */
      resetsHoursEachYear?: boolean;
    }

    /**
     * The employee's vacation hours, including how vacation time is accrued and the
     * total hours accrued.
     */
    export interface VacationHours {
      /**
       * How frequently the employee's vacation hours are accrued.
       */
      accrualPeriod?: 'accrues_annually' | 'accrues_hourly' | 'accrues_per_paycheck';

      /**
       * The date the employee's vacation hours began to accrue, in ISO 8601 format
       * (YYYY-MM-DD).
       */
      accrualStartDate?: string;

      /**
       * The number of vacation hours the employee will accrue per accrual period, in ISO
       * 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is
       * represented as PT1H30M.
       */
      hoursAccruedPerPeriod?: string;

      /**
       * The total number of vacation hours currently available for the employee to use,
       * in ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30
       * minutes is represented as PT1H30M. Defaults to 0.
       */
      hoursAvailable?: string;

      /**
       * The number of vacation hours the employee has used, in ISO 8601 format for time
       * intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as
       * PT1H30M.
       */
      hoursUsed?: string;

      /**
       * The maximum number of vacation hours the employee can accrue, in ISO 8601 format
       * for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented
       * as PT1H30M.
       */
      maximumHours?: string;

      /**
       * Indicates whether the employee's vacation hours reset to zero at the beginning
       * of the new year.
       */
      resetsHoursEachYear?: boolean;
    }
  }
}

export interface EmployeeListParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for specific employees by their QuickBooks-assigned unique
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
   * employees. This parameter will limit the response size, but you cannot fetch
   * subsequent results using a cursor. For pagination, use the name-range parameters
   * instead (e.g., `nameFrom=A&nameTo=B`).
   *
   * When this parameter is omitted, the endpoint returns all employees without
   * limit, unlike paginated endpoints which default to 150 records. This is
   * acceptable because employees typically have low record counts.
   */
  limit?: number;

  /**
   * Query param: Filter for employees whose `name` contains this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameStartsWith` or
   * `nameEndsWith`.
   */
  nameContains?: string;

  /**
   * Query param: Filter for employees whose `name` ends with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameStartsWith`.
   */
  nameEndsWith?: string;

  /**
   * Query param: Filter for employees whose `name` is alphabetically greater than or
   * equal to this value.
   */
  nameFrom?: string;

  /**
   * Query param: Filter for specific employees by their name(s), case-insensitive.
   * Like `id`, `name` is a unique identifier for an employee.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  names?: Array<string>;

  /**
   * Query param: Filter for employees whose `name` starts with this substring,
   * case-insensitive.
   *
   * **NOTE**: If you use this parameter, you cannot also use `nameContains` or
   * `nameEndsWith`.
   */
  nameStartsWith?: string;

  /**
   * Query param: Filter for employees whose `name` is alphabetically less than or
   * equal to this value.
   */
  nameTo?: string;

  /**
   * Query param: Filter for employees that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';

  /**
   * Query param: Filter for employees updated on or after this date/time. Accepts
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
   * Query param: Filter for employees updated on or before this date/time. Accepts
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

export declare namespace Employees {
  export {
    type Employee as Employee,
    type EmployeeListResponse as EmployeeListResponse,
    type EmployeeCreateParams as EmployeeCreateParams,
    type EmployeeRetrieveParams as EmployeeRetrieveParams,
    type EmployeeUpdateParams as EmployeeUpdateParams,
    type EmployeeListParams as EmployeeListParams,
  };
}
