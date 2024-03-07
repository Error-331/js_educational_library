'use strict';

// external imports

// internal imports
import LinkedListNodeClass from './linked_list_node_class.js';

// implementation
class DoublyLinkedListNode extends LinkedListNodeClass {
    #prev = null;

    unlink() {
        super.unlink();
        this.#prev = null;
    }

    get prev() {
        return this.#prev;
    }
    set prev(node) {
        this.#prev = node;
    }
}

// exports
export default DoublyLinkedListNode;