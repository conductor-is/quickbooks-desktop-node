# QuickBooks Desktop Node.js MCP Server

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export CONDUCTOR_SECRET_KEY="My API Key"
npx -y conductor-node-mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "conductor_node_api": {
      "command": "npx",
      "args": ["-y", "conductor-node-mcp", "--client=claude", "--tools=dynamic"],
      "env": {
        "CONDUCTOR_SECRET_KEY": "My API Key"
      }
    }
  }
}
```

## Exposing endpoints to your MCP Client

There are two ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Bearer scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ------------------------ | ------------------------ | --------------- |
| `x-conductor-secret-key` | `apiKey` | BearerAuth |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "conductor_node_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Bearer <auth value>"
      }
    }
  }
}
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "conductor-node-mcp/server";

// import a specific tool
import createAuthSessions from "conductor-node-mcp/tools/auth-sessions/create-auth-sessions";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: conductor, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [createAuthSessions, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `auth_sessions`:

- `create_auth_sessions` (`write`): To launch the authentication flow, create an auth session and pass the returned session's `authFlowUrl` to the client for your end-user to visit in their browser. Demo: https://connect.conductor.is/qbd/demo

### Resource `end_users`:

- `create_end_users` (`write`): Creates an end-user.
- `retrieve_end_users` (`read`): Retrieves an end-user object.
- `list_end_users` (`read`): Returns a list of your end-users.
- `delete_end_users` (`write`): Permanently deletes an end-user object and all of its connections.
- `passthrough_end_users` (`write`): Sends a request directly to the specified integration connection (e.g., QuickBooks Desktop) on behalf of the end-user.

### Resource `qbd`:

- `health_check_qbd` (`read`): Checks whether the specified QuickBooks Desktop connection is active and can process requests end-to-end. This is useful for showing a "connection status" indicator in your app. If an error occurs, the typical Conductor error response will be returned. As with any request to QuickBooks Desktop, the health check may fail if the application is not running, the wrong company file is open, or if a modal dialog is open. Timeout is 60 seconds.

### Resource `qbd.account_tax_lines`:

- `list_qbd_account_tax_lines` (`read`): Returns a list of account tax lines. NOTE: QuickBooks Desktop does not support pagination for account tax lines; hence, there is no `cursor` parameter. Users typically have few account tax lines.

### Resource `qbd.accounts`:

- `create_qbd_accounts` (`write`): Creates a new financial account.
- `retrieve_qbd_accounts` (`read`): Retrieves an account by ID.
- `update_qbd_accounts` (`write`): Updates an existing financial account.
- `list_qbd_accounts` (`read`): Returns a list of accounts. NOTE: QuickBooks Desktop does not support pagination for accounts; hence, there is no `cursor` parameter. Users typically have few accounts.

### Resource `qbd.bill_check_payments`:

- `create_qbd_bill_check_payments` (`write`): Creates a new bill check payment.
- `retrieve_qbd_bill_check_payments` (`read`): Retrieves a bill check payment by ID.
- `update_qbd_bill_check_payments` (`write`): Updates an existing bill check payment.
- `list_qbd_bill_check_payments` (`read`): Returns a list of bill check payments. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_bill_check_payments` (`write`): Permanently deletes a a bill check payment. The deletion will fail if the bill check payment is currently in use or has any linked transactions that are in use.

### Resource `qbd.bill_credit_card_payments`:

- `create_qbd_bill_credit_card_payments` (`write`): Creates a new bill credit card payment.
- `retrieve_qbd_bill_credit_card_payments` (`read`): Retrieves a bill credit card payment by ID.
- `list_qbd_bill_credit_card_payments` (`read`): Returns a list of bill credit card payments. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_bill_credit_card_payments` (`write`): Permanently deletes a a bill credit card payment. The deletion will fail if the bill credit card payment is currently in use or has any linked transactions that are in use.

### Resource `qbd.bills`:

- `create_qbd_bills` (`write`): Creates a new bill.
- `retrieve_qbd_bills` (`read`): Retrieves a bill by ID.

  NOTE: The response automatically includes any linked transactions.

- `update_qbd_bills` (`write`): Updates an existing bill.
- `list_qbd_bills` (`read`): Returns a list of bills. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_bills` (`write`): Permanently deletes a a bill. The deletion will fail if the bill is currently in use or has any linked transactions that are in use.

### Resource `qbd.build_assemblies`:

- `create_qbd_build_assemblies` (`write`): Creates a new build assembly.
- `retrieve_qbd_build_assemblies` (`read`): Retrieves a build assembly by ID.
- `update_qbd_build_assemblies` (`write`): Updates an existing build assembly.
- `list_qbd_build_assemblies` (`read`): Returns a list of build assemblies. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_build_assemblies` (`write`): Permanently deletes a a build assembly. The deletion will fail if the build assembly is currently in use or has any linked transactions that are in use.

### Resource `qbd.checks`:

- `create_qbd_checks` (`write`): Creates a new check.
- `retrieve_qbd_checks` (`read`): Retrieves a check by ID.

  NOTE: The response automatically includes any linked transactions.

- `update_qbd_checks` (`write`): Updates an existing check.
- `list_qbd_checks` (`read`): Returns a list of checks. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_checks` (`write`): Permanently deletes a a check. The deletion will fail if the check is currently in use or has any linked transactions that are in use.

### Resource `qbd.classes`:

- `create_qbd_classes` (`write`): Creates a new class.
- `retrieve_qbd_classes` (`read`): Retrieves a class by ID.
- `update_qbd_classes` (`write`): Updates an existing class.
- `list_qbd_classes` (`read`): Returns a list of classes. NOTE: QuickBooks Desktop does not support pagination for classes; hence, there is no `cursor` parameter. Users typically have few classes.

### Resource `qbd.company`:

- `retrieve_qbd_company` (`read`): Returns detailed information about the connected QuickBooks company file, including company address, legal name, preferences, and subscribed services. Note that company information cannot be modified through the API, only through the QuickBooks Desktop user interface.

### Resource `qbd.credit_card_charges`:

- `create_qbd_credit_card_charges` (`write`): Creates a new credit card charge for the specified account.
- `retrieve_qbd_credit_card_charges` (`read`): Retrieves a credit card charge by ID.
- `update_qbd_credit_card_charges` (`write`): Updates an existing credit card charge.
- `list_qbd_credit_card_charges` (`read`): Returns a list of credit card charges. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_credit_card_charges` (`write`): Permanently deletes a a credit card charge. The deletion will fail if the credit card charge is currently in use or has any linked transactions that are in use.

### Resource `qbd.credit_card_credits`:

- `create_qbd_credit_card_credits` (`write`): Creates a new credit card credit for the specified account.
- `retrieve_qbd_credit_card_credits` (`read`): Retrieves a credit card credit by ID.
- `update_qbd_credit_card_credits` (`write`): Updates an existing credit card credit.
- `list_qbd_credit_card_credits` (`read`): Returns a list of credit card credits. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_credit_card_credits` (`write`): Permanently deletes a a credit card credit. The deletion will fail if the credit card credit is currently in use or has any linked transactions that are in use.

### Resource `qbd.credit_memos`:

- `create_qbd_credit_memos` (`write`): Creates a new credit memo.
- `retrieve_qbd_credit_memos` (`read`): Retrieves a credit memo by ID.

  NOTE: The response automatically includes any linked transactions.

- `update_qbd_credit_memos` (`write`): Updates an existing credit memo.
- `list_qbd_credit_memos` (`read`): Returns a list of credit memos. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_credit_memos` (`write`): Permanently deletes a a credit memo. The deletion will fail if the credit memo is currently in use or has any linked transactions that are in use.

### Resource `qbd.customers`:

- `create_qbd_customers` (`write`): Creates a new customer.
- `retrieve_qbd_customers` (`read`): Retrieves a customer by ID.
- `update_qbd_customers` (`write`): Updates an existing customer.
- `list_qbd_customers` (`read`): Returns a list of customers. Use the `cursor` parameter to paginate through the results.

### Resource `qbd.date_driven_terms`:

- `create_qbd_date_driven_terms` (`write`): Creates a new date-driven term.
- `retrieve_qbd_date_driven_terms` (`read`): Retrieves a date-driven term by ID.
- `list_qbd_date_driven_terms` (`read`): Returns a list of date-driven terms. NOTE: QuickBooks Desktop does not support pagination for date-driven terms; hence, there is no `cursor` parameter. Users typically have few date-driven terms.

### Resource `qbd.deleted_list_objects`:

- `list_qbd_deleted_list_objects` (`read`): Lists deleted non-transaction list-objects (e.g., customers, vendors, employees, items) from the last 90 days. Results are grouped by list-object type and ordered by actual delete time (ascending). For deleted transactions (e.g., invoices, bills, estimates), see the deleted-transactions endpoint.

### Resource `qbd.deleted_transactions`:

- `list_qbd_deleted_transactions` (`read`): Lists deleted transactions of the specified type(s) (e.g., invoice, bill, estimate) in the last 90 days. Results are grouped by transaction type and ordered by actual delete time (ascending). NOTE: For deleted non-transaction list-objects (e.g., customer, vendor, employee), see the deleted-list-objects endpoint.

### Resource `qbd.discount_items`:

- `create_qbd_discount_items` (`write`): Creates a new discount item.
- `retrieve_qbd_discount_items` (`read`): Retrieves a discount item by ID.
- `update_qbd_discount_items` (`write`): Updates an existing discount item.
- `list_qbd_discount_items` (`read`): Returns a list of discount items. Use the `cursor` parameter to paginate through the results.

### Resource `qbd.employees`:

- `create_qbd_employees` (`write`): Creates a new employee.
- `retrieve_qbd_employees` (`read`): Retrieves an employee by ID.
- `update_qbd_employees` (`write`): Updates an existing employee.
- `list_qbd_employees` (`read`): Returns a list of employees. NOTE: QuickBooks Desktop does not support pagination for employees; hence, there is no `cursor` parameter. Users typically have few employees.

### Resource `qbd.estimates`:

- `create_qbd_estimates` (`write`): Creates a new estimate.
- `retrieve_qbd_estimates` (`read`): Retrieves an estimate by ID.

  NOTE: The response automatically includes any linked transactions.

- `update_qbd_estimates` (`write`): Updates an existing estimate.
- `list_qbd_estimates` (`read`): Returns a list of estimates. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_estimates` (`write`): Permanently deletes a an estimate. The deletion will fail if the estimate is currently in use or has any linked transactions that are in use.

### Resource `qbd.inventory_adjustments`:

- `create_qbd_inventory_adjustments` (`write`): Creates a new inventory adjustment.
- `retrieve_qbd_inventory_adjustments` (`read`): Retrieves an inventory adjustment by ID.
- `update_qbd_inventory_adjustments` (`write`): Updates an existing inventory adjustment.
- `list_qbd_inventory_adjustments` (`read`): Returns a list of inventory adjustments. NOTE: QuickBooks Desktop does not support pagination for inventory adjustments; hence, there is no `cursor` parameter. Users typically have few inventory adjustments.
- `delete_qbd_inventory_adjustments` (`write`): Permanently deletes a an inventory adjustment. The deletion will fail if the inventory adjustment is currently in use or has any linked transactions that are in use.

### Resource `qbd.inventory_assembly_items`:

- `create_qbd_inventory_assembly_items` (`write`): Creates a new inventory assembly item.
- `retrieve_qbd_inventory_assembly_items` (`read`): Retrieves an inventory assembly item by ID.
- `update_qbd_inventory_assembly_items` (`write`): Updates an existing inventory assembly item.
- `list_qbd_inventory_assembly_items` (`read`): Returns a list of inventory assembly items. Use the `cursor` parameter to paginate through the results.

### Resource `qbd.inventory_items`:

- `create_qbd_inventory_items` (`write`): Creates a new inventory item.
- `retrieve_qbd_inventory_items` (`read`): Retrieves an inventory item by ID.
- `update_qbd_inventory_items` (`write`): Updates an existing inventory item.
- `list_qbd_inventory_items` (`read`): Returns a list of inventory items. Use the `cursor` parameter to paginate through the results.

### Resource `qbd.inventory_sites`:

- `create_qbd_inventory_sites` (`write`): Creates a new inventory site.
- `retrieve_qbd_inventory_sites` (`read`): Retrieves an inventory site by ID.
- `update_qbd_inventory_sites` (`write`): Updates an existing inventory site.
- `list_qbd_inventory_sites` (`read`): Returns a list of inventory sites. NOTE: QuickBooks Desktop does not support pagination for inventory sites; hence, there is no `cursor` parameter. Users typically have few inventory sites.

### Resource `qbd.invoices`:

- `create_qbd_invoices` (`write`): Creates a new invoice.
- `retrieve_qbd_invoices` (`read`): Retrieves an invoice by ID.

  NOTE: The response automatically includes any linked transactions.

- `update_qbd_invoices` (`write`): Updates an existing invoice.
- `list_qbd_invoices` (`read`): Returns a list of invoices. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_invoices` (`write`): Permanently deletes a an invoice. The deletion will fail if the invoice is currently in use or has any linked transactions that are in use.

### Resource `qbd.item_groups`:

- `create_qbd_item_groups` (`write`): Creates a new item group.
- `retrieve_qbd_item_groups` (`read`): Retrieves an item group by ID.
- `update_qbd_item_groups` (`write`): Updates an existing item group.
- `list_qbd_item_groups` (`read`): Returns a list of item groups. Use the `cursor` parameter to paginate through the results.

### Resource `qbd.item_receipts`:

- `create_qbd_item_receipts` (`write`): Creates a new item receipt.
- `retrieve_qbd_item_receipts` (`read`): Retrieves an item receipt by ID.

  NOTE: The response automatically includes any linked transactions.

- `update_qbd_item_receipts` (`write`): Updates an existing item receipt.
- `list_qbd_item_receipts` (`read`): Returns a list of item receipts. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_item_receipts` (`write`): Permanently deletes a an item receipt. The deletion will fail if the item receipt is currently in use or has any linked transactions that are in use.

### Resource `qbd.item_sites`:

- `retrieve_qbd_item_sites` (`read`): Retrieves an item site by ID.
- `list_qbd_item_sites` (`read`): Returns a list of item sites. Use the `cursor` parameter to paginate through the results.

### Resource `qbd.journal_entries`:

- `create_qbd_journal_entries` (`write`): Creates a new journal entry.
- `retrieve_qbd_journal_entries` (`read`): Retrieves a journal entry by ID.
- `update_qbd_journal_entries` (`write`): Updates an existing journal entry.
- `list_qbd_journal_entries` (`read`): Returns a list of journal entries. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_journal_entries` (`write`): Permanently deletes a a journal entry. The deletion will fail if the journal entry is currently in use or has any linked transactions that are in use.

### Resource `qbd.non_inventory_items`:

- `create_qbd_non_inventory_items` (`write`): Creates a new non-inventory item.
- `retrieve_qbd_non_inventory_items` (`read`): Retrieves a non-inventory item by ID.
- `update_qbd_non_inventory_items` (`write`): Updates an existing non-inventory item.
- `list_qbd_non_inventory_items` (`read`): Returns a list of non-inventory items. Use the `cursor` parameter to paginate through the results.

### Resource `qbd.other_charge_items`:

- `create_qbd_other_charge_items` (`write`): Creates a new other charge item.
- `retrieve_qbd_other_charge_items` (`read`): Retrieves an other charge item by ID.
- `update_qbd_other_charge_items` (`write`): Updates an existing other charge item.
- `list_qbd_other_charge_items` (`read`): Returns a list of other charge items. Use the `cursor` parameter to paginate through the results.

### Resource `qbd.other_names`:

- `create_qbd_other_names` (`write`): Creates a new other-name.
- `retrieve_qbd_other_names` (`read`): Retrieves an other-name by ID.
- `update_qbd_other_names` (`write`): Updates an existing other-name.
- `list_qbd_other_names` (`read`): Returns a list of other-names. NOTE: QuickBooks Desktop does not support pagination for other-names; hence, there is no `cursor` parameter. Users typically have few other-names.

### Resource `qbd.payment_methods`:

- `create_qbd_payment_methods` (`write`): Creates a new payment method.
- `retrieve_qbd_payment_methods` (`read`): Retrieves a payment method by ID.
- `list_qbd_payment_methods` (`read`): Returns a list of payment methods. NOTE: QuickBooks Desktop does not support pagination for payment methods; hence, there is no `cursor` parameter. Users typically have few payment methods.

### Resource `qbd.payroll_wage_items`:

- `create_qbd_payroll_wage_items` (`write`): Creates a new payroll wage item.
- `retrieve_qbd_payroll_wage_items` (`read`): Retrieves a payroll wage item by ID.
- `list_qbd_payroll_wage_items` (`read`): Returns a list of payroll wage items. Use the `cursor` parameter to paginate through the results.

### Resource `qbd.preferences`:

- `retrieve_qbd_preferences` (`read`): Returns the preferences that the QuickBooks administrator has set for all users of the connected company file. Note that preferences cannot be modified through the API, only through the QuickBooks Desktop user interface.

### Resource `qbd.price_levels`:

- `create_qbd_price_levels` (`write`): Creates a new price level.
- `retrieve_qbd_price_levels` (`read`): Retrieves a price level by ID.
- `update_qbd_price_levels` (`write`): Updates an existing price level.
- `list_qbd_price_levels` (`read`): Returns a list of price levels. NOTE: QuickBooks Desktop does not support pagination for price levels; hence, there is no `cursor` parameter. Users typically have few price levels.

### Resource `qbd.purchase_orders`:

- `create_qbd_purchase_orders` (`write`): Creates a new purchase order.
- `retrieve_qbd_purchase_orders` (`read`): Retrieves a purchase order by ID.

  NOTE: The response automatically includes any linked transactions.

- `update_qbd_purchase_orders` (`write`): Updates an existing purchase order.
- `list_qbd_purchase_orders` (`read`): Returns a list of purchase orders. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_purchase_orders` (`write`): Permanently deletes a a purchase order. The deletion will fail if the purchase order is currently in use or has any linked transactions that are in use.

### Resource `qbd.receive_payments`:

- `create_qbd_receive_payments` (`write`): Creates a new receive-payment.
- `retrieve_qbd_receive_payments` (`read`): Retrieves a receive-payment by ID.
- `update_qbd_receive_payments` (`write`): Updates an existing receive-payment.
- `list_qbd_receive_payments` (`read`): Returns a list of receive-payments. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_receive_payments` (`write`): Permanently deletes a a receive-payment. The deletion will fail if the receive-payment is currently in use or has any linked transactions that are in use.

### Resource `qbd.sales_orders`:

- `create_qbd_sales_orders` (`write`): Creates a new sales order.
- `retrieve_qbd_sales_orders` (`read`): Retrieves a sales order by ID.

  NOTE: The response automatically includes any linked transactions.

- `update_qbd_sales_orders` (`write`): Updates an existing sales order.
- `list_qbd_sales_orders` (`read`): Returns a list of sales orders. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_sales_orders` (`write`): Permanently deletes a a sales order. The deletion will fail if the sales order is currently in use or has any linked transactions that are in use.

### Resource `qbd.sales_receipts`:

- `create_qbd_sales_receipts` (`write`): Creates a new sales receipt.
- `retrieve_qbd_sales_receipts` (`read`): Retrieves a sales receipt by ID.
- `update_qbd_sales_receipts` (`write`): Updates an existing sales receipt.
- `list_qbd_sales_receipts` (`read`): Returns a list of sales receipts. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_sales_receipts` (`write`): Permanently deletes a a sales receipt. The deletion will fail if the sales receipt is currently in use or has any linked transactions that are in use.

### Resource `qbd.sales_representatives`:

- `create_qbd_sales_representatives` (`write`): Creates a new sales representative.
- `retrieve_qbd_sales_representatives` (`read`): Retrieves a sales representative by ID.
- `update_qbd_sales_representatives` (`write`): Updates an existing sales representative.
- `list_qbd_sales_representatives` (`read`): Returns a list of sales representatives. NOTE: QuickBooks Desktop does not support pagination for sales representatives; hence, there is no `cursor` parameter. Users typically have few sales representatives.

### Resource `qbd.sales_tax_codes`:

- `create_qbd_sales_tax_codes` (`write`): Creates a new sales-tax code.
- `retrieve_qbd_sales_tax_codes` (`read`): Retrieves a sales-tax code by ID.
- `update_qbd_sales_tax_codes` (`write`): Updates an existing sales-tax code.
- `list_qbd_sales_tax_codes` (`read`): Returns a list of sales-tax codes. NOTE: QuickBooks Desktop does not support pagination for sales-tax codes; hence, there is no `cursor` parameter. Users typically have few sales-tax codes.

### Resource `qbd.sales_tax_items`:

- `create_qbd_sales_tax_items` (`write`): Creates a new sales-tax item.
- `retrieve_qbd_sales_tax_items` (`read`): Retrieves a sales-tax item by ID.
- `update_qbd_sales_tax_items` (`write`): Updates an existing sales-tax item.
- `list_qbd_sales_tax_items` (`read`): Returns a list of sales-tax items. Use the `cursor` parameter to paginate through the results.

### Resource `qbd.service_items`:

- `create_qbd_service_items` (`write`): Creates a new service item.
- `retrieve_qbd_service_items` (`read`): Retrieves a service item by ID.
- `update_qbd_service_items` (`write`): Updates an existing service item.
- `list_qbd_service_items` (`read`): Returns a list of service items. Use the `cursor` parameter to paginate through the results.

### Resource `qbd.standard_terms`:

- `create_qbd_standard_terms` (`write`): Creates a new standard term.
- `retrieve_qbd_standard_terms` (`read`): Retrieves a standard term by ID.
- `list_qbd_standard_terms` (`read`): Returns a list of standard terms. NOTE: QuickBooks Desktop does not support pagination for standard terms; hence, there is no `cursor` parameter. Users typically have few standard terms.

### Resource `qbd.subtotal_items`:

- `create_qbd_subtotal_items` (`write`): Creates a new subtotal item.
- `retrieve_qbd_subtotal_items` (`read`): Retrieves a subtotal item by ID.
- `update_qbd_subtotal_items` (`write`): Updates an existing subtotal item.
- `list_qbd_subtotal_items` (`read`): Returns a list of subtotal items. Use the `cursor` parameter to paginate through the results.

### Resource `qbd.templates`:

- `list_qbd_templates` (`read`): Returns a list of templates. Use the `cursor` parameter to paginate through the results.

### Resource `qbd.time_tracking_activities`:

- `create_qbd_time_tracking_activities` (`write`): Creates a new time tracking activity.
- `retrieve_qbd_time_tracking_activities` (`read`): Retrieves a time tracking activity by ID.
- `update_qbd_time_tracking_activities` (`write`): Updates an existing time tracking activity.
- `list_qbd_time_tracking_activities` (`read`): Returns a list of time tracking activities. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_time_tracking_activities` (`write`): Permanently deletes a a time tracking activity. The deletion will fail if the time tracking activity is currently in use or has any linked transactions that are in use.

### Resource `qbd.transactions`:

- `retrieve_qbd_transactions` (`read`): Retrieves a transaction by ID.
- `list_qbd_transactions` (`read`): Searches across all transaction types. Unlike transaction-specific queries, this endpoint only returns fields common to all transaction types, such as ID, type, dates, account, and reference numbers. For more details specific to that transaction type, make a subsequent call to the relevant transaction-specific endpoint (such as invoices, bills, etc.). NOTE: This endpoint does not support time tracking activities.

### Resource `qbd.transfers`:

- `create_qbd_transfers` (`write`): Creates a new transfer.
- `retrieve_qbd_transfers` (`read`): Retrieves a transfer by ID.
- `update_qbd_transfers` (`write`): Updates an existing transfer.
- `list_qbd_transfers` (`read`): Returns a list of transfers. Use the `cursor` parameter to paginate through the results.

### Resource `qbd.unit_of_measure_sets`:

- `create_qbd_unit_of_measure_sets` (`write`): Creates a new unit-of-measure set.

  NOTE: The QuickBooks company file must have unit-of-measure enabled (either a single unit per item or multiple units per item). To support both configurations, prefix all UOM set names with "By the" (for example, "By the Barrel"); otherwise, the set may not appear in the QuickBooks UI when the company file is configured for a single unit per item.

- `retrieve_qbd_unit_of_measure_sets` (`read`): Retrieves an unit-of-measure set by ID.
- `list_qbd_unit_of_measure_sets` (`read`): Returns a list of unit-of-measure sets. NOTE: QuickBooks Desktop does not support pagination for unit-of-measure sets; hence, there is no `cursor` parameter. Users typically have few unit-of-measure sets.

### Resource `qbd.vendor_credits`:

- `create_qbd_vendor_credits` (`write`): Creates a new vendor credit.
- `retrieve_qbd_vendor_credits` (`read`): Retrieves a vendor credit by ID.

  NOTE: The response automatically includes any linked transactions.

- `update_qbd_vendor_credits` (`write`): Updates an existing vendor credit.
- `list_qbd_vendor_credits` (`read`): Returns a list of vendor credits. Use the `cursor` parameter to paginate through the results.
- `delete_qbd_vendor_credits` (`write`): Permanently deletes a a vendor credit. The deletion will fail if the vendor credit is currently in use or has any linked transactions that are in use.

### Resource `qbd.vendors`:

- `create_qbd_vendors` (`write`): Creates a new vendor.
- `retrieve_qbd_vendors` (`read`): Retrieves a vendor by ID.
- `update_qbd_vendors` (`write`): Updates an existing vendor.
- `list_qbd_vendors` (`read`): Returns a list of vendors. Use the `cursor` parameter to paginate through the results.
