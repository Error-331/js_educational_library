'use strict';

// external imports
import assert from 'node:assert/strict';

// internal imports

// implementation
function checkDoublyLinkedListNodeDestroyed(linkedListNode) {
    assert.strictEqual(linkedListNode.element, null);
    assert.strictEqual(linkedListNode.next, null);
    assert.strictEqual(linkedListNode.prev, null);
}

// exports
export {
    checkDoublyLinkedListNodeDestroyed,
}
