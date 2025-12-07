// external imports

// internal imports
import { FacebookServerOptions } from '../../declarations/vendor/facebook/facebook_base_server_declarations';
import { SimpleTextEncryptor } from '../../declarations/security/crypto/encryptors_declarations';

import SimpleTextEncryptorFactory from '../../security/crypto/factories/simple_text_encryptor_factory';

import { readJSONFileSync } from '../../utils/file/server_file_utils';
import { isObjectOfType, cloneDeep} from '../../utils/primitives/object_utils';
import { isNil, isUndefined, isString } from '../../utils/misc/logic_utils';

// implementation
class FacebookServerRegistry {
    private static instance: FacebookServerRegistry;

    private _options: FacebookServerOptions | undefined;
    private constructor() {}

    private static extractFacebookServerOptionsJSON(): FacebookServerOptions {
        if (isNil(process.env.JSEL_FACEBOOK_SERVER_OPTIONS_JSON)) {
            throw new RangeError('Cannot extract Facebook server options JSON - "JSEL_FACEBOOK_SERVER_OPTIONS_JSON" environment variable is not set');
        }

        if (!isNil(process.env.JSEL_FACEBOOK_SERVER_OPTIONS_CRYPTO_CONFIG)) {
            const cryptoConfig: SimpleTextEncryptor = JSON.parse(process.env.JSEL_FACEBOOK_SERVER_OPTIONS_CRYPTO_CONFIG);
            const encryptorFactory = new SimpleTextEncryptorFactory();
            const encryptor = encryptorFactory.createEncryptor(cryptoConfig.encryptorName);

            return encryptor.decryptJSON<FacebookServerOptions>(cryptoConfig.key, process.env.JSEL_FACEBOOK_SERVER_OPTIONS_JSON);
        } else {
            return JSON.parse(process.env.JSEL_FACEBOOK_SERVER_OPTIONS_JSON);
        }
    }

    public static getInstance(): FacebookServerRegistry {
        if (!FacebookServerRegistry.instance) {
            FacebookServerRegistry.instance = new FacebookServerRegistry();
        }

        return FacebookServerRegistry.instance;
    }

    public static loadFacebookServerOptions(path?: string): FacebookServerOptions | undefined {
        if (!isNil(path)) {
            return readJSONFileSync(path);
        }

        if (!isNil(process.env.JSEL_FACEBOOK_SERVER_OPTIONS_JSON)) {
            return FacebookServerRegistry.extractFacebookServerOptionsJSON();
        }  else {
            return undefined;
        }
    }

    public init() {
        if (isUndefined(this._options)) {
            this._options = FacebookServerRegistry.loadFacebookServerOptions();
        }
    }

    /**
     * Method that returns current Facebook server options which will be used during app initialization.
     *
     * @returns {FacebookServerOptions} base server options.
     *
     */

    get options(): FacebookServerOptions {
        return cloneDeep(this._options);
    }

    set options(options: FacebookServerOptions) {
        const keysValidators = { appId: isString, appSecret: isString, version: isString };

        if (!isObjectOfType<FacebookServerOptions>(options, keysValidators)) {
            throw new RangeError('Cannot set Facebook server options - value must be of type "FacebookServerOptions"');
        }

        this._options = options;
    }
}

// exports
export default FacebookServerRegistry;