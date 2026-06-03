// external imports
import type { Genkit, GenkitOptions } from 'genkit';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// internal imports
import type { GCPGenkitAIRegistryOptions } from '../../../declarations/registers/gcp/gcp_genkit_ai_registry_declarations';
import type { SimpleTextEncryptor } from '../../../declarations/security/crypto/encryptors_declarations';

import { AI_PROMPT_LIBRARY_PATH } from '../../../constants/ai/common_ai_constants';

import SimpleTextEncryptorFactory from '../../../security/crypto/factories/simple_text_encryptor_factory';
import { isNil, isString, isArray, isFunction } from '../../../utils/misc/logic_utils';

// implementation
class GCPGenkitAIRegistry {
    private static instance: GCPGenkitAIRegistry;
    private _ai: Genkit | null = null;

    private _promptDir: string = AI_PROMPT_LIBRARY_PATH;
    private _plugins: GenkitOptions['plugins'] = [];

    private static parseGenAIEnvConfig(): GCPGenkitAIRegistryOptions {
        if (isNil(process.env.JSEL_GCP_GENAI_ADMIN_OPTIONS_JSON)) {
            throw new RangeError('Cannot extract GCP Gen AI admin options JSON - "JSEL_GCP_GENAI_ADMIN_OPTIONS_JSON" environment variable is not set');
        }

        if (!isNil(process.env.JSEL_GCP_GENAI_ADMIN_OPTIONS_CRYPTO_CONFIG)) {
            const cryptoConfig: SimpleTextEncryptor = JSON.parse(process.env.JSEL_GCP_GENAI_ADMIN_OPTIONS_CRYPTO_CONFIG);
            const encryptorFactory = new SimpleTextEncryptorFactory();
            const encryptor = encryptorFactory.createEncryptor(cryptoConfig.encryptorName);

            return encryptor.decryptJSON<GCPGenkitAIRegistryOptions>(cryptoConfig.key, process.env.JSEL_GCP_GENAI_ADMIN_OPTIONS_JSON);
        } else {
            return JSON.parse(process.env.JSEL_GCP_GENAI_ADMIN_OPTIONS_JSON);
        }
    }

    public static prepareGoogleAIConfig() {
        const genAIEnvConfig = this.parseGenAIEnvConfig();
        return googleAI(genAIEnvConfig);
    }

    private constructor() {}

    private init() {
        if (isNil(this._ai)) {
            this._ai = genkit({
                promptDir: this._promptDir,

                plugins: [
                    ...this._plugins,
                ],
            });
        }
    }

    public static getInstance(): GCPGenkitAIRegistry {
        if (!GCPGenkitAIRegistry.instance) {
            GCPGenkitAIRegistry.instance = new GCPGenkitAIRegistry();
        }

        return GCPGenkitAIRegistry.instance;
    }

    public async listAllPrompts() {
        const genkitRegistryInstance = GCPGenkitAIRegistry.getInstance();
        const actions = await genkitRegistryInstance.ai.registry.listActions();

        const promptsList = [];

        for (const actionKey in actions) {
            if (isFunction(actions[actionKey]) && actions[actionKey]?.__action?.actionType === 'prompt') {
                promptsList.push(actions[actionKey]);
            }
        }

        return promptsList;
    }

    get ai(): Genkit {
        this.init();

        if (isNil(this._ai)) {
            throw new Error(`Cannot init GenKit AI - unknown error`);
        }

        return this._ai;
    }

    set plugins(plugins: GenkitOptions['plugins']) {
        if (!isArray(plugins)) {
            throw new RangeError('Cannot set Genkit AI plugins - value must be of type array');
        }

        this._plugins = plugins;
    }

    set promptDir(promptDir: string) {
        if (!isString(promptDir)) {
            throw new RangeError('Cannot set Genkit AI prompt directory - value must be of type string');
        }

        this._promptDir = promptDir
    }
}

// exports
export default GCPGenkitAIRegistry;