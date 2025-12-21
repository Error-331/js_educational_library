// external imports

// internal imports
import { TikTokOpenAPIPostStatusData, TikTokOpenAPIPostStatusResponse } from '../../../../declarations/vendor/tiktok/tiktok_content_api_declarations';

import { TIKTOK_OPEN_API_BASE_URL } from '../../../../constants/net/api/tiktok/tiktok_common_constants';
import { TIKTOK_OPEN_API_POST_PUBLISH_STATUS_PATH_PART } from '../../../../constants/net/api/tiktok/tiktok_content_constants';

import TikTokAPIServerAbstractFacade from '../tiktok_api_server_abstract_facade';
import AxiosRequestFacade from '../../../http/request/axios/axios_server_request_facade';

import { combineMultipleURLPaths } from '../../../../utils/net/uri_utils';
import { isObjectOfType } from '../../../../utils/primitives/object_utils';
import { isTikTokOpenAPIErrorResponse, throwTikTokOpenAPIErrorResponse } from '../../../../utils/vendor/tiktok_utils';
import { isObject } from '../../../../utils/misc/logic_utils';

// implementation
class TikTokAPIPostStatusFacade extends TikTokAPIServerAbstractFacade {
    public async retrievePostStatus(oAuthAccessToken: string, publishId: string): Promise<TikTokOpenAPIPostStatusData> {
        const httpClient = new AxiosRequestFacade<TikTokOpenAPIPostStatusResponse>({
            baseURL: TIKTOK_OPEN_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), TIKTOK_OPEN_API_POST_PUBLISH_STATUS_PATH_PART], true, false),
            headers: {
                'Authorization': `Bearer ${oAuthAccessToken}`,
                'Content-Type': 'application/json; charset=UTF-8',
            },

            data: {
                publish_id: publishId,
            }
        });

        const { statusCode, data } = await httpClient.post();

        if (statusCode !== 200) {
            throwTikTokOpenAPIErrorResponse('Cannot retrieve post status: ', 'Unknown reason', data, statusCode);
        } else {
            if (isTikTokOpenAPIErrorResponse(data)) {
                throwTikTokOpenAPIErrorResponse('Cannot retrieve post status: ', 'Unknown reason', data, statusCode);
            }

            if (isObjectOfType<TikTokOpenAPIPostStatusResponse>(data, { data: isObject })) {
                return data.data;
            } else {
                throw new Error('Cannot retrieve post status - wrong response');
            }
        }
    }
}

// exports
export default TikTokAPIPostStatusFacade;