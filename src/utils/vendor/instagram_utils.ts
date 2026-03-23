// external imports

// internal imports
import { InstagramOAuthAPIErrorResponse } from '../../declarations/vendor/instagram/instagram_oauth_api_declarations';
import { InstagramAPIErrorResponse } from '../../declarations/vendor/instagram/instagram_api_declarations';

import HTTPError from '../../errors/http_error';

import { isObjectOfType } from '../primitives/object_utils';
import { isNumber, isString } from '../misc/logic_utils';

// implementation
function isInstagramOAuthAPIErrorResponse(response: unknown): response is InstagramOAuthAPIErrorResponse {
    return isObjectOfType<InstagramOAuthAPIErrorResponse>(response, { error: isString, error_description: isString, error_reason: isString });
}

function isInstagramAPIErrorResponse(response: unknown): response is InstagramAPIErrorResponse {
    return isObjectOfType<InstagramOAuthAPIErrorResponse>(response, { code: isNumber, error_type: isString, error_message: isString });
}

function throwInstagramOAuthAPIHTTPError(prefix: string, postfix: string, response: unknown, statusCode: number): void {
    let message: string = '';

    if (isInstagramAPIErrorResponse(response)) {
        message = `${prefix}${response.code} - ${response.error_message} (${response.error_type})`;
    } else if (isInstagramOAuthAPIErrorResponse(response)) {
        message = `${prefix}${response.error} - ${response.error_description} (${response.error_reason})`;
    } else {
        message = `${prefix}${postfix}`;
    }

    throw new HTTPError(message, statusCode);
}

// exports
export {
    isInstagramOAuthAPIErrorResponse,
    isInstagramAPIErrorResponse,
    throwInstagramOAuthAPIHTTPError,
}