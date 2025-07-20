// external imports

// internal imports
import { isNullOrEmpty, isString, isBoolean, isNumber } from '../../misc/logic_utils';

// implementation
function isOnlyDigits(str: string): boolean{
    return /^[0-9]+$/.test(str);
}

function removeComa(value: string): string {
    return value.replace(/\,/g, '');
}

const toStringFOrT = (value: string, name = ''): string => {
    if (isNullOrEmpty(value)) {
        throw new Error(`"${name}" cannot be null or empty`);
    }

    if (isString(value)) {
        if (value.length > 1) {
            throw new Error(`"${name}" length cannot be greater than 1`);
        }

        value = value.toUpperCase();

        if (value !== 'T' && value !== 'F') {
            throw new Error(`"${name}" must contain either value of "F" or "T"`);
        }
    } else if (isBoolean(value)) {
        value = value  === true ? 'T' : 'F';
    } else if (isNumber(value)) {
        if (value !== 0 && value !== 1) {
            throw new Error(`"${name}" must contain either value of 0 or 1`);
        }

        value = value === 1 ? 'T' : 'F';
    }

    return value;
};

const toStringFOrTAsync = (value: string, name = ''): Promise<string> => {
    try {
        return Promise.resolve(toStringFOrT(value, name));
    } catch (error) {
        return Promise.reject(error);
    }
};

// exports
export {
    isOnlyDigits,
    removeComa,
    toStringFOrT,
    toStringFOrTAsync,
}