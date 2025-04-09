// external imports

// internal imports
import { isNumber } from '../misc/logic_utils';

// implementation

/**
 * Function that converts Celsius temperature value to Fahrenheit value.
 *
 * @param {number} celsius - Celsius temperature value.
 *
 * @throws {RangeError} if provided Celsius temperature value is not a number.
 *
 * @returns {number} Fahrenheit temperature value.
 *
 */

function convertCelsiusToFahrenheit(celsius: number): number {
    if (!isNumber(celsius)) {
        throw new RangeError('Cannot convert Celsius to Fahrenheit - provided Celsius value is not a number');
    }

    return (celsius * 9/5) + 32;
}

// exports
export {
    convertCelsiusToFahrenheit,
}