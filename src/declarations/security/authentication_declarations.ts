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
    EmailPassword = 'EmailPassword',
    Business = 'Business',
    Unknown = 'Unknown',
}

interface UserAuthenticationStateInfo {
    authenticated: boolean;
    vendor?: AuthenticationVendor;
    provider?: AuthenticationProvider;
}

interface AuthenticationSignInStrategy<SignInParams> {
    verifyUser(): Promise<boolean>;
    getUserAuthenticationStateInfo(): Promise<UserAuthenticationStateInfo>;

    signIn(...args: SignInParams[]): Promise<UserAuthenticationStateInfo>;
    signOut(): Promise<void>;
}

// exports
export {
    AuthenticationVendor,
    AuthenticationProvider,

    UserAuthenticationStateInfo,
    AuthenticationSignInStrategy,
}