// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
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
    'Checks whether the specified QuickBooks Desktop connection is active and can process requests end-to-end. This is useful for showing a "connection status" indicator in your app. If an error occurs, the typical Conductor error response will be returned. As with any request to QuickBooks Desktop, the health check may fail if the application is not running, the wrong company file is open, or if a modal dialog is open. Timeout is 60 seconds.',
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
  return client.qbd.healthCheck(body);
};

export default { metadata, tool, handler };
