// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.customers',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/customers/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_customers',
  description: 'Updates an existing customer.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the customer to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the customer object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      conductorEndUserId: {
        type: 'string',
        description: 'The ID of the End-User to receive this request.',
      },
      accountNumber: {
        type: 'string',
        description:
          'The customer\'s account number, which appears in the QuickBooks chart of accounts, reports, and graphs.\n\nNote that if the "Use Account Numbers" preference is turned off in QuickBooks, the account number may not be visible in the user interface, but it can still be set and retrieved through the API.',
      },
      additionalContacts: {
        type: 'array',
        description: 'Additional alternate contacts for this customer.',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The QuickBooks-assigned unique identifier of the contact to update.',
            },
            revisionNumber: {
              type: 'string',
              description:
                "The current QuickBooks-assigned revision number of the contact object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
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
            firstName: {
              type: 'string',
              description: "The contact's first name.\n\nMaximum length: 25 characters.",
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
          required: ['id', 'revisionNumber'],
        },
      },
      additionalNotes: {
        type: 'array',
        description: 'Additional notes about this customer.',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              description: 'The ID of the note to update.',
            },
            note: {
              type: 'string',
              description: 'The text of this note.',
            },
          },
          required: ['id', 'note'],
        },
      },
      alternateContact: {
        type: 'string',
        description: 'The name of a alternate contact person for this customer.',
      },
      alternatePhone: {
        type: 'string',
        description: "The customer's alternate telephone number.",
      },
      alternateShippingAddresses: {
        type: 'array',
        description:
          'A list of additional shipping addresses for this customer. Useful when the customer has multiple shipping locations.',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description:
                'The case-insensitive unique name of this shipping address, unique across all shipping addresses.\n\n**NOTE**: Shipping addresses do not have a `fullName` field because they are not hierarchical objects, which is why `name` is unique for them but not for objects that have parents.\n\nMaximum length: 41 characters.',
            },
            city: {
              type: 'string',
              description:
                'The city, district, suburb, town, or village name of the shipping address.\n\nMaximum length: 31 characters.',
            },
            country: {
              type: 'string',
              description: 'The country name of the shipping address.',
            },
            isDefaultShippingAddress: {
              type: 'boolean',
              description: 'Indicates whether this shipping address is the default shipping address.',
            },
            line1: {
              type: 'string',
              description:
                'The first line of the shipping address (e.g., street, PO Box, or company name).\n\nMaximum length: 41 characters.',
            },
            line2: {
              type: 'string',
              description:
                'The second line of the shipping address, if needed (e.g., apartment, suite, unit, or building).\n\nMaximum length: 41 characters.',
            },
            line3: {
              type: 'string',
              description:
                'The third line of the shipping address, if needed.\n\nMaximum length: 41 characters.',
            },
            line4: {
              type: 'string',
              description:
                'The fourth line of the shipping address, if needed.\n\nMaximum length: 41 characters.',
            },
            line5: {
              type: 'string',
              description:
                'The fifth line of the shipping address, if needed.\n\nMaximum length: 41 characters.',
            },
            note: {
              type: 'string',
              description:
                'A note written at the bottom of the shipping address in the form in which it appears, such as the invoice form.',
            },
            postalCode: {
              type: 'string',
              description:
                'The postal code or ZIP code of the shipping address.\n\nMaximum length: 13 characters.',
            },
            state: {
              type: 'string',
              description:
                'The state, county, province, or region name of the shipping address.\n\nMaximum length: 21 characters.',
            },
          },
          required: ['name'],
        },
      },
      billingAddress: {
        type: 'object',
        description: "The customer's billing address.",
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
      ccEmail: {
        type: 'string',
        description: 'An email address to carbon copy (CC) on communications with this customer.',
      },
      classId: {
        type: 'string',
        description:
          "The customer's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default.",
      },
      companyName: {
        type: 'string',
        description:
          'The name of the company associated with this customer. This name is used on invoices, checks, and other forms.',
      },
      contact: {
        type: 'string',
        description: 'The name of the primary contact person for this customer.',
      },
      creditCard: {
        type: 'object',
        description:
          "The customer's credit card information, including card type, number, and expiration date, used for processing credit card payments.",
        properties: {
          address: {
            type: 'string',
            description: "The card's billing address.",
          },
          expirationMonth: {
            type: 'number',
            description: 'The month when the credit card expires.',
          },
          expirationYear: {
            type: 'number',
            description: 'The year when the credit card expires.',
          },
          name: {
            type: 'string',
            description: "The cardholder's name on the card.",
          },
          number: {
            type: 'string',
            description: 'The credit card number. Must be masked with lower case "x" and no dashes.',
          },
          postalCode: {
            type: 'string',
            description: "The card's billing address ZIP or postal code.",
          },
        },
      },
      creditLimit: {
        type: 'string',
        description:
          "The customer's credit limit, represented as a decimal string. This is the maximum amount of money this customer can spend before being billed. If `null`, there is no credit limit.",
      },
      currencyId: {
        type: 'string',
        description:
          "The customer's currency. For built-in currencies, the name and code are standard international values. For user-defined currencies, all values are editable.",
      },
      customContactFields: {
        type: 'array',
        description:
          'Additional custom contact fields for this customer, such as phone numbers or email addresses.',
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
      customerTypeId: {
        type: 'string',
        description:
          "The customer's type, used for categorizing customers into meaningful segments, such as industry or region.",
      },
      email: {
        type: 'string',
        description: "The customer's email address.",
      },
      fax: {
        type: 'string',
        description: "The customer's fax number.",
      },
      firstName: {
        type: 'string',
        description:
          'The first name of the contact person for this customer.\n\nMaximum length: 25 characters.',
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this customer is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      jobDescription: {
        type: 'string',
        description:
          "A brief description of this customer's job, if this object is a job (i.e., sub-customer).",
      },
      jobEndDate: {
        type: 'string',
        description:
          "The actual completion date of this customer's job, if applicable, in ISO 8601 format (YYYY-MM-DD).",
        format: 'date',
      },
      jobProjectedEndDate: {
        type: 'string',
        description:
          "The projected completion date for this customer's job, if applicable, in ISO 8601 format (YYYY-MM-DD).",
        format: 'date',
      },
      jobStartDate: {
        type: 'string',
        description:
          "The date when work on this customer's job began, if applicable, in ISO 8601 format (YYYY-MM-DD).",
        format: 'date',
      },
      jobStatus: {
        type: 'string',
        description: "The status of this customer's job, if this object is a job (i.e., sub-customer).",
        enum: ['awarded', 'closed', 'in_progress', 'none', 'not_awarded', 'pending'],
      },
      jobTitle: {
        type: 'string',
        description: 'The job title of the contact person for this customer.',
      },
      jobTypeId: {
        type: 'string',
        description:
          "The type or category of this customer's job, if this object is a job (i.e., sub-customer). Useful for classifying into meaningful segments (e.g., repair, installation, consulting).",
      },
      lastName: {
        type: 'string',
        description:
          'The last name of the contact person for this customer.\n\nMaximum length: 25 characters.',
      },
      middleName: {
        type: 'string',
        description:
          'The middle name of the contact person for this customer.\n\nMaximum length: 5 characters.',
      },
      name: {
        type: 'string',
        description:
          'The case-insensitive name of this customer. Not guaranteed to be unique because it does not include the names of its hierarchical parent objects like `fullName` does. For example, two customers could both have the `name` "Website Redesign Project", but they could have unique `fullName` values, such as "ABC Corporation:Website Redesign Project" and "Baker:Website Redesign Project".\n\nMaximum length: 41 characters.',
      },
      note: {
        type: 'string',
        description: 'A note or comment about this customer.',
      },
      parentId: {
        type: 'string',
        description:
          'The parent customer one level above this one in the hierarchy. For example, if this customer has a `fullName` of "ABC Corporation:Website Redesign Project", its parent has a `fullName` of "ABC Corporation". If this customer is at the top level, this field will be `null`.',
      },
      phone: {
        type: 'string',
        description: "The customer's primary telephone number.",
      },
      preferredDeliveryMethod: {
        type: 'string',
        description: 'The preferred method for delivering invoices and other documents to this customer.',
        enum: ['email', 'mail', 'none'],
      },
      preferredPaymentMethodId: {
        type: 'string',
        description: "The customer's preferred payment method (e.g., cash, check, credit card).",
      },
      priceLevelId: {
        type: 'string',
        description:
          "The customer's custom price level that QuickBooks automatically applies to calculate item rates in new transactions (e.g., invoices, sales receipts, sales orders, and credit memos) for this customer. While applied automatically, this can be overridden when creating individual transactions. Note that transactions will not show the price level itself, only the final `rate` calculated from it.",
      },
      resaleNumber: {
        type: 'string',
        description:
          "The customer's resale number, used if the customer is purchasing items for resale. This number does not affect sales tax calculations or reports in QuickBooks.",
      },
      salesRepresentativeId: {
        type: 'string',
        description:
          "The customer's sales representative. Sales representatives can be employees, vendors, or other names in QuickBooks.",
      },
      salesTaxCodeId: {
        type: 'string',
        description:
          'The default sales-tax code for transactions with this customer, determining whether the transactions are taxable or non-taxable. This can be overridden at the transaction or transaction-line level.\n\nDefault codes include "Non" (non-taxable) and "Tax" (taxable), but custom codes can also be created in QuickBooks. If QuickBooks is not set up to charge sales tax (via the "Do You Charge Sales Tax?" preference), it will assign the default non-taxable code to all sales.',
      },
      salesTaxCountry: {
        type: 'string',
        description: 'The country for which sales tax is collected for this customer.',
        enum: ['australia', 'canada', 'uk', 'us'],
      },
      salesTaxItemId: {
        type: 'string',
        description:
          "The sales-tax item used to calculate the actual tax amount for this customer's transactions by applying a specific tax rate collected for a single tax agency. Unlike `salesTaxCode`, which only indicates general taxability, this field drives the actual tax calculation and reporting.",
      },
      salutation: {
        type: 'string',
        description:
          'The formal salutation title that precedes the name of the contact person for this customer, such as "Mr.", "Ms.", or "Dr.".',
      },
      shippingAddress: {
        type: 'object',
        description: "The customer's shipping address.",
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
      taxRegistrationNumber: {
        type: 'string',
        description: "The customer's tax registration number, for use in Canada or the UK.",
      },
      termsId: {
        type: 'string',
        description:
          "The customer's payment terms, defining when payment is due and any applicable discounts.",
      },
    },
    required: ['id', 'revisionNumber', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  try {
    return asTextContentResult(await conductor.qbd.customers.update(id, body));
  } catch (error) {
    if (error instanceof Conductor.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
