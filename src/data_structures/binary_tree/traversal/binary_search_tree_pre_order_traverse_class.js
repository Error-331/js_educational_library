'use strict';

// external imports

// internal imports
import { isNil, isFunction } from './../../../utils/misc/logic_utils.js';

// implementation
class BinarySearchTreePreOrderTraverseClass {
    static traverseNode(node, callback) {
        if (!isNil(node)) {
            if (isFunction(callback)) {
                callback(node);
            }

            BinarySearchTreePreOrderTraverseClass.traverseNode(node.left, callback);
            BinarySearchTreePreOrderTraverseClass.traverseNode(node.right, callback);
        }
    }

    static traverse(binarySearchTree, callback) {
        BinarySearchTreePreOrderTraverseClass.traverseNode(binarySearchTree?.root, callback);
    }
}

// exports
export default BinarySearchTreePreOrderTraverseClass;
