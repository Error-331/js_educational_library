'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { convertArrayToTree } from './../../../../src/utils/testing/data_structures/binary_tree/binary_search_tree_class_test_utils.js';
import BinarySearchTreeInOrderIteratorClass from './../../../../src/data_structures/binary_tree/traversal/binary_search_tree_in_order_iterator_class.js';

// implementation
test('BinarySearchTreeInOrderIteratorClass tests...', async (t) => {
    const keys1 = [40, 30, 50, 25, 35, 45, 60];
    const keys2 = [8, 3, 10, 1, 6, 4, 7, 14, 13];
    const keys3 = [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25];

    const testSequence1 = [25, 30, 35, 40, 45, 50, 60];
    const testSequence2 = [1, 3, 4, 6, 7, 8, 10, 13, 14];
    const testSequence3 = [3, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25];

    await t.test('Should traverse a tree - case 1', () => {
        const treeInstance = convertArrayToTree(keys1);
        let traversedKeys = [];

        BinarySearchTreeInOrderIteratorClass.traverse(treeInstance, (node) => traversedKeys.push(node.key));
        assert.deepStrictEqual(traversedKeys, testSequence1);

        traversedKeys = [];
        const iterator = treeInstance.createInOrderIterator();

        for (const node of iterator) {
            traversedKeys.push(node.key);
        }

        assert.deepStrictEqual(traversedKeys, testSequence1);
    });

    await t.test('Should traverse a tree - case 2', () => {
        const treeInstance = convertArrayToTree(keys2);
        let traversedKeys = [];

        BinarySearchTreeInOrderIteratorClass.traverse(treeInstance, (node) => traversedKeys.push(node.key));
        assert.deepStrictEqual(traversedKeys, testSequence2);

        traversedKeys = [];
        const iterator = treeInstance.createInOrderIterator();

        for (const node of iterator) {
            traversedKeys.push(node.key);
        }

        assert.deepStrictEqual(traversedKeys, testSequence2);
    });

    await t.test('Should traverse a tree - case 3', () => {
        const treeInstance = convertArrayToTree(keys3);
        let traversedKeys = [];

        BinarySearchTreeInOrderIteratorClass.traverse(treeInstance, (node) => traversedKeys.push(node.key));
        assert.deepStrictEqual(traversedKeys, testSequence3);

        traversedKeys = [];
        const iterator = treeInstance.createInOrderIterator();

        for (const node of iterator) {
            traversedKeys.push(node.key);
        }

        assert.deepStrictEqual(traversedKeys, testSequence3);
    });
});

// exports