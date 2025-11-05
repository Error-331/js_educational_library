// external imports

// internal imports
import {
    findMinimumValueInArrayList,

    concatSorted,
    concatSortedNumbers,

    arraySome,
} from '../../../src/utils/primitives/array_utils';

import { defaultCompare } from '../../../src/utils/misc/comparator_utils';
import { insertionSortNumbers } from '../../../src/algorithms/sorting/insertion_sort';

// implementation
describe('Array utilities tests....', () => {
    const testMixedArray1 = ['./test/path/file1.json', undefined, './test/path/file2.json'];
    const testMixedArray2 = ['./test/path/file1.json', './test/path/file2.json', undefined, undefined];
    const testMixedArray3 = [undefined, undefined, undefined];

    const testNumericArray1 = [2, 1, 7, 6, 8];
    const testNumericArray2 = [4, 3, 5, 9, 0];
    const testNumericArray3 = [5, 4, 0, 2, 1, 10, 12];
    const testNumericArray4 = [0, 3];
    const testNumericArray5 = [9, 4];

    describe('findMinimumValueInArrayList() function tests...', () => {
        test('Should correctly find minimum value in a list of sorted arrays - case 1', () => {
           // const [arrayIndex, minValue, totalArrayLength] = findMinimumValueInArrayList(
            //    defaultCompare,
             //   insertionSortNumbers(testNumericArray1),
             //   insertionSortNumbers(testNumericArray2),
           // );

        //    expect(arrayIndex).toBe(1);
        //    expect(minValue).toBe(0);
        //    expect(totalArrayLength).toBe(10);
        });

    /*    test('Should correctly find minimum value in a list of sorted arrays - case 2', () => {
            const [arrayIndex, minValue, totalArrayLength] = findMinimumValueInArrayList(
                defaultCompare,
                insertionSortNumbers(testNumericArray1),
                insertionSortNumbers(testNumericArray4),
                insertionSortNumbers(testNumericArray5),
            );

            expect(arrayIndex).toBe(1);
            expect(minValue).toBe(0);
            expect(totalArrayLength).toBe(9);
        });

        test('Should correctly find minimum value in a list of sorted arrays - case 3', () => {
            const [arrayIndex, minValue, totalArrayLength] = findMinimumValueInArrayList(
                defaultCompare,
                insertionSortNumbers(testNumericArray1),
                insertionSortNumbers(testNumericArray2),
                insertionSortNumbers(testNumericArray3),
                insertionSortNumbers(testNumericArray4),
                insertionSortNumbers(testNumericArray5),
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
                insertionSortNumbers(testNumericArray1),
                insertionSortNumbers(testNumericArray2),
            );

            expect(sortResult).toBe([0, 1, 2, 3, 4, 5, 6, 7 ,8, 9]);
        });

        test('Should correctly concat sorted arrays - case 2', () => {
            const sortResult = concatSorted(
                defaultCompare,
                insertionSortNumbers(testNumericArray1),
                insertionSortNumbers(testNumericArray4),
                insertionSortNumbers(testNumericArray5),
            );

            expect(sortResult).toBe([0, 1, 2, 3, 4, 6, 7, 8, 9]);
        });

        test('Should correctly concat sorted arrays - case 3', () => {
            const sortResult = concatSorted(
                defaultCompare,
                insertionSortNumbers(testNumericArray1),
                insertionSortNumbers(testNumericArray2),
                insertionSortNumbers(testNumericArray3),
                insertionSortNumbers(testNumericArray4),
                insertionSortNumbers(testNumericArray5),
            );

            expect(sortResult).toBe([0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 6, 7, 8, 9, 9, 10, 12]);
        });
    });

    describe('concatSortedNumbers() function tests...', () => {
        test('Should correctly concat sorted arrays - case 1', () => {
            const sortResult = concatSortedNumbers(
                insertionSortNumbers(testNumericArray1),
                insertionSortNumbers(testNumericArray2),
            );

            expect(sortResult).toBe([0, 1, 2, 3, 4, 5, 6, 7 ,8, 9]);
        });

        test('Should correctly concat sorted arrays - case 2', () => {
            const sortResult = concatSortedNumbers(
                insertionSortNumbers(testNumericArray1),
                insertionSortNumbers(testNumericArray4),
                insertionSortNumbers(testNumericArray5),
            );

            expect(sortResult).toBe([0, 1, 2, 3, 4, 6, 7, 8, 9]);
        });

        test('Should correctly concat sorted arrays - case 3', () => {
            const sortResult = concatSortedNumbers(
                insertionSortNumbers(testNumericArray1),
                insertionSortNumbers(testNumericArray2),
                insertionSortNumbers(testNumericArray3),
                insertionSortNumbers(testNumericArray4),
                insertionSortNumbers(testNumericArray5),
            );

            expect(sortResult).toBe([0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 6, 7, 8, 9, 9, 10, 12]);
        });
    });*/

    describe('arraySome() function tests...', () => {
        describe('Nil tests...', () => {
            describe('Positive tests...', () => {
                test('Should correctly check array for whether it contains truthy value - case 1', () => {
                    expect(arraySome<string | undefined>(testMixedArray1, (element: string | undefined) => typeof element === 'string')).toBe(true);
                });

                test('Should correctly check array for whether it contains truthy value - case 2', () => {
                    expect(arraySome<string | undefined>(testMixedArray2, (element: string | undefined) => typeof element === 'string' )).toBe(true);
                });

                test('Should correctly check array for whether it contains truthy value - case 3', () => {
                    expect(arraySome<string | undefined>(testMixedArray3, (element: string | undefined) => element === undefined )).toBe(true);
                });
            });

            describe('Negative tests...', () => {
                test('Should correctly check array for whether all its values do not meet the predicate - case 1', () => {
                    expect(arraySome<string | undefined>(testMixedArray1, (element: string | undefined) => typeof element === 'number')).toBe(false);
                });

                test('Should correctly check array for whether all its values do not meet the predicate - case 2', () => {
                    expect(arraySome<string | undefined>(testMixedArray2, (element: string | undefined) => typeof element === 'number' )).toBe(false);
                });

                test('Should correctly check array for whether all its values do not meet the predicate - case 3', () => {
                    expect(arraySome<string | undefined>(testMixedArray3, (element: string | undefined) => element !== undefined )).toBe(false);
                });
            });
        });

        describe('Numeric tests...', () => {
            describe('Positive tests...', () => {
                test('Should correctly check array for whether it contains truthy value - case 1', () => {
                    expect(arraySome<number>(testNumericArray1, (element: number) => element > 6 )).toBe(true);
                });

                test('Should correctly check array for whether it contains truthy value - case 2', () => {
                    expect(arraySome<number>(testNumericArray2, (element: number) => element === 4 )).toBe(true);
                });

                test('Should correctly check array for whether it contains truthy value - case 3', () => {
                    expect(arraySome<number>(testNumericArray3, (element: number) => element < 5 )).toBe(true);
                });

                test('Should correctly check array for whether it contains truthy value - case 4', () => {
                    expect(arraySome<number>(testNumericArray4, (element: number) => element > 2 )).toBe(true);
                });

                test('Should correctly check array for whether it contains truthy value - case 5', () => {
                    expect(arraySome<number>(testNumericArray5, (element: number) => element < 9 )).toBe(true);
                });
            });

            describe('Negative tests...', () => {
                test('Should correctly check array for whether all its values do not meet the predicate - case 1', () => {
                    expect(arraySome<number>(testNumericArray1, (element: number) => element > 8 )).toBe(false);
                });

                test('Should correctly check array for whether all its values do not meet the predicate - case 2', () => {
                    expect(arraySome<number>(testNumericArray2, (element: number) => element === 2 )).toBe(false);
                });

                test('Should correctly check array for whether all its values do not meet the predicate - case 3', () => {
                    expect(arraySome<number>(testNumericArray3, (element: number) => element < 0 )).toBe(false);
                });

                test('Should correctly check array for whether all its values do not meet the predicate - case 4', () => {
                    expect(arraySome<number>(testNumericArray4, (element: number) => element > 3 )).toBe(false);
                });

                test('Should correctly check array for whether all its values do not meet the predicate - case 5', () => {
                    expect(arraySome<number>(testNumericArray5, (element: number) => element < 4 )).toBe(false);
                });
            });
        });
    });
});

// exports