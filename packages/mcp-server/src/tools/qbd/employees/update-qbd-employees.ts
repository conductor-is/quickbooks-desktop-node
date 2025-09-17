// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.employees',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/employees/{id}',
};

export const tool: Tool = {
  name: 'update_qbd_employees',
  description:
    'Updates an employee record, allowing you to revise contact details, employment status dates, supervisory assignments, payroll configuration, and additional notes to keep workforce data current.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The QuickBooks-assigned unique identifier of the employee to update.',
      },
      revisionNumber: {
        type: 'string',
        description:
          "The current QuickBooks-assigned revision number of the employee object you are updating, which you can get by fetching the object first. Provide the most recent `revisionNumber` to ensure you're working with the latest data; otherwise, the update will return an error.",
      },
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"conductorEndUserId:{{END_USER_ID}}"`).',
      },
      accountNumber: {
        type: 'string',
        description:
          'The employee\'s account number, which appears in the QuickBooks chart of accounts, reports, and graphs.\n\nNote that if the "Use Account Numbers" preference is turned off in QuickBooks, the account number may not be visible in the user interface, but it can still be set and retrieved through the API.',
      },
      additionalNotes: {
        type: 'array',
        description: 'Additional notes about this employee.',
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
      address: {
        type: 'object',
        description:
          "The employee's address.\n\nIf the company uses QuickBooks Payroll for this employee, this address must specify a complete address, including city, state, ZIP (or postal) code, and at least one line of the street address.",
        properties: {
          city: {
            type: 'string',
            description:
              'The city, district, suburb, town, or village name of the employee address.\n\nMaximum length: 31 characters.',
          },
          country: {
            type: 'string',
            description: 'The country name of the employee address.',
          },
          line1: {
            type: 'string',
            description:
              'The first line of the employee address (e.g., street, PO Box, or company name).\n\nMaximum length: 41 characters.',
          },
          line2: {
            type: 'string',
            description:
              'The second line of the employee address, if needed (e.g., apartment, suite, unit, or building).\n\nMaximum length: 41 characters.',
          },
          line3: {
            type: 'string',
            description:
              'The third line of the employee address, if needed.\n\nMaximum length: 41 characters.',
          },
          line4: {
            type: 'string',
            description:
              'The fourth line of the employee address, if needed.\n\nMaximum length: 41 characters.',
          },
          postalCode: {
            type: 'string',
            description:
              'The postal code or ZIP code of the employee address.\n\nMaximum length: 13 characters.',
          },
          state: {
            type: 'string',
            description:
              'The U.S. state of the employee address. QuickBooks requires this field to be a U.S. state abbreviation (e.g., "CA" for California). See enum for all possible values.',
            enum: [
              'none',
              'armed_forces_americas',
              'armed_forces_europe',
              'armed_forces_pacific',
              'AK',
              'AL',
              'AR',
              'AZ',
              'CA',
              'CO',
              'CT',
              'DC',
              'DE',
              'FL',
              'GA',
              'HI',
              'IA',
              'ID',
              'IL',
              'IN',
              'KS',
              'KY',
              'LA',
              'MA',
              'MD',
              'ME',
              'MI',
              'MN',
              'MO',
              'MS',
              'MT',
              'NB',
              'NC',
              'ND',
              'NE',
              'NH',
              'NJ',
              'NM',
              'NV',
              'NY',
              'OH',
              'OK',
              'OR',
              'PA',
              'PR',
              'RI',
              'SC',
              'SD',
              'TN',
              'TX',
              'UT',
              'VA',
              'VT',
              'WA',
              'WI',
              'WV',
              'WY',
            ],
          },
        },
      },
      adjustedServiceDate: {
        type: 'string',
        description:
          'The adjusted service date for this employee, in ISO 8601 format (YYYY-MM-DD). This date accounts for previous employment periods or leaves that affect seniority.',
        format: 'date',
      },
      alternatePhone: {
        type: 'string',
        description: "The employee's alternate telephone number.",
      },
      billingRateId: {
        type: 'string',
        description:
          "The employee's billing rate, used to override service item rates in time tracking activities.",
      },
      birthDate: {
        type: 'string',
        description: "This employee's date of birth, in ISO 8601 format (YYYY-MM-DD).",
        format: 'date',
      },
      customContactFields: {
        type: 'array',
        description:
          'Additional custom contact fields for this employee, such as phone numbers or email addresses.',
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
      department: {
        type: 'string',
        description:
          'The employee\'s department. Found in the "employment job details" section of the employee\'s record in QuickBooks.',
      },
      description: {
        type: 'string',
        description:
          'A description of this employee. Found in the "employment job details" section of the employee\'s record in QuickBooks.',
      },
      disabilityDescription: {
        type: 'string',
        description: "A description of this employee's disability.",
      },
      disabilityStatus: {
        type: 'string',
        description: 'Indicates whether this employee is disabled.',
        enum: ['disabled', 'non_disabled'],
      },
      email: {
        type: 'string',
        description: "The employee's email address.",
      },
      emergencyContact: {
        type: 'object',
        description: "The employee's emergency contacts.",
        properties: {
          primaryContact: {
            type: 'object',
            description: "The employee's primary emergency contact.",
            properties: {
              name: {
                type: 'string',
                description: 'The name of the contact field (e.g., "old address", "secondary phone").',
              },
              value: {
                type: 'string',
                description: 'The value of the contact field.',
              },
              relation: {
                type: 'string',
                description: 'The relationship of the employee to the employee.',
                enum: [
                  'brother',
                  'daughter',
                  'father',
                  'friend',
                  'mother',
                  'other',
                  'partner',
                  'sister',
                  'son',
                  'spouse',
                ],
              },
            },
            required: ['name', 'value'],
          },
          secondaryContact: {
            type: 'object',
            description: "The employee's secondary emergency contact.",
            properties: {
              name: {
                type: 'string',
                description: 'The name of the contact field (e.g., "old address", "secondary phone").',
              },
              value: {
                type: 'string',
                description: 'The value of the contact field.',
              },
              relation: {
                type: 'string',
                description: 'The relationship of the employee to the employee.',
                enum: [
                  'brother',
                  'daughter',
                  'father',
                  'friend',
                  'mother',
                  'other',
                  'partner',
                  'sister',
                  'son',
                  'spouse',
                ],
              },
            },
            required: ['name', 'value'],
          },
        },
      },
      employeePayroll: {
        type: 'object',
        description: "The employee's payroll information.",
        properties: {
          classId: {
            type: 'string',
            description:
              "The employee's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default.",
          },
          deleteAllEarnings: {
            type: 'boolean',
            description: 'When `true`, deletes all earnings records for this employee.',
          },
          earnings: {
            type: 'array',
            description:
              "The employee's earnings.\n\n**IMPORTANT**: When updating employees, if you include any earnings records in your update request, QuickBooks will delete all existing earnings records for this employee and replace them with the new records you provide. If you do not include any earnings records, the existing earnings records will remain unchanged. To delete all earnings records without adding new ones, set the `deleteAllEarnings` field to `true`.",
            items: {
              type: 'object',
              properties: {
                payrollWageItemId: {
                  type: 'string',
                  description:
                    'The payroll wage item that defines how this employee is paid (e.g., Regular Pay, Overtime Pay). This determines the payment scheme used for payroll calculations.',
                },
                rate: {
                  type: 'string',
                  description: 'The hourly rate for this employee, represented as a decimal string.',
                },
                ratePercent: {
                  type: 'string',
                  description: 'The hourly rate for this employee expressed as a percentage.',
                },
              },
              required: ['payrollWageItemId'],
            },
          },
          payPeriod: {
            type: 'string',
            description:
              'How frequently this employee is paid (e.g., weekly, biweekly, monthly). This determines the schedule for generating paychecks.',
            enum: ['biweekly', 'daily', 'monthly', 'quarterly', 'semimonthly', 'weekly', 'yearly'],
          },
          sickHours: {
            type: 'object',
            description:
              "The employee's sick hours, including how sick time is accrued and the total hours accrued.",
            properties: {
              accrualPeriod: {
                type: 'string',
                description: "How frequently the employee's sick hours are accrued.",
                enum: ['accrues_annually', 'accrues_hourly', 'accrues_per_paycheck'],
              },
              accrualStartDate: {
                type: 'string',
                description:
                  "The date the employee's sick hours began to accrue, in ISO 8601 format (YYYY-MM-DD).",
                format: 'date',
              },
              hoursAccruedPerPeriod: {
                type: 'string',
                description:
                  'The number of sick hours the employee will accrue per accrual period, in ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as PT1H30M.',
              },
              hoursAvailable: {
                type: 'string',
                description:
                  'The total number of sick hours currently available for the employee to use, in ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as PT1H30M. Defaults to 0.',
              },
              hoursUsed: {
                type: 'string',
                description:
                  'The number of sick hours the employee has used, in ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as PT1H30M.',
              },
              maximumHours: {
                type: 'string',
                description:
                  'The maximum number of sick hours the employee can accrue, in ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as PT1H30M.',
              },
              resetsHoursEachYear: {
                type: 'boolean',
                description:
                  "Indicates whether the employee's sick hours reset to zero at the beginning of the new year.",
              },
            },
          },
          useTimeDataToCreatePaychecks: {
            type: 'string',
            description: 'Indicates whether this employee is using time-tracking data to create paychecks.',
            enum: ['does_not_use_time_data', 'not_set', 'uses_time_data'],
          },
          vacationHours: {
            type: 'object',
            description:
              "The employee's vacation hours, including how vacation time is accrued and the total hours accrued.",
            properties: {
              accrualPeriod: {
                type: 'string',
                description: "How frequently the employee's vacation hours are accrued.",
                enum: ['accrues_annually', 'accrues_hourly', 'accrues_per_paycheck'],
              },
              accrualStartDate: {
                type: 'string',
                description:
                  "The date the employee's vacation hours began to accrue, in ISO 8601 format (YYYY-MM-DD).",
                format: 'date',
              },
              hoursAccruedPerPeriod: {
                type: 'string',
                description:
                  'The number of vacation hours the employee will accrue per accrual period, in ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as PT1H30M.',
              },
              hoursAvailable: {
                type: 'string',
                description:
                  'The total number of vacation hours currently available for the employee to use, in ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as PT1H30M. Defaults to 0.',
              },
              hoursUsed: {
                type: 'string',
                description:
                  'The number of vacation hours the employee has used, in ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as PT1H30M.',
              },
              maximumHours: {
                type: 'string',
                description:
                  'The maximum number of vacation hours the employee can accrue, in ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as PT1H30M.',
              },
              resetsHoursEachYear: {
                type: 'boolean',
                description:
                  "Indicates whether the employee's vacation hours reset to zero at the beginning of the new year.",
              },
            },
          },
        },
      },
      employeeType: {
        type: 'string',
        description:
          'The employee type. This affects payroll taxes - a statutory employee is defined as an employee by statute. Note that owners/partners are typically on the "Other Names" list in QuickBooks, but if listed as an employee their type will be `owner`.',
        enum: ['officer', 'owner', 'regular', 'statutory'],
      },
      employmentStatus: {
        type: 'string',
        description: 'Indicates whether this employee is a part-time or full-time employee.',
        enum: ['full_time', 'part_time'],
      },
      ethnicity: {
        type: 'string',
        description: "This employee's ethnicity.",
        enum: ['american_indian', 'asian', 'black', 'hawaiian', 'hispanic', 'white', 'two_or_more_races'],
      },
      fax: {
        type: 'string',
        description: "The employee's fax number.",
      },
      firstName: {
        type: 'string',
        description: "The employee's first name.\n\nMaximum length: 25 characters.",
      },
      hiredDate: {
        type: 'string',
        description: 'The date this employee was hired, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      i9OnFileStatus: {
        type: 'string',
        description: "Indicates whether this employee's I-9 is on file.",
        enum: ['on_file', 'not_on_file'],
      },
      isActive: {
        type: 'boolean',
        description:
          'Indicates whether this employee is active. Inactive objects are typically hidden from views and reports in QuickBooks. Defaults to `true`.',
      },
      jobTitle: {
        type: 'string',
        description: "The employee's job title.",
      },
      keyEmployeeStatus: {
        type: 'string',
        description: 'Indicates whether this employee is a key employee.',
        enum: ['key_employee', 'non_key_employee'],
      },
      lastName: {
        type: 'string',
        description: "The employee's last name.\n\nMaximum length: 25 characters.",
      },
      middleName: {
        type: 'string',
        description: "The employee's middle name.\n\nMaximum length: 5 characters.",
      },
      militaryStatus: {
        type: 'string',
        description: "This employee's military status if they are a U.S. veteran.",
        enum: ['active', 'reserve'],
      },
      mobile: {
        type: 'string',
        description: "The employee's mobile phone number.",
      },
      note: {
        type: 'string',
        description: 'A note or comment about this employee.',
      },
      originalHireDate: {
        type: 'string',
        description: 'The original hire date for this employee, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      overtimeExemptStatus: {
        type: 'string',
        description:
          'Indicates whether this employee is exempt from overtime pay. This classification is based on U.S. labor laws (FLSA).',
        enum: ['exempt', 'non_exempt'],
      },
      pager: {
        type: 'string',
        description: "The employee's pager number.",
      },
      pagerPin: {
        type: 'string',
        description: "The employee's pager PIN.",
      },
      phone: {
        type: 'string',
        description: "The employee's primary telephone number.",
      },
      printAs: {
        type: 'string',
        description:
          'The name to use when printing this employee from QuickBooks. By default, this is the same as the `name` field.',
      },
      salutation: {
        type: 'string',
        description:
          'The employee\'s formal salutation title that precedes their name, such as "Mr.", "Ms.", or "Dr.".',
      },
      supervisorId: {
        type: 'string',
        description:
          'The employee\'s supervisor. Found in the "employment job details" section of the employee\'s record in QuickBooks.',
      },
      targetBonus: {
        type: 'string',
        description:
          'The target bonus for this employee, represented as a decimal string. Found in the "employment job details" section of the employee\'s record in QuickBooks.',
      },
      terminationDate: {
        type: 'string',
        description:
          "The date this employee's employment ended with the company, in ISO 8601 format (YYYY-MM-DD). This is also known as the released date or separation date.",
        format: 'date',
      },
      usCitizenshipStatus: {
        type: 'string',
        description: 'Indicates whether this employee is a U.S. citizen.',
        enum: ['citizen', 'non_citizen'],
      },
      usVeteranStatus: {
        type: 'string',
        description: 'Indicates whether this employee is a U.S. veteran.',
        enum: ['veteran', 'non_veteran'],
      },
      workAuthorizationExpirationDate: {
        type: 'string',
        description: "The date this employee's work authorization expires, in ISO 8601 format (YYYY-MM-DD).",
        format: 'date',
      },
    },
    required: ['id', 'revisionNumber', 'conductorEndUserId'],
  },
  annotations: {},
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await conductor.qbd.employees.update(id, body));
};

export default { metadata, tool, handler };
