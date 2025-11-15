// external imports
import { Readable } from 'node:stream';

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
    HTTP_REQUEST_TIMEOUT,
    HTTP_REQUEST_TIMEOUT_PADDING,
    HTTP_REQUEST_TRY_ATTEMPT_MAX,

    HTTP_REQUEST_DATA_MAX_CHUNK_SIZE,
} from '../../../../constants/net/http/request_constants';

import {
    FACEBOOK_GRAPH_API_FILE_UPLOAD_DEFAULT_BUFFER_SIZE,

    FACEBOOK_GRAPH_API_BASE_URL,
    FACEBOOK_GRAPH_API_COMMON_UPLOADS_PATH_PART
} from '../../../../constants/net/api/facebook/facebook_common_constants';

import FacebookAPIServerAbstractFacade from '../facebook_api_server_abstract_facade';
import AxiosRequestFacade from '../../../http/request/axios/axios_server_request_facade';

import { combineMultipleURLPaths } from '../../../../utils/net/uri_utils';
import { throwGraphAPIHTTPError } from '../../../../utils/vendor/facebook_utils';
import { extractFileExtension } from '../../../../utils/misc/path_utils';
import { calcFileSizeInBytesAsync } from '../../../../utils/file/server_file_utils';
import { findMIMETypeByFileExtensionAndVideoMetaType } from '../../../../utils/net/mime_types_utils';
import { asyncDelay } from '../../../../utils/async/timeout_utils';
import { defaultTo } from '../../../../utils/misc/functional_utils';
import { isObjectOfType } from '../../../../utils/primitives/object_utils';
import { stringToInt } from '../../../../utils/primitives/string/string_to_number_utils';
import { isNil, isString, isArray, isObject } from '../../../../utils/misc/logic_utils';

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

    protected async uploadChunk(userAccessToken: string, uploadId: string, chunk: Buffer, offset = 0, tryAttempt = 0): Promise<FacebookGraphAPIAppUploadChunkResponse | FacebookGraphAPIAppUploadFinishResponse> {
        if (tryAttempt >= HTTP_REQUEST_TRY_ATTEMPT_MAX) {
            throw new Error(`Cannot upload file chunk: the number of attempts has been exhausted (${tryAttempt})`);
        }

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

        const { statusCode, data, headers } = await httpClient.post();

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
        } else if (statusCode === 429) {
            if (!isNil(headers['retry-after'])) {
                const retryAfter = stringToInt(headers['retry-after']);

                await asyncDelay((retryAfter * 1000) + HTTP_REQUEST_TIMEOUT_PADDING);
                return this.uploadChunk(userAccessToken, uploadId, chunk, offset, tryAttempt + 1);
            } else {
                await asyncDelay(HTTP_REQUEST_TIMEOUT);
                return this.uploadChunk(userAccessToken, uploadId, chunk, offset, tryAttempt + 1);
            }
        } else {
            throwGraphAPIHTTPError('Cannot upload file: ', 'Unknown reason', data, statusCode);
        }
    }

    protected prepareReadStreamFromFile(pathToFile: string, fileUploadOptions?: FacebookGraphAPIAppUploadConfig) {
        const { readBufferSize = FACEBOOK_GRAPH_API_FILE_UPLOAD_DEFAULT_BUFFER_SIZE } = defaultTo({})(fileUploadOptions);
        return createReadStream(pathToFile, { highWaterMark: readBufferSize });
    }

    protected async startFileUploadStream(userAccessToken: string, uploadId: string, fsStream: Readable, fileSize: string | number): Promise<FacebookGraphAPIAppUploadFinishResponse | null> {
        let fileOffset = 0;

        return new Promise<FacebookGraphAPIAppUploadFinishResponse | null>((resolve, reject) => {
            let totalBufferSize = 0;
            let bufferArray: Buffer[] = [];

            fsStream.on('data', (fileChunk: Buffer) => {
                totalBufferSize += fileChunk.buffer.byteLength;
                bufferArray.push(fileChunk);

                const uploadLeftSize = (stringToInt(fileSize) - fileOffset);

                if (totalBufferSize >= HTTP_REQUEST_DATA_MAX_CHUNK_SIZE) {
                    fsStream.pause();
                    const dataChunk = Buffer.concat(bufferArray);

                    this.uploadChunk(userAccessToken, uploadId, dataChunk, fileOffset)
                        .then((uploadResult) => {
                            if ('h' in uploadResult) {
                                resolve(uploadResult);
                            }

                            fileOffset += totalBufferSize;
                            totalBufferSize = 0;
                            bufferArray = [];

                            fsStream.resume();
                        })
                        .catch((error) => {
                            fsStream.destroy(error)
                        });
                } else if (uploadLeftSize <= HTTP_REQUEST_DATA_MAX_CHUNK_SIZE && totalBufferSize >= uploadLeftSize) {
                    const dataChunk = Buffer.concat(bufferArray);

                    this.uploadChunk(userAccessToken, uploadId, dataChunk, fileOffset)
                        .then((uploadResult) => {
                            if ('h' in uploadResult) {
                                resolve(uploadResult);
                            }
                        })
                        .catch((error) => {
                            fsStream.destroy(error)
                        });
                }
            });

            fsStream.on('error', (error: Error) => {
                reject(error)
            });
        });
    }

    public async uploadFileByStream(userAccessToken: string, fileMIMEType: string, fileName: string, fileSize: string | number, readableStream: Readable, fileUploadOptions?: FacebookGraphAPIAppUploadConfig) {
        if (!isString(userAccessToken)) {
            throw new RangeError('Cannot upload file to Facebook - user access token must be of type string');
        }

        if (!isString(fileMIMEType)) {
            throw new RangeError('Cannot upload file to Facebook - file MIME type must be of type string');
        }

        if (!isString(fileName)) {
            throw new RangeError('Cannot upload file to Facebook - file name must be of type string');
        }

        const preparedFileSize = stringToInt(fileSize);
        if (preparedFileSize <= 0) {
            throw new RangeError('Cannot upload file to Facebook - cannot upload file which size is equal to zero');
        }

        const fbUploadResponse = await this.initFileUpload(userAccessToken, fileName, fileMIMEType, preparedFileSize);
        return this.startFileUploadStream(userAccessToken, fbUploadResponse.id, readableStream, preparedFileSize);
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

        const fbUploadResponse = await this.initFileUpload(userAccessToken, fileName, isArray(fileMIMEType) ? fileMIMEType[0] : fileMIMEType, fileSize);
        const readStream = this.prepareReadStreamFromFile(pathToFile, fileUploadOptions);

        return this.startFileUploadStream(userAccessToken, fbUploadResponse.id, readStream);
    }
}

// exports
export default FacebookAPIAppResumableFileUploadFacade;