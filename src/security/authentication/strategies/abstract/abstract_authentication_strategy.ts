// external imports

// internal imports
import { UserAuthenticationStateInfo } from '../../../../declarations/security/authentication/general_authentication_declarations';

// implementation
abstract class AbstractAuthenticationStrategy<UserData> {
    public abstract verifyUser(): Promise<boolean>;
    public abstract getUserAuthenticationStateInfo(): Promise<UserAuthenticationStateInfo>;
    public abstract getUserData(): Promise<UserData>;

    public abstract signIn(...args: unknown[]): Promise<UserAuthenticationStateInfo>;
    public abstract signUp(...args: unknown[]): Promise<unknown>;

    public abstract signOut(): Promise<void>;
}

// exports
export default AbstractAuthenticationStrategy;