'use strict';

// external imports

// internal imports
import { isNil } from './../../utils/misc/logic_utils.js';
import { comparatorIsEqual } from './../../utils/misc/comparator_utils.js';

import LinkedListClass from './linked_list_class.js';
import DoublyLinkedListNode from './doubly_linked_list_node_class.js';

// implementation
class DoublyLinkedList extends LinkedListClass {
    #tail = null;

    push(element) {
        if (isNil(this.head)) {
            return this.insertBeforeHead(element);
        } else {
            return this.insertAfterNode(this.#tail, element);
        }
    }

    insertBeforeHead(element) {
        const node = new DoublyLinkedListNode(element);
        let currentHead = this.head;

        if (isNil(this.head)) {
            this.head = node;
            this.#tail = node;
        } else {
            node.next = this.head;
            currentHead.prev = node;

            this.head = node;
        }

        return node;
    }

    insertAfterNode(previousNode, element) {
        const node = new DoublyLinkedListNode(element);

        if (previousNode === this.#tail) {
            const currentHead = this.#tail;
            currentHead.next = node;

            node.prev = currentHead;
            this.#tail = node;
        } else {
            const currentHead = previousNode.next;

            node.next = currentHead;
            previousNode.next = node;

            currentHead.prev = node;
            node.prev = previousNode;
        }

        this.count = this.count + 1;
        return node;
    }

    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            if (index === 0) {
                return this.insertBeforeHead(element);
            } else if (index === this.count) {
                return this.insertAfterNode(this.#tail, element);
            } else {
               return this.insertAfterNode(this.getNodeAt(index - 1), element);
            }
        }

        return null;
    }

    removeHeadNode() {
        const currentHead = this.head;
        const currentElement = currentHead.element;

        this.head = currentHead.next;

        if (this.count === 1) {
            this.#tail = null;
        } else {
            this.head.prev = null;
        }

        currentHead.abandon();

        this.count = this.count - 1;
        return currentElement;
    }

    removeTailNode() {
        const currentTail = this.#tail;
        const currentElement = currentTail.element;

        this.#tail = currentTail.prev;
        this.#tail.next = null;

        currentTail.abandon();

        this.count = this.count - 1;
        return currentElement;
    }

    removeNextNode(previousNode) {
        const currentHead = previousNode.next;

        if (currentHead === this.#tail) {
            return this.removeTailNode();
        } else {
            const currentElement = currentHead.element;

            previousNode.next = currentHead.next;
            currentHead.next.prev = previousNode;

            currentHead.abandon();

            this.count = this.count - 1;
            return currentElement;
        }
    }

    removeAt(index) {
        if (index >= 0 && index < this.count) {
            if (index === 0) {
                return this.removeHeadNode();
            } else if (index === this.count - 1) {
                return this.removeTailNode();
            } else {
                return this.removeNextNode(this.getElementAt(index).prev);
            }
        }

        return null;
    }

    remove(element) {
        let previousNode = null;

        for (const node of this) {
            if (comparatorIsEqual(this.comparator(element, node.element))) {
                if (previousNode === null) {
                    return this.removeHeadNode();
                } else if (node === this.#tail) {
                    return this.removeTailNode();
                } else {
                    return this.removeNextNode(previousNode);
                }
            }

            previousNode = node;
        }

        return null;
    }

    destroy() {
        super.destroy();

        this.#tail?.destroy();
        this.#tail = null;
    }

    get lastChild() {
        return this.#tail;
    }

    get tail() {
        return this.#tail;
    }

    constructor(comparator) {
        super(comparator);
    }
}

// exports
export default DoublyLinkedList;