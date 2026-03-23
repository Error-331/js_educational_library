// external imports

// internal imports
import { TikTokOpenApiResponse } from '../../../../declarations/vendor/tiktok/tiktok_open_api_declarations';
import {
    TikTokOpenAPIUserData,
    TikTokOpenAPIUserResponseData,
    TikTokOpenAPIUserResponse,
} from '../../../../declarations/vendor/tiktok/tiktok_user_api_declarations';

import { TIKTOK_OPEN_API_BASE_URL } from '../../../../constants/net/api/tiktok/tiktok_common_constants';
import { TIKTOK_OPEN_API_USER_INFO_PATH_PART, TIKTOK_OPEN_API_USER_DEFAULT_FIELDS } from '../../../../constants/net/api/tiktok/tiktok_user_constants';

import TikTokAPIServerAbstractFacade from '../tiktok_api_server_abstract_facade';
import AxiosRequestFacade from '../../../http/request/axios/axios_server_request_facade';

import { combineMultipleURLPaths } from '../../../../utils/net/uri_utils';
import { isTikTokOpenAPIErrorResponse, throwTikTokOpenAPIErrorResponse } from '../../../../utils/vendor/tiktok_utils';
import { isObjectOfType } from '../../../../utils/primitives/object_utils';
import { isObject } from '../../../../utils/misc/logic_utils';

// implementation
class TikTokAPIUserFacade extends TikTokAPIServerAbstractFacade {
    public async retrieveUserData(oauthAccessToken: string, fields: string[] = TIKTOK_OPEN_API_USER_DEFAULT_FIELDS): Promise<TikTokOpenAPIUserData> {
        const params = new URLSearchParams();
        params.append('fields', fields.join(','));

        const httpClient = new AxiosRequestFacade<TikTokOpenApiResponse<TikTokOpenAPIUserResponse>>({
            baseURL: TIKTOK_OPEN_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), TIKTOK_OPEN_API_USER_INFO_PATH_PART], true, false),
            headers: {
                'Authorization': `Bearer ${oauthAccessToken}`
            },
            params,
        });

        const { statusCode, data } = await httpClient.get();

        if (statusCode !== 200) {
            throwTikTokOpenAPIErrorResponse('Cannot retrieve user data: ', 'Unknown reason', data, statusCode);
        } else {
            if (isTikTokOpenAPIErrorResponse(data)) {
                throwTikTokOpenAPIErrorResponse('Cannot retrieve user data: ', 'Unknown reason', data, statusCode);
            }

            if (isObjectOfType<TikTokOpenAPIUserResponseData>(data.data, { user: isObject })) {
                return data.data.user;
            } else {
                throw new Error('Cannot retrieve user data - wrong response');
            }
        }
    }
}

// exports
export default TikTokAPIUserFacade;