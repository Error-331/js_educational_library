'use strict';

// external imports

// internal imports
import { COMPARATOR_EQUAL, COMPARATOR_NONE_EQUAL } from './../../../constants/comparator_constants.js';
import { isNil } from './../../../utils/misc/logic_utils.js';

// implementation
function prefixTreeCharComparator(char, element) {
    if (isNil(char)) {
        throw new Error('Cannot compare char with element - char is undefined or null');
    }

    if (isNil(element)) {
        throw new Error('Cannot compare char with element - element is undefined or null');
    }

    if (isNil(element.char)) {
        throw new Error('Cannot compare char with element - char of the element is undefined or null');
    }

    return char === element.char ? COMPARATOR_EQUAL : COMPARATOR_NONE_EQUAL;
}

// exports
export {
    prefixTreeCharComparator,
}

