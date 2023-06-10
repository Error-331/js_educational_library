'use strict';

// external imports
import assert from 'node:assert/strict';

// internal imports

// implementation
function checkNode(node, parent, key, left, right) {
    assert.deepStrictEqual(node.parent, parent);
    assert.deepStrictEqual(node.key, key);

    if (left !== null) {
        checkNode(node.left, left.parent, left.key, left.left, left.right);
    } else {
        assert.deepStrictEqual(node.left, null);
    }

    if (right !== null) {
        checkNode(node.right, right.parent, right.key, right.left, right.right);
    } else {
        assert.deepStrictEqual(node.right, null);
    }
}

// exports
export {
    checkNode
}