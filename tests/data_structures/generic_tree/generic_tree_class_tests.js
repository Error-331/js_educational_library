'use strict';

// external imports
import test from 'node:test';

// internal imports
import GenericTreeClass from './../../../src/data_structures/generic_tree/generic_tree_class.js';

import { checkTree } from './../../../src/utils/testing/data_structures/generic_tree/generic_tree_test_utils.js';
import { checkNode } from './../../../src/utils/testing/data_structures/generic_tree/generic_tree_node_test_utils.js';

// implementation
test('GenericTreeClass tests...', async (t) => {
    await t.test('Instance creation tests...', async (t) => {
        await t.test('Should create a GenericTreeClass - case 1', () => {
            const tree = new GenericTreeClass();
            checkTree(tree, null)
        });

        await t.test('Should create a GenericTreeClass - case 2', () => {
            const tree = new GenericTreeClass();

            const data = 'test_val1';
            const node = tree.createNewRoot(data);

            checkNode(node, tree, null, data);
            checkTree(tree, node);
        });
    });

    await t.test('Root node creation tests...', async (t) => {
        await t.test('Should create a new root node - case 1', () => {
            const tree = new GenericTreeClass();
            const data = 'test_val1';

            checkNode(tree.createNewRoot(data), tree, null, data);
        });

        await t.test('Should create a new root node - case 2', () => {
            let tree = new GenericTreeClass();

            const data1 = 'test_val1';
            const data2 = 5;

            let node = tree.createNewRoot(data1);
            checkNode(node, tree, null, data1);

            node = tree.createNewRoot(data2);
            checkNode(node, tree, null, data2);
        });
    });

    await t.test('Root node extraction tests...', async (t) => {
        await t.test('Should extract root node - case 1', () => {
            let tree = new GenericTreeClass();
            const data = 'test_val1';

            let node = tree.createNewRoot(data);
            checkNode(node, tree, null, data);

            node = tree.root;
            checkNode(node, tree, null, data);
        });

        await t.test('Should extract root node - case 2', () => {
            let tree = new GenericTreeClass();

            const data1 = 'test_val1';
            const data2 = 5;

            let node = tree.createNewRoot(data1);
            checkNode(node, tree, null, data1);

            node = tree.root;
            checkNode(node, tree, null, data1);

            node = tree.createNewRoot(data2);
            checkNode(node, tree, null, data2);

            node = tree.root;
            checkNode(node, tree, null, data2);
        });
    });
});

// exports

