import { afterAll, test, expect } from '@jest/globals';
import * as matchers from 'jest-extended';
import { getPropertyStatusFN } from './getPropertyStatus';

expect.extend(matchers);

test('use invalid propertyId', () => {
    expect(getPropertyStatusFN('xyz')).toBe('');
});

test('use valid propertyId', () => {
    expect(getPropertyStatusFN('p_1002')).toBeOneOf(['PROPERTY_VACANT', 'PARTIALLY_VACANT', 'PROPERTY_ACTIVE', 'PROPERTY_OVERDUE']);
});

afterAll(done => {
    done();
});