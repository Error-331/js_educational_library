'use strict';

// external imports

// internal imports
import { isArray, isNumber, isString } from './../misc/logic_utils.js';

// implementation
const toSingleValue = (value) => {
    if (isArray(value)) {
        return value[0];
    }

    return value;
}

const toInt = (value) => {
    value = toSingleValue(value);

    if (!isNumber(value)) {
        return parseInt(value);
    }

    return value;
};

const toStringDefault = (value) => {
    if (value === null) {
        return 'NULL';
    } else if (value === undefined) {
        return 'UNDEFINED';
    } else if (isString(value) || value instanceof String) {
        return `${value}`;
    }

    return value.toString();
}

const toString = (value) => {
    value = toSingleValue(value);

    if (!isString(value)) {
        return toStringDefault(value);
    }

    return value;
};

const toArray = (value) => {
    if (!isArray(value)) {
        return [value];
    }

    return value;
};

const toBoolean = (value) => {
    value = toSingleValue(value);

    if (isNumber(value)) {
        value = value !== 0;
        return value;
    } else if (isString(value)) {
        value = value.toLowerCase();
        return value !== 'false';
    } else {
        return value;
    }
};

// exports
export {
    toSingleValue,
    toInt,
    toStringDefault,
    toString,
    toArray,
    toBoolean,
}
