// external imports

// internal imports

// implementation
type FacebookGraphAPIErrorData = {
    message: string;
    type?: string;
    code?: number;
    fbtrace_id?: string;
};

type FacebookGraphAPIErrorResponse = {
    error: FacebookGraphAPIErrorData
};

type FacebookGraphAPIPagingCursor = {
    before: string;
    after: string;
}

type FacebookGraphAPIPagingResponse = {
    cursors: FacebookGraphAPIPagingCursor;
}

// exports
export {
    FacebookGraphAPIErrorData,
    FacebookGraphAPIErrorResponse,

    FacebookGraphAPIPagingCursor,
    FacebookGraphAPIPagingResponse,
}