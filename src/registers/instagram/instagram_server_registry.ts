// external imports

// internal imports
import type { InstagramServerOptions } from '../../declarations/vendor/instagram/instagram_base_server_declarations';
import type { SimpleTextEncryptor } from '../../declarations/security/crypto/encryptors_declarations';

import SimpleTextEncryptorFactory from '../../security/crypto/factories/simple_text_encryptor_factory';

import { readJSONFileSync } from '../../utils/file/server_file_utils';
import { isObjectOfType, cloneDeep } from '../../utils/primitives/object_utils';
import { isNil, isUndefined, isString } from '../../utils/misc/logic_utils';

// implementation
class InstagramServerRegistry {
    private static instance: InstagramServerRegistry;

    private _options: InstagramServerOptions | undefined;
    private constructor() {}

    private static extractInstagramServerOptionsJSON(): InstagramServerOptions {
        if (isNil(process.env.JSEL_INSTAGRAM_SERVER_OPTIONS_JSON)) {
            throw new RangeError('Cannot extract Instagram server options JSON - "JSEL_INSTAGRAM_SERVER_OPTIONS_JSON" environment variable is not set');
        }

        if (!isNil(process.env.JSEL_INSTAGRAM_SERVER_OPTIONS_CRYPTO_CONFIG)) {
            const cryptoConfig: SimpleTextEncryptor = JSON.parse(process.env.JSEL_INSTAGRAM_SERVER_OPTIONS_CRYPTO_CONFIG);
            const encryptorFactory = new SimpleTextEncryptorFactory();
            const encryptor = encryptorFactory.createEncryptor(cryptoConfig.encryptorName);

            return encryptor.decryptJSON<InstagramServerOptions>(cryptoConfig.key, process.env.JSEL_INSTAGRAM_SERVER_OPTIONS_JSON);
        } else {
            return JSON.parse(process.env.JSEL_INSTAGRAM_SERVER_OPTIONS_JSON);
        }
    }

    public static getInstance(): InstagramServerRegistry {
        if (!InstagramServerRegistry.instance) {
            InstagramServerRegistry.instance = new InstagramServerRegistry();
        }

        return InstagramServerRegistry.instance;
    }

    public static loadInstagramServerOptions(path?: string): InstagramServerOptions | undefined {
        if (!isNil(path)) {
            return readJSONFileSync(path);
        }

        if (!isNil(process.env.JSEL_INSTAGRAM_SERVER_OPTIONS_JSON)) {
            return InstagramServerRegistry.extractInstagramServerOptionsJSON();
        }  else {
            return undefined;
        }
    }

    public init() {
        if (isUndefined(this._options)) {
            this._options = InstagramServerRegistry.loadInstagramServerOptions();
        }
    }

    /**
     * Method that returns current Instagram server options which will be used during app initialization.
     *
     * @returns {InstagramServerOptions} base server options.
     *
     */

    get options(): InstagramServerOptions {
        return cloneDeep(this._options);
    }

    set options(options: InstagramServerOptions) {
        const keysValidators = { version: isString };

        if (!isObjectOfType<InstagramServerOptions>(options, keysValidators)) {
            throw new RangeError('Cannot set Instagram server options - value must be of type "InstagramServerOptions"');
        }

        this._options = options;
    }
}

// exports
export default InstagramServerRegistry;