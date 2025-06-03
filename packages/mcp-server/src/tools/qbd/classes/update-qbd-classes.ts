// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.classes',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/classes/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_classes',
  description: 'Updates an existing class.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the class to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the class object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this class is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive name of this class. Not guaranteed to be unique because it does not include the names of its hierarchical parent objects like `fullName` does. For example, two classes could both have the `name` "Marketing", but they could have unique `fullName` values, such as "Department:Marketing" and "Internal:Marketing".\n\nMaximum length: 31 characters.',
      },
      parentId: {
        type: 'string',
        description:
          'The parent class one level above this one in the hierarchy. For example, if this class has a `fullName` of "Department:Marketing", its parent has a `fullName` of "Department". If this class is at the top level, this field will be `null`.',
      },
    },
  },
};

export const handler = (client: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return client.qbd.classes.update(id, body);
};

export default { metadata, tool, handler };
