// external imports

// internal imports
import { UserAuthenticationStateInfo } from '../../../../declarations/security/authentication/general_authentication_declarations';
import { isNullOrEmpty } from '../../../../utils/misc/logic_utils';

// implementation
abstract class AbstractAuthenticationStrategy<UserData> {
    protected extractJWTTokenFromAuthHeader(authHeader: string): string {
        const jwtToken = authHeader.split(' ')?.[1];

        if (isNullOrEmpty(jwtToken)) {
            throw new Error('Cannot extract JWT token from authentication header - token not found');
        }

        return jwtToken;
    }

    public abstract verifyUser(...args: unknown[] | void []): Promise<boolean>;
    public abstract getUserAuthenticationStateInfo(...args: unknown[] | void []): Promise<UserAuthenticationStateInfo>;
    public abstract getUserData(...args: unknown[] | void []): Promise<UserData>;

    public abstract signIn(...args: unknown[]): Promise<UserAuthenticationStateInfo>;
    public abstract signUp(...args: unknown[] | void[]): Promise<UserData | void>;

    public abstract signOut(): Promise<void>;
}

// exports
export default AbstractAuthenticationStrategy;