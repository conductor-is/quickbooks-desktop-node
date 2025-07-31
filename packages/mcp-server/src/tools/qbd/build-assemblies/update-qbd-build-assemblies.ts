// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.build_assemblies',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/build-assemblies/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_build_assemblies',
  description: 'Updates an existing build assembly.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the build assembly to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the build assembly object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      expirationDate: {
        type: 'string',
        description:
          'The expiration date for the serial number or lot number of the item associated with this build assembly, in ISO 8601 format (YYYY-MM-DD). This is particularly relevant for perishable or time-sensitive inventory items. Note that this field is only supported on QuickBooks Desktop 2023 or later.',
        format: 'date',
      },
      inventorySiteId: {
        type: 'string',
        description:
          'The site location where inventory for the item associated with this build assembly is stored.',
      },
      inventorySiteLocationId: {
        type: 'string',
        description:
          'The specific location (e.g., bin or shelf) within the inventory site where the item associated with this build assembly is stored.',
      },
      lotNumber: {
        type: 'string',
        description:
          'The lot number of the item associated with this build assembly. Used for tracking groups of inventory items that are purchased or manufactured together.',
      },
      markPendingIfRequired: {
        type: 'boolean',
        description:
          'When `true`, the build assembly will be marked pending if there are insufficient quantities to complete the build assembly.',
      },
      memo: {
        type: 'string',
        description: 'A memo or note for this build assembly.',
      },
      quantityToBuild: {
        type: 'number',
        description:
          'The number of build assembly to be built. The transaction will fail if the number specified here exceeds the number of on-hand components.',
      },
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this build assembly, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user.',
      },
      removePending: {
        type: 'boolean',
        description:
          "When `true`, changes this build assembly's status from pending to non-pending, which effectively performs the build transaction. The operation will fail if there are insufficient component quantities on hand to complete the build.",
      },
      serialNumber: {
        type: 'string',
        description:
          'The serial number of the item associated with this build assembly. This is used for tracking individual units of serialized inventory items.',
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this build assembly, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
    },
    required: ['id', 'revisionNumber', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.buildAssemblies.update(id, body));
};

export default { metadata, tool, handler };
