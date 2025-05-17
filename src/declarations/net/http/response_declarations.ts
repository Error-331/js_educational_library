// external imports

// internal imports
import { DeserializedErrors} from '../../error/general_error_declarations';
import { SerializedErrors } from '../../error/serializable_error_declarations';

// implementation
type HTTPResponseDeserializedErrors = DeserializedErrors | void[];
type HTTPResponseSerializedErrors = SerializedErrors | void[];

type HTTPResponseDataSchema<Deserialized extends boolean = false, ResponseDataType = unknown> = {
    success: boolean,
    errors: Deserialized extends true ? HTTPResponseDeserializedErrors : HTTPResponseSerializedErrors,
    data: ResponseDataType | undefined | null,
};

type HTTPResponseSchema<ResponseDataType = HTTPResponseDataSchema> = {
    data: ResponseDataType;
    statusCode: number;
    statusText: string;
};

// exports
export {
    HTTPResponseDeserializedErrors,
    HTTPResponseSerializedErrors,

    HTTPResponseDataSchema,
    HTTPResponseSchema,
}