import { afterAll, test, expect } from '@jest/globals';
import { getRentPerTenant } from './getRentPerTenant';

test('use invalid region', async () => {
    const data = await getRentPerTenant('xyz', '1');
    expect(data).toBe(0);
});

test('use valid region', async () => {
    const data = await getRentPerTenant('England', '1');
    expect(data).toBeGreaterThanOrEqual(0);
});

afterAll(done => {
    done();
});