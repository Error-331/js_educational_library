'use strict';

// external imports
import assert from 'node:assert/strict';
import test from 'node:test';

// internal imports
import {
    prefixTreeWord1,
    prefixTreeWord2,
    prefixTreeWord3,
    prefixTreeWord4,
    prefixTreeWord5,
    prefixTreeWord6,
} from './../test_data.js';

import PrefixTreeClass from './../../../../src/data_structures/tree/prefix_tree/prefix_tree_class.js';
import GenericTreeInOrderTraverseClass from '../../../../src/data_structures/tree/general_tree/traversal/generic_tree_in_order_traverse_class.js';

// implementation
test('PrefixTreeClass tests...', async (t) => {
    const testSequence1 = [
        { char: 'd', isFinal: true },  { char: 'n', isFinal: false },  { char: 'u', isFinal: false },  { char: 'o', isFinal: false },
        { char: 'b', isFinal: false },
        { char: 't', isFinal: true },  { char: 'n', isFinal: false },  { char: 'a', isFinal: false },  { char: 'd', isFinal: false },  { char: 'n', isFinal: false },  { char: 'u', isFinal: false },
        { char: 'a', isFinal: false },
        { char: 'e', isFinal: true },  { char: 'c', isFinal: false },
        { char: 'e', isFinal: true },  { char: 'v', isFinal: false },  { char: 'e', isFinal: false },  { char: 'i', isFinal: false },  { char: 'h', isFinal: false },
        { char: 'e', isFinal: true },  { char: 'l', isFinal: false },  { char: 'b', isFinal: false },  { char: 'a', isFinal: false },
        { char: 'i', isFinal: false },
        { char: 'e', isFinal: true },  { char: 'l', isFinal: false },  { char: 'b', isFinal: false },  { char: 'a', isFinal: false },  { char: 'c', isFinal: false },
        { char: 'm', isFinal: false },
        { char: null, isFinal: false }
    ];

    await t.test('"insert" method tests...', async (t) => {
        await t.test('Should correctly insert words into prefix tree - case 1', () => {
            const treeInstance = new PrefixTreeClass();

            treeInstance.insert(prefixTreeWord1);
            treeInstance.insert(prefixTreeWord2);
            treeInstance.insert(prefixTreeWord3);
            treeInstance.insert(prefixTreeWord4);
            treeInstance.insert(prefixTreeWord5);
            treeInstance.insert(prefixTreeWord6);

            const traversedKeys = [];
            GenericTreeInOrderTraverseClass.traverse(treeInstance, (node) => traversedKeys.push(node.data.toObject()));
            assert.deepStrictEqual(traversedKeys, testSequence1);
        });
    });

    await t.test('"findKey" method tests...', async (t) => {
        await t.test('Should correctly find key - case 1', () => {
            const treeInstance = new PrefixTreeClass();

            treeInstance.insert(prefixTreeWord1);
            treeInstance.insert(prefixTreeWord2);
            treeInstance.insert(prefixTreeWord3);
            treeInstance.insert(prefixTreeWord4);
            treeInstance.insert(prefixTreeWord5);
            treeInstance.insert(prefixTreeWord6);

            let prefixNode = treeInstance.findKey(prefixTreeWord1);
            assert.deepStrictEqual(prefixNode.data.toObject(), { char: 'd', isFinal: true });

            prefixNode = treeInstance.findKey(prefixTreeWord2);
            assert.deepStrictEqual(prefixNode.data.toObject(), { char: 't', isFinal: true });

            prefixNode = treeInstance.findKey(prefixTreeWord3);
            assert.deepStrictEqual(prefixNode.data.toObject(), { char: 'e', isFinal: true });

            prefixNode = treeInstance.findKey(prefixTreeWord4);
            assert.deepStrictEqual(prefixNode.data.toObject(), { char: 'e', isFinal: true });

            prefixNode = treeInstance.findKey(prefixTreeWord5);
            assert.deepStrictEqual(prefixNode.data.toObject(), { char: 'e', isFinal: true });

            prefixNode = treeInstance.findKey(prefixTreeWord6);
            assert.deepStrictEqual(prefixNode.data.toObject(), { char: 'e', isFinal: true });

            prefixNode = treeInstance.findKey('bound');
            assert.deepStrictEqual(prefixNode, null);

            prefixNode = treeInstance.findKey('able');
            assert.deepStrictEqual(prefixNode, null);

            prefixNode = treeInstance.findKey('eve');
            assert.deepStrictEqual(prefixNode, null);
        });
    });
});

// exports