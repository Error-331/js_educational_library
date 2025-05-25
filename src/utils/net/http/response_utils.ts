// external imports

// internal imports
import { PossibleError } from '../../../declarations/error/general_error_declarations';
import { HTTPResponseSerializedErrors, HTTPResponseDataSchema } from '../../../declarations/net/http/response_declarations';
import HTTPError from '../../../errors/http_error';

import { isError, serializeError, deserializeErrors } from '../../misc/error_utils';
import { checkObjectKeys, cloneDeep } from '../../primitives/object_utils'
import { isNil, isBoolean, isNumber, isArray } from '../../misc/logic_utils';

// implementation
function isHTTPResponseData<Deserialized extends boolean = false, DataType = unknown>(responseData: unknown): responseData is HTTPResponseDataSchema<Deserialized, DataType> {
    return checkObjectKeys(responseData, {
        success: isBoolean,
        // data - TODO: we should actually check the data using validator
        errors: isArray,
    });
}

function parseHTTPResponseData<DataType = unknown>(responseData: unknown): HTTPResponseDataSchema<true, DataType> {
    if (!isHTTPResponseData<true, DataType>(responseData)) {
        throw new Error('"responseData" does not adhere to HTTPResponseDataSchema - cannot parse HTTP response data');
    }

    const responseDataCopy: HTTPResponseDataSchema<true, DataType> = cloneDeep(responseData)

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

function handleHTTPResponseData<DataType = unknown>(statusCode: number, responseData: unknown, allowedResponseCodes = [ 200 ]): DataType {
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
        const parsedData = parseHTTPResponseData<DataType>(responseData);

        if (parsedData.success) {
            return parsedData.data;
        } else {
            if (isError(parsedData?.errors[0])) {
                throw parsedData?.errors[0];
            } else {
                throw new Error('Unknown response error');
            }
        }
    } else {
        throw new Error('Unknown response data format');
    }
}

// exports
export {
    isHTTPResponseData,
    parseHTTPResponseData,
    prepareHTTPResponseData,

    handleHTTPResponseData,
}