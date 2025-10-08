// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class CompanyResource extends APIResource {
  /**
   * Returns detailed information about the connected QuickBooks company file,
   * including company address, legal name, preferences, and subscribed services.
   * Note that company information cannot be modified through the API, only through
   * the QuickBooks Desktop user interface.
   *
   * @example
   * ```ts
   * const company = await conductor.qbd.company.retrieve({
   *   'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  retrieve(params: CompanyRetrieveParams, options?: RequestOptions): APIPromise<Company> {
    const { 'Conductor-End-User-Id': conductorEndUserID } = params;
    return this._client.get('/quickbooks-desktop/company', {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }
}

export interface Company {
  /**
   * Information about the accountant's copy for this company file. An accountant's
   * copy allows an accountant to make changes while the business continues normal
   * operations. It includes a dividing date that defines the fiscal period the
   * accountant can work on, with restrictions on transactions and accounts within
   * that period. While an accountant copy exists, users cannot modify transactions
   * dated on or before the dividing date, cannot add subaccounts to existing
   * accounts, and cannot edit, merge, or make existing accounts inactive.
   */
  accountantCopy: Company.AccountantCopy | null;

  /**
   * The company's address, used on its invoices, checks, and other forms (along with
   * `companyName`). This is different from the company's legal address used on tax
   * forms and pay stubs (along with `legalCompanyName`).
   */
  address: Company.Address | null;

  /**
   * The address where this company receives mail from its customers.
   */
  addressForCustomer: Company.AddressForCustomer | null;

  /**
   * The name of the QuickBooks user's business associated with this company. This
   * name is used on invoices, checks, and other forms, while `legalCompanyName` is
   * used on tax forms and pay stubs.
   */
  companyName: string | null;

  /**
   * The company type, which the QuickBooks user selected from a list when creating
   * the company file.
   */
  companyType: string | null;

  /**
   * The custom fields for the company object, added as user-defined data extensions,
   * not included in the standard QuickBooks object.
   */
  customFields: Array<Company.CustomField>;

  /**
   * The company's Employer Identification Number.
   */
  ein: string | null;

  /**
   * The company's email address.
   */
  email: string | null;

  /**
   * The company's fax number.
   */
  fax: string | null;

  /**
   * The first month of this company's fiscal year, which determines the default date
   * range for financial reports.
   */
  fiscalYearStartMonth:
    | 'january'
    | 'february'
    | 'march'
    | 'april'
    | 'may'
    | 'june'
    | 'july'
    | 'august'
    | 'september'
    | 'october'
    | 'november'
    | 'december'
    | null;

  /**
   * The first month of this company's income tax year, which determines the default
   * date range for financial reports.
   */
  incomeTaxYearStartMonth:
    | 'january'
    | 'february'
    | 'march'
    | 'april'
    | 'may'
    | 'june'
    | 'july'
    | 'august'
    | 'september'
    | 'october'
    | 'november'
    | 'december'
    | null;

  /**
   * Indicates whether the connected QuickBooks company file is a "sample file",
   * which is a mock company file used for testing.
   */
  isSampleCompanyFile: boolean;

  /**
   * The company's legal address used on its tax forms and pay stubs (along with
   * `legalCompanyName`). This is different from the company's `address` used on
   * invoices, checks, and other forms (along with `companyName`).
   */
  legalAddress: Company.LegalAddress | null;

  /**
   * The legal name of this company's business, as specified in QuickBooks. This
   * value is used on tax forms and pay stubs, while `companyName` is used on
   * invoices, checks, and other forms.
   */
  legalCompanyName: string | null;

  /**
   * The company's primary telephone number.
   */
  phone: string | null;

  /**
   * The company's Social Security Number. The value can be with or without dashes.
   *
   * **NOTE**: This field cannot be changed after the company is created.
   */
  ssn: string | null;

  /**
   * The Intuit services that this company is or has been subscribed to, such as
   * Intuit Payroll.
   */
  subscribedServices: Company.SubscribedServices | null;

  /**
   * The tax form that the QuickBooks user expects to file for this company's taxes.
   * When a specific tax form is selected (any value other than `other_or_none`),
   * QuickBooks allows associating each account with a specific tax form line. This
   * association appears in account query responses.
   */
  taxForm:
    | 'form_1040'
    | 'form_1065'
    | 'form_1120'
    | 'form_1120s'
    | 'form_990'
    | 'form_990pf'
    | 'form_990t'
    | 'other_or_none'
    | null;

  /**
   * The company's public website.
   */
  website: string | null;
}

export namespace Company {
  /**
   * Information about the accountant's copy for this company file. An accountant's
   * copy allows an accountant to make changes while the business continues normal
   * operations. It includes a dividing date that defines the fiscal period the
   * accountant can work on, with restrictions on transactions and accounts within
   * that period. While an accountant copy exists, users cannot modify transactions
   * dated on or before the dividing date, cannot add subaccounts to existing
   * accounts, and cannot edit, merge, or make existing accounts inactive.
   */
  export interface AccountantCopy {
    /**
     * Indicates whether an accountant copy has been made for this company file. An
     * accountant copy allows an accountant to work on the books while the business
     * continues daily operations.
     */
    accountantCopyExists: boolean;

    /**
     * The fiscal period dividing date for accountant work, in ISO 8601 format
     * (YYYY-MM-DD). While an accountant copy exists, transactions within this period
     * cannot be modified or created. New accounts can be added, but existing accounts
     * cannot have new subaccounts, be edited, merged, or made inactive. List items
     * cannot be deleted or merged.
     */
    dividingDate: string | null;
  }

  /**
   * The company's address, used on its invoices, checks, and other forms (along with
   * `companyName`). This is different from the company's legal address used on tax
   * forms and pay stubs (along with `legalCompanyName`).
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
   * The address where this company receives mail from its customers.
   */
  export interface AddressForCustomer {
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

  /**
   * The company's legal address used on its tax forms and pay stubs (along with
   * `legalCompanyName`). This is different from the company's `address` used on
   * invoices, checks, and other forms (along with `companyName`).
   */
  export interface LegalAddress {
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
   * The Intuit services that this company is or has been subscribed to, such as
   * Intuit Payroll.
   */
  export interface SubscribedServices {
    /**
     * The list of Intuit services that this company is or has been subscribed to, for
     * example, Intuit Payroll, QBMS.
     */
    services: Array<SubscribedServices.Service>;
  }

  export namespace SubscribedServices {
    export interface Service {
      /**
       * The domain of this subscribed service
       */
      domain: string | null;

      /**
       * The case-insensitive unique name of this service, unique across all services.
       *
       * **NOTE**: Services do not have a `fullName` field because they are not
       * hierarchical objects, which is why `name` is unique for them but not for objects
       * that have parents.
       */
      name: string;

      /**
       * The status of this service's subscription.
       */
      serviceStatus: 'active' | 'expired' | 'never' | 'pending' | 'suspended' | 'terminated' | 'trial' | null;
    }
  }
}

export interface CompanyRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;
}

export declare namespace CompanyResource {
  export { type Company as Company, type CompanyRetrieveParams as CompanyRetrieveParams };
}
