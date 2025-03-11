// external imports

// internal imports
import { isNil, isNumber, isString, isBoolean } from '../misc/logic_utils';

// implementation
function calcPolynomialRollingHashPowerOfP(p, m, pIdx = 0) {
    if (isNil(p) || !isNumber(p)) {
        throw new Error('Cannot calculate power of "p" - "p" is nil or is not a number');
    }

    if (isNil(m) || !isNumber(m)) {
        throw new Error('Cannot calculate power of "p" - "m" is nil or is not a number');
    }

    if (isNil(pIdx) || !isNumber(pIdx)) {
        throw new Error('Cannot calculate power of "p" - "index" is nil or is not a number');
    }

    if (pIdx < 0) {
        throw new Error('Cannot calculate power of "p" - "index" cannot be less than 0');
    }

    let powerOfP = 1;

    for (let charIdx = 0; charIdx < pIdx; charIdx++) {
        powerOfP = (powerOfP * p) % m;
    }

    return powerOfP;
}

function calcPolynomialRollingHashData(matchCase, p, m, stringToHash) {
    if (isNil(matchCase) || !isBoolean(matchCase)) {
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

    const stringToHashLength = stringToHash.length;
    const hashes = new Array(stringToHashLength).fill(0);
    const powersOfP = new Array(stringToHashLength).fill(0);

    let hashValue = 0;
    let powerOfP = 1;

    for (let charIdx = 0; charIdx < stringToHashLength; charIdx++) {
        const charValue = matchCase ? stringToHash.charCodeAt(charIdx) : stringToHash.charCodeAt(charIdx) - 'a'.charCodeAt(0) + 1;
        powersOfP[charIdx] = powerOfP;

        hashValue = (hashValue + charValue * powerOfP) % m;
        hashes[charIdx] = hashValue;

        powerOfP = (powerOfP * p) % m;
    }

    return { hashes, powersOfP };
}

function calcPolynomialRollingHash(matchCase, p, m, stringToHash) {
    const hashes = calcPolynomialRollingHashData(matchCase, p, m, stringToHash).hashes;
    return hashes[hashes.length - 1];
}

function calcSubstringPolynomialRollingHash(m, l, r, prefixHashes, powersOfP) {
    const hashLtoR = prefixHashes[r];
    const hashBeforeL = l > 0 ? prefixHashes[l - 1] : 0;
    const substringHash = (hashLtoR - (hashBeforeL * powersOfP[r - l + 1]) % m + m) % m;

    return substringHash;
}

// exports
export {
    calcPolynomialRollingHashPowerOfP,
    calcPolynomialRollingHashData,
    calcPolynomialRollingHash,
    calcSubstringPolynomialRollingHash,
}