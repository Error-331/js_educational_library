// external imports

// internal imports
import { FacebookGraphAPIPagingResponse } from './facebook_base_declarations';
import { FacebookGraphAPIProfilePictureSource } from './facebook_profile_declarations';

// implementation
type FacebookAPIPagePhotoPublishOptions = {
    imageURL: string;
    caption?: string;
};

type FacebookGraphAPIPublishedImageResponse = {
    id: string;
    post_id: string;
};

type FacebookGraphAPIPagePictureResponse = {
    data: FacebookGraphAPIProfilePictureSource;
    paging: FacebookGraphAPIPagingResponse;
};

// exports
export {
    FacebookAPIPagePhotoPublishOptions,
    FacebookGraphAPIPublishedImageResponse,
    FacebookGraphAPIPagePictureResponse,
}