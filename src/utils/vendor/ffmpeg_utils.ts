// external imports

// internal imports
import { convertSecondsToTimePosition } from '../date/time_formatting_utils';

// implementation
function convertFloatSecondsToTimePosition(usrSeconds: number): string {
    return convertSecondsToTimePosition(usrSeconds, true);
}

// exports
export {
    convertFloatSecondsToTimePosition,
}



