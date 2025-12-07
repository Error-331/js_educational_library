// external imports

// internal imports
import { TikTokOAuthAPIErrorResponse } from '../../declarations/vendor/tiktok/tiktok_oauth_api_declarations';
import HTTPError from '../../errors/http_error';

import { isObjectOfType } from '../primitives/object_utils';
import { isString } from '../misc/logic_utils';

// implementation
function isTikTokOAuthAPIErrorResponse(response: unknown): response is TikTokOAuthAPIErrorResponse {
    return isObjectOfType<TikTokOAuthAPIErrorResponse>(response, { error: isString, error_description: isString, log_id: isString });
}

function throwTikTokOAuthAPIHTTPError(prefix: string, postfix: string, response: unknown, statusCode: number) {
    const message = isTikTokOAuthAPIErrorResponse(response) ? `${prefix}${response.error} - ${response.error_description} (${response.log_id})` : `${prefix}${postfix}`;
    throw new HTTPError(message, statusCode);
}

// exports
export {
    isTikTokOAuthAPIErrorResponse,
    throwTikTokOAuthAPIHTTPError,
}