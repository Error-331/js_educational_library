// external imports

// internal imports
import { isString } from '../../utils/misc/logic_utils';

// implementation
function hammingDistanceCaseSensitive(first: string, second: string): number {
    if (!isString(first)) {
        throw new RangeError('Cannot calculate Hamming distance (case sensitive) - first argument must be of type string');
    }

    if (!isString(second)) {
        throw new RangeError('Cannot calculate Hamming distance (case sensitive) - second argument must be of type string');
    }

    if (first.length !== second.length) {
        throw new RangeError('Cannot calculate Hamming distance (case sensitive) - the strings have different lengths');
    }

    let distance = 0

    for (let firstStrIdx = 0; firstStrIdx < first.length; firstStrIdx++) {
        if (first[firstStrIdx] !== second[firstStrIdx]) {
            distance++;
        }
    }

    return distance;
}

function hammingDistanceCaseInsensitive(first: string, second: string): number {
    if (!isString(first)) {
        throw new RangeError('Cannot calculate Hamming distance (case insensitive) - first argument must be of type string');
    }

    if (!isString(second)) {
        throw new RangeError('Cannot calculate Hamming distance (case insensitive) - second argument must be of type string');
    }

    if (first.length !== second.length) {
        throw new RangeError('Cannot calculate Hamming distance (case insensitive) - the strings have different lengths');
    }

    const preparedFirst = first.toLowerCase();
    const preparedSecond = second.toLowerCase();

    return hammingDistanceCaseSensitive(preparedFirst, preparedSecond);
}

// exports
export {
    hammingDistanceCaseSensitive,
    hammingDistanceCaseInsensitive,
};