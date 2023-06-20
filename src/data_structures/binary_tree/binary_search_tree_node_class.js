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

    detach() {
        this.#parent = null;
        this.#left = null;
        this.#right = null;
    }

    clean() {
        this.#key = null;
        this.detach();
    }

    destroy() {
        this.#left?.destroy();
        this.#right?.destroy();

        this.clean();
    }

    toString() {
        return `Key: ${this.#key}, parent: ${this.#parent?.key}, left: ${this.#left?.key}, right: ${this.#right?.key}`
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

    set key(key) {
        this.#key = key;
    }

    set parent(parent) {
        this.#parent = parent;
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
