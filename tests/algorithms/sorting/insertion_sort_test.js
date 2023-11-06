'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { defaultCompare } from './../../../src/utils/misc/comparator_utils.js';
import { insertionSort, insertionSortNumbers } from './../../../src/algorithms/sorting/insertion_sort.js';

import {
    testIntegerArray1,
    testIntegerArray2,
    testIntegerArray3,
    testIntegerArray4,

    testIntegerSortResultArray1,
    testIntegerSortResultArray2,
    testIntegerSortResultArray3,
    testIntegerSortResultArray4,
} from './test_data.js';

// implementation
test('Insertion sort tests...', async (t) => {
    await t.test('insertionSort() function tests...', async (t) => {
        await t.test('Should correctly sort an array (iteger) - case 1', () => {
            assert.deepStrictEqual(insertionSort(defaultCompare, testIntegerArray1), testIntegerSortResultArray1);
        });

        await t.test('Should correctly sort an array (iteger) - case 2', () => {
            assert.deepStrictEqual(insertionSort(defaultCompare, testIntegerArray2), testIntegerSortResultArray2);
        });

        await t.test('Should correctly sort an array (iteger) - case 3', () => {
            assert.deepStrictEqual(insertionSort(defaultCompare, testIntegerArray3), testIntegerSortResultArray3);
        });

        await t.test('Should correctly sort an array (iteger) - case 4', () => {
            assert.deepStrictEqual(insertionSort(defaultCompare, testIntegerArray4), testIntegerSortResultArray4);
        });
    });

    await t.test('insertionSortNumbers() function tests...', async (t) => {
        await t.test('Should correctly sort an array (iteger) - case 1', () => {
            assert.deepStrictEqual(insertionSortNumbers(testIntegerArray1), testIntegerSortResultArray1);
        });

        await t.test('Should correctly sort an array (iteger) - case 2', () => {
            assert.deepStrictEqual(insertionSortNumbers(testIntegerArray2), testIntegerSortResultArray2);
        });

        await t.test('Should correctly sort an array (iteger) - case 3', () => {
            assert.deepStrictEqual(insertionSortNumbers(testIntegerArray3), testIntegerSortResultArray3);
        });

        await t.test('Should correctly sort an array (iteger) - case 4', () => {
            assert.deepStrictEqual(insertionSortNumbers(testIntegerArray4), testIntegerSortResultArray4);
        });
    });
});

// exports