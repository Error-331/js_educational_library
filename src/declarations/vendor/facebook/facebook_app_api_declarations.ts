// external imports

// internal imports

// implementation
type FacebookGraphAPIAppUploadConfig = {
    readBufferSize?: number
};

type FacebookGraphAPIAppUploadsResponse = {
    id: string;
};

type FacebookGraphAPIAppUploadChunkResponse = {
    debug_info: {
        retriable: boolean;
        type: string;
        message: string;
    }
};

type FacebookGraphAPIAppUploadFinishResponse = {
    h: string;
};

// exports
export {
    FacebookGraphAPIAppUploadConfig,
    FacebookGraphAPIAppUploadsResponse,
    FacebookGraphAPIAppUploadChunkResponse,
    FacebookGraphAPIAppUploadFinishResponse,
}