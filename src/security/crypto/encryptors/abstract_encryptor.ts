// external imports
import { randomBytes } from 'crypto';
import { promisify } from 'util';

// internal imports

// implementation
class AbstractEncryptor {
    private static randomBytes = promisify(randomBytes);

    public static generateRandomBytes(numberOfBytes: number): Promise<Buffer> {
        return AbstractEncryptor.randomBytes(numberOfBytes)
    }
}

// exports
export default AbstractEncryptor;