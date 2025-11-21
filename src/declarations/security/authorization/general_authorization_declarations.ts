// external imports

// internal imports

// implementation
interface AuthorizationOAuthStrategy<AuthorizationCodeRetrievalParams = unknown> {
    initAuthorizationCodeRetrieval(...args: AuthorizationCodeRetrievalParams[]): Promise<void>;
}

// exports
export type {
    AuthorizationOAuthStrategy,
}