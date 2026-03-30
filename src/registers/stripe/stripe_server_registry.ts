// external imports
import stripe from 'stripe';

// internal imports
import type { StripeServerOptions } from '../../declarations/vendor/stripe/stripe_base_server_declarations';
import type { SimpleTextEncryptor } from '../../declarations/security/crypto/encryptors_declarations';

import SimpleTextEncryptorFactory from '../../security/crypto/factories/simple_text_encryptor_factory';

import { readJSONFileSync } from '../../utils/file/server_file_utils';
import { isObjectOfType, cloneDeep } from '../../utils/primitives/object_utils';
import { isNil, isUndefined, isString } from '../../utils/misc/logic_utils';

// implementation
class StripeServerRegistry {
    private static instance: StripeServerRegistry;

    private _options: StripeServerOptions | undefined;
    private _stripInstance: stripe | null = null;

    private constructor() {}

    private static extractStripeServerOptionsJSON(): StripeServerOptions {
        if (isNil(process.env.JSEL_STRIPE_SERVER_OPTIONS_JSON)) {
            throw new RangeError('Cannot extract Stripe server options JSON - "JSEL_STRIPE_SERVER_OPTIONS_JSON" environment variable is not set');
        }

        if (!isNil(process.env.JSEL_STRIPE_SERVER_OPTIONS_CRYPTO_CONFIG)) {
            const cryptoConfig: SimpleTextEncryptor = JSON.parse(process.env.JSEL_STRIPE_SERVER_OPTIONS_CRYPTO_CONFIG);
            const encryptorFactory = new SimpleTextEncryptorFactory();
            const encryptor = encryptorFactory.createEncryptor(cryptoConfig.encryptorName);

            return encryptor.decryptJSON<StripeServerOptions>(cryptoConfig.key, process.env.JSEL_STRIPE_SERVER_OPTIONS_JSON);
        } else {
            return JSON.parse(process.env.JSEL_STRIPE_SERVER_OPTIONS_JSON);
        }
    }

    public static getInstance(): StripeServerRegistry {
        if (!StripeServerRegistry.instance) {
            StripeServerRegistry.instance = new StripeServerRegistry();
        }

        return StripeServerRegistry.instance;
    }

    public static loadStripeServerOptions(path?: string): StripeServerOptions | undefined {
        if (!isNil(path)) {
            return readJSONFileSync(path);
        }

        if (!isNil(process.env.JSEL_STRIPE_SERVER_OPTIONS_JSON)) {
            return StripeServerRegistry.extractStripeServerOptionsJSON();
        }  else {
            return undefined;
        }
    }

    public init() {
        if (isUndefined(this._options)) {
            this._options = StripeServerRegistry.loadStripeServerOptions();
        }
    }

    /**
     * Method that returns current Stripe server options which will be used during app initialization.
     *
     * @returns {StripeServerOptions} base server options.
     *
     */

    get options(): StripeServerOptions {
        return cloneDeep(this._options);
    }

    get stripeInstance(): stripe {
        if (isNil(this._stripInstance)) {
            this._stripInstance = stripe(this._options.secretKey);
        }

        return this._stripInstance;
    }

    set options(options: StripeServerOptions) {
        const keysValidators = { publishableKey: isString, secretKey: isString };

        if (!isObjectOfType<StripeServerOptions>(options, keysValidators)) {
            throw new RangeError('Cannot set Stripe server options - value must be of type "StripeServerOptions"');
        }

        this._options = options;
    }
}

// exports
export default StripeServerRegistry;