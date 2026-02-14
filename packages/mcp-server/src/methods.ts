// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'conductor.authSessions.create',
    fullyQualifiedName: 'authSessions.create',
    httpMethod: 'post',
    httpPath: '/auth-sessions',
  },
  {
    clientCallName: 'conductor.endUsers.create',
    fullyQualifiedName: 'endUsers.create',
    httpMethod: 'post',
    httpPath: '/end-users',
  },
  {
    clientCallName: 'conductor.endUsers.retrieve',
    fullyQualifiedName: 'endUsers.retrieve',
    httpMethod: 'get',
    httpPath: '/end-users/{id}',
  },
  {
    clientCallName: 'conductor.endUsers.list',
    fullyQualifiedName: 'endUsers.list',
    httpMethod: 'get',
    httpPath: '/end-users',
  },
  {
    clientCallName: 'conductor.endUsers.delete',
    fullyQualifiedName: 'endUsers.delete',
    httpMethod: 'delete',
    httpPath: '/end-users/{id}',
  },
  {
    clientCallName: 'conductor.endUsers.passthrough',
    fullyQualifiedName: 'endUsers.passthrough',
    httpMethod: 'post',
    httpPath: '/end-users/{id}/passthrough/{integrationSlug}',
  },
  {
    clientCallName: 'conductor.qbd.healthCheck',
    fullyQualifiedName: 'qbd.healthCheck',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/health-check',
  },
  {
    clientCallName: 'conductor.qbd.accountTaxLines.list',
    fullyQualifiedName: 'qbd.accountTaxLines.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/account-tax-lines',
  },
  {
    clientCallName: 'conductor.qbd.accounts.create',
    fullyQualifiedName: 'qbd.accounts.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/accounts',
  },
  {
    clientCallName: 'conductor.qbd.accounts.retrieve',
    fullyQualifiedName: 'qbd.accounts.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/accounts/{id}',
  },
  {
    clientCallName: 'conductor.qbd.accounts.update',
    fullyQualifiedName: 'qbd.accounts.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/accounts/{id}',
  },
  {
    clientCallName: 'conductor.qbd.accounts.list',
    fullyQualifiedName: 'qbd.accounts.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/accounts',
  },
  {
    clientCallName: 'conductor.qbd.billCheckPayments.create',
    fullyQualifiedName: 'qbd.billCheckPayments.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/bill-check-payments',
  },
  {
    clientCallName: 'conductor.qbd.billCheckPayments.retrieve',
    fullyQualifiedName: 'qbd.billCheckPayments.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/bill-check-payments/{id}',
  },
  {
    clientCallName: 'conductor.qbd.billCheckPayments.update',
    fullyQualifiedName: 'qbd.billCheckPayments.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/bill-check-payments/{id}',
  },
  {
    clientCallName: 'conductor.qbd.billCheckPayments.list',
    fullyQualifiedName: 'qbd.billCheckPayments.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/bill-check-payments',
  },
  {
    clientCallName: 'conductor.qbd.billCheckPayments.delete',
    fullyQualifiedName: 'qbd.billCheckPayments.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/bill-check-payments/{id}',
  },
  {
    clientCallName: 'conductor.qbd.billCreditCardPayments.create',
    fullyQualifiedName: 'qbd.billCreditCardPayments.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/bill-credit-card-payments',
  },
  {
    clientCallName: 'conductor.qbd.billCreditCardPayments.retrieve',
    fullyQualifiedName: 'qbd.billCreditCardPayments.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/bill-credit-card-payments/{id}',
  },
  {
    clientCallName: 'conductor.qbd.billCreditCardPayments.list',
    fullyQualifiedName: 'qbd.billCreditCardPayments.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/bill-credit-card-payments',
  },
  {
    clientCallName: 'conductor.qbd.billCreditCardPayments.delete',
    fullyQualifiedName: 'qbd.billCreditCardPayments.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/bill-credit-card-payments/{id}',
  },
  {
    clientCallName: 'conductor.qbd.bills.create',
    fullyQualifiedName: 'qbd.bills.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/bills',
  },
  {
    clientCallName: 'conductor.qbd.bills.retrieve',
    fullyQualifiedName: 'qbd.bills.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/bills/{id}',
  },
  {
    clientCallName: 'conductor.qbd.bills.update',
    fullyQualifiedName: 'qbd.bills.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/bills/{id}',
  },
  {
    clientCallName: 'conductor.qbd.bills.list',
    fullyQualifiedName: 'qbd.bills.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/bills',
  },
  {
    clientCallName: 'conductor.qbd.bills.delete',
    fullyQualifiedName: 'qbd.bills.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/bills/{id}',
  },
  {
    clientCallName: 'conductor.qbd.buildAssemblies.create',
    fullyQualifiedName: 'qbd.buildAssemblies.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/build-assemblies',
  },
  {
    clientCallName: 'conductor.qbd.buildAssemblies.retrieve',
    fullyQualifiedName: 'qbd.buildAssemblies.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/build-assemblies/{id}',
  },
  {
    clientCallName: 'conductor.qbd.buildAssemblies.update',
    fullyQualifiedName: 'qbd.buildAssemblies.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/build-assemblies/{id}',
  },
  {
    clientCallName: 'conductor.qbd.buildAssemblies.list',
    fullyQualifiedName: 'qbd.buildAssemblies.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/build-assemblies',
  },
  {
    clientCallName: 'conductor.qbd.buildAssemblies.delete',
    fullyQualifiedName: 'qbd.buildAssemblies.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/build-assemblies/{id}',
  },
  {
    clientCallName: 'conductor.qbd.checks.create',
    fullyQualifiedName: 'qbd.checks.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/checks',
  },
  {
    clientCallName: 'conductor.qbd.checks.retrieve',
    fullyQualifiedName: 'qbd.checks.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/checks/{id}',
  },
  {
    clientCallName: 'conductor.qbd.checks.update',
    fullyQualifiedName: 'qbd.checks.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/checks/{id}',
  },
  {
    clientCallName: 'conductor.qbd.checks.list',
    fullyQualifiedName: 'qbd.checks.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/checks',
  },
  {
    clientCallName: 'conductor.qbd.checks.delete',
    fullyQualifiedName: 'qbd.checks.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/checks/{id}',
  },
  {
    clientCallName: 'conductor.qbd.classes.create',
    fullyQualifiedName: 'qbd.classes.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/classes',
  },
  {
    clientCallName: 'conductor.qbd.classes.retrieve',
    fullyQualifiedName: 'qbd.classes.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/classes/{id}',
  },
  {
    clientCallName: 'conductor.qbd.classes.update',
    fullyQualifiedName: 'qbd.classes.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/classes/{id}',
  },
  {
    clientCallName: 'conductor.qbd.classes.list',
    fullyQualifiedName: 'qbd.classes.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/classes',
  },
  {
    clientCallName: 'conductor.qbd.company.retrieve',
    fullyQualifiedName: 'qbd.company.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/company',
  },
  {
    clientCallName: 'conductor.qbd.creditCardCharges.create',
    fullyQualifiedName: 'qbd.creditCardCharges.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/credit-card-charges',
  },
  {
    clientCallName: 'conductor.qbd.creditCardCharges.retrieve',
    fullyQualifiedName: 'qbd.creditCardCharges.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/credit-card-charges/{id}',
  },
  {
    clientCallName: 'conductor.qbd.creditCardCharges.update',
    fullyQualifiedName: 'qbd.creditCardCharges.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/credit-card-charges/{id}',
  },
  {
    clientCallName: 'conductor.qbd.creditCardCharges.list',
    fullyQualifiedName: 'qbd.creditCardCharges.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/credit-card-charges',
  },
  {
    clientCallName: 'conductor.qbd.creditCardCharges.delete',
    fullyQualifiedName: 'qbd.creditCardCharges.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/credit-card-charges/{id}',
  },
  {
    clientCallName: 'conductor.qbd.creditCardCredits.create',
    fullyQualifiedName: 'qbd.creditCardCredits.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/credit-card-credits',
  },
  {
    clientCallName: 'conductor.qbd.creditCardCredits.retrieve',
    fullyQualifiedName: 'qbd.creditCardCredits.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/credit-card-credits/{id}',
  },
  {
    clientCallName: 'conductor.qbd.creditCardCredits.update',
    fullyQualifiedName: 'qbd.creditCardCredits.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/credit-card-credits/{id}',
  },
  {
    clientCallName: 'conductor.qbd.creditCardCredits.list',
    fullyQualifiedName: 'qbd.creditCardCredits.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/credit-card-credits',
  },
  {
    clientCallName: 'conductor.qbd.creditCardCredits.delete',
    fullyQualifiedName: 'qbd.creditCardCredits.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/credit-card-credits/{id}',
  },
  {
    clientCallName: 'conductor.qbd.creditCardRefunds.create',
    fullyQualifiedName: 'qbd.creditCardRefunds.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/credit-card-refunds',
  },
  {
    clientCallName: 'conductor.qbd.creditCardRefunds.retrieve',
    fullyQualifiedName: 'qbd.creditCardRefunds.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/credit-card-refunds/{id}',
  },
  {
    clientCallName: 'conductor.qbd.creditCardRefunds.list',
    fullyQualifiedName: 'qbd.creditCardRefunds.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/credit-card-refunds',
  },
  {
    clientCallName: 'conductor.qbd.creditCardRefunds.delete',
    fullyQualifiedName: 'qbd.creditCardRefunds.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/credit-card-refunds/{id}',
  },
  {
    clientCallName: 'conductor.qbd.creditMemos.create',
    fullyQualifiedName: 'qbd.creditMemos.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/credit-memos',
  },
  {
    clientCallName: 'conductor.qbd.creditMemos.retrieve',
    fullyQualifiedName: 'qbd.creditMemos.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/credit-memos/{id}',
  },
  {
    clientCallName: 'conductor.qbd.creditMemos.update',
    fullyQualifiedName: 'qbd.creditMemos.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/credit-memos/{id}',
  },
  {
    clientCallName: 'conductor.qbd.creditMemos.list',
    fullyQualifiedName: 'qbd.creditMemos.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/credit-memos',
  },
  {
    clientCallName: 'conductor.qbd.creditMemos.delete',
    fullyQualifiedName: 'qbd.creditMemos.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/credit-memos/{id}',
  },
  {
    clientCallName: 'conductor.qbd.currencies.create',
    fullyQualifiedName: 'qbd.currencies.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/currencies',
  },
  {
    clientCallName: 'conductor.qbd.currencies.retrieve',
    fullyQualifiedName: 'qbd.currencies.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/currencies/{id}',
  },
  {
    clientCallName: 'conductor.qbd.currencies.update',
    fullyQualifiedName: 'qbd.currencies.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/currencies/{id}',
  },
  {
    clientCallName: 'conductor.qbd.currencies.list',
    fullyQualifiedName: 'qbd.currencies.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/currencies',
  },
  {
    clientCallName: 'conductor.qbd.customerTypes.create',
    fullyQualifiedName: 'qbd.customerTypes.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/customer-types',
  },
  {
    clientCallName: 'conductor.qbd.customerTypes.retrieve',
    fullyQualifiedName: 'qbd.customerTypes.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/customer-types/{id}',
  },
  {
    clientCallName: 'conductor.qbd.customerTypes.list',
    fullyQualifiedName: 'qbd.customerTypes.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/customer-types',
  },
  {
    clientCallName: 'conductor.qbd.customers.create',
    fullyQualifiedName: 'qbd.customers.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/customers',
  },
  {
    clientCallName: 'conductor.qbd.customers.retrieve',
    fullyQualifiedName: 'qbd.customers.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/customers/{id}',
  },
  {
    clientCallName: 'conductor.qbd.customers.update',
    fullyQualifiedName: 'qbd.customers.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/customers/{id}',
  },
  {
    clientCallName: 'conductor.qbd.customers.list',
    fullyQualifiedName: 'qbd.customers.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/customers',
  },
  {
    clientCallName: 'conductor.qbd.dateDrivenTerms.create',
    fullyQualifiedName: 'qbd.dateDrivenTerms.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/date-driven-terms',
  },
  {
    clientCallName: 'conductor.qbd.dateDrivenTerms.retrieve',
    fullyQualifiedName: 'qbd.dateDrivenTerms.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/date-driven-terms/{id}',
  },
  {
    clientCallName: 'conductor.qbd.dateDrivenTerms.list',
    fullyQualifiedName: 'qbd.dateDrivenTerms.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/date-driven-terms',
  },
  {
    clientCallName: 'conductor.qbd.deletedListObjects.list',
    fullyQualifiedName: 'qbd.deletedListObjects.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/deleted-list-objects',
  },
  {
    clientCallName: 'conductor.qbd.deletedTransactions.list',
    fullyQualifiedName: 'qbd.deletedTransactions.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/deleted-transactions',
  },
  {
    clientCallName: 'conductor.qbd.discountItems.create',
    fullyQualifiedName: 'qbd.discountItems.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/discount-items',
  },
  {
    clientCallName: 'conductor.qbd.discountItems.retrieve',
    fullyQualifiedName: 'qbd.discountItems.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/discount-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.discountItems.update',
    fullyQualifiedName: 'qbd.discountItems.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/discount-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.discountItems.list',
    fullyQualifiedName: 'qbd.discountItems.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/discount-items',
  },
  {
    clientCallName: 'conductor.qbd.employees.create',
    fullyQualifiedName: 'qbd.employees.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/employees',
  },
  {
    clientCallName: 'conductor.qbd.employees.retrieve',
    fullyQualifiedName: 'qbd.employees.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/employees/{id}',
  },
  {
    clientCallName: 'conductor.qbd.employees.update',
    fullyQualifiedName: 'qbd.employees.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/employees/{id}',
  },
  {
    clientCallName: 'conductor.qbd.employees.list',
    fullyQualifiedName: 'qbd.employees.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/employees',
  },
  {
    clientCallName: 'conductor.qbd.estimates.create',
    fullyQualifiedName: 'qbd.estimates.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/estimates',
  },
  {
    clientCallName: 'conductor.qbd.estimates.retrieve',
    fullyQualifiedName: 'qbd.estimates.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/estimates/{id}',
  },
  {
    clientCallName: 'conductor.qbd.estimates.update',
    fullyQualifiedName: 'qbd.estimates.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/estimates/{id}',
  },
  {
    clientCallName: 'conductor.qbd.estimates.list',
    fullyQualifiedName: 'qbd.estimates.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/estimates',
  },
  {
    clientCallName: 'conductor.qbd.estimates.delete',
    fullyQualifiedName: 'qbd.estimates.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/estimates/{id}',
  },
  {
    clientCallName: 'conductor.qbd.inventoryAdjustments.create',
    fullyQualifiedName: 'qbd.inventoryAdjustments.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/inventory-adjustments',
  },
  {
    clientCallName: 'conductor.qbd.inventoryAdjustments.retrieve',
    fullyQualifiedName: 'qbd.inventoryAdjustments.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/inventory-adjustments/{id}',
  },
  {
    clientCallName: 'conductor.qbd.inventoryAdjustments.update',
    fullyQualifiedName: 'qbd.inventoryAdjustments.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/inventory-adjustments/{id}',
  },
  {
    clientCallName: 'conductor.qbd.inventoryAdjustments.list',
    fullyQualifiedName: 'qbd.inventoryAdjustments.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/inventory-adjustments',
  },
  {
    clientCallName: 'conductor.qbd.inventoryAdjustments.delete',
    fullyQualifiedName: 'qbd.inventoryAdjustments.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/inventory-adjustments/{id}',
  },
  {
    clientCallName: 'conductor.qbd.inventoryAssemblyItems.create',
    fullyQualifiedName: 'qbd.inventoryAssemblyItems.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/inventory-assembly-items',
  },
  {
    clientCallName: 'conductor.qbd.inventoryAssemblyItems.retrieve',
    fullyQualifiedName: 'qbd.inventoryAssemblyItems.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/inventory-assembly-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.inventoryAssemblyItems.update',
    fullyQualifiedName: 'qbd.inventoryAssemblyItems.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/inventory-assembly-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.inventoryAssemblyItems.list',
    fullyQualifiedName: 'qbd.inventoryAssemblyItems.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/inventory-assembly-items',
  },
  {
    clientCallName: 'conductor.qbd.inventoryItems.create',
    fullyQualifiedName: 'qbd.inventoryItems.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/inventory-items',
  },
  {
    clientCallName: 'conductor.qbd.inventoryItems.retrieve',
    fullyQualifiedName: 'qbd.inventoryItems.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/inventory-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.inventoryItems.update',
    fullyQualifiedName: 'qbd.inventoryItems.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/inventory-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.inventoryItems.list',
    fullyQualifiedName: 'qbd.inventoryItems.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/inventory-items',
  },
  {
    clientCallName: 'conductor.qbd.inventorySites.create',
    fullyQualifiedName: 'qbd.inventorySites.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/inventory-sites',
  },
  {
    clientCallName: 'conductor.qbd.inventorySites.retrieve',
    fullyQualifiedName: 'qbd.inventorySites.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/inventory-sites/{id}',
  },
  {
    clientCallName: 'conductor.qbd.inventorySites.update',
    fullyQualifiedName: 'qbd.inventorySites.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/inventory-sites/{id}',
  },
  {
    clientCallName: 'conductor.qbd.inventorySites.list',
    fullyQualifiedName: 'qbd.inventorySites.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/inventory-sites',
  },
  {
    clientCallName: 'conductor.qbd.invoices.create',
    fullyQualifiedName: 'qbd.invoices.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/invoices',
  },
  {
    clientCallName: 'conductor.qbd.invoices.retrieve',
    fullyQualifiedName: 'qbd.invoices.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/invoices/{id}',
  },
  {
    clientCallName: 'conductor.qbd.invoices.update',
    fullyQualifiedName: 'qbd.invoices.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/invoices/{id}',
  },
  {
    clientCallName: 'conductor.qbd.invoices.list',
    fullyQualifiedName: 'qbd.invoices.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/invoices',
  },
  {
    clientCallName: 'conductor.qbd.invoices.delete',
    fullyQualifiedName: 'qbd.invoices.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/invoices/{id}',
  },
  {
    clientCallName: 'conductor.qbd.itemGroups.create',
    fullyQualifiedName: 'qbd.itemGroups.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/item-groups',
  },
  {
    clientCallName: 'conductor.qbd.itemGroups.retrieve',
    fullyQualifiedName: 'qbd.itemGroups.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/item-groups/{id}',
  },
  {
    clientCallName: 'conductor.qbd.itemGroups.update',
    fullyQualifiedName: 'qbd.itemGroups.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/item-groups/{id}',
  },
  {
    clientCallName: 'conductor.qbd.itemGroups.list',
    fullyQualifiedName: 'qbd.itemGroups.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/item-groups',
  },
  {
    clientCallName: 'conductor.qbd.itemReceipts.create',
    fullyQualifiedName: 'qbd.itemReceipts.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/item-receipts',
  },
  {
    clientCallName: 'conductor.qbd.itemReceipts.retrieve',
    fullyQualifiedName: 'qbd.itemReceipts.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/item-receipts/{id}',
  },
  {
    clientCallName: 'conductor.qbd.itemReceipts.update',
    fullyQualifiedName: 'qbd.itemReceipts.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/item-receipts/{id}',
  },
  {
    clientCallName: 'conductor.qbd.itemReceipts.list',
    fullyQualifiedName: 'qbd.itemReceipts.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/item-receipts',
  },
  {
    clientCallName: 'conductor.qbd.itemReceipts.delete',
    fullyQualifiedName: 'qbd.itemReceipts.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/item-receipts/{id}',
  },
  {
    clientCallName: 'conductor.qbd.itemSites.retrieve',
    fullyQualifiedName: 'qbd.itemSites.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/item-sites/{id}',
  },
  {
    clientCallName: 'conductor.qbd.itemSites.list',
    fullyQualifiedName: 'qbd.itemSites.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/item-sites',
  },
  {
    clientCallName: 'conductor.qbd.journalEntries.create',
    fullyQualifiedName: 'qbd.journalEntries.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/journal-entries',
  },
  {
    clientCallName: 'conductor.qbd.journalEntries.retrieve',
    fullyQualifiedName: 'qbd.journalEntries.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/journal-entries/{id}',
  },
  {
    clientCallName: 'conductor.qbd.journalEntries.update',
    fullyQualifiedName: 'qbd.journalEntries.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/journal-entries/{id}',
  },
  {
    clientCallName: 'conductor.qbd.journalEntries.list',
    fullyQualifiedName: 'qbd.journalEntries.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/journal-entries',
  },
  {
    clientCallName: 'conductor.qbd.journalEntries.delete',
    fullyQualifiedName: 'qbd.journalEntries.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/journal-entries/{id}',
  },
  {
    clientCallName: 'conductor.qbd.nonInventoryItems.create',
    fullyQualifiedName: 'qbd.nonInventoryItems.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/non-inventory-items',
  },
  {
    clientCallName: 'conductor.qbd.nonInventoryItems.retrieve',
    fullyQualifiedName: 'qbd.nonInventoryItems.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/non-inventory-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.nonInventoryItems.update',
    fullyQualifiedName: 'qbd.nonInventoryItems.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/non-inventory-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.nonInventoryItems.list',
    fullyQualifiedName: 'qbd.nonInventoryItems.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/non-inventory-items',
  },
  {
    clientCallName: 'conductor.qbd.otherChargeItems.create',
    fullyQualifiedName: 'qbd.otherChargeItems.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/other-charge-items',
  },
  {
    clientCallName: 'conductor.qbd.otherChargeItems.retrieve',
    fullyQualifiedName: 'qbd.otherChargeItems.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/other-charge-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.otherChargeItems.update',
    fullyQualifiedName: 'qbd.otherChargeItems.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/other-charge-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.otherChargeItems.list',
    fullyQualifiedName: 'qbd.otherChargeItems.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/other-charge-items',
  },
  {
    clientCallName: 'conductor.qbd.otherNames.create',
    fullyQualifiedName: 'qbd.otherNames.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/other-names',
  },
  {
    clientCallName: 'conductor.qbd.otherNames.retrieve',
    fullyQualifiedName: 'qbd.otherNames.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/other-names/{id}',
  },
  {
    clientCallName: 'conductor.qbd.otherNames.update',
    fullyQualifiedName: 'qbd.otherNames.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/other-names/{id}',
  },
  {
    clientCallName: 'conductor.qbd.otherNames.list',
    fullyQualifiedName: 'qbd.otherNames.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/other-names',
  },
  {
    clientCallName: 'conductor.qbd.paymentMethods.create',
    fullyQualifiedName: 'qbd.paymentMethods.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/payment-methods',
  },
  {
    clientCallName: 'conductor.qbd.paymentMethods.retrieve',
    fullyQualifiedName: 'qbd.paymentMethods.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/payment-methods/{id}',
  },
  {
    clientCallName: 'conductor.qbd.paymentMethods.list',
    fullyQualifiedName: 'qbd.paymentMethods.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/payment-methods',
  },
  {
    clientCallName: 'conductor.qbd.payrollWageItems.create',
    fullyQualifiedName: 'qbd.payrollWageItems.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/payroll-wage-items',
  },
  {
    clientCallName: 'conductor.qbd.payrollWageItems.retrieve',
    fullyQualifiedName: 'qbd.payrollWageItems.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/payroll-wage-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.payrollWageItems.list',
    fullyQualifiedName: 'qbd.payrollWageItems.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/payroll-wage-items',
  },
  {
    clientCallName: 'conductor.qbd.preferences.retrieve',
    fullyQualifiedName: 'qbd.preferences.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/preferences',
  },
  {
    clientCallName: 'conductor.qbd.priceLevels.create',
    fullyQualifiedName: 'qbd.priceLevels.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/price-levels',
  },
  {
    clientCallName: 'conductor.qbd.priceLevels.retrieve',
    fullyQualifiedName: 'qbd.priceLevels.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/price-levels/{id}',
  },
  {
    clientCallName: 'conductor.qbd.priceLevels.update',
    fullyQualifiedName: 'qbd.priceLevels.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/price-levels/{id}',
  },
  {
    clientCallName: 'conductor.qbd.priceLevels.list',
    fullyQualifiedName: 'qbd.priceLevels.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/price-levels',
  },
  {
    clientCallName: 'conductor.qbd.purchaseOrders.create',
    fullyQualifiedName: 'qbd.purchaseOrders.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/purchase-orders',
  },
  {
    clientCallName: 'conductor.qbd.purchaseOrders.retrieve',
    fullyQualifiedName: 'qbd.purchaseOrders.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/purchase-orders/{id}',
  },
  {
    clientCallName: 'conductor.qbd.purchaseOrders.update',
    fullyQualifiedName: 'qbd.purchaseOrders.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/purchase-orders/{id}',
  },
  {
    clientCallName: 'conductor.qbd.purchaseOrders.list',
    fullyQualifiedName: 'qbd.purchaseOrders.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/purchase-orders',
  },
  {
    clientCallName: 'conductor.qbd.purchaseOrders.delete',
    fullyQualifiedName: 'qbd.purchaseOrders.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/purchase-orders/{id}',
  },
  {
    clientCallName: 'conductor.qbd.receivePayments.create',
    fullyQualifiedName: 'qbd.receivePayments.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/receive-payments',
  },
  {
    clientCallName: 'conductor.qbd.receivePayments.retrieve',
    fullyQualifiedName: 'qbd.receivePayments.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/receive-payments/{id}',
  },
  {
    clientCallName: 'conductor.qbd.receivePayments.update',
    fullyQualifiedName: 'qbd.receivePayments.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/receive-payments/{id}',
  },
  {
    clientCallName: 'conductor.qbd.receivePayments.list',
    fullyQualifiedName: 'qbd.receivePayments.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/receive-payments',
  },
  {
    clientCallName: 'conductor.qbd.receivePayments.delete',
    fullyQualifiedName: 'qbd.receivePayments.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/receive-payments/{id}',
  },
  {
    clientCallName: 'conductor.qbd.salesOrders.create',
    fullyQualifiedName: 'qbd.salesOrders.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/sales-orders',
  },
  {
    clientCallName: 'conductor.qbd.salesOrders.retrieve',
    fullyQualifiedName: 'qbd.salesOrders.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/sales-orders/{id}',
  },
  {
    clientCallName: 'conductor.qbd.salesOrders.update',
    fullyQualifiedName: 'qbd.salesOrders.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/sales-orders/{id}',
  },
  {
    clientCallName: 'conductor.qbd.salesOrders.list',
    fullyQualifiedName: 'qbd.salesOrders.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/sales-orders',
  },
  {
    clientCallName: 'conductor.qbd.salesOrders.delete',
    fullyQualifiedName: 'qbd.salesOrders.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/sales-orders/{id}',
  },
  {
    clientCallName: 'conductor.qbd.salesReceipts.create',
    fullyQualifiedName: 'qbd.salesReceipts.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/sales-receipts',
  },
  {
    clientCallName: 'conductor.qbd.salesReceipts.retrieve',
    fullyQualifiedName: 'qbd.salesReceipts.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/sales-receipts/{id}',
  },
  {
    clientCallName: 'conductor.qbd.salesReceipts.update',
    fullyQualifiedName: 'qbd.salesReceipts.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/sales-receipts/{id}',
  },
  {
    clientCallName: 'conductor.qbd.salesReceipts.list',
    fullyQualifiedName: 'qbd.salesReceipts.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/sales-receipts',
  },
  {
    clientCallName: 'conductor.qbd.salesReceipts.delete',
    fullyQualifiedName: 'qbd.salesReceipts.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/sales-receipts/{id}',
  },
  {
    clientCallName: 'conductor.qbd.salesRepresentatives.create',
    fullyQualifiedName: 'qbd.salesRepresentatives.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/sales-representatives',
  },
  {
    clientCallName: 'conductor.qbd.salesRepresentatives.retrieve',
    fullyQualifiedName: 'qbd.salesRepresentatives.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/sales-representatives/{id}',
  },
  {
    clientCallName: 'conductor.qbd.salesRepresentatives.update',
    fullyQualifiedName: 'qbd.salesRepresentatives.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/sales-representatives/{id}',
  },
  {
    clientCallName: 'conductor.qbd.salesRepresentatives.list',
    fullyQualifiedName: 'qbd.salesRepresentatives.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/sales-representatives',
  },
  {
    clientCallName: 'conductor.qbd.salesTaxCodes.create',
    fullyQualifiedName: 'qbd.salesTaxCodes.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/sales-tax-codes',
  },
  {
    clientCallName: 'conductor.qbd.salesTaxCodes.retrieve',
    fullyQualifiedName: 'qbd.salesTaxCodes.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/sales-tax-codes/{id}',
  },
  {
    clientCallName: 'conductor.qbd.salesTaxCodes.update',
    fullyQualifiedName: 'qbd.salesTaxCodes.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/sales-tax-codes/{id}',
  },
  {
    clientCallName: 'conductor.qbd.salesTaxCodes.list',
    fullyQualifiedName: 'qbd.salesTaxCodes.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/sales-tax-codes',
  },
  {
    clientCallName: 'conductor.qbd.salesTaxItems.create',
    fullyQualifiedName: 'qbd.salesTaxItems.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/sales-tax-items',
  },
  {
    clientCallName: 'conductor.qbd.salesTaxItems.retrieve',
    fullyQualifiedName: 'qbd.salesTaxItems.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/sales-tax-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.salesTaxItems.update',
    fullyQualifiedName: 'qbd.salesTaxItems.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/sales-tax-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.salesTaxItems.list',
    fullyQualifiedName: 'qbd.salesTaxItems.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/sales-tax-items',
  },
  {
    clientCallName: 'conductor.qbd.serviceItems.create',
    fullyQualifiedName: 'qbd.serviceItems.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/service-items',
  },
  {
    clientCallName: 'conductor.qbd.serviceItems.retrieve',
    fullyQualifiedName: 'qbd.serviceItems.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/service-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.serviceItems.update',
    fullyQualifiedName: 'qbd.serviceItems.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/service-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.serviceItems.list',
    fullyQualifiedName: 'qbd.serviceItems.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/service-items',
  },
  {
    clientCallName: 'conductor.qbd.shippingMethods.create',
    fullyQualifiedName: 'qbd.shippingMethods.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/shipping-methods',
  },
  {
    clientCallName: 'conductor.qbd.shippingMethods.retrieve',
    fullyQualifiedName: 'qbd.shippingMethods.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/shipping-methods/{id}',
  },
  {
    clientCallName: 'conductor.qbd.shippingMethods.list',
    fullyQualifiedName: 'qbd.shippingMethods.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/shipping-methods',
  },
  {
    clientCallName: 'conductor.qbd.standardTerms.create',
    fullyQualifiedName: 'qbd.standardTerms.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/standard-terms',
  },
  {
    clientCallName: 'conductor.qbd.standardTerms.retrieve',
    fullyQualifiedName: 'qbd.standardTerms.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/standard-terms/{id}',
  },
  {
    clientCallName: 'conductor.qbd.standardTerms.list',
    fullyQualifiedName: 'qbd.standardTerms.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/standard-terms',
  },
  {
    clientCallName: 'conductor.qbd.subtotalItems.create',
    fullyQualifiedName: 'qbd.subtotalItems.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/subtotal-items',
  },
  {
    clientCallName: 'conductor.qbd.subtotalItems.retrieve',
    fullyQualifiedName: 'qbd.subtotalItems.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/subtotal-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.subtotalItems.update',
    fullyQualifiedName: 'qbd.subtotalItems.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/subtotal-items/{id}',
  },
  {
    clientCallName: 'conductor.qbd.subtotalItems.list',
    fullyQualifiedName: 'qbd.subtotalItems.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/subtotal-items',
  },
  {
    clientCallName: 'conductor.qbd.templates.list',
    fullyQualifiedName: 'qbd.templates.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/templates',
  },
  {
    clientCallName: 'conductor.qbd.timeTrackingActivities.create',
    fullyQualifiedName: 'qbd.timeTrackingActivities.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/time-tracking-activities',
  },
  {
    clientCallName: 'conductor.qbd.timeTrackingActivities.retrieve',
    fullyQualifiedName: 'qbd.timeTrackingActivities.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/time-tracking-activities/{id}',
  },
  {
    clientCallName: 'conductor.qbd.timeTrackingActivities.update',
    fullyQualifiedName: 'qbd.timeTrackingActivities.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/time-tracking-activities/{id}',
  },
  {
    clientCallName: 'conductor.qbd.timeTrackingActivities.list',
    fullyQualifiedName: 'qbd.timeTrackingActivities.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/time-tracking-activities',
  },
  {
    clientCallName: 'conductor.qbd.timeTrackingActivities.delete',
    fullyQualifiedName: 'qbd.timeTrackingActivities.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/time-tracking-activities/{id}',
  },
  {
    clientCallName: 'conductor.qbd.transactions.retrieve',
    fullyQualifiedName: 'qbd.transactions.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/transactions/{id}',
  },
  {
    clientCallName: 'conductor.qbd.transactions.list',
    fullyQualifiedName: 'qbd.transactions.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/transactions',
  },
  {
    clientCallName: 'conductor.qbd.transfers.create',
    fullyQualifiedName: 'qbd.transfers.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/transfers',
  },
  {
    clientCallName: 'conductor.qbd.transfers.retrieve',
    fullyQualifiedName: 'qbd.transfers.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/transfers/{id}',
  },
  {
    clientCallName: 'conductor.qbd.transfers.update',
    fullyQualifiedName: 'qbd.transfers.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/transfers/{id}',
  },
  {
    clientCallName: 'conductor.qbd.transfers.list',
    fullyQualifiedName: 'qbd.transfers.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/transfers',
  },
  {
    clientCallName: 'conductor.qbd.unitOfMeasureSets.create',
    fullyQualifiedName: 'qbd.unitOfMeasureSets.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/unit-of-measure-sets',
  },
  {
    clientCallName: 'conductor.qbd.unitOfMeasureSets.retrieve',
    fullyQualifiedName: 'qbd.unitOfMeasureSets.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/unit-of-measure-sets/{id}',
  },
  {
    clientCallName: 'conductor.qbd.unitOfMeasureSets.list',
    fullyQualifiedName: 'qbd.unitOfMeasureSets.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/unit-of-measure-sets',
  },
  {
    clientCallName: 'conductor.qbd.vendorCredits.create',
    fullyQualifiedName: 'qbd.vendorCredits.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/vendor-credits',
  },
  {
    clientCallName: 'conductor.qbd.vendorCredits.retrieve',
    fullyQualifiedName: 'qbd.vendorCredits.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/vendor-credits/{id}',
  },
  {
    clientCallName: 'conductor.qbd.vendorCredits.update',
    fullyQualifiedName: 'qbd.vendorCredits.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/vendor-credits/{id}',
  },
  {
    clientCallName: 'conductor.qbd.vendorCredits.list',
    fullyQualifiedName: 'qbd.vendorCredits.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/vendor-credits',
  },
  {
    clientCallName: 'conductor.qbd.vendorCredits.delete',
    fullyQualifiedName: 'qbd.vendorCredits.delete',
    httpMethod: 'delete',
    httpPath: '/quickbooks-desktop/vendor-credits/{id}',
  },
  {
    clientCallName: 'conductor.qbd.vendors.create',
    fullyQualifiedName: 'qbd.vendors.create',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/vendors',
  },
  {
    clientCallName: 'conductor.qbd.vendors.retrieve',
    fullyQualifiedName: 'qbd.vendors.retrieve',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/vendors/{id}',
  },
  {
    clientCallName: 'conductor.qbd.vendors.update',
    fullyQualifiedName: 'qbd.vendors.update',
    httpMethod: 'post',
    httpPath: '/quickbooks-desktop/vendors/{id}',
  },
  {
    clientCallName: 'conductor.qbd.vendors.list',
    fullyQualifiedName: 'qbd.vendors.list',
    httpMethod: 'get',
    httpPath: '/quickbooks-desktop/vendors',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
