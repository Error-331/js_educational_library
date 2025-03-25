// external imports

// internal imports
import { isNil, isNumber } from '../misc/logic_utils';

// implementation
function prepareDateFromNow(delta: number = 0): Date {
    if (!isNil(delta) && !isNumber(delta)) {
        throw new RangeError('Cannot construct UTC date string - delta is not a number');
    }

    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    const expireTime = currentTime + delta;
    currentDate.setTime(expireTime);

    return currentDate;
}

function prepareFormattedISODateNow(): string {
    const currentDate = new Date();
    const isoString = currentDate.toISOString();

    return isoString.split('T')[0];
}

function prepareFormattedUTCDateFromNow(delta: number = 0): string {
    return prepareDateFromNow(delta).toUTCString();
}

// exports
export {
    prepareDateFromNow,

    prepareFormattedISODateNow,
    prepareFormattedUTCDateFromNow,
}