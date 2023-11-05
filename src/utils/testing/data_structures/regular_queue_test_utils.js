'use strict';

// external imports
import assert from 'node:assert/strict';

// internal imports

// implementation
function checkRegularQueueEmpty(queue) {
    assert.strictEqual(queue.size, 0);
    assert.strictEqual(queue.isEmpty, true);
    assert.strictEqual(queue.peek(), null);
    assert.strictEqual(queue.nextItemId, 0);
}

function checkRegularQueueNotEmpty(queue, size, nextItemId, nextItem) {
    assert.strictEqual(queue.size, size);
    assert.strictEqual(queue.isEmpty, false);
    assert.strictEqual(queue.nextItemId, nextItemId);

    assert.deepStrictEqual(queue.peek().serialize?.() ?? queue.peek(), nextItem.serialize?.() ?? nextItem);
}

function checkRegularQueueItems(queue, testItems = [], idShift = 0) {
    const testItemsLength = testItems.length;
    assert.strictEqual(queue.size, testItemsLength);

    let itemsCount = 0;

    for (const { id, item } of queue) {
        itemsCount += 1;
        const testItem = testItems[id + idShift];

        assert.deepStrictEqual(item.serialize?.() ?? item, testItem.serialize?.() ?? testItem);
    }

    assert.strictEqual(itemsCount, testItems.length);
}

// exports
export {
    checkRegularQueueEmpty,
    checkRegularQueueNotEmpty,
    checkRegularQueueItems,
}
