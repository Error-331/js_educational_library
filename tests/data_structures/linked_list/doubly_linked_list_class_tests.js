'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { COMPARATOR_EQUAL, COMPARATOR_NONE_EQUAL } from './../../../src/constants/comparator_constants.js';

import {
    checkDoublyLinkedListEmpty,
    checkDoublyLinkedListNotEmpty,
    checkDoublyLinkedListElement,
    checkDoublyLinkedListItemAt,
    checkDoublyLinkedListIndexOf,
    checkDoublyLinkedListFind,
    checkDoublyLinkedListItems,
    checkDoublyLinkedListIterator,
} from './../../../src/utils/testing/data_structures/linked_list/doubly_linked_list_class_test_utils.js';

import DoublyLinkedListClass from './../../../src/data_structures/linked_list/doubly_linked_list_class.js';

// implementation
test('DoublyLinkedListClass tests...', async (t) => {
    await t.test('Instance creation tests...', async (t) => {
        await t.test('Should create an empty doubly linked list', () => {
            const doublyLinkedListObj = new DoublyLinkedListClass();
            checkDoublyLinkedListEmpty(doublyLinkedListObj);
        });

        await t.test('Should create non-empty doubly linked list', () => {
            const doublyLinkedListObj = new DoublyLinkedListClass();

            doublyLinkedListObj.push(5);
            doublyLinkedListObj.push(7);
            doublyLinkedListObj.push(-1);
            doublyLinkedListObj.push(10);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 4, 5, 10);
        });
    });

    await t.test('push() method tests...', async (t) => {
        await t.test('Should push an element to doubly linked list', () => {
            const doublyLinkedListObj = new DoublyLinkedListClass();
            const newNode = doublyLinkedListObj.push(5);

            checkDoublyLinkedListElement(newNode.element, 5);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 1, 5, 5);
            checkDoublyLinkedListItems(doublyLinkedListObj, [5]);
        });

        await t.test('Should push multiple elements to doubly linked list', () => {
            const doublyLinkedListObj = new DoublyLinkedListClass();

            let newNode = doublyLinkedListObj.push(5);
            checkDoublyLinkedListElement(newNode.element, 5);

            newNode = doublyLinkedListObj.push(7);
            checkDoublyLinkedListElement(newNode.element, 7);

            newNode = doublyLinkedListObj.push(-1);
            checkDoublyLinkedListElement(newNode.element, -1);

            newNode = doublyLinkedListObj.push(10);
            checkDoublyLinkedListElement(newNode.element, 10);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 4, 5, 10);
            checkDoublyLinkedListItems(doublyLinkedListObj, [5, 7, -1, 10]);
        });
    });

    await t.test('insertBeforeHead() method tests...', async (t) => {
        await t.test('Should correctly insert element into doubly linked list before "head" - case 1', () => {
            const doublyLinkedListObj = new DoublyLinkedListClass();

            let newNode = doublyLinkedListObj.insertBeforeHead(5);
            checkDoublyLinkedListElement(newNode.element, 5);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 1, 5, 5);
            checkDoublyLinkedListItems(doublyLinkedListObj, [5]);

            newNode = doublyLinkedListObj.insertBeforeHead(-1);
            checkDoublyLinkedListElement(newNode.element, -1);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 2, -1, 5);
            checkDoublyLinkedListItems(doublyLinkedListObj, [-1, 5]);
        });

        await t.test('Should correctly insert element into doubly linked list before "head" - case 2', () => {
            const doublyLinkedListObj = new DoublyLinkedListClass();

            doublyLinkedListObj.push(5);
            doublyLinkedListObj.push(7);
            doublyLinkedListObj.push(-1);
            doublyLinkedListObj.push(10);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 4, 5, 10);
            checkDoublyLinkedListItems(doublyLinkedListObj, [5, 7, -1, 10]);

            let newNode = doublyLinkedListObj.insertBeforeHead(51);
            checkDoublyLinkedListElement(newNode.element, 51);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 5, 51, 10);
            checkDoublyLinkedListItems(doublyLinkedListObj, [51, 5, 7, -1, 10]);
        });
    });

    await t.test('insertAfterNode() method tests...', async (t) => {
        await t.test('Should correctly insert element into doubly linked list after specific node - case 1', () => {
            const doublyLinkedListObj = new DoublyLinkedListClass();

            doublyLinkedListObj.push(5);
            let previousNode = doublyLinkedListObj.push(7);
            doublyLinkedListObj.push(-1);
            doublyLinkedListObj.push(10);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 4, 5, 10);
            checkDoublyLinkedListItems(doublyLinkedListObj, [5, 7, -1, 10]);

            let newNode = doublyLinkedListObj.insertAfterNode(previousNode, 72);
            checkDoublyLinkedListElement(newNode.element, 72);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 5, 5, 10);
            checkDoublyLinkedListItems(doublyLinkedListObj, [5, 7, 72, -1, 10]);
        });

        await t.test('Should correctly insert element into doubly linked list after specific node - case 2', () => {
            const doublyLinkedListObj = new DoublyLinkedListClass();

            doublyLinkedListObj.push(5);
            let previousNode = doublyLinkedListObj.push(7);
            doublyLinkedListObj.push(-1);
            doublyLinkedListObj.push(10);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 4, 5, 10);
            checkDoublyLinkedListItems(doublyLinkedListObj, [5, 7, -1, 10]);

            let newNode = doublyLinkedListObj.insertAfterNode(previousNode, 72);
            checkDoublyLinkedListElement(newNode.element, 72);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 5, 5, 10);
            checkDoublyLinkedListItems(doublyLinkedListObj, [5, 7, 72, -1, 10]);

            newNode = doublyLinkedListObj.insertAfterNode(newNode, 8);
            checkDoublyLinkedListElement(newNode.element, 8);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 6, 5, 10);
            checkDoublyLinkedListItems(doublyLinkedListObj, [5, 7, 72, 8, -1, 10]);
        });
    });

    await t.test('insert() method tests...', async (t) => {
        await t.test('Should correctly insert element into doubly linked list - case 1', () => {
            const doublyLinkedListObj = new DoublyLinkedListClass();

            doublyLinkedListObj.push(5);
            doublyLinkedListObj.push(7);
            doublyLinkedListObj.push(-1);
            doublyLinkedListObj.push(10);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 4, 5, 10);
            checkDoublyLinkedListItems(doublyLinkedListObj, [5, 7, -1, 10]);

            doublyLinkedListObj.insert(55, 1);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 5, 5, 10);
            checkDoublyLinkedListItems(doublyLinkedListObj, [5, 55, 7, -1, 10]);
        });

        await t.test('Should correctly insert element into doubly linked list - case 2', () => {
            const doublyLinkedListObj = new DoublyLinkedListClass();

            doublyLinkedListObj.push(74);
            doublyLinkedListObj.push(1);
            doublyLinkedListObj.push(-65);
            doublyLinkedListObj.push(-2);
            doublyLinkedListObj.push(88);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 5, 74, 88);
            checkDoublyLinkedListItems(doublyLinkedListObj, [74, 1, -65, -2, 88]);

            doublyLinkedListObj.insert(32, 3);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 6, 74, 88);
            checkDoublyLinkedListItems(doublyLinkedListObj, [74, 1, -65, 32, -2, 88]);
        });

        await t.test('Should correctly insert element into doubly linked list - case 3', () => {
            const doublyLinkedListObj = new DoublyLinkedListClass();

            doublyLinkedListObj.push(5);
            doublyLinkedListObj.push(7);
            doublyLinkedListObj.push(-1);
            doublyLinkedListObj.push(10);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 4, 5, 10);
            checkDoublyLinkedListItems(doublyLinkedListObj, [5, 7, -1, 10]);

            doublyLinkedListObj.insert(55, 0);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 5, 55, 10);
            checkDoublyLinkedListItems(doublyLinkedListObj, [55, 5, 7, -1, 10]);
        });

        await t.test('Should correctly insert element into doubly linked list - case 4', () => {
            const doublyLinkedListObj = new DoublyLinkedListClass();

            doublyLinkedListObj.push(74);
            doublyLinkedListObj.push(1);
            doublyLinkedListObj.push(-65);
            doublyLinkedListObj.push(-2);
            doublyLinkedListObj.push(88);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 5, 74, 88);
            checkDoublyLinkedListItems(doublyLinkedListObj, [74, 1, -65, -2, 88]);

            doublyLinkedListObj.insert(32, 5);

            checkDoublyLinkedListNotEmpty(doublyLinkedListObj, 6, 74, 32);
            checkDoublyLinkedListItems(doublyLinkedListObj, [74, 1, -65, -2, 88, 32]);
        });
    });




});

// exports