'use strict';

// external imports

// internal imports
import { COMPARATOR_GREATER_THAN } from './../../constants/comparator_constants.js';

import { isArray, isFunction } from './../../utils/misc/logic_utils.js';
import { curry } from './../../utils/misc/functional_utils.js';
import { defaultCompare } from './../../utils/misc/comparator_utils.js';

// implementation
function insertionSort(comparator, arrayToSort) {
    if (!isFunction(comparator)) {
        throw new Error('Cannot sort array - comparator is not a function');
    }

    if (!isArray(arrayToSort)) {
        throw new Error('Cannot sort non-array entity');
    }

    const arrayToSortCopy = arrayToSort.slice();

    for (let arrayIndex = 1; arrayIndex < arrayToSortCopy.length; arrayIndex++) {
        let arraySubIndex = arrayIndex - 1;

        let currentElement = arrayToSortCopy[arrayIndex];
        let previousElement = arrayToSortCopy[arraySubIndex];

        while(comparator(previousElement, currentElement) === COMPARATOR_GREATER_THAN && arraySubIndex >= 0) {
            arrayToSortCopy[arraySubIndex + 1] = arrayToSortCopy[arraySubIndex];

            arraySubIndex -= 1;
            previousElement = arrayToSortCopy[arraySubIndex];
        }

        arrayToSortCopy[arraySubIndex + 1] = currentElement;
    }

    return arrayToSortCopy;
}

const insertionSortNumbers = curry(insertionSort)(defaultCompare);

// exports
export {
    insertionSort,
    insertionSortNumbers,
}