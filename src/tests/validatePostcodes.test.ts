import {test, expect, describe} from '@jest/globals';
import { validatePostcodes } from "../validatePostcodes";

describe('validatePostcodes', () => {
    test('test that the function returns an array', async () => {
        const data = await validatePostcodes();
        expect(data).toBeDefined();
    });
})