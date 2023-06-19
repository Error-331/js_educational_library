'use strict';

// external imports

// internal imports
import { isNil } from './../../utils/misc/logic_utils.js';

// implementation
class BinarySearchTreeNodeClass {
    #key = null;
    #parent = null;

    #left = null;
    #right = null;

    #findNodeBySide(node, side) {
        let currentNode = node;

        while (!isNil(currentNode) && !isNil(currentNode[side])) {
            currentNode = currentNode[side];
        }

        return currentNode;
    }

    get key() {
        return this.#key;
    }

    get parent() {
        return this.#parent;
    }

    get left() {
        return this.#left;
    }

    get right() {
        return this.#right;
    }

    get min() {
        return this.#findNodeBySide(this, 'left');
    }

    get max() {
        return this.#findNodeBySide(this, 'right');
    }

    set left(left) {
        this.#left = left;
    }

    set right(right) {
        this.#right = right;
    }

    constructor(key, parent = null) {
        this.#key = key;
        this.#parent = parent;
    }
}

// exports
export default BinarySearchTreeNodeClass;
