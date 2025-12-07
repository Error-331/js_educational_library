// external imports

// internal imports
import { FacebookGraphAPIErrorResponse } from '../../../declarations/vendor/facebook/facebook_base_declarations';
import { FacebookGraphAPIOAuthAccessTokenResponse, FacebookGraphAPIOAuthPageAccessTokenResponse } from '../../../declarations/vendor/facebook/facebook_oauth_api_declarations';

import { FACEBOOK_GRAPH_API_BASE_URL } from '../../../constants/net/api/facebook/facebook_common_constants';
import {
    FACEBOOK_GRAPH_API_OAUTH_ACCESS_TOKEN_PATH_PART,
    FACEBOOK_GRAPH_API_OAUTH_ACCOUNTS_PATH_PART,
} from '../../../constants/net/api/facebook/facebook_oauth_constants';

import FacebookAPIServerAbstractFacade from './facebook_api_server_abstract_facade';
import AxiosRequestFacade from '../../http/request/axios/axios_server_request_facade';
import HTTPError from '../../../errors/http_error';

import { combineMultipleURLPaths } from '../../../utils/net/uri_utils';
import { isObjectOfType } from '../../../utils/primitives/object_utils';
import { throwGraphAPIHTTPError } from '../../../utils/vendor/facebook_utils';
import { isString, isArray, isObject } from '../../../utils/misc/logic_utils';

// implementation
class FacebookAPIOAuthFacade extends FacebookAPIServerAbstractFacade {
    public async retrieveLongLivedUserAccessToken(userAccessToken: string): Promise<FacebookGraphAPIOAuthAccessTokenResponse> {
        const serverOptions = this.getFacebookServerOptions();
        const params = new URLSearchParams();

        params.append('grant_type', 'fb_exchange_token');
        params.append('client_id', serverOptions.appId);
        params.append('client_secret', serverOptions.appSecret);
        params.append('fb_exchange_token', userAccessToken);

        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse | FacebookGraphAPIOAuthAccessTokenResponse>({
            baseURL: FACEBOOK_GRAPH_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), FACEBOOK_GRAPH_API_OAUTH_ACCESS_TOKEN_PATH_PART]),
            params,
        });

        const { statusCode, data } = await httpClient.get();

        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot retrieve long-lived user access token: ', 'Unknown reason', data, statusCode);
        } else {
            const keysValidators = { access_token: isString, token_type: isString };
            if (isObjectOfType<FacebookGraphAPIOAuthAccessTokenResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot retrieve long-lived user access token - wrong response');
            }
        }
    }

    // TODO: need to iterate through all pages in the result
    public async retrieveLongLivedPageAccessToken(appScopedUserId: string, longLivedUserAccessToken: string): Promise<FacebookGraphAPIOAuthPageAccessTokenResponse> {
        const params = new URLSearchParams();
        params.append('access_token', longLivedUserAccessToken);

        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse | FacebookGraphAPIOAuthPageAccessTokenResponse>({
            baseURL: FACEBOOK_GRAPH_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), appScopedUserId, FACEBOOK_GRAPH_API_OAUTH_ACCOUNTS_PATH_PART]),
            params,
        });

        const { statusCode, data } = await httpClient.get();
        if (statusCode !== 200) {
            throw new HTTPError(`Cannot retrieve long-lived page access token: ${'message' in data ? data?.message : 'Unknown reason'}`, statusCode);
        } else {
            const keysValidators = { data: isArray, paging: isObject }; // TODO: better use  Zod here with more comprehensive check
            if (isObjectOfType<FacebookGraphAPIOAuthPageAccessTokenResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot retrieve long-lived page access token - wrong response');
            }
        }
    }
}

// exports
export default FacebookAPIOAuthFacade;