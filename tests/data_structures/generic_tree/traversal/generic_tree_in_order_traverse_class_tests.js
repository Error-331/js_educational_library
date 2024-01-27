'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import GenericTreeInOrderTraverseClass from './../../../../src/data_structures/generic_tree/traversal/generic_tree_in_order_traverse_class.js';

import {
    genericTreeData1,
} from './../../tree/test_data.js';

import { fillGenericTreeByObject } from './../../../../src/utils/testing/data_structures/tree/generic_tree/generic_tree_class_test_utils.js';

// implementation
test('GenericTreeInOrderTraverseClass tests...', async (t) => {
    const testSequence1 = [
        'd', 'n', 'u', 'o',
        'b',
        't', 'n', 'a', 'd', 'n', 'u',
        'a',
        'e', 'c',
        'e', 'v', 'e', 'i', 'h',
        'e', 'l', 'b', 'a',
        'i',
        'e', 'l', 'b', 'a', 'c',
        'm',
        null
    ];

    await t.test('Should traverse a tree - case 1', () => {
        const treeInstance = fillGenericTreeByObject(genericTreeData1);
        const traversedKeys = [];

        GenericTreeInOrderTraverseClass.traverse(treeInstance, (node) => traversedKeys.push(node.data));
        assert.deepStrictEqual(traversedKeys, testSequence1);
    });

    await t.test('Should traverse a tree - case 2', () => {
    });

    await t.test('Should traverse a tree - case 3', () => {
    });
});

// exports