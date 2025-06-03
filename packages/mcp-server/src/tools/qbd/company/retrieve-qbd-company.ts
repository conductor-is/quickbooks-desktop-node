// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.company',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/company',
};

export const tool: Tool = {
  name: 'retrieve_qbd_company',
  description:
    'Returns detailed information about the connected QuickBooks company file, including company address, legal name, preferences, and subscribed services. Note that company information cannot be modified through the API, only through the QuickBooks Desktop user interface.',
  inputSchema: {
    type: 'object',
    properties: {
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
    },
  },
};

export const handler = (client: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.qbd.company.retrieve(body);
};

export default { metadata, tool, handler };
