import { test, expect } from '@jest/globals';
import { getRentPerTenant } from './utils/getRentPerTenant';

test('Invalid region should throw an error', async () => {
    const invalidPropertyCall = async () => {
        await getRentPerTenant('xyz');
    };
});

test('use valid property', async () => {
    const data = await getRentPerTenant('p_1002');
    expect(data).toBeGreaterThanOrEqual(0);
});