// external imports

// internal imports
import AbstractAuthenticationStrategy from '../../abstract/abstract_authentication_strategy';

// implementation
abstract class FirebaseAbstractJWTAuthenticationStrategy<UserData> extends AbstractAuthenticationStrategy<UserData> {
    protected abstract transformAndThrowFirebaseAuthError(error: unknown): void;
}

// exports
export default FirebaseAbstractJWTAuthenticationStrategy;