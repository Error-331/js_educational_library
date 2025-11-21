// external imports

// internal imports
import AbstractAuthorizationStrategy from './abstract_authorization_strategy';

// implementation
abstract class AbstractOAuthStrategy extends AbstractAuthorizationStrategy {
    public abstract initAuthorizationCodeRetrieval(...args: unknown[]): Promise<void>;
}

// exports
export default AbstractOAuthStrategy;