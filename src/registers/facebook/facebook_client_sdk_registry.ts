// external imports

// internal imports
import {
    FacebookClientSDKRegistryOptions,
    FacebookClientSDKLoginOptions,
    FacebookClientSDKAuthUserResponse,
} from '../../declarations/vendor/facebook/facebook_base_client_declarations';

import { FACEBOOK_GRAPH_API_DEFAULT_VERSION } from '../../constants/net/api/facebook/facebook_common_constants';

import { throwIfWindowNotAvailable } from '../../utils/browser/base_utils';

import { cloneDeep, isObjectOfType } from '../../utils/primitives/object_utils';
import { isNil, isString } from '../../utils/misc/logic_utils';

// implementation
// https://developers.facebook.com/docs/javascript
class FacebookClientSDKRegistry {
    private static instance: FacebookClientSDKRegistry;

    private _isInit: boolean = false;
    private _options: FacebookClientSDKRegistryOptions;

    private constructor() {}

    public async getLoginStatus(): Promise<FacebookClientSDKAuthUserResponse> {
        this.init();
        throwIfWindowNotAvailable();

        return new Promise((resolve, reject) => {
            try {
                window.FB.getLoginStatus(resolve);
            } catch (error: unknown) {
                reject(error);
            }
        });
    }

    public async login(options?: FacebookClientSDKLoginOptions): Promise<FacebookClientSDKAuthUserResponse> {
        this.init();
        throwIfWindowNotAvailable();

        return new Promise<FacebookClientSDKAuthUserResponse>((resolve, reject) => {
            try {
                window.FB.login((response: FacebookClientSDKAuthUserResponse) => {
                    resolve(response);
                }, options)
            } catch (error: unknown) {
                reject(error);
            }
        });
    }

    public async logout(): Promise<void> {
        this.init();
        throwIfWindowNotAvailable();

        return new Promise<void>((resolve, reject) => {
            try {
                window.FB.logout(() => {
                    resolve();
                });
            } catch (error: unknown) {
                reject(error);
            }
        });
    }

    /**
     * Method returns current (and only) instance of the class.
     *
     * @static
     *
     * @returns {FacebookClientSDKRegistry} current instance of the class.
     *
     */

    public static getInstance(): FacebookClientSDKRegistry {
        if (!FacebookClientSDKRegistry.instance) {
            FacebookClientSDKRegistry.instance = new FacebookClientSDKRegistry();
        }

        return FacebookClientSDKRegistry.instance;
    }

    public init(): void {
        if (this._isInit) {
            return;
        }

        throwIfWindowNotAvailable();
        window.FB.init(this.options);

        this._isInit = true;
    }

    /**
     * Method that returns current Facebook SDK options which will be used during app initialization.
     *
     * @returns {FacebookClientSDKRegistryOptions} SDK options.
     *
     */

    get options(): FacebookClientSDKRegistryOptions {
        const options = cloneDeep(this._options);

        if (isNil(options.version)) {
            options.version = FACEBOOK_GRAPH_API_DEFAULT_VERSION;
        }

        return options;
    }

    set options(options: FacebookClientSDKRegistryOptions) {
        const keysValidators = { appId: isString };

        if (!isObjectOfType<FacebookClientSDKRegistryOptions>(options, keysValidators)) {
            throw new RangeError('Cannot set Facebook SDK options - value must be of type "FacebookClientSDKRegistryOptions"');
        }

        this._options = options;
    }
}

// exports
export default FacebookClientSDKRegistry;