'use strict';

// external imports

// internal imports
import GenericTreeClass from './../../../../../data_structures/generic_tree/generic_tree_class.js';

// implementation
function fillGenericTreeNodeChildrenByArray(node, childrenData) {
    for (const childData of childrenData) {
        const childNode = node.addChild(childData.value);
        fillGenericTreeNodeChildrenByArray(childNode, childData.children);
    }
}

function fillGenericTreeByObject(data) {
    const genericTreeObj = new GenericTreeClass();
    const rootNode = genericTreeObj.createNewRoot(data.value);

    fillGenericTreeNodeChildrenByArray(rootNode, data.children);
    return genericTreeObj;
}

// exports
export {
    fillGenericTreeNodeChildrenByArray,
    fillGenericTreeByObject,
}