// external imports

// internal imports

// implementation
type HTTPResponseSchema<ResponseDataType> = {
    data: ResponseDataType;
    statusCode: number;
    statusText: string;
};

// exports
export {
    HTTPResponseSchema,
}