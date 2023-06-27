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

    static calcBalanceFactor(node) {
        const heightDifference = AVLBinarySearchTreeClass.calcNodeHeight(node.left) - AVLBinarySearchTreeClass.calcNodeHeight(node.right);

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
}

// exports
export default AVLBinarySearchTreeClass;