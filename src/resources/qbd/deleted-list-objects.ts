// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class DeletedListObjects extends APIResource {
  /**
   * Lists deleted non-transaction list-objects (e.g., customers, vendors, employees,
   * items) from the last 90 days. Results are grouped by list-object type and
   * ordered by actual delete time (ascending). For deleted transactions (e.g.,
   * invoices, bills, estimates), see the deleted-transactions endpoint.
   *
   * @example
   * ```ts
   * const deletedListObjects =
   *   await conductor.qbd.deletedListObjects.list({
   *     objectTypes: ['customer'],
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(
    params: DeletedListObjectListParams,
    options?: RequestOptions,
  ): APIPromise<DeletedListObjectListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/deleted-list-objects', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }
}

export interface DeletedListObject {
  /**
   * The unique identifier assigned by QuickBooks to this deleted list-object. This
   * ID is unique across all deleted list-objects but not across different QuickBooks
   * object types.
   */
  id: string;

  /**
   * The date and time when this deleted list-object was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The date and time when this deleted list-object was deleted, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  deletedAt: string;

  /**
   * The case-insensitive fully-qualified unique name of this deleted list-object,
   * formed by combining the names of its hierarchical parent objects with its own
   * `name`, separated by colons. For example, if a deleted list-object is under
   * "Parent" and has the `name` "Child", its `fullName` would be "Parent:Child".
   *
   * **NOTE**: Unlike `name`, `fullName` is guaranteed to be unique across all
   * deleted list-object objects. However, `fullName` can still be arbitrarily
   * changed by the QuickBooks user when they modify the underlying `name` field.
   */
  fullName: string | null;

  /**
   * The type of deleted list object (i.e., non-transaction).
   */
  listType:
    | 'account'
    | 'billing_rate'
    | 'class'
    | 'currency'
    | 'customer'
    | 'customer_message'
    | 'customer_type'
    | 'date_driven_terms'
    | 'employee'
    | 'inventory_site'
    | 'item_discount'
    | 'item_fixed_asset'
    | 'item_group'
    | 'item_inventory'
    | 'item_inventory_assembly'
    | 'item_non_inventory'
    | 'item_other_charge'
    | 'item_payment'
    | 'item_sales_tax'
    | 'item_sales_tax_group'
    | 'item_service'
    | 'item_subtotal'
    | 'job_type'
    | 'other_name'
    | 'payment_method'
    | 'payroll_item_non_wage'
    | 'payroll_item_wage'
    | 'price_level'
    | 'sales_representative'
    | 'sales_tax_code'
    | 'ship_method'
    | 'standard_terms'
    | 'to_do'
    | 'unit_of_measure_set'
    | 'vehicle'
    | 'vendor'
    | 'vendor_type'
    | 'workers_comp_code';

  /**
   * The type of object. This value is always `"qbd_deleted_list_object"`.
   */
  objectType: 'qbd_deleted_list_object';
}

export interface DeletedListObjectListResponse {
  /**
   * The array of deleted list-objects.
   */
  data: Array<DeletedListObject>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface DeletedListObjectListParams {
  /**
   * Query param: Filter for deleted list-objects by their list-object type(s).
   */
  objectTypes: Array<
    | 'account'
    | 'billing_rate'
    | 'class'
    | 'currency'
    | 'customer'
    | 'customer_message'
    | 'customer_type'
    | 'date_driven_terms'
    | 'employee'
    | 'inventory_site'
    | 'item_discount'
    | 'item_fixed_asset'
    | 'item_group'
    | 'item_inventory'
    | 'item_inventory_assembly'
    | 'item_non_inventory'
    | 'item_other_charge'
    | 'item_payment'
    | 'item_sales_tax'
    | 'item_sales_tax_group'
    | 'item_service'
    | 'item_subtotal'
    | 'job_type'
    | 'other_name'
    | 'payment_method'
    | 'payroll_item_non_wage'
    | 'payroll_item_wage'
    | 'price_level'
    | 'sales_representative'
    | 'sales_tax_code'
    | 'ship_method'
    | 'standard_terms'
    | 'to_do'
    | 'unit_of_measure_set'
    | 'vehicle'
    | 'vendor'
    | 'vendor_type'
    | 'workers_comp_code'
  >;

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for deleted list-objects deleted on or after this date/time,
   * within the last 90 days (QuickBooks limit). Accepts the following ISO 8601
   * formats:
   *
   * - **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the
   *   **start of the specified day** in the local timezone of the end-user's
   *   computer (e.g., `2025-01-01` → `2025-01-01T00:00:00`).
   * - **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop
   *   interprets the timestamp in the local timezone of the end-user's computer.
   * - **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop
   *   interprets the timestamp using the specified timezone.
   */
  deletedAfter?: string;

  /**
   * Query param: Filter for deleted list-objects deleted on or before this
   * date/time, within the last 90 days (QuickBooks limit). Accepts the following ISO
   * 8601 formats:
   *
   * - **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the
   *   **end of the specified day** in the local timezone of the end-user's computer
   *   (e.g., `2025-01-01` → `2025-01-01T23:59:59`).
   * - **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop
   *   interprets the timestamp in the local timezone of the end-user's computer.
   * - **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop
   *   interprets the timestamp using the specified timezone.
   */
  deletedBefore?: string;
}

export declare namespace DeletedListObjects {
  export {
    type DeletedListObject as DeletedListObject,
    type DeletedListObjectListResponse as DeletedListObjectListResponse,
    type DeletedListObjectListParams as DeletedListObjectListParams,
  };
}
