// external imports
import { Readable } from 'node:stream';

// internal imports
import { GenericObject } from '../../../../declarations/collection_declarations';
import { FacebookGraphAPIErrorResponse } from '../../../../declarations/vendor/facebook/facebook_base_declarations';
import {
    FacebookAPIPagePhotoPublishOptions,
    FacebookAPIPagePhotosPublishOptions,

    FacebookGraphAPIPagePhotoUploadFinishResponse,
    FacebookGraphAPIPagePhotoPublishResponse,
    FacebookGraphAPIPagePhotosPublishResponse,
} from '../../../../declarations/vendor/facebook/facebook_page_api_declarations';

import { FACEBOOK_GRAPH_API_BASE_URL } from '../../../../constants/net/api/facebook/facebook_common_constants';
import { FACEBOOK_GRAPH_API_PAGE_PHOTOS_PATH_PART } from '../../../../constants/net/api/facebook/facebook_page_constants';

import FacebookAPIServerAbstractFacade from './../facebook_api_server_abstract_facade';
import AxiosRequestFacade from '../../../http/request/axios/axios_server_request_facade';

import BinaryFileToMultipartFormDataTransformStream from '../../../http/streams/transform/binary_file_to_multipart_form_data_transform_stream';

import { combineMultipleURLPaths } from '../../../../utils/net/uri_utils';
import { throwGraphAPIHTTPError } from '../../../../utils/vendor/facebook_utils';
import { isObjectOfType } from '../../../../utils/primitives/object_utils';
import { isNil, isString } from '../../../../utils/misc/logic_utils';

// implementation
class FacebookAPIPagePhotosFacade extends FacebookAPIServerAbstractFacade {
    public async uploadPhoto(pageAccessToken: string, pageId: string, fileName: string, fileStream: Readable): Promise<FacebookGraphAPIPagePhotoUploadFinishResponse> {
        if (isNil(fileStream)) {
            throw new Error('Cannot upload photo to the page - file stream is not specified');
        }

        const transformStream = new BinaryFileToMultipartFormDataTransformStream({
            fileName,
            fileFieldName: 'source',

            data: {
                access_token: pageAccessToken,
                published: 'false',
            }
        });

        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse | FacebookGraphAPIPagePhotoUploadFinishResponse>({
            baseURL: FACEBOOK_GRAPH_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), pageId, FACEBOOK_GRAPH_API_PAGE_PHOTOS_PATH_PART]),
            headers: {
                'Content-Type': `multipart/form-data; boundary=${transformStream.boundary}`,
            },

            data: fileStream.pipe(transformStream)
        });

        const { statusCode, data } = await httpClient.post();
        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot upload photo to the page: ', 'Unknown reason', data, statusCode);
        } else {
            const keysValidators = { id: isString };
            if (isObjectOfType<FacebookGraphAPIPagePhotoUploadFinishResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot upload photo to the page - wrong response');
            }
        }

        return;
    }

    public async publishUploadedPhotos(pageAccessToken: string, pageId: string, imagesPublishOptions: FacebookAPIPagePhotosPublishOptions): Promise<FacebookGraphAPIPagePhotosPublishResponse> {
        const formData: GenericObject<string | boolean | object> = {
            access_token: pageAccessToken,
            published: true,
            caption: imagesPublishOptions.caption,
            message: imagesPublishOptions.caption, // for some reason Facebook still relies on 'message' property (although it is said that it is deprecated) and that in the API calls only 'caption' should be used
            link: imagesPublishOptions.link,
        }

        for (let photoId = 0; photoId < imagesPublishOptions.photoIds.length; photoId++) {
            formData[`attached_media[${photoId}]`] = { media_fbid: imagesPublishOptions.photoIds[photoId] };
        }

        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse | FacebookGraphAPIPagePhotosPublishResponse>({
            baseURL: FACEBOOK_GRAPH_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), pageId, '/feed']),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },

            data: formData
        });

        const { statusCode, data } = await httpClient.post();
        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot publish photos to the page: ', 'Unknown reason', data, statusCode);
        } else {
            const keysValidators = { id: isString };
            if (isObjectOfType<FacebookGraphAPIPagePhotosPublishResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot publish photos to the page - wrong response');
            }
        }

    }

    public async uploadAndPublishPhotoByURL(pageAccessToken: string, pageId: string, imagePublishOptions: FacebookAPIPagePhotoPublishOptions): Promise<FacebookGraphAPIPagePhotoPublishResponse> {
        const httpClient = new AxiosRequestFacade<FacebookGraphAPIErrorResponse | FacebookGraphAPIPagePhotoPublishResponse>({
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

        const { statusCode, data } = await httpClient.post();
        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot publish photo to the page: ', 'Unknown reason', data, statusCode);
        } else {
            const keysValidators = { id: isString, post_id: isString };
            if (isObjectOfType<FacebookGraphAPIPagePhotoPublishResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot publish photo to the page - wrong response');
            }
        }
    }
}

// exports
export default FacebookAPIPagePhotosFacade;