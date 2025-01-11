'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { curry } from './../../../src/utils/misc/functional_utils.js';
import { defaultCompare } from './../../../src/utils/misc/comparator_utils.js';

import { combineNumericSegments } from './../../../src/utils/segments/segment_combinators_utils.js';
import { leftSegmentComparator } from './../../../src/utils/segments/segment_comparator_utils.js';

import { mergeSortSegmentsByLeftSegment } from './../../../src/algorithms/segments/merge_sort_segments_by_left_segment.js';
import {
    testNumericSegmentsArray1,
    testNumericSegmentsArray2,
    testNumericSegmentsArray3,
    testNumericSegmentsArray4,

    testNumericSegmentsMergeResultArray1,
    testNumericSegmentsMergeResultArray2,
    testNumericSegmentsMergeResultArray3,
    testNumericSegmentsMergeResultArray4,
} from './test_data.js';

// implementation
test('Merge sort segments by left segment tests...', async (t) => {
    await t.test('Merge sort numeric segments by left segment tests...', async (t) => {
        await t.test('Should correctly merge segments - case 1', () => {
            const comparator = curry(leftSegmentComparator)(defaultCompare)

            const result = mergeSortSegmentsByLeftSegment(comparator, combineNumericSegments, testNumericSegmentsArray1);
            assert.deepStrictEqual(result, testNumericSegmentsMergeResultArray1);
        });

        await t.test('Should correctly merge segments - case 2', () => {
            const comparator = curry(leftSegmentComparator)(defaultCompare)

            const result = mergeSortSegmentsByLeftSegment(comparator, combineNumericSegments, testNumericSegmentsArray2);
            assert.deepStrictEqual(result, testNumericSegmentsMergeResultArray2);
        });

        await t.test('Should correctly merge segments - case 3', () => {
            const comparator = curry(leftSegmentComparator)(defaultCompare)

            const result = mergeSortSegmentsByLeftSegment(comparator, combineNumericSegments, testNumericSegmentsArray3);
            assert.deepStrictEqual(result, testNumericSegmentsMergeResultArray3);
        });

        await t.test('Should correctly merge segments - case 4', () => {
            const comparator = curry(leftSegmentComparator)(defaultCompare)

            const result = mergeSortSegmentsByLeftSegment(comparator, combineNumericSegments, testNumericSegmentsArray4);
            assert.deepStrictEqual(result, testNumericSegmentsMergeResultArray4);
        });
    });
});