'use strict';

// external imports
import test from 'node:test';

// internal imports
import AVLBinarySearchTreeClass from './../../../src/data_structures/binary_tree/avl_binary_search_tree_class.js';
import BinarySearchTreePreOrderTraverseClass from './../../../src/data_structures/binary_tree/traversal/binary_search_tree_pre_order_traverse_class.js';

import { convertArrayToTree } from './../../../src/utils/testing/data_structures/binary_tree/binary_search_tree_class_test_utils.js';
import { checkNodeHeightsPreOrder } from './../../../src/utils/testing/data_structures/binary_tree/avl_binary_search_tree_class_test_utils.js';

// implementation
test('AVLBinarySearchTreeClass tests...', async (t) => {
    const keys1 = [40, 30, 50, 25, 35, 45, 60];
    const keys2 = [8, 3, 10, 1, 6, 4, 7, 14, 13];
    const keys3 = [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25];

    await t.test('calcNodeHeight() method tests tests...', async (t) => {
        const testSequence1 = [2, 1, 0, 0, 1, 0, 0];
        const testSequence2 = [3, 2, 0, 1, 0, 0, 2, 1, 0];
        const testSequence3 = [3, 2, 1, 0, 1, 0, 0, 2, 1, 0, 0, 1, 0, 0];

        await t.test('Should correctly calculate node heights - case 1', () => {
            const treeInstance = convertArrayToTree(keys1);
            checkNodeHeightsPreOrder(treeInstance, testSequence1);
        });

        await t.test('Should correctly calculate node heights - case 2', () => {
            const treeInstance = convertArrayToTree(keys2);
            checkNodeHeightsPreOrder(treeInstance, testSequence2);
        });

        await t.test('Should correctly calculate node heights - case 3', () => {
            const treeInstance = convertArrayToTree(keys3);
            checkNodeHeightsPreOrder(treeInstance, testSequence3);
        });
    });
});

// exports