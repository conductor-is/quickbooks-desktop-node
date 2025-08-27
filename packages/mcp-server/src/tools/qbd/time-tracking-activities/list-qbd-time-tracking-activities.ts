// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'conductor-node-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Conductor from 'conductor-node';

export const metadata: Metadata = {
  resource: 'qbd.time_tracking_activities',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/quickbooks-desktop/time-tracking-activities',
};

export const tool: Tool = {
  name: 'list_qbd_time_tracking_activities',
  description:
    'Returns a list of time tracking activities. Use the `cursor` parameter to paginate through the results.',
  inputSchema: {
    type: 'object',
    properties: {
      conductorEndUserId: {
        type: 'string',
        description:
          'The ID of the EndUser to receive this request (e.g., `"Conductor-End-User-Id: {{END_USER_ID}}"`).',
      },
      cursor: {
        type: 'string',
        description:
          'The pagination token to fetch the next set of results when paginating with the `limit` parameter. Do not include this parameter on the first call. Use the `nextCursor` value returned in the previous response to request subsequent results.',
      },
      entityIds: {
        type: 'array',
        description:
          'Filter for time tracking activities tracking the time of these employees, vendors, or persons on QuickBooks\'s "Other Names" list.',
        items: {
          type: 'string',
        },
      },
      ids: {
        type: 'array',
        description:
          'Filter for specific time tracking activities by their QuickBooks-assigned unique identifier(s).\n\n**IMPORTANT**: If you include this parameter, QuickBooks will ignore all other query parameters for this request.\n\n**NOTE**: If any of the values you specify in this parameter are not found, the request will return an error.',
        items: {
          type: 'string',
        },
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of objects to return. Accepts values ranging from 1 to 150, defaults to 150. When used with cursor-based pagination, this parameter controls how many results are returned per page. To paginate through results, combine this with the `cursor` parameter. Each response will include a `nextCursor` value that can be passed to subsequent requests to retrieve the next page of results.',
      },
      transactionDateFrom: {
        type: 'string',
        description:
          "Filter for time tracking activities whose `date` field is on or after this date, in ISO 8601 format (YYYY-MM-DD). QuickBooks Desktop interprets this date-only value in the host machine’s local timezone; i.e., midnight in the timezone of the end-user's computer running QuickBooks Desktop.",
        format: 'date',
      },
      transactionDateTo: {
        type: 'string',
        description:
          "Filter for time tracking activities whose `date` field is on or before this date, in ISO 8601 format (YYYY-MM-DD). QuickBooks Desktop interprets this date-only value in the host machine’s local timezone; i.e., midnight in the timezone of the end-user's computer running QuickBooks Desktop.",
        format: 'date',
      },
      updatedAfter: {
        type: 'string',
        description:
          'Filter for time tracking activities updated on or after this date/time. Format: ISO 8601. Accepts date-only (YYYY-MM-DD), datetime without timezone (YYYY-MM-DDTHH:mm:ss), or datetime with timezone (YYYY-MM-DDTHH:mm:ss±HH:mm). Date-only and timezone-less datetimes are passed through for QuickBooks Desktop to interpret in the host machine’s local timezone. If the datetime includes a timezone (e.g., `+05:30` or `Z`), QuickBooks Desktop uses that timezone to interpret the timestamp.',
      },
      updatedBefore: {
        type: 'string',
        description:
          'Filter for time tracking activities updated on or before this date/time. Format: ISO 8601. Accepts date-only (YYYY-MM-DD), datetime without timezone (YYYY-MM-DDTHH:mm:ss), or datetime with timezone (YYYY-MM-DDTHH:mm:ss±HH:mm). Date-only and timezone-less datetimes are passed through for QuickBooks Desktop to interpret in the host machine’s local timezone. If the datetime includes a timezone (e.g., `+05:30` or `Z`), QuickBooks Desktop uses that timezone to interpret the timestamp.',
      },
    },
    required: ['conductorEndUserId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (conductor: Conductor, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await conductor.qbd.timeTrackingActivities.list(body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
