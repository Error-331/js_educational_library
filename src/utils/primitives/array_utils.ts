// external imports

// internal imports
import { ComparatorType } from '../../declarations/utility_declarations';
import { ArrayIterator, CollectionIterator } from '../../declarations/collection_declarations';

import { isNil,  isObject, isArray, isFunction, isBoolean } from '../misc/logic_utils';
import { defaultCompare, comparatorIsLt } from '../misc/comparator_utils';

// implementation
function findIdxInObjectsArrayByKeyValue(valueToFind, objectsArray, keyToFind){
    for (let objectIdx = 0; objectIdx < objectsArray.length; objectIdx++) {
        if (objectsArray[objectIdx][keyToFind] === valueToFind) {
            return objectIdx;
        }
    }

    return -1;
}

function findMinimumValueInArrayList(
    comparator: ComparatorType<number>,
    ...arraysList: number[][]
): number[] {
    if (!isFunction(comparator)) {
        throw new RangeError('Cannot find minimum value in arrays list - comparator is not a function');
    }

    if (!isArray(arraysList)) {
        throw new RangeError('Cannot find minimum value in arrays list - provided entity is not an array');
    }

    return arraysList.reduce((accumulator: [number, number, number], currentArray: number[], currentArrayIndex: number): [number, number, number] => {
        accumulator[2] += currentArray.length;

        if (comparatorIsLt(comparator(currentArray[0], accumulator[1]))) {
            accumulator[0] = currentArrayIndex;
            accumulator[1] = currentArray[0];

            return accumulator;
        } else {
            return accumulator;
        }
    }, [0, arraysList[0][0], 0]);
}

function removeFieldsFromObjectsArray(objectsArray, fieldsToRemove = []) {
    for (const arrayRow of objectsArray) {
        for (const fieldToRemove of fieldsToRemove) {
            delete arrayRow[fieldToRemove];
        }
    }

    return objectsArray;
}

function checkAllArraysEqualSize(dataArrays) {
    let prevArraySize = null;

    for (const dataArray of dataArrays) {
        if (isNil(prevArraySize)) {
            prevArraySize = dataArray.length;
            continue;
        }

        if (prevArraySize !== dataArray.length) {
            return false;
        } else {
            prevArraySize = dataArray.length;
        }
    }

    return true;
}

function intersection(firstArray, secondArray) {
    return firstArray.filter(field => secondArray.includes(field));
}

function difference(firstArray, secondArray) {
    return firstArray.filter(field => !secondArray.includes(field));
}

function pick(obj, keys) {
    const newObj = {};

    for (const key of keys) {
        newObj[key] = obj[key];
    }

    return newObj;
}

function pickTo(obj, keysObj) {
    const newObj = {};

    for (const key in keysObj) {
        const newKey = keysObj[key];
        newObj[newKey] = obj[key];
    }

    return newObj;
}

function unique(inputArray) {
    return inputArray.filter((element, index, inputArray) => inputArray.indexOf(element) === index);
}

function uniqueParallelByFirstArray(arraysToFilter) {
    const indexesToRemove = [];

    const onlyUnique = (value, index, self) => {
        const indexCompareRes = self.indexOf(value) === index;

        if (!indexCompareRes) {
            indexesToRemove.push(index);
        }

        return indexCompareRes
    }

    const byIndex = (value, index) => indexesToRemove.indexOf(index) === -1;
    const newArrays = [];

    newArrays.push(arraysToFilter[0].filter(onlyUnique));

    for (let arrayIdx = 1; arrayIdx < arraysToFilter.length; arrayIdx++) {
        newArrays.push(arraysToFilter[arrayIdx].filter(byIndex));
    }

    return newArrays;
}

function concatSorted(comparator, ...arraysToConcat) {
    if (!isFunction(comparator)) {
        throw new Error('Cannot concat sorted arrays - comparator is not a function');
    }

    if (!isArray(arraysToConcat)) {
        throw new Error('Cannot concat sorted arrays - provided entity is not an array');
    }

    const totalArrayLength = arraysToConcat.reduce((accumulator, currentArray) => { accumulator += currentArray.length; return accumulator}, 0);

    const arrayIndexes = new Array(totalArrayLength).fill(0);
    const resultArray = new Array(totalArrayLength);

    let currentMinValue = null;
    let currentMinValueArrayIdx = null;

    for (let resultElmIndex = 0; resultElmIndex < resultArray.length; resultElmIndex++) {
        for (let currentArrayIndex = 0; currentArrayIndex < arraysToConcat.length; currentArrayIndex++) {
            const currentArrayToConcat = arraysToConcat[currentArrayIndex]
            const currentArrayElmIndex = arrayIndexes[currentArrayIndex];

            if (currentArrayElmIndex >= currentArrayToConcat.length) {
                continue;
            }

            const currentValue = arraysToConcat[currentArrayIndex][currentArrayElmIndex];

            if (isNil(currentMinValue)) {
                currentMinValue = currentValue;
                currentMinValueArrayIdx = currentArrayIndex;
            } else {
                if (comparatorIsLt(comparator(currentValue, currentMinValue))) {
                    currentMinValue = currentValue;
                    currentMinValueArrayIdx = currentArrayIndex;
                }
            }
        }

        resultArray[resultElmIndex] = currentMinValue;
        arrayIndexes[currentMinValueArrayIdx] += 1;

        currentMinValue = null;
        currentMinValueArrayIdx = null;
    }

    return resultArray;
}

function concatSortedNumbers(...arraysToConcat) {
    return concatSorted(defaultCompare, ...arraysToConcat);
}

/**
 * Method that checks values in the array on whether at least one of them meet the predicate.
 *
 * @param {ArrayLike<ArrayValueType>} collection - array of values to check.
 * @param {ArrayIterator<ArrayValueType, boolean>} predicate - function which checks incoming values from the array (receives three params: current value, index and the whole array).
 *
 * @throws {RangeError} if none-array value is passed or predicate is not a function.

 * @template ArrayValueType
 *
 * @returns {boolean} value that indicates whether at least one value of the array meet the predicate.
 *
 */

function arraySome<ArrayValueType>(collection: ArrayLike<ArrayValueType>, predicate: ArrayIterator<ArrayValueType, boolean>): boolean {
    if (!isArray(collection)) {
        throw new RangeError('Cannot perform "some" check on collection - collection is not a proper array');
    }

    if (!isFunction(predicate)) {
        throw new RangeError('Cannot perform "some" check on collection - predicate is not a function');
    }

    for (let idx = 0; idx < collection.length; idx++) {
        const result = predicate(collection[idx], idx, collection);

        if (!isBoolean(result)) {
            throw new RangeError('Cannot perform "some" check on collection - predicate function returned none-boolean value');
        }

        if (result === true) {
            return true;
        }
    }

    return false;
}

function arrayEvery<ArrayValueType>(collection: ArrayLike<ArrayValueType>, predicate: ArrayIterator<ArrayValueType, boolean>): boolean {
    if (!isArray(collection)) {
        throw new RangeError('Cannot perform "every" check on collection - collection is not a proper array');
    }

    if (!isFunction(predicate)) {
        throw new RangeError('Cannot perform "every" check on collection - predicate is not a function');
    }

    for (let idx = 0; idx < collection.length; idx++) {
        const result = predicate(collection[idx], idx, collection);

        if (!isBoolean(result)) {
            throw new RangeError('Cannot perform "every" check on collection - predicate function returned none-boolean value');
        }

        if (result === false) {
            return false;
        }
    }

    return true;
}

function objectEvery<CollectionType extends object>(collection: CollectionType, predicate: CollectionIterator<CollectionType, boolean>): boolean {
    if (!isObject(collection)) {
        throw new RangeError('Cannot perform "every" check on collection - collection is not a proper object');
    }

    if (!isFunction(predicate)) {
        throw new RangeError('Cannot perform "every" check on collection - predicate is not a function');
    }

    for (const key in collection) {
        const result = predicate(collection[key], key, collection);

        if (!isBoolean(result)) {
            throw new RangeError('Cannot perform "every" check on collection - predicate function returned none-boolean value');
        }

        if (result === false) {
            return false;
        }
    }

    return true;
}

function every<CollectionTypeOrValue>(
    collection: ArrayLike<CollectionTypeOrValue> | CollectionTypeOrValue,
    predicate: ArrayIterator<CollectionTypeOrValue, boolean> & CollectionIterator<CollectionTypeOrValue, boolean>
) {
    if (isObject(collection)) {
        return objectEvery<typeof collection>(collection, predicate);
    } else if(isArray<CollectionTypeOrValue>(collection)) {
        return arrayEvery<CollectionTypeOrValue>(collection, predicate);
    } else {
        throw new RangeError('Cannot perform "every" check on collection - collection must be either be object or array');
    }
}

// exports
export {
    findIdxInObjectsArrayByKeyValue,
    findMinimumValueInArrayList,

    removeFieldsFromObjectsArray,
    checkAllArraysEqualSize,

    intersection,
    difference,
    pick,
    pickTo,
    unique,

    uniqueParallelByFirstArray,

    concatSorted,
    concatSortedNumbers,

    arraySome,

    arrayEvery,
    objectEvery,
    every,
}