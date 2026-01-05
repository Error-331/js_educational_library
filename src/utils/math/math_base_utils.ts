// external imports

// internal imports
import { isNumber } from '../misc/logic_utils';

// implementation

/**
 * Calculates the Greatest Common Divisor (GCD) of two numbers using recursion.
 *
 * @param {number} first The first integer.
 * @param {number} second The second integer.
 *
 * @throws {RangeError} if provided values are not numbers
 *
 * @returns {number} The greatest common divisor of a and b.
 */
function calcGCD(first: number, second: number): number {
    if (!isNumber(first)) {
        throw new RangeError('Cannot calculate GCD - first argument must be a positive integer');
    }

    if (!isNumber(second)) {
        throw new RangeError('Cannot calculate GCD - second argument must be a positive integer');
    }

    const preparedFirst = Math.abs(first);
    const preparedSecond = Math.abs(second);

    if (preparedSecond === 0) {
        return preparedFirst;
    }

    return calcGCD(preparedSecond, preparedFirst % preparedSecond);
}

// exports
export {
    calcGCD,
}