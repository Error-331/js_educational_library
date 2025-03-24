// external imports

// internal imports
import { ComparatorType } from '../../../src/declarations/utility_declarations';
import { COMPARATOR_EQUAL, COMPARATOR_NONE_EQUAL } from '../../../src/constants/comparator_constants';

import {
    checkLinkedListEmpty,
    checkLinkedListNotEmpty,
    checkLinkedListData,
    checkLinkedListItemAt,
    checkLinkedListIndexOf,
    checkLinkedListFind,
    checkLinkedListItems,
    checkLinkedListIterator,
} from '../../../src/utils/testing/data_structures/linked_list/linked_list_class_test_utils';
import { checkLinkedListNodeDestroyed } from '../../../src/utils/testing/data_structures/linked_list/linked_list_node_class_test_utils';
import { defaultCompare } from '../../../src/utils/misc/comparator_utils';

import LinkedList from '../../../src/data_structures/linked_list/linked_list';

// implementation
type KeyValueNode = { key: number; value: number };

describe('Linked list class tests...', () => {
    describe('Instance creation tests...', () => {
        test('Should create an empty linked list', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);
            checkLinkedListEmpty<number>(linkedListObj);
        });

        test('Should create non-empty linked list', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
        });
    });

    describe('push() method tests...', () => {
        test('Should push an element to linked list', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);
            const newNode = linkedListObj.push(5);

            checkLinkedListData<number>(newNode.data, 5);

            checkLinkedListNotEmpty<number>(linkedListObj, 1, 5, 5);
            checkLinkedListItems<number>(linkedListObj, [5]);
        });

        test('Should push multiple elements to linked list', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            let newNode = linkedListObj.push(5);
            checkLinkedListData<number>(newNode.data, 5);

            newNode = linkedListObj.push(7);
            checkLinkedListData<number>(newNode.data, 7);

            newNode = linkedListObj.push(-1);
            checkLinkedListData<number>(newNode.data, -1);

            newNode = linkedListObj.push(10);
            checkLinkedListData<number>(newNode.data, 10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1, 10]);
        });
    });

    describe('insertBeforeHead() method tests...', () => {
        test('Should correctly insert element into linked list before "head" - case 1', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            let newNode = linkedListObj.insertBeforeHead(5);
            checkLinkedListData<number>(newNode.data, 5);

            checkLinkedListNotEmpty<number>(linkedListObj, 1, 5, 5);
            checkLinkedListItems<number>(linkedListObj, [5]);

            newNode = linkedListObj.insertBeforeHead(-1);
            checkLinkedListData<number>(newNode.data, -1);

            checkLinkedListNotEmpty<number>(linkedListObj, 2, -1, 5);
            checkLinkedListItems<number>(linkedListObj, [-1, 5]);
        });

        test('Should correctly insert element into linked list before "head" - case 2', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1, 10]);

            let newNode = linkedListObj.insertBeforeHead(51);
            checkLinkedListData<number>(newNode.data, 51);

            checkLinkedListNotEmpty<number>(linkedListObj, 5, 51, 10);
            checkLinkedListItems<number>(linkedListObj, [51, 5, 7, -1, 10]);
        });
    });

    describe('insertAfterNode() method tests...', () => {
        test('Should correctly insert element into linked list after specific node - case 1', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            let previousNode = linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1, 10]);

            let newNode = linkedListObj.insertAfterNode(previousNode, 72);
            checkLinkedListData<number>(newNode.data, 72);

            checkLinkedListNotEmpty<number>(linkedListObj, 5, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, 72, -1, 10]);
        });

        test('Should correctly insert element into linked list after specific node - case 2', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            let previousNode = linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1, 10]);

            let newNode = linkedListObj.insertAfterNode(previousNode, 72);
            checkLinkedListData<number>(newNode.data, 72);

            checkLinkedListNotEmpty<number>(linkedListObj, 5, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, 72, -1, 10]);

            newNode = linkedListObj.insertAfterNode(newNode, 8);
            checkLinkedListData<number>(newNode.data, 8);

            checkLinkedListNotEmpty<number>(linkedListObj, 6, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, 72, 8, -1, 10]);
        });
    });

    describe('insert() method tests...', () => {
        test('Should correctly insert element into linked list - case 1', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1, 10]);

            linkedListObj.insert(55, 1);

            checkLinkedListNotEmpty<number>(linkedListObj, 5, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 55, 7, -1, 10]);
        });

        test('Should correctly insert element into linked list - case 2', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(74);
            linkedListObj.push(1);
            linkedListObj.push(-65);
            linkedListObj.push(-2);
            linkedListObj.push(88);

            checkLinkedListNotEmpty<number>(linkedListObj, 5, 74, 88);
            checkLinkedListItems<number>(linkedListObj, [74, 1, -65, -2, 88]);

            linkedListObj.insert(32, 3);

            checkLinkedListNotEmpty<number>(linkedListObj, 6, 74, 88);
            checkLinkedListItems<number>(linkedListObj, [74, 1, -65, 32, -2, 88]);
        });

        test('Should correctly insert element into linked list - case 3', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1, 10]);

            linkedListObj.insert(55, 0);

            checkLinkedListNotEmpty<number>(linkedListObj, 5, 55, 10);
            checkLinkedListItems<number>(linkedListObj, [55, 5, 7, -1, 10]);
        });

        test('Should correctly insert element into linked list - case 4', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(74);
            linkedListObj.push(1);
            linkedListObj.push(-65);
            linkedListObj.push(-2);
            linkedListObj.push(88);

            checkLinkedListNotEmpty<number>(linkedListObj, 5, 74, 88);
            checkLinkedListItems<number>(linkedListObj, [74, 1, -65, -2, 88]);

            linkedListObj.insert(32, 5);

            checkLinkedListNotEmpty<number>(linkedListObj, 6, 74, 32);
            checkLinkedListItems<number>(linkedListObj, [74, 1, -65, -2, 88, 32]);
        });
    });

    describe('getNodeAt() method tests...', () => {
        test('Should correctly extract node from the linked list by its index - case 1', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);

            checkLinkedListItemAt<number>(linkedListObj, 0, 5);
            checkLinkedListItemAt<number>(linkedListObj, 1, 7);
            checkLinkedListItemAt<number>(linkedListObj, 2, -1);
            checkLinkedListItemAt<number>(linkedListObj, 3, 10);
        });

        test('Should correctly extract node from the linked list by its index - case 2', () => {
            const linkedListObj = new LinkedList<KeyValueNode>(defaultCompare);

            linkedListObj.push({key: 5, value: 65});
            linkedListObj.push({key: 7, value: -5});
            linkedListObj.push({key: -1, value: 65});
            linkedListObj.push({key: 10, value: -12});

            checkLinkedListNotEmpty<KeyValueNode>(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListItemAt<KeyValueNode>(linkedListObj, 0, {key: 5, value: 65});
            checkLinkedListItemAt<KeyValueNode>(linkedListObj, 1, {key: 7, value: -5});
            checkLinkedListItemAt<KeyValueNode>(linkedListObj, 2, {key: -1, value: 65});
            checkLinkedListItemAt<KeyValueNode>(linkedListObj, 3, {key: 10, value: -12});
        });
    });

    describe('find() method tests...', () => {
        test('Should correctly find node in the linked list by node value - case 1', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);

            checkLinkedListFind<number>(linkedListObj, 0, 5, 5);
            checkLinkedListFind<number>(linkedListObj, 1, 7, 7);
            checkLinkedListFind<number>(linkedListObj, 2, -1, -1);
            checkLinkedListFind<number>(linkedListObj, 3, 10, 10);
        });

        test('Should correctly find node in the linked list by node value - case 2', () => {
            const comparator: ComparatorType<KeyValueNode> = (first: KeyValueNode, second: KeyValueNode): number => first.value === second.value ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL;

            const linkedListObj = new LinkedList<KeyValueNode>(comparator);

            linkedListObj.push({key: 5, value: 65});
            linkedListObj.push({key: 7, value: -5});
            linkedListObj.push({key: -1, value: 65});
            linkedListObj.push({key: 10, value: -12});

            checkLinkedListNotEmpty<KeyValueNode>(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListFind<KeyValueNode>(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
            checkLinkedListFind<KeyValueNode>(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListFind<KeyValueNode>(linkedListObj, 0, {key: -1, value: 65}, {key: 5, value: 65});
            checkLinkedListFind<KeyValueNode>(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});
        });

        test('Should correctly find node in the linked list by node value - case 3', () => {
            const comparator: ComparatorType<KeyValueNode> = (first: KeyValueNode, second: KeyValueNode) => first.key === second.key ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL;

            const linkedListObj = new LinkedList<KeyValueNode>(comparator);

            linkedListObj.push({key: 5, value: 65});
            linkedListObj.push({key: 7, value: -5});
            linkedListObj.push({key: -1, value: 65});
            linkedListObj.push({key: 10, value: -12});

            checkLinkedListNotEmpty<KeyValueNode>(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListFind<KeyValueNode>(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
            checkLinkedListFind<KeyValueNode>(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListFind<KeyValueNode>(linkedListObj, 2, {key: -1, value: 65}, {key: -1, value: 65});
            checkLinkedListFind<KeyValueNode>(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});
        });
    });

    describe('indexOf() method tests...', () => {
        test('Should correctly find nodes index in the linked list by node value - case 1', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);

            checkLinkedListIndexOf<number>(linkedListObj, 0, 5, 5);
            checkLinkedListIndexOf<number>(linkedListObj, 1, 7, 7);
            checkLinkedListIndexOf<number>(linkedListObj, 2, -1, -1);
            checkLinkedListIndexOf<number>(linkedListObj, 3, 10, 10);
        });

        test('Should correctly find nodes index in the linked list by node value - case 2', () => {
            const comparator: ComparatorType<KeyValueNode> = (first: KeyValueNode, second: KeyValueNode) => first.value === second.value ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL;

            const linkedListObj = new LinkedList<KeyValueNode>(comparator);

            linkedListObj.push({key: 5, value: 65});
            linkedListObj.push({key: 7, value: -5});
            linkedListObj.push({key: -1, value: 65});
            linkedListObj.push({key: 10, value: -12});

            checkLinkedListNotEmpty<KeyValueNode>(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 0, {key: -1, value: 65}, {key: 5, value: 65});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});
        });

        test('Should correctly find nodes index in the linked list by node value - case 3', () => {
            const comparator: ComparatorType<KeyValueNode> = (first: KeyValueNode, second: KeyValueNode) => first.key === second.key ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL;

            const linkedListObj = new LinkedList<KeyValueNode>(comparator);

            linkedListObj.push({key: 5, value: 65});
            linkedListObj.push({key: 7, value: -5});
            linkedListObj.push({key: -1, value: 65});
            linkedListObj.push({key: 10, value: -12});

            checkLinkedListNotEmpty<KeyValueNode>(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 2, {key: -1, value: 65}, {key: -1, value: 65});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});
        });
    });

    describe('removeHeadNode() method tests...', () => {
        test('Should correctly remove head node from the linked list - case 1', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1, 10]);

            const removedElement = linkedListObj.removeHeadNode();
            checkLinkedListData<number>(5, removedElement);

            checkLinkedListNotEmpty<number>(linkedListObj, 3, 7, 10);
            checkLinkedListItems<number>(linkedListObj, [7, -1, 10]);
        });

        test('Should correctly remove head node from the linked list - case 2', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1, 10]);

            let removedElement = linkedListObj.removeHeadNode();
            checkLinkedListData<number>(5, removedElement);

            checkLinkedListNotEmpty<number>(linkedListObj, 3, 7, 10);
            checkLinkedListItems<number>(linkedListObj, [7, -1, 10]);

            removedElement = linkedListObj.removeHeadNode();
            checkLinkedListData<number>(7, removedElement);

            checkLinkedListNotEmpty<number>(linkedListObj, 2, -1, 10);
            checkLinkedListItems<number>(linkedListObj, [-1, 10]);

            removedElement = linkedListObj.removeHeadNode();
            checkLinkedListData<number>(-1, removedElement);

            checkLinkedListNotEmpty<number>(linkedListObj, 1, 10, 10);
            checkLinkedListItems<number>(linkedListObj, [10]);

            removedElement = linkedListObj.removeHeadNode();
            checkLinkedListData<number>(10, removedElement);

            checkLinkedListEmpty<number>(linkedListObj);
        });
    });

    describe('removeNextNode() method tests...', () => {
        test('Should correctly remove a node after specific one in the linked list - case 1', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            const previousNode = linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1, 10]);

            const removedElement = linkedListObj.removeNextNode(previousNode);
            checkLinkedListData<number>(-1, removedElement);

            checkLinkedListNotEmpty<number>(linkedListObj, 3, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, 10]);
        });

        test('Should correctly remove a node after specific one in the linked list - case 2', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            const previousNode = linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1, 10]);

            let removedElement = linkedListObj.removeNextNode(previousNode);
            checkLinkedListData<number>(7, removedElement);

            checkLinkedListNotEmpty<number>(linkedListObj, 3, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, -1, 10]);

            removedElement = linkedListObj.removeNextNode(previousNode);
            checkLinkedListData<number>(-1, removedElement);

            checkLinkedListNotEmpty<number>(linkedListObj, 2, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 10]);

            removedElement = linkedListObj.removeNextNode(previousNode);
            checkLinkedListData<number>(10, removedElement);

            checkLinkedListNotEmpty<number>(linkedListObj, 1, 5, 5);
            checkLinkedListItems<number>(linkedListObj, [5]);
        });
    });

    describe('removeAt() method tests...', () => {
        test('Should correctly remove a node at specific index in the linked list - case 1', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1, 10]);

            const removedElement = linkedListObj.removeAt(2);
            checkLinkedListData<number>(-1, removedElement);

            checkLinkedListNotEmpty<number>(linkedListObj, 3, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, 10]);
        });

        test('Should correctly remove a node at specific index in the linked list - case 2', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1, 10]);

            const removedElement = linkedListObj.removeAt(0);
            checkLinkedListData<number>(5, removedElement);

            checkLinkedListNotEmpty<number>(linkedListObj, 3, 7, 10);
            checkLinkedListItems<number>(linkedListObj, [7, -1, 10]);
        });

        test('Should correctly remove a node at specific index in the linked list - case 3', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1, 10]);

            const removedElement = linkedListObj.removeAt(3);
            checkLinkedListData<number>(10, removedElement);

            checkLinkedListNotEmpty<number>(linkedListObj, 3, 5, -1);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1]);
        });
    });

    describe('remove() method tests...', () => {
        test('Should correctly remove a node with specific value in the linked list - case 1', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);

            checkLinkedListIndexOf<number>(linkedListObj, 0, 5, 5);
            checkLinkedListIndexOf<number>(linkedListObj, 1, 7, 7);
            checkLinkedListIndexOf<number>(linkedListObj, 2, -1, -1);
            checkLinkedListIndexOf<number>(linkedListObj, 3, 10, 10);

            const removedElement = linkedListObj.remove(-1);
            checkLinkedListData<number>(-1, removedElement);

            checkLinkedListNotEmpty<number>(linkedListObj, 3, 5, 10);

            checkLinkedListIndexOf<number>(linkedListObj, 0, 5, 5);
            checkLinkedListIndexOf<number>(linkedListObj, 1, 7, 7);
            checkLinkedListIndexOf<number>(linkedListObj, 2, 10, 10);
        });

        test('Should correctly remove a node with specific value in the linked list - case 2', () => {
            const comparator: ComparatorType<KeyValueNode> = (first: KeyValueNode, second: KeyValueNode): number => first.value === second.value ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL;

            const linkedListObj = new LinkedList<KeyValueNode>(comparator);

            linkedListObj.push({key: 5, value: 65});
            linkedListObj.push({key: 7, value: -5});
            linkedListObj.push({key: -1, value: 65});
            linkedListObj.push({key: 10, value: -12});

            checkLinkedListNotEmpty<KeyValueNode>(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 0, {key: -1, value: 65}, {key: 5, value: 65});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});

            const removedElement = linkedListObj.remove({key: -1, value: 65});
            checkLinkedListData<KeyValueNode>({key: 5, value: 65}, removedElement);

            checkLinkedListNotEmpty<KeyValueNode>(linkedListObj, 3, {key: 7, value: -5}, {key: 10, value: -12});

            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 0, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 1, {key: -1, value: 65}, {key: -1, value: 65});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 2, {key: 10, value: -12}, {key: 10, value: -12});
        });

        test('Should correctly remove a node with specific value in the linked list - case 3', () => {
            const comparator: ComparatorType<KeyValueNode> = (first: KeyValueNode, second: KeyValueNode): number => first.key === second.key ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL;

            const linkedListObj = new LinkedList<KeyValueNode>(comparator);

            linkedListObj.push({key: 5, value: 65});
            linkedListObj.push({key: 7, value: -5});
            linkedListObj.push({key: -1, value: 65});
            linkedListObj.push({key: 10, value: -12});

            checkLinkedListNotEmpty<KeyValueNode>(linkedListObj, 4, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 2, {key: -1, value: 65}, {key: -1, value: 65});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 3, {key: 10, value: -12}, {key: 10, value: -12});

            const removedElement = linkedListObj.remove({key: -1, value: 65});
            checkLinkedListData<KeyValueNode>({key: -1, value: 65}, removedElement);

            checkLinkedListNotEmpty<KeyValueNode>(linkedListObj, 3, {key: 5, value: 65}, {key: 10, value: -12});

            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 0, {key: 5, value: 65}, {key: 5, value: 65});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 1, {key: 7, value: -5}, {key: 7, value: -5});
            checkLinkedListIndexOf<KeyValueNode>(linkedListObj, 2, {key: 10, value: -12}, {key: 10, value: -12});
        });
    });

    describe('iterator tests...', () => {
        test('Should correctly iterate through the linked list - case 1', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);
            const linkedListValues = [5, 7, -1, 10];

            linkedListObj.push(linkedListValues[0]);
            linkedListObj.push(linkedListValues[1]);
            linkedListObj.push(linkedListValues[2]);
            linkedListObj.push(linkedListValues[3]);

            checkLinkedListIterator<number>(linkedListObj, linkedListValues);
        });

        test('Should correctly iterate through the linked list - case 2', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);
            const linkedListValues = [74, 1, -65, -2, 88];

            linkedListObj.push(linkedListValues[0]);
            linkedListObj.push(linkedListValues[1]);
            linkedListObj.push(linkedListValues[2]);
            linkedListObj.push(linkedListValues[3]);
            linkedListObj.push(linkedListValues[4]);

            checkLinkedListIterator<number>(linkedListObj, linkedListValues);
        });
    });

    describe('toString() method tests...', () => {
        test('Should correctly convert linked list to string - case 1', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1, 10]);

            expect(linkedListObj.toString()).toStrictEqual('5,7,-1,10');
        });
    });

    describe('toArray() method tests...',() => {
        test('Should correctly convert linked list to array - case 1', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);
            checkLinkedListItems<number>(linkedListObj, [5, 7, -1, 10]);

            expect(linkedListObj.toArray()).toStrictEqual([5, 7, -1, 10]);
        });

        test('Should correctly convert linked list to array - case 2', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(74);
            linkedListObj.push(1);
            linkedListObj.push(-65);
            linkedListObj.push(-2);
            linkedListObj.push(88);

            checkLinkedListNotEmpty<number>(linkedListObj, 5, 74, 88);
            checkLinkedListItems<number>(linkedListObj, [74, 1, -65, -2, 88]);

            expect(linkedListObj.toArray()).toStrictEqual([74, 1, -65, -2, 88]);
        });
    });

    describe('destroy() method tests...', () => {
        test('Should correctly destroy linked list and free all resources - case 1', () => {
            const linkedListObj = new LinkedList<number>(defaultCompare);

            linkedListObj.push(5);
            linkedListObj.push(7);
            linkedListObj.push(-1);
            linkedListObj.push(10);

            checkLinkedListNotEmpty<number>(linkedListObj, 4, 5, 10);

            const iteratedLinkedListNodes = [];

            for (const node of linkedListObj) {
                iteratedLinkedListNodes.push(node);
            }

            linkedListObj.destroy();
            checkLinkedListEmpty<number>(linkedListObj);

            for (const node of iteratedLinkedListNodes) {
                checkLinkedListNodeDestroyed<number>(node);
            }
        });
    });
});

// exports
