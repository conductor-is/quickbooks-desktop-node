// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { asTextContentResult } from 'conductor-node-mcp/tools/types';

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
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates an end-user.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/end_user',\n  $defs: {\n    end_user: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier for this end-user. You must save this value to your database because it is how you identify which of your users to receive your API requests.'\n        },\n        companyName: {\n          type: 'string',\n          description: 'The end-user\\'s company name that will be shown elsewhere in Conductor.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time when this end-user record was created.'\n        },\n        email: {\n          type: 'string',\n          description: 'The end-user\\'s email address for identification purposes.'\n        },\n        integrationConnections: {\n          type: 'array',\n          description: 'The end-user\\'s integration connections.',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'The unique identifier for this integration connection.'\n              },\n              createdAt: {\n                type: 'string',\n                description: 'The date and time when this integration connection record was created.'\n              },\n              integrationSlug: {\n                type: 'string',\n                description: 'The identifier of the third-party platform to integrate.',\n                enum: [                  'quickbooks_desktop'\n                ]\n              },\n              lastRequestAt: {\n                type: 'string',\n                description: 'The date and time of your last API request to this integration connection.'\n              },\n              lastSuccessfulRequestAt: {\n                type: 'string',\n                description: 'The date and time of your last *successful* API request to this integration connection. A successful request means the integration fully processed and returned a response without any errors end-to-end.'\n              },\n              objectType: {\n                type: 'string',\n                description: 'The type of object. This value is always `\"integration_connection\"`.',\n                enum: [                  'integration_connection'\n                ]\n              }\n            },\n            required: [              'id',\n              'createdAt',\n              'integrationSlug',\n              'lastRequestAt',\n              'lastSuccessfulRequestAt',\n              'objectType'\n            ]\n          }\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"end_user\"`.',\n          enum: [            'end_user'\n          ]\n        },\n        sourceId: {\n          type: 'string',\n          description: 'The end-user\\'s unique identifier from your system. Maps users between your database and Conductor.'\n        }\n      },\n      required: [        'id',\n        'companyName',\n        'createdAt',\n        'email',\n        'integrationConnections',\n        'objectType',\n        'sourceId'\n      ]\n    }\n  }\n}\n```",
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
  return asTextContentResult(await maybeFilter(args, await conductor.endUsers.create(body)));
};

export default { metadata, tool, handler };
