'use strict';

// external imports

// internal imports
import { isNil, isNumber, isString, isBoolean } from './../misc/logic_utils.js';

// implementation
function polynomialRollingHash(matchCase,  p, m, stringToHash) {
    if (isNil(p) || !isBoolean(matchCase)) {
        throw new Error('Cannot calculate "polynomial rolling hash" - "matchCase" flag is nil or is not boolean');
    }

    if (isNil(p) || !isNumber(p)) {
        throw new Error('Cannot calculate "polynomial rolling hash" - "p" is nil or is not a number');
    }

    if (isNil(m) || !isNumber(m)) {
        throw new Error('Cannot calculate "polynomial rolling hash" - "m" is nil or is not a number');
    }

    if (isNil(stringToHash) || !isString(stringToHash)) {
        throw new Error('Cannot calculate "polynomial rolling hash" - string to be hashed is nil or not an actual string');
    }

    let hashValue = 0;
    let powerOfP = 1;

    for (let charIdx = 0; charIdx < stringToHash.length; charIdx++) {
        const charValue = matchCase ? stringToHash.charCodeAt(charIdx) : stringToHash.charCodeAt(charIdx) - 'a'.charCodeAt(0) + 1;

        hashValue = (hashValue + charValue * powerOfP) % m;
        powerOfP = (powerOfP * p) % m;
    }

    return hashValue;
}

// exports
export {
    polynomialRollingHash,
}