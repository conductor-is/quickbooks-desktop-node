// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.checks',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/quickbooks-desktop/checks/{id}',
};

export const tool: Tool = {
  name: 'delete_qbd_checks',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nPermanently deletes a a check. The deletion will fail if the check is currently in use or has any linked transactions that are in use.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/check_delete_response',\n  $defs: {\n    check_delete_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The QuickBooks-assigned unique identifier of the deleted check.'\n        },\n        deleted: {\n          type: 'boolean',\n          description: 'Indicates whether the check was deleted.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_check\"`.',\n          enum: [            'qbd_check'\n          ]\n        },\n        refNumber: {\n          type: 'string',\n          description: 'The case-sensitive user-defined reference number of the deleted check.'\n        }\n      },\n      required: [        'id',\n        'deleted',\n        'objectType',\n        'refNumber'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the check to delete.',
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id', 'Conductor-End-User-Id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await conductor.qbd.checks.delete(id, body)));
};

export default { metadata, tool, handler };
