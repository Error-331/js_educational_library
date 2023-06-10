'use strict';

// external imports
import test from 'node:test';

// internal imports
import BinarySearchTreeNodeClass from './../../../src/data_structures/binary_tree/binary_search_tree_node_class.js';
import { checkNode } from './../../../src/utils/testing/data_structures/binary_tree/binary_search_tree_node_class_test_utils.js';

// implementation
test('BinarySearchTreeNodeClass tests...', async (t) => {
    const key1 = 2;
    const key2 = 'ab';
    const key3 = 312;
    const key4 = { prop1: 1 }

    await t.test('Instance creation tests...', async (t) => {
        await t.test('Should create a BinarySearchTreeNode - case 1', () => {
            const binaryTreeNode = new BinarySearchTreeNodeClass(key1, null);

            checkNode(binaryTreeNode,null, key1, null, null);
        });

        await t.test('Should create a BinarySearchTreeNode - case 2', () => {
            const binaryTreeNode = new BinarySearchTreeNodeClass(key2, null);

            checkNode(binaryTreeNode,null, key2, null, null);
        });

        await t.test('Should create a BinarySearchTreeNode - case 3', () => {
            const binaryTreeNode1 = new BinarySearchTreeNodeClass(key1, null);
            const binaryTreeNode2 = new BinarySearchTreeNodeClass(key2, binaryTreeNode1);

            checkNode(binaryTreeNode1,null, key1, null, null);
            checkNode(binaryTreeNode2,binaryTreeNode1, key2, null, null);
        });
    });

    await t.test('"left" setter/getter tests...', async (t) => {
        await t.test('Should set left - case 1', () => {
            const binaryTreeNode1 = new BinarySearchTreeNodeClass(key1, null);
            const binaryTreeNode2 = new BinarySearchTreeNodeClass(key2, null);

            checkNode(binaryTreeNode1,null, key1, null, null);
            checkNode(binaryTreeNode2,null, key2, null, null);

            binaryTreeNode1.left = binaryTreeNode2;
            checkNode(binaryTreeNode1,null, key1, binaryTreeNode2, null);
        });

        await t.test('Should set left - case 2', () => {
            const binaryTreeNode1 = new BinarySearchTreeNodeClass(key1, null);
            const binaryTreeNode2 = new BinarySearchTreeNodeClass(key3, binaryTreeNode1);
            const binaryTreeNode3 = new BinarySearchTreeNodeClass(key4, null);

            checkNode(binaryTreeNode1,null, key1, null, null);
            checkNode(binaryTreeNode2,binaryTreeNode1, key3, null, null);
            checkNode(binaryTreeNode3,null, key4, null, null);

            binaryTreeNode1.left = binaryTreeNode2;
            checkNode(binaryTreeNode1, null, key1, binaryTreeNode2, null);
        });
    });

    await t.test('"right" setter/getter tests...', async (t) => {
        await t.test('Should set right - case 1', () => {
            const binaryTreeNode1 = new BinarySearchTreeNodeClass(key1, null);
            const binaryTreeNode2 = new BinarySearchTreeNodeClass(key2, null);

            checkNode(binaryTreeNode1,null, key1, null, null);
            checkNode(binaryTreeNode2,null, key2, null, null);

            binaryTreeNode1.right = binaryTreeNode2;
            checkNode(binaryTreeNode1,null, key1, null, binaryTreeNode2);
        });

        await t.test('Should set right - case 2', () => {
            const binaryTreeNode1 = new BinarySearchTreeNodeClass(key1, null);
            const binaryTreeNode2 = new BinarySearchTreeNodeClass(key3, binaryTreeNode1);
            const binaryTreeNode3 = new BinarySearchTreeNodeClass(key4, null);

            checkNode(binaryTreeNode1,null, key1, null, null);
            checkNode(binaryTreeNode2,binaryTreeNode1, key3, null, null);
            checkNode(binaryTreeNode3,null, key4, null, null);

            binaryTreeNode1.right = binaryTreeNode2;
            checkNode(binaryTreeNode1, null, key1, null, binaryTreeNode2);
        });
    });
});

// exports