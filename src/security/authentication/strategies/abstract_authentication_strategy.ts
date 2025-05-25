// external imports

// internal imports
import { UserAuthenticationStateInfo } from '../../../declarations/security/authentication_declarations';

// implementation
abstract class AbstractAuthenticationStrategy {
    public abstract verifyUser(): Promise<boolean>;
    public abstract getUserAuthenticationStateInfo(): Promise<UserAuthenticationStateInfo>;

    public abstract signIn(...args: unknown[]): Promise<UserAuthenticationStateInfo>;
    public abstract signOut(): Promise<void>;
    public abstract signUp(): Promise<UserAuthenticationStateInfo>;
}

// exports
export default AbstractAuthenticationStrategy;