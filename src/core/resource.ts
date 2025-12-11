// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Conductor } from '../client';

export abstract class APIResource {
  protected _client: Conductor;

  constructor(client: Conductor) {
    this._client = client;
  }
}
