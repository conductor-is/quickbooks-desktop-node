// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'end_users',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/end-users',
};

export const tool: Tool = {
  name: 'create_end_users',
  description: 'Creates an end-user.',
  inputSchema: {
    type: 'object',
    properties: {
      companyName: {
        type: 'string',
        description: "The end-user's company name that will be shown elsewhere in Conductor.",
      },
      email: {
        type: 'string',
        description:
          "The end-user's email address for identification purposes. Setting this field will not cause any emails to be sent.",
      },
      sourceId: {
        type: 'string',
        description:
          "The end-user's unique identifier from your system. Maps users between your database and Conductor. Must be unique for each user. If you have only one user, you may use any string value.",
      },
    },
  },
};

export const handler = (client: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.endUsers.create(body);
};

export default { metadata, tool, handler };
