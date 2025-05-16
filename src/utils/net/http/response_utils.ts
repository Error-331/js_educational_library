// external imports

// internal imports
import { PossibleError } from '../../../declarations/error/general_error_declarations';
import { HTTPResponseErrors, HTTPResponseDataSchema } from '../../../declarations/net/http/response_declarations';

import { serializeError } from '../../misc/error_utils';
import { isNil } from '../../misc/logic_utils';

// implementation
function prepareHTTPResponse<ResponseDataType = unknown>(data: ResponseDataType, error?: PossibleError): HTTPResponseDataSchema<ResponseDataType> {
    const success = isNil(error);
    let errors: HTTPResponseErrors = [];

    if (!success) {
        errors = [ serializeError(error) ];
    }

    return {
        success,
        errors,
        data,
    }
}

// exports
export {
    prepareHTTPResponse,
}