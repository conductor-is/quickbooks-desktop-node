// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
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
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nTo launch the authentication flow, create an auth session and pass the returned session's `authFlowUrl` to the client for your end-user to visit in their browser. Demo: https://connect.conductor.is/qbd/demo\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/auth_session',\n  $defs: {\n    auth_session: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier for this auth session.'\n        },\n        authFlowUrl: {\n          type: 'string',\n          description: 'The URL of the authentication flow that you will pass to your client for your user to set up their integration connection.'\n        },\n        clientSecret: {\n          type: 'string',\n          description: 'The secret used in `authFlowUrl` to securely access the authentication flow.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this auth session record was created.'\n        },\n        endUserId: {\n          type: 'string',\n          description: 'The ID of the end-user for whom to create an integration connection.'\n        },\n        expiresAt: {\n          type: 'string',\n          description: 'The date and time when this auth session expires. By default, this value is 30 minutes from creation. You can extend this time by setting `linkExpiryMins` when creating the auth session.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"auth_session\"`.',\n          enum: [            'auth_session'\n          ]\n        },\n        redirectUrl: {\n          type: 'string',\n          description: 'The URL to which Conductor will redirect your user to return to your app after they complete the authentication flow. If `null`, their browser tab will close instead.'\n        }\n      },\n      required: [        'id',\n        'authFlowUrl',\n        'clientSecret',\n        'createdAt',\n        'endUserId',\n        'expiresAt',\n        'objectType',\n        'redirectUrl'\n      ]\n    }\n  }\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await maybeFilter(args, await conductor.authSessions.create(body)));
};

export default { metadata, tool, handler };
