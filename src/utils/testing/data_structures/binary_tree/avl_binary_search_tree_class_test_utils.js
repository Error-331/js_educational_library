'use strict';

// external imports
import assert from 'node:assert/strict';

// internal imports
import AVLBinarySearchTreeClass from './../../../../data_structures/binary_tree/avl_binary_search_tree_class.js';
import BinarySearchTreePreOrderTraverseClass from './../../../../data_structures/binary_tree/traversal/binary_search_tree_pre_order_traverse_class.js';

function checkNodeHeightsPreOrder(treeInstance, testSequence) {
    const traversedKeys = [];

    BinarySearchTreePreOrderTraverseClass.traverse(treeInstance, (node) => {
        traversedKeys.push(AVLBinarySearchTreeClass.calcNodeHeight(node));
    });

    assert.deepStrictEqual(traversedKeys, testSequence);
}

// exports
export {
    checkNodeHeightsPreOrder,
}