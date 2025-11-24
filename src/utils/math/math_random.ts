// external imports

// internal imports
import { isNumber } from '../misc/logic_utils';

// implementation
function generateRandomIdNumber(): number {
    return Math.floor((Math.random() * 999) + 1);
}

function generateRandomIntInRange(min: number, max: number): number {
    if (!isNumber(min)) {
        throw new RangeError('Cannot generate random number in range - minimum value should be of type number');
    }

    if (!isNumber(max)) {
        throw new RangeError('Cannot generate random number in range - maximum value should be of type number');
    }

    const preparedMin = Math.ceil(min);
    const preparedMax = Math.floor(max);

    return Math.floor(Math.random() * (preparedMax - preparedMin + 1)) + preparedMin;
}

// exports
export {
    generateRandomIdNumber,
    generateRandomIntInRange,
}