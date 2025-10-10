// external imports
import { Readable } from 'node:stream';

// internal imports
import { FacebookGraphAPIAppUploadConfig } from './facebook_app_api_declarations';
import { FacebookGraphAPIErrorData, FacebookGraphAPIPagingResponse } from './facebook_base_declarations';
import { FacebookGraphAPIProfilePictureSource } from './facebook_profile_declarations';

// implementation
type FacebookAPIPagePhotoPublishOptions = {
    imageURL: string;
    caption?: string;
};

type FacebookAPIPagePhotosPublishOptions = {
    photoIds: string[];
    caption?: string;
};

type FacebookAPIPageVideoPublishOptions = {
    userAccessToken: string;
    pageAccessToken: string;

    pageId: string;

    title?: string;
    description?: string;

    fileUploadOptions?: FacebookGraphAPIAppUploadConfig;
};

type FacebookAPIPageVideoPublishByFilePathOptions = FacebookAPIPageVideoPublishOptions & {
    pathToFile: string;
}

type FacebookAPIPageVideoPublishByStreamOptions = FacebookAPIPageVideoPublishOptions & {
    fileMIMEType: string;
    fileName: string;
    fileSize: string | number;
    stream: Readable;
};

type FacebookAPIPageReelPublishByStreamOptions = FacebookAPIPageVideoPublishOptions & {
    fileSize: string | number;
    stream: Readable;
};

type FacebookGraphAPIPageVideoUploadInitResponse = {
    video_id: string;
    upload_url: string;
};

type FacebookGraphAPIPageVideoUploadFinishResponse = {
    success: true;
};

type FacebookGraphAPIPagePhotoUploadFinishResponse = {
    id: string;
};

type FacebookGraphAPIPagePhotoPublishResponse = FacebookGraphAPIPagePhotoUploadFinishResponse & {
    post_id: string;
};

type FacebookGraphAPIPagePhotosPublishResponse = {
    id: string;
    post_supports_client_mutation_id?: boolean;
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
            publish_time?: string; // '2025-09-17T06:32:35+0000'
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
    FacebookAPIPagePhotosPublishOptions,

    FacebookAPIPageVideoPublishOptions,
    FacebookAPIPageVideoPublishByFilePathOptions,
    FacebookAPIPageVideoPublishByStreamOptions,
    FacebookAPIPageReelPublishByStreamOptions,

    FacebookGraphAPIPagePhotoUploadFinishResponse,

    FacebookGraphAPIPageVideoUploadInitResponse,
    FacebookGraphAPIPageVideoUploadFinishResponse,

    FacebookGraphAPIPagePhotoPublishResponse,
    FacebookGraphAPIPagePhotosPublishResponse,
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