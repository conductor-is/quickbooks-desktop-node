// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.other_names',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/other-names/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_other_names',
  description: 'Updates an existing other-name.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the other-name to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the other-name object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      accountNumber: {
        type: 'string',
        description:
          'The other-name\'s account number, which appears in the QuickBooks chart of accounts, reports, and graphs.\n\nNote that if the "Use Account Numbers" preference is turned off in QuickBooks, the account number may not be visible in the user interface, but it can still be set and retrieved through the API.',
      },
      address: {
        type: 'object',
        description: "The other-name's address.",
        properties: {
          city: {
            type: 'string',
            description:
              'The city, district, suburb, town, or village name of the address.\n\nMaximum length: 31 characters.',
          },
          country: {
            type: 'string',
            description: 'The country name of the address.',
          },
          line1: {
            type: 'string',
            description:
              'The first line of the address (e.g., street, PO Box, or company name).\n\nMaximum length: 41 characters.',
          },
          line2: {
            type: 'string',
            description:
              'The second line of the address, if needed (e.g., apartment, suite, unit, or building).\n\nMaximum length: 41 characters.',
          },
          line3: {
            type: 'string',
            description: 'The third line of the address, if needed.\n\nMaximum length: 41 characters.',
          },
          line4: {
            type: 'string',
            description: 'The fourth line of the address, if needed.\n\nMaximum length: 41 characters.',
          },
          line5: {
            type: 'string',
            description: 'The fifth line of the address, if needed.\n\nMaximum length: 41 characters.',
          },
          note: {
            type: 'string',
            description:
              'A note written at the bottom of the address in the form in which it appears, such as the invoice form.',
          },
          postalCode: {
            type: 'string',
            description: 'The postal code or ZIP code of the address.\n\nMaximum length: 13 characters.',
          },
          state: {
            type: 'string',
            description:
              'The state, county, province, or region name of the address.\n\nMaximum length: 21 characters.',
          },
        },
      },
      alternateContact: {
        type: 'string',
        description: 'The name of a alternate contact person for this other-name.',
      },
      alternatePhone: {
        type: 'string',
        description: "The other-name's alternate telephone number.",
      },
      companyName: {
        type: 'string',
        description:
          'The name of the company associated with this other-name. This name is used on invoices, checks, and other forms.',
      },
      contact: {
        type: 'string',
        description: 'The name of the primary contact person for this other-name.',
      },
      email: {
        type: 'string',
        description: "The other-name's email address.",
      },
      fax: {
        type: 'string',
        description: "The other-name's fax number.",
      },
      firstName: {
        type: 'string',
        description:
          'The first name of the contact person for this other-name.\n\nMaximum length: 25 characters.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this other-name is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      lastName: {
        type: 'string',
        description:
          'The last name of the contact person for this other-name.\n\nMaximum length: 25 characters.',
      },
      middleName: {
        type: 'string',
        description:
          'The middle name of the contact person for this other-name.\n\nMaximum length: 5 characters.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this other-name, unique across all other-names.\n\n**NOTE**: Other-names do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 31 characters.',
      },
      note: {
        type: 'string',
        description: 'A note or comment about this other-name.',
      },
      phone: {
        type: 'string',
        description: "The other-name's primary telephone number.",
      },
      salutation: {
        type: 'string',
        description:
          'The formal salutation title that precedes the name of the contact person for this other-name, such as "Mr.", "Ms.", or "Dr.".',
      },
    },
    required: ['id', 'revisionNumber', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.otherNames.update(id, body));
};

export default { metadata, tool, handler };
