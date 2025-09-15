// external imports

// internal imports
import { FacebookGraphAPIErrorResponse } from '../../../../declarations/vendor/facebook/facebook_base_declarations';
import { FacebookGraphAPIAppUploadsResponse } from '../../../../declarations/vendor/facebook/facebook_app_api_declarations';
import { FacebookAPIPageVideoPublishOptions, FacebookGraphAPIPageVideoPublishResponse } from '../../../../declarations/vendor/facebook/facebook_page_api_declarations';

import { FACEBOOK_GRAPH_VIDEO_API_BASE_URL } from '../../../../constants/net/api/facebook/facebook_common_constants';
import { FACEBOOK_GRAPH_API_PAGE_VIDEOS_PATH_PART } from '../../../../constants/net/api/facebook/facebook_page_constants';

import FacebookAPIServerAbstractFacade from '../facebook_api_server_abstract_facade';
import FacebookAPIAppResumableFileUploadFacade from '../app/facebook_api_app_resumable_file_upload_facade';
import AxiosRequestFacade from '../../../http/request/axios_request_facade';

import { combineMultipleURLPaths } from '../../../../utils/net/uri_utils';
import { throwGraphAPIHTTPError } from '../../../../utils/vendor/facebook_utils';
import { isObjectOfType } from '../../../../utils/primitives/object_utils';
import { isString } from '../../../../utils/misc/logic_utils';

// implementation
class FacebookAPIPageVideoFacade extends FacebookAPIServerAbstractFacade {
    public async publishVideoToFacebook(pageId: string, pageAccessToken: string, fileHandle: string, title = '', description = '') {
        if (!isString(pageId)) {
            throw new RangeError('Cannot publish video to Facebook page - page Id must be of type string');
        }

        if (!isString(pageAccessToken)) {
            throw new RangeError('Cannot publish video to Facebook page - page access token must be of type string');
        }

        if (!isString(fileHandle)) {
            throw new RangeError('Cannot publish video to Facebook page - uploaded file handle must be of type string');
        }

        const formData = new FormData();

        formData.append('access_token', pageAccessToken);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('fbuploader_video_file_chunk', fileHandle);

        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse | FacebookGraphAPIAppUploadsResponse>({
            baseURL: FACEBOOK_GRAPH_VIDEO_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), pageId, FACEBOOK_GRAPH_API_PAGE_VIDEOS_PATH_PART]),
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: {
                'access_token': pageAccessToken,
                'title': title,
                'description': description,
                'fbuploader_video_file_chunk1': fileHandle,
            }
        });

        const { statusCode, data } = await httpClient.post();

        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot publish video to Facebook page: ', 'Unknown reason', data, statusCode);
        } else {
            const keysValidators = { id: isString };
            if (isObjectOfType<FacebookGraphAPIPageVideoPublishResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot publish video to Facebook page - wrong response');
            }

        }
    }

    public async uploadAndPublishVideoToFacebookPage(uploadOptions: FacebookAPIPageVideoPublishOptions) {
        const fileUploadFacade = new FacebookAPIAppResumableFileUploadFacade();
        const uploadResult = await fileUploadFacade.uploadFileToFacebook(uploadOptions.userAccessToken, uploadOptions.pathToFile, uploadOptions?.fileUploadOptions);

        return await this.publishVideoToFacebook(
            uploadOptions.pageId,
            uploadOptions.pageAccessToken,
            uploadResult.h,
            uploadOptions.title,
            uploadOptions.description,
        );
    }
}
// exports
export default FacebookAPIPageVideoFacade;