// external imports

// internal imports
import { FacebookGraphAPIPagingResponse } from './facebook_base_declarations';

// implementation
type FacebookGraphAPIOAuthAccessTokenResponse = {
    access_token: string;
    token_type: 'bearer';
}

type FacebookOAuthPageAccessTokenDataCategoryList = {
    id: string;
    name: string;
}

type FacebookOAuthPageAccessTokenData = {
    id: string;
    name: string;

    category: string;
    category_list: FacebookOAuthPageAccessTokenDataCategoryList[];

    access_token: string;
    tasks: string[];
}

type FacebookGraphAPIOAuthPageAccessTokenResponse = {
    data: FacebookOAuthPageAccessTokenData[];
    paging: FacebookGraphAPIPagingResponse;
}

// exports
export {
    FacebookGraphAPIOAuthAccessTokenResponse,

    FacebookOAuthPageAccessTokenDataCategoryList,
    FacebookOAuthPageAccessTokenData,
    FacebookGraphAPIOAuthPageAccessTokenResponse,
}