// external imports

// internal imports
import {
    PLAIN_TEXT_ENCRYPTOR_NAME,
    CHA_CHA20_POLY1305_BASE64_ENCRYPTOR_NAME,
} from '../../../src/constants/security/crypto/encryptors_constants';

import SimpleTextEncryptorFactory from '../../../src/security/crypto/factories/simple_text_encryptor_factory';

// implementation
const encryptedText = 'OhMqiaM2COduwJ2QWYVs8bNmOQvJYNBn2hXdJtzF9po7TLmygXVdaE2E6TIkMAriFX4Eb5R3X8nXYjLSBsRhmy8ccJfd8A0/KdpB9w2FPPPgGOXnGKdrIDrLDuBu/RsPtFFicIdylx/x+VmDlrusfbbjPeYKmfNSDw==';
const key = 'mya6wdh29AOx2x6zf70PEiWCYfe08gPRCcqJ/mygbGg=';

const encryptorFactory = new SimpleTextEncryptorFactory();
const encryptor = encryptorFactory.createEncryptor(CHA_CHA20_POLY1305_BASE64_ENCRYPTOR_NAME);

const decryptedJSON = encryptor.decryptJSON(key, encryptedText);
console.log('Decrypted JSON: ', decryptedJSON);

// exports