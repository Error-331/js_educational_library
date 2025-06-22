// external imports

// internal imports
import { FacebookResponsePaging } from './facebook_base_declarations';

// implementation
type FacebookOAuthAccessTokenResponse = {
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

type FacebookOAuthPageAccessTokenResponse = {
    data: FacebookOAuthPageAccessTokenData[];
    paging: FacebookResponsePaging;
}

// exports
export {
    FacebookOAuthAccessTokenResponse,

    FacebookOAuthPageAccessTokenDataCategoryList,
    FacebookOAuthPageAccessTokenData,
    FacebookOAuthPageAccessTokenResponse,
}