// external imports

// internal imports
import type { GCPAPIDiscoveryAPItemsResponse } from '../../../../declarations/net/api/gcp/gcp_api_discovery_declarations';

import {
    GCP_DISCOVERY_API_BASE_URL,
    GCP_DISCOVERY_API_DISCOVERY_PATH_PART,
    GCP_DISCOVERY_API_APIS_PATH_PART,
} from '../../../../constants/net/api/gcp/gcp_api_discovery/gcp_api_discovery_common_constants';

import AxiosRequestFacade from '../../../http/request/axios/axios_server_request_facade';

import { combineMultipleURLPaths } from '../../../../utils/net/uri_utils';
import { throwGraphAPIHTTPError } from '../../../../utils/vendor/facebook_utils';
import { isString, isArray } from '../../../../utils/misc/logic_utils';
import { isObjectOfType } from '../../../../utils/primitives/object_utils';

// implementation
class GCPAPIDiscoveryFacade {
    public async loadAPIList(apiVersion = 'v1'): Promise<GCPAPIDiscoveryAPItemsResponse> {
        const httpClient = new AxiosRequestFacade<unknown | GCPAPIDiscoveryAPItemsResponse>({
            baseURL: GCP_DISCOVERY_API_BASE_URL,
            url: combineMultipleURLPaths([GCP_DISCOVERY_API_DISCOVERY_PATH_PART, apiVersion, GCP_DISCOVERY_API_APIS_PATH_PART]),
        });

        const { statusCode, data } = await httpClient.get();
        if (statusCode !== 200) {
            throwGraphAPIHTTPError('Cannot retrieve GCP API discovery list: ', 'Unknown reason', data, statusCode);
        } else {
            const keysValidators = { kind: isString, discoveryVersion: isString, items: isArray };
            if (data && isObjectOfType<GCPAPIDiscoveryAPItemsResponse>(data, keysValidators)) {
                return data;
            } else {
                throw new Error('Cannot retrieve GCP API discovery list - wrong response');
            }
        }
    }
}

// exports
export default GCPAPIDiscoveryFacade;