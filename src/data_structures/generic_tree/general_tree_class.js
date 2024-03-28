'use strict';

// external imports

// internal imports
import { isNil } from './../../utils/misc/logic_utils.js';

import GeneralTreeNodeClass from './general_tree_node_class.js';
import DoublyLinkedListNode from './../linked_list/doubly_linked_list_node_class.js';

// implementation
class GeneralTreeClass {
    #root = null;
    #NodeClass;

    createNewRoot(data = null) {
        this.destroy();

        const linkedListNode = new DoublyLinkedListNode(null);
        this.#root = new this.#NodeClass(this, null, linkedListNode, null, data);

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

    constructor(NodeClass) {
        this.#NodeClass = isNil(NodeClass) ? GeneralTreeNodeClass : NodeClass;
    }
}

// exports
export default GeneralTreeClass;
