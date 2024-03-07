'use strict';

// external imports

// internal imports
import {isNil, isUndefined} from './../../utils/misc/logic_utils.js';

// implementation

import GenericTreeNodeClass from "../../data_structures/generic_tree/generic_tree_node_class.js";
import GenericTreeClass from "../../data_structures/generic_tree/generic_tree_class.js";

class GeneralTreeNodeRenderableProxyClass {
    #node = null;

    #previousSibling = undefined;

    addChild(data) {
        return this.#node.addChild(data);
    }

    destroy() {
        this.#node.destroy();
        this.#node = null;
    }

    findChild(data) {
        return this.#node.findChild(data);
    }

    findChildBy(comparator, data) {
        return this.#node.findChildBy(comparator, data);
    }

    findChildByData(data) {
        return this.#node.findChildByData(data);
    }

    hasChild(data) {
        return this.#node.hasChild(data);
    }

    getChildAt(index) {
        return this.#node.getChildAt(index);
    }

    get tree() {
        return this.#node.tree;
    }

    get parent() {
        return this.#node.parent;
    }

    get data() {
        return this.#node.data;
    }

    get children() {
        return this.#node.children;
    }

    get isLeaf() {
        return this.#node.isLeaf;
    }

    get leftmostChild() {
        return this.#node.leftmostChild;
    }

    get rightmostChild() {
        return this.#node.rightmostChild;
    }

    get firstChild() {
        return this.#node.firstChild;
    }

    get nextSibling() {
        return this.#node.nextSibling;
    }

    get previousSibling() {
        if (!isUndefined(this.#previousSibling)) {
            return this.#previousSibling;
        } else {
            return this.#node.previousSibling;
        }
    }

    get hasChildren() {
        return this.#node.hasChildren;
    }

    get hasLeftSibling() {
        if (!isUndefined(this.#previousSibling)) {
            return this.#node.hasLeftSibling;
        } else {
            return !isNil(this.#node.previousSibling);
        }
    }

    get hasRightSibling() {
        return this.#node.hasRightSibling;
    }

    set data(data){
        return this.#node.data;
    }

    set previousSibling(node) {
        this.#previousSibling = node;
    }

    constructor(node) {
        this.#node = node;
    }
}

let LevelZeroPtr;
let xTopAdjustment;
let yTopAdjustment;

let LevelSeparation = 400;
let MaxDepth = Infinity;
let SiblingSeparation = 400;
let SubtreeSeparation;

let previousLevelNode = [];

// The current node's leftmost offspring
function FIRSTCHILD(node) {
    return node.leftmostChild;
}

// The current node's closest sibling node on the left.
function LEFTSIBLING(node) {

}

// The current node's closest sibling node on the right
function RIGHTSIBLING(Node) {

}

// The current node's x-coordinate
function XCOORD(Node) {

}

// The current node's y-coordinate
function YCOORD(Node) {

}

// The current node's nearest neighbor to the left, at the same level
function LEFTNEIGHBOR(node) {
    return node.previousSibling;
}

function GETPREVNOOEATLEVEL(level) {
    let TempPtr = LevelZeroPtr;
    let i = 0;

    while(TempPtr !== 0) {
        if(i === level) {
            return PREVNODE(TempPtr)
        }

        TempPtr = NEXTLEVEL(TempPtr);
        i = i + 1;
    }

    return null;
}

function PREVNODE(node) {

}

function NEXTLEVEL(node) {
    return node.leftmostChild;
}

function INITPREVNOOELIST(rootNode) {
    let TempPtr = rootNode;

    while(TempPtr !== null) {
        //PREVNODE(TempPtr) = null;
        previousLevelNode.push(null)

        TempPtr = NEXTLEVEL(TempPtr)
    }
}

function meanNodeSize(leftNode, rightNode) {
    let nodeSize = 0;

    if (!isNil(leftNode)) {
        nodeSize = nodeSize + rightNode.data.width;
    } else if (!isNil(rightNode)) {
        nodeSize = nodeSize + leftNode.data.width;
    }

    return nodeSize;
}

function GETLEFTMOST(node, level, depth) {
    if (level >= depth) {
        return node;
    } else if (node.isLeaf) {
        return null;
    } else {
        let rightmost = node.firstChild;
        let leftmost = GETLEFTMOST(rightmost, level + 1, depth);

        while (isNil(leftmost) && rightmost.hasRightSibling) {
            rightmost = rightmost.previousSibling;
            leftmost = GETLEFTMOST(rightmost, level + 1, depth);
        }

        return leftmost;
    }
}

function APPORATION(node, level) {
    let leftmost = node.firstChild;
    let neighbor = leftmost.previousSibling;
    let compareDepth = 1;
    let depthToStop = MaxDepth - level;

    while(!isNil(leftmost) && !isNil(neighbor) && compareDepth <= depthToStop) {
        let leftModsum = 0;
        let rightModsum = 0;
        let ancestorLeftmost = leftmost;
        let ancestorNeighbor = neighbor;

        for (let i = 0; i < compareDepth; i++) {
            ancestorLeftmost = ancestorLeftmost.parent
            ancestorNeighbor = ancestorNeighbor.parent;
            rightModsum = rightModsum + ancestorLeftmost.data.modifier;
            leftModsum = leftModsum + ancestorNeighbor.data.modifier
        }

        let moveDistance = (neighbor.data.prelim + leftModsum + SubtreeSeparation + meanNodeSize(leftmost, neighbor)) - (leftmost.data.prelim + rightModsum);

        if (moveDistance > 0) {
            let TempPtr = node;
            let LeftSiblings = 0;

            while(!isNil(TempPtr) && TempPtr !== ancestorNeighbor) {
                LeftSiblings = LeftSiblings + 1;
                TempPtr = TempPtr.previousSibling;
            }

            if (!isNil(TempPtr)) {
                let Portion = moveDistance / LeftSiblings;
                TempPtr = node;

                while(TempPtr === ancestorNeighbor) {
                    TempPtr.data.prelim = TempPtr.data.prelim + moveDistance;
                    TempPtr.data.modifier = TempPtr.data.modifier + moveDistance;
                    moveDistance = moveDistance - Portion;
                    TempPtr = TempPtr.previousSibling;
                }
            } else {
                return;
            }
        }


        compareDepth = compareDepth + 1;
        if (leftmost.isLeaf) {
            leftmost = GETLEFTMOST(node, 0, compareDepth)
        } else {
            leftmost = leftmost.firstChild;
        }
    }
}

function setNeighbors(node, level) {
    node.previousSibling = previousLevelNode[level];

    if(!isNil(node.previousSibling)){
        node.previousSibling.rightNeighbor = node;
    }

    previousLevelNode[level] = node;
}

function firstWalk(node, level) {
    setNeighbors(node, level);

    node.data.modifier = 0;

    if (node.isLeaf || level === MaxDepth) {
        if (node.hasLeftSibling) {
            node.data.prelim = node.previousSibling.data.prelim + SiblingSeparation + meanNodeSize(node.previousSibling, node);
        } else {
            node.data.prelim = 0;
        }
    } else {
        const firstChild = node.firstChild;
        const leftMost = firstChild;
        let rightMost = firstChild;

        firstWalk(leftMost, level + 1);

        while(rightMost.hasRightSibling) {
            rightMost = rightMost.nextSibling;
            firstWalk(rightMost, level + 1);
        }

        const Midpoint = (leftMost.data.prelim + rightMost.data.prelim) / 2;

        if (node.hasLeftSibling) {
            node.data.prelim = node.previousSibling.data.prelim + SiblingSeparation + meanNodeSize(node.previousSibling, node);
            node.data.modifier = node.data.prelim - Midpoint;
            APPORATION(node, level);
        } else {
            node.data.prelim = Midpoint;
        }
    }
}

function CHECKEXTENTSRANG(xValue, yValue) {
    return true;
}

function SECONDWALK(node, level, modsum) {
    let result = false;

    if (level <= MaxDepth) {
        let xTemp = xTopAdjustment + node.data.prelim + modsum;
        let yTemp = yTopAdjustment + (level * LevelSeparation);


        if (CHECKEXTENTSRANG(xTemp, yTemp)) {
            node.data.x = xTemp;
            node.data.y = yTemp;

            if (node.hasChildren) {
                result = SECONDWALK(node.firstChild, level + 1, modsum + node.data.modifier);
            }

            // TODO: possible error
            if (node.hasRightSibling) {
                result = SECONDWALK(node.nextSibling, level, modsum)
            }
        } else {
            result = false;
            return result;
        }
     } else {
        result = true;
        return result;
    }

    return result;
}

function positionTree(rootNode) {
    if (!isNil(rootNode)) {
        INITPREVNOOELIST(rootNode);

        firstWalk(rootNode, 0);

        xTopAdjustment = rootNode.data.x - rootNode.data.prelim;
        yTopAdjustment = rootNode.data.y;

        return SECONDWALK(rootNode, 0, 0);
    } else {
        return true;
    }
}


const currentTree = new GenericTreeClass(null, { customNodeProxyClass: GeneralTreeNodeRenderableProxyClass });

const previewImageNode = currentTree.createNewRoot({ gIndex: 0, width: 10, x: 0, y: 0, text: 'preview_img', arrows: [1] });
const helloNode = previewImageNode.addChild({ gIndex: 1, width: 10, x: 0, y: 0, text: 'hello', arrows: [2] });
const menuWorkingHoursNode = helloNode.addChild({ gIndex: 2, width: 10, x: 0, y: 0, text: 'menu_working_hours', arrows: [3, 4, 5] });
const agentHandoffNode = menuWorkingHoursNode.addChild({ gIndex: 3, width: 10, x: 0, y: 0, text: 'agent_handoff', arrows: [6] });
const contactsNode = menuWorkingHoursNode.addChild({ gIndex: 4, width: 10, x: 0, y: 0, text: 'contacts', arrows: [2, 3, 5,]});
const noAgentResolvedNode = menuWorkingHoursNode.addChild({ gIndex: 5, width: 10, x: 0, y: 0, text: 'no_agent_resolved', arrows: [7] });

const handoffNode = agentHandoffNode.addChild({ gIndex: 6, width: 10, x: 0, y: 0, text: 'handoff' });
const resolvedNode = noAgentResolvedNode.addChild({ gIndex: 7, width: 10, x: 0, y: 0, text: 'resolved' });

positionTree(currentTree.root);



console.log(previewImageNode.data);
console.log(helloNode.data);
console.log(menuWorkingHoursNode.data);
console.log(agentHandoffNode.data);
console.log(contactsNode.data);
console.log(noAgentResolvedNode.data);
console.log(handoffNode.data);
console.log(resolvedNode.data);



/*const childLevel0 = currentTree.createNewRoot({ gIndex: 0, width: 10, x: 0, y: 0 });

const childLevel1 = childLevel0.addChild({ gIndex: 1,  width: 10, x: 0, y: 0 });
const childLevel3 = childLevel0.addChild({ gIndex: 3,  width: 10, x: 0, y: 0 });
const childLevel2 = childLevel1.addChild({ gIndex: 2,  width: 10, x: 0, y: 0 });

positionTree(currentTree.root);

console.log(childLevel0.data);
console.log(childLevel1.data);
console.log(childLevel2.data);
console.log(childLevel3.data);*/

// exports

/*

{ gIndex: 0, width: 10, x: 0, y: 0, modifier: 0, prelim: 10 }
{ gIndex: 1, width: 10, x: -10, y: 10, modifier: 0, prelim: 0 }
{ gIndex: 2, width: 10, x: -10, y: 20, modifier: 0, prelim: 0 }
{ gIndex: 3, width: 10, x: 0, y: 0, modifier: 0, prelim: 20 }


 */