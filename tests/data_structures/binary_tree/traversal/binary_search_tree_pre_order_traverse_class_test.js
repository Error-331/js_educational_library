'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { convertArrayToTree } from './../../../../src/utils/testing/data_structures/binary_tree/binary_search_tree_class_test_utils.js';
import BinarySearchTreePreOrderTraverseClass from './../../../../src/data_structures/binary_tree/traversal/binary_search_tree_pre_order_traverse_class.js';

// implementation
test('BinarySearchTreePreOrderTraverseClass tests...', async (t) => {
    const keys1 = [40, 30, 50, 25, 35, 45, 60];
    const keys2 = [8, 3, 10, 1, 6, 4, 7, 14, 13];
    const keys3 = [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25];

    const testSequence1 = [40, 30, 25, 35, 50, 45, 60];
    const testSequence2 = [8, 3, 1, 6, 4, 7, 10, 14, 13];
    const testSequence3 = [11, 7, 5, 3, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25];

    await t.test('Should traverse a tree - case 1', () => {
        const treeInstance = convertArrayToTree(keys1);
        const traversedKeys = [];

        BinarySearchTreePreOrderTraverseClass.traverse(treeInstance, (node) => traversedKeys.push(node.key));
        assert.deepStrictEqual(traversedKeys, testSequence1);
    });

    await t.test('Should traverse a tree - case 2', () => {
        const treeInstance = convertArrayToTree(keys2);
        const traversedKeys = [];

        BinarySearchTreePreOrderTraverseClass.traverse(treeInstance, (node) => traversedKeys.push(node.key));
        assert.deepStrictEqual(traversedKeys, testSequence2);
    });

    await t.test('Should traverse a tree - case 3', () => {
        const treeInstance = convertArrayToTree(keys3);
        const traversedKeys = [];

        BinarySearchTreePreOrderTraverseClass.traverse(treeInstance, (node) => traversedKeys.push(node.key));
        assert.deepStrictEqual(traversedKeys, testSequence3);
    });
});

// exports