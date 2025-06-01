// external imports
import { Stream } from 'stream'

// internal imports
import { GenericObject } from '../../collection_declarations';

import { HTTPHeadersObject, HTTPHeadersCollection } from './headers_declarations';
import { HTTPResponseSchema } from './response_declarations';

// implementation
type HTTPRequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
type HTTPRequestParams = string | object | ArrayBufferView | URLSearchParams | FormData | File | Blob | Stream | Buffer;

type HTTPRequestConfig = {
    baseURL?: string,
    url?: string,
    method?: HTTPRequestMethod,
    headers?: HTTPHeadersCollection,
    params?: HTTPRequestParams,
    data?: GenericObject | FormData,
    timeout?: number, // in milliseconds
}

type HTTPAxiosRequestConfig = Omit<HTTPRequestConfig, 'headers'> & { headers: HTTPHeadersObject };

interface RequestFacade<ResponseDataType> {
    get(customConfig?: HTTPRequestConfig): Promise<HTTPResponseSchema<ResponseDataType>>;
    post(customConfig?: HTTPRequestConfig): Promise<HTTPResponseSchema<ResponseDataType>>;
    put(customConfig?: HTTPRequestConfig): Promise<HTTPResponseSchema<ResponseDataType>>;
    patch(customConfig?: HTTPRequestConfig): Promise<HTTPResponseSchema<ResponseDataType>>;
    delete(customConfig?: HTTPRequestConfig): Promise<HTTPResponseSchema<ResponseDataType>>;

    request(customConfig?: HTTPRequestConfig): Promise<HTTPResponseSchema<ResponseDataType>>;
}

// exports
export {
    HTTPRequestMethod,
    HTTPRequestParams,
    HTTPAxiosRequestConfig,
    HTTPRequestConfig,
    RequestFacade,
}