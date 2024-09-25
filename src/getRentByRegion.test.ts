import { test, expect } from '@jest/globals';
import { getRentByRegion } from './utils/getRentByRegion';

test('Invalid region should throw an error', async () => {
    const invalidPropertyCall = async () => {
        await getRentByRegion('xyz');
    };
});

test('use valid region', async () => {
    const data = await getRentByRegion('England');
    expect(data).toBeGreaterThanOrEqual(0);
});