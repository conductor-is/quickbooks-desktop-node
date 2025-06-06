// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.time_tracking_activities',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/quickbooks-desktop/time-tracking-activities',
};

export const tool: Tool = {
  name: 'create_qbd_time_tracking_activities',
  description: 'Creates a new time tracking activity.',
  inputSchema: {
    type: 'object',
    properties: {
      duration: {
        type: 'string',
        description:
          "The time spent performing the service during this time tracking activity, in ISO 8601 format for time intervals (PTnHnMnS). For example, 1 hour and 30 minutes is represented as PT1H30M.\n\n**NOTE**: Although seconds can be specified when creating a time tracking activity, they are not returned in responses since QuickBooks Desktop's UI does not display seconds.\n\n**IMPORTANT**: This field is required for updating time tracking activities, even if the field is not being modified, because of a bug in QuickBooks itself.",
      },
      entityId: {
        type: 'string',
        description:
          'The employee, vendor, or person on QuickBooks\'s "Other Names" list whose time is being tracked in this time tracking activity. This cannot refer to a customer - use the `customer` field to associate a customer or customer-job with this time tracking activity.',
      },
      transactionDate: {
        type: 'string',
        description: 'The date of this time tracking activity, in ISO 8601 format (YYYY-MM-DD).',
        format: 'date',
      },
      'Conductor-End-User-Id': {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      billingStatus: {
        type: 'string',
        description:
          'The billing status of this time tracking activity.\n\n**IMPORTANT**: When this field is set to "billable" for time tracking activities, both `customer` and `serviceItem` are required so that an invoice can be created.',
        enum: ['billable', 'has_been_billed', 'not_billable'],
      },
      classId: {
        type: 'string',
        description:
          "The time tracking activity's class. Classes can be used to categorize objects into meaningful segments, such as department, location, or type of work. In QuickBooks, class tracking is off by default.",
      },
      customerId: {
        type: 'string',
        description:
          'The customer or customer-job to which this time tracking activity could be billed. If `billingStatus` is set to "billable", this field is required.',
      },
      externalId: {
        type: 'string',
        description:
          'A globally unique identifier (GUID) you, the developer, can provide for tracking this object in your external system. This field is immutable and can only be set during object creation.\n\n**IMPORTANT**: This field must be formatted as a valid GUID; otherwise, QuickBooks will return an error.',
      },
      note: {
        type: 'string',
        description: 'A note or comment about this time tracking activity.',
      },
      payrollWageItemId: {
        type: 'string',
        description:
          'The payroll wage item (e.g., Regular Pay, Overtime Pay) to use for this time tracking activity. This field can only be used for time tracking if: (1) the person specified in `entity` is an employee in QuickBooks, and (2) the "Use time data to create paychecks" preference is enabled in their payroll settings.',
      },
      serviceItemId: {
        type: 'string',
        description:
          'The type of service performed during this time tracking activity, referring to billable or purchasable services such as specialized labor, consulting hours, and professional fees.\n\n**NOTE**: This field is not required if no `customer` is specified. However, if `billingStatus` is set to "billable", both this field and `customer` are required.',
      },
    },
  },
};

export const handler = async (client: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.qbd.timeTrackingActivities.create(body));
};

export default { metadata, tool, handler };
