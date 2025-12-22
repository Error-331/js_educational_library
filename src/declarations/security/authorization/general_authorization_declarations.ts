// external imports

// internal imports

// implementation
interface AuthorizationOAuthStrategy<AuthorizationCodeRetrievalParams, AuthorizationCodeRetrievalData> {
    initAuthorizationCodeRetrieval(...args: AuthorizationCodeRetrievalParams[]): Promise<AuthorizationCodeRetrievalData>;
}

// exports
export type {
    AuthorizationOAuthStrategy,
}