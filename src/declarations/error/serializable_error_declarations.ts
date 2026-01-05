// external imports
import { ZodIssueWithInputData } from '../validation_declarations';
import { CustomErrorName } from './custom_error_declarations';

// internal imports

// implementation
type SerializedGenericError = {
    message: string;
}

type SerializedCustomError = SerializedGenericError & {
    name: CustomErrorName;
}

type SerializedValidationError = SerializedCustomError & {
    issues: ZodIssueWithInputData[];
}

type SerializedHTTPError = SerializedCustomError & {
    httpCode: number;
    isProxy: boolean;
}

type SerializedError = SerializedGenericError | SerializedCustomError | SerializedValidationError | SerializedHTTPError;
type SerializedErrors = Array<SerializedError>;

// exports
export {
    SerializedGenericError,
    SerializedCustomError,
    SerializedValidationError,
    SerializedHTTPError,

    SerializedError,
    SerializedErrors,
}