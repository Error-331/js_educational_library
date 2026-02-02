// external imports
import axios, { AxiosResponse } from 'axios';

// internal imports
import { HTTPResponseSchema } from '../../../../declarations/net/http/response_declarations';
import {
    HTTPRequestConfig,
    HTTPFetchRequestData,
    HTTPAxiosRequestFacadePartial,
    HTTPFetchRequestConfig,
    HTTPRequestData,
} from '../../../../declarations/net/http/request_declarations';

import { mapToObject } from '../../../../utils/primitives/object_utils';
import { combineURLPaths } from '../../../../utils/net/uri_utils';
import { isNil, isObject } from '../../../../utils/misc/logic_utils';

// implementation
function NativeBaseRequestFacade<ResponseDataType, BaseClass extends HTTPAxiosRequestFacadePartial>(BaseClass: BaseClass) {
    return class AxiosBaseRequestFacade extends BaseClass {
        protected normalizeFetchResponse(response: AxiosResponse<ResponseDataType> ): HTTPResponseSchema<ResponseDataType> {
            return {
                data: response.data,
                statusCode: response.status,
                statusText: response.statusText
            };
        }

        protected prepareRequestBody(data: HTTPRequestData): HTTPFetchRequestData {
            return isObject(data) ? JSON.stringify(data) : data;
        }

        protected prepareFetchConfig(customConfig?: HTTPRequestConfig): HTTPFetchRequestConfig {
            return {
                ...customConfig,
                url: combineURLPaths(customConfig.baseURL, customConfig.url),
                headers: customConfig.headers instanceof Headers ? customConfig.headers : new Headers(customConfig.headers),
                body: this.prepareRequestBody(customConfig.data),
            };
        }

        public async request(customConfig?: HTTPRequestConfig): Promise<HTTPResponseSchema<ResponseDataType>> {
            const newConfig = this.mergeCustomConfig(customConfig);
            const config = this.prepareFetchConfig(newConfig);

            const requestObject = new Request(config.url, config);

            let response;

            try {
                response = await fetch(requestObject);
            } catch (error) {
                if (!isNil(error.response)) {
                    response = error.response;
                } else {
                    throw error;
                }
            }
            // https://habr.com/ru/companies/otus/articles/795559/
            return this.normalizeFetchResponse(response);
        }
    }
}

// exports
export default NativeBaseRequestFacade;