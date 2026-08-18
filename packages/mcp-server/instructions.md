## Conductor SDK — QuickBooks Desktop API

Real-time JSON REST API for reading and writing QuickBooks Desktop objects (invoices, bills, customers, vendors, accounts, etc.) across multiple end-users.

---

## Top Operations

### End Users
```typescript
// Create end-user
const user = await conductor.endUsers.create({
  companyName: 'Acme Inc.',
  email: 'alice@acme.com',
  sourceId: 'your-internal-id',
});
// → { id: string, companyName, email, sourceId, objectType, createdAt }

// List / retrieve / delete
const users = await conductor.endUsers.list();          // → { data: EndUser[] }
const user  = await conductor.endUsers.retrieve(id);    // → EndUser
await conductor.endUsers.delete(id);                    // → { id, deleted: true }
```

### Invoices
```typescript
const inv = await conductor.qbd.invoices.create({
  conductorEndUserId: 'end_usr_xxx',
  customerId: '80000001-1234567890',
  transactionDate: '2024-10-01',
  lineItems: [{ itemId: '...', quantity: 2, rate: 50 }],
});
// → { id, customerId, totalAmount, lineItems, status, ... }

const inv  = await conductor.qbd.invoices.retrieve(id, { conductorEndUserId });
const inv  = await conductor.qbd.invoices.update(id, { conductorEndUserId, ...fields });
await conductor.qbd.invoices.void(id, { conductorEndUserId });
await conductor.qbd.invoices.delete(id, { conductorEndUserId });
```

### Customers / Vendors / Employees
```typescript
const page = await conductor.qbd.customers.list({ conductorEndUserId, limit: 100 });
const cust = await conductor.qbd.customers.create({ conductorEndUserId, name: 'Acme' });
const cust = await conductor.qbd.customers.retrieve(id, { conductorEndUserId });
const cust = await conductor.qbd.customers.update(id, { conductorEndUserId, ...fields });
// Same pattern for: conductor.qbd.vendors, conductor.qbd.employees
```

### Accounts
```typescript
const page = await conductor.qbd.accounts.list({ conductorEndUserId });
const acct = await conductor.qbd.accounts.create({ conductorEndUserId, name: 'My Account', accountType: 'income' });
// → { id, name, accountType, balance, currency, ... }
```

### Bills & Payments
```typescript
const bill = await conductor.qbd.bills.create({ conductorEndUserId, vendorId, transactionDate, lineItems });
const pmt  = await conductor.qbd.receivePayments.create({ conductorEndUserId, customerId, totalAmount });
await conductor.qbd.billCheckPayments.create({ conductorEndUserId, vendorId, checkNumber });
```

### Reports
```typescript
const report = await conductor.qbd.reports.aging({ conductorEndUserId, reportType: 'ap_aging_detail' });
const report = await conductor.qbd.reports.generalDetail({ conductorEndUserId, reportType: '1099_detail' });
const report = await conductor.qbd.reports.customDetail({ conductorEndUserId, includeColumns: ['date','amount'], summarizeRowsBy: 'account' });
// Also: budgetSummary(), customSummary(), generalSummary(), job(), payrollDetail(), payrollSummary(), time()
```

---

## Common Patterns

### Pagination (cursor-based)
```typescript
// Auto-iterate all items
for await (const invoice of conductor.qbd.invoices.list({ conductorEndUserId })) {
  console.log(invoice.id);
}

// Manual
let page = await conductor.qbd.invoices.list({ conductorEndUserId, limit: 100 });
while (true) {
  for (const inv of page.data) { /* ... */ }
  if (!page.hasNextPage()) break;
  page = await page.getNextPage();
}
// page.data: Item[], page.nextCursor: string | null
```

### Error Handling
```typescript
import Conductor from 'conductor-typescript';
try {
  await conductor.qbd.invoices.retrieve(id, { conductorEndUserId });
} catch (err) {
  if (err instanceof Conductor.APIError) {
    err.status;   // 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500+
    err.error;    // parsed JSON body
    err.headers;  // response headers
  }
}
// Specific classes: BadRequestError, AuthenticationError, PermissionDeniedError,
// NotFoundError, ConflictError, RateLimitError, InternalServerError, APIConnectionError
// Auto-retried (2x): 408, 409, 429, 5xx, connection errors
```

### Raw Response Access
```typescript
const { data, response } = await conductor.qbd.invoices.list({ conductorEndUserId }).withResponse();
response.headers.get('X-Request-Id');
```

### All QBD Resources Available
`invoices` · `bills` · `estimates` · `salesOrders` · `salesReceipts` · `purchaseOrders` · `checks` · `deposits` · `transfers` · `journalEntries` · `receivePayments` · `billCheckPayments` · `billCreditCardPayments` · `creditMemos` · `vendorCredits` · `creditCardCharges` · `customers` · `vendors` · `employees` · `accounts` · `items` · `inventoryItems` · `serviceItems` · `classes` · `paymentMethods` · `salesTaxItems` · `salesRepresentatives` · `timeTrackingActivities` · `inventoryAdjustments` · `reports` · and 30+ more

> **Note:** Every QBD method requires `conductorEndUserId` in params — it maps the request to the correct QuickBooks Desktop company file.