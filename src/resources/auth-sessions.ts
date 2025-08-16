// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class AuthSessions extends APIResource {
  /**
   * To launch the authentication flow, create an auth session and pass the returned
   * session's `authFlowUrl` to the client for your end-user to visit in their
   * browser. Demo: https://connect.conductor.is/qbd/demo
   *
   * @example
   * ```ts
   * const authSession = await client.authSessions.create({
   *   endUserId: 'end_usr_1234567abcdefg',
   *   publishableKey: '{{YOUR_PUBLISHABLE_KEY}}',
   * });
   * ```
   */
  create(body: AuthSessionCreateParams, options?: Core.RequestOptions): Core.APIPromise<AuthSession> {
    return this._client.post('/auth-sessions', { body, ...options });
  }
}

export interface AuthSession {
  /**
   * The unique identifier for this auth session.
   */
  id: string;

  /**
   * The URL of the authentication flow that you will pass to your client for your
   * user to set up their integration connection.
   */
  authFlowUrl: string;

  /**
   * The secret used in `authFlowUrl` to securely access the authentication flow.
   */
  clientSecret: string;

  /**
   * The date and time when this auth session record was created.
   */
  createdAt: string;

  /**
   * The ID of the end-user for whom to create an integration connection.
   */
  endUserId: string;

  /**
   * The date and time when this auth session expires. By default, this value is 30
   * minutes from creation. You can extend this time by setting `linkExpiryMins` when
   * creating the auth session.
   */
  expiresAt: string;

  /**
   * The type of object. This value is always `"auth_session"`.
   */
  objectType: 'auth_session';

  /**
   * The URL to which Conductor will redirect your user to return to your app after
   * they complete the authentication flow. If `null`, their browser tab will close
   * instead.
   */
  redirectUrl: string | null;
}

export interface AuthSessionCreateParams {
  /**
   * The ID of the end-user for whom to create the integration connection.
   */
  endUserId: string;

  /**
   * Your Conductor publishable key, which we use to create the auth session's
   * `authFlowUrl`.
   */
  publishableKey: string;

  /**
   * The number of minutes after which the auth session will expire. Must be at least
   * 15 minutes and no more than 7 days. If not provided, defaults to 30 minutes.
   */
  linkExpiryMins?: number;

  /**
   * The URL to which Conductor will redirect the end-user to return to your app
   * after they complete the authentication flow. If not provided, their browser tab
   * will close instead.
   */
  redirectUrl?: string;
}

export declare namespace AuthSessions {
  export { type AuthSession as AuthSession, type AuthSessionCreateParams as AuthSessionCreateParams };
}
