'use strict';

// external imports

// internal imports
import GeneralTreeClass from '../../../../../data_structures/tree/general_tree/general_tree_class.js';

// implementation
function fillGenericTreeNodeChildrenByArray(node, childrenData) {
    for (const childData of childrenData) {
        const childNode = node.addChild(childData.value);
        fillGenericTreeNodeChildrenByArray(childNode, childData.children);
    }
}

function fillGenericTreeByObject(data) {
    const genericTreeObj = new GeneralTreeClass();
    const rootNode = genericTreeObj.createNewRoot(data.value);

    fillGenericTreeNodeChildrenByArray(rootNode, data.children);
    return genericTreeObj;
}

// exports
export {
    fillGenericTreeNodeChildrenByArray,
    fillGenericTreeByObject,
}