// external imports

// internal imports
import type { GCPGenAIAdminRegisterOptions } from './../../../declarations/registers/gcp/gcp_gen_ai_admin_registry_declarations';
import type { SimpleTextEncryptor } from './../../../declarations/security/crypto/encryptors_declarations';

import SimpleTextEncryptorFactory from './../../../security/crypto/factories/simple_text_encryptor_factory';

import { readJSONFileSync } from '../../../utils/file/server_file_utils';
import { isObjectOfType, cloneDeep } from '../../../utils/primitives/object_utils';
import { isNil, isUndefined, isString } from '../../../utils/misc/logic_utils';

// implementation
class GCPGenAIAdminRegistry {
    private static instance: GCPGenAIAdminRegistry;

    private _options: GCPGenAIAdminRegisterOptions | undefined;
    private constructor() {}

    private static extractGCPGenAIAdminOptionsJSON(): GCPGenAIAdminRegisterOptions {
        if (isNil(process.env.JSEL_GCP_GENAI_ADMIN_OPTIONS_JSON)) {
            throw new RangeError('Cannot extract GCP Gen AI admin options JSON - "JSEL_GCP_GENAI_ADMIN_OPTIONS_JSON" environment variable is not set');
        }

        if (!isNil(process.env.JSEL_GCP_GENAI_ADMIN_OPTIONS_CRYPTO_CONFIG)) {
            const cryptoConfig: SimpleTextEncryptor = JSON.parse(process.env.JSEL_GCP_GENAI_ADMIN_OPTIONS_CRYPTO_CONFIG);
            const encryptorFactory = new SimpleTextEncryptorFactory();
            const encryptor = encryptorFactory.createEncryptor(cryptoConfig.encryptorName);

            return encryptor.decryptJSON<GCPGenAIAdminRegisterOptions>(cryptoConfig.key, process.env.JSEL_GCP_GENAI_ADMIN_OPTIONS_JSON);
        } else {
            return JSON.parse(process.env.JSEL_GCP_GENAI_ADMIN_OPTIONS_JSON);
        }
    }

    public static getInstance(): GCPGenAIAdminRegistry {
        if (!GCPGenAIAdminRegistry.instance) {
            GCPGenAIAdminRegistry.instance = new GCPGenAIAdminRegistry();
        }

        return GCPGenAIAdminRegistry.instance;
    }

    public static loadGCPGenAIAdminOptions(path?: string): GCPGenAIAdminRegisterOptions | undefined {
        if (!isNil(path)) {
            return readJSONFileSync(path);
        }

        if (!isNil(process.env.JSEL_GCP_GENAI_ADMIN_OPTIONS_JSON)) {
            return GCPGenAIAdminRegistry.extractGCPGenAIAdminOptionsJSON();
        }  else {
            return undefined;
        }
    }

    public init() {
        if (isUndefined(this._options)) {
            this._options = GCPGenAIAdminRegistry.loadGCPGenAIAdminOptions();
        }
    }

    get options(): GCPGenAIAdminRegisterOptions {
        return cloneDeep(this._options);
    }

    set options(options: GCPGenAIAdminRegisterOptions) {
        const keysValidators = { key: isString };

        if (!isObjectOfType<GCPGenAIAdminRegisterOptions>(options, keysValidators)) {
            throw new RangeError('Cannot set GCP Gen AI admin options - value must be of type "GCPGenAIAdminRegisterOptions"');
        }

        this._options = options;
    }
}

// exports
export default GCPGenAIAdminRegistry;