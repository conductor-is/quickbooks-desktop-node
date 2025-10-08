// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Transfers extends APIResource {
  /**
   * Creates a new transfer.
   *
   * @example
   * ```ts
   * const transfer = await conductor.qbd.transfers.create({
   *   amount: '1000.00',
   *   sourceAccountId: '80000001-1234567890',
   *   targetAccountId: '80000001-1234567890',
   *   transactionDate: '2024-10-01',
   *   'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  create(params: TransferCreateParams, options?: RequestOptions): APIPromise<Transfer> {
    const { 'Conductor-End-User-Id': conductorEndUserID, ...body } = params;
    return this._client.post('/quickbooks-desktop/transfers', {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }

  /**
   * Retrieves a transfer by ID.
   *
   * @example
   * ```ts
   * const transfer = await conductor.qbd.transfers.retrieve(
   *   '123ABC-1234567890',
   *   { 'Conductor-End-User-Id': 'end_usr_1234567abcdefg' },
   * );
   * ```
   */
  retrieve(id: string, params: TransferRetrieveParams, options?: RequestOptions): APIPromise<Transfer> {
    const { 'Conductor-End-User-Id': conductorEndUserID } = params;
    return this._client.get(path`/quickbooks-desktop/transfers/${id}`, {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }

  /**
   * Updates an existing transfer.
   *
   * @example
   * ```ts
   * const transfer = await conductor.qbd.transfers.update(
   *   '123ABC-1234567890',
   *   {
   *     revisionNumber: '1721172183',
   *     'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
   *   },
   * );
   * ```
   */
  update(id: string, params: TransferUpdateParams, options?: RequestOptions): APIPromise<Transfer> {
    const { 'Conductor-End-User-Id': conductorEndUserID, ...body } = params;
    return this._client.post(path`/quickbooks-desktop/transfers/${id}`, {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }

  /**
   * Returns a list of transfers. Use the `cursor` parameter to paginate through the
   * results.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const transfer of conductor.qbd.transfers.list({
   *   'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(params: TransferListParams, options?: RequestOptions): PagePromise<TransfersCursorPage, Transfer> {
    const { 'Conductor-End-User-Id': conductorEndUserID, ...query } = params;
    return this._client.getAPIList('/quickbooks-desktop/transfers', CursorPage<Transfer>, {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }
}

export type TransfersCursorPage = CursorPage<Transfer>;

export interface Transfer {
  /**
   * The unique identifier assigned by QuickBooks to this transfer. This ID is unique
   * across all transaction types.
   */
  id: string;

  /**
   * The monetary amount of this transfer, represented as a decimal string.
   */
  amount: string;

  /**
   * The transfer's class. Classes can be used to categorize objects into meaningful
   * segments, such as department, location, or type of work. In QuickBooks, class
   * tracking is off by default.
   */
  class: Transfer.Class | null;

  /**
   * The date and time when this transfer was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * A memo or note for this transfer.
   */
  memo: string | null;

  /**
   * The type of object. This value is always `"qbd_transfer"`.
   */
  objectType: 'qbd_transfer';

  /**
   * The current QuickBooks-assigned revision number of this transfer object, which
   * changes each time the object is modified. When updating this object, you must
   * provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The account from which money will be transferred.
   */
  sourceAccount: Transfer.SourceAccount;

  /**
   * The balance of the account from which money will be transferred.
   */
  sourceAccountBalance: string | null;

  /**
   * The account to which money will be transferred.
   */
  targetAccount: Transfer.TargetAccount;

  /**
   * The balance of the account to which money will be transferred.
   */
  targetAccountBalance: string | null;

  /**
   * The date of this transfer, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * The date and time when this transfer was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace Transfer {
  /**
   * The transfer's class. Classes can be used to categorize objects into meaningful
   * segments, such as department, location, or type of work. In QuickBooks, class
   * tracking is off by default.
   */
  export interface Class {
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
   * The account from which money will be transferred.
   */
  export interface SourceAccount {
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
   * The account to which money will be transferred.
   */
  export interface TargetAccount {
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

export interface TransferCreateParams {
  /**
   * Body param: The monetary amount of this transfer, represented as a decimal
   * string.
   */
  amount: string;

  /**
   * Body param: The account from which money will be transferred.
   */
  sourceAccountId: string;

  /**
   * Body param: The account to which money will be transferred.
   */
  targetAccountId: string;

  /**
   * Body param: The date of this transfer, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;

  /**
   * Body param: The transfer's class. Classes can be used to categorize objects into
   * meaningful segments, such as department, location, or type of work. In
   * QuickBooks, class tracking is off by default.
   */
  classId?: string;

  /**
   * Body param: A memo or note for this transfer.
   */
  memo?: string;
}

export interface TransferRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;
}

export interface TransferUpdateParams {
  /**
   * Body param: The current QuickBooks-assigned revision number of the transfer
   * object you are updating, which you can get by fetching the object first. Provide
   * the most recent `revisionNumber` to ensure you're working with the latest data;
   * otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;

  /**
   * Body param: The monetary amount of this transfer, represented as a decimal
   * string.
   */
  amount?: string;

  /**
   * Body param: The transfer's class. Classes can be used to categorize objects into
   * meaningful segments, such as department, location, or type of work. In
   * QuickBooks, class tracking is off by default.
   */
  classId?: string;

  /**
   * Body param: A memo or note for this transfer.
   */
  memo?: string;

  /**
   * Body param: The account from which money will be transferred.
   */
  sourceAccountId?: string;

  /**
   * Body param: The account to which money will be transferred.
   */
  targetAccountId?: string;

  /**
   * Body param: The date of this transfer, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate?: string;
}

export interface TransferListParams extends CursorPageParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;

  /**
   * Query param: Filter for specific transfers by their QuickBooks-assigned unique
   * identifier(s).
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  ids?: Array<string>;

  /**
   * Query param: Filter for transfers whose `date` field is on or after this date,
   * in ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **start of the
   * specified day** in the local timezone of the end-user's computer (e.g.,
   * `2025-01-01` → `2025-01-01T00:00:00`).
   */
  transactionDateFrom?: string;

  /**
   * Query param: Filter for transfers whose `date` field is on or before this date,
   * in ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **end of the specified
   * day** in the local timezone of the end-user's computer (e.g., `2025-01-01` →
   * `2025-01-01T23:59:59`).
   */
  transactionDateTo?: string;

  /**
   * Query param: Filter for transfers updated on or after this date/time. Accepts
   * the following ISO 8601 formats:
   *
   * - **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the
   *   **start of the specified day** in the local timezone of the end-user's
   *   computer (e.g., `2025-01-01` → `2025-01-01T00:00:00`).
   * - **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop
   *   interprets the timestamp in the local timezone of the end-user's computer.
   * - **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop
   *   interprets the timestamp using the specified timezone.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for transfers updated on or before this date/time. Accepts
   * the following ISO 8601 formats:
   *
   * - **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the
   *   **end of the specified day** in the local timezone of the end-user's computer
   *   (e.g., `2025-01-01` → `2025-01-01T23:59:59`).
   * - **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop
   *   interprets the timestamp in the local timezone of the end-user's computer.
   * - **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop
   *   interprets the timestamp using the specified timezone.
   */
  updatedBefore?: string;
}

export declare namespace Transfers {
  export {
    type Transfer as Transfer,
    type TransfersCursorPage as TransfersCursorPage,
    type TransferCreateParams as TransferCreateParams,
    type TransferRetrieveParams as TransferRetrieveParams,
    type TransferUpdateParams as TransferUpdateParams,
    type TransferListParams as TransferListParams,
  };
}
