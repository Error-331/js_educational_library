'use strict';

// external imports

// internal imports
import { isNil, isFunction } from './../../../utils/misc/logic_utils.js';
import BinarySearchTreeIteratorBaseClass from './binary_search_tree_iterator_base_class.js';

// implementation
class BinarySearchTreePostOrderIteratorClass extends BinarySearchTreeIteratorBaseClass {
    #currentNode = null;
    #traverseStack = [];

    static traverseNode(node, callback) {
        if (!isNil(node)) {
            BinarySearchTreePostOrderIteratorClass.traverseNode(node.left, callback);
            BinarySearchTreePostOrderIteratorClass.traverseNode(node.right, callback);

            if (isFunction(callback)) {
                callback(node);
            }
        }
    }

    static traverse(binarySearchTree, callback) {
        BinarySearchTreePostOrderIteratorClass.traverseNode(binarySearchTree?.root, callback);
    }

    #diveLeft(node) {
        if (isNil(node)) {
            return;
        }

        this.#traverseStack.push(node);

        let nextLeftNode = node.left;
        let nextRightNode = node.right
        let nextNode = null;

        while (!isNil(nextLeftNode) || !isNil(nextRightNode)) {
            if (!isNil(nextLeftNode)) {
                nextNode = nextLeftNode;
            } else if (!isNil(nextRightNode)) {
                nextNode = nextRightNode;
            }

            this.#traverseStack.push(nextNode);

            nextLeftNode = nextNode.left;
            nextRightNode = nextNode.right
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
            return !isNil(this.#currentNode.parent);
        }
    }

    next() {
        if (isNil(this.#currentNode)) {
            this.#currentNode = this.#traverseStack.pop();
        } else {
            const parentNode = this.#currentNode.parent;

            if (parentNode?.left === this.#currentNode) {
                this.#diveLeft(parentNode?.right);
                this.#currentNode = this.#traverseStack.pop();
            } else {
                this.#currentNode = this.#traverseStack.pop();
            }
        }

        return this.#currentNode;
    }

    constructor(rootNode) {
        super(rootNode);
        this.reset();
    }
}

// exports
export default BinarySearchTreePostOrderIteratorClass;
