// external imports

// internal imports
import { isNumber } from '../misc/logic_utils';

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

// exports
export {
    convertSecondsToTimeArray,
}