// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class AccountTaxLines extends APIResource {
  /**
   * Returns a list of account tax lines. NOTE: QuickBooks Desktop does not support
   * pagination for account tax lines; hence, there is no `cursor` parameter. Users
   * typically have few account tax lines.
   *
   * @example
   * ```ts
   * const accountTaxLines =
   *   await client.qbd.accountTaxLines.list({
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  list(
    params: AccountTaxLineListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AccountTaxLineListResponse> {
    const { conductorEndUserId } = params;
    return this._client.get('/quickbooks-desktop/account-tax-lines', {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
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
  conductorEndUserId: string;
}

export declare namespace AccountTaxLines {
  export {
    type AccountTaxLine as AccountTaxLine,
    type AccountTaxLineListResponse as AccountTaxLineListResponse,
    type AccountTaxLineListParams as AccountTaxLineListParams,
  };
}
