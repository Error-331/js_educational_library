// external imports

// internal imports
import ChaCha20Poly1305Base64Encryptor from '../../../src/security/crypto/cha_cha_20_poly_1305_base64_encryptor';

import {
    textToEncrypt1,
    textToEncrypt2,
    textToEncrypt3,

    objectToEncrypt1,
    objectToEncrypt2,
    objectToEncrypt3,
} from './common_crypto_test_data'

// implementation
describe('ChaCha20Poly1305Base64 encryptor class tests...', () => {
    describe('String encryption tests tests...', () => {
        test('Should encrypt a string and decrypt it back - case 1...', async () => {
            const encryptor = new ChaCha20Poly1305Base64Encryptor();
            const key = await encryptor.generateKey();

            const encryptedText = await encryptor.encryptString(key, textToEncrypt1);
            expect(encryptedText).not.toEqual(textToEncrypt1);

            const decryptedText = encryptor.decryptString(key, encryptedText);
            expect(decryptedText).not.toEqual(encryptedText);
            expect(decryptedText).toEqual(textToEncrypt1);
        });

        test('Should encrypt a string and decrypt it back - case 2...', async () => {
            const encryptor = new ChaCha20Poly1305Base64Encryptor();
            const key = await encryptor.generateKey();

            const encryptedText = await encryptor.encryptString(key, textToEncrypt2);
            expect(encryptedText).not.toEqual(textToEncrypt2);

            const decryptedText = encryptor.decryptString(key, encryptedText);
            expect(decryptedText).not.toEqual(encryptedText);
            expect(decryptedText).toEqual(textToEncrypt2);
        });

        test('Should encrypt a string and decrypt it back - case 3...', async () => {
            const encryptor = new ChaCha20Poly1305Base64Encryptor();
            const key = await encryptor.generateKey();

            const encryptedText = await encryptor.encryptString(key, textToEncrypt3);
            expect(encryptedText).not.toEqual(textToEncrypt3);

            const decryptedText = encryptor.decryptString(key, encryptedText);
            expect(decryptedText).not.toEqual(encryptedText);
            expect(decryptedText).toEqual(textToEncrypt3);
        });
    });

    describe('JSON encryption tests tests...', () => {
        test('Should encrypt an object and decrypt it back - case 1...', async () => {
            const encryptor = new ChaCha20Poly1305Base64Encryptor();
            const key = await encryptor.generateKey();

            const encryptedObject = await encryptor.encryptJSON(key, objectToEncrypt1);
            expect(typeof encryptedObject).toBe('string');

            const decryptedObject = encryptor.decryptJSON(key, encryptedObject);
            expect(typeof decryptedObject).toBe('object');
            expect(decryptedObject).toStrictEqual(objectToEncrypt1);
        });

        test('Should encrypt an object and decrypt it back - case 2...', async () => {
            const encryptor = new ChaCha20Poly1305Base64Encryptor();
            const key = await encryptor.generateKey();

            const encryptedObject = await encryptor.encryptJSON(key, objectToEncrypt2);
            expect(typeof encryptedObject).toBe('string');

            const decryptedObject = encryptor.decryptJSON(key, encryptedObject);
            expect(typeof decryptedObject).toBe('object');
            expect(decryptedObject).toStrictEqual(objectToEncrypt2);
        });

        test('Should encrypt an object and decrypt it back - case 3...', async () => {
            const encryptor = new ChaCha20Poly1305Base64Encryptor();
            const key = await encryptor.generateKey();

            const encryptedObject = await encryptor.encryptJSON(key, objectToEncrypt3);
            expect(typeof encryptedObject).toBe('string');

            const decryptedObject = encryptor.decryptJSON(key, encryptedObject);
            expect(typeof decryptedObject).toBe('object');
            expect(decryptedObject).toStrictEqual(objectToEncrypt3);
        });
    });
});

// exports