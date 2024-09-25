import { test, expect } from '@jest/globals';
import { validatePostcodes } from "./validatePostcodes";

test('test that the function returns an array', async () => {
    const data = await validatePostcodes();
    expect(data).toBeDefined();
});