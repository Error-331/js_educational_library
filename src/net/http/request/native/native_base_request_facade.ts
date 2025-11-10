// external imports
import axios, { AxiosResponse } from 'axios';

// internal imports
import { HTTPResponseSchema } from '../../../../declarations/net/http/response_declarations';
import { HTTPRequestConfig, HTTPAxiosRequestConfig, HTTPAxiosRequestFacadePartial } from '../../../../declarations/net/http/request_declarations';

import { mapToObject } from '../../../../utils/primitives/object_utils';
import { isNil } from '../../../../utils/misc/logic_utils';

// implementation
function NativeBaseRequestFacade<ResponseDataType, BaseClass extends HTTPAxiosRequestFacadePartial>(BaseClass: BaseClass) {
    return class AxiosBaseRequestFacade extends BaseClass {
        protected normalizeAxiosResponse(response: AxiosResponse<ResponseDataType> ): HTTPResponseSchema<ResponseDataType> {
            return {
                data: response.data,
                statusCode: response.status,
                statusText: response.statusText
            };
        }

        protected prepareAxiosConfig(customConfig?: HTTPRequestConfig): HTTPAxiosRequestConfig {
            return {
                ...customConfig,
                headers: customConfig.headers instanceof Headers ? mapToObject(customConfig.headers) : customConfig.headers,
            };
        }

        public async request(customConfig?: HTTPRequestConfig): Promise<HTTPResponseSchema<ResponseDataType>> {
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
            // https://habr.com/ru/companies/otus/articles/795559/
            return this.normalizeAxiosResponse(response);
        }
    }
}

// exports
export default NativeBaseRequestFacade;