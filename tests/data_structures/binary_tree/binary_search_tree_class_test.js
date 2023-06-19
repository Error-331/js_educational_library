'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { convertArrayToTree, checkTree } from './../../../src/utils/testing/data_structures/binary_tree/binary_search_tree_class_test_utils.js';

// implementation
test('BinarySearchTreeClass tests...', async (t) => {
    const keys1 = [40, 30, 50, 25, 35, 45, 60];
    const keys2 = [8, 3, 10, 1, 6, 4, 7, 14, 13];
    const keys3 = [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25];

    await t.test('Instance creation tests...', async (t) => {
        const testSequence1 = [40, 30, 50, 25, 35, 45, 60];
        const testSequence2 = [8, 3, 10, 1, 6, null, 14, null, null, 4, 7, null, null, 13, null, null, null];
        const testSequence3 = [11, 7, 15, 5, 9, 13, 20, 3, null, 8, 10, 12, 14, 18, 25];

        await t.test('Should create a BinarySearchTreeNode - case 1', () => {
            const treeInstance = convertArrayToTree(keys1);
            checkTree(treeInstance, testSequence1);
        });

        await t.test('Should create a BinarySearchTreeNode - case 2', () => {
            const treeInstance = convertArrayToTree(keys2);
            checkTree(treeInstance, testSequence2);
        });

        await t.test('Should create a BinarySearchTreeNode - case 3', () => {
            const treeInstance = convertArrayToTree(keys3);
            checkTree(treeInstance, testSequence3);
        });
    });

    await t.test('Minimum value tests...', async (t) => {
        await t.test('Should find minimum value - case 1', () => {
            const treeInstance = convertArrayToTree(keys1);
            assert.deepStrictEqual(treeInstance.min.key, 25);
        });

        await t.test('Should find minimum value - case 2', () => {
            const treeInstance = convertArrayToTree(keys2);
            assert.deepStrictEqual(treeInstance.min.key, 1);
        });

        await t.test('Should find minimum value - case 3', () => {
            const treeInstance = convertArrayToTree(keys3);
            assert.deepStrictEqual(treeInstance.min.key, 3);
        });
    });

    await t.test('Maximum value tests...', async (t) => {
        await t.test('Should find minimum value - case 1', () => {
            const treeInstance = convertArrayToTree(keys1);
            assert.deepStrictEqual(treeInstance.max.key, 60);
        });

        await t.test('Should find minimum value - case 2', () => {
            const treeInstance = convertArrayToTree(keys2);
            assert.deepStrictEqual(treeInstance.max.key, 14);
        });

        await t.test('Should find minimum value - case 3', () => {
            const treeInstance = convertArrayToTree(keys3);
            assert.deepStrictEqual(treeInstance.max.key, 25);
        });
    });
});

// exports