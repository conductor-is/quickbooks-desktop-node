// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class DeletedTransactions extends APIResource {
  /**
   * Lists deleted transactions of the specified type(s) (e.g., invoice, bill,
   * estimate) in the last 90 days. Results are grouped by transaction type and
   * ordered by actual delete time (ascending).
   *
   * NOTE: For deleted non-transaction objects (e.g., customer, vendor, employee),
   * see the deleted-objects endpoint.
   *
   * @example
   * ```ts
   * const deletedTransactions =
   *   await conductor.qbd.deletedTransactions.list({
   *     transactionType: ['invoice'],
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(
    params: DeletedTransactionListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DeletedTransactionListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/deleted-transactions', {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export interface DeletedTransaction {
  /**
   * The unique identifier assigned by QuickBooks to this deleted transaction. This
   * ID is unique across all transaction types.
   */
  id: string;

  /**
   * The date and time when this deleted transaction was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user's time zone
   * in QuickBooks.
   */
  createdAt: string;

  /**
   * The date and time when this deleted transaction was deleted, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user's time zone
   * in QuickBooks.
   */
  deletedAt: string;

  /**
   * The type of object. This value is always `"qbd_deleted_transaction"`.
   */
  objectType: 'qbd_deleted_transaction';

  /**
   * The type of deleted transaction.
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
    | 'purchase_order'
    | 'receive_payment'
    | 'sales_order'
    | 'sales_receipt'
    | 'sales_tax_payment_check'
    | 'time_tracking'
    | 'transfer_inventory'
    | 'vehicle_mileage'
    | 'vendor_credit';
}

export interface DeletedTransactionListResponse {
  /**
   * The array of deleted transactions.
   */
  data: Array<DeletedTransaction>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface DeletedTransactionListParams {
  /**
   * Query param: Filter for deleted transactions by their transaction type. Specify
   * one or more types.
   */
  transactionType: Array<
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
    | 'purchase_order'
    | 'receive_payment'
    | 'sales_order'
    | 'sales_receipt'
    | 'sales_tax_payment_check'
    | 'time_tracking'
    | 'transfer_inventory'
    | 'vehicle_mileage'
    | 'vendor_credit'
  >;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for deleted transactions deleted on or after this date and
   * time, within the last 90 days (QuickBooks limit), in ISO 8601 format
   * (YYYY-MM-DDTHH:mm:ss). If you only provide a date (YYYY-MM-DD), the time is
   * assumed to be 00:00:00 of that day.
   */
  deletedAfter?: string;

  /**
   * Query param: Filter for deleted transactions deleted on or before this date and
   * time, within the last 90 days (QuickBooks limit), in ISO 8601 format
   * (YYYY-MM-DDTHH:mm:ss). If you only provide a date (YYYY-MM-DD), the time is
   * assumed to be 23:59:59 of that day.
   */
  deletedBefore?: string;
}

export declare namespace DeletedTransactions {
  export {
    type DeletedTransaction as DeletedTransaction,
    type DeletedTransactionListResponse as DeletedTransactionListResponse,
    type DeletedTransactionListParams as DeletedTransactionListParams,
  };
}
