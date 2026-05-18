// external imports

// internal imports

// implementation
enum AuthenticationVendor {
    Firebase = 'Firebase',
    Facebook = 'Facebook',
    Common = 'Common',
    Unknown = 'Unknown',
}

enum AuthenticationProvider {
    Anonymous = 'Anonymous',
    EmailPassword = 'EmailPassword',
    UIDByCustomJWT = 'UIDByCustomJWT',
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
    verifyUser(...args: unknown[] | void []): Promise<boolean>;
    getUserAuthenticationStateInfo(...args: unknown[] | void []): Promise<UserAuthenticationStateInfo>;
    getUserData(...args: unknown[] | void []): Promise<UserData>;

    signIn(...args: SignInParams[]): Promise<UserAuthenticationStateInfo>;
    signUp(...args: SignUpParams[] | void[]): Promise<UserData | void>;

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