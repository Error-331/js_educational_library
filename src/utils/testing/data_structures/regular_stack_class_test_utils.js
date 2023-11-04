'use strict';

// external imports
import assert from 'node:assert/strict';

// internal imports

// implementation
function checkRegularStackEmpty(stack) {
    assert.strictEqual(stack.size, 0);
    assert.strictEqual(stack.isEmpty, true);
}

function checkRegularStackNotEmpty(stack, size, head) {
    assert.strictEqual(stack.size, size);
    assert.strictEqual(stack.isEmpty, false);

    const currentStackHead = stack.peek();
    assert.deepStrictEqual(currentStackHead.serialize?.() ?? currentStackHead, head.serialize?.() ?? head);
}

function checkRegularStackItems(stack, testItems= [], idShift = 0) {
    const testItemsLength = testItems.length;
    assert.strictEqual(stack.size, testItemsLength);

    let itemsCount = 0;

    for (const { id, item } of stack) {
        itemsCount += 1;

        const testItem = testItems[id];
        assert.deepStrictEqual(item.serialize?.() ?? item, testItem.serialize?.() ?? testItem);
    }

    assert.strictEqual(itemsCount, testItems.length);
}

// exports
export {
    checkRegularStackEmpty,
    checkRegularStackNotEmpty,
    checkRegularStackItems,
}
