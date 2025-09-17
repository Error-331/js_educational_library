// external imports
import { basename } from 'node:path';
import { createReadStream } from 'node:fs';

// internal imports
import { FacebookGraphAPIErrorResponse } from '../../../../declarations/vendor/facebook/facebook_base_declarations';
import {
    FacebookGraphAPIAppUploadConfig,

    FacebookGraphAPIAppUploadsResponse,
    FacebookGraphAPIAppUploadChunkResponse,
    FacebookGraphAPIAppUploadFinishResponse,
} from '../../../../declarations/vendor/facebook/facebook_app_api_declarations';

import {
    FACEBOOK_GRAPH_API_FILE_UPLOAD_DEFAULT_BUFFER_SIZE,

    FACEBOOK_GRAPH_API_BASE_URL,
    FACEBOOK_GRAPH_API_COMMON_UPLOADS_PATH_PART
} from '../../../../constants/net/api/facebook/facebook_common_constants';

import FacebookAPIServerAbstractFacade from '../facebook_api_server_abstract_facade';
import AxiosRequestFacade from '../../../http/request/axios_request_facade';

import { combineMultipleURLPaths } from '../../../../utils/net/uri_utils';
import { throwGraphAPIHTTPError } from '../../../../utils/vendor/facebook_utils';
import { extractFileExtension } from '../../../../utils/misc/path_utils';
import { calcFileSizeInBytesAsync } from '../../../../utils/file/general_file_utils';
import { findMIMETypeByFileExtensionAndVideoMetaType } from '../../../../utils/net/mime_types_utils';
import { defaultTo } from '../../../../utils/misc/functional_utils';
import { isObjectOfType } from '../../../../utils/primitives/object_utils';
import { isString, isObject } from '../../../../utils/misc/logic_utils';

// implementation
class FacebookAPIAppResumableFileUploadFacade extends FacebookAPIServerAbstractFacade {
    protected async initFileUpload(userAccessToken: string, fileName: string, fileMIMEType: string, fileLength: number): Promise<FacebookGraphAPIAppUploadsResponse> {
        const serverOptions = this.getFacebookServerOptions();
        const params = new URLSearchParams();

        params.append('access_token', userAccessToken);
        params.append('file_name', fileName);
        params.append('file_type', fileMIMEType);
        params.append('file_length', fileLength.toString());

        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse | FacebookGraphAPIAppUploadsResponse>({
            baseURL: FACEBOOK_GRAPH_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), serverOptions.appId, FACEBOOK_GRAPH_API_COMMON_UPLOADS_PATH_PART]),
            params,
        });

        const { statusCode, data } = await httpClient.post();

        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot initiate file upload: ', 'Unknown reason', data, statusCode);
        } else {
            const keysValidators = { id: isString };
            if (isObjectOfType<FacebookGraphAPIAppUploadsResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot initiate file upload - wrong response');
            }
        }
    }

    protected async uploadChunk(userAccessToken: string, uploadId: string, chunk: Buffer, offset = 0): Promise<FacebookGraphAPIAppUploadChunkResponse | FacebookGraphAPIAppUploadFinishResponse> {
        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse |
            FacebookGraphAPIAppUploadChunkResponse |
            FacebookGraphAPIAppUploadFinishResponse
        >({
            baseURL: FACEBOOK_GRAPH_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), uploadId, FACEBOOK_GRAPH_API_COMMON_UPLOADS_PATH_PART]),
            headers: {
                'Authorization': `OAuth ${userAccessToken}`,
                'file_offset': offset.toString(),
            },

            data: chunk,
        });

        const { statusCode, data } = await httpClient.post();

        if (statusCode === 200) {
            const keysValidators = { h: isString };
            if (isObjectOfType<FacebookGraphAPIAppUploadFinishResponse>(data, keysValidators)) {
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

    protected async startFileUploadStream(userAccessToken: string, uploadId: string, pathToFile: string, fileUploadOptions?: FacebookGraphAPIAppUploadConfig): Promise<FacebookGraphAPIAppUploadFinishResponse | null> {
        const { readBufferSize = FACEBOOK_GRAPH_API_FILE_UPLOAD_DEFAULT_BUFFER_SIZE } = defaultTo({})(fileUploadOptions);
        let fileOffset = 0;

        return new Promise<FacebookGraphAPIAppUploadFinishResponse | null>((resolve, reject) => {
            const fsStream = createReadStream(pathToFile, { highWaterMark: readBufferSize });
            fsStream.on('data', (fileChunk: Buffer) => {
                fsStream.pause();

                this.uploadChunk(userAccessToken, uploadId, fileChunk, fileOffset)
                    .then((uploadResult) => {
                        if ('h' in uploadResult) {
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

    public async uploadFileByPath(userAccessToken: string, pathToFile: string, fileUploadOptions?: FacebookGraphAPIAppUploadConfig) {
        if (!isString(userAccessToken)) {
            throw new RangeError('Cannot upload file to Facebook - user access token must be of type string');
        }

        const fileExtension = extractFileExtension(pathToFile);
        const fileName = basename(pathToFile);
        const fileMIMEType = findMIMETypeByFileExtensionAndVideoMetaType(fileExtension);
        const fileSize = await calcFileSizeInBytesAsync(pathToFile);

        if (fileSize <= 0) {
            throw new RangeError('Cannot upload file to Facebook - cannot upload file which size is equal to zero');
        }

        const fbUploadResponse = await this.initFileUpload(userAccessToken, fileName, fileMIMEType, fileSize);
        return this.startFileUploadStream(userAccessToken, fbUploadResponse.id, pathToFile, fileUploadOptions);
    }
}

// exports
export default FacebookAPIAppResumableFileUploadFacade;