// external imports

// internal imports
import { TikTokOpenApiResponse } from '../../../../declarations/vendor/tiktok/tiktok_open_api_declarations';
import { TikTokOpenAPICreatorInfoData, TikTokOpenAPICreatorInfoResponse } from '../../../../declarations/vendor/tiktok/tiktok_content_api_declarations';

import { TIKTOK_OPEN_API_BASE_URL } from '../../../../constants/net/api/tiktok/tiktok_common_constants';
import { TIKTOK_OPEN_API_CREATOR_INFO_PATH_PART } from '../../../../constants/net/api/tiktok/tiktok_content_constants';

import TikTokAPIServerAbstractFacade from '../tiktok_api_server_abstract_facade';
import AxiosRequestFacade from '../../../http/request/axios/axios_server_request_facade';

import { combineMultipleURLPaths } from '../../../../utils/net/uri_utils';
import { isObjectOfType } from '../../../../utils/primitives/object_utils';
import { isTikTokOpenAPIErrorResponse, throwTikTokOpenAPIErrorResponse } from '../../../../utils/vendor/tiktok_utils';
import { isObject } from '../../../../utils/misc/logic_utils';

// implementation
class TikTokAPICreatorInfoFacade extends TikTokAPIServerAbstractFacade {
    public async queryCreatorInfo(oAuthAccessToken: string): Promise<TikTokOpenAPICreatorInfoData> {
        const httpClient = new AxiosRequestFacade<TikTokOpenApiResponse<TikTokOpenAPICreatorInfoData>>({
            baseURL: TIKTOK_OPEN_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), TIKTOK_OPEN_API_CREATOR_INFO_PATH_PART], true, false),
            headers: {
                'Authorization': `Bearer ${oAuthAccessToken}`,
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });

        const { statusCode, data } = await httpClient.post();

        if (statusCode !== 200) {
            throwTikTokOpenAPIErrorResponse('Cannot query creator info: ', 'Unknown reason', data, statusCode);
        } else {
            if (isTikTokOpenAPIErrorResponse(data)) {
                throwTikTokOpenAPIErrorResponse('Cannot query creator info: ', 'Unknown reason', data, statusCode);
            }

            if (isObjectOfType<TikTokOpenAPICreatorInfoResponse>(data, { data: isObject })) {
                return data.data;
            } else {
                throw new Error('Cannot query creator info - wrong response');
            }
        }
    }
}

// exports
export default TikTokAPICreatorInfoFacade;