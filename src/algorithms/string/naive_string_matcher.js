'use strict';

// external imports

// internal imports
import { COMPARATOR_GREATER_THAN } from './../../constants/comparator_constants.js';

import { isString, isFunction } from './../../utils/misc/logic_utils.js';
import { comparatorIsEqual, stringSimpleCaseInsensitiveComparator } from './../../utils/misc/comparator_utils.js';

import { curry } from './../../utils/misc/functional_utils.js';

// implementation
function naiveStringMatcher(comparator, strToMatch, strToExamine) {
    if (!isFunction(comparator)) {
        throw new Error('Cannot match a string - comparator is not set');
    }

    if (!isString(strToMatch)) {
        throw new Error('Cannot match a string - string to match is not of type string');
    }

    if (!isString(strToExamine)) {
        throw new Error('Cannot match a string - string to examine is not of type string');
    }

    const strToMatchLength = strToMatch.length;
    const strToExamineLength = strToExamine.length;

    if (strToMatchLength <= 0) {
        throw new Error('Cannot match a string - string to match is empty');
    }

    if (strToExamineLength <= 0) {
        throw new Error('Cannot match a string - string to examine is empty');
    }

    if (strToMatchLength > strToExamineLength) {
        throw new Error('Cannot match a string - string to match is bigger than string to examine');
    }

    const matchBoundaryIdx = strToExamineLength - strToMatchLength;

    for (let substrIndex = 0; substrIndex <= matchBoundaryIdx; substrIndex++) {
        if (comparatorIsEqual(comparator(strToExamine.substring(substrIndex, substrIndex + strToMatchLength), strToMatch))) {
            return substrIndex;
        }
    }

    return - 1;
}

const naiveStringMatcherCaseInsensitive = curry(naiveStringMatcher)(stringSimpleCaseInsensitiveComparator);

// exports
export {
    naiveStringMatcher,
    naiveStringMatcherCaseInsensitive,
}