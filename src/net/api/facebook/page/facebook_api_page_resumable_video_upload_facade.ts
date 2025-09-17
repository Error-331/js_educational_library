// external imports
import { createReadStream } from 'node:fs';

// internal imports
import { FacebookGraphAPIErrorResponse } from '../../../../declarations/vendor/facebook/facebook_base_declarations';
import { FacebookContentType } from '../../../../declarations/vendor/facebook/facebook_content_declarations';
import {
    FacebookGraphAPIAppUploadConfig,

    FacebookGraphAPIAppUploadChunkResponse,
    FacebookGraphAPIAppUploadFinishResponse,
} from '../../../../declarations/vendor/facebook/facebook_app_api_declarations';

import {
    FacebookGraphAPIPageVideoUploadInitResponse,
    FacebookGraphAPIPageVideoUploadFinishResponse,
} from '../../../../declarations/vendor/facebook/facebook_page_api_declarations';

import {
    FACEBOOK_GRAPH_API_FILE_UPLOAD_DEFAULT_BUFFER_SIZE,

    FACEBOOK_GRAPH_API_BASE_URL,
    FACEBOOK_GRAPH_REELS_UPLOAD_API_BASE_URL,
    FACEBOOK_GRAPH_REELS_UPLOAD_API_VIDEO_PATH_PART,
} from '../../../../constants/net/api/facebook/facebook_common_constants';

import {
    FACEBOOK_GRAPH_API_PAGE_VIDEOS_PATH_PART,
    FACEBOOK_GRAPH_API_PAGE_VIDEO_REELS_PATH_PART,
} from '../../../../constants/net/api/facebook/facebook_page_constants';

import { MIME_TYPE_BIN } from '../../../../constants/net/common/mime_types_constants';

import FacebookAPIServerAbstractFacade from '../facebook_api_server_abstract_facade';
import AxiosRequestFacade from '../../../http/request/axios_request_facade';

import { combineMultipleURLPaths } from '../../../../utils/net/uri_utils';
import { throwGraphAPIHTTPError } from '../../../../utils/vendor/facebook_utils';
import { calcFileSizeInBytesAsync } from '../../../../utils/file/general_file_utils';
import { defaultTo } from '../../../../utils/misc/functional_utils';
import { isObjectOfType } from '../../../../utils/primitives/object_utils';
import { isString, isObject } from '../../../../utils/misc/logic_utils';

// implementation
class FacebookAPIPageResumableFileUploadFacade extends FacebookAPIServerAbstractFacade {
    protected findFileUploadInitPathPart(contentType: FacebookContentType) {
        switch(contentType) {
            case FacebookContentType.PageVideo:
                return FACEBOOK_GRAPH_API_PAGE_VIDEOS_PATH_PART;
            case FacebookContentType.PageReel:
                return FACEBOOK_GRAPH_API_PAGE_VIDEO_REELS_PATH_PART;
            default:
                throw new RangeError(`Cannot initiate video file upload - unknown path type "${contentType}"`);
        }
    }

    protected async initFileUpload(pageAccessToken: string, pageId: string, contentType: FacebookContentType): Promise<FacebookGraphAPIPageVideoUploadInitResponse> {
        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse | FacebookGraphAPIPageVideoUploadInitResponse>({
            baseURL: FACEBOOK_GRAPH_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), pageId, this.findFileUploadInitPathPart(contentType)]),
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                upload_phase: 'start',
                access_token: pageAccessToken,
            }
        });

        const { statusCode, data } = await httpClient.post();

        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot initiate video file upload: ', 'Unknown reason', data, statusCode);
        } else {
            const keysValidators = { video_id: isString, upload_url: isString };
            if (isObjectOfType<FacebookGraphAPIPageVideoUploadInitResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot initiate video file upload - wrong response');
            }
        }
    }

    protected async uploadChunk(pageAccessToken: string, uploadId: string, chunk: Buffer, fileSize: number, offset = 0): Promise<FacebookGraphAPIAppUploadChunkResponse | FacebookGraphAPIPageVideoUploadFinishResponse> {
        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse |
            FacebookGraphAPIAppUploadChunkResponse |
            FacebookGraphAPIAppUploadFinishResponse
        >({
            baseURL: FACEBOOK_GRAPH_REELS_UPLOAD_API_BASE_URL,
            url: combineMultipleURLPaths([FACEBOOK_GRAPH_REELS_UPLOAD_API_VIDEO_PATH_PART, this.getDefaultAPIVersion(), uploadId]),
            headers: {
                'Content-Type': MIME_TYPE_BIN,

                'Authorization': `OAuth ${pageAccessToken}`,
                'offset': offset.toString(),
                'file_size': fileSize.toString(),
            },

            data: chunk,
        });

        const { statusCode, data } = await httpClient.post();

        if (statusCode === 200) {
            const keysValidators = { success: isString };
            if (isObjectOfType<FacebookGraphAPIPageVideoUploadFinishResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot finalize file upload - wrong response');
            }
        } else if (statusCode === 206) {
            const keysValidators = { debug_info: isObject };
            if (isObjectOfType<FacebookGraphAPIAppUploadChunkResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot upload file chunk - wrong response');
            }
        } else {
            throwGraphAPIHTTPError('Cannot upload file: ', 'Unknown reason', data, statusCode);
        }
    }

    protected async startFileUploadStream(pageAccessToken: string, videoId: string, pathToFile: string, fileSize: number, fileUploadOptions?: FacebookGraphAPIAppUploadConfig): Promise<FacebookGraphAPIPageVideoUploadFinishResponse | null> {
        const { readBufferSize = FACEBOOK_GRAPH_API_FILE_UPLOAD_DEFAULT_BUFFER_SIZE } = defaultTo({})(fileUploadOptions);
        let fileOffset = 0;

        return new Promise<FacebookGraphAPIPageVideoUploadFinishResponse | null>((resolve, reject) => {
            const fsStream = createReadStream(pathToFile, { highWaterMark: readBufferSize });
            fsStream.on('data', (fileChunk: Buffer) => {
                fsStream.pause();

                this.uploadChunk(pageAccessToken, videoId, fileChunk, fileSize, fileOffset)
                    .then((uploadResult) => {
                        if ('success' in uploadResult) {
                            resolve(uploadResult);
                        }

                        fileOffset += fileChunk.buffer.byteLength;
                        fsStream.resume();
                    })
                    .catch(fsStream.destroy);
            });

            fsStream.on('error', (error: Error) => {
                reject(error)
            });
        });
    }

    public async uploadFileByPath(userAccessToken: string, pageAccessToken: string, pageId: string, pathToFile: string, contentType: FacebookContentType, fileUploadOptions?: FacebookGraphAPIAppUploadConfig) {
        if (!isString(userAccessToken)) {
            throw new RangeError('Cannot upload file to Facebook - user access token must be of type string');
        }

        if (!isString(pageAccessToken)) {
            throw new RangeError('Cannot upload file to Facebook - page access token must be of type string');
        }

        const fileSize = await calcFileSizeInBytesAsync(pathToFile);

        if (fileSize <= 0) {
            throw new RangeError('Cannot upload file to Facebook - cannot upload file which size is equal to zero');
        }

        const fbInitUploadResponse = await this.initFileUpload(pageAccessToken, pageId, contentType);
        await this.startFileUploadStream(pageAccessToken, fbInitUploadResponse.video_id, pathToFile, fileSize, fileUploadOptions);

        return fbInitUploadResponse;
    }
}

// exports
export default FacebookAPIPageResumableFileUploadFacade;