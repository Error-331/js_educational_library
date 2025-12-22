// external imports

// internal imports
import type { GenericObject } from '../../../../../declarations/collection_declarations';
import type { AuthorizationOAuthStrategy } from '../../../../../declarations/security/authorization/general_authorization_declarations';
import type { TikTokAuthorizationCodeRetrievalOptions } from '../../../../../declarations/security/authorization/tiktok_authorization_declarations';

import AbstractOAuthStrategy from '../../abstract/abstract_oauth_strategy';
import { HTTPResponseDataSchema } from '../../../../../declarations/net/http/response_declarations';

import { HTTP_REQUEST_TIMEOUT } from '../../../../../constants/net/http/request_constants';
import {
    TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_URL,
    TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_CONFIGURATION,
    TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_RESOLVE_FUNCTION_NAME,
} from '../../../../../constants/security/authorization/tiktok_constants';

import { isNil, isObject, isFunction } from '../../../../../utils/misc/logic_utils';

// implementation
class TikTokClientAuthorizationStrategy<AuthorizationCodeRetrievalData>
    extends AbstractOAuthStrategy<HTTPResponseDataSchema<false, AuthorizationCodeRetrievalData>>
    implements AuthorizationOAuthStrategy<TikTokAuthorizationCodeRetrievalOptions | string | GenericObject, HTTPResponseDataSchema<false, AuthorizationCodeRetrievalData>> {

    private authCodeRetrievalWindow: WindowProxy | null = null;
    private authCodeRetrievalTimeoutId: NodeJS.Timeout | null = null
    private authCodeRetrievalPromise: Promise<HTTPResponseDataSchema<false, AuthorizationCodeRetrievalData>> | null = null;
    private authCodeRetrievalResolveCB: (data: HTTPResponseDataSchema<false, AuthorizationCodeRetrievalData>) => void | null = null;
    private authCodeRetrievalRejectCB: (reason?: string) => void | null = null;

    protected bindWindowEvents() {
        if (isNil(window[TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_RESOLVE_FUNCTION_NAME])) {
            window[TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_RESOLVE_FUNCTION_NAME] = this.onWindowOAuthResolve.bind(this);
        } else {
            throw new Error('Cannot retrieve OAuth code - window authorization function was already been bind');
        }
    }

    protected unbindEvents() {
        window[TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_RESOLVE_FUNCTION_NAME] = undefined;
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

    // https://developers.tiktok.com/doc/login-kit-web/
    public async initAuthorizationCodeRetrieval(options: TikTokAuthorizationCodeRetrievalOptions, windowTitle = 'TikTok OAuth Authorization', windowOptions?: GenericObject): Promise<HTTPResponseDataSchema<false, AuthorizationCodeRetrievalData>> {
        this.authCodeRetrievalTimeoutId = setTimeout(() => {
            this.onWindowOAuthReject('Cannot retrieve OAuth code - timeout');
        }, HTTP_REQUEST_TIMEOUT);

        this.authCodeRetrievalPromise = new Promise((resolve: (data: HTTPResponseDataSchema<false, AuthorizationCodeRetrievalData>) => void, reject) => {
            this.authCodeRetrievalResolveCB = resolve;
            this.authCodeRetrievalRejectCB = reject;

            let url = TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_URL;

            url += `?client_key=${options.clientKey}`;
            url += `&scope=${options.scope.join(',')}`;
            url += '&response_type=code';
            url += `&redirect_uri=${options.redirectURI}`;
            url += `&state=${options.state}`;

            const preparedWindowOptions = isObject(windowOptions) ? Object.assign({}, TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_CONFIGURATION, windowOptions) : TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_CONFIGURATION;

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
export default TikTokClientAuthorizationStrategy;