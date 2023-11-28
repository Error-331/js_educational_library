'use strict';

// external imports

// internal imports
import { COMPARATOR_EQUAL, COMPARATOR_NONE_EQUAL } from './../../constants/comparator_constants.js';

import LinkedListClass from './../linked_list/linked_list_class.js';
import GenericTreeNodeChildrenIteratorClass from './generic_tree_node_children_iterator_class.js';

// implementation
class GenericTreeNodeClass {
    #tree = null;
    #parent = null;

    #data = null;
    #childrenLinkedList = null;

    addChild(data) {
        const newNode = new GenericTreeNodeClass(this.#tree, this, this.#childrenLinkedList.comparator, data);
        this.#childrenLinkedList.push(newNode);

        return newNode;
    }

    destroy() {
        this.#tree = null;
        this.#parent = null;

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

    getChildAt(index) {
        return this.#childrenLinkedList.getNodeAt(index)?.element;
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
        return this.#childrenLinkedList?.isEmpty ?? true;
    }

    get leftmostChild() {
        if (!this.isLeaf) {
            return this.#childrenLinkedList?.head?.element;
        } else {
            return null;
        }
    }

    get rightmostChild() {
        if (!this.isLeaf) {
            return this.#childrenLinkedList?.lastChild?.element;
        } else {
            return null;
        }
    }

    /*get firstChild() {

    }

    get nextSibling() {

    }

    get previousSibling() {

    }*/

    set data(data) {
        this.#data = data;
    }

    constructor(tree, parent = null, comparator = null, data = null) {
        if (tree === null || tree === undefined) {
            throw new Error('RegularGeneralTreeNodeClass: cannot create a node without specifying the tree object');
        }

        this.#tree = tree;
        this.#parent = parent;

        this.#data = data;
        this.#childrenLinkedList = new LinkedListClass(comparator);
    }
}

// exports
export default GenericTreeNodeClass;
