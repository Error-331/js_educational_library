// external imports

// internal imports
import { isNullOrEmpty, isString, isNumber } from '../misc/logic_utils';

// implementation
function convertSecondsToTimeArray(totalSeconds: number): [number, number, number] {
    if (!isNumber(totalSeconds)) {
        throw new RangeError('Cannot convert seconds to time array - provided value must be of numeric type');
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return [hours, minutes, seconds];
}

function convertSecondsToMilliseconds(totalSeconds: number | string): number {
    if (isNullOrEmpty(totalSeconds)) {
        throw new RangeError('Cannot convert seconds to milliseconds - initial value is note provided');
    }

    const preparedSeconds = isString(totalSeconds) ? parseInt(totalSeconds) : totalSeconds;
    return preparedSeconds * 1000;
}

function convertNanosecondsToMilliseconds(totalNanoseconds: number | string): number {
    if (isNullOrEmpty(totalNanoseconds)) {
        throw new RangeError('Cannot convert nanoseconds to milliseconds - initial value is note provided');
    }

    const preparedNanoSeconds = isString(totalNanoseconds) ? parseInt(totalNanoseconds) : totalNanoseconds;
    return preparedNanoSeconds / 1000000;
}

// exports
export {
    convertSecondsToTimeArray,
    convertSecondsToMilliseconds,
    convertNanosecondsToMilliseconds,
}