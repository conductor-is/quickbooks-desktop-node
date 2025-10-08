// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Templates extends APIResource {
  /**
   * Returns a list of templates. Use the `cursor` parameter to paginate through the
   * results.
   *
   * @example
   * ```ts
   * const templates = await conductor.qbd.templates.list({
   *   'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
   * });
   * ```
   */
  list(params: TemplateListParams, options?: RequestOptions): APIPromise<TemplateListResponse> {
    const { 'Conductor-End-User-Id': conductorEndUserID } = params;
    return this._client.get('/quickbooks-desktop/templates', {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }
}

export interface Template {
  /**
   * The unique identifier assigned by QuickBooks to this template. This ID is unique
   * across all templates but not across different QuickBooks object types.
   */
  id: string;

  /**
   * The date and time when this template was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * Indicates whether this template is active. Inactive objects are typically hidden
   * from views and reports in QuickBooks. Defaults to `true`.
   */
  isActive: boolean;

  /**
   * The case-insensitive unique name of this template, unique across all templates.
   *
   * **NOTE**: Templates do not have a `fullName` field because they are not
   * hierarchical objects, which is why `name` is unique for them but not for objects
   * that have parents.
   */
  name: string;

  /**
   * The type of object. This value is always `"qbd_template"`.
   */
  objectType: 'qbd_template';

  /**
   * The current QuickBooks-assigned revision number of this template object, which
   * changes each time the object is modified. When updating this object, you must
   * provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The type of transaction that this template is used for.
   */
  templateType:
    | 'bill_payment'
    | 'build_assembly'
    | 'credit_memo'
    | 'estimate'
    | 'invoice'
    | 'payment_receipt'
    | 'purchase_order'
    | 'sales_order'
    | 'sales_receipt';

  /**
   * The date and time when this template was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  updatedAt: string;
}

export interface TemplateListResponse {
  /**
   * The array of templates.
   */
  data: Array<Template>;

  /**
   * Indicates whether there are more objects to be fetched.
   */
  hasMore: boolean;

  /**
   * The `nextCursor` is a pagination token returned in the response when you use the
   * `limit` parameter in your request. To retrieve subsequent pages of results,
   * include this token as the value of the `cursor` request parameter in your
   * following API calls.
   *
   * **NOTE**: The `nextCursor` value remains constant throughout the pagination
   * process for a specific list instance; continue to use the same `nextCursor`
   * token in each request to fetch additional pages.
   */
  nextCursor: string | null;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The number of objects remaining to be fetched.
   */
  remainingCount: number | null;

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface TemplateListParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;
}

export declare namespace Templates {
  export {
    type Template as Template,
    type TemplateListResponse as TemplateListResponse,
    type TemplateListParams as TemplateListParams,
  };
}
