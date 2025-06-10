// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'auth_sessions',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/auth-sessions',
};

export const tool: Tool = {
  name: 'create_auth_sessions',
  description:
    "To launch the authentication flow, create an auth session and pass the returned session's `authFlowUrl` to the client for your end-user to visit in their browser. Demo: https://connect.conductor.is/qbd/demo",
  inputSchema: {
    type: 'object',
    properties: {
      endUserId: {
        type: 'string',
        description: 'The ID of the end-user for whom to create the integration connection.',
      },
      publishableKey: {
        type: 'string',
        description:
          "Your Conductor publishable key, which we use to create the auth session's `authFlowUrl`.",
      },
      linkExpiryMins: {
        type: 'number',
        description:
          'The number of minutes after which the auth session will expire. Must be at least 15 minutes and no more than 7 days. If not provided, defaults to 30 minutes.',
      },
      redirectUrl: {
        type: 'string',
        description:
          'The URL to which Conductor will redirect the end-user to return to your app after they complete the authentication flow. If not provided, their browser tab will close instead.',
      },
    },
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.authSessions.create(body));
};

export default { metadata, tool, handler };
