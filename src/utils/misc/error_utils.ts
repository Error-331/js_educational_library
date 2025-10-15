// external imports

// internal imports
import { ZodIssueWithInputData } from '../../declarations/validation_declarations';
import { CustomErrorName } from '../../declarations/error/custom_error_declarations';
import { SerializableError, DeserializedError, PossibleError } from '../../declarations/error/general_error_declarations';
import { SerializedError } from '../../declarations/error/serializable_error_declarations';

import HTTPError from '../../errors/http_error';
import ValidationError from '../../errors/validation_error';

import { isObjectOfType } from '../primitives/object_utils';
import { isNil, isNumber, isString, isArray, isObject } from './logic_utils';

// implementation
function isError(error: PossibleError): error is Error {
    return error instanceof Error;
}

function isHTTPError(error: unknown): error is HTTPError {
    return error instanceof HTTPError;
}

function isValidationError(error: unknown): error is ValidationError {
    return error instanceof ValidationError;
}

function isSerializableError(error: PossibleError): error is SerializableError {
    if (isHTTPError(error)) {
        return true
    } else if (isValidationError(error)) {
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

function deserializeError(serializedError: SerializedError | void): DeserializedError {
    if (!serializedError) {
        return;
    }

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

function deserializeErrors(serializedErrors: SerializedError[] | void[]): DeserializedError[] {
    const deserializedErrors: DeserializedError[] = [];

    for (let serializedError of serializedErrors) {
        deserializedErrors.push(deserializeError(serializedError));
    }

    return deserializedErrors;
}

function joinValidationErrorIssues(errors: DeserializedError[] | void[]): ZodIssueWithInputData[] {
    let issues: ZodIssueWithInputData[] = [];

    if (errors.length <= 0) {
        return [];
    }

    errors
        .filter(error => isObject(error) && (error.name === CustomErrorName.ValidationError))
        .forEach((error: ValidationError) => {
            issues = issues.concat(error.issues)
        })

    return issues;
}

function convertUnknownToError(errorData: unknown): Error {
    if (isNil(errorData)) {
        return new Error('Unknown error');
    } else if (isString(errorData)) {
        return new Error(errorData);
    } else if (isObject(errorData)) {
        if (isObjectOfType<{message: string}>(errorData, { message: isString })) {
            return new Error(errorData.message);
        } else {
            return new Error('Unknown error');
        }
    } else {
        return new Error('Unknown error');
    }
}

// exports
export {
    isError,
    isHTTPError,
    isValidationError,

    isSerializableError,
    serializeError,

    deserializeError,
    deserializeErrors,

    joinValidationErrorIssues,
    convertUnknownToError,
}

