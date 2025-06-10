// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
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
    'Permanently deletes a a check. The deletion will fail if the check is currently in use or has any linked transactions that are in use.',
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
    },
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.checks.delete(id, body));
};

export default { metadata, tool, handler };
