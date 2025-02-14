// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Conductor from 'conductor-node';
import { Response } from 'node-fetch';

const client = new Conductor({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource employees', () => {
  test('create: only required params', async () => {
    const responsePromise = client.qbd.employees.create({ conductorEndUserId: 'end_usr_1234567abcdefg' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.qbd.employees.create({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountNumber: '1010',
      additionalNotes: [{ note: 'This is a fun note.' }],
      address: {
        city: 'San Francisco',
        country: 'United States',
        line1: 'Conductor Labs Inc.',
        line2: '540 Market St.',
        line3: 'Suite 100',
        line4: '',
        postalCode: '94110',
        state: 'none',
      },
      adjustedServiceDate: '2019-12-27',
      alternatePhone: '+1-555-987-6543',
      billingRateId: '80000001-1234567890',
      birthDate: '2019-12-27',
      customContactFields: [{ name: 'Main Phone', value: '555-123-4567' }],
      department: 'Sales',
      description: 'This employee is a key employee.',
      disabilityDescription: 'Cerebral Palsy',
      disabilityStatus: 'disabled',
      email: 'employee@example.com',
      emergencyContact: {
        primaryContact: { name: 'Main Phone', value: '555-123-4567', relation: 'brother' },
        secondaryContact: { name: 'Main Phone', value: '555-123-4567', relation: 'brother' },
      },
      employeePayroll: {
        classId: '80000001-1234567890',
        earnings: [{ payrollWageItemId: '80000001-1234567890', rate: '10.00', ratePercent: '10.5' }],
        payPeriod: 'biweekly',
        sickHours: {
          accrualPeriod: 'accrues_annually',
          accrualStartDate: '2019-12-27',
          hoursAccruedPerPeriod: '8',
          hoursAvailable: '40',
          hoursUsed: '24',
          maximumHours: '160',
          resetsHoursEachYear: false,
        },
        useTimeDataToCreatePaychecks: 'does_not_use_time_data',
        vacationHours: {
          accrualPeriod: 'accrues_annually',
          accrualStartDate: '2019-12-27',
          hoursAccruedPerPeriod: '8',
          hoursAvailable: '40',
          hoursUsed: '24',
          maximumHours: '160',
          resetsHoursEachYear: false,
        },
      },
      employeeType: 'officer',
      employmentStatus: 'full_time',
      ethnicity: 'american_indian',
      externalId: '12345678-abcd-1234-abcd-1234567890ab',
      fax: '+1-555-555-1212',
      firstName: 'John',
      gender: 'male',
      hiredDate: '2019-12-27',
      i9OnFileStatus: 'on_file',
      isActive: true,
      jobTitle: 'Purchasing Manager',
      keyEmployeeStatus: 'key_employee',
      lastName: 'Doe',
      middleName: 'A.',
      militaryStatus: 'active',
      mobile: '+1-555-555-1212',
      note: 'This employee is a key employee.',
      originalHireDate: '2019-12-27',
      overtimeExemptStatus: 'exempt',
      pager: '+1-555-555-1212',
      pagerPin: '1234',
      phone: '+1-555-123-4567',
      printAs: 'John Doe',
      salutation: 'Dr.',
      ssn: '123-45-6789',
      supervisorId: '80000001-1234567890',
      targetBonus: '10000.00',
      terminationDate: '2019-12-27',
      usCitizenshipStatus: 'citizen',
      usVeteranStatus: 'veteran',
      workAuthorizationExpirationDate: '2019-12-27',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.qbd.employees.retrieve('80000001-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.qbd.employees.retrieve('80000001-1234567890', {
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = client.qbd.employees.update('80000001-1234567890', {
      revisionNumber: '1721172183',
      conductorEndUserId: 'end_usr_1234567abcdefg',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.qbd.employees.update('80000001-1234567890', {
      revisionNumber: '1721172183',
      conductorEndUserId: 'end_usr_1234567abcdefg',
      accountNumber: '1010',
      additionalNotes: [{ id: 1, note: 'This is a fun note.' }],
      address: {
        city: 'San Francisco',
        country: 'United States',
        line1: 'Conductor Labs Inc.',
        line2: '540 Market St.',
        line3: 'Suite 100',
        line4: '',
        postalCode: '94110',
        state: 'none',
      },
      adjustedServiceDate: '2019-12-27',
      alternatePhone: '+1-555-987-6543',
      billingRateId: '80000001-1234567890',
      birthDate: '2019-12-27',
      customContactFields: [{ name: 'Main Phone', value: '555-123-4567' }],
      department: 'Sales',
      description: 'This employee is a key employee.',
      disabilityDescription: 'Cerebral Palsy',
      disabilityStatus: 'disabled',
      email: 'employee@example.com',
      emergencyContact: {
        primaryContact: { name: 'Main Phone', value: '555-123-4567', relation: 'brother' },
        secondaryContact: { name: 'Main Phone', value: '555-123-4567', relation: 'brother' },
      },
      employeePayroll: {
        classId: '80000001-1234567890',
        earnings: [{ payrollWageItemId: '80000001-1234567890', rate: '10.00', ratePercent: '10.5' }],
        payPeriod: 'biweekly',
        sickHours: {
          accrualPeriod: 'accrues_annually',
          accrualStartDate: '2019-12-27',
          hoursAccruedPerPeriod: '8',
          hoursAvailable: '40',
          hoursUsed: '24',
          maximumHours: '160',
          resetsHoursEachYear: false,
        },
        useTimeDataToCreatePaychecks: 'does_not_use_time_data',
        vacationHours: {
          accrualPeriod: 'accrues_annually',
          accrualStartDate: '2019-12-27',
          hoursAccruedPerPeriod: '8',
          hoursAvailable: '40',
          hoursUsed: '24',
          maximumHours: '160',
          resetsHoursEachYear: false,
        },
      },
      employeeType: 'officer',
      employmentStatus: 'full_time',
      ethnicity: 'american_indian',
      fax: '+1-555-555-1212',
      firstName: 'John',
      hiredDate: '2019-12-27',
      i9OnFileStatus: 'on_file',
      isActive: true,
      jobTitle: 'Purchasing Manager',
      keyEmployeeStatus: 'key_employee',
      lastName: 'Doe',
      middleName: 'A.',
      militaryStatus: 'active',
      mobile: '+1-555-555-1212',
      note: 'This employee is a key employee.',
      originalHireDate: '2019-12-27',
      overtimeExemptStatus: 'exempt',
      pager: '+1-555-555-1212',
      pagerPin: '1234',
      phone: '+1-555-123-4567',
      printAs: 'John Doe',
      salutation: 'Dr.',
      supervisorId: '80000001-1234567890',
      targetBonus: '10000.00',
      terminationDate: '2019-12-27',
      usCitizenshipStatus: 'citizen',
      usVeteranStatus: 'veteran',
      workAuthorizationExpirationDate: '2019-12-27',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = client.qbd.employees.list({ conductorEndUserId: 'end_usr_1234567abcdefg' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: required and optional params', async () => {
    const response = await client.qbd.employees.list({
      conductorEndUserId: 'end_usr_1234567abcdefg',
      cursor: '12345678-abcd-abcd-example-1234567890ab',
      ids: ['80000001-1234567890'],
      limit: 150,
      nameContains: 'ABC',
      nameEndsWith: 'ABC',
      nameFrom: 'A',
      names: ['John Doe'],
      nameStartsWith: 'ABC',
      nameTo: 'Z',
      status: 'active',
      updatedAfter: 'updatedAfter',
      updatedBefore: 'updatedBefore',
    });
  });
});
