// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.build_assemblies',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/build-assemblies',
};

export const tool: Tool = {
  name: 'create_qbd_build_assemblies',
  description:
    'Creates a build assembly transaction that consumes component quantities and increases the finished assembly on hand. If components are short you can mark the build as pending instead of failing.',
  inputSchema: {
    type: 'object',
    properties: {
      inventoryAssemblyItemId: {
        type: 'string',
        description:
          'The inventory assembly item associated with this build assembly. An inventory assembly item is assembled or manufactured from other inventory items, and the items and/or assemblies that make up the assembly are called components.',
      },
      quantityToBuild: {
        type: 'number',
        description:
          'The number of build assembly to be built. The transaction will fail if the number specified here exceeds the number of on-hand components.',
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this build assembly, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
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
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
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
      refNumber: {
        type: 'string',
        description:
          'The case-sensitive user-defined reference number for this build assembly, which can be used to identify the transaction in QuickBooks. This value is not required to be unique and can be arbitrarily changed by the QuickBooks user. When left blank in this create request, this field will be left blank in QuickBooks (i.e., it does *not* auto-increment).',
      },
      serialNumber: {
        type: 'string',
        description:
          'The serial number of the item associated with this build assembly. This is used for tracking individual units of serialized inventory items.',
      },
    },
    required: ['inventoryAssemblyItemId', 'quantityToBuild', 'transactionDate', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.qbd.buildAssemblies.create(body));
};

export default { metadata, tool, handler };
