// external imports
import axios, { AxiosResponse } from 'axios';

// internal imports
import { HTTPResponseSchema } from '../../../declarations/net/http/response_declarations';
import { HTTPRequestConfig, HTTPAxiosRequestConfig, RequestFacade } from '../../../declarations/net/http/request_declarations';

import AbstractRequestFacade from './abstract_request_facade';

import { mapToObject } from '../../../utils/primitives/object_utils';
import { isNil } from '../../../utils/misc/logic_utils';

// implementation
class AxiosRequestFacade<ResponseDataType>
    extends AbstractRequestFacade<ResponseDataType>
    implements RequestFacade<ResponseDataType> {

    private normalizeAxisResponse(response: AxiosResponse<ResponseDataType> ): HTTPResponseSchema<ResponseDataType> {
        return {
            data: response.data,
            statusCode: response.status,
            statusText: response.statusText
        };
    }

    private prepareAxiosConfig(customConfig?: HTTPRequestConfig): HTTPAxiosRequestConfig {
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

        return this.normalizeAxisResponse(response);
    }
}

// exports
export default AxiosRequestFacade;