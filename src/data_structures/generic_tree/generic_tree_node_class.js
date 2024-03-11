'use strict';

// external imports

// internal imports
import { COMPARATOR_EQUAL, COMPARATOR_NONE_EQUAL } from './../../constants/comparator_constants.js';
import { isNil } from './../../utils/misc/logic_utils.js';

import DoublyLinkedList from './../linked_list/doubly_linked_list_class.js';
import GenericTreeNodeChildrenIteratorClass from './generic_tree_node_children_iterator_class.js';

// implementation
class GenericTreeNodeClass {
    #tree = null;
    #parent = null;

    #data = null;

    #childrenLinkedList = null;
    #linkedListNode = null;

    addChild(data) {
        if (isNil(this.#childrenLinkedList)) {
            throw new Error('Cannot add new child - children linked list have not been initialized');
        }

        const linkedListNode = this.#childrenLinkedList.push(null);
        const treeNode = new GenericTreeNodeClass(this.#tree, this, linkedListNode, this.#childrenLinkedList.comparator, data);

        linkedListNode.element = isNil(this.#tree.customNodeProxyClass) ? treeNode : new this.#tree.customNodeProxyClass(treeNode);
        return treeNode;
    }

    destroy() {
        this.#tree = null;
        this.#parent = null;
        this.#linkedListNode = null;

        this.#data?.destroy?.();
        this.#data = null;

        this.#childrenLinkedList.destroy();
        this.#childrenLinkedList = null;
    }

    findChild(data) {
        return this.#childrenLinkedList.find(data);
    }

    findChildBy(comparator, data) {
        const prevComparator = this.#childrenLinkedList.comparator;
        this.#childrenLinkedList.comparator = comparator;

        const requiredNode = this.#childrenLinkedList.find(data);
        this.#childrenLinkedList.comparator = prevComparator;

        return requiredNode;
    }

    findChildByData(data) {
        return this.findChildBy((data, treeNode) => data === treeNode.data ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL, data);
    }

    hasChild(data) {
        return !isNil(this.#childrenLinkedList.find(data));
    }

    getChildAt(index) {
        if (isNil(this.#childrenLinkedList)) {
            throw new Error('Cannot extract child at specified index - children linked list have not been initialized');
        }

        return this.#childrenLinkedList.getNodeAt(index)?.element ?? null;
    }

    get tree() {
        return this.#tree;
    }

    get parent() {
        return this.#parent;
    }

    get data() {
        return this.#data;
    }

    get children() {
        return new GenericTreeNodeChildrenIteratorClass(this.#childrenLinkedList);
    }

    get isLeaf() {
        if (isNil(this.#childrenLinkedList)) {
            throw new Error('Cannot determine whether node is leaf or not - children linked list have not been initialized');
        }

        return this.#childrenLinkedList.isEmpty;
    }

    get leftmostChild() {
        if (isNil(this.#childrenLinkedList)) {
            throw new Error('Cannot find nodes leftmost child - children linked list have not been initialized');
        }

        if (!this.isLeaf) {
            return this.#childrenLinkedList.head?.element ?? null;
        } else {
            return null;
        }
    }

    get rightmostChild() {
        if (isNil(this.#childrenLinkedList)) {
            throw new Error('Cannot find nodes rightmost child - children linked list have not been initialized');
        }

        if (!this.isLeaf) {
            return this.#childrenLinkedList.lastChild?.element ?? null;
        } else {
            return null;
        }
    }

    get firstChild() {
        return this.leftmostChild;
    }

    get nextSibling() {
        if (isNil(this.#linkedListNode)) {
            throw new Error('Cannot find nodes next sibling - linked list node have not been initialized');
        }

        return this.#linkedListNode.next?.element ?? null;
    }

    get previousSibling() {
        if (isNil(this.#linkedListNode)) {
            throw new Error('Cannot find nodes previous sibling - linked list node have not been initialized');
        }

        return this.#linkedListNode.prev?.element ?? null;
    }

    get hasChildren() {
        if (isNil(this.#childrenLinkedList)) {
            throw new Error('Cannot determine whether node has children or not - children linked list have not been initialized');
        }

        return !this.#childrenLinkedList.isEmpty;
    }

    get hasLeftSibling() {
        return !isNil(this.#linkedListNode?.prev?.element);
    }

    get hasRightSibling() {
        return !isNil(this.#linkedListNode?.next?.element);
    }

    set data(data) {
        this.#data = data;
    }

    constructor(tree, parent = null, linkedListNode, comparator = null, data = null) {
        if (tree === null || tree === undefined) {
            throw new Error('RegularGeneralTreeNodeClass: cannot create a node without specifying the tree object');
        }

        this.#tree = tree;
        this.#parent = parent;
        this.#linkedListNode = linkedListNode;

        this.#data = data;
        this.#childrenLinkedList = new DoublyLinkedList(comparator);
    }
}

// exports
export default GenericTreeNodeClass;
