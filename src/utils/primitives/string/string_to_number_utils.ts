// external imports

// internal imports
import { isNumber } from '../../misc/logic_utils';

// implementation
function stringToInt(value: string | number): number {
    if (isNumber(value)) {
        return value;
    }

    const number = parseInt(value);

    if (isNaN(number)) {
        throw new RangeError('Cannot convert value to integer - provided value is not a number');
    }
}

// exports
export {
    stringToInt,
}