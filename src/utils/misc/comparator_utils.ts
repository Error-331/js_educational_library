// external imports

// internal imports
import {
    COMPARATOR_NONE_EQUAL,
    COMPARATOR_EQUAL,
    COMPARATOR_LESS_THAN,
    COMPARATOR_GREATER_THAN,

    COMPARATOR_LESS_OR_EQUAL,
    COMPARATOR_GREATER_OR_EQUAL,
} from '../../constants/comparator_constants';

import { isNil } from './logic_utils';

// implementation

/**
 * Function checks whether comparison result (@link ../../constants/comparator_constants) shows that the provided value is not equal to the compared value.
 * This is a utility function that helps analyze comparator result.
 *
 * @param {number} comparatorValue - comparator result value
 *
 * @returns {boolean} true if provided value is not equal to the compared value and vice versa
 *
 */
function comparatorIsNoneEqual(comparatorValue: number): boolean {
    return (comparatorValue & COMPARATOR_EQUAL) === COMPARATOR_NONE_EQUAL;
}

/**
 * Function checks whether comparison result (@link ../../constants/comparator_constants) shows that the provided value is equal to the compared value.
 * This is a utility function that helps analyze comparator result.
 *
 * @param {number} comparatorValue - comparator result value
 *
 * @returns {boolean} true if provided value is equal to the compared value and vice versa
 *
 */
function comparatorIsEqual(comparatorValue: number): boolean {
    return comparatorValue === COMPARATOR_EQUAL;
}

/**
 * Function checks whether comparison result (@link ../../constants/comparator_constants) shows that the provided value is less than the compared value.
 * This is a utility function that helps analyze comparator result.
 *
 * @param {number} comparatorValue - comparator result value
 *
 * @returns {boolean} true if provided value is lest than the compared value and vice versa
 *
 */
function comparatorIsLt(comparatorValue: number): boolean {
    return comparatorValue === COMPARATOR_LESS_THAN;
}

/**
 * Function checks whether comparison result (@link ../../constants/comparator_constants) shows that the provided value is greater than the compared value.
 * This is a utility function that helps analyze comparator result.
 *
 * @param {number} comparatorValue - comparator result value
 *
 * @returns {boolean} true if provided value is greater than the compared value and vice versa
 *
 */
function comparatorIsGt(comparatorValue: number): boolean {
    return comparatorValue === COMPARATOR_GREATER_THAN;
}

/**
 * Function checks whether comparison result (@link ../../constants/comparator_constants) shows that the provided value is less than or equal to the compared value.
 * This is a utility function that helps analyze comparator result.
 *
 * @param {number} comparatorValue - comparator result value
 *
 * @returns {boolean} true if provided value is less than or equal to the compared value and vice versa
 *
 */
function comparatorIsLte(comparatorValue: number): boolean {
    const maskedValue = comparatorValue & COMPARATOR_LESS_OR_EQUAL;
    return comparatorValue === COMPARATOR_LESS_OR_EQUAL ||
        maskedValue === COMPARATOR_EQUAL ||
        maskedValue === COMPARATOR_LESS_THAN;
}

/**
 * Function checks whether comparison result (@link ../../constants/comparator_constants) shows that the provided value is greater than or equal to the compared value.
 * This is a utility function that helps analyze comparator result.
 *
 * @param {number} comparatorValue - comparator result value
 *
 * @returns {boolean} true if provided value is greater than or equal to the compared value and vice versa
 *
 */
function comparatorIsGte(comparatorValue: number): boolean {
    const maskedValue = comparatorValue & COMPARATOR_GREATER_OR_EQUAL;
    return comparatorValue === COMPARATOR_GREATER_OR_EQUAL ||
        maskedValue === COMPARATOR_EQUAL ||
        maskedValue === COMPARATOR_GREATER_THAN;
}

/**
 * Function compares two digits and return corresponding constant (@link ../../constants/comparator_constants) which denotes to comparison result.
 *
 * @param {number} first - value which will be compared
 * @param {number} second - value which will be compared
 *
 * @throws {RangeError} if fist or second value is nil.
 *
 * @returns {number} comparison result
 *
 */
function defaultCompare(first: number, second: number): number {
    if (isNil(first)) {
        throw new RangeError('Cannot perform comparison, "first" cannot be "Nil"');
    }

    if (isNil(second)) {
        throw new RangeError('Cannot perform comparison, "second" cannot be "Nil"');
    }

    if (first === second) {
        return COMPARATOR_EQUAL;
    }

    return first < second ? COMPARATOR_LESS_THAN : COMPARATOR_GREATER_THAN;
}

/**
 * Function compares two strings, ignoring the case, and return corresponding constant (@link ../../constants/comparator_constants) which denotes to comparison result.
 *
 * @param {number} first - value which will be compared
 * @param {number} second - value which will be compared
 *
 * @throws {RangeError} if fist or second value is nil.
 *
 * @returns {number} comparison result
 *
 */
function stringSimpleCaseInsensitiveComparator(first: string, second: string): number {
    const preparedFirst = first.toLowerCase();
    const preparedSecond = second.toLowerCase();

    if (isNil(first)) {
        throw new RangeError('Cannot perform comparison, "first" cannot be "Nil"');
    }

    if (isNil(second)) {
        throw new RangeError('Cannot perform comparison, "second" cannot be "Nil"');
    }

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