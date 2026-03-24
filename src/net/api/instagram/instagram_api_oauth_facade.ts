// external imports

// internal imports
import { GenericObject } from '../../../declarations/collection_declarations';
import { InstagramAPIErrorResponse, InstagramAPIOAuthResponse } from '../../../declarations/vendor/instagram/instagram_api_declarations';
import { InstagramGraphAPIAccessTokenResponse } from '../../../declarations/vendor/instagram/instagram_graph_api_declarations';
import { FacebookGraphAPIErrorResponse } from '../../../declarations/vendor/facebook/facebook_base_declarations';

import { INSTAGRAM_GRAPH_API_BASE_URL, INSTAGRAM_API_BASE_URL } from '../../../constants/net/api/instagram/instagram_common_constants';
import { INSTAGRAM_API_OAUTH_SHORT_LIVED_ACCESS_TOKEN_PATH_PART } from '../../../constants/net/api/instagram/instagram_api_constants';
import { INSTAGRAM_GRAPH_API_ACCESS_TOKEN_PATH_PART } from '../../../constants/net/api/instagram/instagram_graph_api_constants';

import InstagramAPIServerAbstractFacade from './instagram_api_server_abstract_facade';
import AxiosRequestFacade from '../../http/request/axios/axios_server_request_facade';

import { throwGraphAPIHTTPError } from '../../../utils/vendor/facebook_utils';
import { isInstagramOAuthAPIErrorResponse, throwInstagramOAuthAPIHTTPError } from '../../../utils/vendor/instagram_utils';
import { combineMultipleURLPaths } from '../../../utils/net/uri_utils';
import { isObjectOfType } from '../../../utils/primitives/object_utils';
import { isNumber, isString, isArray } from '../../../utils/misc/logic_utils';

// implementation
class InstagramAPIOAuthFacade extends InstagramAPIServerAbstractFacade {
    public async retrieveLongLivedAccessToken(shortLivedAccessToken: string): Promise<InstagramGraphAPIAccessTokenResponse> {
        const serverOptions = this.getInstagramServerOptions();
        const params = new URLSearchParams();

        params.append('access_token', shortLivedAccessToken);
        params.append('client_secret', serverOptions.clientSecret);
        params.append('grant_type', 'ig_exchange_token');

        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse | InstagramGraphAPIAccessTokenResponse>({
            baseURL: INSTAGRAM_GRAPH_API_BASE_URL,
            url: combineMultipleURLPaths([INSTAGRAM_GRAPH_API_ACCESS_TOKEN_PATH_PART], true, false),
            params,
        });

        const { statusCode, data } = await httpClient.get();

        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot retrieve OAuth long-lived access token: ', 'Unknown reason', data, statusCode);
        } else {
            const responseKeysValidator = {
                access_token: isString,
                token_type: isString,
                expires_in: isNumber,
            };

            if (isObjectOfType<InstagramGraphAPIAccessTokenResponse>(data, responseKeysValidator)) {
                return data;
            } else {
                throw new Error('Cannot retrieve OAuth long-lived access token - wrong token data');
            }
        }
    }

    public async retrieveShortLivedAccessToken(code: string): Promise<InstagramAPIOAuthResponse> {
        const serverOptions = this.getInstagramServerOptions();

        const formData: GenericObject<string> = {
            code,
            client_id: serverOptions.clientId,
            client_secret: serverOptions.clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: serverOptions.oauthRedirectURI
        };

        const httpClient = new AxiosRequestFacade<InstagramAPIErrorResponse | InstagramAPIOAuthResponse>({
            baseURL: INSTAGRAM_API_BASE_URL,
            url: combineMultipleURLPaths([INSTAGRAM_API_OAUTH_SHORT_LIVED_ACCESS_TOKEN_PATH_PART], true, false),
            data: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { statusCode, data } = await httpClient.post();

        if (statusCode !== 200) {
            throwInstagramOAuthAPIHTTPError('Cannot retrieve OAuth short-lived access token: ', 'Unknown reason', data, statusCode);
        } else {
            if (isInstagramOAuthAPIErrorResponse(data)) {
                throwInstagramOAuthAPIHTTPError('Cannot retrieve OAuth short-lived access token: ', 'Unknown reason', data, statusCode);
            }

            const tokenDataKeysValidator = {
                access_token: isString,
                user_id: isString,
                permissions: isArray,
            };

            if (isObjectOfType<InstagramAPIOAuthResponse>(data, tokenDataKeysValidator)) {
                return data;
            } else {
                throw new Error('Cannot retrieve OAuth short-lived access token - wrong token data');
            }
        }
    }
}

// exports
export default InstagramAPIOAuthFacade;