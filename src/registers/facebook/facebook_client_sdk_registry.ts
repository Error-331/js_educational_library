// external imports

// internal imports
import {
    FacebookClientSDKRegistryOptions,
    FacebookClientSDKLoginOptions,
    FacebookClientSDKAuthUserResponse,
} from '../../declarations/vendor/facebook_declarations';

import { throwIfWindowNotAvailable } from '../../utils/browser/base_utils';

import { cloneDeep, isObjectOfType } from '../../utils/primitives/object_utils';
import { isString } from '../../utils/misc/logic_utils';

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
                    console.log('login resp', response);
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
        window.FB.init(this._options);

        this._isInit = true;
    }

    /**
     * Method that returns current Facebook SDK options which will be used during app initialization.
     *
     * @returns {FacebookClientSDKRegistryOptions} SDK options.
     *
     */

    get options(): FacebookClientSDKRegistryOptions {
        return cloneDeep(this._options);
    }

    set options(options: FacebookClientSDKRegistryOptions) {
        const keysValidators = { appId: isString, version: isString };

        if (!isObjectOfType<FacebookClientSDKRegistryOptions>(options, keysValidators)) {
            throw new RangeError('Cannot set Facebook SDK options - value must be of type "FacebookClientSDKRegistryOptions"');
        }

        this._options = options;
    }
}

// exports
export default FacebookClientSDKRegistry;