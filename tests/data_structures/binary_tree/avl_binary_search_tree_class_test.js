'use strict';

// external imports
import test from 'node:test';

// internal imports
import {
    binarySearchTreeKeys1,
    binarySearchTreeKeys2,
    binarySearchTreeKeys3,

    unbalancedAVLBinarySearchTreeKeys1,
    unbalancedAVLBinarySearchTreeKeys2,

    unbalancedAVLBinarySearchTreeKeys3,
    unbalancedAVLBinarySearchTreeKeys4,

    unbalancedAVLBinarySearchTreeKeys5,

    unbalancedAVLBinarySearchTreeKeys1LLRotation,
    unbalancedAVLBinarySearchTreeKeys2LLRotation,

    unbalancedAVLBinarySearchTreeKeys3RRRotation,
    unbalancedAVLBinarySearchTreeKeys4RRRotation,

    unbalancedAVLBinarySearchTreeKeys5LLRRRotation,
} from './test_data.js';

import AVLBinarySearchTreeClass from './../../../src/data_structures/binary_tree/avl_binary_search_tree_class.js';

import { convertArrayToTree, checkTree } from './../../../src/utils/testing/data_structures/binary_tree/binary_search_tree_class_test_utils.js';
import { checkNodeHeightsPreOrder } from './../../../src/utils/testing/data_structures/binary_tree/avl_binary_search_tree_class_test_utils.js';

// implementation
test('AVLBinarySearchTreeClass tests...', async (t) => {
    await t.test('calcNodeHeight() method tests tests...', async (t) => {
        const testSequence1 = [2, 1, 0, 0, 1, 0, 0];
        const testSequence2 = [3, 2, 0, 1, 0, 0, 2, 1, 0];
        const testSequence3 = [3, 2, 1, 0, 1, 0, 0, 2, 1, 0, 0, 1, 0, 0];

        await t.test('Should correctly calculate node heights - case 1', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys1);
            checkNodeHeightsPreOrder(treeInstance, testSequence1);
        });

        await t.test('Should correctly calculate node heights - case 2', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys2);
            checkNodeHeightsPreOrder(treeInstance, testSequence2);
        });

        await t.test('Should correctly calculate node heights - case 3', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys3);
            checkNodeHeightsPreOrder(treeInstance, testSequence3);
        });
    });

    await t.test('rotateLeftLeft() method tests tests...', async (t) => {
        await t.test('Should correctly rotate a tree to the right - case 1', () => {
            const treeInstance = convertArrayToTree(unbalancedAVLBinarySearchTreeKeys1);
            checkTree(treeInstance, [3, 2, null, 1, null]);

            treeInstance.root = AVLBinarySearchTreeClass.rotateLeftLeft(treeInstance.root);
            checkTree(treeInstance, unbalancedAVLBinarySearchTreeKeys1LLRotation);
        });

        await t.test('Should correctly rotate a tree to the right - case 2', () => {
            const treeInstance = convertArrayToTree(unbalancedAVLBinarySearchTreeKeys2);
            checkTree(treeInstance, [50, 30, 70, 10, 40, null, null, 5, null, null, null, null, null]);

            treeInstance.root = AVLBinarySearchTreeClass.rotateLeftLeft(treeInstance.root);
            checkTree(treeInstance, unbalancedAVLBinarySearchTreeKeys2LLRotation);
        });
    });

    await t.test('rotateRightRight() method tests tests...', async (t) => {
        await t.test('Should correctly rotate a tree to the left - case 1', () => {
            const treeInstance = convertArrayToTree(unbalancedAVLBinarySearchTreeKeys3);
            checkTree(treeInstance, [1, null, 2, null, null, null, 3]);

            treeInstance.root = AVLBinarySearchTreeClass.rotateRightRight(treeInstance.root);
            checkTree(treeInstance, unbalancedAVLBinarySearchTreeKeys3RRRotation);
        });

        await t.test('Should correctly rotate a tree to the left - case 2', () => {
            const treeInstance = convertArrayToTree(unbalancedAVLBinarySearchTreeKeys4);
            checkTree(treeInstance, [50, 30, 70, null, null, 60, 80, null, null, null, null, null, null, null, 90]);

            treeInstance.root = AVLBinarySearchTreeClass.rotateRightRight(treeInstance.root);
            checkTree(treeInstance, unbalancedAVLBinarySearchTreeKeys4RRRotation);
        });
    });

    await t.test('rotateLeftRight() method tests tests...', async (t) => {
        await t.test('Should correctly rotate a tree to the left and then to the right - case 1', () => {
            const treeInstance = convertArrayToTree(unbalancedAVLBinarySearchTreeKeys5);
            checkTree(treeInstance, [3, 1, 4, 0.5, 2, null, null, null, null, 1.5, 2.5]);

            treeInstance.root = AVLBinarySearchTreeClass.rotateLeftRight(treeInstance.root);
            checkTree(treeInstance, unbalancedAVLBinarySearchTreeKeys5LLRRRotation);
        });
    });
});

// exports