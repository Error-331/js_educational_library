// external imports

// internal imports
import { isString } from '../misc/logic_utils';

// implementation
function simpleAlphanumericHash(stingToHash: string): string {
    if (!isString(stingToHash)) {
        throw new RangeError('Cannot hash string - provided value is not a string');
    }

    let hash = 0;

    for (let charIdx = 0; charIdx < stingToHash.length; charIdx++) {
        hash = (hash << 5) - hash + stingToHash.charCodeAt(charIdx);
        hash |= 0;
    }

    return (hash >>> 0).toString(36);
}

// exports
export {
    simpleAlphanumericHash,
}