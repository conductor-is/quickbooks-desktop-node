// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.build_assemblies',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/quickbooks-desktop/build-assemblies/{id}',
};

export const tool: Tool = {
  name: 'delete_qbd_build_assemblies',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nPermanently deletes a a build assembly. The deletion will fail if the build assembly is currently in use or has any linked transactions that are in use.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/build_assembly_delete_response',\n  $defs: {\n    build_assembly_delete_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The QuickBooks-assigned unique identifier of the deleted build assembly.'\n        },\n        deleted: {\n          type: 'boolean',\n          description: 'Indicates whether the build assembly was deleted.'\n        },\n        objectType: {\n          type: 'string',\n          description: 'The type of object. This value is always `\"qbd_build_assembly\"`.',\n          enum: [            'qbd_build_assembly'\n          ]\n        },\n        refNumber: {\n          type: 'string',\n          description: 'The case-sensitive user-defined reference number of the deleted build assembly.'\n        }\n      },\n      required: [        'id',\n        'deleted',\n        'objectType',\n        'refNumber'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the build assembly to delete.',
      },
      conductorEndUserId: {
        type: 'string',
        description: 'The ID of the End-User to receive this request.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id', 'conductorEndUserId'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await conductor.qbd.buildAssemblies.delete(id, body)),
    );
  } catch (error) {
    if (error instanceof Conductor.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
