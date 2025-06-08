// external imports

// internal imports

// implementation
interface SimpleAsyncTextEncryptor {
    encryptString(key: string, text: string): Promise<string>;
    encryptJSON(key: string, json: object): Promise<string>;
}

interface SimpleSyncTextDecryptor {
    decryptString(key: string, text: string): string;
    decryptJSON<DecryptedJSONType extends object>(key: string, text: string): DecryptedJSONType;
}

// exports
export {
    SimpleAsyncTextEncryptor,
    SimpleSyncTextDecryptor,
}