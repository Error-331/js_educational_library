'use strict';

// external imports

// internal imports
import { isNil } from './../../../utils/misc/logic_utils.js';

// implementation
class BinarySearchTreeIteratorBaseClass {
    #rootNode = null;

    reset() {}
    hasNext() { return false };
    next() { return null; }

    [Symbol.iterator]() {
        if (!this.hasNext()) {
            return {
                next: function() {
                    return {
                        done: true
                    };
                }
            }
        } else {
            const iterator = this;

            return {
                next: function() {
                    if (!iterator.hasNext()) {
                        iterator.reset();
                        return {
                            done: true
                        };
                    } else {
                        return {
                            value: iterator.next(),
                            done: false
                        };
                    }
                }
            }
        }
    }

    get rootNode() {
        return this.#rootNode;
    }

    constructor(rootNode) {
        if (isNil(rootNode)) {
            throw new Error('Cannot create binary search tree iterator - root node is not provided');
        }

        this.#rootNode = rootNode;
    }
}

// exports
export default BinarySearchTreeIteratorBaseClass;