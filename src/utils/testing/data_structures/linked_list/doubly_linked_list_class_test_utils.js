'use strict';

// external imports
import assert from 'node:assert/strict';

// internal imports

// implementation
function checkDoublyLinkedListEmpty(doublyLinkedList) {
    assert.strictEqual(doublyLinkedList.size, 0);
    assert.strictEqual(doublyLinkedList.isEmpty, true);
    assert.strictEqual(doublyLinkedList.head, null);
    assert.strictEqual(doublyLinkedList.tail, null);
    assert.strictEqual(doublyLinkedList.lastChild, null);
}

function checkDoublyLinkedListNotEmpty(doublyLinkedList, size, head, tail) {
    assert.strictEqual(doublyLinkedList.size, size);
    assert.strictEqual(doublyLinkedList.isEmpty, false);

    assert.deepStrictEqual(doublyLinkedList.head.element.serialize?.() ?? doublyLinkedList.head.element, head.serialize?.() ?? head);
    assert.deepStrictEqual(doublyLinkedList.tail.element.serialize?.() ?? doublyLinkedList.tail.element, tail.serialize?.() ?? tail);
}

function checkDoublyLinkedListElement(listElement, testElement) {
    assert.deepStrictEqual(testElement.serialize?.() ?? testElement, listElement.serialize?.() ?? listElement);
}

function checkDoublyLinkedListItem(listNode, testNode) {
    checkDoublyLinkedListElement(testNode.element, listNode.element);
}

function checkDoublyLinkedListItemAt(linkedList, itemIndex, testItem) {
    const linkedListItem = linkedList.getNodeAt(itemIndex);
    checkDoublyLinkedListElement(testItem, linkedListItem.element);
}

function checkDoublyLinkedListFind(linkedList, itemIndex, testItemSearch, testItemStored) {
    checkDoublyLinkedListItemAt(linkedList, itemIndex, testItemStored);

    const linkedListItem = linkedList.find(testItemSearch);
    assert.deepStrictEqual(linkedListItem.serialize?.() ?? linkedListItem, testItemStored.serialize?.() ?? testItemStored);
}

function checkDoublyLinkedListIndexOf(linkedList, itemIndex, testItemSearch, testItemStored) {
    checkDoublyLinkedListItemAt(linkedList, itemIndex, testItemStored);

    const linkedListItemIndex = linkedList.indexOf(testItemSearch);

    assert.strictEqual(linkedListItemIndex, itemIndex);
    checkDoublyLinkedListItemAt(linkedList, linkedListItemIndex, testItemStored);
}

function checkDoublyLinkedListItems(linkedList, testItems = []) {
    const testItemsLength = testItems.length;
    assert.strictEqual(linkedList.size, testItemsLength);

    for (let itemsCnt = 0; itemsCnt < testItemsLength; itemsCnt++) {
        const testItem = testItems[itemsCnt];
        const linkedListItem = linkedList.getNodeAt(itemsCnt).element;

        assert.deepStrictEqual(testItem.serialize?.() ?? testItem, linkedListItem.serialize?.() ?? linkedListItem);
    }
}

function checkDoublyLinkedListIterator(linkedList, testItems = []) {
    const iteratedLinkedListItems = [];

    for (const node of linkedList) {
        iteratedLinkedListItems.push(node.element.serialize?.() ?? node.element);
    }

    assert.deepStrictEqual(testItems, iteratedLinkedListItems);
}

// exports
export {
    checkDoublyLinkedListEmpty,
    checkDoublyLinkedListNotEmpty,

    checkDoublyLinkedListElement,
    checkDoublyLinkedListItem,
    checkDoublyLinkedListFind,
    checkDoublyLinkedListItemAt,
    checkDoublyLinkedListIndexOf,

    checkDoublyLinkedListItems,
    checkDoublyLinkedListIterator,
};
