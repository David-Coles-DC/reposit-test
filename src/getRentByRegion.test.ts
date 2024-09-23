import { afterAll, test, expect } from '@jest/globals';
import { getRentByRegion } from './getRentByRegion';

test('use invalid region', () => {
    expect(getRentByRegion('xyz')).toBe(0);
});

test('use valid region', () => {
    expect(getRentByRegion('England')).toBeGreaterThanOrEqual(0);
});

afterAll(done => {
    done();
});