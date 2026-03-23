// external imports

// internal imports

// implementation
type InstagramAuthorizationCodeRetrievalOptions = {
    clientId: string;
    enableFBLogin?: boolean;
    forceReauth: boolean;
    redirectURI: string;
    scope: string[];
    state: string;
}

// exports
export {
    InstagramAuthorizationCodeRetrievalOptions,
}