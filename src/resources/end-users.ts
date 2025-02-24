// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class EndUsers extends APIResource {
  /**
   * Creates an end-user.
   */
  create(body: EndUserCreateParams, options?: Core.RequestOptions): Core.APIPromise<EndUser> {
    return this._client.post('/end-users', { body, ...options });
  }

  /**
   * Retrieves an end-user object.
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<EndUser> {
    return this._client.get(`/end-users/${id}`, options);
  }

  /**
   * Returns a list of your end-users.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<EndUserListResponse> {
    return this._client.get('/end-users', options);
  }

  /**
   * Permanently deletes an end-user object and all of its connections.
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<EndUserDeleteResponse> {
    return this._client.delete(`/end-users/${id}`, options);
  }

  /**
   * Sends a request directly to the specified integration connection (e.g.,
   * QuickBooks Desktop) on behalf of the end-user.
   */
  passthrough(
    id: string,
    integrationSlug: 'quickbooks_desktop',
    body: EndUserPassthroughParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EndUserPassthroughResponse> {
    return this._client.post(`/end-users/${id}/passthrough/${integrationSlug}`, { body, ...options });
  }

  /**
   * Checks whether the specified integration connection can connect and process
   * requests end-to-end. This is useful for showing a "connection status" indicator
   * in your app.
   */
  ping(
    id: string,
    integrationSlug: 'quickbooks_desktop',
    options?: Core.RequestOptions,
  ): Core.APIPromise<EndUserPingResponse> {
    return this._client.get(`/end-users/${id}/ping/${integrationSlug}`, options);
  }
}

export interface EndUser {
  /**
   * The unique identifier for this end-user. You must save this value to your
   * database because it is how you identify which of your users to receive your API
   * requests.
   */
  id: string;

  /**
   * The end-user's company name that will be shown elsewhere in Conductor.
   */
  companyName: string;

  /**
   * The date and time when this end-user record was created.
   */
  createdAt: string;

  /**
   * The end-user's email address for identification purposes.
   */
  email: string;

  /**
   * The end-user's integration connections.
   */
  integrationConnections: Array<EndUser.IntegrationConnection>;

  /**
   * The type of object. This value is always `"end_user"`.
   */
  objectType: 'end_user';

  /**
   * The end-user's unique identifier from your system. Maps users between your
   * database and Conductor.
   */
  sourceId: string;
}

export namespace EndUser {
  export interface IntegrationConnection {
    /**
     * The unique identifier for this integration connection.
     */
    id: string;

    /**
     * The date and time when this integration connection record was created.
     */
    createdAt: string;

    /**
     * The identifier of the third-party platform to integrate.
     */
    integrationSlug: 'quickbooks_desktop';

    /**
     * The date and time of your last API request to this integration connection.
     */
    lastRequestAt: string | null;

    /**
     * The date and time of your last _successful_ API request to this integration
     * connection. A successful request means the integration fully processed and
     * returned a response without any errors end-to-end.
     */
    lastSuccessfulRequestAt: string | null;

    /**
     * The type of object. This value is always `"integration_connection"`.
     */
    objectType: 'integration_connection';
  }
}

export interface EndUserListResponse {
  /**
   * The array of end-users.
   */
  data: Array<EndUser>;

  /**
   * The type of object. This value is always `"list"`.
   */
  objectType: 'list';

  /**
   * The endpoint URL where this list can be accessed.
   */
  url: string;
}

export interface EndUserDeleteResponse {
  /**
   * The ID of the deleted end-user.
   */
  id: string;

  /**
   * Indicates whether the end-user was deleted.
   */
  deleted: boolean;

  /**
   * The type of object. This value is always `"end_user"`.
   */
  objectType: 'end_user';
}

/**
 * The response from the integration connection.
 */
export type EndUserPassthroughResponse = Record<string, unknown>;

export interface EndUserPingResponse {
  /**
   * The time, in milliseconds, that it took to ping the connection.
   */
  duration: number;
}

export interface EndUserCreateParams {
  /**
   * The end-user's company name that will be shown elsewhere in Conductor.
   */
  companyName: string;

  /**
   * The end-user's email address for identification purposes. Setting this field
   * will not cause any emails to be sent.
   */
  email: string;

  /**
   * The end-user's unique identifier from your system. Maps users between your
   * database and Conductor. Must be unique for each user. If you have only one user,
   * you may use any string value.
   */
  sourceId: string;
}

export type EndUserPassthroughParams = Record<string, unknown>;

export declare namespace EndUsers {
  export {
    type EndUser as EndUser,
    type EndUserListResponse as EndUserListResponse,
    type EndUserDeleteResponse as EndUserDeleteResponse,
    type EndUserPassthroughResponse as EndUserPassthroughResponse,
    type EndUserPingResponse as EndUserPingResponse,
    type EndUserCreateParams as EndUserCreateParams,
    type EndUserPassthroughParams as EndUserPassthroughParams,
  };
}
