## Conductor SDK: QuickBooks Desktop API

Real-time JSON REST API for reading and writing QuickBooks Desktop objects (invoices, bills, customers, vendors, accounts, etc.) across multiple end-users.

---

## Top Operations

### End Users
```typescript
const users = await conductor.endUsers.list();          // → { data: EndUser[] }
const user = await conductor.endUsers.create({
  companyName: 'Acme Inc.',
  email: 'alice@acme.com',
  sourceId: 'your-internal-id',
});
// → { id: string, companyName, email, sourceId, objectType, createdAt }
```

### Invoices
```typescript
const inv = await conductor.qbd.invoices.create({
  conductorEndUserId: 'end_usr_xxx',
  customerId: '80000001-1234567890',
  transactionDate: '2024-10-01',
  lines: [{ itemId: '...', quantity: 2, rate: '50.00' }],
});
// → { id, refNumber, customer, subtotal, balanceRemaining, isPaid, lines, revisionNumber, ... }

const inv  = await conductor.qbd.invoices.retrieve(id, { conductorEndUserId });
const inv  = await conductor.qbd.invoices.update(id, { conductorEndUserId, revisionNumber, ...fields });
await conductor.qbd.invoices.void(id, { conductorEndUserId });
await conductor.qbd.invoices.delete(id, { conductorEndUserId });
```

### Customers / Vendors / Employees / Accounts
```typescript
const page = await conductor.qbd.customers.list({ conductorEndUserId, nameContains: 'acme' });
const cust = await conductor.qbd.customers.create({ conductorEndUserId, name: 'Acme' });
const cust = await conductor.qbd.customers.retrieve(id, { conductorEndUserId });
const cust = await conductor.qbd.customers.update(id, { conductorEndUserId, revisionNumber, ...fields });
// Same pattern for: conductor.qbd.vendors, conductor.qbd.employees, conductor.qbd.accounts
```

### Bills & Payments
```typescript
const bill = await conductor.qbd.bills.create({ conductorEndUserId, vendorId, transactionDate, expenseLines: [{ accountId, amount: '100.00' }] });
const pmt  = await conductor.qbd.receivePayments.create({ conductorEndUserId, customerId, transactionDate, totalAmount: '100.00', applyToTransactions: [{ transactionId: inv.id, paymentAmount: '100.00' }] });
await conductor.qbd.billCheckPayments.create({ conductorEndUserId, vendorId, bankAccountId, transactionDate, applyToTransactions: [{ transactionId: bill.id, paymentAmount: '100.00' }] });
```

### Reports
```typescript
const report = await conductor.qbd.reports.generalSummary({ conductorEndUserId, reportType: 'profit_and_loss_standard', reportDateFrom: '2026-01-01', reportDateTo: '2026-03-31' });
const report = await conductor.qbd.reports.aging({ conductorEndUserId, reportType: 'ap_aging_detail' });
const report = await conductor.qbd.reports.customDetail({ conductorEndUserId, includeColumns: ['date','amount'], summarizeRowsBy: 'account' });
// Also: budgetSummary(), customSummary(), generalDetail(), job(), payrollDetail(), payrollSummary(), time()
```

---

## Common Patterns

### Pagination (cursor-based)
```typescript
// Cursors expire within seconds, so a page loop must finish inside one execute call.
for await (const invoice of conductor.qbd.invoices.list({ conductorEndUserId, transactionDateFrom: '2026-01-01', limit: 150 })) {
  console.log(invoice.id);
}
// limit is at most 150. QuickBooks takes 2 to 5 seconds per page and reads every matching record even when limit is small, so filter by date, name, or ID.
// Split a big list into several execute calls by filter range, such as date ranges, never by cursor.
// One page: page.data: Item[], page.nextCursor: string | null, page.hasNextPage(), page.getNextPage()
```

### Requests
- QuickBooks Desktop handles one request at a time, and a computer that syncs several company files takes 20 to 40 seconds to switch between them. Send each request only after the previous one returns, for example in a loop, never as parallel or concurrent calls such as `Promise.all`. Put several IDs returned by an earlier call in one `ids` filter instead of one request per ID. Requests for the same company file that follow within 10 seconds reuse its open session. Finish all requests for one `conductorEndUserId` before starting the next.
- Filters such as `ids`, `refNumbers`, and `fullNames` match exactly. If any one value does not exist, the whole request fails with QuickBooks error 500. When unsure of a name or number, use `nameContains`, `nameStartsWith`, or `refNumberContains`, which return an empty list instead. Items are split across types (`inventoryItems`, `nonInventoryItems`, `serviceItems`, ...); search the type the user named before trying others.
- Do not call `conductor.qbd.healthCheck` before each request: a failing request returns the same connection error. Never pass a per-request `timeout` option.

### All QBD Resources Available
`invoices` · `bills` · `estimates` · `salesOrders` · `salesReceipts` · `purchaseOrders` · `checks` · `deposits` · `transfers` · `journalEntries` · `receivePayments` · `billCheckPayments` · `billCreditCardPayments` · `creditMemos` · `vendorCredits` · `creditCardCharges` · `transactions` · `customers` · `vendors` · `employees` · `accounts` · `inventoryItems` · `serviceItems` · `classes` · `paymentMethods` · `salesTaxItems` · `salesRepresentatives` · `timeTrackingActivities` · `inventoryAdjustments` · `reports` · and 30+ more

> **Note:** Every QBD method requires `conductorEndUserId`, which maps the request to one QuickBooks Desktop company file. Get it from `conductor.endUsers.list()`, again after any reconnect or key change; never guess it or reuse one from another connection.