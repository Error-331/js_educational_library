// external imports

// internal imports
import HTTPError from '../../errors/http_error';
import ValidationError from '../../errors/validation_error';

// implementation
type SerializableError = HTTPError | ValidationError;
type DeserializedError = Error | HTTPError | ValidationError;
type PossibleError = Error | HTTPError | ValidationError | unknown;

// exports
export {
    SerializableError,
    DeserializedError,
    PossibleError,
}