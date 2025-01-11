'use strict';

// external imports

// internal imports
import { isNil, isArray, isFunction } from './../../utils/misc/logic_utils.js';
import { mergeSort } from './../sorting/merge_sort.js';

// implementation
function mergeSortSegmentsByLeftSegment(comparator, combinator, boundariesArrayToMerge) {
    if (!isFunction(comparator)) {
        throw new Error('Cannot merge boundaries - comparator is not a function');
    }

    if (!isArray(boundariesArrayToMerge)) {
        throw new Error('Cannot merge boundaries using a non-array entity');
    }

    const sortedBoundaries = mergeSort(comparator, boundariesArrayToMerge);

    if (sortedBoundaries.length <= 0) {
        return sortedBoundaries;
    }

    const mergedBoundaries = [sortedBoundaries[0]];
    let mergedBoundaryIdx = 0;

    for (let nextBoundaryIdx = 1; nextBoundaryIdx < sortedBoundaries.length; nextBoundaryIdx++) {
        const combinedBoundary = combinator(mergedBoundaries[mergedBoundaryIdx], sortedBoundaries[nextBoundaryIdx]);

        if (!isNil(combinedBoundary)) {
            mergedBoundaries[mergedBoundaryIdx] = combinedBoundary;
        } else {
            mergedBoundaryIdx += 1;
            mergedBoundaries.push(sortedBoundaries[nextBoundaryIdx]);
        }
    }

    return mergedBoundaries;
}

// exports
export {
    mergeSortSegmentsByLeftSegment,
}