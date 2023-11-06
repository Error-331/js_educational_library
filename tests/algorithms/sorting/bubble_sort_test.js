'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { defaultCompare } from './../../../src/utils/misc/comparator_utils.js';
import { bubbleSort, bubbleSortNumbers } from './../../../src/algorithms/sorting/bubble_sort.js';

import {
    testIntegerArray1,
    testIntegerArray2,
    testIntegerArray3,
    testIntegerArray4,
    testIntegerArray5,

    testIntegerSortResultArray1,
    testIntegerSortResultArray2,
    testIntegerSortResultArray3,
    testIntegerSortResultArray4,
    testIntegerSortResultArray5,
} from './test_data.js';

// implementation
test('Insertion sort tests...', async (t) => {
    await t.test('bubbleSort() function tests...', async (t) => {
        await t.test('Should correctly sort an array (iteger) - case 1', () => {
            assert.deepStrictEqual(bubbleSort(defaultCompare, testIntegerArray1), testIntegerSortResultArray1);
        });

        await t.test('Should correctly sort an array (iteger) - case 2', () => {
            assert.deepStrictEqual(bubbleSort(defaultCompare, testIntegerArray2), testIntegerSortResultArray2);
        });

        await t.test('Should correctly sort an array (iteger) - case 3', () => {
            assert.deepStrictEqual(bubbleSort(defaultCompare, testIntegerArray3), testIntegerSortResultArray3);
        });

        await t.test('Should correctly sort an array (iteger) - case 4', () => {
            assert.deepStrictEqual(bubbleSort(defaultCompare, testIntegerArray4), testIntegerSortResultArray4);
        });

        await t.test('Should correctly sort an array (iteger) - case 5', () => {
            assert.deepStrictEqual(bubbleSort(defaultCompare, testIntegerArray5), testIntegerSortResultArray5);
        });
    });

    await t.test('bubbleSortNumbers() function tests...', async (t) => {
        await t.test('Should correctly sort an array (iteger) - case 1', () => {
            assert.deepStrictEqual(bubbleSortNumbers(testIntegerArray1), testIntegerSortResultArray1);
        });

        await t.test('Should correctly sort an array (iteger) - case 2', () => {
            assert.deepStrictEqual(bubbleSortNumbers(testIntegerArray2), testIntegerSortResultArray2);
        });

        await t.test('Should correctly sort an array (iteger) - case 3', () => {
            assert.deepStrictEqual(bubbleSortNumbers(testIntegerArray3), testIntegerSortResultArray3);
        });

        await t.test('Should correctly sort an array (iteger) - case 4', () => {
            assert.deepStrictEqual(bubbleSortNumbers(testIntegerArray4), testIntegerSortResultArray4);
        });

        await t.test('Should correctly sort an array (iteger) - case 5', () => {
            assert.deepStrictEqual(bubbleSortNumbers(testIntegerArray5), testIntegerSortResultArray5);
        });
    });
});

// exports