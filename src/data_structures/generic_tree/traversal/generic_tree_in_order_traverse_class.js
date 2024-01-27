'use strict';

// external imports

// internal imports
import { isNil, isFunction } from './../../../utils/misc/logic_utils.js';

// implementation
class GenericTreeInOrderTraverseClass {
    static traverseNode(node, callback) {
        if (!isNil(node)) {
            let childNode = node.firstChild;
            GenericTreeInOrderTraverseClass.traverseNode(childNode, callback);

            if (isFunction(callback)) {
                callback(node);
            }

            childNode = childNode?.nextSibling;
            while(!isNil(childNode)) {
                GenericTreeInOrderTraverseClass.traverseNode(childNode, callback);
                childNode = childNode.nextSibling;
            }
        }
    }

    static traverse(binarySearchTree, callback) {
        GenericTreeInOrderTraverseClass.traverseNode(binarySearchTree?.root, callback);
    }
}

// exports
export default GenericTreeInOrderTraverseClass;
