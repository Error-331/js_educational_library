// external imports

// internal imports
import { FacebookGraphAPIAppUploadConfig } from './facebook_app_api_declarations';
import { FacebookGraphAPIErrorData, FacebookGraphAPIPagingResponse } from './facebook_base_declarations';
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

enum FacebookGraphAPIVideoStatus {
    /*
     * The video is expired and must be uploaded again
     */
    Error = 'error',
    /*
     * The video is expired and must be uploaded again
     */
    Expired = 'expired',
    /*
     * Meta is processing the video during or after upload
     */
    Processing = 'processing',
    /*
     * The video is ready to be published
     */
    Ready = 'ready',
    /*
     * The video is currently uploading
     */
    Uploading = 'uploading',
    /*
     * An error occured during upload phase, retry the upload
     */
    UploadFailed = 'upload_failed',
    /*
     * The video has finished uploading. The uploaded bytes should equal the file size.
     */
    UploadComplete = 'upload_complete',
}

enum FacebookGraphAPIVideoUploadingPhaseStatus {
    Completed = 'completed',
    Error = 'error',
    NotStarted = 'not_started',
    InProgress = 'in_progress',
}

enum FacebookGraphAPIVideoProcessingPhaseStatus {
    Completed = 'completed',
    Error = 'error',
    NotStarted = 'not_started',
    InProgress = 'in_progress',
}

enum FacebookGraphAPIVideoPublishingPhaseStatus {
    Completed = 'completed',
    Error = 'error',
    NotStarted = 'not_started',
    InProgress = 'in_progress',
}

enum FacebookGraphAPIVideoPublishingStatus {
    Draft = 'draft',
    Error = 'error',
    Published = 'published',
    Scheduled = 'scheduled',
}

type FacebookGraphAPIPageVideoStatusResponse = {
    id: string;
    status: {
        video_status: FacebookGraphAPIVideoStatus;
        uploading_phase: {
            status: FacebookGraphAPIVideoUploadingPhaseStatus;
            bytes_transferred?: number;
            source_file_size?: number;
            errors?: FacebookGraphAPIErrorData[];
        },

        processing_phase: {
            status: FacebookGraphAPIVideoProcessingPhaseStatus;
            errors?: FacebookGraphAPIErrorData[];
        },

        publishing_phase: {
            status: FacebookGraphAPIVideoPublishingPhaseStatus;
            publish_status?: FacebookGraphAPIVideoPublishingStatus;
            publish_time?: number;
            error?: FacebookGraphAPIErrorData;
        },
    };
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

    FacebookGraphAPIVideoStatus,
    FacebookGraphAPIVideoUploadingPhaseStatus,
    FacebookGraphAPIVideoProcessingPhaseStatus,
    FacebookGraphAPIVideoPublishingPhaseStatus,
    FacebookGraphAPIVideoPublishingStatus,

    FacebookGraphAPIPageVideoStatusResponse,
    FacebookGraphAPIPagePictureResponse,

    FacebookPageReelPublishResponse,
}