import { afterAll, test, expect } from '@jest/globals';
import { getRentByRegion } from './getRentByRegion';

test('use invalid region', async () => {
    const data = await getRentByRegion('xyz');
    expect(data).toBe(0);
});

test('use valid region', async () => {
    const data = await getRentByRegion('England');
    expect(data).toBeGreaterThanOrEqual(0);
});

afterAll(done => {
    done();
});