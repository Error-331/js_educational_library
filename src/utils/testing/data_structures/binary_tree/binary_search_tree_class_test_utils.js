'use strict';

// external imports
import assert from 'node:assert/strict';

// internal imports
import BinarySearchTreeNodeClass from './../../../../data_structures/binary_tree/binary_search_tree_class.js';

import { isNil } from './../../../misc/logic_utils.js';
import { checkNodeValues } from './binary_search_tree_node_class_test_utils.js';

// implementation
function convertArrayToTree(treeArray) {
    const treeInstance = new BinarySearchTreeNodeClass();

    for (const key of treeArray) {
        treeInstance.insert(key);
    }

    return treeInstance;
}

function checkTree(tree, testSeq) {
    if(isNil(testSeq)) {
        assert.fail('Testing sequence is not set');
    }

    const nodeQueue = [tree.root];
    let parentIdx = 0;

    for (let testSeqIdx = 0; testSeqIdx < testSeq.length; testSeqIdx++) {
        const currentNodeTestKey = testSeq[testSeqIdx];
        const currentNodeParentTestKey = testSeqIdx === 0 ? null : testSeq[parentIdx];

        if (testSeqIdx > 1 && testSeqIdx % 2 === 0) {
            parentIdx += 1;
        }

        if (isNil(currentNodeTestKey)) {
            continue;
        }

        const currentNode = nodeQueue[testSeqIdx];

        if (isNil(currentNode)) {
            continue;
        }

        nodeQueue.push(currentNode.left);
        nodeQueue.push(currentNode.right);

        const currentNodeTestLeftKey = testSeq[testSeqIdx + testSeqIdx + 1] ?? null;
        const currentNodeTestRightKey = testSeq[testSeqIdx + testSeqIdx + 2] ?? null;

        // check
        checkNodeValues(currentNode, currentNodeParentTestKey, currentNodeTestKey, currentNodeTestLeftKey, currentNodeTestRightKey);
    }
}

// exports
export {
    convertArrayToTree,
    checkTree,
}