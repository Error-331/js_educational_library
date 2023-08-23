'use strict';

// external imports
import assert from 'node:assert/strict';

// internal imports

// implementation
function checkLinkedListNodeDestroyed(linkedListNode) {
    assert.strictEqual(linkedListNode.element, null);
    assert.strictEqual(linkedListNode.next, null);
}

// exports
export {
    checkLinkedListNodeDestroyed
}
