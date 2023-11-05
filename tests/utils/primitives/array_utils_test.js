'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import {
    findMinimumValueInArrayList,

    concatSorted,
    concatSortedNumbers,
} from './../../../src/utils/primitives/array_utils.js';

import { defaultCompare } from './../../../src/utils/misc/comparator_utils.js';
import { insertionSortNumbers } from './../../../src/algorithms/sorting/insertion_sort.js';

// implementation
test('Array utilities tests...', async (t) => {
    const testArray1 = [2, 1, 7, 6, 8];
    const testArray2 = [4, 3, 5, 9, 0];
    const testArray3 = [5, 4, 0, 2, 1, 10, 12];
    const testArray4 = [0, 3];
    const testArray5 = [9, 4];

    await t.test('findMinimumValueInArrayList() function tests...', async (t) => {
        await t.test('Should correctly find minimum value in a list of sorted arrays - case 1', () => {
            const [arrayIndex, minValue, totalArrayLength] = findMinimumValueInArrayList(
                defaultCompare,
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray2),
            );

            assert.equal(arrayIndex, 1);
            assert.equal(minValue, 0);
            assert.equal(totalArrayLength, 10);
        });

        await t.test('Should correctly find minimum value in a list of sorted arrays - case 2', () => {
            const [arrayIndex, minValue, totalArrayLength] = findMinimumValueInArrayList(
                defaultCompare,
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray4),
                insertionSortNumbers(testArray5),
            );

            assert.equal(arrayIndex, 1);
            assert.equal(minValue, 0);
            assert.equal(totalArrayLength, 9);
        });

        await t.test('Should correctly find minimum value in a list of sorted arrays - case 3', () => {
            const [arrayIndex, minValue, totalArrayLength] = findMinimumValueInArrayList(
                defaultCompare,
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray2),
                insertionSortNumbers(testArray3),
                insertionSortNumbers(testArray4),
                insertionSortNumbers(testArray5),
            );

            assert.equal(arrayIndex, 1);
            assert.equal(minValue, 0);
            assert.equal(totalArrayLength, 21);
        });
    });

    await t.test('concatSorted() function tests...', async (t) => {
        await t.test('Should correctly concat sorted arrays - case 1', () => {
            const sortResult = concatSorted(
                defaultCompare,
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray2),
            );

            assert.deepStrictEqual(sortResult, [0, 1, 2, 3, 4, 5, 6, 7 ,8, 9]);
        });

        await t.test('Should correctly concat sorted arrays - case 2', () => {
            const sortResult = concatSorted(
                defaultCompare,
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray4),
                insertionSortNumbers(testArray5),
            );

            assert.deepStrictEqual(sortResult, [0, 1, 2, 3, 4, 6, 7, 8, 9]);
        });

        await t.test('Should correctly concat sorted arrays - case 3', () => {
            const sortResult = concatSorted(
                defaultCompare,
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray2),
                insertionSortNumbers(testArray3),
                insertionSortNumbers(testArray4),
                insertionSortNumbers(testArray5),
            );

            assert.deepStrictEqual(sortResult, [0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 6, 7, 8, 9, 9, 10, 12]);
        });
    });

    await t.test('concatSortedNumbers() function tests...', async (t) => {
        await t.test('Should correctly concat sorted arrays - case 1', () => {
            const sortResult = concatSortedNumbers(
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray2),
            );

            assert.deepStrictEqual(sortResult, [0, 1, 2, 3, 4, 5, 6, 7 ,8, 9]);
        });

        await t.test('Should correctly concat sorted arrays - case 2', () => {
            const sortResult = concatSortedNumbers(
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray4),
                insertionSortNumbers(testArray5),
            );

            assert.deepStrictEqual(sortResult, [0, 1, 2, 3, 4, 6, 7, 8, 9]);
        });

        await t.test('Should correctly concat sorted arrays - case 3', () => {
            const sortResult = concatSortedNumbers(
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray2),
                insertionSortNumbers(testArray3),
                insertionSortNumbers(testArray4),
                insertionSortNumbers(testArray5),
            );

            assert.deepStrictEqual(sortResult, [0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 6, 7, 8, 9, 9, 10, 12]);
        });
    });
});

// exports