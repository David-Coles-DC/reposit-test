import { afterAll, test, expect } from '@jest/globals';
import { validatePostcodes } from "./validatePostcodes";

test('use invalid postcode', () => {
    expect(validatePostcodes()).toBeDefined();
});

afterAll(done => {
    done();
});