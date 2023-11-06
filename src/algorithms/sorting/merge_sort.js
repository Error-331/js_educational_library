'use strict';

// external imports

// internal imports
import { COMPARATOR_EQUAL, COMPARATOR_LESS_THAN } from './../../constants/comparator_constants.js';

import { isArray, isFunction } from './../../utils/misc/logic_utils.js';
import { curry } from './../../utils/misc/functional_utils.js';
import { defaultCompare } from './../../utils/misc/comparator_utils.js';

// implementation
function mergeTwoSortedArrays(comparator, arrayToSort, startIndex, middleIndex, endIndex) {
    const leftArrayLength = (middleIndex - startIndex) + 1;
    const rightArrayLength = endIndex - middleIndex;

    const leftPart = new Array(leftArrayLength + 1);
    const rightPart = new Array(rightArrayLength + 1);

    let leftPartIndex = 0;
    let rightPartIndex = 0;

    for (leftPartIndex = 0; leftPartIndex < leftArrayLength; leftPartIndex++) {
        leftPart[leftPartIndex] = arrayToSort[startIndex + leftPartIndex];
    }

    for (rightPartIndex = 0; rightPartIndex < rightArrayLength; rightPartIndex++) {
        rightPart[rightPartIndex] = arrayToSort[middleIndex + 1 + rightPartIndex];
    }

    leftPart[leftArrayLength] = Infinity;
    rightPart[rightArrayLength] = Infinity;

    leftPartIndex = 0;
    rightPartIndex = 0;

    for (let elmIndex = startIndex; elmIndex < endIndex + 1; elmIndex++) {
        const compareResult = comparator(leftPart[leftPartIndex], rightPart[rightPartIndex]);

        if (compareResult === COMPARATOR_LESS_THAN || compareResult === COMPARATOR_EQUAL) {
            arrayToSort[elmIndex] = leftPart[leftPartIndex];
            leftPartIndex = leftPartIndex + 1;
        } else {
            arrayToSort[elmIndex] = rightPart[rightPartIndex];
            rightPartIndex = rightPartIndex + 1;
        }
    }
}

function mergeSortRec(comparator, arrayToSort, startIndex, endIndex) {
    if (startIndex < endIndex) {
        const middleIndex = Math.floor((startIndex + endIndex) / 2);

        mergeSortRec(comparator, arrayToSort, startIndex, middleIndex);
        mergeSortRec(comparator, arrayToSort, middleIndex + 1, endIndex);
        mergeTwoSortedArrays(comparator, arrayToSort, startIndex, middleIndex, endIndex);
    }

    return arrayToSort;
}

function mergeSort(comparator, arrayToSort) {
    if (!isArray(arrayToSort)) {
        throw new Error('Cannot sort an non-array entity');
    }

    if (!isFunction(comparator)) {
        throw new Error('Cannot sort an array - comparator is not a function');
    }

    const arrayToSortCopy = arrayToSort.slice();
    return mergeSortRec(comparator, arrayToSortCopy, 0, arrayToSort.length - 1);
}

const mergeSortNumbers = curry(mergeSort)(defaultCompare);

// exports
export {
    mergeSort,
    mergeSortNumbers,
}