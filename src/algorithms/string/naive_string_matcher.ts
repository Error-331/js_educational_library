// external imports

// internal imports
import { isString, isFunction } from '../../utils/misc/logic_utils';
import { comparatorIsEqual, stringSimpleCaseInsensitiveComparator } from '../../utils/misc/comparator_utils';

import { curry } from '../../utils/misc/functional_utils';

// implementation

/**
 * Function that finds first position in "strToExamine" at which substring "strToMatch" starts (if any).
 *
 * @param {function} comparator - comparator function used to compare two strings (part of the "strToExamine" string with "strToMatch" string).
 * @param {string} strToMatch - substring which starting position should be found inside actual string ("strToExamine")
 * @param {string} strToExamine - actual string in which starting position of the substring will be searched ("strToMatch")
 *
 * @throws {RangeError} if one of the provided strings is not an actual string or have inappropriate length, of comparator function is not an actual function..
 *
 * @returns {number} position at which substring starts inside the actual string or -1 if substring is not found inside the actual string
 *
 */
function naiveStringMatcher(
    comparator: (first: string, second: string) => number,
    strToMatch: string,
    strToExamine: string
): number {
    if (!isFunction(comparator)) {
        throw new RangeError('Cannot match a string - comparator is not set');
    }

    if (!isString(strToMatch)) {
        throw new RangeError('Cannot match a string - string to match is not of type string');
    }

    if (!isString(strToExamine)) {
        throw new RangeError('Cannot match a string - string to examine is not of type string');
    }

    const strToMatchLength = strToMatch.length;
    const strToExamineLength = strToExamine.length;

    if (strToMatchLength <= 0) {
        throw new RangeError('Cannot match a string - string to match is empty');
    }

    if (strToExamineLength <= 0) {
        throw new RangeError('Cannot match a string - string to examine is empty');
    }

    if (strToMatchLength > strToExamineLength) {
        throw new RangeError('Cannot match a string - string to match is bigger than string to examine');
    }

    const matchBoundaryIdx = strToExamineLength - strToMatchLength;

    for (let substrIndex = 0; substrIndex <= matchBoundaryIdx; substrIndex++) {
        if (comparatorIsEqual(comparator(strToExamine.substring(substrIndex, substrIndex + strToMatchLength), strToMatch))) {
            return substrIndex;
        }
    }

    return -1;
}

/**
 * Function that finds first position in "strToExamine" at which substring "strToMatch" starts (if any).
 * Function uses naive case-insensitive comparator.
 *
 * @param {string} strToMatch - substring which starting position should be found inside actual string ("strToExamine")
 * @param {string} strToExamine - actual string in which starting position of the substring will be searched ("strToMatch")
 *
 * @throws {RangeError} if one of the provided strings is not an actual string or have inappropriate length, of comparator function is not an actual function..
 *
 * @returns {number} position at which substring starts inside the actual string or -1 if substring is not found inside the actual string
 *
 */
const naiveStringMatcherCaseInsensitive = curry(naiveStringMatcher)(stringSimpleCaseInsensitiveComparator);

// exports
export {
    naiveStringMatcher,
    naiveStringMatcherCaseInsensitive,
}