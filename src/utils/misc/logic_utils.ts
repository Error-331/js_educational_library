// external imports

// internal imports

// implementation

/*
 * Function that determines whether provided value is of type boolean or not.
 *
 * @param {unknown} input - Input value which will tested whether it is of type boolean or not.
 * @returns {boolean} 'true' - if provided value is of type boolean and vice versa
 */

function isBoolean(input: unknown): input is boolean {
    return typeof input === 'boolean';
}

function isNumber (input: unknown): input is number {
    return typeof input === 'number';
}

function isString (input: unknown): input is string {
    return typeof input === 'string';
}

function isObject(input: unknown): input is object {
    if (isNil(input)) {
        return false;
    } else if (isArray(input)) {
        return false;
    } else return typeof input === 'object';
}

function isArray(input: unknown): input is unknown[] {
    return (
        input instanceof Array ||
        Object.prototype.toString.call(input) === '[object Array]'
    );
}

function isFunction(input: unknown): input is (...args: unknown[]) => unknown {
    return typeof input === 'function';
}

function isClass(input: unknown): boolean {
    if (typeof input === 'function') {
        if (!isNullOrEmpty(input.prototype)) {
            const descResult = Object.getOwnPropertyDescriptor(input, 'prototype').writable;

            if (isNullOrEmpty(descResult)) {
                return false;
            } else {
                return !descResult;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function isUndefined(value: unknown): boolean {
    return value === undefined;
}

function isNull(value: unknown): boolean {
    return value === null;
}

function isNil(value: unknown): boolean {
    return isUndefined(value) || isNull(value);
}

function isNullOrEmpty(value: unknown): boolean {
    if (isNil(value)) {
        return true;
    }

    if (isString(value)) {
        return value.length === 0;
    } else if (isArray(value)) {
        return value.length === 0;
    }

    return false;
}

function defaultTo<DefaultValueType, ValueType>(defaultValue: DefaultValueType, value: ValueType | null | undefined): ValueType | DefaultValueType {
    if (isNullOrEmpty(value)) {
        return defaultValue;
    } else {
        return value;
    }
}

// exports
export {
    isBoolean,
    isNumber,
    isString,
    isObject,
    isArray,
    isFunction,
    isClass,
    isUndefined,
    isNull,
    isNil,
    isNullOrEmpty,
    defaultTo,
}