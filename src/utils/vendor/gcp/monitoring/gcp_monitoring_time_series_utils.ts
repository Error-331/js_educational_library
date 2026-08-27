// external imports

// internal imports
import { convertSecondsToMilliseconds, convertNanosecondsToMilliseconds } from '../../../date/date_conversion_utils';
import { isNil, isNumber, isString, isObject } from '../../../misc/logic_utils';

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

function parseTimeSeriesPointValue(pointValue?: object | null | unknown): number | null {
    if (isNil(pointValue)) {
        return null;
    }

    if (!isObject(pointValue)) {
        return null;
    }

    let preparedValue = null;

    if ('doubleValue' in pointValue) {
        preparedValue = pointValue.doubleValue;
    } else if ('int64Value' in pointValue) {
        preparedValue = pointValue.int64Value;
    }

    if (isString(preparedValue)) {
        return parseInt(preparedValue);
    } else if(isNumber(preparedValue)) {
        return preparedValue;
    } else {
        return null;
    }
}

// exports
export {
    normalizeAndConvertPointIntervalToMilliseconds,
    parseTimeSeriesPointValue,
}