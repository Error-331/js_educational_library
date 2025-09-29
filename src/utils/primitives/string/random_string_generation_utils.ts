// external imports

// internal imports
import { ALPHANUMERIC_LETTERS_62_EN_ALL } from '../../../constants/string_constants';
import { isNumber } from '../../misc/logic_utils';

// implementation

/**
 * Generates a random string of the specified length using the provided character set.
 * If no character set is provided, a default alphanumeric set is used.
 *
 * @param {number} len - The desired length of the generated string. Must be a non-negative number.
 * @param {string} [charSet] - An optional string representing the set of characters
 *                              to use for generating the random string.
 *                              Defaults to a predefined alphanumeric set if not provided.
 *
 * @throws {RangeError} Throws an error if the length is not a number or if it is negative.
 *
 * @returns {string} A randomly generated string of the given length.
 */

function generateRandomString(len: number, charSet?: string): string {
    if (!isNumber(len)) {
        throw new RangeError('Cannot generate random string - string length must be of type number');
    }

    if (len < 0) {
        throw new RangeError('Cannot generate random string - string length cannot be negative');
    }

    charSet = charSet || ALPHANUMERIC_LETTERS_62_EN_ALL;

    let randomString = '';
    for (let charIdx = 0; charIdx < len; charIdx++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }

    return randomString;
}

/**
 * Generates a pseudo-random UUID (Universally Unique Identifier).
 * This function creates a UUID in the format XXXXXXXX-XXXX-4XXX-YXXX-XXXXXXXXXXXX
 * with the '4' indicating the version and 'Y' following RFC 4122 variant rules.
 *
 * Note: This is not a cryptographically secure method of generating UUIDs
 * and should not be used where true randomness or uniqueness is required.
 *
 * @returns {string} A pseudo-randomly generated UUID string.
 */
function generateAlmostRandomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (currentChar: string)=> {
        const newCharNumber = Math.random() * 16 | 0;
        return (currentChar == 'x' ? newCharNumber : (newCharNumber & 0x3 | 0x8)).toString(16);
    });
}

// exports
export {
    generateRandomString,
    generateAlmostRandomUUID,
}