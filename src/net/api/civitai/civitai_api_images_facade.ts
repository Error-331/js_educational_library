// external imports

// internal imports
import type { CivitAIAPIErrorResponse } from '../../../declarations/vendor/civitai/civitai_base_server_declarations';
import type { CivitAIImagesQueryParameters, CivitAIAPIImagesResponse } from '../../../declarations/vendor/civitai/civitai_images_api_declarations';

import AxiosRequestFacade from '../../http/request/axios/axios_server_request_facade';
import CivitAIAPIServerAbstractFacade from "./civitai_api_server_abstract_facade";

import { HTTP_DEFAULT_AUTHORIZATION_HEADER_NAME } from '../../../constants/net/http/request_constants';

import {
    CIVITAI_API_BASE_URL, CIVITAI_API_IMAGES_ENDPOINT,
    CIVITAI_API_IMAGES_REQUEST_AVERAGE_LIMIT
} from '../../../constants/net/api/civitai/civitai_common_constants';

import { combineMultipleURLPaths } from '../../../utils/net/uri_utils';
import { isObjectOfType } from '../../../utils/primitives/object_utils';
import { isNil, isArray } from '../../../utils/misc/logic_utils';

// implementation
class CivitAIAPIImagesFacade extends CivitAIAPIServerAbstractFacade {
    protected prepareQueryParameters(queryParameters?: CivitAIImagesQueryParameters) {
        const params = new URLSearchParams();

        if (isNil(queryParameters)) {
            params.append('limit', CIVITAI_API_IMAGES_REQUEST_AVERAGE_LIMIT.toString());
            return params;
        }

        for (const queryKey in queryParameters) {
            let queryValue;

            if (queryKey === 'tags' || queryKey === 'baseModels') {
                queryValue = queryParameters[queryKey].join(',').toString();
            } else {
                queryValue = queryParameters[queryKey].toString();
            }


            params.append(queryKey, queryValue);
        }

        if (isNil(queryParameters['limit'])) {
            params.append('limit', CIVITAI_API_IMAGES_REQUEST_AVERAGE_LIMIT.toString());
        }

        return params;
    }

    public async retrieveImagesList(queryParameters?: CivitAIImagesQueryParameters): Promise<CivitAIAPIImagesResponse> {
        const params = this.prepareQueryParameters(queryParameters);

        const httpClient = new AxiosRequestFacade<CivitAIAPIErrorResponse | CivitAIAPIImagesResponse>({
            baseURL: CIVITAI_API_BASE_URL,
            url: combineMultipleURLPaths([this.getDefaultAPIVersion(), CIVITAI_API_IMAGES_ENDPOINT]),
            headers: {
                [HTTP_DEFAULT_AUTHORIZATION_HEADER_NAME]: `Bearer ${this.getAPIToken()}`
            },
            params,
        });

        const { statusCode, data } = await httpClient.get();
        if (statusCode !== 200) {
            this.handleFinalError(data, statusCode);
        } else {
            const keysValidators = { items: isArray };
            if (isObjectOfType<CivitAIAPIImagesResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot retrieve images (CivitAI) - wrong response');
            }
        }

    }
}

// exports
export default CivitAIAPIImagesFacade;