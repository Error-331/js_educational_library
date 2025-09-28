// external imports

// internal imports
import { FacebookGraphAPIErrorResponse } from '../../../../declarations/vendor/facebook/facebook_base_declarations';
import { FacebookGraphAPIUserResponse } from '../../../../declarations/vendor/facebook/facebook_user_api_declarations';

import { FACEBOOK_GRAPH_API_BASE_URL } from '../../../../constants/net/api/facebook/facebook_common_constants';

import FacebookAPIServerAbstractFacade from '../facebook_api_server_abstract_facade';
import AxiosRequestFacade from '../../../http/request/axios/axios_server_request_facade';

import { combineMultipleURLPaths } from '../../../../utils/net/uri_utils';
import { throwGraphAPIHTTPError } from '../../../../utils/vendor/facebook_utils';
import { isObjectOfType } from '../../../../utils/primitives/object_utils';
import { isString } from '../../../../utils/misc/logic_utils';

// implementation
// https://developers.facebook.com/docs/graph-api/reference/user
class FacebookAPIUserFacade extends FacebookAPIServerAbstractFacade {
    public async retrieveUserData(userAccessToken: string, uid: string): Promise<FacebookGraphAPIUserResponse> {
        const params = new URLSearchParams();
        params.append('access_token', userAccessToken);

        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse | FacebookGraphAPIUserResponse>({
            baseURL: FACEBOOK_GRAPH_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), uid]),
            params,
        });

        const { statusCode, data } = await httpClient.get();

        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot retrieve user data: ', 'Unknown reason', data, statusCode);
        } else {
            const keysValidators = { id: isString };
            if (isObjectOfType<FacebookGraphAPIUserResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot retrieve user data - wrong response');
            }
        }
    }
}

// exports
export default FacebookAPIUserFacade;