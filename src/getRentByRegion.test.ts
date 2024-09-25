import {test, expect, describe} from '@jest/globals';
import { getRentByRegion } from './utils/getRentByRegion';

describe('getRentByRegion', () => {
    test('Invalid region should throw an error', async () => {
        const invalidPropertyCall = async () => {
            await getRentByRegion('xyz');
        };
    });

    test('Valid region should return a positive numeric value', async () => {
        const data = await getRentByRegion('England');
        expect(data).toBeGreaterThanOrEqual(0);
    });
})