'use strict';

// external imports

// internal imports
import { isArray, isFunction } from './../../utils/misc/logic_utils.js';
import { curry } from './../../utils/misc/functional_utils.js';
import { defaultCompare, comparatorIsGt } from './../../utils/misc/comparator_utils.js';

// implementation
function bubbleSort(comparator, arrayToSort) {
    if (!isFunction(comparator)) {
        throw new Error('Cannot sort an array - comparator is not a function');
    }

    if (!isArray(arrayToSort)) {
        throw new Error('Cannot sort non-array entity');
    }

    const arrayToSortCopy = arrayToSort.slice();
    const arrayToSortLength = arrayToSort.length;

    for (let deductAmount = 0; deductAmount < arrayToSortLength; deductAmount++) {
        for (let elmIndex = 0; elmIndex < arrayToSortLength - deductAmount - 1; elmIndex++) {
            let currentElement = arrayToSortCopy[elmIndex];
            let nextElement = arrayToSortCopy[elmIndex + 1]

            if (comparatorIsGt(comparator(currentElement, nextElement))) {
                arrayToSortCopy[elmIndex] = nextElement;
                arrayToSortCopy[elmIndex + 1] = currentElement;
            }
        }
    }

    return arrayToSortCopy;
}

const bubbleSortNumbers = curry(bubbleSort)(defaultCompare);

// exports
export {
    bubbleSort,
    bubbleSortNumbers,
}