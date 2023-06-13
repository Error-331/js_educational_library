'use strict';

// external imports

// internal imports
import { isNil, isFunction } from './../../../utils/misc/logic_utils.js';

// implementation
class BinarySearchTreePostOrderTraverseClass {
    static traverseNode(node, callback) {
        if (!isNil(node)) {
            BinarySearchTreePostOrderTraverseClass.traverseNode(node.left, callback);
            BinarySearchTreePostOrderTraverseClass.traverseNode(node.right, callback);

            if (isFunction(callback)) {
                callback(node);
            }
        }
    }

    static traverse(binarySearchTree, callback) {
        BinarySearchTreePostOrderTraverseClass.traverseNode(binarySearchTree?.root, callback);
    }
}

// exports
export default BinarySearchTreePostOrderTraverseClass;
