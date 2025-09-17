// external imports

// internal imports
import { FacebookGraphAPIAppUploadConfig } from './facebook_app_api_declarations';
import { FacebookGraphAPIPagingResponse } from './facebook_base_declarations';
import { FacebookGraphAPIProfilePictureSource } from './facebook_profile_declarations';

// implementation
type FacebookAPIPagePhotoPublishOptions = {
    imageURL: string;
    caption?: string;
};

type FacebookAPIPageVideoPublishOptions = {
    userAccessToken: string;
    pageAccessToken: string;

    pathToFile: string;
    pageId: string;

    title?: string;
    description?: string;

    fileUploadOptions?: FacebookGraphAPIAppUploadConfig;
};

type FacebookGraphAPIPageVideoUploadInitResponse = {
    video_id: string;
    upload_url: string;
};

type FacebookGraphAPIPageVideoUploadFinishResponse = {
    success: true;
};

type FacebookGraphAPIPagePublishedImageResponse = {
    id: string;
    post_id: string;
};

type FacebookGraphAPIPageVideoPublishResponse = {
    id: string;
};

type FacebookGraphAPIPageReelPublishResponse = {
    success: boolean;
    post_id: string;
};

type FacebookGraphAPIPageVideoStatusResponse = {
    id: string;
    status: object;
};

type FacebookGraphAPIPagePictureResponse = {
    data: FacebookGraphAPIProfilePictureSource;
    paging: FacebookGraphAPIPagingResponse;
};

type FacebookPageReelPublishResponse = {
    publishSuccess: boolean;

    videoId: string;
    postId: string;
};

// exports
export {
    FacebookAPIPagePhotoPublishOptions,
    FacebookAPIPageVideoPublishOptions,

    FacebookGraphAPIPageVideoUploadInitResponse,
    FacebookGraphAPIPageVideoUploadFinishResponse,

    FacebookGraphAPIPagePublishedImageResponse,
    FacebookGraphAPIPageVideoPublishResponse,
    FacebookGraphAPIPageReelPublishResponse,

    FacebookGraphAPIPageVideoStatusResponse,
    FacebookGraphAPIPagePictureResponse,

    FacebookPageReelPublishResponse,
}