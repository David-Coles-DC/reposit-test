import { afterAll, test, expect } from '@jest/globals';
import { toBeOneOf } from 'jest-extended';
import { getPropertyStatus } from './getPropertyStatus';

expect.extend({ toBeOneOf });

test('use invalid propertyId', () => {
    expect(getPropertyStatus('xyz')).toBe('');
});

test('use valid propertyId', () => {
    expect(getPropertyStatus('p_1002')).toBeOneOf(['PROPERTY_VACANT', 'PARTIALLY_VACANT', 'PROPERTY_ACTIVE', 'PROPERTY_OVERDUE']);
});

afterAll(done => {
    done();
});