'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { defaultCompare } from './../../../src/utils/misc/comparator_utils.js';
import { insertionSort, insertionSortNumbers } from './../../../src/algorithms/sorting/insertion_sort.js';

// implementation
test('Insertion sort tests...', async (t) => {
    const testIntegerArray1 = [5, 2, 1, 10, 3, 7, 0];
    const testIntegerArray2 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    const testIntegerArray3 = [0, 1, 2, 3, 4, 5];
    const testIntegerArray4 = [2, 4, 5, 7, 1, 2, 3, 6];

    await t.test('insertionSort() function tests...', async (t) => {
        await t.test('Should correctly sort an array (iteger) - case 1', () => {
            assert.deepStrictEqual(insertionSort(defaultCompare, testIntegerArray1), [0, 1, 2, 3, 5, 7, 10]);
        });

        await t.test('Should correctly sort an array (iteger) - case 2', () => {
            assert.deepStrictEqual(insertionSort(defaultCompare, testIntegerArray2), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        });

        await t.test('Should correctly sort an array (iteger) - case 3', () => {
            assert.deepStrictEqual(insertionSort(defaultCompare, testIntegerArray3), [0, 1, 2, 3, 4, 5]);
        });

        await t.test('Should correctly sort an array (iteger) - case 4', () => {
            assert.deepStrictEqual(insertionSort(defaultCompare, testIntegerArray4), [1, 2, 2, 3, 4, 5, 6, 7]);
        });
    });

    await t.test('insertionSortNumbers() function tests...', async (t) => {
        await t.test('Should correctly sort an array (iteger) - case 1', () => {
            assert.deepStrictEqual(insertionSortNumbers(testIntegerArray1), [0, 1, 2, 3, 5, 7, 10]);
        });

        await t.test('Should correctly sort an array (iteger) - case 2', () => {
            assert.deepStrictEqual(insertionSortNumbers(testIntegerArray2), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        });

        await t.test('Should correctly sort an array (iteger) - case 3', () => {
            assert.deepStrictEqual(insertionSortNumbers(testIntegerArray3), [0, 1, 2, 3, 4, 5]);
        });

        await t.test('Should correctly sort an array (iteger) - case 4', () => {
            assert.deepStrictEqual(insertionSortNumbers(testIntegerArray4), [1, 2, 2, 3, 4, 5, 6, 7]);
        });
    });
});

// exports