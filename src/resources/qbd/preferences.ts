// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Preferences extends APIResource {
  /**
   * Returns the preferences that the QuickBooks administrator has set for all users
   * of the connected company file. Note that preferences cannot be modified through
   * the API, only through the QuickBooks Desktop user interface.
   *
   * @example
   * ```ts
   * const preferences =
   *   await conductor.qbd.preferences.retrieve({
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  retrieve(params: PreferenceRetrieveParams, options?: RequestOptions): APIPromise<Preferences> {
    const { conductorEndUserId } = params;
    return this._client.get('/quickbooks-desktop/preferences', {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }
}

export interface Preferences {
  /**
   * The accounting preferences for this company file.
   */
  accounting: Preferences.Accounting;

  /**
   * The current application access rights for this company file.
   */
  appAccessRights: Preferences.AppAccessRights;

  /**
   * The finance charge preferences for this company file. These settings determine
   * how late payment charges are calculated and applied to customer accounts.
   */
  financeCharges: Preferences.FinanceCharges;

  /**
   * The item inventory preferences for this company file.
   */
  itemsAndInventory: Preferences.ItemsAndInventory | null;

  /**
   * The jobs and estimates preferences for this company file.
   */
  jobsAndEstimates: Preferences.JobsAndEstimates;

  /**
   * The multi-currency preferences for this company file.
   */
  multiCurrency: Preferences.MultiCurrency | null;

  /**
   * The multi-location inventory preferences for this company file.
   */
  multiLocationInventory: Preferences.MultiLocationInventory | null;

  /**
   * The purchases and vendors preferences for this company file.
   */
  purchasesAndVendors: Preferences.PurchasesAndVendors;

  /**
   * The reporting preferences for this company file.
   */
  reports: Preferences.Reports;

  /**
   * The sales and customers preferences for this company file.
   */
  salesAndCustomers: Preferences.SalesAndCustomers;

  /**
   * The sales-tax preferences for this company file. If sales tax is turned off in
   * the user interface (that is, if "No" is selected for "Do You Charge Sales Tax?"
   * in the sales tax preferences), then this field will be `null`.
   */
  salesTax: Preferences.SalesTax | null;

  /**
   * The time-tracking preferences for this company file. If time tracking is turned
   * off in the user interface (that is, if "No" is selected for "Do You Track Time?"
   * in the time tracking preferences), then this field will be `null`.
   */
  timeTracking: Preferences.TimeTracking | null;
}

export namespace Preferences {
  /**
   * The accounting preferences for this company file.
   */
  export interface Accounting {
    /**
     * The company closing date set within this company file. (The QuickBooks Admin can
     * assign a password restricting access to transactions that occurred before this
     * date.)
     */
    closingDate: string | null;

    /**
     * The default class assigned to transactions for this company file.
     */
    defaultTransactionClass: 'accounts' | 'items' | 'names' | 'none' | null;

    /**
     * Indicates whether this company file is configured to automatically assign a
     * number to each journal entry.
     */
    isAssigningJournalEntryNumbers: boolean;

    /**
     * Indicates whether this company file is configured to require an account for new
     * transactions. If `true`, a transaction cannot be recorded in the QuickBooks user
     * interface unless it is assigned to an account. (However, transactions affected
     * by this preference always require an account to be specified when added through
     * the API.)
     */
    isRequiringAccounts: boolean;

    /**
     * Indicates whether this company file is configured to record an account number
     * for new accounts. If you include an account number when creating a new account
     * while this preference is `false`, the account number will still be set, but will
     * not be visible in the QuickBooks user interface.
     */
    isUsingAccountNumbers: boolean;

    /**
     * Indicates whether this company file is configured to log all transaction changes
     * in the audit trail report. If `false`, QuickBooks logs only the most recent
     * version of each transaction.
     */
    isUsingAuditTrail: boolean;

    /**
     * Indicates whether this company file is configured to use the `class` field on
     * all transactions.
     */
    isUsingClassTracking: boolean;
  }

  /**
   * The current application access rights for this company file.
   */
  export interface AppAccessRights {
    /**
     * If auto-login is allowed for this company file, specifies the user name that is
     * allowed to use auto-login.
     */
    automaticLoginUserName: string | null;

    /**
     * Indicates whether applications can use auto-login to access this company file.
     */
    isAutomaticLoginAllowed: boolean;

    /**
     * Indicates whether access is allowed to personal (sensitive) data in this company
     * file.
     */
    isPersonalDataAccessAllowed: boolean;
  }

  /**
   * The finance charge preferences for this company file. These settings determine
   * how late payment charges are calculated and applied to customer accounts.
   */
  export interface FinanceCharges {
    /**
     * The interest rate that QuickBooks will use to calculate finance charges for this
     * company file. Default is `0`.
     */
    annualInterestRate: number | null;

    /**
     * The date from which finance charges are calculated for this company file.
     * Default is `due_date`.
     */
    calculateChargesFrom: 'due_date' | 'invoice_or_billed_date';

    /**
     * The account used to track finance charges that customers pay for this company
     * file. This is usually an income account.
     */
    financeChargeAccount: FinanceCharges.FinanceChargeAccount | null;

    /**
     * The number of days before finance charges apply to customers' overdue invoices
     * for this company file. Default is `0`.
     */
    gracePeriod: number;

    /**
     * Indicates whether this company file is configured to assess finance charges for
     * overdue invoices. Default is `false`. (Note that laws vary about whether a
     * company can charge interest on overdue interest payments.)
     */
    isAssessingForOverdueCharges: boolean;

    /**
     * Indicates whether this company file is configured to mark all newly created
     * finance-charge invoices as "to be printed". Default is `false`. The user can
     * still change this preference for each individual invoice.
     */
    isMarkedToBePrinted: boolean;

    /**
     * The minimum finance charge that will be applied regardless of the amount overdue
     * for this company file. Default is `0`.
     */
    minimumFinanceCharge: number | null;
  }

  export namespace FinanceCharges {
    /**
     * The account used to track finance charges that customers pay for this company
     * file. This is usually an income account.
     */
    export interface FinanceChargeAccount {
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
   * The item inventory preferences for this company file.
   */
  export interface ItemsAndInventory {
    /**
     * The date from which FIFO (First In, First Out) is used to calculate the value of
     * inventory sold and on-hand for this company file, in ISO 8601 format
     * (YYYY-MM-DD).
     */
    fifoEffectiveDate: string | null;

    /**
     * Specifies the type of inventory tracking that this company file uses.
     */
    inventoryTrackingMethod: 'none' | 'serial_number' | 'lot_number' | null;

    /**
     * Indicates whether barcode functionality is enabled for this company file.
     */
    isBarcodeEnabled: boolean | null;

    /**
     * Indicates whether bin tracking is enabled for this company file. When `true`,
     * inventory can be tracked by bin locations within sites.
     */
    isBinTrackingEnabled: boolean | null;

    /**
     * Indicates whether enhanced inventory receiving is enabled for this company file.
     */
    isEnhancedInventoryReceivingEnabled: boolean | null;

    /**
     * Indicates whether this company file is configured to use FIFO (First In, First
     * Out) to calculate the value of inventory sold and on-hand.
     */
    isFifoEnabled: boolean | null;

    /**
     * Indicates whether expiration dates for inventory serial/lot numbers are enabled
     * for this company file. This feature is supported from QuickBooks Desktop 2023.
     */
    isInventoryExpirationDateEnabled: boolean | null;

    /**
     * Indicates whether serial/lot number tracking is enabled for build assemblies in
     * this company file.
     */
    isTrackingOnBuildAssemblyEnabled: boolean | null;

    /**
     * Indicates whether serial/lot number tracking is enabled for inventory
     * adjustments in this company file.
     */
    isTrackingOnInventoryAdjustmentEnabled: boolean | null;

    /**
     * Indicates whether serial/lot number tracking is enabled for purchase
     * transactions in this company file.
     */
    isTrackingOnPurchaseTransactionsEnabled: boolean | null;

    /**
     * Indicates whether serial/lot number tracking is enabled for sales transactions
     * in this company file.
     */
    isTrackingOnSalesTransactionsEnabled: boolean | null;
  }

  /**
   * The jobs and estimates preferences for this company file.
   */
  export interface JobsAndEstimates {
    /**
     * Indicates whether this company file is configured to print line items with zero
     * amounts on progress invoices. This preference is only relevant if
     * `isUsingProgressInvoicing` is `true`.
     */
    isPrintingItemsWithZeroAmounts: boolean;

    /**
     * Indicates whether this company file is configured to create estimates for jobs.
     */
    isUsingEstimates: boolean;

    /**
     * Indicates whether this company file permits creating invoices for only a portion
     * of an estimate.
     */
    isUsingProgressInvoicing: boolean;
  }

  /**
   * The multi-currency preferences for this company file.
   */
  export interface MultiCurrency {
    /**
     * The currency that is set as the home currency for this company file. The home
     * currency is normally the currency of the country where the business is
     * physically located. Although a home currency other than US Dollars can be
     * chosen, certain QuickBooks convenience features are available only with a home
     * currency of US Dollars, such as the ability to download current exchange rates.
     * Also, Intuit services such as payroll and online banking are only available in
     * US Dollars. Once the home currency has been set and used in any transaction, it
     * cannot be changed.
     */
    homeCurrency: MultiCurrency.HomeCurrency | null;

    /**
     * Indicates whether the multicurrency feature is enabled for this company file.
     * Once multicurrency is enabled for a company file, it cannot be disabled.
     */
    isMultiCurrencyEnabled: boolean | null;
  }

  export namespace MultiCurrency {
    /**
     * The currency that is set as the home currency for this company file. The home
     * currency is normally the currency of the country where the business is
     * physically located. Although a home currency other than US Dollars can be
     * chosen, certain QuickBooks convenience features are available only with a home
     * currency of US Dollars, such as the ability to download current exchange rates.
     * Also, Intuit services such as payroll and online banking are only available in
     * US Dollars. Once the home currency has been set and used in any transaction, it
     * cannot be changed.
     */
    export interface HomeCurrency {
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
   * The multi-location inventory preferences for this company file.
   */
  export interface MultiLocationInventory {
    /**
     * Indicates whether the multilocation inventory feature is available for this
     * company file. When `true`, the feature can potentially be enabled.
     */
    isMultiLocationInventoryAvailable: boolean | null;

    /**
     * Indicates whether the multilocation inventory feature is enabled for this
     * company file. When `true`, inventory can be tracked across multiple locations.
     */
    isMultiLocationInventoryEnabled: boolean | null;
  }

  /**
   * The purchases and vendors preferences for this company file.
   */
  export interface PurchasesAndVendors {
    /**
     * The default number of days after receipt when bills are due for this company
     * file.
     */
    daysBillsAreDue: number;

    /**
     * The account used to track vendor discounts for this company file.
     */
    defaultDiscountAccount: PurchasesAndVendors.DefaultDiscountAccount | null;

    /**
     * Indicates whether this company file is configured to automatically apply
     * available vendor discounts or credits when paying bills.
     */
    isAutomaticallyUsingDiscounts: boolean;

    /**
     * Indicates whether this company file has inventory-related features enabled.
     */
    isUsingInventory: boolean;
  }

  export namespace PurchasesAndVendors {
    /**
     * The account used to track vendor discounts for this company file.
     */
    export interface DefaultDiscountAccount {
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
   * The reporting preferences for this company file.
   */
  export interface Reports {
    /**
     * Determines how the aging periods are calculated in accounts receivable and
     * accounts payable reports for this company file. When set to `age_from_due_date`,
     * the overdue days shown in these reports begin with the due date on the invoice.
     * When set to `age_from_transaction_date`, the overdue days begin with the date
     * the transaction was created.
     */
    agingReportBasis: 'age_from_due_date' | 'age_from_transaction_date';

    /**
     * Indicates whether summary reports for this company file use cash-basis or
     * accrual-basis bookkeeping. With `accrual` basis, transactions are recorded when
     * they occur regardless of when payment is received or made. With `cash` basis,
     * transactions are recorded only when payment is received or made.
     */
    summaryReportBasis: 'accrual' | 'cash';
  }

  /**
   * The sales and customers preferences for this company file.
   */
  export interface SalesAndCustomers {
    /**
     * The default percentage that an inventory item will be marked up from its cost
     * for this company file.
     */
    defaultMarkupPercentage: string | null;

    /**
     * The default shipment-origin location (i.e., FOB - freight on board) from which
     * invoiced products are shipped for this company file. This indicates the point at
     * which ownership and liability for goods transfer from seller to buyer.
     */
    defaultShipmentOrigin: string | null;

    /**
     * The default shipping method used in all "Ship Via" fields for this company file.
     */
    defaultShippingMethod: SalesAndCustomers.DefaultShippingMethod | null;

    /**
     * Indicates whether this company file is configured to automatically apply a
     * customer's payment to their outstanding invoices, beginning with the oldest
     * invoice.
     */
    isAutoApplyingPayments: boolean;

    /**
     * Indicates whether this company file is configured to track an expense and the
     * customer's reimbursement for that expense in separate accounts. When `true`,
     * reimbursements can be tracked as income rather than as a reduction of the
     * original expense.
     */
    isTrackingReimbursedExpensesAsIncome: boolean;

    /**
     * The custom pricing settings for this company file that can be assigned to
     * specific customers. When a price level is set for a customer, QuickBooks
     * automatically applies these custom prices to new invoices, sales receipts, sales
     * orders, and credit memos. These settings can be overridden when creating
     * individual transactions, and price levels can also be specified on individual
     * line items in supported sales transactions.
     */
    priceLevels: SalesAndCustomers.PriceLevels | null;
  }

  export namespace SalesAndCustomers {
    /**
     * The default shipping method used in all "Ship Via" fields for this company file.
     */
    export interface DefaultShippingMethod {
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
     * The custom pricing settings for this company file that can be assigned to
     * specific customers. When a price level is set for a customer, QuickBooks
     * automatically applies these custom prices to new invoices, sales receipts, sales
     * orders, and credit memos. These settings can be overridden when creating
     * individual transactions, and price levels can also be specified on individual
     * line items in supported sales transactions.
     */
    export interface PriceLevels {
      /**
       * Indicates whether this company file is configured to round amounts up to the
       * nearest whole dollar for fixed percentage price levels. This setting does not
       * affect per-item price levels.
       */
      isRoundingSalesPriceUp: boolean | null;

      /**
       * Indicates whether this company file has price levels enabled. When `true`, price
       * levels can be created and used to automatically calculate custom pricing for
       * different customers.
       */
      isUsingPriceLevels: boolean;
    }
  }

  /**
   * The sales-tax preferences for this company file. If sales tax is turned off in
   * the user interface (that is, if "No" is selected for "Do You Charge Sales Tax?"
   * in the sales tax preferences), then this field will be `null`.
   */
  export interface SalesTax {
    /**
     * The default tax code for sales for this company file.
     */
    defaultItemSalesTax: SalesTax.DefaultItemSalesTax | null;

    /**
     * The default tax code for non-taxable sales for this company file.
     */
    defaultNonTaxableSalesTaxCode: SalesTax.DefaultNonTaxableSalesTaxCode;

    /**
     * The default tax code for taxable sales for this company file.
     */
    defaultTaxableSalesTaxCode: SalesTax.DefaultTaxableSalesTaxCode;

    /**
     * Indicates whether this company file is configured to use tax codes for
     * customers.
     */
    isUsingCustomerTaxCode: boolean | null;

    /**
     * Indicates whether this company file is configured to allow tax-inclusive prices.
     */
    isUsingTaxInclusivePrices: boolean | null;

    /**
     * Indicates whether this company file is configured to use tax codes for vendors.
     */
    isUsingVendorTaxCode: boolean | null;

    /**
     * The frequency at which sales tax reports are generated for this company file.
     */
    salesTaxReportingFrequency: 'monthly' | 'quarterly' | 'annually';
  }

  export namespace SalesTax {
    /**
     * The default tax code for sales for this company file.
     */
    export interface DefaultItemSalesTax {
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
     * The default tax code for non-taxable sales for this company file.
     */
    export interface DefaultNonTaxableSalesTaxCode {
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
     * The default tax code for taxable sales for this company file.
     */
    export interface DefaultTaxableSalesTaxCode {
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
   * The time-tracking preferences for this company file. If time tracking is turned
   * off in the user interface (that is, if "No" is selected for "Do You Track Time?"
   * in the time tracking preferences), then this field will be `null`.
   */
  export interface TimeTracking {
    /**
     * The first day of a weekly timesheet period for this company file.
     */
    firstDayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  }
}

export interface PreferenceRetrieveParams {
  /**
   * The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;
}

export declare namespace Preferences {
  export { type Preferences as Preferences, type PreferenceRetrieveParams as PreferenceRetrieveParams };
}
