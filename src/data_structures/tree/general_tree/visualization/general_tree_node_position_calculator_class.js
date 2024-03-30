'use strict';

// external imports

// internal imports
import { isNil, isBoolean, isNumber, isFunction } from '../../../../utils/misc/logic_utils.js';

// implementation
class GeneralTreeNodePositionCalculatorClass {
    #xTopAdjustment = 0;
    #yTopAdjustment = 0;

    #levelSeparation = 0;
    #siblingSeparation = 0;
    #subtreeSeparation = 0;

    #maxDepth = Infinity;

    #normalizeWidth = false;

    #checkCoordinatesAreInRangeFunc = () => true;

    #previousLevelNode = [];

    #maxNodeWidth = null;

    #calculateMeanNodeSize(leftNode, rightNode) {
        let nodeSize = 0;

        if (this.normalizeWidth && isNil(this.maxNodeWidth)) {
            throw new Error('Cannot calculate mean node size - "normalizeWidth" flag is set but maxNodeWidth is null');
        }

        if (!isNil(leftNode)) {
            nodeSize = nodeSize + (this.normalizeWidth ? this.maxNodeWidth : rightNode.widthSafe);
        } else if (!isNil(rightNode)) {
            nodeSize = nodeSize + (this.normalizeWidth ? this.maxNodeWidth : leftNode.widthSafe);
        }

        return nodeSize;
    }

    #findRelativeLeftmostNode(node, level, depth) {
        if (isNil(node)) {
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
        } else {
            if (node.isLeaf) {
                return null;
            } else {
                let rightmost = node.firstChild;
                let leftmost = this.#findRelativeLeftmostNode(rightmost, level + 1, depth);

                while (isNil(leftmost) && rightmost.hasNextSibling) {
                    rightmost = rightmost.nextSibling;
                    leftmost = this.#findRelativeLeftmostNode(rightmost, level + 1, depth);
                }

                return leftmost;
            }
        }
    }

    #apportion(node, level) {
        let leftmost = node.firstChild;
        let neighbor = leftmost.leftNeighbor;

        let compareDepth = 1;
        const depthToStop = this.maxDepth - level;

        while(!isNil(leftmost) && !isNil(neighbor) && compareDepth <= depthToStop) {
            let leftModsum = 0;
            let rightModsum = 0;

            let ancestorLeftmost = leftmost;
            let ancestorNeighbor = neighbor;

            for (let i = 0; i < compareDepth; i++) {
                ancestorLeftmost = ancestorLeftmost.parent;
                ancestorNeighbor = ancestorNeighbor.parent;

                rightModsum = rightModsum + ancestorLeftmost.modifierSafe;
                leftModsum = leftModsum + ancestorNeighbor.modifierSafe;
            }

            let moveDistance = (
                neighbor.prelimSafe +
                leftModsum + this.subtreeSeparation +
                this.#calculateMeanNodeSize(leftmost, neighbor)
            ) - (
                leftmost.prelimSafe +
                rightModsum
            );

            if (moveDistance > 0) {
                let tmpNode = node;
                let leftSiblings = 0;

                while(!isNil(tmpNode) && tmpNode !== ancestorNeighbor) {
                    leftSiblings = leftSiblings + 1;
                    tmpNode = tmpNode.previousSibling;
                }

                if (!isNil(tmpNode)) {
                    tmpNode = node;
                    const portion = moveDistance / leftSiblings;

                    while(tmpNode !== ancestorNeighbor) {
                        tmpNode.prelim = tmpNode.prelimSafe + moveDistance;
                        tmpNode.modifier = tmpNode.modifierSafe + moveDistance;

                        moveDistance = moveDistance - portion;
                        tmpNode = tmpNode.previousSibling;
                    }
                }
            }

            compareDepth = compareDepth + 1;
            if (leftmost.isLeaf) {
                leftmost = this.#findRelativeLeftmostNode(node, 0, compareDepth);
            } else {
                leftmost = leftmost.firstChild;
            }

            if (!isNil(leftmost)) {
                neighbor = leftmost.leftNeighbor;
            }
        }
    }

    #firstWalk(node, level) {
        node.modifier = 0;
        this.setNodeNeighbors(node, level);

        if (node.isLeaf || level === this.maxDepth) {
            if (node.hasPreviousSibling) {
                const newPrelim = node.previousSibling.prelimSafe +
                    this.siblingSeparation +
                    this.#calculateMeanNodeSize(node.previousSibling, node);

                node.prelim = newPrelim;
            } else {
                node.prelim = 0;
            }
        } else {
            const firstChild = node.firstChild;
            const leftMost = firstChild;
            let rightMost = firstChild;

            this.#firstWalk(leftMost, level + 1);

            while(rightMost.hasNextSibling) {
                rightMost = rightMost.nextSibling;
                this.#firstWalk(rightMost, level + 1);
            }

            const midpoint = (leftMost.prelimSafe + rightMost.prelimSafe) / 2;

            if (node.hasPreviousSibling) {
                const newPrelim =
                    node.previousSibling.prelimSafe +
                    this.siblingSeparation +
                this.#calculateMeanNodeSize(node.previousSibling, node);

                node.prelim = newPrelim;
                node.modifier = node.prelimSafe - midpoint;

                this.#apportion(node, level);
            } else {
                node.prelim = midpoint;
            }
        }
    }

    #secondWalk(node, level, modSum) {
        let result = false;

        if (level <= this.maxDepth) {
            const xTemp = this.#xTopAdjustment + node.prelimSafe + modSum;
            const yTemp = this.#yTopAdjustment + (level * this.levelSeparation);

            if (this.#checkCoordinatesAreInRangeFunc(xTemp, yTemp)) {
                node.x = xTemp;
                node.y = yTemp;

                if (node.hasChildren) {
                    result = this.#secondWalk(node.firstChild, level + 1, modSum + node.modifierSafe);
                }

                if (node.hasNextSibling) {
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

    #determineMaxWidthHeight(rootNode) {
        const queue = [ rootNode ];
        while (queue.length !== 0) {
            let node = queue.shift();

            if (isNil(this.#maxNodeWidth) || this.#maxNodeWidth < node.widthSafe) {
                this.#maxNodeWidth = node.widthSafe;
            }

            if (!node.isLeaf) {
                queue.push(node.firstChild)
            }

            do {
                if (node.hasNextSibling) {
                    node = node.nextSibling;

                    if (!node.isLeaf) {
                        queue.push(node.firstChild)
                    }

                    if (isNil(this.#maxNodeWidth) || this.#maxNodeWidth < node.widthSafe) {
                        this.#maxNodeWidth = node.widthSafe;
                    }
                }
            } while (node.hasNextSibling)
        }
    }

    reset() {
        this.#xTopAdjustment = 0;
        this.#yTopAdjustment = 0;

        this.#previousLevelNode = [];

        this.#maxNodeWidth = null;
    }

    positionTree(rootNode) {
        if (isNil(rootNode)) {
            throw new Error('Root node not provided - cannot position a tree');
        }

        this.reset();

        if (this.#normalizeWidth) {
            this.#determineMaxWidthHeight();
        }

        this.#firstWalk(rootNode, 0);

        this.#xTopAdjustment = rootNode.xSafe - rootNode.prelimSafe;
        this.#yTopAdjustment = rootNode.ySafe;

        return this.#secondWalk(rootNode, 0, 0);
    }

    get levelSeparation() {
        return this.#levelSeparation;
    }

    get siblingSeparation() {
        return this.#siblingSeparation;
    }

    get subtreeSeparation() {
        return this.#subtreeSeparation;
    }

    get maxDepth() {
        return this.#maxDepth;
    }

    setNodeNeighbors(node, level) {
        node.leftNeighbor = this.#previousLevelNode[level];
        if(!isNil(node.leftNeighbor)) {
            node.leftNeighbor.rightNeighbor = node;
        }

        this.#previousLevelNode[level] = node;
    }

    get normalizeWidth() {
        return this.#normalizeWidth;
    }

    get maxNodeWidth() {
        return this.#maxNodeWidth;
    }

    get checkCoordinatesAreInRangeFunc() {
        return this.#checkCoordinatesAreInRangeFunc
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

        this.#subtreeSeparation = value;
    }

    set maxDepth(value) {
        if (!isNumber(value)) {
            throw new Error('Cannot not set max depth - provided value is not a number');
        }

        this.#maxDepth = value;
    }

    set normalizeWidth(value) {
        if (!isBoolean(value)) {
            throw new Error('Cannot set "normalize width" flag - provided value is not boolean');
        }

        this.#normalizeWidth = value;
    }

    set checkCoordinatesAreInRangeFunc(userFunc) {
        if (!isFunction(userFunc)) {
            throw new Error('Cannot not set coordinates range checker - provided value is not a function');
        }

        this.#checkCoordinatesAreInRangeFunc = userFunc;
    }

    constructor(configuration) {
        this.levelSeparation = configuration.levelSeparation ?? 0;
        this.siblingSeparation = configuration.siblingSeparation ?? 0

        this.subtreeSeparation = configuration.subtreeSeparation ?? 0;
        this.maxDepth = configuration.maxDepth ?? Infinity;

        this.normalizeWidth = configuration.normalizeWidth ?? false;

        this.checkCoordinatesAreInRangeFunc = configuration.checkCoordinatesAreInRangeFunc ?? (() => true);
    }
}

// exports
export default GeneralTreeNodePositionCalculatorClass;