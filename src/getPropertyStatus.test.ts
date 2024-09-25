import { describe, test, expect } from '@jest/globals';
import { getPropertyStatus } from './utils/getPropertyStatus';
import * as matchers from 'jest-extended';

expect.extend(matchers);

describe('getPropertyStatus', () => {
    test('Invalid propertyId should throw an error', async () => {
        const invalidPropertyCall = async () => {
            await getPropertyStatus('xyz');
        };
    });

    test('Valid propertyId should return a status', async () => {
        const data = await getPropertyStatus('p_1002');
        expect(data).toBeOneOf(['PROPERTY_VACANT', 'PARTIALLY_VACANT', 'PROPERTY_ACTIVE', 'PROPERTY_OVERDUE']);
    });
})