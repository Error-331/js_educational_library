'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { naiveStringMatcherCaseInsensitive } from './../../../src/algorithms/string/naive_string_matcher.js';

// implementation
test('Naive string matcher tests...', async (t) => {
    await t.test('naiveStringMatcherCaseInsensitive() function tests...', async (t) => {
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

        await t.test('Should match a string at specific postion - case 1', () => {
            assert.strictEqual(naiveStringMatcherCaseInsensitive(testStringToMatch1, testStringToExamine1), 0);
        });

        await t.test('Should match a string at specific postion - case 2', () => {
            assert.strictEqual(naiveStringMatcherCaseInsensitive(testStringToMatch2, testStringToExamine1), 5);
        });

        await t.test('Should match a string at specific postion - case 3', () => {
            assert.strictEqual(naiveStringMatcherCaseInsensitive(testStringToMatch3, testStringToExamine1), 11);
        });

        await t.test('Should match a string at specific postion - case 4', () => {
            assert.strictEqual(naiveStringMatcherCaseInsensitive(testStringToMatch4, testStringToExamine1), 2);
        });

        await t.test('Should match a string at specific postion - case 5', () => {
            assert.strictEqual(naiveStringMatcherCaseInsensitive(testStringToMatch5, testStringToExamine1), 8);
        });

        await t.test('Should match a string at specific postion - case 6', () => {
            assert.strictEqual(naiveStringMatcherCaseInsensitive(testStringToExamine1.toLowerCase(), testStringToExamine1), 0);
        });

        await t.test('Should not match a string at specific postion - case 1', () => {
            assert.strictEqual(naiveStringMatcherCaseInsensitive(testStringToMatch6, testStringToExamine1), -1);
        });

        await t.test('Should not match a string at specific postion - case 2', () => {
            assert.strictEqual(naiveStringMatcherCaseInsensitive(testStringToMatch7, testStringToExamine1), -1);
        });

        await t.test('Should not match a string at specific postion - case 3', () => {
            assert.strictEqual(naiveStringMatcherCaseInsensitive(testStringToMatch8, testStringToExamine1), -1);
        });

        await t.test('Should not match a string at specific postion - case 4', () => {
            assert.strictEqual(naiveStringMatcherCaseInsensitive(testStringToMatch9, testStringToExamine1), -1);
        });

        await t.test('Should not match a string at specific postion - case 5', () => {
            assert.strictEqual(naiveStringMatcherCaseInsensitive(testStringToMatch10, testStringToExamine1), -1);
        });
    });
});

// exports