// external imports

// internal imports
import { isNil, isArray, isFunction } from '../../utils/misc/logic_utils';
import { mergeSort } from '../sorting/merge_sort';

// implementation

/**
 * Function that sorts and merges array of segments using left (first) value in each segment (tuple) as reference.
 *
 * Example
 *
 * Following array:
 *
 * [110, 120],
 * [80, 100],
 * [50, 60],
 * [40, 50],
 * [35, 45],
 * [30, 40],
 * [20, 40],
 * [20, 30],
 * [10, 20],
 * [5, 70],
 * [5, 15],
 *
 * Will be sorted/merged into following array:
 *
 * [ 5, 70 ],
 * [ 80, 100 ],
 * [ 110, 120 ],
 *
 * By means of @see {@link defaultCompare} and @see {@link leftSegmentComparator}
 *
 * @template InputDataType
 *
 * @param {(first: InputDataType, second: InputDataType) => InputDataType} comparator - function that is used to compare segment values.
 * @param {(firstSegment: InputDataType, secondSegment: InputDataType) => [InputDataType, InputDataType]} combinator - function that is used to combine two segments.
 * @param {[InputDataType, InputDataType][]} boundariesArrayToMerge - array of boundaries (tuples) to merge.
 *
 * @throws {RangeError} if provided values are of wrong type or not specified.
 *
 * @returns {[InputDataType, InputDataType][]} merged and sorted segments.
 *
 */
function mergeSortSegmentsByLeftSegment<InputDataType>(
    comparator: (first: InputDataType, second: InputDataType) => InputDataType,
    combinator: (firstSegment: InputDataType, secondSegment: InputDataType) => [InputDataType, InputDataType],
    boundariesArrayToMerge: [InputDataType, InputDataType][],
): [InputDataType, InputDataType][] {
    if (!isFunction(comparator)) {
        throw new RangeError('Cannot merge boundaries - comparator is not a function');
    }

    if (!isArray(boundariesArrayToMerge)) {
        throw new RangeError('Cannot merge boundaries using a non-array entity');
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