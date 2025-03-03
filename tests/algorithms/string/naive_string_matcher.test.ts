// external imports

// internal imports
import { naiveStringMatcherCaseInsensitive } from './../../../src/algorithms/string/naive_string_matcher';

// implementation
describe('Naive string matcher tests...', () => {
    describe('naiveStringMatcherCaseInsensitive() function tests...', () => {
        const testStringToExamine1 = 'ZzBcgaagrrwee';

        const testStringToMatch1 = 'zz';
        const testStringToMatch2 = 'aa';
        const testStringToMatch3 = 'ee';
        const testStringToMatch4 = 'bcga';
        const testStringToMatch5 = 'RR';
        const testStringToMatch6 = 'wr';
        const testStringToMatch7 = 'zbcz';
        const testStringToMatch8 = 'zZz';
        const testStringToMatch9 = 'aaa';
        const testStringToMatch10 = 'eee';

        test('Should match a string at specific position - case 1', () => {
            expect(naiveStringMatcherCaseInsensitive(testStringToMatch1, testStringToExamine1)).toStrictEqual(0);
        });

        test('Should match a string at specific position - case 2', () => {
            expect(naiveStringMatcherCaseInsensitive(testStringToMatch2, testStringToExamine1)).toStrictEqual(5);
        });

        test('Should match a string at specific position - case 3', () => {
            expect(naiveStringMatcherCaseInsensitive(testStringToMatch3, testStringToExamine1)).toStrictEqual(11);
        });

        test('Should match a string at specific position - case 4', () => {
            expect(naiveStringMatcherCaseInsensitive(testStringToMatch4, testStringToExamine1)).toStrictEqual(2);
        });

        test('Should match a string at specific position - case 5', () => {
            expect(naiveStringMatcherCaseInsensitive(testStringToMatch5, testStringToExamine1)).toStrictEqual(8);
        });

        test('Should match a string at specific position - case 6', () => {
            expect(naiveStringMatcherCaseInsensitive(testStringToExamine1.toLowerCase(), testStringToExamine1)).toStrictEqual(0);
        });

        test('Should not match a string at specific position - case 1', () => {
            expect(naiveStringMatcherCaseInsensitive(testStringToMatch6, testStringToExamine1)).toStrictEqual(-1);
        });

        test('Should not match a string at specific position - case 2', () => {
            expect(naiveStringMatcherCaseInsensitive(testStringToMatch7, testStringToExamine1)).toStrictEqual(-1);
        });

        test('Should not match a string at specific position - case 3', () => {
            expect(naiveStringMatcherCaseInsensitive(testStringToMatch8, testStringToExamine1)).toStrictEqual(-1);
        });

        test('Should not match a string at specific position - case 4', () => {
            expect(naiveStringMatcherCaseInsensitive(testStringToMatch9, testStringToExamine1)).toStrictEqual(-1);
        });

        test('Should not match a string at specific position - case 5', () => {
            expect(naiveStringMatcherCaseInsensitive(testStringToMatch10, testStringToExamine1)).toStrictEqual(-1);
        });
    });
});

// exports