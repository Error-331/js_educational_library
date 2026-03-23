// external imports

// internal imports
import type { GenericObject } from '../../../../../declarations/collection_declarations';
import type { AuthorizationOAuthStrategy } from '../../../../../declarations/security/authorization/general_authorization_declarations';
import type { InstagramAuthorizationCodeRetrievalOptions } from '../../../../../declarations/security/authorization/instagram_authorization_declarations';

import AbstractOAuthStrategy from '../../abstract/abstract_oauth_strategy';
import { HTTPResponseDataSchema } from '../../../../../declarations/net/http/response_declarations';

import { HTTP_REQUEST_TIMEOUT } from '../../../../../constants/net/http/request_constants';
import {
    INSTAGRAM_DEFAULT_OAUTH_AUTHORIZATION_URL,
    INSTAGRAM_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_CONFIGURATION,
    INSTAGRAM_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_RESOLVE_FUNCTION_NAME,
} from '../../../../../constants/security/authorization/instagram_constants';

import { isNil, isObject, isFunction } from '../../../../../utils/misc/logic_utils';

// implementation
class InstagramClientAuthorizationStrategy<AuthorizationCodeRetrievalData>
    extends AbstractOAuthStrategy<HTTPResponseDataSchema<false, AuthorizationCodeRetrievalData>>
    implements AuthorizationOAuthStrategy<InstagramAuthorizationCodeRetrievalOptions | string | GenericObject, HTTPResponseDataSchema<false, AuthorizationCodeRetrievalData>> {

    private authCodeRetrievalWindow: WindowProxy | null = null;
    private authCodeRetrievalTimeoutId: NodeJS.Timeout | null = null
    private authCodeRetrievalPromise: Promise<HTTPResponseDataSchema<false, AuthorizationCodeRetrievalData>> | null = null;
    private authCodeRetrievalResolveCB: (data: HTTPResponseDataSchema<false, AuthorizationCodeRetrievalData>) => void | null = null;
    private authCodeRetrievalRejectCB: (reason?: string) => void | null = null;

    protected bindWindowEvents() {
        if (isNil(window[INSTAGRAM_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_RESOLVE_FUNCTION_NAME])) {
            window[INSTAGRAM_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_RESOLVE_FUNCTION_NAME] = this.onWindowOAuthResolve.bind(this);
        } else {
            throw new Error('Cannot retrieve OAuth code - window authorization function was already been bind');
        }
    }

    protected unbindEvents() {
        window[INSTAGRAM_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_RESOLVE_FUNCTION_NAME] = undefined;
    }

    protected cleanupAuthorizationCodeRetrieval() {
        if (!isNil(this.authCodeRetrievalTimeoutId)) {
            clearTimeout(this.authCodeRetrievalTimeoutId);
            this.authCodeRetrievalTimeoutId = null;
        }

        this.authCodeRetrievalPromise = null;
        this.authCodeRetrievalResolveCB = null;
        this.authCodeRetrievalRejectCB = null;

        this.unbindEvents();

        this.authCodeRetrievalWindow.close();
        this.authCodeRetrievalWindow = null;
    }

    constructor() {
        super();
        this.bindWindowEvents()
    }

    public onWindowOAuthResolve(response: HTTPResponseDataSchema<false, AuthorizationCodeRetrievalData>): void {
        if (isFunction(this.authCodeRetrievalResolveCB)) {
            this.authCodeRetrievalResolveCB(response);
        }

        this.cleanupAuthorizationCodeRetrieval();
    }

    public onWindowOAuthReject(reason?: string): void {
        if (isFunction(this.authCodeRetrievalRejectCB)) {
            this.authCodeRetrievalRejectCB(reason);
        }

        this.cleanupAuthorizationCodeRetrieval();
    }

    // https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login
    public async initAuthorizationCodeRetrieval(options: InstagramAuthorizationCodeRetrievalOptions, windowTitle = 'Instagram OAuth Authorization', windowOptions?: GenericObject): Promise<HTTPResponseDataSchema<false, AuthorizationCodeRetrievalData>> {
        this.authCodeRetrievalTimeoutId = setTimeout(() => {
            this.onWindowOAuthReject('Cannot retrieve OAuth code - timeout');
        }, HTTP_REQUEST_TIMEOUT);

        this.authCodeRetrievalPromise = new Promise((resolve: (data: HTTPResponseDataSchema<false, AuthorizationCodeRetrievalData>) => void, reject) => {
            this.authCodeRetrievalResolveCB = resolve;
            this.authCodeRetrievalRejectCB = reject;

            let url = INSTAGRAM_DEFAULT_OAUTH_AUTHORIZATION_URL;

            url += `?force_reauth=${options.forceReauth === true ? 'true' : 'false'}`;
            url += `?enable_fb_login=${options.enableFBLogin === true ? 'true' : 'false'}`;
            url += `&client_id=${options.clientId}`;
            url += `&redirect_uri=${options.redirectURI}`
            url += '&response_type=code';
            url += `&scope=${options.scope.join(',')}`;
            url += `&state=${options.state}`;

            const preparedWindowOptions = isObject(windowOptions) ? Object.assign({}, INSTAGRAM_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_CONFIGURATION, windowOptions) : INSTAGRAM_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_CONFIGURATION;

            let windowOptionsArray = [];
            for (const windowOption in preparedWindowOptions) {
                windowOptionsArray.push(`${windowOption}=${preparedWindowOptions[windowOption]}`);
            }

            let params = windowOptionsArray.join(',');

            this.authCodeRetrievalWindow = window.open(url, windowTitle, params);
            this.authCodeRetrievalWindow.addEventListener('beforeunload', () => {
                this.onWindowOAuthReject('Cannot retrieve OAuth code - action aborted');
            })
        });

        return this.authCodeRetrievalPromise;
    }
}

// exports
export default InstagramClientAuthorizationStrategy;