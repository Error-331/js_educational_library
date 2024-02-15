'use strict';

// external imports

// internal imports
import { isNil } from '../../../../utils/misc/logic_utils.js';
import AugmentedIntervalTreeIntervalClass from './augmented_interval_tree_interval_class.js';

// implementation
class AugmentedIntervalTreeNodeClass {
    #interval = null;

    #left = null;

    #right = null;

    #max = null;

    get interval() {
        return this.#interval;
    }

    get left() {
        return this.#left;
    }

    get right() {
        return this.#right;
    }

    get max() {
        return this.#max;
    }

    get low() {
        return this.#interval.low;
    }

    get high() {
        return this.#interval.high;
    }

    set interval(interval) {
        if (isNil(interval)) {
            throw new Error('Cannot set "interval" value, it cannot be null of undefined');
        }

        if (!(interval instanceof AugmentedIntervalTreeIntervalClass)) {
            throw new Error('Cannot set "interval" value, must be of type "AugmentedIntervalTreeIntervalClass"');
        }

        this.#interval = interval;
    }

    set left(left) {
        if (isNil(left)) {
            throw new Error('Cannot set "left" value, it cannot be null of undefined');
        }

        if (!(left instanceof AugmentedIntervalTreeNodeClass)) {
            throw new Error('Cannot set "left" value, must be of type "AugmentedIntervalTreeNodeClass"');
        }

        this.#left = left;
    }

    set right(right) {
        if (isNil(right)) {
            throw new Error('Cannot set "right" value, it cannot be null of undefined');
        }

        if (!(right instanceof AugmentedIntervalTreeNodeClass)) {
            throw new Error('Cannot set "right" value, must be of type "IntervalTreeNodeClass"');
        }

        this.#right = right;
    }

    set max(max) {
        if (isNil(max)) {
            throw new Error('Cannot set "max" value, it cannot be null of undefined');
        }

        this.#max = max;
    }

    constructor(interval, max) {
        this.interval = interval;
        this.max = max;
    }
}

// exports
export default AugmentedIntervalTreeNodeClass;