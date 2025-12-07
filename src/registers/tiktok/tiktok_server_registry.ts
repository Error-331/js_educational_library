// external imports

// internal imports
import { TikTokServerOptions } from '../../declarations/vendor/tiktok/tiktok_base_server_declarations';
import { SimpleTextEncryptor } from '../../declarations/security/crypto/encryptors_declarations';

import SimpleTextEncryptorFactory from '../../security/crypto/factories/simple_text_encryptor_factory';

import { readJSONFileSync } from '../../utils/file/server_file_utils';
import { isObjectOfType, cloneDeep} from '../../utils/primitives/object_utils';
import { isNil, isUndefined, isString } from '../../utils/misc/logic_utils';

// implementation
class TikTokServerRegistry {
    private static instance: TikTokServerRegistry;

    private _options: TikTokServerOptions | undefined;
    private constructor() {}

    private static extractTikTokServerOptionsJSON(): TikTokServerOptions {
        if (isNil(process.env.JSEL_TIKTOK_SERVER_OPTIONS_JSON)) {
            throw new RangeError('Cannot extract TikTok server options JSON - "JSEL_TIKTOK_SERVER_OPTIONS_JSON" environment variable is not set');
        }

        if (!isNil(process.env.JSEL_TIKTOK_SERVER_OPTIONS_CRYPTO_CONFIG)) {
            const cryptoConfig: SimpleTextEncryptor = JSON.parse(process.env.JSEL_TIKTOK_SERVER_OPTIONS_CRYPTO_CONFIG);
            const encryptorFactory = new SimpleTextEncryptorFactory();
            const encryptor = encryptorFactory.createEncryptor(cryptoConfig.encryptorName);

            return encryptor.decryptJSON<TikTokServerOptions>(cryptoConfig.key, process.env.JSEL_TIKTOK_SERVER_OPTIONS_JSON);
        } else {
            return JSON.parse(process.env.JSEL_TIKTOK_SERVER_OPTIONS_JSON);
        }
    }

    public static getInstance(): TikTokServerRegistry {
        if (!TikTokServerRegistry.instance) {
            TikTokServerRegistry.instance = new TikTokServerRegistry();
        }

        return TikTokServerRegistry.instance;
    }

    public static loadTikTokServerOptions(path?: string): TikTokServerOptions | undefined {
        if (!isNil(path)) {
            return readJSONFileSync(path);
        }

        if (!isNil(process.env.JSEL_TIKTOK_SERVER_OPTIONS_JSON)) {
            return TikTokServerRegistry.extractTikTokServerOptionsJSON();
        }  else {
            return undefined;
        }
    }

    public init() {
        if (isUndefined(this._options)) {
            this._options = TikTokServerRegistry.loadTikTokServerOptions();
        }
    }

    /**
     * Method that returns current TikTok server options which will be used during app initialization.
     *
     * @returns {TikTokServerOptions} base server options.
     *
     */

    get options(): TikTokServerOptions {
        return cloneDeep(this._options);
    }

    set options(options: TikTokServerOptions) {
        const keysValidators = { clientKey: isString, clientSecret: isString, version: isString, oauthRedirectURI: isString };

        if (!isObjectOfType<TikTokServerOptions>(options, keysValidators)) {
            throw new RangeError('Cannot set TikTok server options - value must be of type "TikTokServerOptions"');
        }

        this._options = options;
    }
}

// exports
export default TikTokServerRegistry;