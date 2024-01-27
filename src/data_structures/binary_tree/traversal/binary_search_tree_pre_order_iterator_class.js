'use strict';

// external imports

// internal imports
import { isNil, isFunction } from './../../../utils/misc/logic_utils.js';
import BinarySearchTreeIteratorBaseClass from './binary_search_tree_iterator_base_class.js';

// implementation
class BinarySearchTreePreOrderIteratorClass extends BinarySearchTreeIteratorBaseClass {
    #currentNode = null;
    #nextNode = null;

    static traverseNode(node, callback) {
        if (!isNil(node)) {
            if (isFunction(callback)) {
                callback(node);
            }

            BinarySearchTreePreOrderIteratorClass.traverseNode(node.left, callback);
            BinarySearchTreePreOrderIteratorClass.traverseNode(node.right, callback);
        }
    }

    static traverse(binarySearchTree, callback) {
        BinarySearchTreePreOrderIteratorClass.traverseNode(binarySearchTree?.root, callback);
    }

    #findNextNode() {
        if (isNil(this.#currentNode)) {
            this.#nextNode = this.rootNode;
        } else if (!isNil(this.#currentNode.left)) {
            this.#nextNode = this.#currentNode.left;
        } else if (!isNil(this.#currentNode.right)) {
            this.#nextNode = this.#currentNode.right;
        } else {
            if (this.#currentNode.parent.left === this.#currentNode) {
                this.#nextNode = this.#currentNode;

                const c = () => {
                    return !isNil(this.#nextNode.parent) && isNil(this.#nextNode.parent.right);
                };

                const d = () => {
                    return !isNil(this.#nextNode.parent) && this.#nextNode.parent.right === this.#nextNode;
                };

                let m = c;

                while(m()) {
                    this.#nextNode = this.#nextNode.parent;

                    if (!isNil(this.#nextNode.parent) && this.#nextNode === this.#nextNode.parent.right) {
                        m = d;
                    } else {
                        m = c;
                    }
                }

                if (m === c) {
                    this.#nextNode = this.#nextNode?.parent?.right;
                } else {
                    this.#nextNode = this.#nextNode === this.rootNode ? null : this.#nextNode?.parent?.right;
                }
            } else {
                this.#nextNode = this.#currentNode;

                while(!isNil(this.#nextNode.parent) && this.#nextNode.parent.right === this.#nextNode) {
                    this.#nextNode = this.#nextNode.parent;
                }

                this.#nextNode = this.#nextNode === this.rootNode ? null : this.#nextNode?.parent?.right;
            }
        }
    }

    reset() {
        this.#nextNode = null;
        this.#findNextNode();
    }

    hasNext() {
        return !isNil(this.#nextNode);
    }

    next() {
        this.#currentNode = this.#nextNode;
        this.#findNextNode();

        return this.#currentNode;
    }

    constructor(rootNode) {
        super(rootNode);
        this.reset();
    }
}

// exports
export default BinarySearchTreePreOrderIteratorClass;
