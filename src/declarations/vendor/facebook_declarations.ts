// external imports

// internal imports

// implementation
type FacebookClientSDKAuthResponseStatus = 'connected' | 'not_authorized' | 'unknown';
type FacebookClientSDKLoginResponseType = 'code';

type FacebookClientSDKRegistryOptions = {
    appId: string;
    version: string;
    cookie?: boolean;
    xfbml?: boolean;
}

type FacebookClientSDKLoginOptions = {
    config_id?: number;
    response_type?: FacebookClientSDKLoginResponseType;
    override_default_response_type?: boolean;
}

type FacebookClientSDKAuthResponse = {
    accessToken?: string;
    code?: string;

    data_access_expiration_time?: number;
    expiresIn: number;

    userID?: string;

    graphDomain?: string;
    signedRequest?: string;
};

type FacebookClientSDKBusinessAuthUserResponse = {
    authResponse: FacebookClientSDKAuthResponse;
    status: FacebookClientSDKAuthResponseStatus;
}

// exports
export {
    FacebookClientSDKAuthResponseStatus,
    FacebookClientSDKLoginResponseType,

    FacebookClientSDKRegistryOptions,
    FacebookClientSDKLoginOptions,
    FacebookClientSDKAuthResponse,
    FacebookClientSDKBusinessAuthUserResponse,
}