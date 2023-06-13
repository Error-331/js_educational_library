'use strict';

// external imports

// internal imports
import { isNil, isFunction } from './../../../utils/misc/logic_utils.js';

// implementation
class BinarySearchTreeInOrderTraverseClass {
    static traverseNode(node, callback) {
        if (!isNil(node)) {
            BinarySearchTreeInOrderTraverseClass.traverseNode(node.left, callback);

            if (isFunction(callback)) {
                callback(node);
            }

            BinarySearchTreeInOrderTraverseClass.traverseNode(node.right, callback);
        }
    }

    static traverse(binarySearchTree, callback) {
        BinarySearchTreeInOrderTraverseClass.traverseNode(binarySearchTree?.root, callback);
    }
}

// exports
export default BinarySearchTreeInOrderTraverseClass;
