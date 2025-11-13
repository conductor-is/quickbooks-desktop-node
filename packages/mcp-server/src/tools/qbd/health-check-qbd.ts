// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/health-check',
};

export const tool: Tool = {
  name: 'health_check_qbd',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nChecks whether the specified QuickBooks Desktop connection is active and can process requests end-to-end. This is useful for showing a \"connection status\" indicator in your app. If an error occurs, the typical Conductor error response will be returned. As with any request to QuickBooks Desktop, the health check may fail if the application is not running, the wrong company file is open, or if a modal dialog is open. Timeout is 60 seconds.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/qbd_health_check_response',\n  $defs: {\n    qbd_health_check_response: {\n      type: 'object',\n      properties: {\n        duration: {\n          type: 'number',\n          description: 'The time, in milliseconds, that it took to perform the health check.'\n        },\n        status: {\n          type: 'string',\n          description: 'The status of the health check.',\n          enum: [            'ok'\n          ]\n        }\n      },\n      required: [        'duration',\n        'status'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
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
    required: ['Conductor-End-User-Id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await conductor.qbd.healthCheck(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
