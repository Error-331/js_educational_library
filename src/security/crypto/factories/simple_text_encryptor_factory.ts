// external imports

// internal imports
import {
    CHA_CHA20_POLY1305_BASE64_ENCRYPTOR_NAME,
} from '../../../constants/security/crypto/encryptors_constants';

import ChaCha20Poly1305Base64Encryptor from '../encryptors/cha_cha_20_poly_1305_base64_encryptor';
import { isString } from '../../../utils/misc/logic_utils';

// implementation
class SimpleTextEncryptorFactory {
    public createEncryptor(encryptorName: string) {
        if (!isString(encryptorName)) {
            throw new RangeError('Cannot create simple text encryptor - encryptor name must be of type string');
        }

        switch(encryptorName) {
            case CHA_CHA20_POLY1305_BASE64_ENCRYPTOR_NAME:
                return new ChaCha20Poly1305Base64Encryptor();
            default:
                throw new RangeError(`Cannot create simple text encryptor - encryptor "${encryptorName}" not found`);
        }
    }
}

// exports
export default SimpleTextEncryptorFactory;