// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class DeletedListObjects extends APIResource {
  /**
   * Lists deleted non-transaction list-objects (e.g., customers, vendors, employees,
   * items) from the last 90 days. Results are grouped by list-object type and
   * ordered by actual delete time (ascending). For deleted transactions, see the
   * deleted-transactions endpoint.
   *
   * @example
   * ```ts
   * const deletedListObjects =
   *   await conductor.qbd.deletedListObjects.list({
   *     objectType: ['customer'],
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(
    params: DeletedListObjectListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DeletedListObjectListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/deleted-list-objects', {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
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
   * (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user's time zone
   * in QuickBooks.
   */
  createdAt: string;

  /**
   * The date and time when this deleted list-object was deleted, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user's time zone
   * in QuickBooks.
   */
  deletedAt: string;

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
   * Query param: Filter for deleted list-objects by their list-object type. Specify
   * one or more types.
   */
  objectType: Array<
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
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for deleted list-objects deleted on or after this date and
   * time, within the last 90 days (QuickBooks limit), in ISO 8601 format
   * (YYYY-MM-DDTHH:mm:ss). If you only provide a date (YYYY-MM-DD), the time is
   * assumed to be 00:00:00 of that day.
   */
  deletedAfter?: string;

  /**
   * Query param: Filter for deleted list-objects deleted on or before this date and
   * time, within the last 90 days (QuickBooks limit), in ISO 8601 format
   * (YYYY-MM-DDTHH:mm:ss). If you only provide a date (YYYY-MM-DD), the time is
   * assumed to be 23:59:59 of that day.
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
