// external imports

// internal imports

// implementation
type FacebookGraphAPIUserResponse = {
    id: string;
    name: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    name_format?: string;
    picture?: string;
    short_name?: string;
};

// exports
export {
    FacebookGraphAPIUserResponse,
}