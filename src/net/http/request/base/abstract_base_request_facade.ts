// external imports

// internal imports
import { GenericObject } from '../../../../declarations/collection_declarations';

import {
    HTTPRequestMethod,
    HTTPRequestParams,
    HTTPResponseType,
    HTTPRequestConfig,
    HTTPRequestData,

    RequestFacade,
} from '../../../../declarations/net/http/request_declarations';

import { HTTP_REQUEST_TIMEOUT } from '../../../../constants/net/http/request_constants';

import { HTTPResponseSchema } from '../../../../declarations/net/http/response_declarations';
import { HTTPHeadersCollection } from '../../../../declarations/net/http/headers_declarations';

import { removeLastSpecialSymbolStringFormatter } from '../../../../utils/primitives/string/basic_string_formatting_utils';
import { cloneDeep } from '../../../../utils/primitives/object_utils';
import { isNil } from '../../../../utils/misc/logic_utils';

// implementation
abstract class AbstractBaseRequestFacade<ResponseDataType> implements RequestFacade<ResponseDataType> {
    protected _baseURL: string;
    protected _url: string;

    protected _method: HTTPRequestMethod = 'get';
    protected _headers: HTTPHeadersCollection = {};
    protected _params: HTTPRequestParams = {};
    protected _data: HTTPRequestData;
    protected _timeout: number = HTTP_REQUEST_TIMEOUT;
    protected _responseType: HTTPResponseType | undefined;

    constructor(config: HTTPRequestConfig) {
        this.updateConfig(config);
    }

    protected updateConfig(config: HTTPRequestConfig): void {
        // validate here
        if (!isNil(config.baseURL)) {
            this.baseURL = config.baseURL
        }

        if (!isNil(config.url)) {
            this.url = config.url;
        }

        if (!isNil(config.method)) {
            this.method = config.method;
        }

        if (!isNil(config.headers)) {
            this.headers = config.headers;
        }

        if (!isNil(config.params)) {
            this.params = config.params;
        }

        if (!isNil(config.data)) {
            this.data = config.data;
        }

        if (!isNil(config.timeout)) {
            this.timeout = config.timeout;
        }

        if (!isNil(config.responseType)) {
            this.responseType = config.responseType;
        }
    }

    protected prepareRequestURL(): string {
        if (isNil(this.baseURL) && isNil(this.url)) {
            throw new RangeError('Cannot prepare request URL - both base URL and URL part are unknown');
        } else if (!isNil(this.baseURL) && isNil(this.url)) {
            return this.baseURL;
        } else if (isNil(this.baseURL) && !isNil(this.url)) {
            return this.url;
        } else {
            const baseURL = removeLastSpecialSymbolStringFormatter('/', this._baseURL);
            const url = removeLastSpecialSymbolStringFormatter('/', this._url);

            return `${baseURL}/${url}`;
        }
    }

    protected prepareDefaultConfig(): HTTPRequestConfig {
        return { method: 'get' };
    }

    protected abstract prepareData(data: HTTPRequestData): HTTPRequestData;

    protected prepareBaseConfig(): HTTPRequestConfig {
        return {
            baseURL: this._baseURL,
            url: this._url,

            method: this._method,
            headers: cloneDeep(this._headers),
            data: this.prepareData(this._data),
            params: this._params instanceof URLSearchParams ? this._params : cloneDeep(this._params), // TODO: add something like FormDataTransformer here as well
            timeout: this._timeout,
            responseType: this._responseType,
        }
    }

    protected mergeConfigs(baseConfig: HTTPRequestConfig, newConfig: HTTPRequestConfig): HTTPRequestConfig {
        // TODO: user merge or something
        return Object.assign({}, baseConfig, newConfig);
    }

    public mergeCustomConfig(customConfig?: HTTPRequestConfig): HTTPRequestConfig {
        let baseConfig = this.prepareBaseConfig();

        if (!isNil(customConfig)) {
            // validate config
            return this.mergeConfigs(baseConfig, customConfig);
        }

        return baseConfig;
    }

    public async get(customConfig?: HTTPRequestConfig): Promise<HTTPResponseSchema<ResponseDataType>> {
        let newConfig = this.mergeCustomConfig(customConfig);
        newConfig.method = 'get';

        return this.request(newConfig);
    }

    public async post(customConfig?: HTTPRequestConfig): Promise<HTTPResponseSchema<ResponseDataType>> {
        let newConfig = this.mergeCustomConfig(customConfig);
        newConfig.method = 'post';

        return this.request(newConfig);
    }

    public async put(customConfig?: HTTPRequestConfig): Promise<HTTPResponseSchema<ResponseDataType>> {
        let newConfig = this.mergeCustomConfig(customConfig);
        newConfig.method = 'put';

        return this.request(newConfig);
    }

    public async patch(customConfig?: HTTPRequestConfig): Promise<HTTPResponseSchema<ResponseDataType>> {
        let newConfig = this.mergeCustomConfig(customConfig);
        newConfig.method = 'patch';

        return this.request(newConfig);
    }

    public async delete(customConfig?: HTTPRequestConfig): Promise<HTTPResponseSchema<ResponseDataType>> {
        let newConfig = this.mergeCustomConfig(customConfig);
        newConfig.method = 'delete';

        return this.request(newConfig);
    }

    public abstract request(customConfig?: HTTPRequestConfig): Promise<HTTPResponseSchema<ResponseDataType>>;

    get baseURL(): string  {
        return this._baseURL;
    }

    get url(): string {
        return this._url;
    }

    set baseURL(baseURL: string) {
        // validate
        this._baseURL = baseURL;
    }

    set url(url: string) {
        // validate
        this._url = url;
    }

    set method(method: HTTPRequestMethod) {
        // validate
        this._method = method;
    }

    set headers(headers: HTTPHeadersCollection) {
        // validate
        this._headers = headers;
    }

    set params(params: HTTPRequestParams) {
        //validate
        this._params = params;
    }

    set data(data: GenericObject | FormData | Buffer) {
        //validate
        this._data = data;
    }

    set timeout(timeout: number) {
        // validate
        this._timeout = timeout;
    }

    set responseType(responseType: HTTPResponseType | undefined) {
        // validate
        this._responseType = responseType;
    }
}

// exports
export default AbstractBaseRequestFacade;