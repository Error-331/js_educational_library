// external imports

// internal imports
import { PossibleError } from '../../../declarations/error/general_error_declarations';
import { HTTPResponseSerializedErrors, HTTPResponseDataSchema } from '../../../declarations/net/http/response_declarations';
import HTTPError from '../../../errors/http_error';

import { isError, serializeError, deserializeErrors } from '../../misc/error_utils';
import { checkObjectKeys, cloneDeep } from '../../primitives/object_utils'
import { isNil, isBoolean, isNumber, isArray } from '../../misc/logic_utils';

// implementation
function isHTTPResponseData<Deserialized extends boolean = false>(responseData: unknown): responseData is HTTPResponseDataSchema<Deserialized> {
    return checkObjectKeys(responseData, {
        success: isBoolean,
        errors: isArray,
    });
}

function parseHTTPResponseData(responseData: unknown): HTTPResponseDataSchema<true> {
    if (!isHTTPResponseData<true>(responseData)) {
        throw new Error('"responseData" does not adhere to HTTPResponseDataSchema - cannot parse HTTP response data');
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

function handleHTTPResponseData(statusCode: number, responseData: unknown, allowedResponseCodes = [ 200 ]) {
    if (!isNumber(statusCode)) {
        throw new RangeError('Status code is unknown - cannot handle HTTP response data');
    }

    if (!isArray(allowedResponseCodes)) {
        throw new RangeError('Allowed HTTP response codes must be represented as array of numbers - cannot handle HTTP response data');
    }

    const isValidData = isHTTPResponseData(responseData);

    if (!allowedResponseCodes.includes(statusCode)) {
        // TODO: add proper message
        throw new HTTPError('HTTP error', statusCode);
    }

    if (isValidData) {
        const data = parseHTTPResponseData(responseData);

        if (data.success) {
            return data;
        } else {
            if (isError(data?.errors[0])) {
                throw data?.errors[0];
            } else {
                throw new Error('Unknown response error');
            }
        }
    } else {
        return responseData;
    }
}

// exports
export {
    isHTTPResponseData,
    parseHTTPResponseData,
    prepareHTTPResponseData,

    handleHTTPResponseData,
}