import { afterAll, test, expect } from '@jest/globals';
import * as matchers from 'jest-extended';
import { getPropertyStatus } from './getPropertyStatus';

expect.extend(matchers);

test('use invalid propertyId', () => {
    expect(getPropertyStatus('xyz')).toBe('');
});

test('use valid propertyId', () => {
    expect(getPropertyStatus('p_1002')).toBeOneOf(['PROPERTY_VACANT', 'PARTIALLY_VACANT', 'PROPERTY_ACTIVE', 'PROPERTY_OVERDUE']);
});

afterAll(done => {
    done();
});