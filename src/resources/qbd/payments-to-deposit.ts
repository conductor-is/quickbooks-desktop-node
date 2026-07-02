// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class PaymentsToDeposit extends APIResource {
  /**
   * Lists received customer payments that are currently available to include in a
   * QuickBooks Desktop deposit. Use each result's `paymentTransactionId` and, when
   * present, `paymentTransactionLineId` as the corresponding fields on a deposit
   * line.
   *
   * **NOTE:** QuickBooks Desktop does not support pagination for payments to
   * deposit; hence, there is no `cursor` parameter. Users typically have few
   * payments to deposit.
   *
   * @example
   * ```ts
   * const paymentsToDeposits =
   *   await conductor.qbd.paymentsToDeposit.list({
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(
    params: PaymentsToDepositListParams,
    options?: RequestOptions,
  ): APIPromise<PaymentsToDepositListResponse> {
    const { conductorEndUserId } = params;
    return this._client.get('/quickbooks-desktop/payments-to-deposit', {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }
}

export interface PaymentToDeposit {
  /**
   * The monetary amount of this received payment that is currently available to
   * deposit, represented as a decimal string.
   */
  amount: string;

  /**
   * The monetary amount of this payment to deposit converted to the home currency of
   * the QuickBooks company file. Represented as a decimal string.
   */
  amountInHomeCurrency: string | null;

  /**
   * The payment to deposit's currency. For built-in currencies, the name and code
   * are standard ISO 4217 international values. For user-defined currencies, all
   * values are editable.
   */
  currency: PaymentToDeposit.Currency | null;

  /**
   * The customer or customer-job associated with this payment to deposit.
   */
  customer: PaymentToDeposit.Customer | null;

  /**
   * The market exchange rate between this payment to deposit's currency and the home
   * currency in QuickBooks at the time of this transaction. Represented as a decimal
   * value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).
   */
  exchangeRate: number | null;

  /**
   * The ID of the received payment that is available to deposit. Pass this value as
   * `paymentTransactionId` when creating a deposit line.
   */
  paymentTransactionId: string;

  /**
   * The ID of the specific received-payment line that is available to deposit. If
   * this value is not `null`, pass it as `paymentTransactionLineId` with
   * `paymentTransactionId` when creating a deposit line.
   */
  paymentTransactionLineId: string | null;

  /**
   * The case-sensitive user-defined reference number for this payment to deposit,
   * which can be used to identify the transaction in QuickBooks. This value is not
   * required to be unique and can be arbitrarily changed by the QuickBooks user.
   */
  refNumber: string | null;

  /**
   * The date of this payment to deposit, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * The type of transaction for this payment to deposit.
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

export namespace PaymentToDeposit {
  /**
   * The payment to deposit's currency. For built-in currencies, the name and code
   * are standard ISO 4217 international values. For user-defined currencies, all
   * values are editable.
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
   * The customer or customer-job associated with this payment to deposit.
   */
  export interface Customer {
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

export interface PaymentsToDepositListResponse {
  /**
   * The array of payments to deposit.
   */
  data: Array<PaymentToDeposit>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface PaymentsToDepositListParams {
  /**
   * The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;
}

export declare namespace PaymentsToDeposit {
  export {
    type PaymentToDeposit as PaymentToDeposit,
    type PaymentsToDepositListResponse as PaymentsToDepositListResponse,
    type PaymentsToDepositListParams as PaymentsToDepositListParams,
  };
}
