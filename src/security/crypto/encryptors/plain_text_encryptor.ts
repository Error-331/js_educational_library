// external imports

// internal imports
import { SimpleAsyncTextEncryptor, SimpleSyncTextDecryptor } from '../../../declarations/security/crypto/encryptors_declarations';

import AbstractEncryptor from './abstract_encryptor';

import { generateRandomString } from '../../../utils/primitives/string/random_string_generation_utils';
import { isObject, isString } from '../../../utils/misc/logic_utils';

// implementation

/**
 * PlainTextEncryptor class is a dummy class which does not encrypts anything and can be use for testing purposes or to specify that some entity should not be encrypted.
 *
 * Usage:
 * - Create an instance of `PlainTextEncryptor`.
 * - Use the `generateKey` method to create a random encryption key.
 * - Encrypt data with `encryptString` or `encryptJSON`.
 * - Decrypt encrypted data with `decryptString` or `decryptJSON`.
 */

class PlainTextEncryptor extends AbstractEncryptor implements SimpleAsyncTextEncryptor, SimpleSyncTextDecryptor {
    /**
     * Generates a random encryption key (random string).
     *
     * @returns {Promise<string>} A promise that resolves to the generated string.
     */

    public async generateKey(): Promise<string> {
        return generateRandomString(5);
    }

    /**
     * Returns back the provided text.
     *
     * @param {string} key - The encryption key.
     * @param {string} text - The plain text message.
     *
     * @throws {RangeError} Throws if the key is not a string.
     * @throws {RangeError} Throws if the text is not a string.
     *
     * @returns {Promise<string>} A promise that resolves to same text as provided.
     */

    public async encryptString(key: string, text: string): Promise<string> {
        if (!isString(key)) {
            throw new RangeError('Cannot encrypt a message using PlainTextEncryptor encryptor - provided key is not a string');
        }

        if (!isString(text)) {
            throw new RangeError('Cannot encrypt a message using PlainTextEncryptor encryptor - provided text is not a string');
        }

        return text;
    }

    /**
     * This method stringifies the JSON object and returns it.
     *
     * @param {string} key - The encryption key.
     * @param {object} json - The JSON object to encrypt.
     *
     * @throws {RangeError} Throws if the provided JSON is not an object.
     *
     * @returns {Promise<string>} A promise that resolves to the stringified JSON.
     */

    public async encryptJSON(key: string, json: object): Promise<string> {
        if (!isObject(json)) {
            throw new RangeError('Cannot encrypt a JSON using PlainTextEncryptor encryptor - provided json is not an object');
        }

        return this.encryptString(key, JSON.stringify(json));
    }

    /**
     * Returns back the provided text
     *
     * @param {string} key - The encryption key.
     * @param {string} text - The plain text.
     *
     * @throws {RangeError} Throws if the key is not a string.
     * @throws {RangeError} Throws if the text is not a string.
     *
     * @returns {string} The decrypted plain text as a UTF-8 string.
     */

    public decryptString(key: string, text: string): string {
        if (!isString(key)) {
            throw new RangeError('Cannot decrypt a message using PlainTextEncryptor encryptor - provided key is not a string');
        }

        if (!isString(text)) {
            throw new RangeError('Cannot decrypt a message using PlainTextEncryptor encryptor - provided text is not a string');
        }

        return text;
    }

    /**
     *
     * This parses the input string into a JSON object.
     *
     * @template DecryptedJSONType - The expected type of the JSON object.
     *
     * @param {string} key - The encryption key.
     * @param {string} text - The stringified JSON.
     *
     * @throws {RangeError} Throws if the key is not a string.
     * @throws {RangeError} Throws if the text is not a string.
     * @throws {SyntaxError} Throws if the decrypted string cannot be parsed as JSON.
     *
     * @returns {DecryptedJSONType} The parsed JSON object.
     */

    public decryptJSON<DecryptedJSONType extends object>(key: string, text: string): DecryptedJSONType {
        return JSON.parse(this.decryptString(key, text));
    }
}

// exports
export default PlainTextEncryptor;