// external imports

// internal imports
import {
    PLAIN_TEXT_ENCRYPTOR_NAME,
    CHA_CHA20_POLY1305_BASE64_ENCRYPTOR_NAME,
} from '../../../src/constants/security/crypto/encryptors_constants';

import SimpleTextEncryptorFactory from '../../../src/security/crypto/factories/simple_text_encryptor_factory';

// implementation
const encryptedText = '';
const key = '';

const encryptorFactory = new SimpleTextEncryptorFactory();
const encryptor = encryptorFactory.createEncryptor(CHA_CHA20_POLY1305_BASE64_ENCRYPTOR_NAME);

const decryptedJSON = encryptor.decryptJSON(key, encryptedText);
console.log('Decrypted JSON: ', decryptedJSON);

// exports