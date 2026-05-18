// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';

const conductor = new Conductor({
  apiKey: 'sk_conductor_...',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource reports', () => {
  test('aging: only required params', async () => {
    const responsePromise = conductor.qbd.reports.aging({
      reportType: 'ap_aging_detail',
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('aging: required and optional params', async () => {
    const response = await conductor.qbd.reports.aging({
      reportType: 'ap_aging_detail',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountFullNames: ['Corporate:Accounts-Payable'],
      accountIds: ['80000001-1234567890'],
      accountsToInclude: 'all',
      accountType: 'bank',
      agingAsOf: 'report_end_date',
      classFullNames: ['Department:Marketing'],
      classIds: ['80000001-1234567890'],
      detailLevel: 'all_except_summary',
      entityFullNames: ['ABC Corporation:Website Redesign Project'],
      entityIds: ['80000001-1234567890'],
      entityType: 'customer',
      includeColumns: ['date', 'transaction_type', 'amount'],
      itemFullNames: ['Services:Consulting'],
      itemIds: ['80000001-1234567890'],
      itemType: 'inventory',
      postingStatus: 'posting',
      reportDateFrom: '2025-01-01',
      reportDateMacro: 'this_year_to_date',
      reportDateTo: '2025-02-01',
      transactionTypes: ['invoice', 'sales_receipt'],
      updatedAfter: '2025-01-01',
      updatedBefore: '2025-02-01',
      updatedDateMacro: 'this_month_to_date',
    });
  });

  test('budgetSummary: only required params', async () => {
    const responsePromise = conductor.qbd.reports.budgetSummary({
      fiscalYear: 2026,
      reportType: 'balance_sheet_budget_overview',
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('budgetSummary: required and optional params', async () => {
    const response = await conductor.qbd.reports.budgetSummary({
      fiscalYear: 2026,
      reportType: 'balance_sheet_budget_overview',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      budgetCriterion: 'accounts',
      classFullNames: ['Department:Marketing'],
      classIds: ['80000001-1234567890'],
      reportDateFrom: '2025-01-01',
      reportDateMacro: 'this_year_to_date',
      reportDateTo: '2025-02-01',
      summarizeColumnsBy: 'date',
      summarizeRowsBy: 'account',
    });
  });

  test('customDetail: only required params', async () => {
    const responsePromise = conductor.qbd.reports.customDetail({
      includeColumns: ['date', 'transaction_type', 'amount'],
      summarizeRowsBy: 'account',
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('customDetail: required and optional params', async () => {
    const response = await conductor.qbd.reports.customDetail({
      includeColumns: ['date', 'transaction_type', 'amount'],
      summarizeRowsBy: 'account',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountFullNames: ['Corporate:Accounts-Payable'],
      accountIds: ['80000001-1234567890'],
      accountsToInclude: 'all',
      accountType: 'bank',
      basis: 'accrual',
      classFullNames: ['Department:Marketing'],
      classIds: ['80000001-1234567890'],
      detailLevel: 'all_except_summary',
      entityFullNames: ['ABC Corporation:Website Redesign Project'],
      entityIds: ['80000001-1234567890'],
      entityType: 'customer',
      itemFullNames: ['Services:Consulting'],
      itemIds: ['80000001-1234567890'],
      itemType: 'inventory',
      openBalanceAsOf: 'report_end_date',
      postingStatus: 'posting',
      reportDateFrom: '2025-01-01',
      reportDateMacro: 'this_year_to_date',
      reportDateTo: '2025-02-01',
      reportType: 'custom_transaction_detail',
      transactionTypes: ['invoice', 'sales_receipt'],
      updatedAfter: '2025-01-01',
      updatedBefore: '2025-02-01',
      updatedDateMacro: 'this_month_to_date',
    });
  });

  test('customSummary: only required params', async () => {
    const responsePromise = conductor.qbd.reports.customSummary({
      summarizeColumnsBy: 'month',
      summarizeRowsBy: 'account',
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('customSummary: required and optional params', async () => {
    const response = await conductor.qbd.reports.customSummary({
      summarizeColumnsBy: 'month',
      summarizeRowsBy: 'account',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountFullNames: ['Corporate:Accounts-Payable'],
      accountIds: ['80000001-1234567890'],
      accountType: 'bank',
      basis: 'accrual',
      classFullNames: ['Department:Marketing'],
      classIds: ['80000001-1234567890'],
      columnsToReturn: 'all',
      detailLevel: 'all_except_summary',
      entityFullNames: ['ABC Corporation:Website Redesign Project'],
      entityIds: ['80000001-1234567890'],
      entityType: 'customer',
      includeSubcolumns: true,
      itemFullNames: ['Services:Consulting'],
      itemIds: ['80000001-1234567890'],
      itemType: 'inventory',
      postingStatus: 'posting',
      reportCalendar: 'calendar_year',
      reportDateFrom: '2025-01-01',
      reportDateMacro: 'this_year_to_date',
      reportDateTo: '2025-02-01',
      reportType: 'custom_summary',
      rowsToReturn: 'all',
      transactionTypes: ['invoice', 'sales_receipt'],
      updatedAfter: '2025-01-01',
      updatedBefore: '2025-02-01',
      updatedDateMacro: 'this_month_to_date',
    });
  });

  test('generalDetail: only required params', async () => {
    const responsePromise = conductor.qbd.reports.generalDetail({
      reportType: '1099_detail',
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('generalDetail: required and optional params', async () => {
    const response = await conductor.qbd.reports.generalDetail({
      reportType: '1099_detail',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountFullNames: ['Corporate:Accounts-Payable'],
      accountIds: ['80000001-1234567890'],
      accountsToInclude: 'all',
      accountType: 'bank',
      basis: 'accrual',
      classFullNames: ['Department:Marketing'],
      classIds: ['80000001-1234567890'],
      detailLevel: 'all_except_summary',
      entityFullNames: ['ABC Corporation:Website Redesign Project'],
      entityIds: ['80000001-1234567890'],
      entityType: 'customer',
      includeColumns: ['date', 'transaction_type', 'amount'],
      itemFullNames: ['Services:Consulting'],
      itemIds: ['80000001-1234567890'],
      itemType: 'inventory',
      openBalanceAsOf: 'report_end_date',
      postingStatus: 'posting',
      reportDateFrom: '2025-01-01',
      reportDateMacro: 'this_year_to_date',
      reportDateTo: '2025-02-01',
      summarizeRowsBy: 'account',
      transactionTypes: ['invoice', 'sales_receipt'],
      updatedAfter: '2025-01-01',
      updatedBefore: '2025-02-01',
      updatedDateMacro: 'this_month_to_date',
    });
  });

  test('generalSummary: only required params', async () => {
    const responsePromise = conductor.qbd.reports.generalSummary({
      reportType: 'balance_sheet_by_class',
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('generalSummary: required and optional params', async () => {
    const response = await conductor.qbd.reports.generalSummary({
      reportType: 'balance_sheet_by_class',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountFullNames: ['Corporate:Accounts-Payable'],
      accountIds: ['80000001-1234567890'],
      accountType: 'bank',
      basis: 'accrual',
      classFullNames: ['Department:Marketing'],
      classIds: ['80000001-1234567890'],
      columnsToReturn: 'all',
      detailLevel: 'all_except_summary',
      entityFullNames: ['ABC Corporation:Website Redesign Project'],
      entityIds: ['80000001-1234567890'],
      entityType: 'customer',
      includeSubcolumns: true,
      itemFullNames: ['Services:Consulting'],
      itemIds: ['80000001-1234567890'],
      itemType: 'inventory',
      postingStatus: 'posting',
      reportCalendar: 'calendar_year',
      reportDateFrom: '2025-01-01',
      reportDateMacro: 'this_year_to_date',
      reportDateTo: '2025-02-01',
      rowsToReturn: 'all',
      summarizeColumnsBy: 'month',
      transactionTypes: ['invoice', 'sales_receipt'],
      updatedAfter: '2025-01-01',
      updatedBefore: '2025-02-01',
      updatedDateMacro: 'this_month_to_date',
    });
  });

  test('job: only required params', async () => {
    const responsePromise = conductor.qbd.reports.job({
      reportType: 'item_estimates_vs_actuals',
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('job: required and optional params', async () => {
    const response = await conductor.qbd.reports.job({
      reportType: 'item_estimates_vs_actuals',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountFullNames: ['Corporate:Accounts-Payable'],
      accountIds: ['80000001-1234567890'],
      accountType: 'bank',
      classFullNames: ['Department:Marketing'],
      classIds: ['80000001-1234567890'],
      detailLevel: 'all_except_summary',
      entityFullNames: ['ABC Corporation:Website Redesign Project'],
      entityIds: ['80000001-1234567890'],
      entityType: 'customer',
      includeSubcolumns: true,
      itemFullNames: ['Services:Consulting'],
      itemIds: ['80000001-1234567890'],
      itemType: 'inventory',
      postingStatus: 'posting',
      reportDateFrom: '2025-01-01',
      reportDateMacro: 'this_year_to_date',
      reportDateTo: '2025-02-01',
      summarizeColumnsBy: 'month',
      transactionTypes: ['invoice', 'sales_receipt'],
      updatedAfter: '2025-01-01',
      updatedBefore: '2025-02-01',
      updatedDateMacro: 'this_month_to_date',
    });
  });

  test('payrollDetail: only required params', async () => {
    const responsePromise = conductor.qbd.reports.payrollDetail({
      reportType: 'employee_state_taxes_detail',
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('payrollDetail: required and optional params', async () => {
    const response = await conductor.qbd.reports.payrollDetail({
      reportType: 'employee_state_taxes_detail',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountFullNames: ['Corporate:Accounts-Payable'],
      accountIds: ['80000001-1234567890'],
      accountsToInclude: 'all',
      accountType: 'bank',
      classFullNames: ['Department:Marketing'],
      classIds: ['80000001-1234567890'],
      detailLevel: 'all_except_summary',
      entityFullNames: ['ABC Corporation:Website Redesign Project'],
      entityIds: ['80000001-1234567890'],
      entityType: 'customer',
      includeColumns: ['date', 'transaction_type', 'amount'],
      itemFullNames: ['Services:Consulting'],
      itemIds: ['80000001-1234567890'],
      itemType: 'inventory',
      openBalanceAsOf: 'report_end_date',
      postingStatus: 'posting',
      reportDateFrom: '2025-01-01',
      reportDateMacro: 'this_year_to_date',
      reportDateTo: '2025-02-01',
      summarizeRowsBy: 'account',
      updatedAfter: '2025-01-01',
      updatedBefore: '2025-02-01',
      updatedDateMacro: 'this_month_to_date',
    });
  });

  test('payrollSummary: only required params', async () => {
    const responsePromise = conductor.qbd.reports.payrollSummary({
      reportType: 'employee_earnings_summary',
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('payrollSummary: required and optional params', async () => {
    const response = await conductor.qbd.reports.payrollSummary({
      reportType: 'employee_earnings_summary',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountFullNames: ['Corporate:Accounts-Payable'],
      accountIds: ['80000001-1234567890'],
      accountType: 'bank',
      classFullNames: ['Department:Marketing'],
      classIds: ['80000001-1234567890'],
      columnsToReturn: 'all',
      detailLevel: 'all_except_summary',
      entityFullNames: ['ABC Corporation:Website Redesign Project'],
      entityIds: ['80000001-1234567890'],
      entityType: 'customer',
      includeSubcolumns: true,
      itemFullNames: ['Services:Consulting'],
      itemIds: ['80000001-1234567890'],
      itemType: 'inventory',
      postingStatus: 'posting',
      reportCalendar: 'calendar_year',
      reportDateFrom: '2025-01-01',
      reportDateMacro: 'this_year_to_date',
      reportDateTo: '2025-02-01',
      rowsToReturn: 'all',
      summarizeColumnsBy: 'month',
      updatedAfter: '2025-01-01',
      updatedBefore: '2025-02-01',
      updatedDateMacro: 'this_month_to_date',
    });
  });

  test('time: only required params', async () => {
    const responsePromise = conductor.qbd.reports.time({
      reportType: 'time_by_item',
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('time: required and optional params', async () => {
    const response = await conductor.qbd.reports.time({
      reportType: 'time_by_item',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      classFullNames: ['Department:Marketing'],
      classIds: ['80000001-1234567890'],
      columnsToReturn: 'all',
      entityFullNames: ['ABC Corporation:Website Redesign Project'],
      entityIds: ['80000001-1234567890'],
      entityType: 'customer',
      includeSubcolumns: true,
      itemFullNames: ['Services:Consulting'],
      itemIds: ['80000001-1234567890'],
      itemType: 'inventory',
      reportCalendar: 'calendar_year',
      reportDateFrom: '2025-01-01',
      reportDateMacro: 'this_year_to_date',
      reportDateTo: '2025-02-01',
      rowsToReturn: 'all',
      summarizeColumnsBy: 'month',
    });
  });
});
