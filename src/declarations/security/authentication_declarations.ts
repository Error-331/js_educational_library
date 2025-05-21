// external imports

// internal imports

// implementation
enum AuthenticationVendor {
    Firebase = 'Firebase',
    Facebook = 'Facebook',
    Unknown = 'Unknown',
}

enum AuthenticationProvider {
    Anonymous = 'Anonymous',
    Business = 'Business',
    Unknown = 'Unknown',
}

type EmailPasswordSingInParams = [email: string, password: string];

interface AuthenticationSignInStrategy<SignInParams> {
    verifyUser(): Promise<boolean>;
    getUserAuthenticationStateInfo(): Promise<UserAuthenticationStateInfo>;

    signIn(...args: SignInParams[]): Promise<void | UserAuthenticationStateInfo>;
    signOut(): Promise<void>;
}

interface AuthenticationEmailPasswordSignInStrategy extends AuthenticationSignInStrategy<EmailPasswordSingInParams> {}

interface UserAuthenticationStateInfo {
    authenticated: boolean;
    vendor?: AuthenticationVendor;
    provider?: AuthenticationProvider;
}

// exports
export {
    AuthenticationVendor,
    AuthenticationProvider,

    EmailPasswordSingInParams,

    AuthenticationSignInStrategy,
    AuthenticationEmailPasswordSignInStrategy,

    UserAuthenticationStateInfo,
}