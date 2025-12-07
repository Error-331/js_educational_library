// external imports

// internal imports
import { GenericObject } from '../../../declarations/collection_declarations';
import { TikTokOAuthAPIErrorResponse, TikTokOAuthAPIResponse } from '../../../declarations/vendor/tiktok/tiktok_oauth_api_declarations';

import { TIKTOK_OPEN_API_BASE_URL } from '../../../constants/net/api/tiktok/tiktok_common_constants';
import {
    TIKTOK_OPEN_API_OAUTH_ACCESS_TOKEN_PATH_PART,
} from '../../../constants/net/api/tiktok/tiktok_oauth_constants';

import TikTokAPIServerAbstractFacade from './tiktok_api_server_abstract_facade';
import AxiosRequestFacade from '../../http/request/axios/axios_server_request_facade';

import { combineMultipleURLPaths } from '../../../utils/net/uri_utils';
import { isObjectOfType } from '../../../utils/primitives/object_utils';
import { isTikTokOAuthAPIErrorResponse, throwTikTokOAuthAPIHTTPError } from '../../../utils/vendor/tiktok_utils';
import { isNumber, isString } from '../../../utils/misc/logic_utils';

// implementation
class TikTokAPIOAuthFacade extends TikTokAPIServerAbstractFacade {
    public async retrieveAccessToken(code: string): Promise<TikTokOAuthAPIResponse> {
        const serverOptions = this.getTikTokServerOptions();

        const formData: GenericObject<string> = {
            code,
            client_key: serverOptions.clientKey,
            client_secret: serverOptions.clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: serverOptions.oauthRedirectURI
        }

        const httpClient = new AxiosRequestFacade<TikTokOAuthAPIErrorResponse | TikTokOAuthAPIResponse>({
            baseURL: TIKTOK_OPEN_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), TIKTOK_OPEN_API_OAUTH_ACCESS_TOKEN_PATH_PART], true, false),
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: formData
        });

        const { statusCode, data } = await httpClient.post();

        if (statusCode !== 200) {
            throwTikTokOAuthAPIHTTPError('Cannot retrieve OAuth access token: ', 'Unknown reason', data, statusCode);
        } else {
            if (isTikTokOAuthAPIErrorResponse(data)) {
                throwTikTokOAuthAPIHTTPError('Cannot retrieve OAuth access token: ', 'Unknown reason', data, statusCode);
            }

            const keysValidators = {
                access_token: isString,
                expires_in: isNumber,
                open_id: isString,
                refresh_expires_in: isNumber,
                refresh_token: isString,
                scope: isString,
                token_type: isString,
            };

            if (isObjectOfType<TikTokOAuthAPIResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot retrieve OAuth access token - wrong response');
            }
        }
    }
}

// exports
export default TikTokAPIOAuthFacade;