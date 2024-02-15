'use strict';

// external imports

// internal imports
import {
    COMPARATOR_NONE_EQUAL,
    COMPARATOR_EQUAL,
    COMPARATOR_LESS_THAN,
    COMPARATOR_GREATER_THAN,

    COMPARATOR_LESS_OR_EQUAL,
    COMPARATOR_GREATER_OR_EQUAL,
} from './../../constants/comparator_constants.js';

import { isNil } from './logic_utils.js';

// implementation
function comparatorIsNoneEqual(comparatorValue) {
    return (comparatorValue & COMPARATOR_EQUAL) === COMPARATOR_NONE_EQUAL;
}

function comparatorIsEqual(comparatorValue) {
    return comparatorValue === COMPARATOR_EQUAL;
}

function comparatorIsLt(comparatorValue) {
    return comparatorValue === COMPARATOR_LESS_THAN;
}

function comparatorIsGt(comparatorValue) {
    return comparatorValue === COMPARATOR_GREATER_THAN;
}

function comparatorIsLte(comparatorValue) {
    const maskedValue = comparatorValue & COMPARATOR_LESS_OR_EQUAL;
    return comparatorValue === COMPARATOR_LESS_OR_EQUAL ||
        maskedValue === COMPARATOR_EQUAL ||
        maskedValue === COMPARATOR_LESS_THAN;
}

function comparatorIsGte(comparatorValue) {
    const maskedValue = comparatorValue & COMPARATOR_GREATER_OR_EQUAL;
    return comparatorValue === COMPARATOR_GREATER_OR_EQUAL ||
        maskedValue === COMPARATOR_EQUAL ||
        maskedValue === COMPARATOR_GREATER_THAN;
}

function defaultCompare(first, second) {
    if (isNil(first)) {
        throw new Error('Cannot perform comparison, "first" cannot be "Nil"');
    }

    if (isNil(second)) {
        throw new Error('Cannot perform comparison, "second" cannot be "Nil"');
    }

    if (first === second) {
        return COMPARATOR_EQUAL;
    }

    return first < second ? COMPARATOR_LESS_THAN : COMPARATOR_GREATER_THAN;
}

function stringSimpleCaseInsensitiveComparator(first, second) {
    const preparedFirst = first.toLowerCase();
    const preparedSecond = second.toLowerCase();

    return preparedFirst === preparedSecond ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL;
}

// exports
export {
    comparatorIsNoneEqual,
    comparatorIsEqual,

    comparatorIsLt,
    comparatorIsGt,

    comparatorIsLte,
    comparatorIsGte,

    defaultCompare,
    stringSimpleCaseInsensitiveComparator,
}