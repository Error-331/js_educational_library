'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { defaultCompare } from './../../../src/utils/misc/comparator_utils.js';
import { mergeSort, mergeSortNumbers } from './../../../src/algorithms/sorting/merge_sort.js';

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
test('Merge sort tests...', async (t) => {
    await t.test('mergeSort() function tests...', async (t) => {
        await t.test('Should correctly sort an array (iteger) - case 1', () => {
            assert.deepStrictEqual(mergeSort(defaultCompare, testIntegerArray1), testIntegerSortResultArray1);
        });

        await t.test('Should correctly sort an array (iteger) - case 2', () => {
            assert.deepStrictEqual(mergeSort(defaultCompare, testIntegerArray2), testIntegerSortResultArray2);
        });

        await t.test('Should correctly sort an array (iteger) - case 3', () => {
            assert.deepStrictEqual(mergeSort(defaultCompare, testIntegerArray3), testIntegerSortResultArray3);
        });

        await t.test('Should correctly sort an array (iteger) - case 4', () => {
            assert.deepStrictEqual(mergeSort(defaultCompare, testIntegerArray4), testIntegerSortResultArray4);
        });

        await t.test('Should correctly sort an array (iteger) - case 5', () => {
            assert.deepStrictEqual(mergeSort(defaultCompare, testIntegerArray5), testIntegerSortResultArray5);
        });
    });

    await t.test('mergeSortNumbers() function tests...', async (t) => {
        await t.test('Should correctly sort an array (iteger) - case 1', () => {
            assert.deepStrictEqual(mergeSortNumbers(testIntegerArray1), testIntegerSortResultArray1);
        });

        await t.test('Should correctly sort an array (iteger) - case 2', () => {
            assert.deepStrictEqual(mergeSortNumbers(testIntegerArray2), testIntegerSortResultArray2);
        });

        await t.test('Should correctly sort an array (iteger) - case 3', () => {
            assert.deepStrictEqual(mergeSortNumbers(testIntegerArray3), testIntegerSortResultArray3);
        });

        await t.test('Should correctly sort an array (iteger) - case 4', () => {
            assert.deepStrictEqual(mergeSortNumbers(testIntegerArray4), testIntegerSortResultArray4);
        });

        await t.test('Should correctly sort an array (iteger) - case 5', () => {
            assert.deepStrictEqual(mergeSortNumbers(testIntegerArray5), testIntegerSortResultArray5);
        });
    });
});

// exports