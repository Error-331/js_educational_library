// external imports

// internal imports
import { PossibleError } from '../../../declarations/error/general_error_declarations';
import { HTTPResponseSerializedErrors, HTTPResponseDataSchema } from '../../../declarations/net/http/response_declarations';

import { serializeError, deserializeErrors } from '../../misc/error_utils';

import { checkObjectKeys, cloneDeep } from '../../primitives/object_utils'
import { isNil, isBoolean, isArray } from '../../misc/logic_utils';

// implementation
function isHTTPResponseData<Deserialized extends boolean = false>(responseData: unknown): responseData is HTTPResponseDataSchema<Deserialized> {
    return checkObjectKeys(responseData, {
        success: isBoolean,
        errors: isArray,
    });
}

function parseHTTPResponseData(responseData: unknown): HTTPResponseDataSchema<true> {
    if (!isHTTPResponseData<true>(responseData)) {
        throw new Error('responseData does not adhere to HTTPResponseDataSchema');
    }

    const responseDataCopy: HTTPResponseDataSchema<true> = cloneDeep(responseData)

    if (!responseDataCopy.success) {
        responseDataCopy.errors = deserializeErrors(responseDataCopy.errors)
    }

    return responseDataCopy;
}

function prepareHTTPResponseData<ResponseDataType = unknown>(data?: ResponseDataType, error?: PossibleError): HTTPResponseDataSchema<false, ResponseDataType> {
    const success = isNil(error);
    let errors: HTTPResponseSerializedErrors = [];

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
    isHTTPResponseData,
    parseHTTPResponseData,
    prepareHTTPResponseData,
}