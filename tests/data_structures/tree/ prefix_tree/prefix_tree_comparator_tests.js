'use strict';

// external imports
import assert from 'node:assert/strict';
import test from 'node:test';

// internal imports
import { COMPARATOR_EQUAL, COMPARATOR_NONE_EQUAL } from './../../../../src/constants/comparator_constants.js';
import { prefixTreeCharComparator } from './../../../../src/data_structures/tree/prefix_tree/prefix_tree_comparator.js';

// implementation
test('Prefix tree comparator tests...', async (t) => {
    await test('"prefixTreeCharComparator" comparator tests...', async (t) => {
        await t.test('Should correctly compare char and element of the tree - case 1', () => {
            assert.strictEqual(prefixTreeCharComparator('c', { char: 'c', isFinal: false }), COMPARATOR_EQUAL);
        });

        await t.test('Should correctly compare char and element of the tree - case 2', () => {
            assert.strictEqual(prefixTreeCharComparator('a', { char: 'a', isFinal: true }), COMPARATOR_EQUAL);
        });

        await t.test('Should correctly compare char and element of the tree - case 3', () => {
            assert.strictEqual(prefixTreeCharComparator('ge', { char: 'ge', isFinal: false }), COMPARATOR_EQUAL);
        });

        await t.test('Should correctly compare char and element of the tree - case 4', () => {
            assert.strictEqual(prefixTreeCharComparator('g', { char: 'c', isFinal: false }), COMPARATOR_NONE_EQUAL);
        });

        await t.test('Should correctly compare char and element of the tree - case 5', () => {
            assert.strictEqual(prefixTreeCharComparator('c', { char: 'a', isFinal: true }), COMPARATOR_NONE_EQUAL);
        });

        await t.test('Should correctly compare char and element of the tree - case 6', () => {
            assert.strictEqual(prefixTreeCharComparator('gb', { char: 'ge', isFinal: false }), COMPARATOR_NONE_EQUAL);
        });
    });
});

// exports