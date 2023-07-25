'use strict';

// external imports

// internal imports
import {
    AVL_BINARY_SEARCH_TREE_UNBALANCED_RIGHT,
    AVL_BINARY_SEARCH_TREE_SLIGHTLY_UNBALANCED_RIGHT,
    AVL_BINARY_SEARCH_TREE_BALANCED,
    AVL_BINARY_SEARCH_TREE_SLIGHTLY_UNBALANCED_LEFT,
    AVL_BINARY_SEARCH_TREE_UNBALANCED_LEFT,
} from './../../constants/data_structures/avl_binary_search_tree_constants.js';

import { COMPARATOR_GREATER_THAN, COMPARATOR_LESS_THAN } from './../../constants/comparator_constants.js';

import BinarySearchTreeNodeClass from './binary_search_tree_class.js';
import { isNil } from './../../utils/misc/logic_utils.js';

// implementation
class AVLBinarySearchTreeClass extends BinarySearchTreeNodeClass {
    static calcNodeHeight(node) {
        if (isNil(node)) {
            return -1;
        }

        return Math.max(
            AVLBinarySearchTreeClass.calcNodeHeight(node.left), AVLBinarySearchTreeClass.calcNodeHeight(node.right)
        ) + 1;
    }

    static calcBalanceFactorRaw(node) {
        if (isNil(node)) {
            throw new Error('Cannot calculate raw balance factor for non-existent node');
        }

        return AVLBinarySearchTreeClass.calcNodeHeight(node.left) - AVLBinarySearchTreeClass.calcNodeHeight(node.right);
    }

    static calcBalanceFactor(node) {
        const heightDifference = AVLBinarySearchTreeClass.calcBalanceFactorRaw(node);

        switch (heightDifference) {
            case -2:
                return AVL_BINARY_SEARCH_TREE_UNBALANCED_RIGHT;
            case -1:
                return AVL_BINARY_SEARCH_TREE_SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return AVL_BINARY_SEARCH_TREE_SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return AVL_BINARY_SEARCH_TREE_UNBALANCED_LEFT;
            default:
                return AVL_BINARY_SEARCH_TREE_BALANCED;
        }
    }

    static rotateLeftLeft(node) {
        const tempNode = node.left;
        node.left = tempNode.right;

        if (!isNil(tempNode.right)) {
            tempNode.right.parent = node;
        }

        tempNode.right = node;
        tempNode.parent = node.parent;

        node.parent = tempNode

        return tempNode;
    }

    static rotateRightRight(node) {
        const tempNode = node.right;
        node.right = tempNode.left;

        if (!isNil(tempNode.left)) {
            tempNode.left.parent = node;
        }

        tempNode.left = node;
        tempNode.parent = node.parent;

        node.parent = tempNode

        return tempNode;
    }

    static rotateLeftRight(node) {
        node.left = AVLBinarySearchTreeClass.rotateRightRight(node.left);
        return AVLBinarySearchTreeClass.rotateLeftLeft(node);
    }

    static rotateRightLeft(node) {
        node.right = AVLBinarySearchTreeClass.rotateLeftLeft(node.right);
        return AVLBinarySearchTreeClass.rotateRightRight(node);
    }

    #insertNode(parent, key) {
        if (isNil(parent)) {
            return new BinarySearchTreeNodeClass(key, parent);
        } else if (this.comparator(key, parent.key) === COMPARATOR_LESS_THAN) {
            parent.left = this.#insertNode(parent.left, key);
        } else if (this.comparator(key, parent.key) === COMPARATOR_GREATER_THAN) {
            parent.right = this.#insertNode(parent.right, key);
        } else {
            return parent;
        }

        const balanceFactor = this.getBalanceFactor(node); // {1}
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) { // {2}
            if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) { // {3}
                node = this.rotationLL(node); // {4}
            } else {
                return this.rotationLR(node); // {5}
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) { // {6}
            if (
                this.compareFn(key, node.right.key) === Compare.BIGGER_THAN
            ) { // {7}
                node = this.rotationRR(node); // {8}
            } else {
                return this.rotationRL(node); // {9}
            }
        }
        return node;
    }
}

// exports
export default AVLBinarySearchTreeClass;