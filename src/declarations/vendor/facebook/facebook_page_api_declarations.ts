// external imports

// internal imports
import { FacebookGraphAPIPagingResponse } from './facebook_base_declarations';

// implementation

type FacebookAPIPagePhotoPublishOptions = {
    imageURL: string;
    caption?: string;
};

type FacebookGraphAPIPublishedImageResponse = {
    id: string;
    post_id: string;
};

type FacebookGraphAPIProfilePictureSource = {
    width: number;
    height: number;
    is_silhouette: boolean;
    url: string;
}

type FacebookGraphAPIPagePictureResponse = {
    data: FacebookGraphAPIProfilePictureSource;
    paging: FacebookGraphAPIPagingResponse;
};

// exports
export {
    FacebookAPIPagePhotoPublishOptions,
    FacebookGraphAPIPublishedImageResponse,
    FacebookGraphAPIProfilePictureSource,
    FacebookGraphAPIPagePictureResponse,
}