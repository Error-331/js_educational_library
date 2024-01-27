// external imports
import assert from 'node:assert/strict';

// internal imports

// implementation
function checkKeys(keys, testKeys) {
    assert.strictEqual(keys.length, testKeys.length);

    let isFound = false;

    for (const testKey of testKeys) {
        for (const key of keys) {
            if (key === testKey) {
                isFound = true;
            }
        }

        if (!isFound) {
            assert.fail('Dictionary keys do not match');
        }

        isFound = false;
    }
}

function checkValues(values, testValues) {
    assert.strictEqual(values.length, testValues.length);

    let isFound = false;

    for (const testValue of testValues) {
        for (const value of values) {
            if (value === testValue) {
                isFound = true;
            }
        }

        if (!isFound) {
            assert.fail('Dictionary values do not match');
        }

        isFound = false;
    }
}

function checkKeyValues(keyValues, testKeyValues) {
    assert.strictEqual(keyValues.length, testKeyValues.length);

    let isFound = false;

    for (const [ testKey, testValue ] of testKeyValues) {
        for (const { key, value } of keyValues) {
            if (key === testKey) {
                assert.strictEqual(value, testValue);
                isFound = true;
            }
        }

        if (!isFound) {
            assert.fail('Dictionary keys/values do not match');
        }

        isFound = false;
    }
}

// exports
export {
    checkKeys,
    checkValues,
    checkKeyValues,
}