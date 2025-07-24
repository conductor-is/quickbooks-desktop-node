// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'conductor-node-mcp/filtering';
import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.account_tax_lines',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/account-tax-lines',
};

export const tool: Tool = {
  name: 'list_qbd_account_tax_lines',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns a list of account tax lines. NOTE: QuickBooks Desktop does not support pagination for account tax lines; hence, there is no `cursor` parameter. Users typically have few account tax lines.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'The array of account tax lines.',\n      items: {\n        $ref: '#/$defs/account_tax_line'\n      }\n    },\n    objectType: {\n      type: 'string',\n      description: 'The type of object. This value is always `\"list\"`.',\n      enum: [        'list'\n      ]\n    },\n    url: {\n      type: 'string',\n      description: 'The endpoint URL where this list can be accessed.'\n    }\n  },\n  required: [    'data',\n    'objectType',\n    'url'\n  ],\n  $defs: {\n    account_tax_line: {\n      type: 'object',\n      title: 'The Account Tax Line object',\n      properties: {\n        taxLineId: {\n          type: 'number',\n          description: 'The identifier of the tax line associated with this account tax line. You can see a list of all available values for this field by calling the endpoint for account tax lines.'\n        },\n        taxLineName: {\n          type: 'string',\n          description: 'The name of the tax line associated with this account tax line, as it appears on the tax form.'\n        }\n      },\n      required: [        'taxLineId',\n        'taxLineName'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['conductorEndUserId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await maybeFilter(args, await conductor.qbd.accountTaxLines.list(body)));
};

export default { metadata, tool, handler };
