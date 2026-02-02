// external imports
import { Stream } from 'stream';

// internal imports
import { GenericMixinConstructor } from '../../utility_declarations';
import { GenericObject } from '../../collection_declarations';

import { HTTPHeadersObject, HTTPHeadersCollection } from './headers_declarations';
import { HTTPResponseSchema } from './response_declarations';

// implementation
type HTTPRequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
type HTTPRequestParams = string | object | ArrayBufferView | URLSearchParams | FormData | File | Blob | Stream | Buffer;

type HTTPRequestData = GenericObject | FormData | Stream | Buffer;

type HTTPRequestConfig = {
    baseURL?: string,
    url?: string,
    method?: HTTPRequestMethod,
    headers?: HTTPHeadersCollection,
    params?: HTTPRequestParams,
    data?: HTTPRequestData,
    timeout?: number, // in milliseconds
}

type HTTPFetchRequestData = string | FormData | ReadableStream | Buffer;
type HTTPFetchRequestConfig = Omit<HTTPRequestConfig, 'data'> & { body: HTTPFetchRequestData };

type HTTPAxiosRequestConfig = Omit<HTTPRequestConfig, 'headers'> & { headers: HTTPHeadersObject };
type HTTPAxiosRequestFacadePartial = GenericMixinConstructor<{ mergeCustomConfig: (customConfig?: HTTPRequestConfig) => HTTPRequestConfig }>;

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

    HTTPFetchRequestData,
    HTTPFetchRequestConfig,
    HTTPAxiosRequestConfig,

    HTTPRequestData,
    HTTPRequestConfig,
    HTTPAxiosRequestFacadePartial,
    RequestFacade,
}