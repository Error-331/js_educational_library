'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import LinkedListClass from './../../../src/data_structures/linked_list/linked_list_class.js';

import {
    checkLinkedListEmpty,
    checkLinkedListNotEmpty,
    checkLinkedListElement,
    checkLinkedListItemAt,
    checkLinkedListIndexOf,
    checkLinkedListFind,
    checkLinkedListItems,
    checkLinkedListIterator,
} from './../../../src/utils/testing/data_structures/linked_list/linked_list_class_test_utils.js';
import { checkLinkedListNodeDestroyed } from './../../../src/utils/testing/data_structures/linked_list/linked_list_node_class_test_utils.js';

// implementation
test('LinkedListClass tests...', async (t) => {
    await t.test('Instance creation tests...', async (t) => {
        await t.test('Should create an empty linked list', () => {
            const linkedListObj = new LinkedListClass();
            checkLinkedListEmpty(linkedListObj);
        });

        await t.test('Should create non-empty linked list', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
        });
    });

    await t.test('push() method tests...', async (t) => {
        await t.test('Should push an element to linked list', () => {
            const linkedListObj = new LinkedListClass();
            const newNode = linkedListObj.push(5);
            checkLinkedListElement(newNode.element, 5);

            checkLinkedListNotEmpty(linkedListObj, 1, 5, 5);
            checkLinkedListItems(linkedListObj, [5]);
        });

        await t.test('Should push multiple elements to linked list', () => {
            const linkedListObj = new LinkedListClass();

            let newNode = linkedListObj.push(5);
            checkLinkedListElement(newNode.element, 5);

            newNode = linkedListObj.push(7);
            checkLinkedListElement(newNode.element, 7);

            newNode = linkedListObj.push(-1);
            checkLinkedListElement(newNode.element, -1);

            newNode = linkedListObj.push(10);
            checkLinkedListElement(newNode.element, 10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, -1, 10]);
        });
    });

    await t.test('insertBeforeHead() method tests...', async (t) => {
        await t.test('Should correctly insert element into linked list before "head" - case 1', () => {
            const linkedListObj = new LinkedListClass();

            let newNode = linkedListObj.insertBeforeHead(5);
            checkLinkedListElement(newNode.element, 5);

            checkLinkedListNotEmpty(linkedListObj, 1, 5, 5);
            checkLinkedListItems(linkedListObj, [5]);

            newNode = linkedListObj.insertBeforeHead(-1);
            checkLinkedListElement(newNode.element, -1);

            checkLinkedListNotEmpty(linkedListObj, 2, -1, 5);
            checkLinkedListItems(linkedListObj, [-1, 5]);
        });

        await t.test('Should correctly insert element into linked list before "head" - case 2', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, -1, 10]);

            let newNode = linkedListObj.insertBeforeHead(51);
            checkLinkedListElement(newNode.element, 51);

            checkLinkedListNotEmpty(linkedListObj, 5, 51, 10);
            checkLinkedListItems(linkedListObj, [51, 5, 7, -1, 10]);
        });
    });

    await t.test('insertAfterNode() method tests...', async (t) => {
        await t.test('Should correctly insert element into linked list after specific node - case 1', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            let previousNode = linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, -1, 10]);

            let newNode = linkedListObj.insertAfterNode(previousNode, 72);
            checkLinkedListElement(newNode.element, 72);

            checkLinkedListNotEmpty(linkedListObj, 5, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, 72, -1, 10]);
        });

        await t.test('Should correctly insert element into linked list after specific node - case 2', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            let previousNode = linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, -1, 10]);

            let newNode = linkedListObj.insertAfterNode(previousNode, 72);
            checkLinkedListElement(newNode.element, 72);

            checkLinkedListNotEmpty(linkedListObj, 5, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, 72, -1, 10]);

            newNode = linkedListObj.insertAfterNode(newNode, 8);
            checkLinkedListElement(newNode.element, 8);

            checkLinkedListNotEmpty(linkedListObj, 6, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, 72, 8, -1, 10]);
        });
    });

    await t.test('insert() method tests...', async (t) => {
        await t.test('Should correctly insert element into linked list - case 1', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, -1, 10]);

            linkedListObj.insert(55, 1);

            checkLinkedListNotEmpty(linkedListObj, 5, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 55, 7, -1, 10]);
        });

        await t.test('Should correctly insert element into linked list - case 2', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(74);
            linkedListObj.push(1);
            linkedListObj.push(-65);
            linkedListObj.push(-2);
            linkedListObj.push(88);

            checkLinkedListNotEmpty(linkedListObj, 5, 74, 88);
            checkLinkedListItems(linkedListObj, [74, 1, -65, -2, 88]);

            linkedListObj.insert(32, 3);

            checkLinkedListNotEmpty(linkedListObj, 6, 74, 88);
            checkLinkedListItems(linkedListObj, [74, 1, -65, 32, -2, 88]);
        });

        await t.test('Should correctly insert element into linked list - case 3', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, -1, 10]);

            linkedListObj.insert(55, 0);

            checkLinkedListNotEmpty(linkedListObj, 5, 55, 10);
            checkLinkedListItems(linkedListObj, [55, 5, 7, -1, 10]);
        });

        await t.test('Should correctly insert element into linked list - case 4', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(74);
            linkedListObj.push(1);
            linkedListObj.push(-65);
            linkedListObj.push(-2);
            linkedListObj.push(88);

            checkLinkedListNotEmpty(linkedListObj, 5, 74, 88);
            checkLinkedListItems(linkedListObj, [74, 1, -65, -2, 88]);

            linkedListObj.insert(32, 5);

            checkLinkedListNotEmpty(linkedListObj, 6, 74, 32);
            checkLinkedListItems(linkedListObj, [74, 1, -65, -2, 88, 32]);
        });
    });

    await t.test('getNodeAt() method tests...', async (t) => {
        await t.test('Should correctly extract node from the linked list by its index - case 1', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);

            checkLinkedListItemAt(linkedListObj, 0, 5);
            checkLinkedListItemAt(linkedListObj, 1, 7);
            checkLinkedListItemAt(linkedListObj, 2, -1);
            checkLinkedListItemAt(linkedListObj, 3, 10);
        });

        await t.test('Should correctly extract node from the linked list by its index - case 2', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push({key: 5, value: 65});
            linkedListObj.push({key: 7, value: -5});
            linkedListObj.push({key: -1, value: 65});
            linkedListObj.push({key: 10, value: -12});

            checkLinkedListNotEmpty(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListItemAt(linkedListObj, 0, {key: 5, value: 65});
            checkLinkedListItemAt(linkedListObj, 1, {key: 7, value: -5});
            checkLinkedListItemAt(linkedListObj, 2, {key: -1, value: 65});
            checkLinkedListItemAt(linkedListObj, 3, {key: 10, value: -12});
        });
    });

    await t.test('find() method tests...', async (t) => {
        await t.test('Should correctly find node in the linked list by node value - case 1', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);

            checkLinkedListFind(linkedListObj, 0, 5, 5);
            checkLinkedListFind(linkedListObj, 1, 7, 7);
            checkLinkedListFind(linkedListObj, 2, -1, -1);
            checkLinkedListFind(linkedListObj, 3, 10, 10);
        });

        await t.test('Should correctly find node in the linked list by node value - case 2', () => {
            const comparator = (first, second) => first.value === second.value;

            const linkedListObj = new LinkedListClass(comparator);

            linkedListObj.push({key: 5, value: 65});
            linkedListObj.push({key: 7, value: -5});
            linkedListObj.push({key: -1, value: 65});
            linkedListObj.push({key: 10, value: -12});

            checkLinkedListNotEmpty(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListFind(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
            checkLinkedListFind(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListFind(linkedListObj, 0, {key: -1, value: 65}, {key: 5, value: 65});
            checkLinkedListFind(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});
        });

        await t.test('Should correctly find node in the linked list by node value - case 3', () => {
            const comparator = (first, second) => first.key === second.key;

            const linkedListObj = new LinkedListClass(comparator);

            linkedListObj.push({key: 5, value: 65});
            linkedListObj.push({key: 7, value: -5});
            linkedListObj.push({key: -1, value: 65});
            linkedListObj.push({key: 10, value: -12});

            checkLinkedListNotEmpty(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListFind(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
            checkLinkedListFind(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListFind(linkedListObj, 2, {key: -1, value: 65}, {key: -1, value: 65});
            checkLinkedListFind(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});
        });
    });

    await t.test('indexOf() method tests...', async (t) => {
        await t.test('Should correctly find nodes index in the linked list by node value - case 1', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);

            checkLinkedListIndexOf(linkedListObj, 0, 5, 5);
            checkLinkedListIndexOf(linkedListObj, 1, 7, 7);
            checkLinkedListIndexOf(linkedListObj, 2, -1, -1);
            checkLinkedListIndexOf(linkedListObj, 3, 10, 10);
        });

        await t.test('Should correctly find nodes index in the linked list by node value - case 2', () => {
            const comparator = (first, second) => first.value === second.value;

            const linkedListObj = new LinkedListClass(comparator);

            linkedListObj.push({key: 5, value: 65});
            linkedListObj.push({key: 7, value: -5});
            linkedListObj.push({key: -1, value: 65});
            linkedListObj.push({key: 10, value: -12});

            checkLinkedListNotEmpty(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListIndexOf(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
            checkLinkedListIndexOf(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListIndexOf(linkedListObj, 0, {key: -1, value: 65}, {key: 5, value: 65});
            checkLinkedListIndexOf(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});
        });

        await t.test('Should correctly find nodes index in the linked list by node value - case 3', () => {
            const comparator = (first, second) => first.key === second.key;

            const linkedListObj = new LinkedListClass(comparator);

            linkedListObj.push({key: 5, value: 65});
            linkedListObj.push({key: 7, value: -5});
            linkedListObj.push({key: -1, value: 65});
            linkedListObj.push({key: 10, value: -12});

            checkLinkedListNotEmpty(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListIndexOf(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
            checkLinkedListIndexOf(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListIndexOf(linkedListObj, 2, {key: -1, value: 65}, {key: -1, value: 65});
            checkLinkedListIndexOf(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});
        });
    });

    await t.test('removeHeadNode() method tests...', async (t) => {
        await t.test('Should correctly remove head node from the linked list - case 1', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, -1, 10]);

            const removedElement = linkedListObj.removeHeadNode();
            checkLinkedListElement(5, removedElement);

            checkLinkedListNotEmpty(linkedListObj, 3, 7, 10);
            checkLinkedListItems(linkedListObj, [7, -1, 10]);
        });

        await t.test('Should correctly remove head node from the linked list - case 2', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, -1, 10]);

            let removedElement = linkedListObj.removeHeadNode();
            checkLinkedListElement(5, removedElement);

            checkLinkedListNotEmpty(linkedListObj, 3, 7, 10);
            checkLinkedListItems(linkedListObj, [7, -1, 10]);

            removedElement = linkedListObj.removeHeadNode();
            checkLinkedListElement(7, removedElement);

            checkLinkedListNotEmpty(linkedListObj, 2, -1, 10);
            checkLinkedListItems(linkedListObj, [-1, 10]);

            removedElement = linkedListObj.removeHeadNode();
            checkLinkedListElement(-1, removedElement);

            checkLinkedListNotEmpty(linkedListObj, 1, 10, 10);
            checkLinkedListItems(linkedListObj, [10]);

            removedElement = linkedListObj.removeHeadNode();
            checkLinkedListElement(10, removedElement);

            checkLinkedListEmpty(linkedListObj);
        });
    });

    await t.test('removeNextNode() method tests...', async (t) => {
        await t.test('Should correctly remove a node after specific one in the linked list - case 1', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            const previousNode = linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, -1, 10]);

            const removedElement = linkedListObj.removeNextNode(previousNode);
            checkLinkedListElement(-1, removedElement);

            checkLinkedListNotEmpty(linkedListObj, 3, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, 10]);
        });

        await t.test('Should correctly remove a node after specific one in the linked list - case 2', () => {
            const linkedListObj = new LinkedListClass();

            const previousNode = linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, -1, 10]);

            let removedElement = linkedListObj.removeNextNode(previousNode);
            checkLinkedListElement(7, removedElement);

            checkLinkedListNotEmpty(linkedListObj, 3, 5, 10);
            checkLinkedListItems(linkedListObj, [5, -1, 10]);

            removedElement = linkedListObj.removeNextNode(previousNode);
            checkLinkedListElement(-1, removedElement);

            checkLinkedListNotEmpty(linkedListObj, 2, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 10]);

            removedElement = linkedListObj.removeNextNode(previousNode);
            checkLinkedListElement(10, removedElement);

            checkLinkedListNotEmpty(linkedListObj, 1, 5, 5);
            checkLinkedListItems(linkedListObj, [5]);
        });
    });

    await t.test('removeAt() method tests...', async (t) => {
        await t.test('Should correctly remove a node at specific index in the linked list - case 1', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, -1, 10]);

            const removedElement = linkedListObj.removeAt(2);
            checkLinkedListElement(-1, removedElement);

            checkLinkedListNotEmpty(linkedListObj, 3, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, 10]);
        });

        await t.test('Should correctly remove a node at specific index in the linked list - case 2', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, -1, 10]);

            const removedElement = linkedListObj.removeAt(0);
            checkLinkedListElement(5, removedElement);

            checkLinkedListNotEmpty(linkedListObj, 3, 7, 10);
            checkLinkedListItems(linkedListObj, [7, -1, 10]);
        });

        await t.test('Should correctly remove a node at specific index in the linked list - case 3', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, -1, 10]);

            const removedElement = linkedListObj.removeAt(3);
            checkLinkedListElement(10, removedElement);

            checkLinkedListNotEmpty(linkedListObj, 3, 5, -1);
            checkLinkedListItems(linkedListObj, [5, 7, -1]);
        });
    });

    await t.test('remove() method tests...', async (t) => {
        await t.test('Should correctly remove a node with specific value in the linked list - case 1', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);

            checkLinkedListIndexOf(linkedListObj, 0, 5, 5);
            checkLinkedListIndexOf(linkedListObj, 1, 7, 7);
            checkLinkedListIndexOf(linkedListObj, 2, -1, -1);
            checkLinkedListIndexOf(linkedListObj, 3, 10, 10);

            const removedElement = linkedListObj.remove(-1);
            checkLinkedListElement(-1, removedElement);

            checkLinkedListNotEmpty(linkedListObj, 3, 5, 10);

            checkLinkedListIndexOf(linkedListObj, 0, 5, 5);
            checkLinkedListIndexOf(linkedListObj, 1, 7, 7);
            checkLinkedListIndexOf(linkedListObj, 2, 10, 10);
        });

        await t.test('Should correctly remove a node with specific value in the linked list - case 2', () => {
            const comparator = (first, second) => first.value === second.value;

            const linkedListObj = new LinkedListClass(comparator);

            linkedListObj.push({key: 5, value: 65});
            linkedListObj.push({key: 7, value: -5});
            linkedListObj.push({key: -1, value: 65});
            linkedListObj.push({key: 10, value: -12});

            checkLinkedListNotEmpty(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListIndexOf(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
            checkLinkedListIndexOf(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListIndexOf(linkedListObj, 0, {key: -1, value: 65}, {key: 5, value: 65});
            checkLinkedListIndexOf(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});

            const removedElement = linkedListObj.remove({key: -1, value: 65});
            checkLinkedListElement({key: 5, value: 65}, removedElement);

            checkLinkedListNotEmpty(linkedListObj, 3, {key: 7, value: -5}, {key: 10, value: -12});

            checkLinkedListIndexOf(linkedListObj, 0, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListIndexOf(linkedListObj, 1, {key: -1, value: 65}, {key: -1, value: 65});
            checkLinkedListIndexOf(linkedListObj, 2, {key: 10, value: -12}, {key: 10, value: -12});
        });

        await t.test('Should correctly remove a node with specific value in the linked list - case 3', () => {
            const comparator = (first, second) => first.key === second.key;

            const linkedListObj = new LinkedListClass(comparator);

            linkedListObj.push({key: 5, value: 65});
            linkedListObj.push({key: 7, value: -5});
            linkedListObj.push({key: -1, value: 65});
            linkedListObj.push({key: 10, value: -12});

            checkLinkedListNotEmpty(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListIndexOf(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
            checkLinkedListIndexOf(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListIndexOf(linkedListObj, 2, {key: -1, value: 65}, {key: -1, value: 65});
            checkLinkedListIndexOf(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});

            const removedElement = linkedListObj.remove({key: -1, value: 65});
            checkLinkedListElement({key: -1, value: 65}, removedElement);

            checkLinkedListNotEmpty(linkedListObj, 3, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListIndexOf(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
            checkLinkedListIndexOf(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListIndexOf(linkedListObj, 2, {key: 10, value: -12}, {key: 10, value: -12});
        });
    });

    await t.test('iterator tests...', async (t) => {
        await t.test('Should correctly iterate through the linked list - case 1', () => {
            const linkedListObj = new LinkedListClass();
            const linkedListValues = [5, 7, -1, 10];

            linkedListObj.push(linkedListValues[0]);
            linkedListObj.push(linkedListValues[1]);
            linkedListObj.push(linkedListValues[2]);
            linkedListObj.push(linkedListValues[3]);

            checkLinkedListIterator(linkedListObj, linkedListValues);
        });

        await t.test('Should correctly iterate through the linked list - case 2', () => {
            const linkedListObj = new LinkedListClass();
            const linkedListValues = [74, 1, -65, -2, 88];

            linkedListObj.push(linkedListValues[0]);
            linkedListObj.push(linkedListValues[1]);
            linkedListObj.push(linkedListValues[2]);
            linkedListObj.push(linkedListValues[3]);
            linkedListObj.push(linkedListValues[4]);

            checkLinkedListIterator(linkedListObj, linkedListValues);
        });
    });

    await t.test('toString() method tests...', async (t) => {
        await t.test('Should correctly convert linked list to string - case 1', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, -1, 10]);

            assert.strictEqual(linkedListObj.toString(), '5,7,-1,10');
        });
    });

    await t.test('toArray() method tests...', async (t) => {
        await t.test('Should correctly convert linked list to array - case 1', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);
            checkLinkedListItems(linkedListObj, [5, 7, -1, 10]);

            assert.deepStrictEqual(linkedListObj.toArray(), [5, 7, -1, 10]);
        });

        await t.test('Should correctly convert linked list to array - case 2', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(74);
            linkedListObj.push(1);
            linkedListObj.push(-65);
            linkedListObj.push(-2);
            linkedListObj.push(88);

            checkLinkedListNotEmpty(linkedListObj, 5, 74, 88);
            checkLinkedListItems(linkedListObj, [74, 1, -65, -2, 88]);

            assert.deepStrictEqual(linkedListObj.toArray(), [74, 1, -65, -2, 88]);
        });
    });

    await t.test('destroy() method tests...', async (t) => {
        await t.test('Should correctly destroy linked list and free all resources - case 1', () => {
            const linkedListObj = new LinkedListClass();

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty(linkedListObj, 4, 5, 10);

            const iteratedLinkedListNodes = [];

            for (const node of linkedListObj) {
                iteratedLinkedListNodes.push(node);
            }

            linkedListObj.destroy();
            checkLinkedListEmpty(linkedListObj);

            for (const node of iteratedLinkedListNodes) {
                checkLinkedListNodeDestroyed(node);
            }
        });
    });
});

// exports
