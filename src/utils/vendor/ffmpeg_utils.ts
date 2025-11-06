// external imports

// internal imports
import { extractDecimalPartAsString } from '../math/math_conversion_utils';
import { convertSecondsToTimeArray } from '../date/date_conversion_utils';
import { isNumber } from '../misc/logic_utils';

// implementation
function convertFloatSecondsToTimePosition(usrSeconds: number): string {
    if (!isNumber(usrSeconds)) {
        throw new RangeError('Cannot convert seconds to time position - provided value must be of numeric type');
    }

    if (usrSeconds === 0) {
        return '00:00:00.000';
    }

    const sign = usrSeconds < 0 ? '-' : '';
    const preparedSeconds = Math.abs(usrSeconds);

    const millisecondsAsString = extractDecimalPartAsString(preparedSeconds);
    const millisecondsStr = millisecondsAsString === '0' ? '000' : millisecondsAsString.slice(0, 3);

    const [hours, minutes, seconds] = convertSecondsToTimeArray(Math.trunc(preparedSeconds));
    const formattedHours = hours >= 10 ? hours.toString() : `0${hours.toString()}`;
    const formattedMinutes = minutes >= 10 ? minutes.toString() : `0${minutes.toString()}`;
    const formattedSeconds = seconds >= 10 ? seconds.toString() : `0${seconds.toString()}`;

    return `${sign}${formattedHours}:${formattedMinutes}:${formattedSeconds}.${millisecondsStr}`;
}

// exports
export {
    convertFloatSecondsToTimePosition,
}



