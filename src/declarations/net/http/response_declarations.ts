// external imports

// internal imports
import { SerializedErrors } from '../../error/serializable_error_declarations';

// implementation
type HTTPResponseErrors = SerializedErrors | void[];

type HTTPResponseDataSchema<ResponseDataType = unknown> = {
    success: boolean,
    errors: HTTPResponseErrors,
    data: ResponseDataType | undefined | null,
};

type HTTPResponseSchema<ResponseDataType = HTTPResponseDataSchema> = {
    data: ResponseDataType;
    statusCode: number;
    statusText: string;
};

// exports
export {
    HTTPResponseErrors,
    HTTPResponseDataSchema,
    HTTPResponseSchema,
}