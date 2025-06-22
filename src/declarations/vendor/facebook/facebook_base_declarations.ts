// external imports

// internal imports

// implementation
type FacebookErrorResponse = {
    message: string;
    type: string;
    code: number;
    fbtrace_id?: string
}

type FacebookResponsePagingCursor = {
    before: string;
    after: string;
}

type FacebookResponsePaging = {
    cursors: FacebookResponsePagingCursor;
}

// exports
export {
    FacebookErrorResponse,

    FacebookResponsePagingCursor,
    FacebookResponsePaging,
}