'use strict';

// external imports
import assert from 'node:assert/strict';

// internal imports
import { isArray, isObject } from './../../../misc/logic_utils.js';

// implementation
function checkObjectsNotEqualByLinkDeep(actualObject, testObject) {
    if (!isObject(actualObject)) {
        assert.fail('Actual value is not an object');
    }

    if (!isObject(testObject)) {
        assert.fail('Test value is not an object');
    }

    assert.notEqual(actualObject, testObject);

    for (const prop in testObject) {
        const actualProp = actualObject[prop];
        const testProp = testObject[prop];

        if (isArray(actualProp)) {
            checkArraysNotEqualByLinkDeep(actualProp, testProp);
        } else if(isObject(actualProp)) {
            checkObjectsNotEqualByLinkDeep(actualProp, testProp);
        }
    }
}

function checkArraysNotEqualByLinkDeep(actualArray, testArray) {
    if (!isArray(actualArray)) {
        assert.fail('Actual value is not an array');
    }

    if (!isArray(testArray)) {
        assert.fail('Test value is not an array');
    }

    assert.notEqual(actualArray, testArray);

    for (let idx = 0; idx < testArray.left; idx++) {
        const actualArrayElement = actualArray[idx];
        const testArrayElement = testArray[idx];

        if (isArray(actualArrayElement)) {
            checkArraysNotEqualByLinkDeep(actualArrayElement, testArrayElement);
        } else if(isObject(actualArrayElement)) {
            checkObjectsNotEqualByLinkDeep(actualArrayElement, testArrayElement);
        }
    }
}

// exports
export {
    checkObjectsNotEqualByLinkDeep,
    checkArraysNotEqualByLinkDeep,
}