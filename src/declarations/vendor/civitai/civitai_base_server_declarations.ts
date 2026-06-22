// external imports

// internal imports

// implementation
type CivitAIServerOptions = {
    apiToken: string;
    version: string;
}

type CivitAIAPISimpleErrorResponse = {
    error: string;
}

type CivitAIAPITRPCErrorResponse = {
    code: string;
    message: string;
    issues?: unknown[];
}

type CivitAIAPIErrorResponse = CivitAIAPISimpleErrorResponse | CivitAIAPITRPCErrorResponse;

// exports
export type {
    CivitAIServerOptions,

    CivitAIAPISimpleErrorResponse,
    CivitAIAPITRPCErrorResponse,
    CivitAIAPIErrorResponse,
}