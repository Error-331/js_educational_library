'use strict';

// external imports

// internal imports
import { isNil } from './../../utils/misc/logic_utils.js';
import { defaultCompare } from './../../utils/misc/comparator_utils.js';

import GenericTreeNodeClass from './generic_tree_node_class.js';
import DoublyLinkedListNode from './../linked_list/doubly_linked_list_node_class';

// implementation
class GenericTreeClass {
    #root = null;

    #comparator = defaultCompare;

    #customNodeProxyClass = null;

    createNewRoot(data = null) {
        this.destroy();

        const linkedListNode = new DoublyLinkedListNode(null);
        const rootChild = new GenericTreeNodeClass(this, null, linkedListNode, this.#comparator, data);
        const CustomNodeProxyClass = this.#customNodeProxyClass;

        this.#root = isNil(CustomNodeProxyClass) ? rootChild : new CustomNodeProxyClass(rootChild);
        linkedListNode.element = this.#root;

        return this.#root;
    }

    destroy() {
        if (!isNil(this.#root)) {
            this.#root.destroy();
        }
    }

    get root() {
        return this.#root;
    }

    get comparator() {
        return this.#comparator;
    }

    get customNodeProxyClass() {
        return this.#customNodeProxyClass;
    }

    constructor(comparator = null, config = {}) {
        if (!isNil(comparator)) {
            this.#comparator = comparator;
        }

        if (!isNil(config.customNodeProxyClass)) {
            this.#customNodeProxyClass = config.customNodeProxyClass;
        }
    }
}

// exports
export default GenericTreeClass;
