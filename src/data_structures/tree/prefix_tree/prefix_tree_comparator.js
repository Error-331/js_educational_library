'use strict';

// external imports

// internal imports
import { COMPARATOR_EQUAL, COMPARATOR_NONE_EQUAL } from './../../../constants/comparator_constants.js';
import { isNil, isString } from './../../../utils/misc/logic_utils.js';

// implementation
function prefixTreeCharComparator(char, element) {
    if (isNil(char)) {
        throw new Error('Cannot compare char with element - char is undefined or null');
    }

    if (isNil(element)) {
        throw new Error('Cannot compare char with element - element is undefined or null');
    }

    if (isNil(element.data)) {
        throw new Error('Cannot compare char with element data - data is undefined or null');
    }

    if (isNil(element.data?.char)) {
        return COMPARATOR_NONE_EQUAL;
    }

    if (!isString(char)) {
        throw new Error('Cannot compare char with element data char - char is not a string');
    }

    return char === element.data.char ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL;
}

// exports
export {
    prefixTreeCharComparator,
}

