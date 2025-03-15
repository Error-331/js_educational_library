// external imports

// internal imports
import { curry } from '../../../src/utils/misc/functional_utils';
import { defaultCompare } from '../../../src/utils/misc/comparator_utils';

import { combineNumericSegments } from '../../../src/utils/segments/segment_combinators_utils';
import { leftSegmentComparator } from '../../../src/utils/segments/segment_comparator_utils';

import { mergeSortSegmentsByLeftSegment } from '../../../src/algorithms/segments/merge_sort_segments_by_left_segment';
import {
    testNumericSegmentsArray1,
    testNumericSegmentsArray2,
    testNumericSegmentsArray3,
    testNumericSegmentsArray4,

    testNumericSegmentsMergeResultArray1,
    testNumericSegmentsMergeResultArray2,
    testNumericSegmentsMergeResultArray3,
    testNumericSegmentsMergeResultArray4,
} from './segments_test_data';

// implementation
describe('Merge sort segments by left segment tests...', () => {
    describe('Merge sort numeric segments by left segment tests...', () => {
        test('Should correctly merge segments - case 1', () => {
            const comparator = curry(leftSegmentComparator)(defaultCompare);

            const result = mergeSortSegmentsByLeftSegment<number>(comparator, combineNumericSegments, testNumericSegmentsArray1);
            expect(result).toStrictEqual(testNumericSegmentsMergeResultArray1);
        });

        test('Should correctly merge segments - case 2', () => {
            const comparator = curry(leftSegmentComparator)(defaultCompare);

            const result = mergeSortSegmentsByLeftSegment<number>(comparator, combineNumericSegments, testNumericSegmentsArray2);
            expect(result).toStrictEqual(testNumericSegmentsMergeResultArray2);
        });

        test('Should correctly merge segments - case 3', () => {
            const comparator = curry(leftSegmentComparator)(defaultCompare);

            const result = mergeSortSegmentsByLeftSegment<number>(comparator, combineNumericSegments, testNumericSegmentsArray3);
            expect(result).toStrictEqual(testNumericSegmentsMergeResultArray3);
        });

        test('Should correctly merge segments - case 4', () => {
            const comparator = curry(leftSegmentComparator)(defaultCompare);

            const result = mergeSortSegmentsByLeftSegment<number>(comparator, combineNumericSegments, testNumericSegmentsArray4);
            expect(result).toStrictEqual(testNumericSegmentsMergeResultArray4);
        });
    });
});