'use strict';

// external imports

// internal imports
import { COMPARATOR_LESS_THAN } from './../../constants/comparator_constants.js';

import { isNil } from './../../utils/misc/logic_utils.js';
import { defaultCompare } from './../../utils/misc/comparator_utils.js';

import BinarySearchTreeNodeClass from './binary_search_tree_node_class.js';

// implementation
class BinarySearchTreeClass {
    #root = null;
    #comparator = defaultCompare;

    #insertNode(parent, key) {
        if (this.#comparator(key, parent.key) === COMPARATOR_LESS_THAN) {
            if (parent.left === null) {
                parent.left = new BinarySearchTreeNodeClass(key, parent);
            } else {
                this.#insertNode(parent.left, key);
            }
        } else {
            if (parent.right === null) {
                parent.right = new BinarySearchTreeNodeClass(key, parent);
            } else {
                this.#insertNode(parent.right, key);
            }
        }
    }

    insert(key) {
        if (this.#root === null) {
            this.#root = new BinarySearchTreeNodeClass(key);
        } else {
            this.#insertNode(this.#root, key);
        }
    }

    get root() {
        return this.#root;
    }

    get min() {
        return !isNil(this.#root) ? this.#root.min : null;
    }

    get max() {
        return !isNil(this.#root) ? this.#root.max : null;
    }

    constructor(comparator) {
        if (!isNil(comparator)) {
            this.#comparator = comparator;
        }
    }
}

// exports
export default BinarySearchTreeClass;
