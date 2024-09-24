import { afterAll, test, expect } from '@jest/globals';
import { getPropertyStatus } from './getPropertyStatus';
import * as matchers from 'jest-extended';

expect.extend(matchers);

test('use invalid propertyId', async () => {
    const data = await getPropertyStatus('xyz');
    expect(data).toBe('');
});

test('use valid propertyId', async () => {
    const data = await getPropertyStatus('p_1002');
    expect(data).toBeOneOf(['PROPERTY_VACANT', 'PARTIALLY_VACANT', 'PROPERTY_ACTIVE', 'PROPERTY_OVERDUE']);
});

afterAll(done => {
    done();
});