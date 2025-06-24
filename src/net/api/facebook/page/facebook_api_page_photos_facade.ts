// external imports

// internal imports
import { FACEBOOK_GRAPH_API_BASE_URL } from '../../../../constants/net/api/facebook/facebook_common_constants';
import { FACEBOOK_GRAPH_API_PAGE_PHOTOS_PATH_PART } from '../../../../constants/net/api/facebook/facebook_page_constants';

import { FacebookGraphAPIErrorResponse } from '../../../../declarations/vendor/facebook/facebook_base_declarations';
import { FacebookAPIPagePhotoPublishOptions, FacebookGraphAPIPublishedImageResponse } from '../../../../declarations/vendor/facebook/facebook_page_api_declarations';

import FacebookAPIServerAbstractFacade from './../facebook_api_server_abstract_facade';
import AxiosRequestFacade from '../../../http/request/axios_request_facade';

import { combineMultipleURLPaths } from '../../../../utils/net/uri_utils';
import { isObjectOfType } from '../../../../utils/primitives/object_utils';
import { throwGraphAPIHTTPError } from '../../../../utils/vendor/facebook_utils';
import { isString } from '../../../../utils/misc/logic_utils';

// implementation
class FacebookAPIPagePhotosFacade extends FacebookAPIServerAbstractFacade {
    public async uploadAndPublishImageByURL(pageAccessToken: string, pageId: string, imagePublishOptions: FacebookAPIPagePhotoPublishOptions): Promise<FacebookGraphAPIPublishedImageResponse> {
        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse | FacebookGraphAPIPublishedImageResponse>({
            baseURL: FACEBOOK_GRAPH_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), pageId, FACEBOOK_GRAPH_API_PAGE_PHOTOS_PATH_PART]),
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                url: imagePublishOptions.imageURL,
                access_token: pageAccessToken,
                published: true,
                caption: imagePublishOptions.caption,
            }
        });

        const { statusCode, data } = await httpClient.get();
        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot publish image to the page: ', 'Unknown reason', data, statusCode);
        } else {
            const keysValidators = { id: isString, post_id: isString };
            if (isObjectOfType<FacebookGraphAPIPublishedImageResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot publish image to the page - wrong response');
            }
        }
    }
}

// exports
export default FacebookAPIPagePhotosFacade;