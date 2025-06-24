// external imports

// internal imports
import { FacebookGraphAPIErrorData, FacebookGraphAPIErrorResponse } from '../../declarations/vendor/facebook/facebook_base_declarations';
import HTTPError from '../../errors/http_error';

import { isObjectOfType } from '../primitives/object_utils';
import { isString, isObject } from '../misc/logic_utils';

// implementation
function isGraphAPIErrorResponse(response: unknown): response is FacebookGraphAPIErrorResponse {
    if (!isObject(response) || !isObjectOfType<FacebookGraphAPIErrorResponse>(response, { error: isObject })) {
        return false;
    }

    // TODO: probably need to check using Zod or make deeper check
    return isObjectOfType<FacebookGraphAPIErrorData>(response.error, { message: isString });
}

function throwGraphAPIHTTPError(prefix: string, postfix: string, response: unknown, statusCode: number) {
    const message = isGraphAPIErrorResponse(response) ? `${prefix}${response.error.message}` : `${prefix}${postfix}`;
    throw new HTTPError(message, statusCode);
}

// exports
export {
    isGraphAPIErrorResponse,
    throwGraphAPIHTTPError,
}