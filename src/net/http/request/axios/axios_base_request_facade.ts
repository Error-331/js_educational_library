// external imports
import axios, { AxiosResponse, AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';

// internal imports
import { HTTPResponseSchema } from '../../../../declarations/net/http/response_declarations';
import { HTTPRequestConfig, HTTPAxiosRequestConfig, HTTPAxiosRequestFacadePartial } from '../../../../declarations/net/http/request_declarations';

import { mapToObject } from '../../../../utils/primitives/object_utils';
import { isNil } from '../../../../utils/misc/logic_utils';

// implementation
function AxiosBaseRequestFacade<ResponseDataType, BaseClass extends HTTPAxiosRequestFacadePartial>(BaseClass: BaseClass) {
    return class AxiosBaseRequestFacade extends BaseClass {
        protected normalizeAxiosResponse(response: AxiosResponse<ResponseDataType> ): HTTPResponseSchema<ResponseDataType, RawAxiosResponseHeaders | AxiosResponseHeaders> {
            return {
                data: response.data,
                statusCode: response.status,
                statusText: response.statusText,
                headers: response.headers,
            };
        }

        protected prepareAxiosConfig(customConfig?: HTTPRequestConfig): HTTPAxiosRequestConfig {
            return {
                ...customConfig,
                headers: customConfig.headers instanceof Headers ? mapToObject(customConfig.headers) : customConfig.headers,
            };
        }

        public async request(customConfig?: HTTPRequestConfig): Promise<HTTPResponseSchema<ResponseDataType, RawAxiosResponseHeaders | AxiosResponseHeaders>> {
            const newConfig = this.mergeCustomConfig(customConfig);
            const axiosConfig = this.prepareAxiosConfig(newConfig);

            let response;

            try {
                response = await axios<ResponseDataType>(axiosConfig);
            } catch (error) {
                if (!isNil(error.response)) {
                    response = error.response;
                } else {
                    throw error;
                }
            }

            return this.normalizeAxiosResponse(response);
        }
    }
}

// exports
export default AxiosBaseRequestFacade;