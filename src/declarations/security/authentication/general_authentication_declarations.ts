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

interface UserAuthenticationStrategyInfo {
    vendor?: AuthenticationVendor;
    provider?: AuthenticationProvider;
}

interface UserAuthenticationStateInfo extends UserAuthenticationStrategyInfo {
    authenticated: boolean;
}

interface AuthenticationSignInStrategy<SignInParams = unknown, SignUpParams = void> {
    verifyUser(): Promise<boolean>;
    getUserAuthenticationStateInfo(): Promise<UserAuthenticationStateInfo>;

    signIn(...args: SignInParams[]): Promise<UserAuthenticationStateInfo>;
    signUp(...args: SignUpParams[]): Promise<UserAuthenticationStateInfo>;

    signOut(): Promise<void>;
}

// exports
export {
    AuthenticationVendor,
    AuthenticationProvider,

    UserAuthenticationStrategyInfo,
    UserAuthenticationStateInfo,
    AuthenticationSignInStrategy,
}