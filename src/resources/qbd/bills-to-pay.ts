// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class BillsToPay extends APIResource {
  /**
   * Lists open vendor bills and available vendor credits for a specific QuickBooks
   * Desktop vendor. Use each `bill.billId` as `applyToTransactions[].transactionId`
   * in bill-payment requests. To apply a returned credit, place it under the target
   * bill's `applyToTransactions[].applyCredits[]` entry, set `creditTransactionId`
   * to `credit.creditTransactionId`, and choose an `appliedAmount` that does not
   * exceed `credit.creditRemaining` or the target bill's remaining amount due.
   *
   * **NOTE:** QuickBooks Desktop does not support pagination for bills to pay;
   * hence, there is no `cursor` parameter. Users typically have few bills to pay.
   *
   * @example
   * ```ts
   * const billsToPays = await conductor.qbd.billsToPay.list({
   *   vendorId: '80000001-1234567890',
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  list(params: BillsToPayListParams, options?: RequestOptions): APIPromise<BillsToPayListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/bills-to-pay', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }
}

export interface BillToPay {
  /**
   * The open bill with a positive amount due that can be paid for the requested
   * vendor. In each bills-to-pay result, either `bill` is an object and `credit` is
   * `null`, or `credit` is an object and `bill` is `null`.
   */
  bill: BillToPay.Bill | null;

  /**
   * The vendor credit linked to the requested vendor that can be applied to open
   * bills. In each bills-to-pay result, either `credit` is an object and `bill` is
   * `null`, or `bill` is an object and `credit` is `null`.
   */
  credit: BillToPay.Credit | null;
}

export namespace BillToPay {
  /**
   * The open bill with a positive amount due that can be paid for the requested
   * vendor. In each bills-to-pay result, either `bill` is an object and `credit` is
   * `null`, or `credit` is an object and `bill` is `null`.
   */
  export interface Bill {
    /**
     * The amount QuickBooks Desktop reports as due and available to pay for this open
     * bill, represented as a decimal string. Use this value as the candidate
     * `applyToTransactions[].paymentAmount` when creating a bill payment; reduce the
     * payment by any credits you apply.
     */
    amountDue: string;

    /**
     * The monetary amount due for this payable bill converted to the home currency of
     * the QuickBooks company file. Represented as a decimal string.
     */
    amountDueInHomeCurrency: string | null;

    /**
     * The ID of the open bill available to pay. Pass this value as `transactionId` in
     * a bill-payment `applyToTransactions` entry.
     */
    billId: string;

    /**
     * The payable bill's currency. For built-in currencies, the name and code are
     * standard ISO 4217 international values. For user-defined currencies, all values
     * are editable.
     */
    currency: Bill.Currency | null;

    /**
     * The date by which this payable bill must be paid, in ISO 8601 format
     * (YYYY-MM-DD).
     */
    dueDate: string | null;

    /**
     * The market exchange rate between this payable bill's currency and the home
     * currency in QuickBooks at the time of this transaction. Represented as a decimal
     * value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).
     */
    exchangeRate: number | null;

    /**
     * The Accounts-Payable (A/P) account to which this payable bill is assigned, used
     * for accounts-payable tracking.
     *
     * **IMPORTANT**: If this payable bill is linked to other transactions, this A/P
     * account must match the `payablesAccount` used in those other transactions.
     */
    payablesAccount: Bill.PayablesAccount;

    /**
     * The case-sensitive user-defined reference number for this payable bill, which
     * can be used to identify the transaction in QuickBooks. This value is not
     * required to be unique and can be arbitrarily changed by the QuickBooks user.
     */
    refNumber: string | null;

    /**
     * The date of this payable bill, in ISO 8601 format (YYYY-MM-DD).
     */
    transactionDate: string;

    /**
     * The type of transaction for this payable bill.
     */
    transactionType:
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
      | 'unknown';
  }

  export namespace Bill {
    /**
     * The payable bill's currency. For built-in currencies, the name and code are
     * standard ISO 4217 international values. For user-defined currencies, all values
     * are editable.
     */
    export interface Currency {
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
     * The Accounts-Payable (A/P) account to which this payable bill is assigned, used
     * for accounts-payable tracking.
     *
     * **IMPORTANT**: If this payable bill is linked to other transactions, this A/P
     * account must match the `payablesAccount` used in those other transactions.
     */
    export interface PayablesAccount {
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
   * The vendor credit linked to the requested vendor that can be applied to open
   * bills. In each bills-to-pay result, either `credit` is an object and `bill` is
   * `null`, or `bill` is an object and `credit` is `null`.
   */
  export interface Credit {
    /**
     * The remaining vendor credit available to apply to open bills, represented as a
     * decimal string. When applying this credit to a bill-payment request, choose an
     * `applyToTransactions[].applyCredits[].appliedAmount` that does not exceed this
     * value or the target bill's remaining amount due.
     */
    creditRemaining: string;

    /**
     * The remaining balance of this applicable credit converted to the home currency
     * of the QuickBooks company file. Represented as a decimal string.
     */
    creditRemainingInHomeCurrency: string | null;

    /**
     * The ID of the credit transaction available to apply to the vendor's open bills.
     * To apply this credit in a bill-payment request, place it under the target bill's
     * `applyToTransactions[].applyCredits[]` entry and pass this value as
     * `creditTransactionId`.
     */
    creditTransactionId: string;

    /**
     * The applicable credit's currency. For built-in currencies, the name and code are
     * standard ISO 4217 international values. For user-defined currencies, all values
     * are editable.
     */
    currency: Credit.Currency | null;

    /**
     * The market exchange rate between this applicable credit's currency and the home
     * currency in QuickBooks at the time of this transaction. Represented as a decimal
     * value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).
     */
    exchangeRate: number | null;

    /**
     * The Accounts-Payable (A/P) account to which this applicable credit is assigned,
     * used for accounts-payable tracking.
     *
     * **IMPORTANT**: If this applicable credit is linked to other transactions, this
     * A/P account must match the `payablesAccount` used in those other transactions.
     */
    payablesAccount: Credit.PayablesAccount;

    /**
     * The case-sensitive user-defined reference number for this applicable credit,
     * which can be used to identify the transaction in QuickBooks. This value is not
     * required to be unique and can be arbitrarily changed by the QuickBooks user.
     */
    refNumber: string | null;

    /**
     * The date of this applicable credit, in ISO 8601 format (YYYY-MM-DD).
     */
    transactionDate: string;

    /**
     * The type of transaction for this applicable credit.
     */
    transactionType:
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
      | 'unknown';
  }

  export namespace Credit {
    /**
     * The applicable credit's currency. For built-in currencies, the name and code are
     * standard ISO 4217 international values. For user-defined currencies, all values
     * are editable.
     */
    export interface Currency {
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
     * The Accounts-Payable (A/P) account to which this applicable credit is assigned,
     * used for accounts-payable tracking.
     *
     * **IMPORTANT**: If this applicable credit is linked to other transactions, this
     * A/P account must match the `payablesAccount` used in those other transactions.
     */
    export interface PayablesAccount {
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
}

export interface BillsToPayListResponse {
  /**
   * The array of bills-to-pay records. Each record has either a `bill` object or a
   * `credit` object, and the other branch is `null`.
   */
  data: Array<BillToPay>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface BillsToPayListParams {
  /**
   * Query param: The vendor whose open bills and available credits should be
   * returned.
   */
  vendorId: string;

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for open bills and available credits in these currencies.
   */
  currencyIds?: Array<string>;

  /**
   * Query param: Filter the bill branch to open bills due on or before this date, in
   * ISO 8601 format (YYYY-MM-DD). If omitted, QuickBooks Desktop returns open bills
   * from all due dates. Available credits can still be returned because credits do
   * not have a due date.
   */
  dueDate?: string;

  /**
   * Query param: Filter for open bills and available credits assigned to this
   * Accounts-Payable account. If omitted, QuickBooks Desktop uses the default A/P
   * account configured in the company file.
   */
  payablesAccountId?: string;
}

export declare namespace BillsToPay {
  export {
    type BillToPay as BillToPay,
    type BillsToPayListResponse as BillsToPayListResponse,
    type BillsToPayListParams as BillsToPayListParams,
  };
}
