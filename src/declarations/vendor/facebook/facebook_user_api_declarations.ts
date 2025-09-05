// external imports

// internal imports
import { FacebookGraphAPIPagingResponse } from './facebook_base_declarations';

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