// external imports

// internal imports
import { generateRandomString, generateAlmostRandomUUID } from '../../../../src/utils/primitives/string/random_string_generation_utils';

// implementation
describe('Random string generation utilities tests....', () => {
    describe('generateRandomString() function tests...', () => {
        test('Should generate a string of specified length', () => {
            const length = 10;
            const randomString = generateRandomString(length);

            expect(randomString).toHaveLength(length);
        });

        test('Should generate a unique string each time it is called', () => {
            const string1 = generateRandomString(10);
            const string2 = generateRandomString(10);

            expect(string1).not.toBe(string2);
        });

        test('Should return an empty string when length is 0', () => {
            const randomString = generateRandomString(0);
            expect(randomString).toBe('');
        });

        test('Should throw an error for negative lengths', () => {
            expect(() => generateRandomString(-5)).toThrowError(RangeError);
        });

        test('Should return a string consisting of only alphanumeric characters', () => {
            const length = 15;
            const randomString = generateRandomString(length);
            const alphaNumericRegex = /^[a-zA-Z0-9]+$/;

            expect(randomString).toMatch(alphaNumericRegex);
        });
    });

    describe('generateAlmostRandomUUID() function tests...', () => {
        test('Should generate a valid UUID', () => {
            const uuid = generateAlmostRandomUUID();
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

            expect(uuid).toMatch(uuidRegex);
        });

        test('Should generate a unique UUID each time it is called', () => {
            const uuid1 = generateAlmostRandomUUID
            const uuid2 = generateAlmostRandomUUID();

            expect(uuid1).not.toBe(uuid2);
        });

        test('Should return a non-empty string', () => {
            const uuid = generateAlmostRandomUUID();

            expect(uuid).toBeTruthy();
            expect(typeof uuid).toBe('string');
        });
    });
});