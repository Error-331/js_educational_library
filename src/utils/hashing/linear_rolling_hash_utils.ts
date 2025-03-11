// external imports

// internal imports
import { isNil, isNumber, isString, isBoolean } from '../misc/logic_utils';

// implementation
function calcLinearHashData(matchCase: boolean, p: number, m: number, stringToHash: string) {
    if (isNil(matchCase) || !isBoolean(matchCase)) {
        throw new RangeError('Cannot calculate "linear hash" - "matchCase" flag is nil or is not boolean');
    }

    if (isNil(p) || !isNumber(p)) {
        throw new RangeError('Cannot calculate "linear hash" - "p" is nil or is not a number');
    }

    if (isNil(m) || !isNumber(m)) {
        throw new RangeError('Cannot calculate "linear hash" - "m" is nil or is not a number');
    }

    if (isNil(stringToHash) || !isString(stringToHash)) {
        throw new RangeError('Cannot calculate "linear hash" - string to be hashed is nil or not an actual string');
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

/**
 * Function that calculates linear hash for the string.
 *
 * @param {boolean} matchCase - indicates whether to use uppercase characters codes or use only the lowercase ones.
 * @param {number} p - prime number.
 * @param {number} m - upper limit/range of the hash function.
 * @param {string} stringToHash - string which hash needs to be calculated
 *
 * @throws {RangeError} if either of provided parameters is of wrong type or is nil.
 *
 * @returns {number} hash for the provided string.
 *
 */
function calcLinearHash(matchCase: boolean, p: number, m: number, stringToHash: string) {
    const hashes = calcLinearHashData(matchCase, p, m, stringToHash).hashes;
    return hashes[hashes.length - 1];
}

// exports
export {
    calcLinearHashData,
    calcLinearHash,
}