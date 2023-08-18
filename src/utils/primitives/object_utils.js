'use strict';

// external imports

// internal imports
import { isNil, isUndefined, isObject, isArray } from './../misc/logic_utils.js';

// implementation
function cloneArrayDeep(arrayToClone) {
    if (isNil(arrayToClone)) {
        throw new Error('Cannot clone an array - array is not provided');
    } else if (!isArray(arrayToClone)) {
        throw new Error('Cannot clone an array - provided entity is not a valid array');
    }

    return arrayToClone.map(value => {
        if (isObject(value)) {
            return cloneDeep(value);
        } else if (isArray(value)) {
            return cloneArrayDeep(value);
        } else {
            return value;
        }
    });
}

function cloneDeep(obj) {
    let newObj = Object.assign({}, obj);

    for (const objProp in newObj) {
        const objPropValue = newObj[objProp];

        if(isObject(objPropValue)) { // clone property that contains object
            newObj[objProp] = cloneDeep(objPropValue);
        } else if (isArray(objPropValue)) { // clone property that contains array
            newObj[objProp] = cloneArrayDeep(objPropValue);
        }
    }

    return newObj;
}

function extractPropValueByPath(obj, path = []) {
    if (isNil(obj)) {
        throw new Error('Cannot extract property value by path - object is not provided');
    }

    if (path.length === 0) {
        throw new Error('Cannot extract property value by path - path is empty');
    }

    let prop = obj;

    for (const key in path) {
        if (isObject(prop) || isArray(prop)) {
            prop = prop[key];
        } else {
            return undefined;
        }
    }

    return prop;
}

function setPropValueByPath(path = [], propValue, obj) {
    if (isNil(obj)) {
        throw new Error('Cannot set property value by path - object is not provided');
    }

    if (isUndefined(propValue)) {
        return false;
    }

    const pathLength = path.length;

    if (pathLength === 0) {
        throw new Error('Cannot set property value by path - path is empty');
    }

    let prop = obj;

    for (let keyCnt = 0; keyCnt < path.length; keyCnt++) {
        const key = path[keyCnt];

        if (isObject(prop) || isArray(prop)) {
            if (keyCnt + 1 === pathLength) {
                prop[key] = propValue;
                return true;
            }

            prop = prop[key];
        } else {
            return false;
        }
    }
}

function objectPropertiesToNormalize(obj) {
    for (const key in obj) {
        const newKey = key[0].toLowerCase() + key.substr(1);

        obj[newKey] = obj[key];
        delete obj[key];
    }

    return obj;
}

// exports
export {
    cloneArrayDeep,
    cloneDeep,

    extractPropValueByPath,
    setPropValueByPath,

    objectPropertiesToNormalize,
}