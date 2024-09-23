import { afterAll, test, expect } from '@jest/globals';
import { getRentPerTenant } from './getRentPerTenant';

test('use invalid region', () => {
    expect(getRentPerTenant('xyz', '1')).toBe(0);
});

test('use valid propertyId', () => {
    expect(getRentPerTenant('England', '1')).toBeGreaterThanOrEqual(0);
});

afterAll(done => {
    done();
});