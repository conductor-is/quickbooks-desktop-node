// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class CustomFieldDefinitions extends APIResource {
  /**
   * Creates a custom field and assigns it to the types of records you list. To give
   * it a value on a record, use the set-custom-fields endpoint of that record's
   * type.
   *
   * @example
   * ```ts
   * const customFieldDefinition =
   *   await conductor.qbd.customFieldDefinitions.create({
   *     name: 'Customer Rating',
   *     objectTypes: ['customer'],
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(
    params: CustomFieldDefinitionCreateParams,
    options?: RequestOptions,
  ): APIPromise<CustomFieldDefinition> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/custom-field-definitions', {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Renames a custom field or changes the types of records it applies to. The `id`
   * in the path is the custom field's current name.
   *
   * @example
   * ```ts
   * const customFieldDefinition =
   *   await conductor.qbd.customFieldDefinitions.update(
   *     'Customer Rating',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  update(
    id: string,
    params: CustomFieldDefinitionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CustomFieldDefinition> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post(path`/quickbooks-desktop/custom-field-definitions/${id}`, {
      body,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Returns the company file's custom field definitions: each custom field's name,
   * the type of its values, and the types of records it applies to. A record's
   * `customFields` include only the custom fields that have a value on that record,
   * so use this list to find every custom field you can set.
   *
   * @example
   * ```ts
   * const customFieldDefinitions =
   *   await conductor.qbd.customFieldDefinitions.list({
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(
    params: CustomFieldDefinitionListParams,
    options?: RequestOptions,
  ): APIPromise<CustomFieldDefinitionListResponse> {
    const { conductorEndUserId, ...query } = params;
    return this._client.get('/quickbooks-desktop/custom-field-definitions', {
      query,
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }

  /**
   * Permanently deletes a custom field definition.
   *
   * **IMPORTANT**: QuickBooks also deletes every value stored under the custom
   * field, on every record and transaction line in the company file, without a
   * warning. This cannot be undone. After deleting a private custom field, its owner
   * cannot create another with the same name.
   *
   * @example
   * ```ts
   * const customFieldDefinition =
   *   await conductor.qbd.customFieldDefinitions.delete(
   *     'Customer Rating',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  delete(
    id: string,
    params: CustomFieldDefinitionDeleteParams,
    options?: RequestOptions,
  ): APIPromise<CustomFieldDefinitionDeleteResponse> {
    const { conductorEndUserId, ownerId } = params;
    return this._client.delete(path`/quickbooks-desktop/custom-field-definitions/${id}`, {
      query: { ownerId },
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserId }, options?.headers]),
    });
  }
}

export interface CustomFieldDefinition {
  /**
   * The identifier of this custom field definition, which is its `name`, so it
   * changes when the definition is renamed.
   */
  id: string;

  /**
   * The format QuickBooks applies to this custom field's values, as QuickBooks names
   * it. QuickBooks does not report this for private custom fields.
   */
  format: string | null;

  /**
   * Indicates whether QuickBooks requires a value for this custom field on list
   * objects, such as customers and items. QuickBooks does not report this for
   * private custom fields.
   */
  isRequiredForListObjects: boolean | null;

  /**
   * Indicates whether QuickBooks requires a value for this custom field on
   * transactions. QuickBooks does not report this for private custom fields.
   */
  isRequiredForTransactions: boolean | null;

  /**
   * The name of this custom field, unique among the custom fields of its owner. For
   * a public custom field, this is the label QuickBooks shows.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_custom_field_definition"`.
   */
  objectType: 'qbd_custom_field_definition';

  /**
   * The types of records this custom field applies to. For a public custom field,
   * this includes the transaction types QuickBooks adds itself: a customer, vendor,
   * or employee custom field also applies to that name's transactions, and an item
   * custom field to transaction lines.
   */
  objectTypes: Array<
    | 'account'
    | 'ar_refund_credit_card'
    | 'bill'
    | 'bill_payment_check'
    | 'bill_payment_credit_card'
    | 'build_assembly'
    | 'charge'
    | 'check'
    | 'company'
    | 'credit_card_charge'
    | 'credit_card_credit'
    | 'credit_memo'
    | 'customer'
    | 'deposit'
    | 'employee'
    | 'estimate'
    | 'inventory_adjustment'
    | 'invoice'
    | 'item'
    | 'item_receipt'
    | 'journal_entry'
    | 'other_name'
    | 'purchase_order'
    | 'receive_payment'
    | 'sales_order'
    | 'sales_receipt'
    | 'sales_tax_payment_check'
    | 'vendor'
    | 'vendor_credit'
  >;

  /**
   * The owner of this custom field: `"0"` for a public custom field, which
   * QuickBooks users define and see, or an application's GUID in braces for a
   * private custom field, which appears only in requests that name that owner.
   */
  ownerId: string;

  /**
   * The data type of this custom field's values. Public custom fields are always
   * `string_255_type`.
   */
  type:
    | 'amount_type'
    | 'date_time_type'
    | 'integer_type'
    | 'percent_type'
    | 'price_type'
    | 'quantity_type'
    | 'string_1024_type'
    | 'string_255_type';
}

export interface CustomFieldDefinitionListResponse {
  /**
   * The array of custom field definitions.
   */
  data: Array<CustomFieldDefinition>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface CustomFieldDefinitionDeleteResponse {
  /**
   * The identifier of the deleted custom field definition, which is its `name`.
   */
  id: string;

  /**
   * Indicates whether the custom field definition was deleted.
   */
  deleted: boolean;

  /**
   * The name of the deleted custom field definition.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_custom_field_definition"`.
   */
  objectType: 'qbd_custom_field_definition';

  /**
   * The owner of the deleted custom field definition.
   */
  ownerId: string;
}

export interface CustomFieldDefinitionCreateParams {
  /**
   * Body param: The name of the custom field, unique among the custom fields of its
   * owner. For a public custom field, this is the label QuickBooks shows.
   */
  name: string;

  /**
   * Body param: The types of records the custom field applies to. A public custom
   * field takes either `"item"` or any of `"customer"`, `"vendor"`, and
   * `"employee"`, and QuickBooks adds the transaction types itself: a customer,
   * vendor, or employee custom field also applies to that name's transactions, and
   * an item custom field to transaction lines. A private custom field takes any of
   * these types.
   */
  objectTypes: Array<
    | 'account'
    | 'ar_refund_credit_card'
    | 'bill'
    | 'bill_payment_check'
    | 'bill_payment_credit_card'
    | 'build_assembly'
    | 'charge'
    | 'check'
    | 'company'
    | 'credit_card_charge'
    | 'credit_card_credit'
    | 'credit_memo'
    | 'customer'
    | 'deposit'
    | 'employee'
    | 'estimate'
    | 'inventory_adjustment'
    | 'invoice'
    | 'item'
    | 'item_receipt'
    | 'journal_entry'
    | 'other_name'
    | 'purchase_order'
    | 'receive_payment'
    | 'sales_order'
    | 'sales_receipt'
    | 'sales_tax_payment_check'
    | 'vendor'
    | 'vendor_credit'
  >;

  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Body param: The owner of the custom field. Defaults to `"0"`, the owner of
   * public custom fields, which QuickBooks users define and see. Any other owner is
   * an application's GUID in braces, such as
   * `"{6B063959-81B0-4622-85D6-F548C8CCB517}"`, whose private custom fields appear
   * only in requests that name it.
   */
  ownerId?: string;

  /**
   * Body param: The data type of the custom field's values. Defaults to
   * `"string_255_type"`, the only type QuickBooks accepts for a public custom field.
   */
  type?:
    | 'amount_type'
    | 'date_time_type'
    | 'integer_type'
    | 'percent_type'
    | 'price_type'
    | 'quantity_type'
    | 'string_1024_type'
    | 'string_255_type';
}

export interface CustomFieldDefinitionUpdateParams {
  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Body param: The types of records to also apply the custom field to. A public
   * custom field takes only `"customer"`, `"vendor"`, `"employee"`, or `"item"`, and
   * QuickBooks adds the matching transaction types itself.
   */
  addObjectTypes?: Array<
    | 'account'
    | 'ar_refund_credit_card'
    | 'bill'
    | 'bill_payment_check'
    | 'bill_payment_credit_card'
    | 'build_assembly'
    | 'charge'
    | 'check'
    | 'company'
    | 'credit_card_charge'
    | 'credit_card_credit'
    | 'credit_memo'
    | 'customer'
    | 'deposit'
    | 'employee'
    | 'estimate'
    | 'inventory_adjustment'
    | 'invoice'
    | 'item'
    | 'item_receipt'
    | 'journal_entry'
    | 'other_name'
    | 'purchase_order'
    | 'receive_payment'
    | 'sales_order'
    | 'sales_receipt'
    | 'sales_tax_payment_check'
    | 'vendor'
    | 'vendor_credit'
  >;

  /**
   * Body param: The new name of the custom field. Its values stay with it, and the
   * definition's `id` becomes the new name.
   */
  name?: string;

  /**
   * Body param: The owner of the custom field. Defaults to `"0"`, the owner of
   * public custom fields, which QuickBooks users define and see. Any other owner is
   * an application's GUID in braces, such as
   * `"{6B063959-81B0-4622-85D6-F548C8CCB517}"`, whose private custom fields appear
   * only in requests that name it.
   */
  ownerId?: string;

  /**
   * Body param: The types of records to stop applying the custom field to. A public
   * custom field takes only `"customer"`, `"vendor"`, `"employee"`, or `"item"`, and
   * QuickBooks removes the matching transaction types itself.
   */
  removeObjectTypes?: Array<
    | 'account'
    | 'ar_refund_credit_card'
    | 'bill'
    | 'bill_payment_check'
    | 'bill_payment_credit_card'
    | 'build_assembly'
    | 'charge'
    | 'check'
    | 'company'
    | 'credit_card_charge'
    | 'credit_card_credit'
    | 'credit_memo'
    | 'customer'
    | 'deposit'
    | 'employee'
    | 'estimate'
    | 'inventory_adjustment'
    | 'invoice'
    | 'item'
    | 'item_receipt'
    | 'journal_entry'
    | 'other_name'
    | 'purchase_order'
    | 'receive_payment'
    | 'sales_order'
    | 'sales_receipt'
    | 'sales_tax_payment_check'
    | 'vendor'
    | 'vendor_credit'
  >;
}

export interface CustomFieldDefinitionListParams {
  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: The owners whose custom field definitions to return. Defaults to
   * `["0"]`, the owner of public custom fields, which QuickBooks users define and
   * see. To get an application's private custom fields, add its owner ID, a GUID in
   * braces. Only the owners you list are returned, so keep `"0"` in the list to also
   * get the public ones.
   */
  ownerIds?: Array<string>;
}

export interface CustomFieldDefinitionDeleteParams {
  /**
   * Header param: The ID of the End-User to receive this request.
   */
  conductorEndUserId: string;

  /**
   * Query param: The owner of the custom field. Defaults to `"0"`, the owner of
   * public custom fields, which QuickBooks users define and see. Any other owner is
   * an application's GUID in braces, such as
   * `"{6B063959-81B0-4622-85D6-F548C8CCB517}"`, whose private custom fields appear
   * only in requests that name it.
   */
  ownerId?: string;
}

export declare namespace CustomFieldDefinitions {
  export {
    type CustomFieldDefinition as CustomFieldDefinition,
    type CustomFieldDefinitionListResponse as CustomFieldDefinitionListResponse,
    type CustomFieldDefinitionDeleteResponse as CustomFieldDefinitionDeleteResponse,
    type CustomFieldDefinitionCreateParams as CustomFieldDefinitionCreateParams,
    type CustomFieldDefinitionUpdateParams as CustomFieldDefinitionUpdateParams,
    type CustomFieldDefinitionListParams as CustomFieldDefinitionListParams,
    type CustomFieldDefinitionDeleteParams as CustomFieldDefinitionDeleteParams,
  };
}
