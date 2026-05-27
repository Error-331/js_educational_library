// external imports
import { isString } from '../../misc/logic_utils';

// internal imports

// implementation
function extractSubstringBetweenStrings(fistString: string, lastString: string, fullString: string): string {
    if (!isString(fistString)) {
        throw new RangeError('Cannot extract string between two strings - first string is not specified');
    }

    if (!isString(lastString)) {
        throw new RangeError('Cannot extract string between two strings - last string is not specified');
    }

    const firstIndex = fullString.indexOf(fistString);
    const lastIndex = fullString.lastIndexOf(lastString);

    if (firstIndex === -1) {
        throw new RangeError('Cannot extract string between two strings - index of the first string is not found');
    }

    if (lastIndex === -1) {
        throw new RangeError('Cannot extract string between two strings - index of the last string is not found');
    }

    if (firstIndex > lastIndex) {
        throw new RangeError('Cannot extract string between two strings - first string index is larger then last string index');
    }

    return fullString.substring(firstIndex + fistString.length, lastIndex);
}

// exports
export {
    extractSubstringBetweenStrings,
}