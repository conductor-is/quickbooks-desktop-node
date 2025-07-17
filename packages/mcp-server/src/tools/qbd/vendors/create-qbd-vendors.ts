// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.vendors',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/vendors',
};

export const tool: Tool = {
  name: 'create_qbd_vendors',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates a new vendor.",
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description:
          'The case-insensitive unique name of this vendor, unique across all vendors.\n\n**NOTE**: Vendors do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 41 characters.',
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      accountNumber: {
        type: 'string',
        description:
          'The vendor\'s account number, which appears in the QuickBooks chart of accounts, reports, and graphs.\n\nNote that if the "Use Account Numbers" preference is turned off in QuickBooks, the account number may not be visible in the user interface, but it can still be set and retrieved through the API.',
      },
      additionalContacts: {
        type: 'array',
        description: 'Additional alternate contacts for this vendor.',
        items: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              description: "The contact's first name.\n\nMaximum length: 25 characters.",
            },
            customContactFields: {
              type: 'array',
              description:
                'Additional custom contact fields for this contact, such as phone numbers or email addresses.',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'The name of the contact field (e.g., "old address", "secondary phone").',
                  },
                  value: {
                    type: 'string',
                    description: 'The value of the contact field.',
                  },
                },
                required: ['name', 'value'],
              },
            },
            jobTitle: {
              type: 'string',
              description: "The contact's job title.",
            },
            lastName: {
              type: 'string',
              description: "The contact's last name.\n\nMaximum length: 25 characters.",
            },
            middleName: {
              type: 'string',
              description: "The contact's middle name.\n\nMaximum length: 5 characters.",
            },
            salutation: {
              type: 'string',
              description:
                'The contact\'s formal salutation title that precedes their name, such as "Mr.", "Ms.", or "Dr.".',
            },
          },
          required: ['firstName'],
        },
      },
      additionalNotes: {
        type: 'array',
        description: 'Additional notes about this vendor.',
        items: {
          type: 'object',
          properties: {
            note: {
              type: 'string',
              description: 'The text of this note.',
            },
          },
          required: ['note'],
        },
      },
      alternateContact: {
        type: 'string',
        description: 'The name of a alternate contact person for this vendor.',
      },
      alternatePhone: {
        type: 'string',
        description: "The vendor's alternate telephone number.",
      },
      billingAddress: {
        type: 'object',
        description: "The vendor's billing address.",
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
      billingRateId: {
        type: 'string',
        description:
          "The vendor's billing rate, used to override service item rates in time tracking activities.",
      },
      ccEmail: {
        type: 'string',
        description: 'An email address to carbon copy (CC) on communications with this vendor.',
      },
      classId: {
        type: 'string',
        description:
          "The vendor's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default.",
      },
      companyName: {
        type: 'string',
        description:
          'The name of the company associated with this vendor. This name is used on invoices, checks, and other forms.',
      },
      contact: {
        type: 'string',
        description: 'The name of the primary contact person for this vendor.',
      },
      creditLimit: {
        type: 'string',
        description:
          "The vendor's credit limit, represented as a decimal string. This is the maximum amount of money that can be spent being before billed by this vendor. If `null`, there is no credit limit.",
      },
      currencyId: {
        type: 'string',
        description:
          "The vendor's currency. For built-in currencies, the name and code are standard international values. For user-defined currencies, all values are editable.",
      },
      customContactFields: {
        type: 'array',
        description:
          'Additional custom contact fields for this vendor, such as phone numbers or email addresses.',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the contact field (e.g., "old address", "secondary phone").',
            },
            value: {
              type: 'string',
              description: 'The value of the contact field.',
            },
          },
          required: ['name', 'value'],
        },
      },
      defaultExpenseAccountIds: {
        type: 'array',
        description: 'The expense accounts to prefill when entering bills for this vendor.',
        items: {
          type: 'string',
        },
      },
      email: {
        type: 'string',
        description: "The vendor's email address.",
      },
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
      },
      fax: {
        type: 'string',
        description: "The vendor's fax number.",
      },
      firstName: {
        type: 'string',
        description:
          'The first name of the contact person for this vendor.\n\nMaximum length: 25 characters.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this vendor is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      isCompoundingTax: {
        type: 'boolean',
        description:
          'Indicates whether tax is charged on top of tax for this vendor, for use in Canada or the UK.',
      },
      isEligibleFor1099: {
        type: 'boolean',
        description:
          'Indicates whether this vendor is eligible to receive a 1099 form for tax reporting purposes. When `true`, then the fields `taxId` and `billingAddress` are required.',
      },
      isSalesTaxAgency: {
        type: 'boolean',
        description: 'Indicates whether this vendor is a sales tax agency.',
      },
      isTrackingPurchaseTax: {
        type: 'boolean',
        description:
          'Indicates whether tax is tracked on purchases for this vendor, for use in Canada or the UK.',
      },
      isTrackingSalesTax: {
        type: 'boolean',
        description:
          'Indicates whether tax is tracked on sales for this vendor, for use in Canada or the UK.',
      },
      jobTitle: {
        type: 'string',
        description: 'The job title of the contact person for this vendor.',
      },
      lastName: {
        type: 'string',
        description: 'The last name of the contact person for this vendor.\n\nMaximum length: 25 characters.',
      },
      middleName: {
        type: 'string',
        description:
          'The middle name of the contact person for this vendor.\n\nMaximum length: 5 characters.',
      },
      nameOnCheck: {
        type: 'string',
        description: "The vendor's name as it should appear on checks issued to this vendor.",
      },
      note: {
        type: 'string',
        description: 'A note or comment about this vendor.',
      },
      openingBalance: {
        type: 'string',
        description:
          "The opening balance of this vendor's account, indicating the amount owed to this vendor, represented as a decimal string.",
      },
      openingBalanceDate: {
        type: 'string',
        description: 'The date of the opening balance of this vendor, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      phone: {
        type: 'string',
        description: "The vendor's primary telephone number.",
      },
      purchaseTaxAccountId: {
        type: 'string',
        description:
          'The account used for tracking taxes on purchases for this vendor, for use in Canada or the UK.',
      },
      reportingPeriod: {
        type: 'string',
        description: "The vendor's tax reporting period, for use in Canada or the UK.",
        enum: ['monthly', 'quarterly'],
      },
      salesTaxAccountId: {
        type: 'string',
        description:
          'The account used for tracking taxes on sales for this vendor, for use in Canada or the UK.',
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The default sales-tax code for transactions with this vendor, determining whether the transactions are taxable or non-taxable. This can be overridden at the transaction or transaction-line level.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
      salesTaxCountry: {
        type: 'string',
        description: 'The country for which sales tax is collected for this vendor.',
        enum: ['australia', 'canada', 'uk', 'us'],
      },
      salesTaxReturnId: {
        type: 'string',
        description:
          "The vendor's sales tax return information, used for tracking and reporting sales tax liabilities.",
      },
      salutation: {
        type: 'string',
        description:
          'The formal salutation title that precedes the name of the contact person for this vendor, such as "Mr.", "Ms.", or "Dr.".',
      },
      shippingAddress: {
        type: 'object',
        description: "The vendor's shipping address.",
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
      taxIdentificationNumber: {
        type: 'string',
        description: "The vendor's tax identification number (e.g., EIN or SSN).",
      },
      taxRegistrationNumber: {
        type: 'string',
        description: "The vendor's tax registration number, for use in Canada or the UK.",
      },
      termsId: {
        type: 'string',
        description: "The vendor's payment terms, defining when payment is due and any applicable discounts.",
      },
      vendorTypeId: {
        type: 'string',
        description:
          "The vendor's type, used for categorizing vendors into meaningful segments, such as industry or region.",
      },
    },
    required: ['name', 'conductorEndUserId'],
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await conductor.qbd.vendors.create(body));
};

export default { metadata, tool, handler };
