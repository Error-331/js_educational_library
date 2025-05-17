// external imports

// internal imports
import { CustomErrorName } from '../../declarations/error/custom_error_declarations';
import { SerializableError, PossibleError } from '../../declarations/error/general_error_declarations';
import { SerializedError } from '../../declarations/error/serializable_error_declarations';

import HTTPError from '../../errors/http_error';
import ValidationError from '../../errors/validation_error';

import { isObjectOfType } from '../primitives/object_utils';
import { isNumber, isString, isArray } from './logic_utils';

// implementation
function isError(error: PossibleError): error is Error {
    return error instanceof Error;
}

function isSerializableError(error: PossibleError): error is SerializableError {
    if (error instanceof HTTPError) {
        return true
    } else if (error instanceof ValidationError) {
        return true;
    } else {
        return false;
    }
}

function serializeError(error: PossibleError): SerializedError {
    if (isSerializableError(error)) {
        return error.serialize();
    } else if (isError(error)) {
        return { message: error?.message };
    } else {
        return { message: 'Unknown error - cannot serialize error data' };
    }
}

function deserializeError(serializedError: SerializedError) {
    if (!('name' in serializedError)) {
        return new Error(serializedError.message);
    }

    switch (serializedError.name) {
        case CustomErrorName.ValidationError:
            return isObjectOfType<ValidationError>(serializedError, { issues: isArray }) ?
                new ValidationError(serializedError.message, serializedError.issues) :
                new Error(serializedError.message);

        case CustomErrorName.HTTPError:
            return isObjectOfType<HTTPError>(serializedError, { httpCode: isNumber }) ?
                new HTTPError(serializedError.message, serializedError.httpCode) :
                new Error(serializedError.message);

        default: {
            throw new Error('Unknown error - cannot deserialize error data');
        }
    }
}

function deserializeErrors(serializedErrors: SerializedError[] | void[]) {
    const deserializedErrors = [];

    for (let serializedError of serializedErrors) {
        deserializedErrors.push(serializeError(serializedError))
    }

    return deserializedErrors;
}

// exports
export {
    isSerializableError,
    serializeError,

    deserializeError,
    deserializeErrors,
}

