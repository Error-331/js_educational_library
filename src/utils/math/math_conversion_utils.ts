// external imports

// internal imports
import { isNumber } from '../misc/logic_utils';

// implementation

/**
 * Extracts the decimal part of a given number as a string.
 *
 * @param {number} usrNumber - The number to extract the decimal part from.
 *
 * @throws {RangeError} If the provided value is not of numeric type.
 *
 * @returns {string} The decimal part of the number as a string. Returns '0' if the number is an integer (has no decimal part).
 *
 */

function extractDecimalPartAsString(usrNumber: number): string {
    if (!isNumber(usrNumber)) {
        throw new RangeError('Cannot convert decimal part of number as string - provided value must be of numeric type');
    }

    const strNumber = usrNumber.toString();
    const decimalIndex = strNumber.indexOf('.');

    if (decimalIndex === -1) {
        return '0';
    }

    return strNumber.substring(decimalIndex + 1);
}

// exports
export {
    extractDecimalPartAsString,
}