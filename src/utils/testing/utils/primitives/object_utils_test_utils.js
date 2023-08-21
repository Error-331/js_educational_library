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
    assert.equal(Object.keys(actualObject).length, Object.keys(testObject).length);

    for (const prop in testObject) {
        const actualProp = actualObject[prop];
        const testProp = testObject[prop];

        if (isArray(testProp)) {
            checkArraysNotEqualByLinkDeep(actualProp, testProp);
        } else if(isObject(testProp)) {
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
    assert.equal(actualArray.length, testArray.length);

    for (let idx = 0; idx < testArray.length; idx++) {
        const actualArrayElement = actualArray[idx];
        const testArrayElement = testArray[idx];

        if (isArray(testArrayElement)) {
            checkArraysNotEqualByLinkDeep(actualArrayElement, testArrayElement);
        } else if(isObject(testArrayElement)) {
            checkObjectsNotEqualByLinkDeep(actualArrayElement, testArrayElement);
        }
    }
}

// exports
export {
    checkObjectsNotEqualByLinkDeep,
    checkArraysNotEqualByLinkDeep,
}