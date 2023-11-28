'use strict';

// external imports
import assert from 'node:assert/strict';

// internal imports

// implementation
function checkTree(tree, root) {
    assert.deepStrictEqual(tree.root, root);
}

// exports
export {
    checkTree,
}
