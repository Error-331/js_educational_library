// external imports

// internal imports

// implementation
type TikTokOpenApiResponseErrorData = {
    code: string;
    message: string;
    log_id: string;
}

type TikTokOpenApiResponse<DataType extends object> = {
    data: DataType;
    error: TikTokOpenApiResponseErrorData
}

// exports
export type {
    TikTokOpenApiResponseErrorData,
    TikTokOpenApiResponse,
}