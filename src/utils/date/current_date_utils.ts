// external imports
import { DateTime } from 'luxon';

// internal imports

// implementation
function createStartOfDayDateTime(): DateTime {
    return DateTime.now().startOf('day');
}

function createCurrentDateTime(): DateTime {
    return DateTime.now();
}

function createEndOfDayDateTime(): DateTime {
    return DateTime.now().endOf('day')
}

function createStartOfDayUTCTimestamp(): number {
    return createStartOfDayDateTime().toUTC().toUnixInteger();
}

function createCurrentUTCTimestamp(): number {
    return createCurrentDateTime().toUTC().toUnixInteger();
}

function createEndOfDayUTCTimestamp(): number {
    return createEndOfDayDateTime().toUTC().toUnixInteger();
}

function createUTCTimestampMinusHoursFromNow(minusHours = 0): number {
    return createCurrentDateTime().minus({ hours: minusHours }).toUTC().toUnixInteger();
}

function createDatePlusHoursFromNow(plusHours = 0): Date {
    return createCurrentDateTime().plus({ hours: plusHours }).toJSDate();
}

function createDatePlusMinutesFromNow(plusMinutes = 0): Date {
    return createCurrentDateTime().plus({ minutes: plusMinutes }).toJSDate();
}

// exports
export {
    createStartOfDayDateTime,
    createCurrentDateTime,
    createEndOfDayDateTime,

    createStartOfDayUTCTimestamp,
    createCurrentUTCTimestamp,
    createEndOfDayUTCTimestamp,

    createUTCTimestampMinusHoursFromNow,
    createDatePlusHoursFromNow,
    createDatePlusMinutesFromNow,
}