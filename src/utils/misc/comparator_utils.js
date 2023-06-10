'use strict';

// external imports

// internal imports
import {
    COMPARATOR_LESS_THAN,
    COMPARATOR_GREATER_THAN,
    COMPARATOR_EQUAL,
} from './../../constants/comparator_constants';

// implementation
function defaultCompare(first, second) {
    if (first === second) {
        return COMPARATOR_EQUAL;
    }

    return first < second ? COMPARATOR_LESS_THAN : COMPARATOR_GREATER_THAN;
}

// exports
export {
    defaultCompare,
}