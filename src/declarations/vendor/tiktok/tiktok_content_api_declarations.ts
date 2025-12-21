// external imports

// internal imports
import { TikTokOpenApiResponse } from './tiktok_open_api_declarations';

// implementation
type TikTokOpenAPICreatorInfoData = {
    creator_avatar_url: string;
    creator_username: string;
    creator_nickname: string;
    privacy_level_options: string[];
    comment_disabled: boolean;
    duet_disabled: boolean;
    stitch_disabled: boolean;
    max_video_post_duration_sec: boolean;
}

type TikTokOpenAPIPostStatusData = {
    status: string;
    fail_reason: string;
    publicaly_available_post_id: number[];
    uploaded_bytes?: number;
    downloaded_bytes: number;
}

type TikTokOpenAPICreatorInfoResponse = TikTokOpenApiResponse<TikTokOpenAPICreatorInfoData>;
type TikTokOpenAPIPostStatusResponse = TikTokOpenApiResponse<TikTokOpenAPIPostStatusData>;

// exports
export type {
    TikTokOpenAPICreatorInfoData,
    TikTokOpenAPIPostStatusData,

    TikTokOpenAPICreatorInfoResponse,
    TikTokOpenAPIPostStatusResponse,
}



