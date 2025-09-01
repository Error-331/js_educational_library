// external imports

// internal imports
import { FACEBOOK_GRAPH_API_BASE_URL } from '../../../../constants/net/api/facebook/facebook_common_constants';
import { FACEBOOK_GRAPH_API_PAGE_PICTURE_PATH_PART } from '../../../../constants/net/api/facebook/facebook_page_constants';

import { FacebookGraphAPIErrorResponse } from '../../../../declarations/vendor/facebook/facebook_base_declarations';
import { FacebookGraphAPIProfilePictureSource,FacebookGraphAPIPagePictureResponse } from '../../../../declarations/vendor/facebook/facebook_page_api_declarations';

import FacebookAPIServerAbstractFacade from '../facebook_api_server_abstract_facade';
import AxiosRequestFacade from '../../../http/request/axios_request_facade';

import { combineMultipleURLPaths } from '../../../../utils/net/uri_utils';
import { throwGraphAPIHTTPError } from '../../../../utils/vendor/facebook_utils';
import { isObjectOfType } from '../../../../utils/primitives/object_utils';
import { isString, isNumber, isBoolean, isObject } from '../../../../utils/misc/logic_utils';

// implementation
class FacebookAPIPagePictureFacade extends FacebookAPIServerAbstractFacade {
    public async retrievePagePicture(userAccessToken: string, pageId: string): Promise<FacebookGraphAPIProfilePictureSource> {
        const params = new URLSearchParams();

        params.append('access_token', userAccessToken);
        params.append('redirect', "0");

        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse | FacebookGraphAPIPagePictureResponse>({
            baseURL: FACEBOOK_GRAPH_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), pageId, FACEBOOK_GRAPH_API_PAGE_PICTURE_PATH_PART]),
            params,
        });

        const { statusCode, data } = await httpClient.get();
        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot retrieve page picture: ', 'Unknown reason', data, statusCode);
        } else {
            const keysValidators = { width: isNumber, height: isNumber, is_silhouette: isBoolean, url: isString };
            if ('data' in data && isObjectOfType<FacebookGraphAPIProfilePictureSource>(data?.data, keysValidators)) {
                return data.data;
            } else {
                throw new Error('Cannot retrieve page picture - wrong response');
            }
        }
    }
}

// exports
export default FacebookAPIPagePictureFacade;