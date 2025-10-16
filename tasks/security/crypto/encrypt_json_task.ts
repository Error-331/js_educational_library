// external imports

// internal imports
import {
    PLAIN_TEXT_ENCRYPTOR_NAME,
    CHA_CHA20_POLY1305_BASE64_ENCRYPTOR_NAME,
} from '../../../src/constants/security/crypto/encryptors_constants';

import SimpleTextEncryptorFactory from '../../../src/security/crypto/factories/simple_text_encryptor_factory';

// implementation
const jsonEncrypt = {
    appId: '',
    appSecret: '',
    version: ''
};

const key = '';

const encryptorFactory = new SimpleTextEncryptorFactory();
const encryptor = encryptorFactory.createEncryptor(CHA_CHA20_POLY1305_BASE64_ENCRYPTOR_NAME);

encryptor.encryptJSON(key, jsonEncrypt).then((encryptedJSON) => {
    console.log('Encrypted JSON: ', encryptedJSON);
});

// exports