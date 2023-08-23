'use strict';

// external imports
import assert from 'node:assert/strict';

// internal imports

// implementation
function checkLinkedListEmpty(linkedList) {
    assert.strictEqual(linkedList.size, 0);
    assert.strictEqual(linkedList.isEmpty, true);
    assert.strictEqual(linkedList.head, null);
    assert.strictEqual(linkedList.lastChild, null);
}

function checkLinkedListNotEmpty(linkedList, size, head, lastChild) {
    assert.strictEqual(linkedList.size, size);
    assert.strictEqual(linkedList.isEmpty, false);

    assert.deepStrictEqual(linkedList.head.element.serialize?.() ?? linkedList.head.element, head.serialize?.() ?? head);
    assert.deepStrictEqual(linkedList.lastChild.element.serialize?.() ?? linkedList.lastChild.element, lastChild.serialize?.() ?? lastChild);
}

function checkLinkedListElement(listElement, testElement) {
    assert.deepStrictEqual(testElement.serialize?.() ?? testElement, listElement.serialize?.() ?? listElement);
}

function checkLinkedListItem(listNode, testNode) {
    checkLinkedListElement(testNode.element, listNode.element);
}

function checkLinkedListItemAt(linkedList, itemIndex, testItem) {
    const linkedListItem = linkedList.getNodeAt(itemIndex);
    checkLinkedListElement(testItem, linkedListItem.element);
}

function checkLinkedListFind(linkedList, itemIndex, testItemSearch, testItemStored) {
    checkLinkedListItemAt(linkedList, itemIndex, testItemStored);

    const linkedListItem = linkedList.find(testItemSearch);
    assert.deepStrictEqual(linkedListItem.serialize?.() ?? linkedListItem, testItemStored.serialize?.() ?? testItemStored);
}

function checkLinkedListIndexOf(linkedList, itemIndex, testItemSearch, testItemStored) {
    checkLinkedListItemAt(linkedList, itemIndex, testItemStored);

    const linkedListItemIndex = linkedList.indexOf(testItemSearch);

    assert.strictEqual(linkedListItemIndex, itemIndex);
    checkLinkedListItemAt(linkedList, linkedListItemIndex, testItemStored);
}

function checkLinkedListItems(linkedList, testItems = []) {
    const testItemsLength = testItems.length;
    assert.strictEqual(linkedList.size, testItemsLength);

    for (let itemsCnt = 0; itemsCnt < testItemsLength; itemsCnt++) {
        const testItem = testItems[itemsCnt];
        const linkedListItem = linkedList.getNodeAt(itemsCnt).element;

        assert.deepStrictEqual(testItem.serialize?.() ?? testItem, linkedListItem.serialize?.() ?? linkedListItem);
    }
}

function checkLinkedListIterator(linkedList, testItems = []) {
    const iteratedLinkedListItems = [];

    for (const node of linkedList) {
        iteratedLinkedListItems.push(node.element.serialize?.() ?? node.element);
    }

    assert.deepStrictEqual(testItems, iteratedLinkedListItems);
}

// exports
export {
    checkLinkedListEmpty,
    checkLinkedListNotEmpty,

    checkLinkedListElement,
    checkLinkedListItem,
    checkLinkedListFind,
    checkLinkedListItemAt,
    checkLinkedListIndexOf,

    checkLinkedListItems,
    checkLinkedListIterator,
};
