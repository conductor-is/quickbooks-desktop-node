// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.classes',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/classes',
};

export const tool: Tool = {
  name: 'create_qbd_classes',
  description: 'Creates a new class.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description:
          'The case-insensitive name of this class. Not guaranteed to be unique because it does not include the names of its hierarchical parent objects like `fullName` does. For example, two classes could both have the `name` "Marketing", but they could have unique `fullName` values, such as "Department:Marketing" and "Internal:Marketing".\n\nMaximum length: 31 characters.',
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
      parentId: {
        type: 'string',
        description:
          'The parent class one level above this one in the hierarchy. For example, if this class has a `fullName` of "Department:Marketing", its parent has a `fullName` of "Department". If this class is at the top level, this field will be `null`.',
      },
    },
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.qbd.classes.create(body));
};

export default { metadata, tool, handler };
