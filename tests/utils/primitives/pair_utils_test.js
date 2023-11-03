'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { defaultCompare } from './../../../src/utils/misc/comparator_utils.js';
import { sortPair, sortPairNumbers } from './../../../src/utils/primitives/pair_utils.js';

// implementation
test('Pair utilities tests...', async (t) => {
    const pair1 = [2, 1];
    const pair2 = [1, 2];
    const pair3 = [1, undefined];
    const pair4 = [undefined, 2];

    const pairOfUndefinedValues = [undefined, undefined];

    await t.test('sortPair() function tests...', async (t) => {
        await t.test('Should correctly sort pair of numbers - case 1', () => {
            assert.deepStrictEqual(sortPair(defaultCompare, pair1), [1, 2]);
        });

        await t.test('Should correctly sort pair of numbers - case 2', () => {
            assert.deepStrictEqual(sortPair(defaultCompare, pair2), [1, 2]);
        });
    });

    await t.test('sortPairNumbers() function tests...', async (t) => {
        await t.test('Should correctly sort pair of numbers - case 1', () => {
            assert.deepStrictEqual(sortPairNumbers(pair1), [1, 2]);
        });

        await t.test('Should correctly sort pair of numbers - case 2', () => {
            assert.deepStrictEqual(sortPairNumbers(pair2), [1, 2]);
        });

        await t.test('Should correctly sort pair of numbers - case 3', () => {
            assert.deepStrictEqual(sortPairNumbers(pair3), [1]);
        });

        await t.test('Should correctly sort pair of numbers - case 4', () => {
            assert.deepStrictEqual(sortPairNumbers(pair4), [2]);
        });

        await t.test('Should throw error while trying to sort a pair of undefined values', () => {
            assert.throws(() => sortPairNumbers(pairOfUndefinedValues));
        });

        await t.test('Should throw error while trying to sort non-array value - case 1', () => {
            assert.throws(() => sortPairNumbers(5));
        });

        await t.test('Should throw error while trying to sort non-array value - case 2', () => {
            assert.throws(() => sortPairNumbers('c'));
        });

        await t.test('Should throw error while trying to sort non-array value - case 3', () => {
            assert.throws(() => sortPairNumbers(null));
        });

        await t.test('Should throw error while trying to sort non-array value - case 4', () => {
            assert.throws(() => sortPairNumbers({ a: 2, b: 1 }));
        });
    });
});

// exports