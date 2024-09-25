import { describe, test, expect } from '@jest/globals';
import { getPropertyStatus } from '../utils/getPropertyStatus';
import * as matchers from 'jest-extended';

expect.extend(matchers);

//The following tests have been set up and pass, however if the data was to change then the test could potentially then fail.
describe('getPropertyStatus', () => {
    test('Invalid propertyId should throw an error', async () => {
        const invalidPropertyCall = async () => {
            await getPropertyStatus('xyz');
        };
    });

    test('Should return correct status - PROPERTY_OVERDUE', async () => {
        const data = await getPropertyStatus('p_1002', new Date("2100-01-01"));
        expect(data).toBe('PROPERTY_OVERDUE');
    });

    test('Should return correct status - PROPERTY_ACTIVE', async () => {
        const data = await getPropertyStatus('p_1004', new Date("2001-01-01"));
        expect(data).toBe('PROPERTY_ACTIVE');
    });

    test('Should return correct status - PARTIALLY_VACANT', async () => {
        const data = await getPropertyStatus('p_1005');
        expect(data).toBe('PARTIALLY_VACANT');
    });

    test('Should return correct status - PROPERTY_VACANT', async () => {
        const data = await getPropertyStatus('p_1029');
        expect(data).toBe('PROPERTY_VACANT');
    });

    test('Valid propertyId should return a status', async () => {
        const data = await getPropertyStatus('p_1002');
        expect(data).toBeOneOf(['PROPERTY_VACANT', 'PARTIALLY_VACANT', 'PROPERTY_ACTIVE', 'PROPERTY_OVERDUE']);
    });
})