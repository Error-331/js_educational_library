// external imports

// internal imports
import type { GCPGenerativeLanguageRESTAPIInfoResponse } from '../../../../declarations/net/api/gcp/gcp_generative_language_declarations';

import {
    GCP_GENERATIVE_LANGUAGE_API_BASE_URL,
    GCP_GENERATIVE_LANGUAGE_API_DISCOVERY_PATH_PART,
    GCP_GENERATIVE_LANGUAGE_API_REST_PATH_PART
} from '../../../../constants/net/api/gcp/gcp_generative_language/gcp_generative_language_common_constants';

import AxiosRequestFacade from '../../../http/request/axios/axios_server_request_facade';

import { combineMultipleURLPaths } from '../../../../utils/net/uri_utils';
import { throwGraphAPIHTTPError } from '../../../../utils/vendor/facebook_utils';
import { isString } from '../../../../utils/misc/logic_utils';
import { isObjectOfType } from '../../../../utils/primitives/object_utils';

// implementation
class GCPGenerativeLanguageFacade {
    public async loadRESTAPIInfo(): Promise<GCPGenerativeLanguageRESTAPIInfoResponse> {
        const httpClient = new AxiosRequestFacade<unknown | GCPGenerativeLanguageRESTAPIInfoResponse>({
            baseURL: GCP_GENERATIVE_LANGUAGE_API_BASE_URL,
            url: combineMultipleURLPaths([GCP_GENERATIVE_LANGUAGE_API_DISCOVERY_PATH_PART, GCP_GENERATIVE_LANGUAGE_API_REST_PATH_PART]),
        });

        const { statusCode, data } = await httpClient.get();
        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot retrieve GCP Generative language REST APIs list: ', 'Unknown reason', data, statusCode);
        } else {
            const keysValidators = { id: isString, kind: isString, version: isString };
            if (data && isObjectOfType<GCPGenerativeLanguageRESTAPIInfoResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot retrieve GCP Generative language REST APIs list - wrong response');
            }
        }
    }
}

// exports
export default GCPGenerativeLanguageFacade;
