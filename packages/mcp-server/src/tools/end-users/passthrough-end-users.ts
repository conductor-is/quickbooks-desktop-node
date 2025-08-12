// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'end_users',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/end-users/{id}/passthrough/{integrationSlug}',
};

export const tool: Tool = {
  name: 'passthrough_end_users',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSends a request directly to the specified integration connection (e.g., QuickBooks Desktop) on behalf of the end-user.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'The response from the integration connection.'\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the end-user who owns the integration connection.',
      },
      integrationSlug: {
        type: 'string',
        description: "The integration identifier for the end-user's connection.",
        enum: ['quickbooks_desktop'],
      },
      qbd_payload: {
        type: 'object',
        description: 'The request body to send to the integration connection.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id', 'integrationSlug', 'qbd_payload'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, integrationSlug, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(
      jq_filter,
      await conductor.endUsers.passthrough(id, integrationSlug, body['qbd_payload']),
    ),
  );
};

export default { metadata, tool, handler };
