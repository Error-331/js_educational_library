// external imports

// internal imports
import { extractDecimalPartAsString } from '../math/math_conversion_utils';
import { convertSecondsToTimeArray } from './date_conversion_utils';
import { isNumber } from '../misc/logic_utils';

// implementation
function convertSecondsToTimePosition(usrSeconds: number, includeMilliseconds: boolean = false): string {
    if (!isNumber(usrSeconds)) {
        throw new RangeError('Cannot convert seconds to time position - provided value must be of numeric type');
    }

    if (usrSeconds === 0) {
        return includeMilliseconds ? '00:00:00.000' : '00:00:00';
    }

    const sign = usrSeconds < 0 ? '-' : '';
    const preparedSeconds = Math.abs(usrSeconds);

    const millisecondsAsString = extractDecimalPartAsString(preparedSeconds);
    const millisecondsStr = millisecondsAsString === '0' ? '000' : millisecondsAsString.slice(0, 3);

    const [hours, minutes, seconds] = convertSecondsToTimeArray(Math.trunc(preparedSeconds));
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    const timePosition = `${sign}${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    return includeMilliseconds ? `${timePosition}.${millisecondsStr}` : timePosition;
}

// exports
export {
    convertSecondsToTimePosition,
}