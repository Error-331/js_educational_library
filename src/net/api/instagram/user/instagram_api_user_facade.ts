// external imports

// internal imports
import { InstagramGraphAPIUserResponse } from '../../../../declarations/vendor/instagram/instagram_user_api_declarations';
import { FacebookGraphAPIErrorResponse } from '../../../../declarations/vendor/facebook/facebook_base_declarations';

import { INSTAGRAM_GRAPH_API_BASE_URL } from '../../../../constants/net/api/instagram/instagram_common_constants';
import { INSTAGRAM_GRAPH_API_ME_PATH_PART } from '../../../../constants/net/api/instagram/instagram_graph_api_constants';

import InstagramAPIServerAbstractFacade from './../instagram_api_server_abstract_facade';
import AxiosRequestFacade from '../../../http/request/axios/axios_server_request_facade';

import { isGraphAPIErrorResponse, throwGraphAPIHTTPError } from '../../../../utils/vendor/facebook_utils';
import { combineMultipleURLPaths } from '../../../../utils/net/uri_utils';
import { isObject } from '../../../../utils/misc/logic_utils';

// implementation
class InstagramAPIUserFacade extends InstagramAPIServerAbstractFacade {
    public async retrieveUserData(accessToken: string, fields: string[]): Promise<InstagramGraphAPIUserResponse> {
        const params = new URLSearchParams();

        params.append('access_token', accessToken);
        params.append('fields', fields.join(','));

        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse | InstagramGraphAPIUserResponse>({
            baseURL: INSTAGRAM_GRAPH_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), INSTAGRAM_GRAPH_API_ME_PATH_PART], true, false),
            params,
        });

        const { statusCode, data } = await httpClient.get();

        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot retrieve user data: ', 'Unknown reason', data, statusCode);
        } else {
            if (isGraphAPIErrorResponse(data)) {
                throwGraphAPIHTTPError('Cannot retrieve user data: ', 'Unknown reason', data, statusCode);
            } else if (isObject(data)) {
                return data;
            } else {
                throw new Error('Cannot retrieve user data - wrong data');
            }
        }
    }
}

// exports
export default InstagramAPIUserFacade;