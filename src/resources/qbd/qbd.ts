// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as AccountsAPI from './accounts';
import {
  Account,
  AccountCreateParams,
  AccountListParams,
  AccountListResponse,
  AccountRetrieveParams,
  AccountUpdateParams,
  Accounts,
} from './accounts';
import * as BillCheckPaymentsAPI from './bill-check-payments';
import {
  BillCheckPayment,
  BillCheckPaymentCreateParams,
  BillCheckPaymentDeleteParams,
  BillCheckPaymentDeleteResponse,
  BillCheckPaymentListParams,
  BillCheckPaymentRetrieveParams,
  BillCheckPaymentUpdateParams,
  BillCheckPayments,
  BillCheckPaymentsCursorPage,
} from './bill-check-payments';
import * as BillCreditCardPaymentsAPI from './bill-credit-card-payments';
import {
  BillCreditCardPayment,
  BillCreditCardPaymentCreateParams,
  BillCreditCardPaymentDeleteParams,
  BillCreditCardPaymentDeleteResponse,
  BillCreditCardPaymentListParams,
  BillCreditCardPaymentRetrieveParams,
  BillCreditCardPayments,
  BillCreditCardPaymentsCursorPage,
} from './bill-credit-card-payments';
import * as BillsAPI from './bills';
import {
  Bill,
  BillCreateParams,
  BillDeleteParams,
  BillDeleteResponse,
  BillListParams,
  BillRetrieveParams,
  BillUpdateParams,
  Bills,
  BillsCursorPage,
} from './bills';
import * as ChecksAPI from './checks';
import {
  Check,
  CheckCreateParams,
  CheckDeleteParams,
  CheckDeleteResponse,
  CheckListParams,
  CheckRetrieveParams,
  CheckUpdateParams,
  Checks,
  ChecksCursorPage,
} from './checks';
import * as ClassesAPI from './classes';
import {
  Class,
  ClassCreateParams,
  ClassListParams,
  ClassListResponse,
  ClassRetrieveParams,
  ClassUpdateParams,
  Classes,
} from './classes';
import * as CompanyAPI from './company';
import { Company, CompanyResource, CompanyRetrieveParams } from './company';
import * as CreditCardChargesAPI from './credit-card-charges';
import {
  CreditCardCharge,
  CreditCardChargeCreateParams,
  CreditCardChargeDeleteParams,
  CreditCardChargeDeleteResponse,
  CreditCardChargeListParams,
  CreditCardChargeRetrieveParams,
  CreditCardChargeUpdateParams,
  CreditCardCharges,
  CreditCardChargesCursorPage,
} from './credit-card-charges';
import * as CreditCardCreditsAPI from './credit-card-credits';
import {
  CreditCardCredit,
  CreditCardCreditCreateParams,
  CreditCardCreditDeleteParams,
  CreditCardCreditDeleteResponse,
  CreditCardCreditListParams,
  CreditCardCreditRetrieveParams,
  CreditCardCreditUpdateParams,
  CreditCardCredits,
  CreditCardCreditsCursorPage,
} from './credit-card-credits';
import * as CreditMemosAPI from './credit-memos';
import {
  CreditMemo,
  CreditMemoCreateParams,
  CreditMemoDeleteParams,
  CreditMemoDeleteResponse,
  CreditMemoListParams,
  CreditMemoRetrieveParams,
  CreditMemoUpdateParams,
  CreditMemos,
  CreditMemosCursorPage,
} from './credit-memos';
import * as CustomersAPI from './customers';
import {
  Customer,
  CustomerCreateParams,
  CustomerListParams,
  CustomerRetrieveParams,
  CustomerUpdateParams,
  Customers,
  CustomersCursorPage,
} from './customers';
import * as DateDrivenTermsAPI from './date-driven-terms';
import {
  DateDrivenTerm,
  DateDrivenTermCreateParams,
  DateDrivenTermListParams,
  DateDrivenTermListResponse,
  DateDrivenTermRetrieveParams,
  DateDrivenTerms,
} from './date-driven-terms';
import * as DiscountItemsAPI from './discount-items';
import {
  DiscountItem,
  DiscountItemCreateParams,
  DiscountItemListParams,
  DiscountItemRetrieveParams,
  DiscountItemUpdateParams,
  DiscountItems,
  DiscountItemsCursorPage,
} from './discount-items';
import * as EmployeesAPI from './employees';
import {
  Employee,
  EmployeeCreateParams,
  EmployeeListParams,
  EmployeeRetrieveParams,
  EmployeeUpdateParams,
  Employees,
  EmployeesCursorPage,
} from './employees';
import * as EstimatesAPI from './estimates';
import {
  Estimate,
  EstimateCreateParams,
  EstimateDeleteParams,
  EstimateDeleteResponse,
  EstimateListParams,
  EstimateRetrieveParams,
  EstimateUpdateParams,
  Estimates,
  EstimatesCursorPage,
} from './estimates';
import * as InventoryAdjustmentsAPI from './inventory-adjustments';
import {
  InventoryAdjustment,
  InventoryAdjustmentCreateParams,
  InventoryAdjustmentDeleteParams,
  InventoryAdjustmentDeleteResponse,
  InventoryAdjustmentListParams,
  InventoryAdjustmentListResponse,
  InventoryAdjustmentRetrieveParams,
  InventoryAdjustmentUpdateParams,
  InventoryAdjustments,
} from './inventory-adjustments';
import * as InventoryAssemblyItemsAPI from './inventory-assembly-items';
import {
  InventoryAssemblyItem,
  InventoryAssemblyItemCreateParams,
  InventoryAssemblyItemListParams,
  InventoryAssemblyItemRetrieveParams,
  InventoryAssemblyItemUpdateParams,
  InventoryAssemblyItems,
  InventoryAssemblyItemsCursorPage,
} from './inventory-assembly-items';
import * as InventoryItemsAPI from './inventory-items';
import {
  InventoryItem,
  InventoryItemCreateParams,
  InventoryItemListParams,
  InventoryItemRetrieveParams,
  InventoryItemUpdateParams,
  InventoryItems,
  InventoryItemsCursorPage,
} from './inventory-items';
import * as InventorySitesAPI from './inventory-sites';
import {
  InventorySite,
  InventorySiteCreateParams,
  InventorySiteListParams,
  InventorySiteListResponse,
  InventorySiteRetrieveParams,
  InventorySiteUpdateParams,
  InventorySites,
} from './inventory-sites';
import * as InvoicesAPI from './invoices';
import {
  Invoice,
  InvoiceCreateParams,
  InvoiceDeleteParams,
  InvoiceDeleteResponse,
  InvoiceListParams,
  InvoiceRetrieveParams,
  InvoiceUpdateParams,
  Invoices,
  InvoicesCursorPage,
} from './invoices';
import * as JournalEntriesAPI from './journal-entries';
import {
  JournalEntries,
  JournalEntriesCursorPage,
  JournalEntry,
  JournalEntryCreateParams,
  JournalEntryDeleteParams,
  JournalEntryDeleteResponse,
  JournalEntryListParams,
  JournalEntryRetrieveParams,
  JournalEntryUpdateParams,
} from './journal-entries';
import * as NonInventoryItemsAPI from './non-inventory-items';
import {
  NonInventoryItem,
  NonInventoryItemCreateParams,
  NonInventoryItemListParams,
  NonInventoryItemRetrieveParams,
  NonInventoryItemUpdateParams,
  NonInventoryItems,
  NonInventoryItemsCursorPage,
} from './non-inventory-items';
import * as PayrollWageItemsAPI from './payroll-wage-items';
import {
  PayrollWageItem,
  PayrollWageItemCreateParams,
  PayrollWageItemListParams,
  PayrollWageItemRetrieveParams,
  PayrollWageItems,
  PayrollWageItemsCursorPage,
} from './payroll-wage-items';
import * as PreferencesAPI from './preferences';
import { PreferenceRetrieveParams, Preferences } from './preferences';
import * as PurchaseOrdersAPI from './purchase-orders';
import {
  PurchaseOrder,
  PurchaseOrderCreateParams,
  PurchaseOrderDeleteParams,
  PurchaseOrderDeleteResponse,
  PurchaseOrderListParams,
  PurchaseOrderRetrieveParams,
  PurchaseOrderUpdateParams,
  PurchaseOrders,
  PurchaseOrdersCursorPage,
} from './purchase-orders';
import * as ReceivePaymentsAPI from './receive-payments';
import {
  ReceivePayment,
  ReceivePaymentCreateParams,
  ReceivePaymentDeleteParams,
  ReceivePaymentDeleteResponse,
  ReceivePaymentListParams,
  ReceivePaymentRetrieveParams,
  ReceivePaymentUpdateParams,
  ReceivePayments,
  ReceivePaymentsCursorPage,
} from './receive-payments';
import * as SalesOrdersAPI from './sales-orders';
import {
  SalesOrder,
  SalesOrderCreateParams,
  SalesOrderDeleteParams,
  SalesOrderDeleteResponse,
  SalesOrderListParams,
  SalesOrderRetrieveParams,
  SalesOrderUpdateParams,
  SalesOrders,
  SalesOrdersCursorPage,
} from './sales-orders';
import * as SalesReceiptsAPI from './sales-receipts';
import {
  SalesReceipt,
  SalesReceiptCreateParams,
  SalesReceiptDeleteParams,
  SalesReceiptDeleteResponse,
  SalesReceiptListParams,
  SalesReceiptRetrieveParams,
  SalesReceiptUpdateParams,
  SalesReceipts,
  SalesReceiptsCursorPage,
} from './sales-receipts';
import * as SalesRepresentativesAPI from './sales-representatives';
import {
  SalesRepresentative,
  SalesRepresentativeCreateParams,
  SalesRepresentativeListParams,
  SalesRepresentativeListResponse,
  SalesRepresentativeRetrieveParams,
  SalesRepresentativeUpdateParams,
  SalesRepresentatives,
} from './sales-representatives';
import * as SalesTaxCodesAPI from './sales-tax-codes';
import {
  SalesTaxCode,
  SalesTaxCodeCreateParams,
  SalesTaxCodeListParams,
  SalesTaxCodeListResponse,
  SalesTaxCodeRetrieveParams,
  SalesTaxCodeUpdateParams,
  SalesTaxCodes,
} from './sales-tax-codes';
import * as SalesTaxItemsAPI from './sales-tax-items';
import {
  SalesTaxItem,
  SalesTaxItemCreateParams,
  SalesTaxItemListParams,
  SalesTaxItemRetrieveParams,
  SalesTaxItemUpdateParams,
  SalesTaxItems,
  SalesTaxItemsCursorPage,
} from './sales-tax-items';
import * as ServiceItemsAPI from './service-items';
import {
  ServiceItem,
  ServiceItemCreateParams,
  ServiceItemListParams,
  ServiceItemRetrieveParams,
  ServiceItemUpdateParams,
  ServiceItems,
  ServiceItemsCursorPage,
} from './service-items';
import * as StandardTermsAPI from './standard-terms';
import {
  StandardTerm,
  StandardTermCreateParams,
  StandardTermListParams,
  StandardTermListResponse,
  StandardTermRetrieveParams,
  StandardTerms,
} from './standard-terms';
import * as SubtotalItemsAPI from './subtotal-items';
import {
  SubtotalItem,
  SubtotalItemCreateParams,
  SubtotalItemListParams,
  SubtotalItemRetrieveParams,
  SubtotalItemUpdateParams,
  SubtotalItems,
  SubtotalItemsCursorPage,
} from './subtotal-items';
import * as TimeTrackingActivitiesAPI from './time-tracking-activities';
import {
  TimeTrackingActivities,
  TimeTrackingActivitiesCursorPage,
  TimeTrackingActivity,
  TimeTrackingActivityCreateParams,
  TimeTrackingActivityDeleteParams,
  TimeTrackingActivityDeleteResponse,
  TimeTrackingActivityListParams,
  TimeTrackingActivityRetrieveParams,
  TimeTrackingActivityUpdateParams,
} from './time-tracking-activities';
import * as TransactionsAPI from './transactions';
import {
  Transaction,
  TransactionListParams,
  TransactionRetrieveParams,
  Transactions,
  TransactionsCursorPage,
} from './transactions';
import * as TransfersAPI from './transfers';
import {
  Transfer,
  TransferCreateParams,
  TransferListParams,
  TransferRetrieveParams,
  TransferUpdateParams,
  Transfers,
  TransfersCursorPage,
} from './transfers';
import * as VendorCreditsAPI from './vendor-credits';
import {
  VendorCredit,
  VendorCreditCreateParams,
  VendorCreditDeleteParams,
  VendorCreditDeleteResponse,
  VendorCreditListParams,
  VendorCreditRetrieveParams,
  VendorCreditUpdateParams,
  VendorCredits,
  VendorCreditsCursorPage,
} from './vendor-credits';
import * as VendorsAPI from './vendors';
import {
  Vendor,
  VendorCreateParams,
  VendorListParams,
  VendorRetrieveParams,
  VendorUpdateParams,
  Vendors,
  VendorsCursorPage,
} from './vendors';

export class Qbd extends APIResource {
  accounts: AccountsAPI.Accounts = new AccountsAPI.Accounts(this._client);
  billCheckPayments: BillCheckPaymentsAPI.BillCheckPayments = new BillCheckPaymentsAPI.BillCheckPayments(
    this._client,
  );
  billCreditCardPayments: BillCreditCardPaymentsAPI.BillCreditCardPayments =
    new BillCreditCardPaymentsAPI.BillCreditCardPayments(this._client);
  bills: BillsAPI.Bills = new BillsAPI.Bills(this._client);
  checks: ChecksAPI.Checks = new ChecksAPI.Checks(this._client);
  classes: ClassesAPI.Classes = new ClassesAPI.Classes(this._client);
  company: CompanyAPI.CompanyResource = new CompanyAPI.CompanyResource(this._client);
  creditCardCharges: CreditCardChargesAPI.CreditCardCharges = new CreditCardChargesAPI.CreditCardCharges(
    this._client,
  );
  creditCardCredits: CreditCardCreditsAPI.CreditCardCredits = new CreditCardCreditsAPI.CreditCardCredits(
    this._client,
  );
  creditMemos: CreditMemosAPI.CreditMemos = new CreditMemosAPI.CreditMemos(this._client);
  customers: CustomersAPI.Customers = new CustomersAPI.Customers(this._client);
  dateDrivenTerms: DateDrivenTermsAPI.DateDrivenTerms = new DateDrivenTermsAPI.DateDrivenTerms(this._client);
  discountItems: DiscountItemsAPI.DiscountItems = new DiscountItemsAPI.DiscountItems(this._client);
  employees: EmployeesAPI.Employees = new EmployeesAPI.Employees(this._client);
  estimates: EstimatesAPI.Estimates = new EstimatesAPI.Estimates(this._client);
  inventoryAdjustments: InventoryAdjustmentsAPI.InventoryAdjustments =
    new InventoryAdjustmentsAPI.InventoryAdjustments(this._client);
  inventoryAssemblyItems: InventoryAssemblyItemsAPI.InventoryAssemblyItems =
    new InventoryAssemblyItemsAPI.InventoryAssemblyItems(this._client);
  inventoryItems: InventoryItemsAPI.InventoryItems = new InventoryItemsAPI.InventoryItems(this._client);
  inventorySites: InventorySitesAPI.InventorySites = new InventorySitesAPI.InventorySites(this._client);
  invoices: InvoicesAPI.Invoices = new InvoicesAPI.Invoices(this._client);
  journalEntries: JournalEntriesAPI.JournalEntries = new JournalEntriesAPI.JournalEntries(this._client);
  nonInventoryItems: NonInventoryItemsAPI.NonInventoryItems = new NonInventoryItemsAPI.NonInventoryItems(
    this._client,
  );
  payrollWageItems: PayrollWageItemsAPI.PayrollWageItems = new PayrollWageItemsAPI.PayrollWageItems(
    this._client,
  );
  preferences: PreferencesAPI.Preferences = new PreferencesAPI.Preferences(this._client);
  purchaseOrders: PurchaseOrdersAPI.PurchaseOrders = new PurchaseOrdersAPI.PurchaseOrders(this._client);
  receivePayments: ReceivePaymentsAPI.ReceivePayments = new ReceivePaymentsAPI.ReceivePayments(this._client);
  salesOrders: SalesOrdersAPI.SalesOrders = new SalesOrdersAPI.SalesOrders(this._client);
  salesReceipts: SalesReceiptsAPI.SalesReceipts = new SalesReceiptsAPI.SalesReceipts(this._client);
  salesRepresentatives: SalesRepresentativesAPI.SalesRepresentatives =
    new SalesRepresentativesAPI.SalesRepresentatives(this._client);
  salesTaxCodes: SalesTaxCodesAPI.SalesTaxCodes = new SalesTaxCodesAPI.SalesTaxCodes(this._client);
  salesTaxItems: SalesTaxItemsAPI.SalesTaxItems = new SalesTaxItemsAPI.SalesTaxItems(this._client);
  serviceItems: ServiceItemsAPI.ServiceItems = new ServiceItemsAPI.ServiceItems(this._client);
  standardTerms: StandardTermsAPI.StandardTerms = new StandardTermsAPI.StandardTerms(this._client);
  subtotalItems: SubtotalItemsAPI.SubtotalItems = new SubtotalItemsAPI.SubtotalItems(this._client);
  timeTrackingActivities: TimeTrackingActivitiesAPI.TimeTrackingActivities =
    new TimeTrackingActivitiesAPI.TimeTrackingActivities(this._client);
  transactions: TransactionsAPI.Transactions = new TransactionsAPI.Transactions(this._client);
  transfers: TransfersAPI.Transfers = new TransfersAPI.Transfers(this._client);
  vendorCredits: VendorCreditsAPI.VendorCredits = new VendorCreditsAPI.VendorCredits(this._client);
  vendors: VendorsAPI.Vendors = new VendorsAPI.Vendors(this._client);

  /**
   * Checks whether the specified QuickBooks Desktop connection is active and can
   * process requests end-to-end. This is useful for showing a "connection status"
   * indicator in your app. If an error occurs, the typical Conductor error response
   * will be returned. As with any request to QuickBooks Desktop, the health check
   * may fail if the application is not running, the wrong company file is open, or
   * if a modal dialog is open. Timeout is 60 seconds.
   */
  healthCheck(
    params: QbdHealthCheckParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<QbdHealthCheckResponse> {
    const { conductorEndUserId } = params;
    return this._client.get('/quickbooks-desktop/health-check', {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export interface QbdHealthCheckResponse {
  /**
   * The time, in milliseconds, that it took to perform the health check.
   */
  duration: number;

  /**
   * The status of the health check.
   */
  status: 'ok';
}

export interface QbdHealthCheckParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

Qbd.Accounts = Accounts;
Qbd.BillCheckPayments = BillCheckPayments;
Qbd.BillCheckPaymentsCursorPage = BillCheckPaymentsCursorPage;
Qbd.BillCreditCardPayments = BillCreditCardPayments;
Qbd.BillCreditCardPaymentsCursorPage = BillCreditCardPaymentsCursorPage;
Qbd.Bills = Bills;
Qbd.BillsCursorPage = BillsCursorPage;
Qbd.Checks = Checks;
Qbd.ChecksCursorPage = ChecksCursorPage;
Qbd.Classes = Classes;
Qbd.CompanyResource = CompanyResource;
Qbd.CreditCardCharges = CreditCardCharges;
Qbd.CreditCardChargesCursorPage = CreditCardChargesCursorPage;
Qbd.CreditCardCredits = CreditCardCredits;
Qbd.CreditCardCreditsCursorPage = CreditCardCreditsCursorPage;
Qbd.CreditMemos = CreditMemos;
Qbd.CreditMemosCursorPage = CreditMemosCursorPage;
Qbd.Customers = Customers;
Qbd.CustomersCursorPage = CustomersCursorPage;
Qbd.DateDrivenTerms = DateDrivenTerms;
Qbd.DiscountItems = DiscountItems;
Qbd.DiscountItemsCursorPage = DiscountItemsCursorPage;
Qbd.Employees = Employees;
Qbd.EmployeesCursorPage = EmployeesCursorPage;
Qbd.Estimates = Estimates;
Qbd.EstimatesCursorPage = EstimatesCursorPage;
Qbd.InventoryAdjustments = InventoryAdjustments;
Qbd.InventoryAssemblyItems = InventoryAssemblyItems;
Qbd.InventoryAssemblyItemsCursorPage = InventoryAssemblyItemsCursorPage;
Qbd.InventoryItems = InventoryItems;
Qbd.InventoryItemsCursorPage = InventoryItemsCursorPage;
Qbd.InventorySites = InventorySites;
Qbd.Invoices = Invoices;
Qbd.InvoicesCursorPage = InvoicesCursorPage;
Qbd.JournalEntries = JournalEntries;
Qbd.JournalEntriesCursorPage = JournalEntriesCursorPage;
Qbd.NonInventoryItems = NonInventoryItems;
Qbd.NonInventoryItemsCursorPage = NonInventoryItemsCursorPage;
Qbd.PayrollWageItems = PayrollWageItems;
Qbd.PayrollWageItemsCursorPage = PayrollWageItemsCursorPage;
Qbd.PurchaseOrders = PurchaseOrders;
Qbd.PurchaseOrdersCursorPage = PurchaseOrdersCursorPage;
Qbd.ReceivePayments = ReceivePayments;
Qbd.ReceivePaymentsCursorPage = ReceivePaymentsCursorPage;
Qbd.SalesOrders = SalesOrders;
Qbd.SalesOrdersCursorPage = SalesOrdersCursorPage;
Qbd.SalesReceipts = SalesReceipts;
Qbd.SalesReceiptsCursorPage = SalesReceiptsCursorPage;
Qbd.SalesRepresentatives = SalesRepresentatives;
Qbd.SalesTaxCodes = SalesTaxCodes;
Qbd.SalesTaxItems = SalesTaxItems;
Qbd.SalesTaxItemsCursorPage = SalesTaxItemsCursorPage;
Qbd.ServiceItems = ServiceItems;
Qbd.ServiceItemsCursorPage = ServiceItemsCursorPage;
Qbd.StandardTerms = StandardTerms;
Qbd.SubtotalItems = SubtotalItems;
Qbd.SubtotalItemsCursorPage = SubtotalItemsCursorPage;
Qbd.TimeTrackingActivities = TimeTrackingActivities;
Qbd.TimeTrackingActivitiesCursorPage = TimeTrackingActivitiesCursorPage;
Qbd.Transactions = Transactions;
Qbd.TransactionsCursorPage = TransactionsCursorPage;
Qbd.Transfers = Transfers;
Qbd.TransfersCursorPage = TransfersCursorPage;
Qbd.VendorCredits = VendorCredits;
Qbd.VendorCreditsCursorPage = VendorCreditsCursorPage;
Qbd.Vendors = Vendors;
Qbd.VendorsCursorPage = VendorsCursorPage;

export declare namespace Qbd {
  export {
    type QbdHealthCheckResponse as QbdHealthCheckResponse,
    type QbdHealthCheckParams as QbdHealthCheckParams,
  };

  export {
    Accounts as Accounts,
    type Account as Account,
    type AccountListResponse as AccountListResponse,
    type AccountCreateParams as AccountCreateParams,
    type AccountRetrieveParams as AccountRetrieveParams,
    type AccountUpdateParams as AccountUpdateParams,
    type AccountListParams as AccountListParams,
  };

  export {
    BillCheckPayments as BillCheckPayments,
    type BillCheckPayment as BillCheckPayment,
    type BillCheckPaymentDeleteResponse as BillCheckPaymentDeleteResponse,
    BillCheckPaymentsCursorPage as BillCheckPaymentsCursorPage,
    type BillCheckPaymentCreateParams as BillCheckPaymentCreateParams,
    type BillCheckPaymentRetrieveParams as BillCheckPaymentRetrieveParams,
    type BillCheckPaymentUpdateParams as BillCheckPaymentUpdateParams,
    type BillCheckPaymentListParams as BillCheckPaymentListParams,
    type BillCheckPaymentDeleteParams as BillCheckPaymentDeleteParams,
  };

  export {
    BillCreditCardPayments as BillCreditCardPayments,
    type BillCreditCardPayment as BillCreditCardPayment,
    type BillCreditCardPaymentDeleteResponse as BillCreditCardPaymentDeleteResponse,
    BillCreditCardPaymentsCursorPage as BillCreditCardPaymentsCursorPage,
    type BillCreditCardPaymentCreateParams as BillCreditCardPaymentCreateParams,
    type BillCreditCardPaymentRetrieveParams as BillCreditCardPaymentRetrieveParams,
    type BillCreditCardPaymentListParams as BillCreditCardPaymentListParams,
    type BillCreditCardPaymentDeleteParams as BillCreditCardPaymentDeleteParams,
  };

  export {
    Bills as Bills,
    type Bill as Bill,
    type BillDeleteResponse as BillDeleteResponse,
    BillsCursorPage as BillsCursorPage,
    type BillCreateParams as BillCreateParams,
    type BillRetrieveParams as BillRetrieveParams,
    type BillUpdateParams as BillUpdateParams,
    type BillListParams as BillListParams,
    type BillDeleteParams as BillDeleteParams,
  };

  export {
    Checks as Checks,
    type Check as Check,
    type CheckDeleteResponse as CheckDeleteResponse,
    ChecksCursorPage as ChecksCursorPage,
    type CheckCreateParams as CheckCreateParams,
    type CheckRetrieveParams as CheckRetrieveParams,
    type CheckUpdateParams as CheckUpdateParams,
    type CheckListParams as CheckListParams,
    type CheckDeleteParams as CheckDeleteParams,
  };

  export {
    Classes as Classes,
    type Class as Class,
    type ClassListResponse as ClassListResponse,
    type ClassCreateParams as ClassCreateParams,
    type ClassRetrieveParams as ClassRetrieveParams,
    type ClassUpdateParams as ClassUpdateParams,
    type ClassListParams as ClassListParams,
  };

  export {
    CompanyResource as CompanyResource,
    type Company as Company,
    type CompanyRetrieveParams as CompanyRetrieveParams,
  };

  export {
    CreditCardCharges as CreditCardCharges,
    type CreditCardCharge as CreditCardCharge,
    type CreditCardChargeDeleteResponse as CreditCardChargeDeleteResponse,
    CreditCardChargesCursorPage as CreditCardChargesCursorPage,
    type CreditCardChargeCreateParams as CreditCardChargeCreateParams,
    type CreditCardChargeRetrieveParams as CreditCardChargeRetrieveParams,
    type CreditCardChargeUpdateParams as CreditCardChargeUpdateParams,
    type CreditCardChargeListParams as CreditCardChargeListParams,
    type CreditCardChargeDeleteParams as CreditCardChargeDeleteParams,
  };

  export {
    CreditCardCredits as CreditCardCredits,
    type CreditCardCredit as CreditCardCredit,
    type CreditCardCreditDeleteResponse as CreditCardCreditDeleteResponse,
    CreditCardCreditsCursorPage as CreditCardCreditsCursorPage,
    type CreditCardCreditCreateParams as CreditCardCreditCreateParams,
    type CreditCardCreditRetrieveParams as CreditCardCreditRetrieveParams,
    type CreditCardCreditUpdateParams as CreditCardCreditUpdateParams,
    type CreditCardCreditListParams as CreditCardCreditListParams,
    type CreditCardCreditDeleteParams as CreditCardCreditDeleteParams,
  };

  export {
    CreditMemos as CreditMemos,
    type CreditMemo as CreditMemo,
    type CreditMemoDeleteResponse as CreditMemoDeleteResponse,
    CreditMemosCursorPage as CreditMemosCursorPage,
    type CreditMemoCreateParams as CreditMemoCreateParams,
    type CreditMemoRetrieveParams as CreditMemoRetrieveParams,
    type CreditMemoUpdateParams as CreditMemoUpdateParams,
    type CreditMemoListParams as CreditMemoListParams,
    type CreditMemoDeleteParams as CreditMemoDeleteParams,
  };

  export {
    Customers as Customers,
    type Customer as Customer,
    CustomersCursorPage as CustomersCursorPage,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerRetrieveParams as CustomerRetrieveParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerListParams as CustomerListParams,
  };

  export {
    DateDrivenTerms as DateDrivenTerms,
    type DateDrivenTerm as DateDrivenTerm,
    type DateDrivenTermListResponse as DateDrivenTermListResponse,
    type DateDrivenTermCreateParams as DateDrivenTermCreateParams,
    type DateDrivenTermRetrieveParams as DateDrivenTermRetrieveParams,
    type DateDrivenTermListParams as DateDrivenTermListParams,
  };

  export {
    DiscountItems as DiscountItems,
    type DiscountItem as DiscountItem,
    DiscountItemsCursorPage as DiscountItemsCursorPage,
    type DiscountItemCreateParams as DiscountItemCreateParams,
    type DiscountItemRetrieveParams as DiscountItemRetrieveParams,
    type DiscountItemUpdateParams as DiscountItemUpdateParams,
    type DiscountItemListParams as DiscountItemListParams,
  };

  export {
    Employees as Employees,
    type Employee as Employee,
    EmployeesCursorPage as EmployeesCursorPage,
    type EmployeeCreateParams as EmployeeCreateParams,
    type EmployeeRetrieveParams as EmployeeRetrieveParams,
    type EmployeeUpdateParams as EmployeeUpdateParams,
    type EmployeeListParams as EmployeeListParams,
  };

  export {
    Estimates as Estimates,
    type Estimate as Estimate,
    type EstimateDeleteResponse as EstimateDeleteResponse,
    EstimatesCursorPage as EstimatesCursorPage,
    type EstimateCreateParams as EstimateCreateParams,
    type EstimateRetrieveParams as EstimateRetrieveParams,
    type EstimateUpdateParams as EstimateUpdateParams,
    type EstimateListParams as EstimateListParams,
    type EstimateDeleteParams as EstimateDeleteParams,
  };

  export {
    InventoryAdjustments as InventoryAdjustments,
    type InventoryAdjustment as InventoryAdjustment,
    type InventoryAdjustmentListResponse as InventoryAdjustmentListResponse,
    type InventoryAdjustmentDeleteResponse as InventoryAdjustmentDeleteResponse,
    type InventoryAdjustmentCreateParams as InventoryAdjustmentCreateParams,
    type InventoryAdjustmentRetrieveParams as InventoryAdjustmentRetrieveParams,
    type InventoryAdjustmentUpdateParams as InventoryAdjustmentUpdateParams,
    type InventoryAdjustmentListParams as InventoryAdjustmentListParams,
    type InventoryAdjustmentDeleteParams as InventoryAdjustmentDeleteParams,
  };

  export {
    InventoryAssemblyItems as InventoryAssemblyItems,
    type InventoryAssemblyItem as InventoryAssemblyItem,
    InventoryAssemblyItemsCursorPage as InventoryAssemblyItemsCursorPage,
    type InventoryAssemblyItemCreateParams as InventoryAssemblyItemCreateParams,
    type InventoryAssemblyItemRetrieveParams as InventoryAssemblyItemRetrieveParams,
    type InventoryAssemblyItemUpdateParams as InventoryAssemblyItemUpdateParams,
    type InventoryAssemblyItemListParams as InventoryAssemblyItemListParams,
  };

  export {
    InventoryItems as InventoryItems,
    type InventoryItem as InventoryItem,
    InventoryItemsCursorPage as InventoryItemsCursorPage,
    type InventoryItemCreateParams as InventoryItemCreateParams,
    type InventoryItemRetrieveParams as InventoryItemRetrieveParams,
    type InventoryItemUpdateParams as InventoryItemUpdateParams,
    type InventoryItemListParams as InventoryItemListParams,
  };

  export {
    InventorySites as InventorySites,
    type InventorySite as InventorySite,
    type InventorySiteListResponse as InventorySiteListResponse,
    type InventorySiteCreateParams as InventorySiteCreateParams,
    type InventorySiteRetrieveParams as InventorySiteRetrieveParams,
    type InventorySiteUpdateParams as InventorySiteUpdateParams,
    type InventorySiteListParams as InventorySiteListParams,
  };

  export {
    Invoices as Invoices,
    type Invoice as Invoice,
    type InvoiceDeleteResponse as InvoiceDeleteResponse,
    InvoicesCursorPage as InvoicesCursorPage,
    type InvoiceCreateParams as InvoiceCreateParams,
    type InvoiceRetrieveParams as InvoiceRetrieveParams,
    type InvoiceUpdateParams as InvoiceUpdateParams,
    type InvoiceListParams as InvoiceListParams,
    type InvoiceDeleteParams as InvoiceDeleteParams,
  };

  export {
    JournalEntries as JournalEntries,
    type JournalEntry as JournalEntry,
    type JournalEntryDeleteResponse as JournalEntryDeleteResponse,
    JournalEntriesCursorPage as JournalEntriesCursorPage,
    type JournalEntryCreateParams as JournalEntryCreateParams,
    type JournalEntryRetrieveParams as JournalEntryRetrieveParams,
    type JournalEntryUpdateParams as JournalEntryUpdateParams,
    type JournalEntryListParams as JournalEntryListParams,
    type JournalEntryDeleteParams as JournalEntryDeleteParams,
  };

  export {
    NonInventoryItems as NonInventoryItems,
    type NonInventoryItem as NonInventoryItem,
    NonInventoryItemsCursorPage as NonInventoryItemsCursorPage,
    type NonInventoryItemCreateParams as NonInventoryItemCreateParams,
    type NonInventoryItemRetrieveParams as NonInventoryItemRetrieveParams,
    type NonInventoryItemUpdateParams as NonInventoryItemUpdateParams,
    type NonInventoryItemListParams as NonInventoryItemListParams,
  };

  export {
    PayrollWageItems as PayrollWageItems,
    type PayrollWageItem as PayrollWageItem,
    PayrollWageItemsCursorPage as PayrollWageItemsCursorPage,
    type PayrollWageItemCreateParams as PayrollWageItemCreateParams,
    type PayrollWageItemRetrieveParams as PayrollWageItemRetrieveParams,
    type PayrollWageItemListParams as PayrollWageItemListParams,
  };

  export { type Preferences as Preferences, type PreferenceRetrieveParams as PreferenceRetrieveParams };

  export {
    PurchaseOrders as PurchaseOrders,
    type PurchaseOrder as PurchaseOrder,
    type PurchaseOrderDeleteResponse as PurchaseOrderDeleteResponse,
    PurchaseOrdersCursorPage as PurchaseOrdersCursorPage,
    type PurchaseOrderCreateParams as PurchaseOrderCreateParams,
    type PurchaseOrderRetrieveParams as PurchaseOrderRetrieveParams,
    type PurchaseOrderUpdateParams as PurchaseOrderUpdateParams,
    type PurchaseOrderListParams as PurchaseOrderListParams,
    type PurchaseOrderDeleteParams as PurchaseOrderDeleteParams,
  };

  export {
    ReceivePayments as ReceivePayments,
    type ReceivePayment as ReceivePayment,
    type ReceivePaymentDeleteResponse as ReceivePaymentDeleteResponse,
    ReceivePaymentsCursorPage as ReceivePaymentsCursorPage,
    type ReceivePaymentCreateParams as ReceivePaymentCreateParams,
    type ReceivePaymentRetrieveParams as ReceivePaymentRetrieveParams,
    type ReceivePaymentUpdateParams as ReceivePaymentUpdateParams,
    type ReceivePaymentListParams as ReceivePaymentListParams,
    type ReceivePaymentDeleteParams as ReceivePaymentDeleteParams,
  };

  export {
    SalesOrders as SalesOrders,
    type SalesOrder as SalesOrder,
    type SalesOrderDeleteResponse as SalesOrderDeleteResponse,
    SalesOrdersCursorPage as SalesOrdersCursorPage,
    type SalesOrderCreateParams as SalesOrderCreateParams,
    type SalesOrderRetrieveParams as SalesOrderRetrieveParams,
    type SalesOrderUpdateParams as SalesOrderUpdateParams,
    type SalesOrderListParams as SalesOrderListParams,
    type SalesOrderDeleteParams as SalesOrderDeleteParams,
  };

  export {
    SalesReceipts as SalesReceipts,
    type SalesReceipt as SalesReceipt,
    type SalesReceiptDeleteResponse as SalesReceiptDeleteResponse,
    SalesReceiptsCursorPage as SalesReceiptsCursorPage,
    type SalesReceiptCreateParams as SalesReceiptCreateParams,
    type SalesReceiptRetrieveParams as SalesReceiptRetrieveParams,
    type SalesReceiptUpdateParams as SalesReceiptUpdateParams,
    type SalesReceiptListParams as SalesReceiptListParams,
    type SalesReceiptDeleteParams as SalesReceiptDeleteParams,
  };

  export {
    SalesRepresentatives as SalesRepresentatives,
    type SalesRepresentative as SalesRepresentative,
    type SalesRepresentativeListResponse as SalesRepresentativeListResponse,
    type SalesRepresentativeCreateParams as SalesRepresentativeCreateParams,
    type SalesRepresentativeRetrieveParams as SalesRepresentativeRetrieveParams,
    type SalesRepresentativeUpdateParams as SalesRepresentativeUpdateParams,
    type SalesRepresentativeListParams as SalesRepresentativeListParams,
  };

  export {
    SalesTaxCodes as SalesTaxCodes,
    type SalesTaxCode as SalesTaxCode,
    type SalesTaxCodeListResponse as SalesTaxCodeListResponse,
    type SalesTaxCodeCreateParams as SalesTaxCodeCreateParams,
    type SalesTaxCodeRetrieveParams as SalesTaxCodeRetrieveParams,
    type SalesTaxCodeUpdateParams as SalesTaxCodeUpdateParams,
    type SalesTaxCodeListParams as SalesTaxCodeListParams,
  };

  export {
    SalesTaxItems as SalesTaxItems,
    type SalesTaxItem as SalesTaxItem,
    SalesTaxItemsCursorPage as SalesTaxItemsCursorPage,
    type SalesTaxItemCreateParams as SalesTaxItemCreateParams,
    type SalesTaxItemRetrieveParams as SalesTaxItemRetrieveParams,
    type SalesTaxItemUpdateParams as SalesTaxItemUpdateParams,
    type SalesTaxItemListParams as SalesTaxItemListParams,
  };

  export {
    ServiceItems as ServiceItems,
    type ServiceItem as ServiceItem,
    ServiceItemsCursorPage as ServiceItemsCursorPage,
    type ServiceItemCreateParams as ServiceItemCreateParams,
    type ServiceItemRetrieveParams as ServiceItemRetrieveParams,
    type ServiceItemUpdateParams as ServiceItemUpdateParams,
    type ServiceItemListParams as ServiceItemListParams,
  };

  export {
    StandardTerms as StandardTerms,
    type StandardTerm as StandardTerm,
    type StandardTermListResponse as StandardTermListResponse,
    type StandardTermCreateParams as StandardTermCreateParams,
    type StandardTermRetrieveParams as StandardTermRetrieveParams,
    type StandardTermListParams as StandardTermListParams,
  };

  export {
    SubtotalItems as SubtotalItems,
    type SubtotalItem as SubtotalItem,
    SubtotalItemsCursorPage as SubtotalItemsCursorPage,
    type SubtotalItemCreateParams as SubtotalItemCreateParams,
    type SubtotalItemRetrieveParams as SubtotalItemRetrieveParams,
    type SubtotalItemUpdateParams as SubtotalItemUpdateParams,
    type SubtotalItemListParams as SubtotalItemListParams,
  };

  export {
    TimeTrackingActivities as TimeTrackingActivities,
    type TimeTrackingActivity as TimeTrackingActivity,
    type TimeTrackingActivityDeleteResponse as TimeTrackingActivityDeleteResponse,
    TimeTrackingActivitiesCursorPage as TimeTrackingActivitiesCursorPage,
    type TimeTrackingActivityCreateParams as TimeTrackingActivityCreateParams,
    type TimeTrackingActivityRetrieveParams as TimeTrackingActivityRetrieveParams,
    type TimeTrackingActivityUpdateParams as TimeTrackingActivityUpdateParams,
    type TimeTrackingActivityListParams as TimeTrackingActivityListParams,
    type TimeTrackingActivityDeleteParams as TimeTrackingActivityDeleteParams,
  };

  export {
    Transactions as Transactions,
    type Transaction as Transaction,
    TransactionsCursorPage as TransactionsCursorPage,
    type TransactionRetrieveParams as TransactionRetrieveParams,
    type TransactionListParams as TransactionListParams,
  };

  export {
    Transfers as Transfers,
    type Transfer as Transfer,
    TransfersCursorPage as TransfersCursorPage,
    type TransferCreateParams as TransferCreateParams,
    type TransferRetrieveParams as TransferRetrieveParams,
    type TransferUpdateParams as TransferUpdateParams,
    type TransferListParams as TransferListParams,
  };

  export {
    VendorCredits as VendorCredits,
    type VendorCredit as VendorCredit,
    type VendorCreditDeleteResponse as VendorCreditDeleteResponse,
    VendorCreditsCursorPage as VendorCreditsCursorPage,
    type VendorCreditCreateParams as VendorCreditCreateParams,
    type VendorCreditRetrieveParams as VendorCreditRetrieveParams,
    type VendorCreditUpdateParams as VendorCreditUpdateParams,
    type VendorCreditListParams as VendorCreditListParams,
    type VendorCreditDeleteParams as VendorCreditDeleteParams,
  };

  export {
    Vendors as Vendors,
    type Vendor as Vendor,
    VendorsCursorPage as VendorsCursorPage,
    type VendorCreateParams as VendorCreateParams,
    type VendorRetrieveParams as VendorRetrieveParams,
    type VendorUpdateParams as VendorUpdateParams,
    type VendorListParams as VendorListParams,
  };
}
