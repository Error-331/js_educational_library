// external imports

// internal imports
import { convertSecondsToMilliseconds, convertNanosecondsToMilliseconds } from '../../../date/date_conversion_utils';
import { isNil, isNumber, isString } from '../../../misc/logic_utils';

// implementation
// TODO: need to find a way to support 'Long' custom type
function normalizeAndConvertPointIntervalToMilliseconds(totalSeconds: number | string | null | unknown = 0, totalNanoSeconds: number | string | null | unknown = 0): number {
    const preparedTotalSeconds = isNil(totalSeconds) ? 0 : totalSeconds;
    const preparedTotalNanoSeconds = isNil(totalNanoSeconds) ? 0 : totalNanoSeconds;

    if (!isString(preparedTotalSeconds) && !isNumber(preparedTotalSeconds)) {
        throw new RangeError(`Cannot normalize and convert GCP monitoring point interval to milliseconds - seconds value type is not supported ("${typeof preparedTotalSeconds}")`);
    }

    if (!isString(preparedTotalNanoSeconds) && !isNumber(preparedTotalNanoSeconds)) {
        throw new RangeError(`Cannot normalize and convert GCP monitoring point interval to milliseconds - nanoseconds value type is not supported ("${typeof totalNanoSeconds}")`);
    }

    return convertSecondsToMilliseconds(preparedTotalSeconds) + convertNanosecondsToMilliseconds(preparedTotalNanoSeconds);
}

// exports
export {
    normalizeAndConvertPointIntervalToMilliseconds,
}