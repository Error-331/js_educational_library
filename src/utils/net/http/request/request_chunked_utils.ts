// external imports

// internal imports
import { HTTPRequestConfig } from '../../../../declarations/net/http/request_declarations';
import { HTTPResponseDataSchema, HTTPResponseSchema } from '../../../../declarations/net/http/response_declarations';
import type { SimpleQueryEntry } from '../../../../declarations/net/url/query/simple_query_to_url_query_converter_declarations';

import { API_REQUEST_ENTITIES_LIMIT, API_REQUEST_SIMULTANEOUS_CONNECTIONS_LIMIT } from '../../../../constants/net/api/api_common_constants';

import AxiosRequestFacade from '../../../../net/http/request/axios/axios_client_request_facade';
import { calcPagesCount } from '../../../math/math_count_utils';
import { isObject } from '../../../misc/logic_utils';

// implementation
async function* loadDataByPageChunks<ResponseDataType>(httpRequestConfig: HTTPRequestConfig, numberOfRecords: number, filters?: SimpleQueryEntry[]): AsyncGenerator<HTTPResponseSchema<HTTPResponseDataSchema<false, ResponseDataType>>[], void, unknown> {
    const numberOfPages = calcPagesCount(numberOfRecords, API_REQUEST_ENTITIES_LIMIT);
    const numberOfRequestBunches = calcPagesCount(numberOfPages, API_REQUEST_SIMULTANEOUS_CONNECTIONS_LIMIT);

    let pageIncrement = 0;

    for (let chunkStartIdx = 0; chunkStartIdx < numberOfRequestBunches; chunkStartIdx += 1) {
        const reqPromises = [];
        for (let reqIdx = 1; reqIdx < API_REQUEST_SIMULTANEOUS_CONNECTIONS_LIMIT + 1; reqIdx += 1) {
            const defaultParams = { page: reqIdx + pageIncrement, limit: API_REQUEST_ENTITIES_LIMIT, query: '' }
            const params = isObject(httpRequestConfig?.params) ? Object.assign({}, httpRequestConfig?.params, defaultParams) : defaultParams;

            const requestConfig = {
                ...httpRequestConfig,
                params,
                method: 'get',
            };

            const httpClient = new AxiosRequestFacade<HTTPResponseDataSchema<false, ResponseDataType>>(requestConfig);
            reqPromises.push(httpClient.get())
        }

        pageIncrement += 5;
        yield Promise.all(reqPromises);
    }
}

// exports
export {
    loadDataByPageChunks,
}