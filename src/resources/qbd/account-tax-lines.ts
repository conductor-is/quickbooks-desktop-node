// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class AccountTaxLines extends APIResource {
  /**
   * Returns a list of account tax lines. NOTE: QuickBooks Desktop does not support
   * pagination for account tax lines; hence, there is no `cursor` parameter. Users
   * typically have few account tax lines.
   *
   * @example
   * ```ts
   * const accountTaxLines =
   *   await conductor.qbd.accountTaxLines.list({
   *     'Conductor-End-User-Id': 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(params: AccountTaxLineListParams, options?: RequestOptions): APIPromise<AccountTaxLineListResponse> {
    const { 'Conductor-End-User-Id': conductorEndUserID } = params;
    return this._client.get('/quickbooks-desktop/account-tax-lines', {
      ...options,
      headers: buildHeaders([{ 'Conductor-End-User-Id': conductorEndUserID }, options?.headers]),
    });
  }
}

export interface AccountTaxLine {
  /**
   * The identifier of the tax line associated with this account tax line. You can
   * see a list of all available values for this field by calling the endpoint for
   * account tax lines.
   */
  taxLineId: number;

  /**
   * The name of the tax line associated with this account tax line, as it appears on
   * the tax form.
   */
  taxLineName: string | null;
}

export interface AccountTaxLineListResponse {
  /**
   * The array of account tax lines.
   */
  data: Array<AccountTaxLine>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface AccountTaxLineListParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  'Conductor-End-User-Id': string;
}

export declare namespace AccountTaxLines {
  export {
    type AccountTaxLine as AccountTaxLine,
    type AccountTaxLineListResponse as AccountTaxLineListResponse,
    type AccountTaxLineListParams as AccountTaxLineListParams,
  };
}
