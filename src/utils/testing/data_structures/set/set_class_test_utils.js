'use strict';

// external imports
import assert from 'node:assert/strict';

// internal imports

// implementation
function checkSet(setObj, values) {
    assert.strictEqual(setObj.size, values.length);

    for (const value of values) {
        assert.strictEqual(setObj.items[value], value);
    }
}

// exports
export {
    checkSet,
}