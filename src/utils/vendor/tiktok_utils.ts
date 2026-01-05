// external imports

// internal imports
import { TikTokOpenApiResponse } from '../../declarations/vendor/tiktok/tiktok_open_api_declarations';
import { TikTokOAuthAPIErrorResponse } from '../../declarations/vendor/tiktok/tiktok_oauth_api_declarations';
import HTTPError from '../../errors/http_error';

import { isObjectOfType } from '../primitives/object_utils';
import { isString, isObject } from '../misc/logic_utils';

// implementation
function isTikTokOAuthAPIErrorResponse(response: unknown): response is TikTokOAuthAPIErrorResponse {
    return isObjectOfType<TikTokOAuthAPIErrorResponse>(response, { error: isString, error_description: isString, log_id: isString });
}

function isTikTokOpenAPIResponse(response: unknown): response is TikTokOpenApiResponse<object> {
    return isObjectOfType<TikTokOpenApiResponse<object>>(response, { data: isObject, error: isObject });
}

function isTikTokOpenAPIErrorResponse(response: unknown): boolean {
    if (isTikTokOpenAPIResponse(response)) {
        return isString(response.error?.code) && response.error?.code !== 'ok';
    } else {
        return false;
    }
}

function throwTikTokOAuthAPIHTTPError(prefix: string, postfix: string, response: unknown, statusCode: number): void {
    const message = isTikTokOAuthAPIErrorResponse(response) ? `${prefix}${response.error} - ${response.error_description} (${response.log_id})` : `${prefix}${postfix}`;
    throw new HTTPError(message, statusCode);
}

function throwTikTokOpenAPIErrorResponse(prefix: string, postfix: string, response: unknown, statusCode: number): void {
    const message = (isTikTokOpenAPIResponse(response) && isTikTokOpenAPIErrorResponse(response)) ? `${prefix}${response.error.code} - ${response.error.message} (${response.error.log_id})` : `${prefix}${postfix}`;
    throw new HTTPError(message, statusCode, true);
}

// exports
export {
    isTikTokOAuthAPIErrorResponse,
    isTikTokOpenAPIResponse,
    isTikTokOpenAPIErrorResponse,

    throwTikTokOAuthAPIHTTPError,
    throwTikTokOpenAPIErrorResponse,
}