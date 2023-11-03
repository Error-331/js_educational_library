'use strict';

// external imports

// internal imports
import { COMPARATOR_GREATER_THAN } from './../../constants/comparator_constants.js';

import { isArray, isFunction, isNil } from './../misc/logic_utils.js';
import { defaultCompare } from './../misc/comparator_utils.js';

// implementation
function sortPair(comparator, [first, second]) {
    if (!isFunction(comparator)) {
        throw new Error('Cannot sort pair - comparator is not a function');
    }

    if (comparator(first, second) === COMPARATOR_GREATER_THAN) {
        return [second, first];
    } else {
        return [first, second];
    }
}

function sortPairNumbers(pair) {
    if (!isArray(pair)) {
        throw new Error('Cannot sort pair - non-array value provided');
    }

    const [first, second] = pair;

    if (isNil(first) && isNil(second)) {
        throw new Error('Cannot sort pair of numbers - comparator is not a function');
    } else if (isNil(first)) {
        return [second];
    } else if (isNil(second)) {
        return [first];
    } else {
        return sortPair(defaultCompare, pair);
    }
}

// exports
export {
    sortPair,
    sortPairNumbers,
}