// external imports

// internal imports

// implementation
type FacebookAPIPagePhotoPublishOptions = {
    imageURL: string;
    caption?: string;
};

type FacebookGraphAPIPublishedImageResponse = {
    id: string;
    post_id: string;
};

// exports
export {
    FacebookAPIPagePhotoPublishOptions,
    FacebookGraphAPIPublishedImageResponse,
}