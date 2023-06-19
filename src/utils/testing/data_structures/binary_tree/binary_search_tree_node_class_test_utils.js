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

function checkNodeValues(node, parentKey, key, leftKey, rightKey) {
    assert.deepStrictEqual(node.parent?.key ?? null, parentKey);
    assert.deepStrictEqual(node.key, key);
    assert.deepStrictEqual(node.left?.key ?? null, leftKey);
    assert.deepStrictEqual(node.right?.key ?? null, rightKey);
}

// exports
export {
    checkNode,
    checkNodeValues,
}