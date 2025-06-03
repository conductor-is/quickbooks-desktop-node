// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.time_tracking_activities',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/quickbooks-desktop/time-tracking-activities/{id}',
};

export const tool: Tool = {
  name: 'delete_qbd_time_tracking_activities',
  description:
    'Permanently deletes a a time tracking activity. The deletion will fail if the time tracking activity is currently in use or has any linked transactions that are in use.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the time tracking activity to delete.',
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
    },
  },
};

export const handler = (client: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return client.qbd.timeTrackingActivities.delete(id, body);
};

export default { metadata, tool, handler };
