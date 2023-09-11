'use strict';

// external imports

// internal imports
import { isNil } from './logic_utils.js';
import { extractPropValueByPath, setPropValueByPath } from './../primitives/object_utils.js';

// implementation
const curry = (func) => {
    const curried = (...args) => {
        if (args.length >= func.length) {
            return func(...args);
        } else {
            return (...args2) => {
                return curried(...args.concat(args2));
            }
        }
    }

    return curried;
}

const defaultTo = (defaultValue) => curry((defaultValue, testValue) => isNil(testValue) ? defaultValue : testValue)(defaultValue);
const defaultToNull = (testValue) => defaultTo(null)(testValue);

const lens = (getter, setter) => {
    return ({
        get: obj => getter(obj),
        set: (val, obj) => setter(val, obj),
    })
};

const lensPath = (path = []) => {
    return ({
        get: obj => extractPropValueByPath(obj, path),
        set: (val, obj) => setPropValueByPath(path, val, obj),
    })
};

const view = (lens, obj) => {
    return lens.get(obj);
};

const set = (lens, val, obj) => {
    return lens.set(val, obj);
};

const oneTimeMemoizer = (functionToMemoize) => {
    let cache = null;

    const functionWrapper = (...args) => {
        if (isNil(cache)) {
            return cache;
        } else {
            cache = functionToMemoize(...args);
            return cache;
        }

    };

    return functionWrapper;
};

// exports
export {
    curry,

    defaultTo,
    defaultToNull,

    lens,
    lensPath,

    view,
    set,

    oneTimeMemoizer,
}
