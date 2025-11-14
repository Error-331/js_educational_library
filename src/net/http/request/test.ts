// external imports
import {is, defaultTo, keys, reduce, curry} from 'ramda';

// internal imports
import type {RequestHeaderType, RequestHeadersType} from './../../types/request_response';
import type {WFFetchReturnType} from './../../types/web_futuristics';

import {getValue} from './../../registers/general_register';

import type {PromiseResolveCallbackType, PromiseRejectCallbackType} from './../../types/promise';
import {isHapiBoomError, makeHapiBoomError} from './../hapi/request_response_helpers';

// types definition

// functions implementation
const prepareHeaders = (headersArray: RequestHeadersType = []): Headers => {
    const requestHeaders: Headers = new Headers();

    return reduce((requestHeaders: Headers, requestHeader: RequestHeaderType) => {
        const headerName: string = keys(requestHeader)[0];

        requestHeaders.append(headerName, requestHeader[headerName]);
        return requestHeaders;
    }, requestHeaders, headersArray);
};

export const sendRequest = (
    method: string,
    mode: 'cors' | 'no-cors',
    path: string,
    headers: RequestHeadersType,
    body: any
): WFFetchReturnType => {
    const requestInitData: RequestOptions  = {
        method,
        headers: prepareHeaders(headers),
        mode,
        body: is(Object, body) ? JSON.stringify(body) : body
    };

    let apiEndpoint: string = getValue('apiEndpoint');
    apiEndpoint = defaultTo('')(apiEndpoint);

    const fetchRequest: Request = new Request(`${apiEndpoint}${path}`, requestInitData);

    return new Promise((resolve: PromiseResolveCallbackType, reject: PromiseRejectCallbackType) => {
        fetch(fetchRequest)
            .then((response: Response) => {
                if (!response.headers.has('content-type')) {
                    return resolve({response});
                }

                const contentType: string = response.headers.get('content-type');

                // TODO: add means for working with blob
                if (contentType.indexOf('application/json') !== -1) {
                    response.json()
                        .then(jsonData => resolve({response, data: jsonData}))
                        .catch(error => reject(error));
                } else {
                    resolve({response});
                }
            })
            .catch((error: Error) => reject(error));
    });
};

export const sendRequestToHapi = (
    method: string,
    mode: 'cors' | 'no-cors',
    path: string,
    headers: RequestHeadersType,
    body: any
): WFFetchReturnType => {
    return new Promise((resolve: PromiseResolveCallbackType, reject: PromiseRejectCallbackType) => {
        sendRequest(method, mode, path, headers, body)
            .then(({response, data}) => isHapiBoomError(response.status, data) ? reject(data) : resolve({response, data}))
            .catch(error => reject(makeHapiBoomError(error)));
    });
};

export const sendGetRequestToAPI: curry<string, RequestHeadersType, any> = curry(sendRequest)('GET', 'no-cors');
export const sendPostRequestToAPI: curry<string, RequestHeadersType, any> = curry(sendRequest)('POST', 'no-cors');

export const sendGetRequestToAPICors: curry<string, RequestHeadersType, any> = curry(sendRequest)('GET', 'cors');
export const sendPostRequestToAPICors: curry<string, RequestHeadersType, any> = curry(sendRequest)('POST', 'cors');

export const sendGetRequestToHapiAPI: curry<string, RequestHeadersType, any> = curry(sendRequestToHapi)('GET', 'no-cors');
export const sendPostRequestToHapiAPI: curry<string, RequestHeadersType, any> = curry(sendRequestToHapi)('POST', 'no-cors');

export const sendGetRequestToHapiAPICors: curry<string, RequestHeadersType, any> = curry(sendRequestToHapi)('GET', 'cors');
export const sendPostRequestToHapiAPICors: curry<string, RequestHeadersType, any> = curry(sendRequestToHapi)('POST', 'cors');
