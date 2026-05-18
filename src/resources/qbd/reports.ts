// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Reports extends APIResource {
  /**
   * Retrieves an aging report.
   *
   * @example
   * ```ts
   * const report = await conductor.qbd.reports.aging({
   *   reportType: 'ap_aging_detail',
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  aging(params: ReportAgingParams, options?: RequestOptions): APIPromise<Report> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/reports/aging', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Retrieves a budget summary report.
   *
   * @example
   * ```ts
   * const report = await conductor.qbd.reports.budgetSummary({
   *   fiscalYear: 2026,
   *   reportType: 'balance_sheet_budget_overview',
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  budgetSummary(params: ReportBudgetSummaryParams, options?: RequestOptions): APIPromise<Report> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/reports/budget-summary', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Retrieves a custom detail report.
   *
   * @example
   * ```ts
   * const report = await conductor.qbd.reports.customDetail({
   *   includeColumns: ['date', 'transaction_type', 'amount'],
   *   summarizeRowsBy: 'account',
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  customDetail(params: ReportCustomDetailParams, options?: RequestOptions): APIPromise<Report> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/reports/custom-detail', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Retrieves a custom summary report.
   *
   * @example
   * ```ts
   * const report = await conductor.qbd.reports.customSummary({
   *   summarizeColumnsBy: 'month',
   *   summarizeRowsBy: 'account',
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  customSummary(params: ReportCustomSummaryParams, options?: RequestOptions): APIPromise<Report> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/reports/custom-summary', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Retrieves a general detail report.
   *
   * @example
   * ```ts
   * const report = await conductor.qbd.reports.generalDetail({
   *   reportType: '1099_detail',
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  generalDetail(params: ReportGeneralDetailParams, options?: RequestOptions): APIPromise<Report> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/reports/general-detail', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Retrieves a general summary report.
   *
   * @example
   * ```ts
   * const report = await conductor.qbd.reports.generalSummary({
   *   reportType: 'balance_sheet_by_class',
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  generalSummary(params: ReportGeneralSummaryParams, options?: RequestOptions): APIPromise<Report> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/reports/general-summary', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Retrieves a job report.
   *
   * @example
   * ```ts
   * const report = await conductor.qbd.reports.job({
   *   reportType: 'item_estimates_vs_actuals',
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  job(params: ReportJobParams, options?: RequestOptions): APIPromise<Report> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/reports/job', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Retrieves a payroll detail report.
   *
   * @example
   * ```ts
   * const report = await conductor.qbd.reports.payrollDetail({
   *   reportType: 'employee_state_taxes_detail',
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  payrollDetail(params: ReportPayrollDetailParams, options?: RequestOptions): APIPromise<Report> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/reports/payroll-detail', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Retrieves a payroll summary report.
   *
   * @example
   * ```ts
   * const report = await conductor.qbd.reports.payrollSummary({
   *   reportType: 'employee_earnings_summary',
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  payrollSummary(params: ReportPayrollSummaryParams, options?: RequestOptions): APIPromise<Report> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/reports/payroll-summary', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Retrieves a time report.
   *
   * @example
   * ```ts
   * const report = await conductor.qbd.reports.time({
   *   reportType: 'time_by_item',
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  time(params: ReportTimeParams, options?: RequestOptions): APIPromise<Report> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/reports/time', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }
}

export interface Report {
  /**
   * The accounting basis.
   */
  basis: 'accrual' | 'cash' | 'none' | null;

  /**
   * The report category.
   */
  category:
    | 'general_summary'
    | 'general_detail'
    | 'aging'
    | 'budget_summary'
    | 'job'
    | 'time'
    | 'custom_detail'
    | 'custom_summary'
    | 'payroll_detail'
    | 'payroll_summary';

  /**
   * The number of columns in the report.
   */
  columnCount: number | null;

  /**
   * The report columns, in display order. Use each column's `columnId` to match row
   * cells to columns.
   */
  columns: Array<Report.Column>;

  /**
   * The number of title rows for the report columns.
   */
  columnTitleRowCount: number | null;

  /**
   * The type of object. This value is always `"qbd_report"`.
   */
  objectType: 'qbd_report';

  /**
   * The report type.
   */
  reportType:
    | 'balance_sheet_by_class'
    | 'balance_sheet_previous_year_comparison'
    | 'balance_sheet_standard'
    | 'balance_sheet_summary'
    | 'customer_balance_summary'
    | 'expense_by_vendor_summary'
    | 'income_by_customer_summary'
    | 'inventory_stock_status_by_item'
    | 'inventory_stock_status_by_vendor'
    | 'income_tax_summary'
    | 'inventory_valuation_summary'
    | 'inventory_valuation_summary_by_site'
    | 'lot_number_in_stock_by_site'
    | 'physical_inventory_worksheet'
    | 'profit_and_loss_by_class'
    | 'profit_and_loss_by_job'
    | 'profit_and_loss_previous_year_comparison'
    | 'profit_and_loss_standard'
    | 'profit_and_loss_ytd_comparison'
    | 'purchase_by_item_summary'
    | 'purchase_by_vendor_summary'
    | 'sales_by_customer_summary'
    | 'sales_by_item_summary'
    | 'sales_by_sales_representative_summary'
    | 'sales_tax_liability'
    | 'sales_tax_revenue_summary'
    | 'serial_number_in_stock_by_site'
    | 'trial_balance'
    | 'vendor_balance_summary'
    | '1099_detail'
    | 'audit_trail'
    | 'balance_sheet_detail'
    | 'check_detail'
    | 'customer_balance_detail'
    | 'deposit_detail'
    | 'estimates_by_job'
    | 'expense_by_vendor_detail'
    | 'general_ledger'
    | 'income_by_customer_detail'
    | 'income_tax_detail'
    | 'inventory_valuation_detail'
    | 'job_progress_invoices_vs_estimates'
    | 'journal'
    | 'missing_checks'
    | 'open_invoices'
    | 'open_purchase_orders'
    | 'open_purchase_orders_by_job'
    | 'open_sales_order_by_customer'
    | 'open_sales_order_by_item'
    | 'pending_sales'
    | 'profit_and_loss_detail'
    | 'purchase_by_item_detail'
    | 'purchase_by_vendor_detail'
    | 'sales_by_customer_detail'
    | 'sales_by_item_detail'
    | 'sales_by_sales_representative_detail'
    | 'transaction_detail_by_account'
    | 'transaction_list_by_customer'
    | 'transaction_list_by_date'
    | 'transaction_list_by_vendor'
    | 'unpaid_bills_detail'
    | 'unbilled_costs_by_job'
    | 'vendor_balance_detail'
    | 'ap_aging_detail'
    | 'ap_aging_summary'
    | 'ar_aging_detail'
    | 'ar_aging_summary'
    | 'collections_report'
    | 'balance_sheet_budget_overview'
    | 'balance_sheet_budget_vs_actual'
    | 'profit_and_loss_budget_overview'
    | 'profit_and_loss_budget_performance'
    | 'profit_and_loss_budget_vs_actual'
    | 'item_estimates_vs_actuals'
    | 'item_profitability'
    | 'job_estimates_vs_actuals_detail'
    | 'job_estimates_vs_actuals_summary'
    | 'job_profitability_detail'
    | 'job_profitability_summary'
    | 'time_by_item'
    | 'time_by_job_detail'
    | 'time_by_job_summary'
    | 'time_by_name'
    | 'custom_transaction_detail'
    | 'custom_summary'
    | 'employee_state_taxes_detail'
    | 'payroll_item_detail'
    | 'payroll_review_detail'
    | 'payroll_transaction_detail'
    | 'payroll_transactions_by_payee'
    | 'employee_earnings_summary'
    | 'payroll_liability_balances'
    | 'payroll_summary';

  /**
   * The number of rows in the report.
   */
  rowCount: number | null;

  /**
   * The report rows, in display order. Rows can be text rows, detail data rows,
   * subtotal rows, or total rows.
   */
  rows: Array<
    Report.QbdReportTextRow | Report.QbdReportDataRow | Report.QbdReportSubtotalRow | Report.QbdReportTotalRow
  >;

  /**
   * The report subtitle.
   */
  subtitle: string | null;

  /**
   * The report title.
   */
  title: string | null;
}

export namespace Report {
  export interface Column {
    /**
     * The report column identifier. QuickBooks Desktop numbers columns from left to
     * right, starting at 1. Use this value to match row cells to columns.
     */
    columnId: string;

    /**
     * The report column type, describing the business meaning of the column, such as
     * `date`, `amount`, or `transaction_type`.
     */
    columnType: string;

    /**
     * The raw value data type for this column, such as `string`, `amount`, or `date`.
     * This is `null` if QuickBooks Desktop does not provide a data type.
     */
    dataType: string | null;

    /**
     * The column title cells. Reports can use multiple title rows.
     */
    titles: Array<Column.Title>;
  }

  export namespace Column {
    export interface Title {
      /**
       * The one-based title row number. Reports can have multiple title rows.
       */
      rowNumber: number;

      /**
       * The title text for this column title row. This is `null` if QuickBooks Desktop
       * does not provide one.
       */
      value: string | null;
    }
  }

  export interface QbdReportTextRow {
    /**
     * The row kind. This value is always `"text"`.
     */
    kind: 'text';

    /**
     * The one-based row number from the report.
     */
    rowNumber: number;

    /**
     * The text row value. Text rows are mainly used for headings. This is `null` if
     * QuickBooks Desktop does not provide one.
     */
    text: string | null;
  }

  export interface QbdReportDataRow {
    /**
     * The cells in this report row. Report rows are sparse, so cells appear only for
     * columns where QuickBooks Desktop returned a value.
     */
    cells: Array<QbdReportDataRow.Cell>;

    /**
     * The row kind. This value is always `"data"`.
     */
    kind: 'data';

    /**
     * The row-level descriptor provided by QuickBooks Desktop. This is separate from
     * the row's table values in `cells` and is `null` when QuickBooks Desktop does not
     * provide one.
     */
    rowDescriptor: QbdReportDataRow.RowDescriptor | null;

    /**
     * The one-based row number from the report.
     */
    rowNumber: number;
  }

  export namespace QbdReportDataRow {
    export interface Cell {
      /**
       * The column identifier for this cell. This matches a column's `columnId` and
       * refers to the column's left-to-right position in the report.
       */
      columnId: string;

      /**
       * The value data type for this cell. If QuickBooks Desktop omits the cell data
       * type, this uses the matching column's `dataType` when available.
       */
      dataType: string | null;

      /**
       * The cell value as a QuickBooks Desktop-formatted string. This is `null` if
       * QuickBooks Desktop does not provide a value for the cell.
       */
      value: string | null;
    }

    /**
     * The row-level descriptor provided by QuickBooks Desktop. This is separate from
     * the row's table values in `cells` and is `null` when QuickBooks Desktop does not
     * provide one.
     */
    export interface RowDescriptor {
      /**
       * The kind of row-level descriptor, such as `account`, `customer`, or `vendor`.
       * This is `null` if QuickBooks Desktop does not provide one.
       */
      type: string | null;

      /**
       * The row-level descriptor value. This can differ from the first cell value and is
       * `null` if QuickBooks Desktop does not provide one.
       */
      value: string | null;
    }
  }

  export interface QbdReportSubtotalRow {
    /**
     * The cells in this report row. Report rows are sparse, so cells appear only for
     * columns where QuickBooks Desktop returned a value.
     */
    cells: Array<QbdReportSubtotalRow.Cell>;

    /**
     * The row kind. This value is always `"subtotal"`.
     */
    kind: 'subtotal';

    /**
     * The row-level descriptor provided by QuickBooks Desktop. This is separate from
     * the row's table values in `cells` and is `null` when QuickBooks Desktop does not
     * provide one.
     */
    rowDescriptor: QbdReportSubtotalRow.RowDescriptor | null;

    /**
     * The one-based row number from the report.
     */
    rowNumber: number;
  }

  export namespace QbdReportSubtotalRow {
    export interface Cell {
      /**
       * The column identifier for this cell. This matches a column's `columnId` and
       * refers to the column's left-to-right position in the report.
       */
      columnId: string;

      /**
       * The value data type for this cell. If QuickBooks Desktop omits the cell data
       * type, this uses the matching column's `dataType` when available.
       */
      dataType: string | null;

      /**
       * The cell value as a QuickBooks Desktop-formatted string. This is `null` if
       * QuickBooks Desktop does not provide a value for the cell.
       */
      value: string | null;
    }

    /**
     * The row-level descriptor provided by QuickBooks Desktop. This is separate from
     * the row's table values in `cells` and is `null` when QuickBooks Desktop does not
     * provide one.
     */
    export interface RowDescriptor {
      /**
       * The kind of row-level descriptor, such as `account`, `customer`, or `vendor`.
       * This is `null` if QuickBooks Desktop does not provide one.
       */
      type: string | null;

      /**
       * The row-level descriptor value. This can differ from the first cell value and is
       * `null` if QuickBooks Desktop does not provide one.
       */
      value: string | null;
    }
  }

  export interface QbdReportTotalRow {
    /**
     * The cells in this report row. Report rows are sparse, so cells appear only for
     * columns where QuickBooks Desktop returned a value.
     */
    cells: Array<QbdReportTotalRow.Cell>;

    /**
     * The row kind. This value is always `"total"`.
     */
    kind: 'total';

    /**
     * The row-level descriptor provided by QuickBooks Desktop. This is separate from
     * the row's table values in `cells` and is `null` when QuickBooks Desktop does not
     * provide one.
     */
    rowDescriptor: QbdReportTotalRow.RowDescriptor | null;

    /**
     * The one-based row number from the report.
     */
    rowNumber: number;
  }

  export namespace QbdReportTotalRow {
    export interface Cell {
      /**
       * The column identifier for this cell. This matches a column's `columnId` and
       * refers to the column's left-to-right position in the report.
       */
      columnId: string;

      /**
       * The value data type for this cell. If QuickBooks Desktop omits the cell data
       * type, this uses the matching column's `dataType` when available.
       */
      dataType: string | null;

      /**
       * The cell value as a QuickBooks Desktop-formatted string. This is `null` if
       * QuickBooks Desktop does not provide a value for the cell.
       */
      value: string | null;
    }

    /**
     * The row-level descriptor provided by QuickBooks Desktop. This is separate from
     * the row's table values in `cells` and is `null` when QuickBooks Desktop does not
     * provide one.
     */
    export interface RowDescriptor {
      /**
       * The kind of row-level descriptor, such as `account`, `customer`, or `vendor`.
       * This is `null` if QuickBooks Desktop does not provide one.
       */
      type: string | null;

      /**
       * The row-level descriptor value. This can differ from the first cell value and is
       * `null` if QuickBooks Desktop does not provide one.
       */
      value: string | null;
    }
  }
}

export interface ReportAgingParams {
  /**
   * Query param: The aging report type to retrieve.
   */
  reportType:
    | 'ap_aging_detail'
    | 'ap_aging_summary'
    | 'ar_aging_detail'
    | 'ar_aging_summary'
    | 'collections_report';

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for report data by account `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple accounts. Use only one account filter per
   * request.
   */
  accountFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned account IDs. Repeat
   * this query parameter to include multiple accounts. Use only one account filter
   * per request.
   */
  accountIds?: Array<string>;

  /**
   * Query param: Whether to include all accounts or only accounts in use.
   */
  accountsToInclude?: 'all' | 'in_use';

  /**
   * Query param: Filter for report data by account type. Use only one account filter
   * per request.
   */
  accountType?:
    | 'accounts_payable'
    | 'accounts_receivable'
    | 'allowed_for_1099'
    | 'ap_and_sales_tax'
    | 'ap_or_credit_card'
    | 'ar_and_ap'
    | 'asset'
    | 'balance_sheet'
    | 'bank'
    | 'bank_and_ar_and_ap_and_uf'
    | 'bank_and_uf'
    | 'cost_of_sales'
    | 'credit_card'
    | 'current_asset'
    | 'current_asset_and_expense'
    | 'current_liability'
    | 'equity'
    | 'equity_and_income_and_expense'
    | 'expense_and_other_expense'
    | 'fixed_asset'
    | 'income_and_expense'
    | 'income_and_other_income'
    | 'liability'
    | 'liability_and_equity'
    | 'long_term_liability'
    | 'non_posting'
    | 'ordinary_expense'
    | 'ordinary_income'
    | 'ordinary_income_and_cogs'
    | 'ordinary_income_and_expense'
    | 'other_asset'
    | 'other_current_asset'
    | 'other_current_liability'
    | 'other_expense'
    | 'other_income'
    | 'other_income_or_expense';

  /**
   * Query param: The date through which QuickBooks Desktop calculates aging
   * information.
   */
  agingAsOf?: 'report_end_date' | 'today';

  /**
   * Query param: Filter for report data by class `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned class IDs. Repeat
   * this query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classIds?: Array<string>;

  /**
   * Query param: The report detail level to include. Use `all` for all rows,
   * `all_except_summary` to omit summary rows, or `summary_only` to return only
   * summary rows.
   */
  detailLevel?: 'all' | 'all_except_summary' | 'summary_only';

  /**
   * Query param: Filter for report data by entity `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple entities. Use only one entity filter per
   * request.
   */
  entityFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned entity IDs. Repeat
   * this query parameter to include multiple entities. Use only one entity filter
   * per request.
   */
  entityIds?: Array<string>;

  /**
   * Query param: Filter for report data by entity type, such as customer, vendor,
   * employee, or other name. Use only one entity filter per request.
   */
  entityType?: 'customer' | 'employee' | 'other_name' | 'vendor';

  /**
   * Query param: The specific report columns to include, by column type. Repeat this
   * query parameter to request multiple columns. When this parameter is present,
   * QuickBooks Desktop omits its default report columns unless you include them
   * here.
   */
  includeColumns?: Array<
    | 'account'
    | 'aging'
    | 'amount'
    | 'amount_difference'
    | 'average_cost'
    | 'billed_date'
    | 'billing_status'
    | 'calculated_amount'
    | 'class'
    | 'cleared_status'
    | 'cost_price'
    | 'credit'
    | 'currency'
    | 'date'
    | 'debit'
    | 'delivery_date'
    | 'due_date'
    | 'estimate_active'
    | 'exchange_rate'
    | 'shipment_origin'
    | 'income_subject_to_tax'
    | 'invoiced'
    | 'item'
    | 'description'
    | 'last_modified_by'
    | 'latest_or_prior_state'
    | 'memo'
    | 'updated_at'
    | 'name'
    | 'name_account_number'
    | 'name_address'
    | 'name_city'
    | 'name_contact'
    | 'name_email'
    | 'name_fax'
    | 'name_phone'
    | 'name_state'
    | 'name_postal_code'
    | 'open_balance'
    | 'original_amount'
    | 'paid_amount'
    | 'paid_status'
    | 'paid_through_date'
    | 'payment_method'
    | 'payroll_item'
    | 'purchase_order_number'
    | 'print_status'
    | 'progress_amount'
    | 'progress_percent'
    | 'quantity'
    | 'quantity_available'
    | 'quantity_on_hand'
    | 'quantity_on_sales_order'
    | 'received_quantity'
    | 'ref_number'
    | 'running_balance'
    | 'sales_representative'
    | 'sales_tax_code'
    | 'serial_or_lot_number'
    | 'shipping_date'
    | 'shipping_method'
    | 'source_name'
    | 'split_account'
    | 'ssn_or_tax_identification_number'
    | 'tax_line'
    | 'tax_table_version'
    | 'terms'
    | 'transaction_id'
    | 'transaction_number'
    | 'transaction_type'
    | 'unit_price'
    | 'user_edit'
    | 'value_on_hand'
    | 'wage_base'
    | 'wage_base_tips'
  >;

  /**
   * Query param: Filter for report data by item `fullName` values, case-insensitive.
   * A `fullName` is a fully-qualified QuickBooks name formed by joining parent
   * object names with the object's `name` using colons. Repeat this query parameter
   * to include multiple items. Use only one item filter per request.
   */
  itemFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned item IDs. Repeat this
   * query parameter to include multiple items. Use only one item filter per request.
   */
  itemIds?: Array<string>;

  /**
   * Query param: Filter for report data by item type. Use only one item filter per
   * request.
   */
  itemType?:
    | 'all_except_fixed_asset'
    | 'assembly'
    | 'discount'
    | 'fixed_asset'
    | 'inventory'
    | 'inventory_and_assembly'
    | 'non_inventory'
    | 'other_charge'
    | 'payment'
    | 'sales'
    | 'sales_tax'
    | 'service';

  /**
   * Query param: Filter for report data that is posting, non-posting, or either.
   * Posting status refers to whether QuickBooks records the transaction in an
   * account register.
   */
  postingStatus?: 'either' | 'non_posting' | 'posting';

  /**
   * Query param: Filter for report data dated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateFrom?: string;

  /**
   * Query param: A QuickBooks Desktop relative date macro. This cannot be combined
   * with `reportDateFrom` or `reportDateTo`.
   */
  reportDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';

  /**
   * Query param: Filter for report data dated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateTo?: string;

  /**
   * Query param: Filter for report data by transaction type(s). Repeat this query
   * parameter to include multiple transaction types.
   */
  transactionTypes?: Array<
    | 'all'
    | 'ar_refund_credit_card'
    | 'bill'
    | 'bill_payment_check'
    | 'bill_payment_credit_card'
    | 'build_assembly'
    | 'charge'
    | 'check'
    | 'credit_card_charge'
    | 'credit_card_credit'
    | 'credit_memo'
    | 'deposit'
    | 'estimate'
    | 'inventory_adjustment'
    | 'invoice'
    | 'item_receipt'
    | 'journal_entry'
    | 'liability_adjustment'
    | 'paycheck'
    | 'payroll_liability_check'
    | 'purchase_order'
    | 'receive_payment'
    | 'sales_order'
    | 'sales_receipt'
    | 'sales_tax_payment_check'
    | 'transfer'
    | 'vendor_credit'
    | 'ytd_adjustment'
  >;

  /**
   * Query param: Filter for report data updated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for report data updated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedBefore?: string;

  /**
   * Query param: A QuickBooks Desktop relative updated-date macro. This cannot be
   * combined with `updatedAfter` or `updatedBefore`.
   */
  updatedDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';
}

export interface ReportBudgetSummaryParams {
  /**
   * Query param: The fiscal year of the QuickBooks budget. QuickBooks Desktop
   * returns the full fiscal year for prior years and year-to-date data for the
   * current fiscal year.
   */
  fiscalYear: number;

  /**
   * Query param: The budget summary report type to retrieve.
   */
  reportType:
    | 'balance_sheet_budget_overview'
    | 'balance_sheet_budget_vs_actual'
    | 'profit_and_loss_budget_overview'
    | 'profit_and_loss_budget_performance'
    | 'profit_and_loss_budget_vs_actual';

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: What the budget covers, such as accounts, accounts and classes, or
   * accounts and customers.
   */
  budgetCriterion?: 'accounts' | 'accounts_and_classes' | 'accounts_and_customers';

  /**
   * Query param: Filter for report data by class `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned class IDs. Repeat
   * this query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classIds?: Array<string>;

  /**
   * Query param: Filter for report data dated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateFrom?: string;

  /**
   * Query param: A QuickBooks Desktop relative date macro. This cannot be combined
   * with `reportDateFrom` or `reportDateTo`.
   */
  reportDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';

  /**
   * Query param: Filter for report data dated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateTo?: string;

  /**
   * Query param: How QuickBooks Desktop calculates budget report columns and labels
   * column headers.
   */
  summarizeColumnsBy?: 'class' | 'customer' | 'date';

  /**
   * Query param: How QuickBooks Desktop labels budget report rows.
   */
  summarizeRowsBy?: 'account' | 'class' | 'customer';
}

export interface ReportCustomDetailParams {
  /**
   * Query param: The specific report columns to include, by column type. Repeat this
   * query parameter to request multiple columns. When this parameter is present,
   * QuickBooks Desktop omits its default report columns unless you include them
   * here.
   */
  includeColumns: Array<
    | 'account'
    | 'aging'
    | 'amount'
    | 'amount_difference'
    | 'average_cost'
    | 'billed_date'
    | 'billing_status'
    | 'calculated_amount'
    | 'class'
    | 'cleared_status'
    | 'cost_price'
    | 'credit'
    | 'currency'
    | 'date'
    | 'debit'
    | 'delivery_date'
    | 'due_date'
    | 'estimate_active'
    | 'exchange_rate'
    | 'shipment_origin'
    | 'income_subject_to_tax'
    | 'invoiced'
    | 'item'
    | 'description'
    | 'last_modified_by'
    | 'latest_or_prior_state'
    | 'memo'
    | 'updated_at'
    | 'name'
    | 'name_account_number'
    | 'name_address'
    | 'name_city'
    | 'name_contact'
    | 'name_email'
    | 'name_fax'
    | 'name_phone'
    | 'name_state'
    | 'name_postal_code'
    | 'open_balance'
    | 'original_amount'
    | 'paid_amount'
    | 'paid_status'
    | 'paid_through_date'
    | 'payment_method'
    | 'payroll_item'
    | 'purchase_order_number'
    | 'print_status'
    | 'progress_amount'
    | 'progress_percent'
    | 'quantity'
    | 'quantity_available'
    | 'quantity_on_hand'
    | 'quantity_on_sales_order'
    | 'received_quantity'
    | 'ref_number'
    | 'running_balance'
    | 'sales_representative'
    | 'sales_tax_code'
    | 'serial_or_lot_number'
    | 'shipping_date'
    | 'shipping_method'
    | 'source_name'
    | 'split_account'
    | 'ssn_or_tax_identification_number'
    | 'tax_line'
    | 'tax_table_version'
    | 'terms'
    | 'transaction_id'
    | 'transaction_number'
    | 'transaction_type'
    | 'unit_price'
    | 'user_edit'
    | 'value_on_hand'
    | 'wage_base'
    | 'wage_base_tips'
  >;

  /**
   * Query param: How QuickBooks Desktop calculates report data and labels report
   * rows.
   */
  summarizeRowsBy:
    | 'account'
    | 'balance_sheet'
    | 'class'
    | 'customer'
    | 'customer_type'
    | 'day'
    | 'employee'
    | 'four_week'
    | 'half_month'
    | 'income_statement'
    | 'item_detail'
    | 'item_type'
    | 'month'
    | 'payee'
    | 'payment_method'
    | 'payroll_item_detail'
    | 'payroll_ytd_detail'
    | 'quarter'
    | 'sales_representative'
    | 'sales_tax_code'
    | 'shipping_method'
    | 'tax_line'
    | 'terms'
    | 'total_only'
    | 'two_week'
    | 'vendor'
    | 'vendor_type'
    | 'week'
    | 'year';

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for report data by account `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple accounts. Use only one account filter per
   * request.
   */
  accountFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned account IDs. Repeat
   * this query parameter to include multiple accounts. Use only one account filter
   * per request.
   */
  accountIds?: Array<string>;

  /**
   * Query param: Whether to include all accounts or only accounts in use.
   */
  accountsToInclude?: 'all' | 'in_use';

  /**
   * Query param: Filter for report data by account type. Use only one account filter
   * per request.
   */
  accountType?:
    | 'accounts_payable'
    | 'accounts_receivable'
    | 'allowed_for_1099'
    | 'ap_and_sales_tax'
    | 'ap_or_credit_card'
    | 'ar_and_ap'
    | 'asset'
    | 'balance_sheet'
    | 'bank'
    | 'bank_and_ar_and_ap_and_uf'
    | 'bank_and_uf'
    | 'cost_of_sales'
    | 'credit_card'
    | 'current_asset'
    | 'current_asset_and_expense'
    | 'current_liability'
    | 'equity'
    | 'equity_and_income_and_expense'
    | 'expense_and_other_expense'
    | 'fixed_asset'
    | 'income_and_expense'
    | 'income_and_other_income'
    | 'liability'
    | 'liability_and_equity'
    | 'long_term_liability'
    | 'non_posting'
    | 'ordinary_expense'
    | 'ordinary_income'
    | 'ordinary_income_and_cogs'
    | 'ordinary_income_and_expense'
    | 'other_asset'
    | 'other_current_asset'
    | 'other_current_liability'
    | 'other_expense'
    | 'other_income'
    | 'other_income_or_expense';

  /**
   * Query param: The accounting basis to use for the report. Use `cash` to base
   * income and expenses on when money changes hands, `accrual` to base them on
   * invoice and bill dates, or `none` to use the QuickBooks Desktop default for the
   * report.
   */
  basis?: 'accrual' | 'cash' | 'none';

  /**
   * Query param: Filter for report data by class `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned class IDs. Repeat
   * this query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classIds?: Array<string>;

  /**
   * Query param: The report detail level to include. Use `all` for all rows,
   * `all_except_summary` to omit summary rows, or `summary_only` to return only
   * summary rows.
   */
  detailLevel?: 'all' | 'all_except_summary' | 'summary_only';

  /**
   * Query param: Filter for report data by entity `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple entities. Use only one entity filter per
   * request.
   */
  entityFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned entity IDs. Repeat
   * this query parameter to include multiple entities. Use only one entity filter
   * per request.
   */
  entityIds?: Array<string>;

  /**
   * Query param: Filter for report data by entity type, such as customer, vendor,
   * employee, or other name. Use only one entity filter per request.
   */
  entityType?: 'customer' | 'employee' | 'other_name' | 'vendor';

  /**
   * Query param: Filter for report data by item `fullName` values, case-insensitive.
   * A `fullName` is a fully-qualified QuickBooks name formed by joining parent
   * object names with the object's `name` using colons. Repeat this query parameter
   * to include multiple items. Use only one item filter per request.
   */
  itemFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned item IDs. Repeat this
   * query parameter to include multiple items. Use only one item filter per request.
   */
  itemIds?: Array<string>;

  /**
   * Query param: Filter for report data by item type. Use only one item filter per
   * request.
   */
  itemType?:
    | 'all_except_fixed_asset'
    | 'assembly'
    | 'discount'
    | 'fixed_asset'
    | 'inventory'
    | 'inventory_and_assembly'
    | 'non_inventory'
    | 'other_charge'
    | 'payment'
    | 'sales'
    | 'sales_tax'
    | 'service';

  /**
   * Query param: The date through which QuickBooks Desktop calculates open balance
   * information.
   */
  openBalanceAsOf?: 'report_end_date' | 'today';

  /**
   * Query param: Filter for report data that is posting, non-posting, or either.
   * Posting status refers to whether QuickBooks records the transaction in an
   * account register.
   */
  postingStatus?: 'either' | 'non_posting' | 'posting';

  /**
   * Query param: Filter for report data dated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateFrom?: string;

  /**
   * Query param: A QuickBooks Desktop relative date macro. This cannot be combined
   * with `reportDateFrom` or `reportDateTo`.
   */
  reportDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';

  /**
   * Query param: Filter for report data dated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateTo?: string;

  /**
   * Query param: The custom detail report type to retrieve. This endpoint supports
   * only `custom_transaction_detail`, so this parameter is optional and defaults to
   * `custom_transaction_detail`.
   */
  reportType?: 'custom_transaction_detail';

  /**
   * Query param: Filter for report data by transaction type(s). Repeat this query
   * parameter to include multiple transaction types.
   */
  transactionTypes?: Array<
    | 'all'
    | 'ar_refund_credit_card'
    | 'bill'
    | 'bill_payment_check'
    | 'bill_payment_credit_card'
    | 'build_assembly'
    | 'charge'
    | 'check'
    | 'credit_card_charge'
    | 'credit_card_credit'
    | 'credit_memo'
    | 'deposit'
    | 'estimate'
    | 'inventory_adjustment'
    | 'invoice'
    | 'item_receipt'
    | 'journal_entry'
    | 'liability_adjustment'
    | 'paycheck'
    | 'payroll_liability_check'
    | 'purchase_order'
    | 'receive_payment'
    | 'sales_order'
    | 'sales_receipt'
    | 'sales_tax_payment_check'
    | 'transfer'
    | 'vendor_credit'
    | 'ytd_adjustment'
  >;

  /**
   * Query param: Filter for report data updated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for report data updated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedBefore?: string;

  /**
   * Query param: A QuickBooks Desktop relative updated-date macro. This cannot be
   * combined with `updatedAfter` or `updatedBefore`.
   */
  updatedDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';
}

export interface ReportCustomSummaryParams {
  /**
   * Query param: How QuickBooks Desktop calculates report data and labels report
   * column headers.
   */
  summarizeColumnsBy:
    | 'account'
    | 'balance_sheet'
    | 'class'
    | 'customer'
    | 'customer_type'
    | 'day'
    | 'employee'
    | 'four_week'
    | 'half_month'
    | 'income_statement'
    | 'item_detail'
    | 'item_type'
    | 'month'
    | 'payee'
    | 'payment_method'
    | 'payroll_item_detail'
    | 'payroll_ytd_detail'
    | 'quarter'
    | 'sales_representative'
    | 'sales_tax_code'
    | 'shipping_method'
    | 'terms'
    | 'total_only'
    | 'two_week'
    | 'vendor'
    | 'vendor_type'
    | 'week'
    | 'year';

  /**
   * Query param: How QuickBooks Desktop calculates report data and labels report
   * rows.
   */
  summarizeRowsBy:
    | 'account'
    | 'balance_sheet'
    | 'class'
    | 'customer'
    | 'customer_type'
    | 'day'
    | 'employee'
    | 'four_week'
    | 'half_month'
    | 'income_statement'
    | 'item_detail'
    | 'item_type'
    | 'month'
    | 'payee'
    | 'payment_method'
    | 'payroll_item_detail'
    | 'payroll_ytd_detail'
    | 'quarter'
    | 'sales_representative'
    | 'sales_tax_code'
    | 'shipping_method'
    | 'tax_line'
    | 'terms'
    | 'total_only'
    | 'two_week'
    | 'vendor'
    | 'vendor_type'
    | 'week'
    | 'year';

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for report data by account `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple accounts. Use only one account filter per
   * request.
   */
  accountFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned account IDs. Repeat
   * this query parameter to include multiple accounts. Use only one account filter
   * per request.
   */
  accountIds?: Array<string>;

  /**
   * Query param: Filter for report data by account type. Use only one account filter
   * per request.
   */
  accountType?:
    | 'accounts_payable'
    | 'accounts_receivable'
    | 'allowed_for_1099'
    | 'ap_and_sales_tax'
    | 'ap_or_credit_card'
    | 'ar_and_ap'
    | 'asset'
    | 'balance_sheet'
    | 'bank'
    | 'bank_and_ar_and_ap_and_uf'
    | 'bank_and_uf'
    | 'cost_of_sales'
    | 'credit_card'
    | 'current_asset'
    | 'current_asset_and_expense'
    | 'current_liability'
    | 'equity'
    | 'equity_and_income_and_expense'
    | 'expense_and_other_expense'
    | 'fixed_asset'
    | 'income_and_expense'
    | 'income_and_other_income'
    | 'liability'
    | 'liability_and_equity'
    | 'long_term_liability'
    | 'non_posting'
    | 'ordinary_expense'
    | 'ordinary_income'
    | 'ordinary_income_and_cogs'
    | 'ordinary_income_and_expense'
    | 'other_asset'
    | 'other_current_asset'
    | 'other_current_liability'
    | 'other_expense'
    | 'other_income'
    | 'other_income_or_expense';

  /**
   * Query param: The accounting basis to use for the report. Use `cash` to base
   * income and expenses on when money changes hands, `accrual` to base them on
   * invoice and bill dates, or `none` to use the QuickBooks Desktop default for the
   * report.
   */
  basis?: 'accrual' | 'cash' | 'none';

  /**
   * Query param: Filter for report data by class `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned class IDs. Repeat
   * this query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classIds?: Array<string>;

  /**
   * Query param: Filters which report columns QuickBooks returns. Use `active_only`
   * for active columns, `non_zero` for columns with non-zero values, or `all` for
   * all columns.
   */
  columnsToReturn?: 'active_only' | 'non_zero' | 'all';

  /**
   * Query param: The report detail level to include. Use `all` for all rows,
   * `all_except_summary` to omit summary rows, or `summary_only` to return only
   * summary rows.
   */
  detailLevel?: 'all' | 'all_except_summary' | 'summary_only';

  /**
   * Query param: Filter for report data by entity `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple entities. Use only one entity filter per
   * request.
   */
  entityFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned entity IDs. Repeat
   * this query parameter to include multiple entities. Use only one entity filter
   * per request.
   */
  entityIds?: Array<string>;

  /**
   * Query param: Filter for report data by entity type, such as customer, vendor,
   * employee, or other name. Use only one entity filter per request.
   */
  entityType?: 'customer' | 'employee' | 'other_name' | 'vendor';

  /**
   * Query param: Whether to include subcolumns in the report. QuickBooks Desktop may
   * still omit subcolumns that it can easily compute from other returned values.
   */
  includeSubcolumns?: boolean;

  /**
   * Query param: Filter for report data by item `fullName` values, case-insensitive.
   * A `fullName` is a fully-qualified QuickBooks name formed by joining parent
   * object names with the object's `name` using colons. Repeat this query parameter
   * to include multiple items. Use only one item filter per request.
   */
  itemFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned item IDs. Repeat this
   * query parameter to include multiple items. Use only one item filter per request.
   */
  itemIds?: Array<string>;

  /**
   * Query param: Filter for report data by item type. Use only one item filter per
   * request.
   */
  itemType?:
    | 'all_except_fixed_asset'
    | 'assembly'
    | 'discount'
    | 'fixed_asset'
    | 'inventory'
    | 'inventory_and_assembly'
    | 'non_inventory'
    | 'other_charge'
    | 'payment'
    | 'sales'
    | 'sales_tax'
    | 'service';

  /**
   * Query param: Filter for report data that is posting, non-posting, or either.
   * Posting status refers to whether QuickBooks records the transaction in an
   * account register.
   */
  postingStatus?: 'either' | 'non_posting' | 'posting';

  /**
   * Query param: The type of year to use for the report.
   */
  reportCalendar?: 'calendar_year' | 'fiscal_year' | 'tax_year';

  /**
   * Query param: Filter for report data dated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateFrom?: string;

  /**
   * Query param: A QuickBooks Desktop relative date macro. This cannot be combined
   * with `reportDateFrom` or `reportDateTo`.
   */
  reportDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';

  /**
   * Query param: Filter for report data dated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateTo?: string;

  /**
   * Query param: The custom summary report type to retrieve. This endpoint supports
   * only `custom_summary`, so this parameter is optional and defaults to
   * `custom_summary`.
   */
  reportType?: 'custom_summary';

  /**
   * Query param: Filters which report rows QuickBooks returns. Use `active_only` for
   * active rows, `non_zero` for rows with non-zero values, or `all` for all rows.
   */
  rowsToReturn?: 'active_only' | 'non_zero' | 'all';

  /**
   * Query param: Filter for report data by transaction type(s). Repeat this query
   * parameter to include multiple transaction types.
   */
  transactionTypes?: Array<
    | 'all'
    | 'ar_refund_credit_card'
    | 'bill'
    | 'bill_payment_check'
    | 'bill_payment_credit_card'
    | 'build_assembly'
    | 'charge'
    | 'check'
    | 'credit_card_charge'
    | 'credit_card_credit'
    | 'credit_memo'
    | 'deposit'
    | 'estimate'
    | 'inventory_adjustment'
    | 'invoice'
    | 'item_receipt'
    | 'journal_entry'
    | 'liability_adjustment'
    | 'paycheck'
    | 'payroll_liability_check'
    | 'purchase_order'
    | 'receive_payment'
    | 'sales_order'
    | 'sales_receipt'
    | 'sales_tax_payment_check'
    | 'transfer'
    | 'vendor_credit'
    | 'ytd_adjustment'
  >;

  /**
   * Query param: Filter for report data updated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for report data updated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedBefore?: string;

  /**
   * Query param: A QuickBooks Desktop relative updated-date macro. This cannot be
   * combined with `updatedAfter` or `updatedBefore`.
   */
  updatedDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';
}

export interface ReportGeneralDetailParams {
  /**
   * Query param: The general detail report type to retrieve.
   */
  reportType:
    | '1099_detail'
    | 'audit_trail'
    | 'balance_sheet_detail'
    | 'check_detail'
    | 'customer_balance_detail'
    | 'deposit_detail'
    | 'estimates_by_job'
    | 'expense_by_vendor_detail'
    | 'general_ledger'
    | 'income_by_customer_detail'
    | 'income_tax_detail'
    | 'inventory_valuation_detail'
    | 'job_progress_invoices_vs_estimates'
    | 'journal'
    | 'missing_checks'
    | 'open_invoices'
    | 'open_purchase_orders'
    | 'open_purchase_orders_by_job'
    | 'open_sales_order_by_customer'
    | 'open_sales_order_by_item'
    | 'pending_sales'
    | 'profit_and_loss_detail'
    | 'purchase_by_item_detail'
    | 'purchase_by_vendor_detail'
    | 'sales_by_customer_detail'
    | 'sales_by_item_detail'
    | 'sales_by_sales_representative_detail'
    | 'transaction_detail_by_account'
    | 'transaction_list_by_customer'
    | 'transaction_list_by_date'
    | 'transaction_list_by_vendor'
    | 'unpaid_bills_detail'
    | 'unbilled_costs_by_job'
    | 'vendor_balance_detail';

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for report data by account `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple accounts. Use only one account filter per
   * request.
   */
  accountFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned account IDs. Repeat
   * this query parameter to include multiple accounts. Use only one account filter
   * per request.
   */
  accountIds?: Array<string>;

  /**
   * Query param: Whether to include all accounts or only accounts in use.
   */
  accountsToInclude?: 'all' | 'in_use';

  /**
   * Query param: Filter for report data by account type. Use only one account filter
   * per request.
   */
  accountType?:
    | 'accounts_payable'
    | 'accounts_receivable'
    | 'allowed_for_1099'
    | 'ap_and_sales_tax'
    | 'ap_or_credit_card'
    | 'ar_and_ap'
    | 'asset'
    | 'balance_sheet'
    | 'bank'
    | 'bank_and_ar_and_ap_and_uf'
    | 'bank_and_uf'
    | 'cost_of_sales'
    | 'credit_card'
    | 'current_asset'
    | 'current_asset_and_expense'
    | 'current_liability'
    | 'equity'
    | 'equity_and_income_and_expense'
    | 'expense_and_other_expense'
    | 'fixed_asset'
    | 'income_and_expense'
    | 'income_and_other_income'
    | 'liability'
    | 'liability_and_equity'
    | 'long_term_liability'
    | 'non_posting'
    | 'ordinary_expense'
    | 'ordinary_income'
    | 'ordinary_income_and_cogs'
    | 'ordinary_income_and_expense'
    | 'other_asset'
    | 'other_current_asset'
    | 'other_current_liability'
    | 'other_expense'
    | 'other_income'
    | 'other_income_or_expense';

  /**
   * Query param: The accounting basis to use for the report. Use `cash` to base
   * income and expenses on when money changes hands, `accrual` to base them on
   * invoice and bill dates, or `none` to use the QuickBooks Desktop default for the
   * report.
   */
  basis?: 'accrual' | 'cash' | 'none';

  /**
   * Query param: Filter for report data by class `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned class IDs. Repeat
   * this query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classIds?: Array<string>;

  /**
   * Query param: The report detail level to include. Use `all` for all rows,
   * `all_except_summary` to omit summary rows, or `summary_only` to return only
   * summary rows.
   */
  detailLevel?: 'all' | 'all_except_summary' | 'summary_only';

  /**
   * Query param: Filter for report data by entity `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple entities. Use only one entity filter per
   * request.
   */
  entityFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned entity IDs. Repeat
   * this query parameter to include multiple entities. Use only one entity filter
   * per request.
   */
  entityIds?: Array<string>;

  /**
   * Query param: Filter for report data by entity type, such as customer, vendor,
   * employee, or other name. Use only one entity filter per request.
   */
  entityType?: 'customer' | 'employee' | 'other_name' | 'vendor';

  /**
   * Query param: The specific report columns to include, by column type. Repeat this
   * query parameter to request multiple columns. When this parameter is present,
   * QuickBooks Desktop omits its default report columns unless you include them
   * here.
   */
  includeColumns?: Array<
    | 'account'
    | 'aging'
    | 'amount'
    | 'amount_difference'
    | 'average_cost'
    | 'billed_date'
    | 'billing_status'
    | 'calculated_amount'
    | 'class'
    | 'cleared_status'
    | 'cost_price'
    | 'credit'
    | 'currency'
    | 'date'
    | 'debit'
    | 'delivery_date'
    | 'due_date'
    | 'estimate_active'
    | 'exchange_rate'
    | 'shipment_origin'
    | 'income_subject_to_tax'
    | 'invoiced'
    | 'item'
    | 'description'
    | 'last_modified_by'
    | 'latest_or_prior_state'
    | 'memo'
    | 'updated_at'
    | 'name'
    | 'name_account_number'
    | 'name_address'
    | 'name_city'
    | 'name_contact'
    | 'name_email'
    | 'name_fax'
    | 'name_phone'
    | 'name_state'
    | 'name_postal_code'
    | 'open_balance'
    | 'original_amount'
    | 'paid_amount'
    | 'paid_status'
    | 'paid_through_date'
    | 'payment_method'
    | 'payroll_item'
    | 'purchase_order_number'
    | 'print_status'
    | 'progress_amount'
    | 'progress_percent'
    | 'quantity'
    | 'quantity_available'
    | 'quantity_on_hand'
    | 'quantity_on_sales_order'
    | 'received_quantity'
    | 'ref_number'
    | 'running_balance'
    | 'sales_representative'
    | 'sales_tax_code'
    | 'serial_or_lot_number'
    | 'shipping_date'
    | 'shipping_method'
    | 'source_name'
    | 'split_account'
    | 'ssn_or_tax_identification_number'
    | 'tax_line'
    | 'tax_table_version'
    | 'terms'
    | 'transaction_id'
    | 'transaction_number'
    | 'transaction_type'
    | 'unit_price'
    | 'user_edit'
    | 'value_on_hand'
    | 'wage_base'
    | 'wage_base_tips'
  >;

  /**
   * Query param: Filter for report data by item `fullName` values, case-insensitive.
   * A `fullName` is a fully-qualified QuickBooks name formed by joining parent
   * object names with the object's `name` using colons. Repeat this query parameter
   * to include multiple items. Use only one item filter per request.
   */
  itemFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned item IDs. Repeat this
   * query parameter to include multiple items. Use only one item filter per request.
   */
  itemIds?: Array<string>;

  /**
   * Query param: Filter for report data by item type. Use only one item filter per
   * request.
   */
  itemType?:
    | 'all_except_fixed_asset'
    | 'assembly'
    | 'discount'
    | 'fixed_asset'
    | 'inventory'
    | 'inventory_and_assembly'
    | 'non_inventory'
    | 'other_charge'
    | 'payment'
    | 'sales'
    | 'sales_tax'
    | 'service';

  /**
   * Query param: The date through which QuickBooks Desktop calculates open balance
   * information.
   */
  openBalanceAsOf?: 'report_end_date' | 'today';

  /**
   * Query param: Filter for report data that is posting, non-posting, or either.
   * Posting status refers to whether QuickBooks records the transaction in an
   * account register.
   */
  postingStatus?: 'either' | 'non_posting' | 'posting';

  /**
   * Query param: Filter for report data dated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateFrom?: string;

  /**
   * Query param: A QuickBooks Desktop relative date macro. This cannot be combined
   * with `reportDateFrom` or `reportDateTo`.
   */
  reportDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';

  /**
   * Query param: Filter for report data dated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateTo?: string;

  /**
   * Query param: How QuickBooks Desktop calculates report data and labels report
   * rows.
   */
  summarizeRowsBy?:
    | 'account'
    | 'balance_sheet'
    | 'class'
    | 'customer'
    | 'customer_type'
    | 'day'
    | 'employee'
    | 'four_week'
    | 'half_month'
    | 'income_statement'
    | 'item_detail'
    | 'item_type'
    | 'month'
    | 'payee'
    | 'payment_method'
    | 'payroll_item_detail'
    | 'payroll_ytd_detail'
    | 'quarter'
    | 'sales_representative'
    | 'sales_tax_code'
    | 'shipping_method'
    | 'tax_line'
    | 'terms'
    | 'total_only'
    | 'two_week'
    | 'vendor'
    | 'vendor_type'
    | 'week'
    | 'year';

  /**
   * Query param: Filter for report data by transaction type(s). Repeat this query
   * parameter to include multiple transaction types.
   */
  transactionTypes?: Array<
    | 'all'
    | 'ar_refund_credit_card'
    | 'bill'
    | 'bill_payment_check'
    | 'bill_payment_credit_card'
    | 'build_assembly'
    | 'charge'
    | 'check'
    | 'credit_card_charge'
    | 'credit_card_credit'
    | 'credit_memo'
    | 'deposit'
    | 'estimate'
    | 'inventory_adjustment'
    | 'invoice'
    | 'item_receipt'
    | 'journal_entry'
    | 'liability_adjustment'
    | 'paycheck'
    | 'payroll_liability_check'
    | 'purchase_order'
    | 'receive_payment'
    | 'sales_order'
    | 'sales_receipt'
    | 'sales_tax_payment_check'
    | 'transfer'
    | 'vendor_credit'
    | 'ytd_adjustment'
  >;

  /**
   * Query param: Filter for report data updated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for report data updated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedBefore?: string;

  /**
   * Query param: A QuickBooks Desktop relative updated-date macro. This cannot be
   * combined with `updatedAfter` or `updatedBefore`.
   */
  updatedDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';
}

export interface ReportGeneralSummaryParams {
  /**
   * Query param: The general summary report type to retrieve.
   */
  reportType:
    | 'balance_sheet_by_class'
    | 'balance_sheet_previous_year_comparison'
    | 'balance_sheet_standard'
    | 'balance_sheet_summary'
    | 'customer_balance_summary'
    | 'expense_by_vendor_summary'
    | 'income_by_customer_summary'
    | 'inventory_stock_status_by_item'
    | 'inventory_stock_status_by_vendor'
    | 'income_tax_summary'
    | 'inventory_valuation_summary'
    | 'inventory_valuation_summary_by_site'
    | 'lot_number_in_stock_by_site'
    | 'physical_inventory_worksheet'
    | 'profit_and_loss_by_class'
    | 'profit_and_loss_by_job'
    | 'profit_and_loss_previous_year_comparison'
    | 'profit_and_loss_standard'
    | 'profit_and_loss_ytd_comparison'
    | 'purchase_by_item_summary'
    | 'purchase_by_vendor_summary'
    | 'sales_by_customer_summary'
    | 'sales_by_item_summary'
    | 'sales_by_sales_representative_summary'
    | 'sales_tax_liability'
    | 'sales_tax_revenue_summary'
    | 'serial_number_in_stock_by_site'
    | 'trial_balance'
    | 'vendor_balance_summary';

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for report data by account `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple accounts. Use only one account filter per
   * request.
   */
  accountFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned account IDs. Repeat
   * this query parameter to include multiple accounts. Use only one account filter
   * per request.
   */
  accountIds?: Array<string>;

  /**
   * Query param: Filter for report data by account type. Use only one account filter
   * per request.
   */
  accountType?:
    | 'accounts_payable'
    | 'accounts_receivable'
    | 'allowed_for_1099'
    | 'ap_and_sales_tax'
    | 'ap_or_credit_card'
    | 'ar_and_ap'
    | 'asset'
    | 'balance_sheet'
    | 'bank'
    | 'bank_and_ar_and_ap_and_uf'
    | 'bank_and_uf'
    | 'cost_of_sales'
    | 'credit_card'
    | 'current_asset'
    | 'current_asset_and_expense'
    | 'current_liability'
    | 'equity'
    | 'equity_and_income_and_expense'
    | 'expense_and_other_expense'
    | 'fixed_asset'
    | 'income_and_expense'
    | 'income_and_other_income'
    | 'liability'
    | 'liability_and_equity'
    | 'long_term_liability'
    | 'non_posting'
    | 'ordinary_expense'
    | 'ordinary_income'
    | 'ordinary_income_and_cogs'
    | 'ordinary_income_and_expense'
    | 'other_asset'
    | 'other_current_asset'
    | 'other_current_liability'
    | 'other_expense'
    | 'other_income'
    | 'other_income_or_expense';

  /**
   * Query param: The accounting basis to use for the report. Use `cash` to base
   * income and expenses on when money changes hands, `accrual` to base them on
   * invoice and bill dates, or `none` to use the QuickBooks Desktop default for the
   * report.
   */
  basis?: 'accrual' | 'cash' | 'none';

  /**
   * Query param: Filter for report data by class `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned class IDs. Repeat
   * this query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classIds?: Array<string>;

  /**
   * Query param: Filters which report columns QuickBooks returns. Use `active_only`
   * for active columns, `non_zero` for columns with non-zero values, or `all` for
   * all columns.
   */
  columnsToReturn?: 'active_only' | 'non_zero' | 'all';

  /**
   * Query param: The report detail level to include. Use `all` for all rows,
   * `all_except_summary` to omit summary rows, or `summary_only` to return only
   * summary rows.
   */
  detailLevel?: 'all' | 'all_except_summary' | 'summary_only';

  /**
   * Query param: Filter for report data by entity `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple entities. Use only one entity filter per
   * request.
   */
  entityFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned entity IDs. Repeat
   * this query parameter to include multiple entities. Use only one entity filter
   * per request.
   */
  entityIds?: Array<string>;

  /**
   * Query param: Filter for report data by entity type, such as customer, vendor,
   * employee, or other name. Use only one entity filter per request.
   */
  entityType?: 'customer' | 'employee' | 'other_name' | 'vendor';

  /**
   * Query param: Whether to include subcolumns in the report. QuickBooks Desktop may
   * still omit subcolumns that it can easily compute from other returned values.
   */
  includeSubcolumns?: boolean;

  /**
   * Query param: Filter for report data by item `fullName` values, case-insensitive.
   * A `fullName` is a fully-qualified QuickBooks name formed by joining parent
   * object names with the object's `name` using colons. Repeat this query parameter
   * to include multiple items. Use only one item filter per request.
   */
  itemFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned item IDs. Repeat this
   * query parameter to include multiple items. Use only one item filter per request.
   */
  itemIds?: Array<string>;

  /**
   * Query param: Filter for report data by item type. Use only one item filter per
   * request.
   */
  itemType?:
    | 'all_except_fixed_asset'
    | 'assembly'
    | 'discount'
    | 'fixed_asset'
    | 'inventory'
    | 'inventory_and_assembly'
    | 'non_inventory'
    | 'other_charge'
    | 'payment'
    | 'sales'
    | 'sales_tax'
    | 'service';

  /**
   * Query param: Filter for report data that is posting, non-posting, or either.
   * Posting status refers to whether QuickBooks records the transaction in an
   * account register.
   */
  postingStatus?: 'either' | 'non_posting' | 'posting';

  /**
   * Query param: The type of year to use for the report.
   */
  reportCalendar?: 'calendar_year' | 'fiscal_year' | 'tax_year';

  /**
   * Query param: Filter for report data dated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateFrom?: string;

  /**
   * Query param: A QuickBooks Desktop relative date macro. This cannot be combined
   * with `reportDateFrom` or `reportDateTo`.
   */
  reportDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';

  /**
   * Query param: Filter for report data dated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateTo?: string;

  /**
   * Query param: Filters which report rows QuickBooks returns. Use `active_only` for
   * active rows, `non_zero` for rows with non-zero values, or `all` for all rows.
   */
  rowsToReturn?: 'active_only' | 'non_zero' | 'all';

  /**
   * Query param: How QuickBooks Desktop calculates report data and labels report
   * column headers.
   */
  summarizeColumnsBy?:
    | 'account'
    | 'balance_sheet'
    | 'class'
    | 'customer'
    | 'customer_type'
    | 'day'
    | 'employee'
    | 'four_week'
    | 'half_month'
    | 'income_statement'
    | 'item_detail'
    | 'item_type'
    | 'month'
    | 'payee'
    | 'payment_method'
    | 'payroll_item_detail'
    | 'payroll_ytd_detail'
    | 'quarter'
    | 'sales_representative'
    | 'sales_tax_code'
    | 'shipping_method'
    | 'terms'
    | 'total_only'
    | 'two_week'
    | 'vendor'
    | 'vendor_type'
    | 'week'
    | 'year';

  /**
   * Query param: Filter for report data by transaction type(s). Repeat this query
   * parameter to include multiple transaction types.
   */
  transactionTypes?: Array<
    | 'all'
    | 'ar_refund_credit_card'
    | 'bill'
    | 'bill_payment_check'
    | 'bill_payment_credit_card'
    | 'build_assembly'
    | 'charge'
    | 'check'
    | 'credit_card_charge'
    | 'credit_card_credit'
    | 'credit_memo'
    | 'deposit'
    | 'estimate'
    | 'inventory_adjustment'
    | 'invoice'
    | 'item_receipt'
    | 'journal_entry'
    | 'liability_adjustment'
    | 'paycheck'
    | 'payroll_liability_check'
    | 'purchase_order'
    | 'receive_payment'
    | 'sales_order'
    | 'sales_receipt'
    | 'sales_tax_payment_check'
    | 'transfer'
    | 'vendor_credit'
    | 'ytd_adjustment'
  >;

  /**
   * Query param: Filter for report data updated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for report data updated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedBefore?: string;

  /**
   * Query param: A QuickBooks Desktop relative updated-date macro. This cannot be
   * combined with `updatedAfter` or `updatedBefore`.
   */
  updatedDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';
}

export interface ReportJobParams {
  /**
   * Query param: The job report type to retrieve.
   */
  reportType:
    | 'item_estimates_vs_actuals'
    | 'item_profitability'
    | 'job_estimates_vs_actuals_detail'
    | 'job_estimates_vs_actuals_summary'
    | 'job_profitability_detail'
    | 'job_profitability_summary';

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for report data by account `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple accounts. Use only one account filter per
   * request.
   */
  accountFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned account IDs. Repeat
   * this query parameter to include multiple accounts. Use only one account filter
   * per request.
   */
  accountIds?: Array<string>;

  /**
   * Query param: Filter for report data by account type. Use only one account filter
   * per request.
   */
  accountType?:
    | 'accounts_payable'
    | 'accounts_receivable'
    | 'allowed_for_1099'
    | 'ap_and_sales_tax'
    | 'ap_or_credit_card'
    | 'ar_and_ap'
    | 'asset'
    | 'balance_sheet'
    | 'bank'
    | 'bank_and_ar_and_ap_and_uf'
    | 'bank_and_uf'
    | 'cost_of_sales'
    | 'credit_card'
    | 'current_asset'
    | 'current_asset_and_expense'
    | 'current_liability'
    | 'equity'
    | 'equity_and_income_and_expense'
    | 'expense_and_other_expense'
    | 'fixed_asset'
    | 'income_and_expense'
    | 'income_and_other_income'
    | 'liability'
    | 'liability_and_equity'
    | 'long_term_liability'
    | 'non_posting'
    | 'ordinary_expense'
    | 'ordinary_income'
    | 'ordinary_income_and_cogs'
    | 'ordinary_income_and_expense'
    | 'other_asset'
    | 'other_current_asset'
    | 'other_current_liability'
    | 'other_expense'
    | 'other_income'
    | 'other_income_or_expense';

  /**
   * Query param: Filter for report data by class `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned class IDs. Repeat
   * this query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classIds?: Array<string>;

  /**
   * Query param: The report detail level to include. Use `all` for all rows,
   * `all_except_summary` to omit summary rows, or `summary_only` to return only
   * summary rows.
   */
  detailLevel?: 'all' | 'all_except_summary' | 'summary_only';

  /**
   * Query param: Filter for report data by entity `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple entities. Use only one entity filter per
   * request.
   */
  entityFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned entity IDs. Repeat
   * this query parameter to include multiple entities. Use only one entity filter
   * per request.
   */
  entityIds?: Array<string>;

  /**
   * Query param: Filter for report data by entity type, such as customer, vendor,
   * employee, or other name. Use only one entity filter per request.
   */
  entityType?: 'customer' | 'employee' | 'other_name' | 'vendor';

  /**
   * Query param: Whether to include subcolumns in the report. QuickBooks Desktop may
   * still omit subcolumns that it can easily compute from other returned values.
   */
  includeSubcolumns?: boolean;

  /**
   * Query param: Filter for report data by item `fullName` values, case-insensitive.
   * A `fullName` is a fully-qualified QuickBooks name formed by joining parent
   * object names with the object's `name` using colons. Repeat this query parameter
   * to include multiple items. Use only one item filter per request.
   */
  itemFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned item IDs. Repeat this
   * query parameter to include multiple items. Use only one item filter per request.
   */
  itemIds?: Array<string>;

  /**
   * Query param: Filter for report data by item type. Use only one item filter per
   * request.
   */
  itemType?:
    | 'all_except_fixed_asset'
    | 'assembly'
    | 'discount'
    | 'fixed_asset'
    | 'inventory'
    | 'inventory_and_assembly'
    | 'non_inventory'
    | 'other_charge'
    | 'payment'
    | 'sales'
    | 'sales_tax'
    | 'service';

  /**
   * Query param: Filter for report data that is posting, non-posting, or either.
   * Posting status refers to whether QuickBooks records the transaction in an
   * account register.
   */
  postingStatus?: 'either' | 'non_posting' | 'posting';

  /**
   * Query param: Filter for report data dated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateFrom?: string;

  /**
   * Query param: A QuickBooks Desktop relative date macro. This cannot be combined
   * with `reportDateFrom` or `reportDateTo`.
   */
  reportDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';

  /**
   * Query param: Filter for report data dated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateTo?: string;

  /**
   * Query param: How QuickBooks Desktop calculates report data and labels report
   * column headers.
   */
  summarizeColumnsBy?:
    | 'account'
    | 'balance_sheet'
    | 'class'
    | 'customer'
    | 'customer_type'
    | 'day'
    | 'employee'
    | 'four_week'
    | 'half_month'
    | 'income_statement'
    | 'item_detail'
    | 'item_type'
    | 'month'
    | 'payee'
    | 'payment_method'
    | 'payroll_item_detail'
    | 'payroll_ytd_detail'
    | 'quarter'
    | 'sales_representative'
    | 'sales_tax_code'
    | 'shipping_method'
    | 'terms'
    | 'total_only'
    | 'two_week'
    | 'vendor'
    | 'vendor_type'
    | 'week'
    | 'year';

  /**
   * Query param: Filter for report data by transaction type(s). Repeat this query
   * parameter to include multiple transaction types.
   */
  transactionTypes?: Array<
    | 'all'
    | 'ar_refund_credit_card'
    | 'bill'
    | 'bill_payment_check'
    | 'bill_payment_credit_card'
    | 'build_assembly'
    | 'charge'
    | 'check'
    | 'credit_card_charge'
    | 'credit_card_credit'
    | 'credit_memo'
    | 'deposit'
    | 'estimate'
    | 'inventory_adjustment'
    | 'invoice'
    | 'item_receipt'
    | 'journal_entry'
    | 'liability_adjustment'
    | 'paycheck'
    | 'payroll_liability_check'
    | 'purchase_order'
    | 'receive_payment'
    | 'sales_order'
    | 'sales_receipt'
    | 'sales_tax_payment_check'
    | 'transfer'
    | 'vendor_credit'
    | 'ytd_adjustment'
  >;

  /**
   * Query param: Filter for report data updated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for report data updated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedBefore?: string;

  /**
   * Query param: A QuickBooks Desktop relative updated-date macro. This cannot be
   * combined with `updatedAfter` or `updatedBefore`.
   */
  updatedDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';
}

export interface ReportPayrollDetailParams {
  /**
   * Query param: The payroll detail report type to retrieve.
   */
  reportType:
    | 'employee_state_taxes_detail'
    | 'payroll_item_detail'
    | 'payroll_review_detail'
    | 'payroll_transaction_detail'
    | 'payroll_transactions_by_payee';

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for report data by account `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple accounts. Use only one account filter per
   * request.
   */
  accountFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned account IDs. Repeat
   * this query parameter to include multiple accounts. Use only one account filter
   * per request.
   */
  accountIds?: Array<string>;

  /**
   * Query param: Whether to include all accounts or only accounts in use.
   */
  accountsToInclude?: 'all' | 'in_use';

  /**
   * Query param: Filter for report data by account type. Use only one account filter
   * per request.
   */
  accountType?:
    | 'accounts_payable'
    | 'accounts_receivable'
    | 'allowed_for_1099'
    | 'ap_and_sales_tax'
    | 'ap_or_credit_card'
    | 'ar_and_ap'
    | 'asset'
    | 'balance_sheet'
    | 'bank'
    | 'bank_and_ar_and_ap_and_uf'
    | 'bank_and_uf'
    | 'cost_of_sales'
    | 'credit_card'
    | 'current_asset'
    | 'current_asset_and_expense'
    | 'current_liability'
    | 'equity'
    | 'equity_and_income_and_expense'
    | 'expense_and_other_expense'
    | 'fixed_asset'
    | 'income_and_expense'
    | 'income_and_other_income'
    | 'liability'
    | 'liability_and_equity'
    | 'long_term_liability'
    | 'non_posting'
    | 'ordinary_expense'
    | 'ordinary_income'
    | 'ordinary_income_and_cogs'
    | 'ordinary_income_and_expense'
    | 'other_asset'
    | 'other_current_asset'
    | 'other_current_liability'
    | 'other_expense'
    | 'other_income'
    | 'other_income_or_expense';

  /**
   * Query param: Filter for report data by class `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned class IDs. Repeat
   * this query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classIds?: Array<string>;

  /**
   * Query param: The report detail level to include. Use `all` for all rows,
   * `all_except_summary` to omit summary rows, or `summary_only` to return only
   * summary rows.
   */
  detailLevel?: 'all' | 'all_except_summary' | 'summary_only';

  /**
   * Query param: Filter for report data by entity `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple entities. Use only one entity filter per
   * request.
   */
  entityFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned entity IDs. Repeat
   * this query parameter to include multiple entities. Use only one entity filter
   * per request.
   */
  entityIds?: Array<string>;

  /**
   * Query param: Filter for report data by entity type, such as customer, vendor,
   * employee, or other name. Use only one entity filter per request.
   */
  entityType?: 'customer' | 'employee' | 'other_name' | 'vendor';

  /**
   * Query param: The specific report columns to include, by column type. Repeat this
   * query parameter to request multiple columns. When this parameter is present,
   * QuickBooks Desktop omits its default report columns unless you include them
   * here.
   */
  includeColumns?: Array<
    | 'account'
    | 'aging'
    | 'amount'
    | 'amount_difference'
    | 'average_cost'
    | 'billed_date'
    | 'billing_status'
    | 'calculated_amount'
    | 'class'
    | 'cleared_status'
    | 'cost_price'
    | 'credit'
    | 'currency'
    | 'date'
    | 'debit'
    | 'delivery_date'
    | 'due_date'
    | 'estimate_active'
    | 'exchange_rate'
    | 'shipment_origin'
    | 'income_subject_to_tax'
    | 'invoiced'
    | 'item'
    | 'description'
    | 'last_modified_by'
    | 'latest_or_prior_state'
    | 'memo'
    | 'updated_at'
    | 'name'
    | 'name_account_number'
    | 'name_address'
    | 'name_city'
    | 'name_contact'
    | 'name_email'
    | 'name_fax'
    | 'name_phone'
    | 'name_state'
    | 'name_postal_code'
    | 'open_balance'
    | 'original_amount'
    | 'paid_amount'
    | 'paid_status'
    | 'paid_through_date'
    | 'payment_method'
    | 'payroll_item'
    | 'purchase_order_number'
    | 'print_status'
    | 'progress_amount'
    | 'progress_percent'
    | 'quantity'
    | 'quantity_available'
    | 'quantity_on_hand'
    | 'quantity_on_sales_order'
    | 'received_quantity'
    | 'ref_number'
    | 'running_balance'
    | 'sales_representative'
    | 'sales_tax_code'
    | 'serial_or_lot_number'
    | 'shipping_date'
    | 'shipping_method'
    | 'source_name'
    | 'split_account'
    | 'ssn_or_tax_identification_number'
    | 'tax_line'
    | 'tax_table_version'
    | 'terms'
    | 'transaction_id'
    | 'transaction_number'
    | 'transaction_type'
    | 'unit_price'
    | 'user_edit'
    | 'value_on_hand'
    | 'wage_base'
    | 'wage_base_tips'
  >;

  /**
   * Query param: Filter for report data by item `fullName` values, case-insensitive.
   * A `fullName` is a fully-qualified QuickBooks name formed by joining parent
   * object names with the object's `name` using colons. Repeat this query parameter
   * to include multiple items. Use only one item filter per request.
   */
  itemFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned item IDs. Repeat this
   * query parameter to include multiple items. Use only one item filter per request.
   */
  itemIds?: Array<string>;

  /**
   * Query param: Filter for report data by item type. Use only one item filter per
   * request.
   */
  itemType?:
    | 'all_except_fixed_asset'
    | 'assembly'
    | 'discount'
    | 'fixed_asset'
    | 'inventory'
    | 'inventory_and_assembly'
    | 'non_inventory'
    | 'other_charge'
    | 'payment'
    | 'sales'
    | 'sales_tax'
    | 'service';

  /**
   * Query param: The date through which QuickBooks Desktop calculates open balance
   * information.
   */
  openBalanceAsOf?: 'report_end_date' | 'today';

  /**
   * Query param: Filter for report data that is posting, non-posting, or either.
   * Posting status refers to whether QuickBooks records the transaction in an
   * account register.
   */
  postingStatus?: 'either' | 'non_posting' | 'posting';

  /**
   * Query param: Filter for report data dated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateFrom?: string;

  /**
   * Query param: A QuickBooks Desktop relative date macro. This cannot be combined
   * with `reportDateFrom` or `reportDateTo`.
   */
  reportDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';

  /**
   * Query param: Filter for report data dated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateTo?: string;

  /**
   * Query param: How QuickBooks Desktop calculates report data and labels report
   * rows.
   */
  summarizeRowsBy?:
    | 'account'
    | 'balance_sheet'
    | 'class'
    | 'customer'
    | 'customer_type'
    | 'day'
    | 'employee'
    | 'four_week'
    | 'half_month'
    | 'income_statement'
    | 'item_detail'
    | 'item_type'
    | 'month'
    | 'payee'
    | 'payment_method'
    | 'payroll_item_detail'
    | 'payroll_ytd_detail'
    | 'quarter'
    | 'sales_representative'
    | 'sales_tax_code'
    | 'shipping_method'
    | 'tax_line'
    | 'terms'
    | 'total_only'
    | 'two_week'
    | 'vendor'
    | 'vendor_type'
    | 'week'
    | 'year';

  /**
   * Query param: Filter for report data updated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for report data updated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedBefore?: string;

  /**
   * Query param: A QuickBooks Desktop relative updated-date macro. This cannot be
   * combined with `updatedAfter` or `updatedBefore`.
   */
  updatedDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';
}

export interface ReportPayrollSummaryParams {
  /**
   * Query param: The payroll summary report type to retrieve.
   */
  reportType: 'employee_earnings_summary' | 'payroll_liability_balances' | 'payroll_summary';

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for report data by account `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple accounts. Use only one account filter per
   * request.
   */
  accountFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned account IDs. Repeat
   * this query parameter to include multiple accounts. Use only one account filter
   * per request.
   */
  accountIds?: Array<string>;

  /**
   * Query param: Filter for report data by account type. Use only one account filter
   * per request.
   */
  accountType?:
    | 'accounts_payable'
    | 'accounts_receivable'
    | 'allowed_for_1099'
    | 'ap_and_sales_tax'
    | 'ap_or_credit_card'
    | 'ar_and_ap'
    | 'asset'
    | 'balance_sheet'
    | 'bank'
    | 'bank_and_ar_and_ap_and_uf'
    | 'bank_and_uf'
    | 'cost_of_sales'
    | 'credit_card'
    | 'current_asset'
    | 'current_asset_and_expense'
    | 'current_liability'
    | 'equity'
    | 'equity_and_income_and_expense'
    | 'expense_and_other_expense'
    | 'fixed_asset'
    | 'income_and_expense'
    | 'income_and_other_income'
    | 'liability'
    | 'liability_and_equity'
    | 'long_term_liability'
    | 'non_posting'
    | 'ordinary_expense'
    | 'ordinary_income'
    | 'ordinary_income_and_cogs'
    | 'ordinary_income_and_expense'
    | 'other_asset'
    | 'other_current_asset'
    | 'other_current_liability'
    | 'other_expense'
    | 'other_income'
    | 'other_income_or_expense';

  /**
   * Query param: Filter for report data by class `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned class IDs. Repeat
   * this query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classIds?: Array<string>;

  /**
   * Query param: Filters which report columns QuickBooks returns. Use `active_only`
   * for active columns, `non_zero` for columns with non-zero values, or `all` for
   * all columns.
   */
  columnsToReturn?: 'active_only' | 'non_zero' | 'all';

  /**
   * Query param: The report detail level to include. Use `all` for all rows,
   * `all_except_summary` to omit summary rows, or `summary_only` to return only
   * summary rows.
   */
  detailLevel?: 'all' | 'all_except_summary' | 'summary_only';

  /**
   * Query param: Filter for report data by entity `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple entities. Use only one entity filter per
   * request.
   */
  entityFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned entity IDs. Repeat
   * this query parameter to include multiple entities. Use only one entity filter
   * per request.
   */
  entityIds?: Array<string>;

  /**
   * Query param: Filter for report data by entity type, such as customer, vendor,
   * employee, or other name. Use only one entity filter per request.
   */
  entityType?: 'customer' | 'employee' | 'other_name' | 'vendor';

  /**
   * Query param: Whether to include subcolumns in the report. QuickBooks Desktop may
   * still omit subcolumns that it can easily compute from other returned values.
   */
  includeSubcolumns?: boolean;

  /**
   * Query param: Filter for report data by item `fullName` values, case-insensitive.
   * A `fullName` is a fully-qualified QuickBooks name formed by joining parent
   * object names with the object's `name` using colons. Repeat this query parameter
   * to include multiple items. Use only one item filter per request.
   */
  itemFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned item IDs. Repeat this
   * query parameter to include multiple items. Use only one item filter per request.
   */
  itemIds?: Array<string>;

  /**
   * Query param: Filter for report data by item type. Use only one item filter per
   * request.
   */
  itemType?:
    | 'all_except_fixed_asset'
    | 'assembly'
    | 'discount'
    | 'fixed_asset'
    | 'inventory'
    | 'inventory_and_assembly'
    | 'non_inventory'
    | 'other_charge'
    | 'payment'
    | 'sales'
    | 'sales_tax'
    | 'service';

  /**
   * Query param: Filter for report data that is posting, non-posting, or either.
   * Posting status refers to whether QuickBooks records the transaction in an
   * account register.
   */
  postingStatus?: 'either' | 'non_posting' | 'posting';

  /**
   * Query param: The type of year to use for the report.
   */
  reportCalendar?: 'calendar_year' | 'fiscal_year' | 'tax_year';

  /**
   * Query param: Filter for report data dated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateFrom?: string;

  /**
   * Query param: A QuickBooks Desktop relative date macro. This cannot be combined
   * with `reportDateFrom` or `reportDateTo`.
   */
  reportDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';

  /**
   * Query param: Filter for report data dated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateTo?: string;

  /**
   * Query param: Filters which report rows QuickBooks returns. Use `active_only` for
   * active rows, `non_zero` for rows with non-zero values, or `all` for all rows.
   */
  rowsToReturn?: 'active_only' | 'non_zero' | 'all';

  /**
   * Query param: How QuickBooks Desktop calculates report data and labels report
   * column headers.
   */
  summarizeColumnsBy?:
    | 'account'
    | 'balance_sheet'
    | 'class'
    | 'customer'
    | 'customer_type'
    | 'day'
    | 'employee'
    | 'four_week'
    | 'half_month'
    | 'income_statement'
    | 'item_detail'
    | 'item_type'
    | 'month'
    | 'payee'
    | 'payment_method'
    | 'payroll_item_detail'
    | 'payroll_ytd_detail'
    | 'quarter'
    | 'sales_representative'
    | 'sales_tax_code'
    | 'shipping_method'
    | 'terms'
    | 'total_only'
    | 'two_week'
    | 'vendor'
    | 'vendor_type'
    | 'week'
    | 'year';

  /**
   * Query param: Filter for report data updated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for report data updated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `updatedDateMacro`.
   */
  updatedBefore?: string;

  /**
   * Query param: A QuickBooks Desktop relative updated-date macro. This cannot be
   * combined with `updatedAfter` or `updatedBefore`.
   */
  updatedDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';
}

export interface ReportTimeParams {
  /**
   * Query param: The time report type to retrieve.
   */
  reportType: 'time_by_item' | 'time_by_job_detail' | 'time_by_job_summary' | 'time_by_name';

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for report data by class `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned class IDs. Repeat
   * this query parameter to include multiple classes. Use only one class filter per
   * request.
   */
  classIds?: Array<string>;

  /**
   * Query param: Filters which report columns QuickBooks returns. Use `active_only`
   * for active columns, `non_zero` for columns with non-zero values, or `all` for
   * all columns.
   */
  columnsToReturn?: 'active_only' | 'non_zero' | 'all';

  /**
   * Query param: Filter for report data by entity `fullName` values,
   * case-insensitive. A `fullName` is a fully-qualified QuickBooks name formed by
   * joining parent object names with the object's `name` using colons. Repeat this
   * query parameter to include multiple entities. Use only one entity filter per
   * request.
   */
  entityFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned entity IDs. Repeat
   * this query parameter to include multiple entities. Use only one entity filter
   * per request.
   */
  entityIds?: Array<string>;

  /**
   * Query param: Filter for report data by entity type, such as customer, vendor,
   * employee, or other name. Use only one entity filter per request.
   */
  entityType?: 'customer' | 'employee' | 'other_name' | 'vendor';

  /**
   * Query param: Whether to include subcolumns in the report. QuickBooks Desktop may
   * still omit subcolumns that it can easily compute from other returned values.
   */
  includeSubcolumns?: boolean;

  /**
   * Query param: Filter for report data by item `fullName` values, case-insensitive.
   * A `fullName` is a fully-qualified QuickBooks name formed by joining parent
   * object names with the object's `name` using colons. Repeat this query parameter
   * to include multiple items. Use only one item filter per request.
   */
  itemFullNames?: Array<string>;

  /**
   * Query param: Filter for report data by QuickBooks-assigned item IDs. Repeat this
   * query parameter to include multiple items. Use only one item filter per request.
   */
  itemIds?: Array<string>;

  /**
   * Query param: Filter for report data by item type. Use only one item filter per
   * request.
   */
  itemType?:
    | 'all_except_fixed_asset'
    | 'assembly'
    | 'discount'
    | 'fixed_asset'
    | 'inventory'
    | 'inventory_and_assembly'
    | 'non_inventory'
    | 'other_charge'
    | 'payment'
    | 'sales'
    | 'sales_tax'
    | 'service';

  /**
   * Query param: The type of year to use for the report.
   */
  reportCalendar?: 'calendar_year' | 'fiscal_year' | 'tax_year';

  /**
   * Query param: Filter for report data dated on or after this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateFrom?: string;

  /**
   * Query param: A QuickBooks Desktop relative date macro. This cannot be combined
   * with `reportDateFrom` or `reportDateTo`.
   */
  reportDateMacro?:
    | 'all'
    | 'today'
    | 'this_week'
    | 'this_week_to_date'
    | 'this_month'
    | 'this_month_to_date'
    | 'this_quarter'
    | 'this_quarter_to_date'
    | 'this_year'
    | 'this_year_to_date'
    | 'yesterday'
    | 'last_week'
    | 'last_week_to_date'
    | 'last_month'
    | 'last_month_to_date'
    | 'last_quarter'
    | 'last_quarter_to_date'
    | 'last_year'
    | 'last_year_to_date'
    | 'next_week'
    | 'next_four_weeks'
    | 'next_month'
    | 'next_quarter'
    | 'next_year';

  /**
   * Query param: Filter for report data dated on or before this date, in ISO 8601
   * format (YYYY-MM-DD). This cannot be combined with `reportDateMacro`. If you omit
   * `reportDateFrom`, `reportDateTo`, and `reportDateMacro`, QuickBooks Desktop uses
   * the current fiscal year to date.
   */
  reportDateTo?: string;

  /**
   * Query param: Filters which report rows QuickBooks returns. Use `active_only` for
   * active rows, `non_zero` for rows with non-zero values, or `all` for all rows.
   */
  rowsToReturn?: 'active_only' | 'non_zero' | 'all';

  /**
   * Query param: How QuickBooks Desktop calculates report data and labels report
   * column headers.
   */
  summarizeColumnsBy?:
    | 'account'
    | 'balance_sheet'
    | 'class'
    | 'customer'
    | 'customer_type'
    | 'day'
    | 'employee'
    | 'four_week'
    | 'half_month'
    | 'income_statement'
    | 'item_detail'
    | 'item_type'
    | 'month'
    | 'payee'
    | 'payment_method'
    | 'payroll_item_detail'
    | 'payroll_ytd_detail'
    | 'quarter'
    | 'sales_representative'
    | 'sales_tax_code'
    | 'shipping_method'
    | 'terms'
    | 'total_only'
    | 'two_week'
    | 'vendor'
    | 'vendor_type'
    | 'week'
    | 'year';
}

export declare namespace Reports {
  export {
    type Report as Report,
    type ReportAgingParams as ReportAgingParams,
    type ReportBudgetSummaryParams as ReportBudgetSummaryParams,
    type ReportCustomDetailParams as ReportCustomDetailParams,
    type ReportCustomSummaryParams as ReportCustomSummaryParams,
    type ReportGeneralDetailParams as ReportGeneralDetailParams,
    type ReportGeneralSummaryParams as ReportGeneralSummaryParams,
    type ReportJobParams as ReportJobParams,
    type ReportPayrollDetailParams as ReportPayrollDetailParams,
    type ReportPayrollSummaryParams as ReportPayrollSummaryParams,
    type ReportTimeParams as ReportTimeParams,
  };
}
