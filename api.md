# AuthSessions

Types:

- <code><a href="./src/resources/auth-sessions.ts">AuthSession</a></code>

Methods:

- <code title="post /auth-sessions">client.authSessions.<a href="./src/resources/auth-sessions.ts">create</a>({ ...params }) -> AuthSession</code>

# EndUsers

Types:

- <code><a href="./src/resources/end-users.ts">EndUser</a></code>
- <code><a href="./src/resources/end-users.ts">EndUserListResponse</a></code>
- <code><a href="./src/resources/end-users.ts">EndUserDeleteResponse</a></code>
- <code><a href="./src/resources/end-users.ts">EndUserPassthroughResponse</a></code>

Methods:

- <code title="post /end-users">client.endUsers.<a href="./src/resources/end-users.ts">create</a>({ ...params }) -> EndUser</code>
- <code title="get /end-users/{id}">client.endUsers.<a href="./src/resources/end-users.ts">retrieve</a>(id) -> EndUser</code>
- <code title="get /end-users">client.endUsers.<a href="./src/resources/end-users.ts">list</a>() -> EndUserListResponse</code>
- <code title="delete /end-users/{id}">client.endUsers.<a href="./src/resources/end-users.ts">delete</a>(id) -> EndUserDeleteResponse</code>
- <code title="post /end-users/{id}/passthrough/{integrationSlug}">client.endUsers.<a href="./src/resources/end-users.ts">passthrough</a>(id, integrationSlug, { ...params }) -> EndUserPassthroughResponse</code>

# Qbd

Types:

- <code><a href="./src/resources/qbd/qbd.ts">QbdHealthCheckResponse</a></code>

Methods:

- <code title="get /quickbooks-desktop/health-check">client.qbd.<a href="./src/resources/qbd/qbd.ts">healthCheck</a>({ ...params }) -> QbdHealthCheckResponse</code>

## AccountTaxLines

Types:

- <code><a href="./src/resources/qbd/account-tax-lines.ts">AccountTaxLine</a></code>
- <code><a href="./src/resources/qbd/account-tax-lines.ts">AccountTaxLineListResponse</a></code>

Methods:

- <code title="get /quickbooks-desktop/account-tax-lines">client.qbd.accountTaxLines.<a href="./src/resources/qbd/account-tax-lines.ts">list</a>({ ...params }) -> AccountTaxLineListResponse</code>

## Accounts

Types:

- <code><a href="./src/resources/qbd/accounts.ts">Account</a></code>
- <code><a href="./src/resources/qbd/accounts.ts">AccountListResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/accounts">client.qbd.accounts.<a href="./src/resources/qbd/accounts.ts">create</a>({ ...params }) -> Account</code>
- <code title="get /quickbooks-desktop/accounts/{id}">client.qbd.accounts.<a href="./src/resources/qbd/accounts.ts">retrieve</a>(id, { ...params }) -> Account</code>
- <code title="post /quickbooks-desktop/accounts/{id}">client.qbd.accounts.<a href="./src/resources/qbd/accounts.ts">update</a>(id, { ...params }) -> Account</code>
- <code title="get /quickbooks-desktop/accounts">client.qbd.accounts.<a href="./src/resources/qbd/accounts.ts">list</a>({ ...params }) -> AccountListResponse</code>

## BillCheckPayments

Types:

- <code><a href="./src/resources/qbd/bill-check-payments.ts">BillCheckPayment</a></code>
- <code><a href="./src/resources/qbd/bill-check-payments.ts">BillCheckPaymentDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/bill-check-payments">client.qbd.billCheckPayments.<a href="./src/resources/qbd/bill-check-payments.ts">create</a>({ ...params }) -> BillCheckPayment</code>
- <code title="get /quickbooks-desktop/bill-check-payments/{id}">client.qbd.billCheckPayments.<a href="./src/resources/qbd/bill-check-payments.ts">retrieve</a>(id, { ...params }) -> BillCheckPayment</code>
- <code title="post /quickbooks-desktop/bill-check-payments/{id}">client.qbd.billCheckPayments.<a href="./src/resources/qbd/bill-check-payments.ts">update</a>(id, { ...params }) -> BillCheckPayment</code>
- <code title="get /quickbooks-desktop/bill-check-payments">client.qbd.billCheckPayments.<a href="./src/resources/qbd/bill-check-payments.ts">list</a>({ ...params }) -> BillCheckPaymentsCursorPage</code>
- <code title="delete /quickbooks-desktop/bill-check-payments/{id}">client.qbd.billCheckPayments.<a href="./src/resources/qbd/bill-check-payments.ts">delete</a>(id, { ...params }) -> BillCheckPaymentDeleteResponse</code>

## BillCreditCardPayments

Types:

- <code><a href="./src/resources/qbd/bill-credit-card-payments.ts">BillCreditCardPayment</a></code>
- <code><a href="./src/resources/qbd/bill-credit-card-payments.ts">BillCreditCardPaymentDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/bill-credit-card-payments">client.qbd.billCreditCardPayments.<a href="./src/resources/qbd/bill-credit-card-payments.ts">create</a>({ ...params }) -> BillCreditCardPayment</code>
- <code title="get /quickbooks-desktop/bill-credit-card-payments/{id}">client.qbd.billCreditCardPayments.<a href="./src/resources/qbd/bill-credit-card-payments.ts">retrieve</a>(id, { ...params }) -> BillCreditCardPayment</code>
- <code title="get /quickbooks-desktop/bill-credit-card-payments">client.qbd.billCreditCardPayments.<a href="./src/resources/qbd/bill-credit-card-payments.ts">list</a>({ ...params }) -> BillCreditCardPaymentsCursorPage</code>
- <code title="delete /quickbooks-desktop/bill-credit-card-payments/{id}">client.qbd.billCreditCardPayments.<a href="./src/resources/qbd/bill-credit-card-payments.ts">delete</a>(id, { ...params }) -> BillCreditCardPaymentDeleteResponse</code>

## Bills

Types:

- <code><a href="./src/resources/qbd/bills.ts">Bill</a></code>
- <code><a href="./src/resources/qbd/bills.ts">BillDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/bills">client.qbd.bills.<a href="./src/resources/qbd/bills.ts">create</a>({ ...params }) -> Bill</code>
- <code title="get /quickbooks-desktop/bills/{id}">client.qbd.bills.<a href="./src/resources/qbd/bills.ts">retrieve</a>(id, { ...params }) -> Bill</code>
- <code title="post /quickbooks-desktop/bills/{id}">client.qbd.bills.<a href="./src/resources/qbd/bills.ts">update</a>(id, { ...params }) -> Bill</code>
- <code title="get /quickbooks-desktop/bills">client.qbd.bills.<a href="./src/resources/qbd/bills.ts">list</a>({ ...params }) -> BillsCursorPage</code>
- <code title="delete /quickbooks-desktop/bills/{id}">client.qbd.bills.<a href="./src/resources/qbd/bills.ts">delete</a>(id, { ...params }) -> BillDeleteResponse</code>

## BuildAssemblies

Types:

- <code><a href="./src/resources/qbd/build-assemblies.ts">BuildAssembly</a></code>
- <code><a href="./src/resources/qbd/build-assemblies.ts">BuildAssemblyDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/build-assemblies">client.qbd.buildAssemblies.<a href="./src/resources/qbd/build-assemblies.ts">create</a>({ ...params }) -> BuildAssembly</code>
- <code title="get /quickbooks-desktop/build-assemblies/{id}">client.qbd.buildAssemblies.<a href="./src/resources/qbd/build-assemblies.ts">retrieve</a>(id, { ...params }) -> BuildAssembly</code>
- <code title="post /quickbooks-desktop/build-assemblies/{id}">client.qbd.buildAssemblies.<a href="./src/resources/qbd/build-assemblies.ts">update</a>(id, { ...params }) -> BuildAssembly</code>
- <code title="get /quickbooks-desktop/build-assemblies">client.qbd.buildAssemblies.<a href="./src/resources/qbd/build-assemblies.ts">list</a>({ ...params }) -> BuildAssembliesCursorPage</code>
- <code title="delete /quickbooks-desktop/build-assemblies/{id}">client.qbd.buildAssemblies.<a href="./src/resources/qbd/build-assemblies.ts">delete</a>(id, { ...params }) -> BuildAssemblyDeleteResponse</code>

## Checks

Types:

- <code><a href="./src/resources/qbd/checks.ts">Check</a></code>
- <code><a href="./src/resources/qbd/checks.ts">CheckDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/checks">client.qbd.checks.<a href="./src/resources/qbd/checks.ts">create</a>({ ...params }) -> Check</code>
- <code title="get /quickbooks-desktop/checks/{id}">client.qbd.checks.<a href="./src/resources/qbd/checks.ts">retrieve</a>(id, { ...params }) -> Check</code>
- <code title="post /quickbooks-desktop/checks/{id}">client.qbd.checks.<a href="./src/resources/qbd/checks.ts">update</a>(id, { ...params }) -> Check</code>
- <code title="get /quickbooks-desktop/checks">client.qbd.checks.<a href="./src/resources/qbd/checks.ts">list</a>({ ...params }) -> ChecksCursorPage</code>
- <code title="delete /quickbooks-desktop/checks/{id}">client.qbd.checks.<a href="./src/resources/qbd/checks.ts">delete</a>(id, { ...params }) -> CheckDeleteResponse</code>

## Classes

Types:

- <code><a href="./src/resources/qbd/classes.ts">Class</a></code>
- <code><a href="./src/resources/qbd/classes.ts">ClassListResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/classes">client.qbd.classes.<a href="./src/resources/qbd/classes.ts">create</a>({ ...params }) -> Class</code>
- <code title="get /quickbooks-desktop/classes/{id}">client.qbd.classes.<a href="./src/resources/qbd/classes.ts">retrieve</a>(id, { ...params }) -> Class</code>
- <code title="post /quickbooks-desktop/classes/{id}">client.qbd.classes.<a href="./src/resources/qbd/classes.ts">update</a>(id, { ...params }) -> Class</code>
- <code title="get /quickbooks-desktop/classes">client.qbd.classes.<a href="./src/resources/qbd/classes.ts">list</a>({ ...params }) -> ClassListResponse</code>

## Company

Types:

- <code><a href="./src/resources/qbd/company.ts">Company</a></code>

Methods:

- <code title="get /quickbooks-desktop/company">client.qbd.company.<a href="./src/resources/qbd/company.ts">retrieve</a>({ ...params }) -> Company</code>

## CreditCardCharges

Types:

- <code><a href="./src/resources/qbd/credit-card-charges.ts">CreditCardCharge</a></code>
- <code><a href="./src/resources/qbd/credit-card-charges.ts">CreditCardChargeDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/credit-card-charges">client.qbd.creditCardCharges.<a href="./src/resources/qbd/credit-card-charges.ts">create</a>({ ...params }) -> CreditCardCharge</code>
- <code title="get /quickbooks-desktop/credit-card-charges/{id}">client.qbd.creditCardCharges.<a href="./src/resources/qbd/credit-card-charges.ts">retrieve</a>(id, { ...params }) -> CreditCardCharge</code>
- <code title="post /quickbooks-desktop/credit-card-charges/{id}">client.qbd.creditCardCharges.<a href="./src/resources/qbd/credit-card-charges.ts">update</a>(id, { ...params }) -> CreditCardCharge</code>
- <code title="get /quickbooks-desktop/credit-card-charges">client.qbd.creditCardCharges.<a href="./src/resources/qbd/credit-card-charges.ts">list</a>({ ...params }) -> CreditCardChargesCursorPage</code>
- <code title="delete /quickbooks-desktop/credit-card-charges/{id}">client.qbd.creditCardCharges.<a href="./src/resources/qbd/credit-card-charges.ts">delete</a>(id, { ...params }) -> CreditCardChargeDeleteResponse</code>

## CreditCardCredits

Types:

- <code><a href="./src/resources/qbd/credit-card-credits.ts">CreditCardCredit</a></code>
- <code><a href="./src/resources/qbd/credit-card-credits.ts">CreditCardCreditDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/credit-card-credits">client.qbd.creditCardCredits.<a href="./src/resources/qbd/credit-card-credits.ts">create</a>({ ...params }) -> CreditCardCredit</code>
- <code title="get /quickbooks-desktop/credit-card-credits/{id}">client.qbd.creditCardCredits.<a href="./src/resources/qbd/credit-card-credits.ts">retrieve</a>(id, { ...params }) -> CreditCardCredit</code>
- <code title="post /quickbooks-desktop/credit-card-credits/{id}">client.qbd.creditCardCredits.<a href="./src/resources/qbd/credit-card-credits.ts">update</a>(id, { ...params }) -> CreditCardCredit</code>
- <code title="get /quickbooks-desktop/credit-card-credits">client.qbd.creditCardCredits.<a href="./src/resources/qbd/credit-card-credits.ts">list</a>({ ...params }) -> CreditCardCreditsCursorPage</code>
- <code title="delete /quickbooks-desktop/credit-card-credits/{id}">client.qbd.creditCardCredits.<a href="./src/resources/qbd/credit-card-credits.ts">delete</a>(id, { ...params }) -> CreditCardCreditDeleteResponse</code>

## CreditCardRefunds

Types:

- <code><a href="./src/resources/qbd/credit-card-refunds.ts">CreditCardRefund</a></code>
- <code><a href="./src/resources/qbd/credit-card-refunds.ts">CreditCardRefundDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/credit-card-refunds">client.qbd.creditCardRefunds.<a href="./src/resources/qbd/credit-card-refunds.ts">create</a>({ ...params }) -> CreditCardRefund</code>
- <code title="get /quickbooks-desktop/credit-card-refunds/{id}">client.qbd.creditCardRefunds.<a href="./src/resources/qbd/credit-card-refunds.ts">retrieve</a>(id, { ...params }) -> CreditCardRefund</code>
- <code title="get /quickbooks-desktop/credit-card-refunds">client.qbd.creditCardRefunds.<a href="./src/resources/qbd/credit-card-refunds.ts">list</a>({ ...params }) -> CreditCardRefundsCursorPage</code>
- <code title="delete /quickbooks-desktop/credit-card-refunds/{id}">client.qbd.creditCardRefunds.<a href="./src/resources/qbd/credit-card-refunds.ts">delete</a>(id, { ...params }) -> CreditCardRefundDeleteResponse</code>

## CreditMemos

Types:

- <code><a href="./src/resources/qbd/credit-memos.ts">CreditMemo</a></code>
- <code><a href="./src/resources/qbd/credit-memos.ts">CreditMemoDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/credit-memos">client.qbd.creditMemos.<a href="./src/resources/qbd/credit-memos.ts">create</a>({ ...params }) -> CreditMemo</code>
- <code title="get /quickbooks-desktop/credit-memos/{id}">client.qbd.creditMemos.<a href="./src/resources/qbd/credit-memos.ts">retrieve</a>(id, { ...params }) -> CreditMemo</code>
- <code title="post /quickbooks-desktop/credit-memos/{id}">client.qbd.creditMemos.<a href="./src/resources/qbd/credit-memos.ts">update</a>(id, { ...params }) -> CreditMemo</code>
- <code title="get /quickbooks-desktop/credit-memos">client.qbd.creditMemos.<a href="./src/resources/qbd/credit-memos.ts">list</a>({ ...params }) -> CreditMemosCursorPage</code>
- <code title="delete /quickbooks-desktop/credit-memos/{id}">client.qbd.creditMemos.<a href="./src/resources/qbd/credit-memos.ts">delete</a>(id, { ...params }) -> CreditMemoDeleteResponse</code>

## Currencies

Types:

- <code><a href="./src/resources/qbd/currencies.ts">Currency</a></code>
- <code><a href="./src/resources/qbd/currencies.ts">CurrencyListResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/currencies">client.qbd.currencies.<a href="./src/resources/qbd/currencies.ts">create</a>({ ...params }) -> Currency</code>
- <code title="get /quickbooks-desktop/currencies/{id}">client.qbd.currencies.<a href="./src/resources/qbd/currencies.ts">retrieve</a>(id, { ...params }) -> Currency</code>
- <code title="post /quickbooks-desktop/currencies/{id}">client.qbd.currencies.<a href="./src/resources/qbd/currencies.ts">update</a>(id, { ...params }) -> Currency</code>
- <code title="get /quickbooks-desktop/currencies">client.qbd.currencies.<a href="./src/resources/qbd/currencies.ts">list</a>({ ...params }) -> CurrencyListResponse</code>

## Customers

Types:

- <code><a href="./src/resources/qbd/customers.ts">Customer</a></code>

Methods:

- <code title="post /quickbooks-desktop/customers">client.qbd.customers.<a href="./src/resources/qbd/customers.ts">create</a>({ ...params }) -> Customer</code>
- <code title="get /quickbooks-desktop/customers/{id}">client.qbd.customers.<a href="./src/resources/qbd/customers.ts">retrieve</a>(id, { ...params }) -> Customer</code>
- <code title="post /quickbooks-desktop/customers/{id}">client.qbd.customers.<a href="./src/resources/qbd/customers.ts">update</a>(id, { ...params }) -> Customer</code>
- <code title="get /quickbooks-desktop/customers">client.qbd.customers.<a href="./src/resources/qbd/customers.ts">list</a>({ ...params }) -> CustomersCursorPage</code>

## DateDrivenTerms

Types:

- <code><a href="./src/resources/qbd/date-driven-terms.ts">DateDrivenTerm</a></code>
- <code><a href="./src/resources/qbd/date-driven-terms.ts">DateDrivenTermListResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/date-driven-terms">client.qbd.dateDrivenTerms.<a href="./src/resources/qbd/date-driven-terms.ts">create</a>({ ...params }) -> DateDrivenTerm</code>
- <code title="get /quickbooks-desktop/date-driven-terms/{id}">client.qbd.dateDrivenTerms.<a href="./src/resources/qbd/date-driven-terms.ts">retrieve</a>(id, { ...params }) -> DateDrivenTerm</code>
- <code title="get /quickbooks-desktop/date-driven-terms">client.qbd.dateDrivenTerms.<a href="./src/resources/qbd/date-driven-terms.ts">list</a>({ ...params }) -> DateDrivenTermListResponse</code>

## DeletedListObjects

Types:

- <code><a href="./src/resources/qbd/deleted-list-objects.ts">DeletedListObject</a></code>
- <code><a href="./src/resources/qbd/deleted-list-objects.ts">DeletedListObjectListResponse</a></code>

Methods:

- <code title="get /quickbooks-desktop/deleted-list-objects">client.qbd.deletedListObjects.<a href="./src/resources/qbd/deleted-list-objects.ts">list</a>({ ...params }) -> DeletedListObjectListResponse</code>

## DeletedTransactions

Types:

- <code><a href="./src/resources/qbd/deleted-transactions.ts">DeletedTransaction</a></code>
- <code><a href="./src/resources/qbd/deleted-transactions.ts">DeletedTransactionListResponse</a></code>

Methods:

- <code title="get /quickbooks-desktop/deleted-transactions">client.qbd.deletedTransactions.<a href="./src/resources/qbd/deleted-transactions.ts">list</a>({ ...params }) -> DeletedTransactionListResponse</code>

## DiscountItems

Types:

- <code><a href="./src/resources/qbd/discount-items.ts">DiscountItem</a></code>

Methods:

- <code title="post /quickbooks-desktop/discount-items">client.qbd.discountItems.<a href="./src/resources/qbd/discount-items.ts">create</a>({ ...params }) -> DiscountItem</code>
- <code title="get /quickbooks-desktop/discount-items/{id}">client.qbd.discountItems.<a href="./src/resources/qbd/discount-items.ts">retrieve</a>(id, { ...params }) -> DiscountItem</code>
- <code title="post /quickbooks-desktop/discount-items/{id}">client.qbd.discountItems.<a href="./src/resources/qbd/discount-items.ts">update</a>(id, { ...params }) -> DiscountItem</code>
- <code title="get /quickbooks-desktop/discount-items">client.qbd.discountItems.<a href="./src/resources/qbd/discount-items.ts">list</a>({ ...params }) -> DiscountItemsCursorPage</code>

## Employees

Types:

- <code><a href="./src/resources/qbd/employees.ts">Employee</a></code>
- <code><a href="./src/resources/qbd/employees.ts">EmployeeListResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/employees">client.qbd.employees.<a href="./src/resources/qbd/employees.ts">create</a>({ ...params }) -> Employee</code>
- <code title="get /quickbooks-desktop/employees/{id}">client.qbd.employees.<a href="./src/resources/qbd/employees.ts">retrieve</a>(id, { ...params }) -> Employee</code>
- <code title="post /quickbooks-desktop/employees/{id}">client.qbd.employees.<a href="./src/resources/qbd/employees.ts">update</a>(id, { ...params }) -> Employee</code>
- <code title="get /quickbooks-desktop/employees">client.qbd.employees.<a href="./src/resources/qbd/employees.ts">list</a>({ ...params }) -> EmployeeListResponse</code>

## Estimates

Types:

- <code><a href="./src/resources/qbd/estimates.ts">Estimate</a></code>
- <code><a href="./src/resources/qbd/estimates.ts">EstimateDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/estimates">client.qbd.estimates.<a href="./src/resources/qbd/estimates.ts">create</a>({ ...params }) -> Estimate</code>
- <code title="get /quickbooks-desktop/estimates/{id}">client.qbd.estimates.<a href="./src/resources/qbd/estimates.ts">retrieve</a>(id, { ...params }) -> Estimate</code>
- <code title="post /quickbooks-desktop/estimates/{id}">client.qbd.estimates.<a href="./src/resources/qbd/estimates.ts">update</a>(id, { ...params }) -> Estimate</code>
- <code title="get /quickbooks-desktop/estimates">client.qbd.estimates.<a href="./src/resources/qbd/estimates.ts">list</a>({ ...params }) -> EstimatesCursorPage</code>
- <code title="delete /quickbooks-desktop/estimates/{id}">client.qbd.estimates.<a href="./src/resources/qbd/estimates.ts">delete</a>(id, { ...params }) -> EstimateDeleteResponse</code>

## InventoryAdjustments

Types:

- <code><a href="./src/resources/qbd/inventory-adjustments.ts">InventoryAdjustment</a></code>
- <code><a href="./src/resources/qbd/inventory-adjustments.ts">InventoryAdjustmentListResponse</a></code>
- <code><a href="./src/resources/qbd/inventory-adjustments.ts">InventoryAdjustmentDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/inventory-adjustments">client.qbd.inventoryAdjustments.<a href="./src/resources/qbd/inventory-adjustments.ts">create</a>({ ...params }) -> InventoryAdjustment</code>
- <code title="get /quickbooks-desktop/inventory-adjustments/{id}">client.qbd.inventoryAdjustments.<a href="./src/resources/qbd/inventory-adjustments.ts">retrieve</a>(id, { ...params }) -> InventoryAdjustment</code>
- <code title="post /quickbooks-desktop/inventory-adjustments/{id}">client.qbd.inventoryAdjustments.<a href="./src/resources/qbd/inventory-adjustments.ts">update</a>(id, { ...params }) -> InventoryAdjustment</code>
- <code title="get /quickbooks-desktop/inventory-adjustments">client.qbd.inventoryAdjustments.<a href="./src/resources/qbd/inventory-adjustments.ts">list</a>({ ...params }) -> InventoryAdjustmentListResponse</code>
- <code title="delete /quickbooks-desktop/inventory-adjustments/{id}">client.qbd.inventoryAdjustments.<a href="./src/resources/qbd/inventory-adjustments.ts">delete</a>(id, { ...params }) -> InventoryAdjustmentDeleteResponse</code>

## InventoryAssemblyItems

Types:

- <code><a href="./src/resources/qbd/inventory-assembly-items.ts">InventoryAssemblyItem</a></code>

Methods:

- <code title="post /quickbooks-desktop/inventory-assembly-items">client.qbd.inventoryAssemblyItems.<a href="./src/resources/qbd/inventory-assembly-items.ts">create</a>({ ...params }) -> InventoryAssemblyItem</code>
- <code title="get /quickbooks-desktop/inventory-assembly-items/{id}">client.qbd.inventoryAssemblyItems.<a href="./src/resources/qbd/inventory-assembly-items.ts">retrieve</a>(id, { ...params }) -> InventoryAssemblyItem</code>
- <code title="post /quickbooks-desktop/inventory-assembly-items/{id}">client.qbd.inventoryAssemblyItems.<a href="./src/resources/qbd/inventory-assembly-items.ts">update</a>(id, { ...params }) -> InventoryAssemblyItem</code>
- <code title="get /quickbooks-desktop/inventory-assembly-items">client.qbd.inventoryAssemblyItems.<a href="./src/resources/qbd/inventory-assembly-items.ts">list</a>({ ...params }) -> InventoryAssemblyItemsCursorPage</code>

## InventoryItems

Types:

- <code><a href="./src/resources/qbd/inventory-items.ts">InventoryItem</a></code>

Methods:

- <code title="post /quickbooks-desktop/inventory-items">client.qbd.inventoryItems.<a href="./src/resources/qbd/inventory-items.ts">create</a>({ ...params }) -> InventoryItem</code>
- <code title="get /quickbooks-desktop/inventory-items/{id}">client.qbd.inventoryItems.<a href="./src/resources/qbd/inventory-items.ts">retrieve</a>(id, { ...params }) -> InventoryItem</code>
- <code title="post /quickbooks-desktop/inventory-items/{id}">client.qbd.inventoryItems.<a href="./src/resources/qbd/inventory-items.ts">update</a>(id, { ...params }) -> InventoryItem</code>
- <code title="get /quickbooks-desktop/inventory-items">client.qbd.inventoryItems.<a href="./src/resources/qbd/inventory-items.ts">list</a>({ ...params }) -> InventoryItemsCursorPage</code>

## InventorySites

Types:

- <code><a href="./src/resources/qbd/inventory-sites.ts">InventorySite</a></code>
- <code><a href="./src/resources/qbd/inventory-sites.ts">InventorySiteListResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/inventory-sites">client.qbd.inventorySites.<a href="./src/resources/qbd/inventory-sites.ts">create</a>({ ...params }) -> InventorySite</code>
- <code title="get /quickbooks-desktop/inventory-sites/{id}">client.qbd.inventorySites.<a href="./src/resources/qbd/inventory-sites.ts">retrieve</a>(id, { ...params }) -> InventorySite</code>
- <code title="post /quickbooks-desktop/inventory-sites/{id}">client.qbd.inventorySites.<a href="./src/resources/qbd/inventory-sites.ts">update</a>(id, { ...params }) -> InventorySite</code>
- <code title="get /quickbooks-desktop/inventory-sites">client.qbd.inventorySites.<a href="./src/resources/qbd/inventory-sites.ts">list</a>({ ...params }) -> InventorySiteListResponse</code>

## Invoices

Types:

- <code><a href="./src/resources/qbd/invoices.ts">Invoice</a></code>
- <code><a href="./src/resources/qbd/invoices.ts">InvoiceDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/invoices">client.qbd.invoices.<a href="./src/resources/qbd/invoices.ts">create</a>({ ...params }) -> Invoice</code>
- <code title="get /quickbooks-desktop/invoices/{id}">client.qbd.invoices.<a href="./src/resources/qbd/invoices.ts">retrieve</a>(id, { ...params }) -> Invoice</code>
- <code title="post /quickbooks-desktop/invoices/{id}">client.qbd.invoices.<a href="./src/resources/qbd/invoices.ts">update</a>(id, { ...params }) -> Invoice</code>
- <code title="get /quickbooks-desktop/invoices">client.qbd.invoices.<a href="./src/resources/qbd/invoices.ts">list</a>({ ...params }) -> InvoicesCursorPage</code>
- <code title="delete /quickbooks-desktop/invoices/{id}">client.qbd.invoices.<a href="./src/resources/qbd/invoices.ts">delete</a>(id, { ...params }) -> InvoiceDeleteResponse</code>

## ItemGroups

Types:

- <code><a href="./src/resources/qbd/item-groups.ts">ItemGroup</a></code>

Methods:

- <code title="post /quickbooks-desktop/item-groups">client.qbd.itemGroups.<a href="./src/resources/qbd/item-groups.ts">create</a>({ ...params }) -> ItemGroup</code>
- <code title="get /quickbooks-desktop/item-groups/{id}">client.qbd.itemGroups.<a href="./src/resources/qbd/item-groups.ts">retrieve</a>(id, { ...params }) -> ItemGroup</code>
- <code title="post /quickbooks-desktop/item-groups/{id}">client.qbd.itemGroups.<a href="./src/resources/qbd/item-groups.ts">update</a>(id, { ...params }) -> ItemGroup</code>
- <code title="get /quickbooks-desktop/item-groups">client.qbd.itemGroups.<a href="./src/resources/qbd/item-groups.ts">list</a>({ ...params }) -> ItemGroupsCursorPage</code>

## ItemReceipts

Types:

- <code><a href="./src/resources/qbd/item-receipts.ts">ItemReceipt</a></code>
- <code><a href="./src/resources/qbd/item-receipts.ts">ItemReceiptDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/item-receipts">client.qbd.itemReceipts.<a href="./src/resources/qbd/item-receipts.ts">create</a>({ ...params }) -> ItemReceipt</code>
- <code title="get /quickbooks-desktop/item-receipts/{id}">client.qbd.itemReceipts.<a href="./src/resources/qbd/item-receipts.ts">retrieve</a>(id, { ...params }) -> ItemReceipt</code>
- <code title="post /quickbooks-desktop/item-receipts/{id}">client.qbd.itemReceipts.<a href="./src/resources/qbd/item-receipts.ts">update</a>(id, { ...params }) -> ItemReceipt</code>
- <code title="get /quickbooks-desktop/item-receipts">client.qbd.itemReceipts.<a href="./src/resources/qbd/item-receipts.ts">list</a>({ ...params }) -> ItemReceiptsCursorPage</code>
- <code title="delete /quickbooks-desktop/item-receipts/{id}">client.qbd.itemReceipts.<a href="./src/resources/qbd/item-receipts.ts">delete</a>(id, { ...params }) -> ItemReceiptDeleteResponse</code>

## ItemSites

Types:

- <code><a href="./src/resources/qbd/item-sites.ts">ItemSite</a></code>

Methods:

- <code title="get /quickbooks-desktop/item-sites/{id}">client.qbd.itemSites.<a href="./src/resources/qbd/item-sites.ts">retrieve</a>(id, { ...params }) -> ItemSite</code>
- <code title="get /quickbooks-desktop/item-sites">client.qbd.itemSites.<a href="./src/resources/qbd/item-sites.ts">list</a>({ ...params }) -> ItemSitesCursorPage</code>

## JournalEntries

Types:

- <code><a href="./src/resources/qbd/journal-entries.ts">JournalEntry</a></code>
- <code><a href="./src/resources/qbd/journal-entries.ts">JournalEntryDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/journal-entries">client.qbd.journalEntries.<a href="./src/resources/qbd/journal-entries.ts">create</a>({ ...params }) -> JournalEntry</code>
- <code title="get /quickbooks-desktop/journal-entries/{id}">client.qbd.journalEntries.<a href="./src/resources/qbd/journal-entries.ts">retrieve</a>(id, { ...params }) -> JournalEntry</code>
- <code title="post /quickbooks-desktop/journal-entries/{id}">client.qbd.journalEntries.<a href="./src/resources/qbd/journal-entries.ts">update</a>(id, { ...params }) -> JournalEntry</code>
- <code title="get /quickbooks-desktop/journal-entries">client.qbd.journalEntries.<a href="./src/resources/qbd/journal-entries.ts">list</a>({ ...params }) -> JournalEntriesCursorPage</code>
- <code title="delete /quickbooks-desktop/journal-entries/{id}">client.qbd.journalEntries.<a href="./src/resources/qbd/journal-entries.ts">delete</a>(id, { ...params }) -> JournalEntryDeleteResponse</code>

## NonInventoryItems

Types:

- <code><a href="./src/resources/qbd/non-inventory-items.ts">NonInventoryItem</a></code>

Methods:

- <code title="post /quickbooks-desktop/non-inventory-items">client.qbd.nonInventoryItems.<a href="./src/resources/qbd/non-inventory-items.ts">create</a>({ ...params }) -> NonInventoryItem</code>
- <code title="get /quickbooks-desktop/non-inventory-items/{id}">client.qbd.nonInventoryItems.<a href="./src/resources/qbd/non-inventory-items.ts">retrieve</a>(id, { ...params }) -> NonInventoryItem</code>
- <code title="post /quickbooks-desktop/non-inventory-items/{id}">client.qbd.nonInventoryItems.<a href="./src/resources/qbd/non-inventory-items.ts">update</a>(id, { ...params }) -> NonInventoryItem</code>
- <code title="get /quickbooks-desktop/non-inventory-items">client.qbd.nonInventoryItems.<a href="./src/resources/qbd/non-inventory-items.ts">list</a>({ ...params }) -> NonInventoryItemsCursorPage</code>

## OtherChargeItems

Types:

- <code><a href="./src/resources/qbd/other-charge-items.ts">OtherChargeItem</a></code>

Methods:

- <code title="post /quickbooks-desktop/other-charge-items">client.qbd.otherChargeItems.<a href="./src/resources/qbd/other-charge-items.ts">create</a>({ ...params }) -> OtherChargeItem</code>
- <code title="get /quickbooks-desktop/other-charge-items/{id}">client.qbd.otherChargeItems.<a href="./src/resources/qbd/other-charge-items.ts">retrieve</a>(id, { ...params }) -> OtherChargeItem</code>
- <code title="post /quickbooks-desktop/other-charge-items/{id}">client.qbd.otherChargeItems.<a href="./src/resources/qbd/other-charge-items.ts">update</a>(id, { ...params }) -> OtherChargeItem</code>
- <code title="get /quickbooks-desktop/other-charge-items">client.qbd.otherChargeItems.<a href="./src/resources/qbd/other-charge-items.ts">list</a>({ ...params }) -> OtherChargeItemsCursorPage</code>

## OtherNames

Types:

- <code><a href="./src/resources/qbd/other-names.ts">OtherName</a></code>
- <code><a href="./src/resources/qbd/other-names.ts">OtherNameListResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/other-names">client.qbd.otherNames.<a href="./src/resources/qbd/other-names.ts">create</a>({ ...params }) -> OtherName</code>
- <code title="get /quickbooks-desktop/other-names/{id}">client.qbd.otherNames.<a href="./src/resources/qbd/other-names.ts">retrieve</a>(id, { ...params }) -> OtherName</code>
- <code title="post /quickbooks-desktop/other-names/{id}">client.qbd.otherNames.<a href="./src/resources/qbd/other-names.ts">update</a>(id, { ...params }) -> OtherName</code>
- <code title="get /quickbooks-desktop/other-names">client.qbd.otherNames.<a href="./src/resources/qbd/other-names.ts">list</a>({ ...params }) -> OtherNameListResponse</code>

## PaymentMethods

Types:

- <code><a href="./src/resources/qbd/payment-methods.ts">PaymentMethod</a></code>
- <code><a href="./src/resources/qbd/payment-methods.ts">PaymentMethodListResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/payment-methods">client.qbd.paymentMethods.<a href="./src/resources/qbd/payment-methods.ts">create</a>({ ...params }) -> PaymentMethod</code>
- <code title="get /quickbooks-desktop/payment-methods/{id}">client.qbd.paymentMethods.<a href="./src/resources/qbd/payment-methods.ts">retrieve</a>(id, { ...params }) -> PaymentMethod</code>
- <code title="get /quickbooks-desktop/payment-methods">client.qbd.paymentMethods.<a href="./src/resources/qbd/payment-methods.ts">list</a>({ ...params }) -> PaymentMethodListResponse</code>

## PayrollWageItems

Types:

- <code><a href="./src/resources/qbd/payroll-wage-items.ts">PayrollWageItem</a></code>

Methods:

- <code title="post /quickbooks-desktop/payroll-wage-items">client.qbd.payrollWageItems.<a href="./src/resources/qbd/payroll-wage-items.ts">create</a>({ ...params }) -> PayrollWageItem</code>
- <code title="get /quickbooks-desktop/payroll-wage-items/{id}">client.qbd.payrollWageItems.<a href="./src/resources/qbd/payroll-wage-items.ts">retrieve</a>(id, { ...params }) -> PayrollWageItem</code>
- <code title="get /quickbooks-desktop/payroll-wage-items">client.qbd.payrollWageItems.<a href="./src/resources/qbd/payroll-wage-items.ts">list</a>({ ...params }) -> PayrollWageItemsCursorPage</code>

## Preferences

Types:

- <code><a href="./src/resources/qbd/preferences.ts">Preferences</a></code>

Methods:

- <code title="get /quickbooks-desktop/preferences">client.qbd.preferences.<a href="./src/resources/qbd/preferences.ts">retrieve</a>({ ...params }) -> Preferences</code>

## PriceLevels

Types:

- <code><a href="./src/resources/qbd/price-levels.ts">PriceLevel</a></code>
- <code><a href="./src/resources/qbd/price-levels.ts">PriceLevelListResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/price-levels">client.qbd.priceLevels.<a href="./src/resources/qbd/price-levels.ts">create</a>({ ...params }) -> PriceLevel</code>
- <code title="get /quickbooks-desktop/price-levels/{id}">client.qbd.priceLevels.<a href="./src/resources/qbd/price-levels.ts">retrieve</a>(id, { ...params }) -> PriceLevel</code>
- <code title="post /quickbooks-desktop/price-levels/{id}">client.qbd.priceLevels.<a href="./src/resources/qbd/price-levels.ts">update</a>(id, { ...params }) -> PriceLevel</code>
- <code title="get /quickbooks-desktop/price-levels">client.qbd.priceLevels.<a href="./src/resources/qbd/price-levels.ts">list</a>({ ...params }) -> PriceLevelListResponse</code>

## PurchaseOrders

Types:

- <code><a href="./src/resources/qbd/purchase-orders.ts">PurchaseOrder</a></code>
- <code><a href="./src/resources/qbd/purchase-orders.ts">PurchaseOrderDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/purchase-orders">client.qbd.purchaseOrders.<a href="./src/resources/qbd/purchase-orders.ts">create</a>({ ...params }) -> PurchaseOrder</code>
- <code title="get /quickbooks-desktop/purchase-orders/{id}">client.qbd.purchaseOrders.<a href="./src/resources/qbd/purchase-orders.ts">retrieve</a>(id, { ...params }) -> PurchaseOrder</code>
- <code title="post /quickbooks-desktop/purchase-orders/{id}">client.qbd.purchaseOrders.<a href="./src/resources/qbd/purchase-orders.ts">update</a>(id, { ...params }) -> PurchaseOrder</code>
- <code title="get /quickbooks-desktop/purchase-orders">client.qbd.purchaseOrders.<a href="./src/resources/qbd/purchase-orders.ts">list</a>({ ...params }) -> PurchaseOrdersCursorPage</code>
- <code title="delete /quickbooks-desktop/purchase-orders/{id}">client.qbd.purchaseOrders.<a href="./src/resources/qbd/purchase-orders.ts">delete</a>(id, { ...params }) -> PurchaseOrderDeleteResponse</code>

## ReceivePayments

Types:

- <code><a href="./src/resources/qbd/receive-payments.ts">ReceivePayment</a></code>
- <code><a href="./src/resources/qbd/receive-payments.ts">ReceivePaymentDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/receive-payments">client.qbd.receivePayments.<a href="./src/resources/qbd/receive-payments.ts">create</a>({ ...params }) -> ReceivePayment</code>
- <code title="get /quickbooks-desktop/receive-payments/{id}">client.qbd.receivePayments.<a href="./src/resources/qbd/receive-payments.ts">retrieve</a>(id, { ...params }) -> ReceivePayment</code>
- <code title="post /quickbooks-desktop/receive-payments/{id}">client.qbd.receivePayments.<a href="./src/resources/qbd/receive-payments.ts">update</a>(id, { ...params }) -> ReceivePayment</code>
- <code title="get /quickbooks-desktop/receive-payments">client.qbd.receivePayments.<a href="./src/resources/qbd/receive-payments.ts">list</a>({ ...params }) -> ReceivePaymentsCursorPage</code>
- <code title="delete /quickbooks-desktop/receive-payments/{id}">client.qbd.receivePayments.<a href="./src/resources/qbd/receive-payments.ts">delete</a>(id, { ...params }) -> ReceivePaymentDeleteResponse</code>

## SalesOrders

Types:

- <code><a href="./src/resources/qbd/sales-orders.ts">SalesOrder</a></code>
- <code><a href="./src/resources/qbd/sales-orders.ts">SalesOrderDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/sales-orders">client.qbd.salesOrders.<a href="./src/resources/qbd/sales-orders.ts">create</a>({ ...params }) -> SalesOrder</code>
- <code title="get /quickbooks-desktop/sales-orders/{id}">client.qbd.salesOrders.<a href="./src/resources/qbd/sales-orders.ts">retrieve</a>(id, { ...params }) -> SalesOrder</code>
- <code title="post /quickbooks-desktop/sales-orders/{id}">client.qbd.salesOrders.<a href="./src/resources/qbd/sales-orders.ts">update</a>(id, { ...params }) -> SalesOrder</code>
- <code title="get /quickbooks-desktop/sales-orders">client.qbd.salesOrders.<a href="./src/resources/qbd/sales-orders.ts">list</a>({ ...params }) -> SalesOrdersCursorPage</code>
- <code title="delete /quickbooks-desktop/sales-orders/{id}">client.qbd.salesOrders.<a href="./src/resources/qbd/sales-orders.ts">delete</a>(id, { ...params }) -> SalesOrderDeleteResponse</code>

## SalesReceipts

Types:

- <code><a href="./src/resources/qbd/sales-receipts.ts">SalesReceipt</a></code>
- <code><a href="./src/resources/qbd/sales-receipts.ts">SalesReceiptDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/sales-receipts">client.qbd.salesReceipts.<a href="./src/resources/qbd/sales-receipts.ts">create</a>({ ...params }) -> SalesReceipt</code>
- <code title="get /quickbooks-desktop/sales-receipts/{id}">client.qbd.salesReceipts.<a href="./src/resources/qbd/sales-receipts.ts">retrieve</a>(id, { ...params }) -> SalesReceipt</code>
- <code title="post /quickbooks-desktop/sales-receipts/{id}">client.qbd.salesReceipts.<a href="./src/resources/qbd/sales-receipts.ts">update</a>(id, { ...params }) -> SalesReceipt</code>
- <code title="get /quickbooks-desktop/sales-receipts">client.qbd.salesReceipts.<a href="./src/resources/qbd/sales-receipts.ts">list</a>({ ...params }) -> SalesReceiptsCursorPage</code>
- <code title="delete /quickbooks-desktop/sales-receipts/{id}">client.qbd.salesReceipts.<a href="./src/resources/qbd/sales-receipts.ts">delete</a>(id, { ...params }) -> SalesReceiptDeleteResponse</code>

## SalesRepresentatives

Types:

- <code><a href="./src/resources/qbd/sales-representatives.ts">SalesRepresentative</a></code>
- <code><a href="./src/resources/qbd/sales-representatives.ts">SalesRepresentativeListResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/sales-representatives">client.qbd.salesRepresentatives.<a href="./src/resources/qbd/sales-representatives.ts">create</a>({ ...params }) -> SalesRepresentative</code>
- <code title="get /quickbooks-desktop/sales-representatives/{id}">client.qbd.salesRepresentatives.<a href="./src/resources/qbd/sales-representatives.ts">retrieve</a>(id, { ...params }) -> SalesRepresentative</code>
- <code title="post /quickbooks-desktop/sales-representatives/{id}">client.qbd.salesRepresentatives.<a href="./src/resources/qbd/sales-representatives.ts">update</a>(id, { ...params }) -> SalesRepresentative</code>
- <code title="get /quickbooks-desktop/sales-representatives">client.qbd.salesRepresentatives.<a href="./src/resources/qbd/sales-representatives.ts">list</a>({ ...params }) -> SalesRepresentativeListResponse</code>

## SalesTaxCodes

Types:

- <code><a href="./src/resources/qbd/sales-tax-codes.ts">SalesTaxCode</a></code>
- <code><a href="./src/resources/qbd/sales-tax-codes.ts">SalesTaxCodeListResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/sales-tax-codes">client.qbd.salesTaxCodes.<a href="./src/resources/qbd/sales-tax-codes.ts">create</a>({ ...params }) -> SalesTaxCode</code>
- <code title="get /quickbooks-desktop/sales-tax-codes/{id}">client.qbd.salesTaxCodes.<a href="./src/resources/qbd/sales-tax-codes.ts">retrieve</a>(id, { ...params }) -> SalesTaxCode</code>
- <code title="post /quickbooks-desktop/sales-tax-codes/{id}">client.qbd.salesTaxCodes.<a href="./src/resources/qbd/sales-tax-codes.ts">update</a>(id, { ...params }) -> SalesTaxCode</code>
- <code title="get /quickbooks-desktop/sales-tax-codes">client.qbd.salesTaxCodes.<a href="./src/resources/qbd/sales-tax-codes.ts">list</a>({ ...params }) -> SalesTaxCodeListResponse</code>

## SalesTaxItems

Types:

- <code><a href="./src/resources/qbd/sales-tax-items.ts">SalesTaxItem</a></code>

Methods:

- <code title="post /quickbooks-desktop/sales-tax-items">client.qbd.salesTaxItems.<a href="./src/resources/qbd/sales-tax-items.ts">create</a>({ ...params }) -> SalesTaxItem</code>
- <code title="get /quickbooks-desktop/sales-tax-items/{id}">client.qbd.salesTaxItems.<a href="./src/resources/qbd/sales-tax-items.ts">retrieve</a>(id, { ...params }) -> SalesTaxItem</code>
- <code title="post /quickbooks-desktop/sales-tax-items/{id}">client.qbd.salesTaxItems.<a href="./src/resources/qbd/sales-tax-items.ts">update</a>(id, { ...params }) -> SalesTaxItem</code>
- <code title="get /quickbooks-desktop/sales-tax-items">client.qbd.salesTaxItems.<a href="./src/resources/qbd/sales-tax-items.ts">list</a>({ ...params }) -> SalesTaxItemsCursorPage</code>

## ServiceItems

Types:

- <code><a href="./src/resources/qbd/service-items.ts">ServiceItem</a></code>

Methods:

- <code title="post /quickbooks-desktop/service-items">client.qbd.serviceItems.<a href="./src/resources/qbd/service-items.ts">create</a>({ ...params }) -> ServiceItem</code>
- <code title="get /quickbooks-desktop/service-items/{id}">client.qbd.serviceItems.<a href="./src/resources/qbd/service-items.ts">retrieve</a>(id, { ...params }) -> ServiceItem</code>
- <code title="post /quickbooks-desktop/service-items/{id}">client.qbd.serviceItems.<a href="./src/resources/qbd/service-items.ts">update</a>(id, { ...params }) -> ServiceItem</code>
- <code title="get /quickbooks-desktop/service-items">client.qbd.serviceItems.<a href="./src/resources/qbd/service-items.ts">list</a>({ ...params }) -> ServiceItemsCursorPage</code>

## StandardTerms

Types:

- <code><a href="./src/resources/qbd/standard-terms.ts">StandardTerm</a></code>
- <code><a href="./src/resources/qbd/standard-terms.ts">StandardTermListResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/standard-terms">client.qbd.standardTerms.<a href="./src/resources/qbd/standard-terms.ts">create</a>({ ...params }) -> StandardTerm</code>
- <code title="get /quickbooks-desktop/standard-terms/{id}">client.qbd.standardTerms.<a href="./src/resources/qbd/standard-terms.ts">retrieve</a>(id, { ...params }) -> StandardTerm</code>
- <code title="get /quickbooks-desktop/standard-terms">client.qbd.standardTerms.<a href="./src/resources/qbd/standard-terms.ts">list</a>({ ...params }) -> StandardTermListResponse</code>

## SubtotalItems

Types:

- <code><a href="./src/resources/qbd/subtotal-items.ts">SubtotalItem</a></code>

Methods:

- <code title="post /quickbooks-desktop/subtotal-items">client.qbd.subtotalItems.<a href="./src/resources/qbd/subtotal-items.ts">create</a>({ ...params }) -> SubtotalItem</code>
- <code title="get /quickbooks-desktop/subtotal-items/{id}">client.qbd.subtotalItems.<a href="./src/resources/qbd/subtotal-items.ts">retrieve</a>(id, { ...params }) -> SubtotalItem</code>
- <code title="post /quickbooks-desktop/subtotal-items/{id}">client.qbd.subtotalItems.<a href="./src/resources/qbd/subtotal-items.ts">update</a>(id, { ...params }) -> SubtotalItem</code>
- <code title="get /quickbooks-desktop/subtotal-items">client.qbd.subtotalItems.<a href="./src/resources/qbd/subtotal-items.ts">list</a>({ ...params }) -> SubtotalItemsCursorPage</code>

## Templates

Types:

- <code><a href="./src/resources/qbd/templates.ts">Template</a></code>
- <code><a href="./src/resources/qbd/templates.ts">TemplateListResponse</a></code>

Methods:

- <code title="get /quickbooks-desktop/templates">client.qbd.templates.<a href="./src/resources/qbd/templates.ts">list</a>({ ...params }) -> TemplateListResponse</code>

## TimeTrackingActivities

Types:

- <code><a href="./src/resources/qbd/time-tracking-activities.ts">TimeTrackingActivity</a></code>
- <code><a href="./src/resources/qbd/time-tracking-activities.ts">TimeTrackingActivityDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/time-tracking-activities">client.qbd.timeTrackingActivities.<a href="./src/resources/qbd/time-tracking-activities.ts">create</a>({ ...params }) -> TimeTrackingActivity</code>
- <code title="get /quickbooks-desktop/time-tracking-activities/{id}">client.qbd.timeTrackingActivities.<a href="./src/resources/qbd/time-tracking-activities.ts">retrieve</a>(id, { ...params }) -> TimeTrackingActivity</code>
- <code title="post /quickbooks-desktop/time-tracking-activities/{id}">client.qbd.timeTrackingActivities.<a href="./src/resources/qbd/time-tracking-activities.ts">update</a>(id, { ...params }) -> TimeTrackingActivity</code>
- <code title="get /quickbooks-desktop/time-tracking-activities">client.qbd.timeTrackingActivities.<a href="./src/resources/qbd/time-tracking-activities.ts">list</a>({ ...params }) -> TimeTrackingActivitiesCursorPage</code>
- <code title="delete /quickbooks-desktop/time-tracking-activities/{id}">client.qbd.timeTrackingActivities.<a href="./src/resources/qbd/time-tracking-activities.ts">delete</a>(id, { ...params }) -> TimeTrackingActivityDeleteResponse</code>

## Transactions

Types:

- <code><a href="./src/resources/qbd/transactions.ts">Transaction</a></code>

Methods:

- <code title="get /quickbooks-desktop/transactions/{id}">client.qbd.transactions.<a href="./src/resources/qbd/transactions.ts">retrieve</a>(id, { ...params }) -> Transaction</code>
- <code title="get /quickbooks-desktop/transactions">client.qbd.transactions.<a href="./src/resources/qbd/transactions.ts">list</a>({ ...params }) -> TransactionsCursorPage</code>

## Transfers

Types:

- <code><a href="./src/resources/qbd/transfers.ts">Transfer</a></code>

Methods:

- <code title="post /quickbooks-desktop/transfers">client.qbd.transfers.<a href="./src/resources/qbd/transfers.ts">create</a>({ ...params }) -> Transfer</code>
- <code title="get /quickbooks-desktop/transfers/{id}">client.qbd.transfers.<a href="./src/resources/qbd/transfers.ts">retrieve</a>(id, { ...params }) -> Transfer</code>
- <code title="post /quickbooks-desktop/transfers/{id}">client.qbd.transfers.<a href="./src/resources/qbd/transfers.ts">update</a>(id, { ...params }) -> Transfer</code>
- <code title="get /quickbooks-desktop/transfers">client.qbd.transfers.<a href="./src/resources/qbd/transfers.ts">list</a>({ ...params }) -> TransfersCursorPage</code>

## UnitOfMeasureSets

Types:

- <code><a href="./src/resources/qbd/unit-of-measure-sets.ts">UnitOfMeasureSet</a></code>
- <code><a href="./src/resources/qbd/unit-of-measure-sets.ts">UnitOfMeasureSetListResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/unit-of-measure-sets">client.qbd.unitOfMeasureSets.<a href="./src/resources/qbd/unit-of-measure-sets.ts">create</a>({ ...params }) -> UnitOfMeasureSet</code>
- <code title="get /quickbooks-desktop/unit-of-measure-sets/{id}">client.qbd.unitOfMeasureSets.<a href="./src/resources/qbd/unit-of-measure-sets.ts">retrieve</a>(id, { ...params }) -> UnitOfMeasureSet</code>
- <code title="get /quickbooks-desktop/unit-of-measure-sets">client.qbd.unitOfMeasureSets.<a href="./src/resources/qbd/unit-of-measure-sets.ts">list</a>({ ...params }) -> UnitOfMeasureSetListResponse</code>

## VendorCredits

Types:

- <code><a href="./src/resources/qbd/vendor-credits.ts">VendorCredit</a></code>
- <code><a href="./src/resources/qbd/vendor-credits.ts">VendorCreditDeleteResponse</a></code>

Methods:

- <code title="post /quickbooks-desktop/vendor-credits">client.qbd.vendorCredits.<a href="./src/resources/qbd/vendor-credits.ts">create</a>({ ...params }) -> VendorCredit</code>
- <code title="get /quickbooks-desktop/vendor-credits/{id}">client.qbd.vendorCredits.<a href="./src/resources/qbd/vendor-credits.ts">retrieve</a>(id, { ...params }) -> VendorCredit</code>
- <code title="post /quickbooks-desktop/vendor-credits/{id}">client.qbd.vendorCredits.<a href="./src/resources/qbd/vendor-credits.ts">update</a>(id, { ...params }) -> VendorCredit</code>
- <code title="get /quickbooks-desktop/vendor-credits">client.qbd.vendorCredits.<a href="./src/resources/qbd/vendor-credits.ts">list</a>({ ...params }) -> VendorCreditsCursorPage</code>
- <code title="delete /quickbooks-desktop/vendor-credits/{id}">client.qbd.vendorCredits.<a href="./src/resources/qbd/vendor-credits.ts">delete</a>(id, { ...params }) -> VendorCreditDeleteResponse</code>

## Vendors

Types:

- <code><a href="./src/resources/qbd/vendors.ts">Vendor</a></code>

Methods:

- <code title="post /quickbooks-desktop/vendors">client.qbd.vendors.<a href="./src/resources/qbd/vendors.ts">create</a>({ ...params }) -> Vendor</code>
- <code title="get /quickbooks-desktop/vendors/{id}">client.qbd.vendors.<a href="./src/resources/qbd/vendors.ts">retrieve</a>(id, { ...params }) -> Vendor</code>
- <code title="post /quickbooks-desktop/vendors/{id}">client.qbd.vendors.<a href="./src/resources/qbd/vendors.ts">update</a>(id, { ...params }) -> Vendor</code>
- <code title="get /quickbooks-desktop/vendors">client.qbd.vendors.<a href="./src/resources/qbd/vendors.ts">list</a>({ ...params }) -> VendorsCursorPage</code>
