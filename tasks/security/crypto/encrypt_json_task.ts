// external imports

// internal imports
import {
    PLAIN_TEXT_ENCRYPTOR_NAME,
    CHA_CHA20_POLY1305_BASE64_ENCRYPTOR_NAME,
} from '../../../src/constants/security/crypto/encryptors_constants';

import SimpleTextEncryptorFactory from '../../../src/security/crypto/factories/simple_text_encryptor_factory';

// implementation
const jsonEncrypt = {
    appId: '1317118642658286',
    appSecret: '5875a987e72d9fbf7e8a0f0e91f7d042',
    version: 'v23.0'
};

const key = 'mya6wdh29AOx2x6zf70PEiWCYfe08gPRCcqJ/mygbGg=';

const encryptorFactory = new SimpleTextEncryptorFactory();
const encryptor = encryptorFactory.createEncryptor(CHA_CHA20_POLY1305_BASE64_ENCRYPTOR_NAME);

encryptor.encryptJSON(key, jsonEncrypt).then((encryptedJSON) => {
    console.log('Encrypted JSON: ', encryptedJSON);
});

// exports