'use strict';

// external imports

// internal imports
import { isNil } from './../../../../utils/misc/logic_utils.js';
import { defaultCompare, comparatorIsLt, comparatorIsGt, comparatorIsLte } from './../../../../utils/misc/comparator_utils.js';

// implementation
class AugmentedIntervalTreeIntervalClass {
    #low = null;
    #high = null;

    #comparator = defaultCompare;

    isOverlapNode(node) {
        if (isNil(node)) {
            throw new Error('Node is not provided - can not determine whether it overlap current interval or not');
        }

        return comparatorIsLte(this.#comparator(node.low, this.#high)) && comparatorIsLte(this.#comparator(this.#low, node.high));
    }

    isOverlapInterval(interval) {
        if (isNil(interval)) {
            throw new Error('Interval is not provided - can not determine whether it overlap current interval or not');
        }

        return comparatorIsLte(this.#comparator(interval.low, this.#high)) && comparatorIsLte(this.#comparator(this.#low, interval.high));
    }

    get low() {
        return this.#low;
    }

    get high() {
        return this.#high;
    }

    set low(low) {
        if (isNil(low)) {
            this.#low = low;
            return;
        } else if (!isNil(this.#high) && comparatorIsGt(this.#comparator(low, this.#high))) {
            throw new Error('"low" cannot be greater than "high"');
        }

        this.#low = low;
    }

    set high(high) {
        if (isNil(high)) {
            this.#high = high;
            return;
        } else if (!isNil(this.#low) && comparatorIsLt(this.#comparator(high, this.#low))) {
            throw new Error('"high" cannot be lower than "low"');
        }

        this.#high = high;
    }

    constructor(low, high, comparator) {
        if (!isNil(comparator)) {
            this.#comparator = comparator;
        }

        this.low = low;
        this.high = high
    }
}

// exports
export default AugmentedIntervalTreeIntervalClass;