// external imports

// internal imports
import GeneralTreeNode from './../general_tree_node_class.js';
import { isNil, isNumber } from './../../../utils/misc/logic_utils.js';

// implementation
class GeneralTreePositionedNode extends GeneralTreeNode {
    #leftNeighbor = null;
    #rightNeighbor = null;

    #width = null;
    #height = null;

    #x = null;
    #y = null;

    #modifier = null;
    #prelim = null;

    get leftNeighbor() {
        return this.#leftNeighbor;
    }

    get rightNeighbor() {
        return this.#rightNeighbor;
    }

    get modifierSafe() {
        if (isNil(this.#modifier)) {
            throw new Error('Tree node modifier is not specified');
        } else {
            return this.#modifier;
        }
    }

    get prelimSafe() {
        if (isNil(this.#prelim)) {
            throw new Error('Tree node pre-limit is not specified');
        } else {
            return this.#prelim;
        }
    }

    get ySafe() {
        if (isNil(this.#y)) {
            throw new Error('Tree node Y coordinate is not specified');
        } else {
            return this.#y;
        }
    }

    get xSafe() {
        if (isNil(this.#x)) {
            throw new Error('Tree node X coordinate is not specified');
        } else {
            return this.#x;
        }
    }

    get heightSafe() {
        if (isNil(this.#height)) {
            throw new Error('Tree node height is not specified');
        } else {
            return this.#height;
        }
    }

    get widthSafe() {
        if (isNil(this.#width)) {
            throw new Error('Tree node width is not specified');
        } else {
            return this.#width;
        }
    }

    set leftNeighbor(neighbor) {
        this.#leftNeighbor = neighbor;
    }

    set rightNeighbor(neighbor) {
        this.#rightNeighbor = neighbor;
    }

    set modifier(newModifier) {
        if (!isNumber(newModifier)) {
            throw new Error('Cannot set modifier of the node, provided modifier is not a number')
        }

        this.#modifier = newModifier;
    }

    set prelim(newPrelim) {
        if (!isNumber(newPrelim)) {
            throw new Error('Cannot set pre-limit of the node, provided pre-limit is not a number')
        }

        this.#prelim = newPrelim
    }

    set y(newY) {
        if (!isNumber(newY)) {
            throw new Error('Cannot set Y coordinate of the node, provided coordinate is not a number')
        }

        this.#y = newY;
    }

    set x(newX) {
        if (!isNumber(newX)) {
            throw new Error('Cannot set X coordinate of the node, provided coordinate is not a number')
        }

        this.#x = newX;
    }
}

// exports
export default GeneralTreePositionedNode;