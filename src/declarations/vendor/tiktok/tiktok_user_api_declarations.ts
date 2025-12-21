// external imports

// internal imports
import { TikTokOpenApiResponse } from './tiktok_open_api_declarations';

// implementation
type TikTokOpenAPIUserData = {
    open_id?: string;
    union_id?: string;
    avatar_url?: string;
    display_name?: string;
    profile_deep_link?: string;
    username?: string;
    is_verified?: string;
}

type TikTokOpenAPIUserResponseData = {
    user: TikTokOpenAPIUserData;
}

type TikTokOpenAPIUserResponse = TikTokOpenApiResponse<TikTokOpenAPIUserResponseData>;

// exports
export type {
    TikTokOpenAPIUserData,
    TikTokOpenAPIUserResponseData,
    TikTokOpenAPIUserResponse,
}