// external imports

// internal imports
import { UserAuthenticationStateInfo } from '../../../declarations/security/authentication_declarations';

// implementation
abstract class AbstractAuthenticationStrategy {
    public abstract verifyUser(): Promise<boolean>;
    public abstract getUserAuthenticationStateInfo(): Promise<UserAuthenticationStateInfo>;

    public abstract signIn(...args: unknown[]): Promise<void | unknown>;
    public abstract signOut(): Promise<void>;
}

// exports
export default AbstractAuthenticationStrategy;