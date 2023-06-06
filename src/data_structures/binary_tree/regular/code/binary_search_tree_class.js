'use strict';

const BinarySearchTreeNodeClass = require('./binary_search_tree_node_class');

class BinarySearchTreeClass {
    #root = null;
    #comparator = (first, second) => first === second;

    #insertNode(parent, key) {
        if (this.#comparator(key, parent.key)) {
            if (parent.left === null) {
                parent.left = new BinarySearchTreeNodeClass(key);
            } else {
                this.#insertNode(parent.left, key);
            }
        } else {
            if (parent.right === null) {
                parent.right = new BinarySearchTreeNodeClass(key);
            } else {
                this.#insertNode(parent.right, key);
            }
        }
    }

    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // {4}
            if (node.left == null) { // {5}
                node.left = new Node(key); // {6}
            } else {
                this.insertNode(node.left, key); // {7}
            }
        } else {
            if (node.right == null) { // {8}
                node.right = new Node(key); // {9}
            } else {
                this.insertNode(node.right, key); // {10}
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

    constructor(comparator) {
        this.#comparator = comparator;
    }
}
