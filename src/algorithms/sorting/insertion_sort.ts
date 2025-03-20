// external imports

// internal imports
import { ComparatorType } from '../../declarations/utility_declarations';

import { isArray, isFunction } from '../../utils/misc/logic_utils';
import { curry } from '../../utils/misc/functional_utils';
import { defaultCompare, comparatorIsGt } from '../../utils/misc/comparator_utils';

// implementation
function insertionSort<ValuesType extends unknown>(comparator: ComparatorType<ValuesType>, arrayToSort: ValuesType[]) {
    if (!isFunction(comparator)) {
        throw new Error('Cannot sort an array - comparator is not a function');
    }

    if (!isArray(arrayToSort)) {
        throw new Error('Cannot sort non-array entity');
    }

    const arrayToSortCopy: ValuesType[] = arrayToSort.slice();

    for (let arrayIndex: number = 1; arrayIndex < arrayToSortCopy.length; arrayIndex++) {
        let arraySubIndex: number= arrayIndex - 1;

        let currentElement: ValuesType = arrayToSortCopy[arrayIndex];
        let previousElement: ValuesType = arrayToSortCopy[arraySubIndex];

        while(comparatorIsGt(comparator(previousElement, currentElement)) && arraySubIndex >= 0) {
            arrayToSortCopy[arraySubIndex + 1] = arrayToSortCopy[arraySubIndex];

            arraySubIndex -= 1;
            previousElement = arrayToSortCopy[arraySubIndex];
        }

        arrayToSortCopy[arraySubIndex + 1] = currentElement;
    }

    return arrayToSortCopy;
}

const insertionSortNumbers = curry(insertionSort<number>)(defaultCompare);

// exports
export {
    insertionSort,
    insertionSortNumbers,
}