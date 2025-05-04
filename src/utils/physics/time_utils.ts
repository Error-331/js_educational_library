// external imports

// internal imports
import { isNumber } from '../misc/logic_utils';

// implementation
function convertSecondsToMilliseconds(seconds: number) {
    if (!isNumber(seconds)) {
        throw new RangeError('Cannot convert seconds to milliseconds - provided seconds value is not a number')
    }

    return seconds * 1000;
}

// exports
export {
    convertSecondsToMilliseconds,
}