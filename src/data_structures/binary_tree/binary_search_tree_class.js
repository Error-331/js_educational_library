'use strict';

// external imports

// internal imports
import { COMPARATOR_LESS_THAN, COMPARATOR_GREATER_THAN } from './../../constants/comparator_constants.js';

import { isNil } from './../../utils/misc/logic_utils.js';
import { defaultCompare } from './../../utils/misc/comparator_utils.js';
import { setPropValueByPath } from './../../utils/primitives/object_utils.js';

import BinarySearchTreeNodeClass from './binary_search_tree_node_class.js';

// implementation
class BinarySearchTreeClass {
    #root = null;
    #comparator = defaultCompare;

    static rotateLeft(node) {
        const tempNode = node.left;
        const tmpKey = node.key;

        node.left = node.right;
        node.key = node.right.key;

        node.right = node.left.right;
        setPropValueByPath(node, ['left', 'right', 'parent'], node);

        setPropValueByPath(node, ['left', 'right'], node.left.left);
        node.left.left = tempNode;

        setPropValueByPath(node, ['left', 'left', 'parent'], node.left);
        setPropValueByPath(node, ['left', 'key'], tmpKey);

        return node;
    }

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

    #searchNode(node, key) {
        if (isNil(node)) {
            return null;
        }

        if (this.#comparator(key, node.key) === COMPARATOR_LESS_THAN) {
            return this.#searchNode(node.left, key);
        } else if (this.#comparator(key, node.key) === COMPARATOR_GREATER_THAN) {
            return this.#searchNode(node.right, key);
        } else {
            return node;
        }
    }

    #removeNode(node, key) {
        if (isNil(node)) {
            return null;
        }

        if (this.#comparator(key, node.key) === COMPARATOR_LESS_THAN) {
            node.left = this.#removeNode(node.left, key)
            return node;
        } else if (this.#comparator(key, node.key) === COMPARATOR_GREATER_THAN) {
            node.right = this.#removeNode(node.right, key);
            return node;
        } else {
            if (isNil(node.left) && isNil(node.right)) {
                node.destroy();
                return null;
            }

            if (isNil(node.left)) {
                const currentNode = node.right;

                currentNode.parent = node.parent;
                node.clean();

                return currentNode;
            } else if (isNil(node.right)) {
                const currentNode = node.left;

                currentNode.parent = node.parent;
                node.clean();

                return currentNode;
            }

            const tempNode = node.right.min;

            node.key = tempNode.key;
            node.right = this.#removeNode(node.right, tempNode.key);

            return node;
        }
    }

    insert(key) {
        if (this.#root === null) {
            this.#root = new BinarySearchTreeNodeClass(key);
        } else {
            this.#insertNode(this.#root, key);
        }
    }

    search(key) {
        return this.#searchNode(this.#root, key)
    }

    remove(key) {
        this.#root = this.#removeNode(this.#root, key);
    }

    get comparator() {
        return this.#comparator;
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

    set root(node) {
        this.#root = node;
    }

    constructor(comparator) {
        if (!isNil(comparator)) {
            this.#comparator = comparator;
        }
    }
}

// exports
export default BinarySearchTreeClass;
