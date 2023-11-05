'use strict';

// external imports

// internal imports
import { COMPARATOR_LESS_THAN } from './../../constants/comparator_constants.js';

import { isNil } from './../misc/logic_utils.js';
import { defaultCompare } from './../misc/comparator_utils.js';

// implementation
function findIdxInObjectsArrayByKeyValue(valueToFind, objectsArray, keyToFind){
    for (let objectIdx = 0; objectIdx < objectsArray.length; objectIdx++) {
        if (objectsArray[objectIdx][keyToFind] === valueToFind) {
            return objectIdx;
        }
    }

    return -1;
}

function findMinimumValueInArrayList(comparator, ...arraysList) {
    return arraysList.reduce((accumulator, currentArray, currentArrayIndex) => {
        accumulator[2] += currentArray.length;

        if (comparator(currentArray[0], accumulator[1]) === COMPARATOR_LESS_THAN) {
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
                if (comparator(currentValue, currentMinValue) === COMPARATOR_LESS_THAN) {
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
}