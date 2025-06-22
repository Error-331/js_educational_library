// external imports

// internal imports
import { FACEBOOK_GRAPH_API_BASE_URL } from '../../../constants/net/api/facebook/facebook_common_constants';
import { FACEBOOK_GRAPH_API_OAUTH_ACCESS_TOKEN_PATH_PART } from '../../../constants/net/api/facebook/facebook_oauth_constants';

import { FacebookErrorResponse } from '../../../declarations/vendor/facebook/facebook_base_declarations';
import { FacebookOAuthAccessTokenResponse } from '../../../declarations/vendor/facebook/facebook_oauth_api_declarations';

import FacebookAPIServerAbstractFacade from './facebook_api_server_abstract_facade';
import AxiosRequestFacade from '../../http/request/axios_request_facade';
import HTTPError from '../../../errors/http_error';

import { combineMultipleURLPaths } from '../../../utils/net/uri_utils';
import { isObjectOfType } from '../../../utils/primitives/object_utils';
import { isString } from '../../../utils/misc/logic_utils';

// implementation
class FacebookAPIOAuthFacade extends FacebookAPIServerAbstractFacade {
    public async retrieveLongLivedUserAccessToken(accessToken: string): Promise<FacebookOAuthAccessTokenResponse> {
        const serverOptions = this.getFacebookServerOptions();
        const params = new URLSearchParams();

        params.append('grant_type', 'fb_exchange_token');
        params.append('client_id', serverOptions.appId);
        params.append('client_secret', serverOptions.appSecret);
        params.append('fb_exchange_token', accessToken);

        const httpClient = new AxiosRequestFacade<FacebookErrorResponse | FacebookOAuthAccessTokenResponse>({
            baseURL: FACEBOOK_GRAPH_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), FACEBOOK_GRAPH_API_OAUTH_ACCESS_TOKEN_PATH_PART]),
            params,
        });

        const { statusCode, data } = await httpClient.get();

        if (statusCode !== 200) {
            throw new HTTPError(`Cannot retrieve long-lived user access token: ${'message' in data ? data?.message : 'Unknown reason'}`, statusCode);
        } else {
            const keysValidators = { access_token: isString, token_type: isString };
            if (isObjectOfType<FacebookOAuthAccessTokenResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot retrieve long-lived user access token - wrong response');
            }
        }
    }
}

// exports
export default FacebookAPIOAuthFacade;