// external imports

// internal imports
import type { GenericObject } from '../../../../../declarations/collection_declarations';
import type { AuthorizationOAuthStrategy } from '../../../../../declarations/security/authorization/general_authorization_declarations';
import type { TikTokAuthorizationCodeRetrievalOptions } from '../../../../../declarations/security/authorization/tiktok_authorization_declarations';

import AbstractOAuthStrategy from '../../abstract/abstract_oauth_strategy';

import {
    TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_URL,
    TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_CONFIGURATION,
} from '../../../../../constants/security/authorization/tiktok_constants';

import { isObject } from '../../../../../utils/misc/logic_utils';

// implementation
class TikTokClientAuthorizationStrategy extends AbstractOAuthStrategy implements AuthorizationOAuthStrategy<TikTokAuthorizationCodeRetrievalOptions | string | GenericObject> {
    constructor() {
        super();
    }

    // https://developers.tiktok.com/doc/login-kit-web/
    public async initAuthorizationCodeRetrieval(options: TikTokAuthorizationCodeRetrievalOptions, windowTitle = 'TikTok OAuth Authorization', windowOptions?: GenericObject): Promise<void> {
        let url = TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_URL;
        url += `?client_key=${options.clientKey}`;
        url += `&scope=${options.scope.join(',')}`;
        url += '&response_type=CODE';
        url += `&redirect_uri=${options.redirectURI}`;
        url += `&state=${options.state}`;

        const preparedWindowOptions = isObject(windowOptions) ? Object.assign({}, TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_CONFIGURATION, windowOptions) : TIKTOK_DEFAULT_OAUTH_AUTHORIZATION_WINDOW_CONFIGURATION;

        let windowOptionsArray = [];
        for (const windowOption in preparedWindowOptions) {
            windowOptionsArray.push(`${windowOption}=${preparedWindowOptions[windowOption]}`);
        }

        let params = windowOptionsArray.join(',');
        return window.open(url, windowTitle, params);
    }
}

// exports
export default TikTokClientAuthorizationStrategy;