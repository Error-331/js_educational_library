// external imports

// internal imports
import { FacebookContentType } from '../../../../declarations/vendor/facebook/facebook_content_declarations';
import { FacebookGraphAPIErrorResponse } from '../../../../declarations/vendor/facebook/facebook_base_declarations';
import { FacebookGraphAPIAppUploadsResponse } from '../../../../declarations/vendor/facebook/facebook_app_api_declarations';
import {
    FacebookAPIPageVideoPublishByFilePathOptions,
    FacebookAPIPageVideoPublishByStreamOptions,
    FacebookGraphAPIPageVideoPublishResponse,
    FacebookGraphAPIPageReelPublishResponse,
    FacebookPageReelPublishResponse,
    FacebookGraphAPIPageVideoStatusResponse,
} from '../../../../declarations/vendor/facebook/facebook_page_api_declarations';

import { FACEBOOK_GRAPH_API_BASE_URL, FACEBOOK_GRAPH_VIDEO_API_BASE_URL } from '../../../../constants/net/api/facebook/facebook_common_constants';
import { FACEBOOK_GRAPH_API_PAGE_VIDEOS_PATH_PART, FACEBOOK_GRAPH_API_PAGE_VIDEO_REELS_PATH_PART } from '../../../../constants/net/api/facebook/facebook_page_constants';

import FacebookAPIServerAbstractFacade from '../facebook_api_server_abstract_facade';
import FacebookAPIAppResumableFileUploadFacade from '../app/facebook_api_app_resumable_file_upload_facade';
import FacebookAPIPageResumableFileUploadFacade from './facebook_api_page_resumable_video_upload_facade';
import AxiosRequestFacade from '../../../http/request/axios/axios_server_request_facade';

import { combineMultipleURLPaths } from '../../../../utils/net/uri_utils';
import { throwGraphAPIHTTPError } from '../../../../utils/vendor/facebook_utils';
import { isObjectOfType } from '../../../../utils/primitives/object_utils';
import { isBoolean, isString, isObject } from '../../../../utils/misc/logic_utils';

// implementation
// https://developers.facebook.com/docs/video-api/guides/reels-publishing#requirements
class FacebookAPIPageVideoFacade extends FacebookAPIServerAbstractFacade {
    public async publishVideo(pageId: string, pageAccessToken: string, fileHandle: string, title = '', description = '') {
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

    public async publishReel(pageId: string, pageAccessToken: string, videoId: string, description = '') {
        if (!isString(pageId)) {
            throw new RangeError('Cannot publish reel to Facebook page - page Id must be of type string');
        }

        if (!isString(pageAccessToken)) {
            throw new RangeError('Cannot publish reel to Facebook page - page access token must be of type string');
        }

        if (!isString(videoId)) {
            throw new RangeError('Cannot publish reel to Facebook page - video Id must be of type string');
        }

        const params = new URLSearchParams();

        params.append('access_token', pageAccessToken);
        params.append('video_id', videoId);
        params.append('upload_phase', 'finish');
        params.append('video_state', 'PUBLISHED');
        params.append('description', description);

        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse | FacebookGraphAPIPageReelPublishResponse>({
            baseURL: FACEBOOK_GRAPH_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), pageId, FACEBOOK_GRAPH_API_PAGE_VIDEO_REELS_PATH_PART]),
            params,
        });

        const { statusCode, data } = await httpClient.post();

        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot publish reel to Facebook page: ', 'Unknown reason', data, statusCode);
        } else {
            const keysValidators = { success: isBoolean, post_id: isString  };
            if (isObjectOfType<FacebookGraphAPIPageReelPublishResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot publish reel to Facebook page - wrong response');
            }
        }
    }

    public async uploadAndPublishVideoByFilePath(uploadOptions: FacebookAPIPageVideoPublishByFilePathOptions): Promise<FacebookGraphAPIPageVideoPublishResponse> {
        const fileUploadFacade = new FacebookAPIAppResumableFileUploadFacade();
        const uploadResult = await fileUploadFacade.uploadFileByPath(
            uploadOptions.userAccessToken,
            uploadOptions.pathToFile,
            uploadOptions?.fileUploadOptions
        );

        return await this.publishVideo(
            uploadOptions.pageId,
            uploadOptions.pageAccessToken,
            uploadResult.h,
            uploadOptions.title,
            uploadOptions.description,
        );
    }

    public async uploadAndPublishReelByFilePath(uploadOptions: FacebookAPIPageVideoPublishByFilePathOptions): Promise<FacebookPageReelPublishResponse> {
        const fileUploadFacade = new FacebookAPIPageResumableFileUploadFacade();
        const uploadResult = await fileUploadFacade.uploadFileByPath(
            uploadOptions.userAccessToken,
            uploadOptions.pageAccessToken,
            uploadOptions.pageId,
            uploadOptions.pathToFile,
            FacebookContentType.PageReel,
            uploadOptions?.fileUploadOptions
        );

        const publishResult = await this.publishReel(
            uploadOptions.pageId,
            uploadOptions.pageAccessToken,
            uploadResult.video_id,
            uploadOptions.description,
        );

        return {
            publishSuccess: publishResult.success,

            videoId: uploadResult.video_id,
            postId: publishResult.post_id,
        }
    }

    public async uploadAndPublishReelByStream(uploadOptions: FacebookAPIPageVideoPublishByStreamOptions): Promise<FacebookPageReelPublishResponse> {
        const fileUploadFacade = new FacebookAPIPageResumableFileUploadFacade();
        const uploadResult = await fileUploadFacade.uploadFileByStream(
            uploadOptions.userAccessToken,
            uploadOptions.pageAccessToken,
            uploadOptions.pageId,
            uploadOptions.fileSize,
            uploadOptions.stream,
            FacebookContentType.PageReel,
            uploadOptions?.fileUploadOptions
        );

        const publishResult = await this.publishReel(
            uploadOptions.pageId,
            uploadOptions.pageAccessToken,
            uploadResult.video_id,
            uploadOptions.description,
        );

        return {
            publishSuccess: publishResult.success,

            videoId: uploadResult.video_id,
            postId: publishResult.post_id,
        }
    }

    public async loadVideoStatus(pageAccessToken: string, videoId: string): Promise<FacebookGraphAPIPageVideoStatusResponse> {
        const params = new URLSearchParams();

        params.append('access_token', pageAccessToken);
        params.append('fields', 'status');

        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse | FacebookGraphAPIPageReelPublishResponse>({
            baseURL: FACEBOOK_GRAPH_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), videoId]),
            params,
        });

        const { statusCode, data } = await httpClient.get();

        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot load Facebook video status: ', 'Unknown reason', data, statusCode);
        } else {
            const keysValidators = { id: isString, status: isObject };
            if (isObjectOfType<FacebookGraphAPIPageVideoStatusResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot load Facebook video status - wrong response');
            }
        }
    }
}
// exports
export default FacebookAPIPageVideoFacade;