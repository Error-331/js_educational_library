// external imports

// internal imports
import { CHA_CHA20_POLY1305_BASE64_ENCRYPTOR_NAME } from '../../../src/constants/security/crypto/encryptors_constants';

import SimpleTextEncryptorFactory from '../../../src/security/crypto/factories/simple_text_encryptor_factory';

// implementation
const encryptorFactory = new SimpleTextEncryptorFactory();
const encryptor = encryptorFactory.createEncryptor(CHA_CHA20_POLY1305_BASE64_ENCRYPTOR_NAME);

const encryptionKey = await encryptor.generateKey();
console.log('Encryption key: ', encryptionKey);

// exports