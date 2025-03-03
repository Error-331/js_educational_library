// external imports

// internal imports
import {
    findMinimumValueInArrayList,

    concatSorted,
    concatSortedNumbers,
} from '../../../src/utils/primitives/array_utils';

import { defaultCompare } from '../../../src/utils/misc/comparator_utils';
import { insertionSortNumbers } from '../../../src/algorithms/sorting/insertion_sort';

// implementation
describe('Array utilities tests....', () => {
    const testArray1 = [2, 1, 7, 6, 8];
    const testArray2 = [4, 3, 5, 9, 0];
    const testArray3 = [5, 4, 0, 2, 1, 10, 12];
    const testArray4 = [0, 3];
    const testArray5 = [9, 4];

    describe('findMinimumValueInArrayList() function tests...', () => {
        test('Should correctly find minimum value in a list of sorted arrays - case 1', () => {
            const [arrayIndex, minValue, totalArrayLength] = findMinimumValueInArrayList(
                defaultCompare,
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray2),
            );

        //    expect(arrayIndex).toBe(1);
        //    expect(minValue).toBe(0);
        //    expect(totalArrayLength).toBe(10);
        });

    /*    test('Should correctly find minimum value in a list of sorted arrays - case 2', () => {
            const [arrayIndex, minValue, totalArrayLength] = findMinimumValueInArrayList(
                defaultCompare,
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray4),
                insertionSortNumbers(testArray5),
            );

            expect(arrayIndex).toBe(1);
            expect(minValue).toBe(0);
            expect(totalArrayLength).toBe(9);
        });

        test('Should correctly find minimum value in a list of sorted arrays - case 3', () => {
            const [arrayIndex, minValue, totalArrayLength] = findMinimumValueInArrayList(
                defaultCompare,
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray2),
                insertionSortNumbers(testArray3),
                insertionSortNumbers(testArray4),
                insertionSortNumbers(testArray5),
            );

            expect(arrayIndex).toBe(1);
            expect(minValue).toBe(0);
            expect(totalArrayLength).toBe(21);
        });*/
    });

   /* describe('concatSorted() function tests...', () => {
        test('Should correctly concat sorted arrays - case 1', () => {
            const sortResult = concatSorted(
                defaultCompare,
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray2),
            );

            expect(sortResult).toBe([0, 1, 2, 3, 4, 5, 6, 7 ,8, 9]);
        });

        test('Should correctly concat sorted arrays - case 2', () => {
            const sortResult = concatSorted(
                defaultCompare,
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray4),
                insertionSortNumbers(testArray5),
            );

            expect(sortResult).toBe([0, 1, 2, 3, 4, 6, 7, 8, 9]);
        });

        test('Should correctly concat sorted arrays - case 3', () => {
            const sortResult = concatSorted(
                defaultCompare,
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray2),
                insertionSortNumbers(testArray3),
                insertionSortNumbers(testArray4),
                insertionSortNumbers(testArray5),
            );

            expect(sortResult).toBe([0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 6, 7, 8, 9, 9, 10, 12]);
        });
    });

    describe('concatSortedNumbers() function tests...', () => {
        test('Should correctly concat sorted arrays - case 1', () => {
            const sortResult = concatSortedNumbers(
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray2),
            );

            expect(sortResult).toBe([0, 1, 2, 3, 4, 5, 6, 7 ,8, 9]);
        });

        test('Should correctly concat sorted arrays - case 2', () => {
            const sortResult = concatSortedNumbers(
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray4),
                insertionSortNumbers(testArray5),
            );

            expect(sortResult).toBe([0, 1, 2, 3, 4, 6, 7, 8, 9]);
        });

        test('Should correctly concat sorted arrays - case 3', () => {
            const sortResult = concatSortedNumbers(
                insertionSortNumbers(testArray1),
                insertionSortNumbers(testArray2),
                insertionSortNumbers(testArray3),
                insertionSortNumbers(testArray4),
                insertionSortNumbers(testArray5),
            );

            expect(sortResult).toBe([0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 6, 7, 8, 9, 9, 10, 12]);
        });
    });*/
});

// exports