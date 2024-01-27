'use strict';

// external imports

// internal imports
import { isNil, isFunction } from './../../../utils/misc/logic_utils.js';
import BinarySearchTreeIteratorBaseClass from './binary_search_tree_iterator_base_class.js';

// implementation
class BinarySearchTreeInOrderIteratorClass extends BinarySearchTreeIteratorBaseClass{
    #currentNode = null;
    #traverseStack = [];

    static traverseNode(node, callback) {
        if (!isNil(node)) {
            BinarySearchTreeInOrderIteratorClass.traverseNode(node.left, callback);

            if (isFunction(callback)) {
                callback(node);
            }

            BinarySearchTreeInOrderIteratorClass.traverseNode(node.right, callback);
        }
    }

    static traverse(binarySearchTree, callback) {
        BinarySearchTreeInOrderIteratorClass.traverseNode(binarySearchTree?.root, callback);
    }

    #diveLeft(node) {
        this.#traverseStack.push(node);

        let nextNode = node.left;
        while (!isNil(nextNode)) {
            this.#traverseStack.push(nextNode);
            nextNode = nextNode.left;
        }
    }

    reset() {
        this.#traverseStack = [];
        this.#diveLeft(this.rootNode);
    }

    hasNext() {
        if (isNil(this.#currentNode)) {
            return true;
        } else {
            return !isNil(this.#currentNode.right) || this.#traverseStack.length > 0;
        }
    }

    next() {
        if (isNil(this.#currentNode) || isNil(this.#currentNode.right)) {
            this.#currentNode = this.#traverseStack.pop();
        } else {
            this.#diveLeft(this.#currentNode.right);
            this.#currentNode = this.#traverseStack.pop();
        }

        return this.#currentNode;
    }

    constructor(rootNode) {
        super(rootNode);
        this.reset();
    }
}

// exports
export default BinarySearchTreeInOrderIteratorClass;
