// external imports

// internal imports
import AbstractAuthorizationStrategy from './abstract_authorization_strategy';

// implementation
abstract class AbstractOAuthStrategy<AuthorizationCodeRetrievalData> extends AbstractAuthorizationStrategy {
    public abstract initAuthorizationCodeRetrieval(...args: unknown[]): Promise<AuthorizationCodeRetrievalData>;
}

// exports
export default AbstractOAuthStrategy;