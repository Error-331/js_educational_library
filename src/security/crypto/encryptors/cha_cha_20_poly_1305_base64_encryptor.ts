// external imports
import crypto from 'crypto';
import { Buffer } from 'buffer';

// internal imports
import { SimpleAsyncTextEncryptor, SimpleSyncTextDecryptor } from '../../../declarations/security/crypto_declarations';

import AbstractEncryptor from './abstract_encryptor';
import { isObject, isString } from '../../../utils/misc/logic_utils';

// implementation

/**
 * ChaCha20Poly1305Base64Encryptor class provides methods to securely encrypt and decrypt strings and JSON objects
 * using the ChaCha20-Poly1305 encryption algorithm, with Base64 encoding for the key and resulting data.
 *
 * Key Features:
 * - Generates random encryption keys in Base64 format.
 * - Encrypts plain text strings or JSON objects into Base64-encoded strings.
 * - Decrypts Base64-encoded strings back into plain text or JSON objects.
 * - Supports strong encryption with ChaCha20-Poly1305 and authentication using nonce and authentication tags.
 *
 * Usage:
 * - Create an instance of `ChaCha20Poly1305Base64Encryptor`.
 * - Use the `generateKey` method to create a random encryption key.
 * - Encrypt data with `encryptString` or `encryptJSON`.
 * - Decrypt encrypted data with `decryptString` or `decryptJSON`.
 */

class ChaCha20Poly1305Base64Encryptor extends AbstractEncryptor implements SimpleAsyncTextEncryptor, SimpleSyncTextDecryptor {
    /**
     * Generates a random encryption key for ChaCha20-Poly1305 in Base64 format.
     * The key is a 256-bit (32-byte) random value encoded as a Base64 string.
     *
     * @returns {Promise<string>} A promise that resolves to the generated key as a Base64-encoded string.
     */
    
    public async generateKey(): Promise<string> {
        const key = await ChaCha20Poly1305Base64Encryptor.generateRandomBytes(32);
        return key.toString('base64');
    }
    
    /**
     * Encrypts a provided plain text string using ChaCha20-Poly1305 encryption, returning a Base64-encoded result.
     * The encrypted output includes the nonce, authentication tag, and ciphertext, all concatenated and encoded as Base64.
     *
     * @param {string} key - The encryption key as a Base64-encoded string. Must be a 256-bit (32-byte) key.
     * @param {string} text - The plain text message to encrypt.
     * 
     * @throws {RangeError} Throws if the key is not a string.
     * @throws {RangeError} Throws if the text is not a string.
     * 
     * @returns {Promise<string>} A promise that resolves to the Base64-encoded encrypted string combining the nonce, authentication tag, and ciphertext.
     */
    
    public async encryptString(key: string, text: string): Promise<string> {
        if (!isString(key)) {
            throw new RangeError('Cannot encrypt a message using ChaCha20Poly1305Base64 encryptor - provided key is not a string');
        }

        if (!isString(text)) {
            throw new RangeError('Cannot encrypt a message using ChaCha20Poly1305Base64 encryptor - provided text is not a string');
        }

        const preparedKey = Buffer.from(key, 'base64');
        const nonce = await ChaCha20Poly1305Base64Encryptor.generateRandomBytes(12);
        const cipher = crypto.createCipheriv('chacha20-poly1305', preparedKey, nonce, {
            authTagLength: 16
        });

        const encrypted = Buffer.concat([
            cipher.update(text, 'utf8'),
            cipher.final(),
        ]);

        const tag = cipher.getAuthTag();
        return Buffer.concat([nonce, tag, encrypted]).toString('base64');
    }

    /**
     * Encrypts a provided JSON object using ChaCha20-Poly1305 encryption, returning a Base64-encoded result.
     * This method first stringifies the JSON object and then calls `encryptString` to perform the encryption.
     *
     * @param {string} key - The encryption key as a Base64-encoded string. Must be a 256-bit (32-byte) key.
     * @param {object} json - The JSON object to encrypt.
     *
     * @throws {RangeError} Throws if the provided JSON is not an object.
     *
     * @returns {Promise<string>} A promise that resolves to the Base64-encoded encrypted string.
     */

    public async encryptJSON(key: string, json: object): Promise<string> {
        if (!isObject(json)) {
            throw new RangeError('Cannot encrypt a JSON using ChaCha20Poly1305Base64 encryptor - provided json is not an object');
        }

        return this.encryptString(key, JSON.stringify(json));
    }

    /**
     * Decrypts a provided Base64-encoded encrypted string using ChaCha20-Poly1305 encryption.
     * The input string must include the nonce, authentication tag, and ciphertext,
     * concatenated and encoded in Base64 format.
     *
     * @param {string} key - The encryption key as a Base64-encoded string. Must be a 256-bit (32-byte) key.
     * @param {string} text - The Base64-encoded encrypted string to decrypt.
     *
     * @throws {RangeError} Throws if the key is not a string.
     * @throws {RangeError} Throws if the text is not a string.
     *
     * @returns {string} The decrypted plain text as a UTF-8 string.
     */
    
    public decryptString(key: string, text: string): string {
        if (!isString(key)) {
            throw new RangeError('Cannot decrypt a message using ChaCha20Poly1305Base64 encryptor - provided key is not a string');
        }

        if (!isString(text)) {
            throw new RangeError('Cannot decrypt a message using ChaCha20Poly1305Base64 encryptor - provided text is not a string');
        }

        const preparedKey = Buffer.from(key, 'base64');
        const preparedText = Buffer.from(text, 'base64');

        const nonce = preparedText.slice(0, 12);
        const tag = preparedText.slice(12, 28);
        const ciphertext = preparedText.slice(28);

        const decipher = crypto.createDecipheriv('chacha20-poly1305', preparedKey, nonce, { authTagLength: 16 });
        decipher.setAuthTag(tag);

        const decrypted = Buffer.concat([
            decipher.update(ciphertext, 'utf8'),
            decipher.final(),
        ]);

        return decrypted.toString('utf8');
    }

    /**
     * Decrypts a provided Base64-encoded encrypted string containing a JSON object using ChaCha20-Poly1305 encryption.
     * The input string must include the nonce, authentication tag, and ciphertext,concatenated and encoded in Base64 format.
     *
     * This method decrypts the input string and parses the result into a JSON object.
     *
     * @template DecryptedJSONType - The expected type of the decrypted JSON object.
     *
     * @param {string} key - The encryption key as a Base64-encoded string. Must be a 256-bit (32-byte) key.
     * @param {string} text - The Base64-encoded encrypted string to decrypt.
     *
     * @throws {RangeError} Throws if the key is not a string.
     * @throws {RangeError} Throws if the text is not a string.
     * @throws {SyntaxError} Throws if the decrypted string cannot be parsed as JSON.
     *
     * @returns {DecryptedJSONType} The decrypted and parsed JSON object.
     */
    
    public decryptJSON<DecryptedJSONType extends object>(key: string, text: string): DecryptedJSONType {
        return JSON.parse(this.decryptString(key, text));
    }
}

// exports
export default ChaCha20Poly1305Base64Encryptor;