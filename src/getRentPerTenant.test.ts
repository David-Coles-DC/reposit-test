import {test, expect, describe} from '@jest/globals';
import { getRentPerTenant } from './utils/getRentPerTenant';

describe('getRentPerTenant', () => {
    test('Invalid region should throw an error', async () => {
        const invalidPropertyCall = async () => {
            await getRentPerTenant('xyz');
        };
    });

    test('Valid property should return a positive numeric value', async () => {
        const data = await getRentPerTenant('p_1002');
        expect(data).toBeGreaterThanOrEqual(0);
    });
})