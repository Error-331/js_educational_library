'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import {
    binarySearchTreeKeys1,
    binarySearchTreeKeys2,
    binarySearchTreeKeys3,
} from './test_data.js';

import { convertArrayToTree, checkTree } from './../../../src/utils/testing/data_structures/binary_tree/binary_search_tree_class_test_utils.js';
import { checkNodeValues } from './../../../src/utils/testing/data_structures/binary_tree/binary_search_tree_node_class_test_utils.js';

// implementation
test('BinarySearchTreeClass tests...', async (t) => {
    await t.test('Instance creation tests...', async (t) => {
        const testSequence1 = [40, 30, 50, 25, 35, 45, 60];
        const testSequence2 = [8, 3, 10, 1, 6, null, 14, null, null, 4, 7, null, null, 13, null, null, null];
        const testSequence3 = [11, 7, 15, 5, 9, 13, 20, 3, null, 8, 10, 12, 14, 18, 25];

        await t.test('Should create a BinarySearchTree - case 1', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys1);
            checkTree(treeInstance, testSequence1);
        });

        await t.test('Should create a BinarySearchTree - case 2', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys2);
            checkTree(treeInstance, testSequence2);
        });

        await t.test('Should create a BinarySearchTree - case 3', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys3);
            checkTree(treeInstance, testSequence3);
        });
    });

    await t.test('Minimum value tests...', async (t) => {
        await t.test('Should find minimum value - case 1', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys1);
            assert.deepStrictEqual(treeInstance.min.key, 25);
        });

        await t.test('Should find minimum value - case 2', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys2);
            assert.deepStrictEqual(treeInstance.min.key, 1);
        });

        await t.test('Should find minimum value - case 3', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys3);
            assert.deepStrictEqual(treeInstance.min.key, 3);
        });
    });

    await t.test('Maximum value tests...', async (t) => {
        await t.test('Should find maximum value - case 1', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys1);
            assert.deepStrictEqual(treeInstance.max.key, 60);
        });

        await t.test('Should find maximum value - case 2', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys2);
            assert.deepStrictEqual(treeInstance.max.key, 14);
        });

        await t.test('Should find maximum value - case 3', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys3);
            assert.deepStrictEqual(treeInstance.max.key, 25);
        });
    });

    await t.test('Node finder tests...', async (t) => {
        await t.test('Should find node by key - case 1', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys1);
            checkNodeValues(treeInstance.search(30), 40, 30, 25, 35);
        });

        await t.test('Should find node by key - case 2', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys1);
            checkNodeValues(treeInstance.search(35), 30, 35, null, null);
        });

        await t.test('Should find node by key - case 3', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys1);
            checkNodeValues(treeInstance.search(40), null, 40, 30, 50);
        });

        await t.test('Should find node by key - case 4', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys2);
            checkNodeValues(treeInstance.search(3), 8, 3, 1, 6);
        });

        await t.test('Should find node by key - case 5', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys2);
            checkNodeValues(treeInstance.search(1), 3, 1, null, null);
        });

        await t.test('Should find node by key - case 6', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys2);
            checkNodeValues(treeInstance.search(14), 10, 14, 13, null);
        });

        await t.test('Should find node by key - case 7', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys3);
            checkNodeValues(treeInstance.search(7), 11, 7, 5, 9);
        });

        await t.test('Should find node by key - case 8', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys3);
            checkNodeValues(treeInstance.search(11), null, 11, 7, 15);
        });

        await t.test('Should find node by key - case 9', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys3);
            checkNodeValues(treeInstance.search(14), 13, 14, null, null);
        });
    });

    await t.test('Node removal tests...', async (t) => {
        await t.test('Should remove a node - case 1', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys1);

            treeInstance.remove(50);
            checkTree(treeInstance, [40, 30, 60, 25, 35, 45, null]);
        });

        await t.test('Should remove a node - case 2', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys1);

            treeInstance.remove(60);
            checkTree(treeInstance, [40, 30, 50, 25, 35, 45, null]);
        });

        await t.test('Should remove a node - case 3', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys1);

            treeInstance.remove(30);
            checkTree(treeInstance, [40, 35, 50, 25, null, 45, 60]);

            treeInstance.remove(30);
            checkTree(treeInstance, [40, 35, 50, 25, null, 45, 60]);

            treeInstance.remove(35);
            checkTree(treeInstance, [40, 25, 50, null, null, 45, 60]);
        });

        await t.test('Should remove a node - case 4', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys2);

            treeInstance.remove(3);
            checkTree(treeInstance, [8, 4, 10, 1, 6, null, 14, null, null, null, 7, null, null, 13, null, null, null]);
        });

        await t.test('Should remove a node - case 5', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys2);

            treeInstance.remove(13);
            checkTree(treeInstance, [8, 3, 10, 1, 6, null, 14, null, null, 4, 7, null, null, null, null, null, null]);

            treeInstance.remove(4);
            checkTree(treeInstance, [8, 3, 10, 1, 6, null, 14, null, null, null, 7, null, null, null, null, null, null]);
        });

        await t.test('Should remove a node - case 6', () => {
            const treeInstance = convertArrayToTree(binarySearchTreeKeys2);

            treeInstance.remove(6);
            checkTree(treeInstance, [8, 3, 10, 1, 7, null, 14, null, null, 4, null, null, null, 13, null, null, null]);

            treeInstance.remove(8);
            checkTree(treeInstance, [10, 3, 14, 1, 7, 13, null, null, null, 4, null, null, null]);
        });
    });
});

// exports