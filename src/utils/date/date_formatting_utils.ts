// external imports
import { DateTime } from 'luxon';

// internal imports

// implementation
function utcTimestampToTime24WithSecondsLocale(timestamp: number): string {
    return DateTime.fromSeconds(timestamp).toLocaleString(DateTime.TIME_24_WITH_SECONDS)
}

function convertUnixTimestampToShortISO(unixTimeStamp: number): string {
    const dateTimeFromTimestamp = DateTime.fromSeconds(unixTimeStamp).setZone('UTC');
    return `${dateTimeFromTimestamp.toFormat('yyyy-MM-dd')}T${dateTimeFromTimestamp.toFormat('HH:mm')}`;
}

// exports
export {
    utcTimestampToTime24WithSecondsLocale,
    convertUnixTimestampToShortISO,
}