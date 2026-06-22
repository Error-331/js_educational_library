// external imports

// internal imports
import type { CivitAIServerOptions } from '../../declarations/vendor/civitai/civitai_base_server_declarations';

import { SimpleTextEncryptor } from '../../declarations/security/crypto/encryptors_declarations';
import SimpleTextEncryptorFactory from '../../security/crypto/factories/simple_text_encryptor_factory';

import { readJSONFileSync } from '../../utils/file/server_file_utils';
import { isObjectOfType, cloneDeep } from '../../utils/primitives/object_utils';
import { isNil, isUndefined, isString } from '../../utils/misc/logic_utils';

// implementation
class CivitAIServerRegistry {
    private static instance: CivitAIServerRegistry;

    private _options: CivitAIServerOptions | undefined;
    private constructor() {}

    private static extractCivitAIServerOptionsJSON(): CivitAIServerOptions {
        if (isNil(process.env.JSEL_CIVITAI_SERVER_OPTIONS_JSON)) {
            throw new RangeError('Cannot extract CivitAI server options JSON - "JSEL_CIVITAI_SERVER_OPTIONS_JSON" environment variable is not set');
        }

        if (!isNil(process.env.JSEL_CIVITAI_SERVER_OPTIONS_CRYPTO_CONFIG)) {
            const cryptoConfig: SimpleTextEncryptor = JSON.parse(process.env.JSEL_CIVITAI_SERVER_OPTIONS_CRYPTO_CONFIG);
            const encryptorFactory = new SimpleTextEncryptorFactory();
            const encryptor = encryptorFactory.createEncryptor(cryptoConfig.encryptorName);

            return encryptor.decryptJSON<CivitAIServerOptions>(cryptoConfig.key, process.env.JSEL_CIVITAI_SERVER_OPTIONS_JSON);
        } else {
            return JSON.parse(process.env.JSEL_CIVITAI_SERVER_OPTIONS_JSON);
        }
    }

    /**
     * Method returns current (and only) instance of the class.
     *
     * @static
     *
     * @returns {CivitAIServerRegistry} current instance of the class.
     *
     */

    public static getInstance(): CivitAIServerRegistry {
        if (!CivitAIServerRegistry.instance) {
            CivitAIServerRegistry.instance = new CivitAIServerRegistry();
        }

        return CivitAIServerRegistry.instance;
    }

    public static loadCivitaiServerOptions(path?: string): CivitAIServerOptions | undefined {
        if (!isNil(path)) {
            return readJSONFileSync(path);
        }

        if (!isNil(process.env.JSEL_CIVITAI_SERVER_OPTIONS_JSON)) {
            return CivitAIServerRegistry.extractCivitAIServerOptionsJSON();
        }  else {
            return undefined;
        }
    }

    public init() {
        if (isUndefined(this._options)) {
            this._options = CivitAIServerRegistry.loadCivitaiServerOptions();

            if (isNil(this._options)) {
                throw new Error('Cannot initialize CivitAI server registry - cannot load options')
            }
        }
    }

    /**
     * Method that returns current CivitAI server options which will be used during app initialization.
     *
     * @returns {CivitAIServerOptions} base server options.
     *
     */

    get options(): CivitAIServerOptions {
        this.init();
        return cloneDeep(this._options);
    }

    get apiToken(): string {
        this.init();
        return this._options.apiToken;
    }

    set options(options: CivitAIServerOptions) {
        const keysValidators = { apiToken: isString, version: isString };

        if (!isObjectOfType<CivitAIServerOptions>(options, keysValidators)) {
            throw new RangeError('Cannot set CivitAI server options - value must be of type "CivitAIServerOptions"');
        }

        this._options = options;
    }
}

// exports
export default CivitAIServerRegistry;