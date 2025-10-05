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

interface AuthenticationSignInStrategy<SignInParams = unknown, SignUpParams = void, UserData = void> {
    verifyUser(): Promise<boolean>;
    getUserAuthenticationStateInfo(): Promise<UserAuthenticationStateInfo>;
    getUserData(): Promise<UserData>;

    signIn(...args: SignInParams[]): Promise<UserAuthenticationStateInfo>;
    signUp(...args: SignUpParams[]): Promise<UserData>;

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