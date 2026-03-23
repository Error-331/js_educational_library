// external imports

// internal imports

// implementation
type InstagramAPIErrorResponse = {
    code: number;
    error_type: string;
    error_message: string;
};

type InstagramAPIOAuthResponse = {
    access_token: string;
    user_id: number;
    permissions: string[];
}

// exports
export type {
    InstagramAPIErrorResponse,
    InstagramAPIOAuthResponse,
}