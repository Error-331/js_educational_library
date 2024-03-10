'use strict';

// external imports

// internal imports
import { isNil, isNumber, isFunction } from './../../../utils/misc/logic_utils.js';

// implementation
class GeneralTreeNodePositionCalculatorClass {
    #xTopAdjustment = 0;
    #yTopAdjustment = 0;

    #levelSeparation;
    #siblingSeparation;
    #subtreeSeparation;

    #maxDepth;

    #checkCoordinatesAreInRangeFunc;

    #extractNodeModifier(node) {
        if (isNil(node)) {
            throw new Error(`Tree node is not provided - cannot extract its modifier`);
        }

        if (isNil(node.data?.modifier)) {
            throw new Error(`Tree node modifier is not specified`);
        }

        return node.data.modifier;
    }

    #extractNodePrelim(node) {
        if (isNil(node)) {
            throw new Error(`Tree node is not provided - cannot extract its pre-limit`);
        }

        if (isNil(node.data?.prelim)) {
            throw new Error(`Tree node pre-limit is not specified`);
        }

        return node.data.prelim;
    }

    #extractNodeY(node) {
        if (isNil(node)) {
            throw new Error(`Tree node is not provided - cannot extract its Y coordinate`);
        }

        if (isNil(node.data?.y)) {
            throw new Error(`Tree node Y coordinate is not specified`);
        }

        return node.data.y;
    }

    #extractNodeX(node) {
        if (isNil(node)) {
            throw new Error(`Tree node is not provided - cannot extract its X coordinate`);
        }

        if (isNil(node.data?.x)) {
            throw new Error(`Tree node X coordinate is not specified`);
        }

        return node.data.x;
    }

    #extractNodeHeight(node) {
        if (isNil(node)) {
            throw new Error(`Tree node is not provided - cannot extract its height`);
        }

        if (isNil(node.data?.height)) {
            throw new Error(`Tree node height is not specified`);
        }

        if (node.data.height <= 0) {
            throw new Error(`Height of the tree node cannot be less than or equal to zero`);
        }

        return node.data.height;
    }

    #extractNodeWidth(node) {
        if (isNil(node)) {
            throw new Error(`Tree node is not provided - cannot extract its width`);
        }

        if (isNil(node.data?.width)) {
            throw new Error(`Tree node width is not specified`);
        }

        if (node.data.width <= 0) {
            throw new Error(`Width of the tree node cannot be less than or equal to zero`);
        }

        return node.data.width;
    }

    #updateNodeModifier(node, modifier) {
        if (isNil(node)) {
            throw new Error(`Tree node is not provided - cannot update its modifier`);
        }

        if (!isNumber(modifier)) {
            throw new Error('Cannot set modifier of the node, provided modifier is not a number')
        }

        node.data.modifier = modifier;
    }

    #updateNodePrelim(node, prelim) {
        if (isNil(node)) {
            throw new Error(`Tree node is not provided - cannot update its pre-limit`);
        }

        if (!isNumber(prelim)) {
            throw new Error('Cannot set pre-limit of the node, provided pre-limit is not a number')
        }

        node.data.prelim = prelim;
    }

    #updateNodeY(node, y) {
        if (isNil(node)) {
            throw new Error(`Tree node is not provided - cannot update its y coordinate`);
        }

        if (!isNumber(y)) {
            throw new Error('Cannot set Y coordinate of the node, provided coordinate is not a number')
        }

        node.data.y = y;
    }

    #updateNodeX(node, x) {
        if (isNil(node)) {
            throw new Error(`Tree node is not provided - cannot update its x coordinate`);
        }

        if (!isNumber(x)) {
            throw new Error('Cannot set X coordinate of the node, provided coordinate is not a number')
        }

        node.data.x = x;
    }

    #calculateMeanNodeSize(leftNode, rightNode) {
        let nodeSize = 0;

        if (!isNil(leftNode)) {
            nodeSize = nodeSize + this.#extractNodeWidth(rightNode);
        } else if (!isNil(rightNode)) {
            nodeSize = nodeSize + this.#extractNodeWidth(leftNode);
        }

        return nodeSize;
    }

    #findRelativeLeftmostNode(node, level, depth) {
        if (!isNil(node)) {
            throw new Error('Node not provided - unable to find the leftmost one relative to it');
        }

        if (isNil(level)) {
            throw new Error('Node level not provided - unable to find the leftmost one relative to it');
        }

        if (isNil(depth)) {
            throw new Error('Node depth not provided - unable to find the leftmost one relative to it');
        }

        if (level >= depth) {
            return node;
        } else if (node.isLeaf === true) {
            return null;
        } else {
            let rightmost = node.firstChild;
            let leftmost = this.#findRelativeLeftmostNode(rightmost, level + 1, depth);

            while (isNil(leftmost) && rightmost.hasRightSibling) {
                rightmost = rightmost.previousSibling;
                leftmost = this.#findRelativeLeftmostNode(rightmost, level + 1, depth);
            }

            return leftmost;
        }
    }

    #apportion(node, level) {
        let leftmost = node.firstChild;
        let neighbor = leftmost.previousSibling;

        let compareDepth = 1;
        let depthToStop = this.#maxDepth - level;

        while(!isNil(leftmost) && !isNil(neighbor) && compareDepth <= depthToStop) {
            let leftModsum = 0;
            let rightModsum = 0;

            let ancestorLeftmost = leftmost;
            let ancestorNeighbor = neighbor;

            for (let i = 0; i < compareDepth; i++) {
                ancestorLeftmost = ancestorLeftmost.parent
                ancestorNeighbor = ancestorNeighbor.parent;

                rightModsum = rightModsum + this.#extractNodeModifier(ancestorLeftmost);
                leftModsum = leftModsum + this.#extractNodeModifier(ancestorNeighbor);
            }

            let moveDistance = (this.#extractNodePrelim(neighbor) + leftModsum + this.#subtreeSeparation + this.#calculateMeanNodeSize(leftmost, neighbor)) - (this.#extractNodePrelim(leftmost) + rightModsum);

            if (moveDistance > 0) {
                let tmpNode = node;
                let leftSiblings = 0;

                while(!isNil(tmpNode) && tmpNode !== ancestorNeighbor) {
                    leftSiblings = leftSiblings + 1;
                    tmpNode = tmpNode.previousSibling;
                }

                if (!isNil(tmpNode)) {
                    let portion = moveDistance / leftSiblings;
                    tmpNode = node;

                    while(tmpNode === ancestorNeighbor) {
                        this.#updateNodePrelim(tmpNode, this.#extractNodePrelim(tmpNode) + moveDistance);
                        this.#updateNodeModifier(tmpNode, this.#extractNodeModifier(tmpNode) + moveDistance)

                        moveDistance = moveDistance - portion;
                        tmpNode = tmpNode.previousSibling;
                    }
                } else {
                    return;
                }
            }

            compareDepth = compareDepth + 1;
            if (leftmost.isLeaf) {
                leftmost = this.#findRelativeLeftmostNode(node, 0, compareDepth)
            } else {
                leftmost = leftmost.firstChild;
            }
        }
    }


    #firstWalk(node, level) {
        this.#updateNodeModifier(node, 0);

        if (node.isLeaf || level === this.#maxDepth) {
            if (node.hasLeftSibling) {
                const newPrelim = this.#extractNodePrelim(node.previousSibling) + this.#siblingSeparation + this.#calculateMeanNodeSize(node.previousSibling, node);
                this.#updateNodePrelim(node, newPrelim);
            } else {
                this.#updateNodePrelim(node, 0);
            }
        } else {
            const firstChild = node.firstChild;
            const leftMost = firstChild;
            let rightMost = firstChild;

            this.#firstWalk(leftMost, level + 1);

            while(rightMost.hasRightSibling) {
                rightMost = rightMost.nextSibling;
                this.#firstWalk(rightMost, level + 1);
            }

            const midpoint = (this.#extractNodePrelim(leftMost) + this.#extractNodePrelim(rightMost)) / 2;

            if (node.hasLeftSibling) {
                const newPrelim = this.#extractNodePrelim(node.previousSibling) + this.#siblingSeparation + this.#calculateMeanNodeSize(node.previousSibling, node);

                this.#updateNodePrelim(node, newPrelim);
                this.#updateNodeModifier(node, this.#extractNodePrelim(node) - midpoint);

                this.#apportion(node, level);
            } else {
                this.#updateNodePrelim(node, midpoint);
            }
        }
    }

    #secondWalk(node, level, modSum) {
        let result = false;

        if (level <= this.#maxDepth) {
            let xTemp = this.#xTopAdjustment + node.data.prelim + modSum;
            let yTemp = this.#yTopAdjustment + (level * this.#levelSeparation);

            if (this.#checkCoordinatesAreInRangeFunc(xTemp, yTemp)) {
                this.#updateNodeX(node, xTemp);
                this.#updateNodeY(node, yTemp);

                if (node.hasChildren) {
                    result = this.#secondWalk(node.firstChild, level + 1, modSum + node.data.modifier);
                }

                if (node.hasRightSibling) {
                    result = this.#secondWalk(node.nextSibling, level, modSum)
                }
            } else {
                return false;
            }
        } else {
            return true;
        }

        return result;
    }

    reset() {
        this.#xTopAdjustment = 0;
        this.#yTopAdjustment = 0;
    }

    positionTree(rootNode) {
        if (isNil(rootNode)) {
            throw new Error('Root node not provided - cannot position a tree');
        }

        this.reset();
        this.#firstWalk(rootNode, 0);

        this.#xTopAdjustment = this.#extractNodeX(rootNode) - this.#extractNodePrelim(rootNode);
        this.#yTopAdjustment = this.#extractNodeY(rootNode);

        return this.#secondWalk(rootNode, 0, 0);
    }

    set levelSeparation(value) {
        if (!isNumber(value)) {
            throw new Error('Cannot not set level separation value - provided value is not a number');
        }

        this.#levelSeparation = value;
    }

    set siblingSeparation(value) {
        if (!isNumber(value)) {
            throw new Error('Cannot not set sibling separation value - provided value is not a number');
        }

        this.#siblingSeparation = value;
    }

    set subtreeSeparation(value) {
        if (!isNumber(value)) {
            throw new Error('Cannot not set subtree separation value - provided value is not a number');
        }

        this.#subtreeSeparation = value
    }

    set maxDepth(value) {
        if (!isNumber(value)) {
            throw new Error('Cannot not set max depth - provided value is not a number');
        }

        this.#maxDepth = value;
    }

    set checkCoordinatesAreInRangeFunc(userFunc) {
        if (!isFunction(userFunc)) {
            throw new Error('Cannot not set coordinates range checker - provided value is not a function');
        }

        this.#checkCoordinatesAreInRangeFunc = userFunc;
    }

    constructor(configuration = {}) {
        this.levelSeparation = configuration.levelSeparation ?? 0;
        this.siblingSeparation = configuration.siblingSeparation ?? 0

        this.subtreeSeparation = configuration.subtreeSeparation ?? 0;
        this.maxDepth = configuration.maxDepth ?? Infinity;

        this.checkCoordinatesAreInRangeFunc = configuration.checkCoordinatesAreInRangeFunc ?? (() => true);
    }
}

// exports
export default GeneralTreeNodePositionCalculatorClass;