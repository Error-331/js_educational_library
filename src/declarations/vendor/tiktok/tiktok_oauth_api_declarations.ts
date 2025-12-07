// external imports

// internal imports

// implementation
type TikTokOAuthAPIErrorResponse = {
    error: string;
    error_description: string;
    log_id: string;
};

type TikTokOAuthAPIResponse = {
    access_token: string;
    expires_in: number;
    open_id: string;
    refresh_expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
}

// exports
export type {
    TikTokOAuthAPIErrorResponse,
    TikTokOAuthAPIResponse,
}