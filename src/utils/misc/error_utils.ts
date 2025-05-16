// external imports

// internal imports
import { SerializableError, PossibleError } from '../../declarations/error/general_error_declarations';

import HTTPError from '../../errors/http_error';
import ValidationError from '../../errors/validation_error';

// implementation
function isSerializableError(error: PossibleError): error is SerializableError {
    if (error instanceof HTTPError) {
        return true
    } else if (error instanceof ValidationError) {
        return true;
    } else {
        return false;
    }
}

function serializeError(error: PossibleError) {
    if (isSerializableError(error)) {
        return error.serialize();
    } else {
        return { message: error.message };
    }
}

// exports
export {
    isSerializableError,
    serializeError,
}

