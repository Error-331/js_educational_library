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

type FacebookGraphAPIPublishedImageResponse = {
    id: string;
    post_id: string;
};

type FacebookGraphAPIPagePictureResponse = {
    data: FacebookGraphAPIProfilePictureSource;
    paging: FacebookGraphAPIPagingResponse;
};

type FacebookGraphAPIPageVideoPublishResponse = {
    id: string;
};

// exports
export {
    FacebookAPIPagePhotoPublishOptions,
    FacebookAPIPageVideoPublishOptions,

    FacebookGraphAPIPublishedImageResponse,
    FacebookGraphAPIPagePictureResponse,

    FacebookGraphAPIPageVideoPublishResponse,
}