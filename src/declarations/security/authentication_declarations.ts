// external imports

// internal imports

// implementation
enum AuthenticationVendor {
    Firebase = 'Firebase',
    Unknown = 'Unknown',
}

enum AuthenticationProvider {
    Anonymous = 'Anonymous',
    Unknown = 'Unknown',
}

type EmailPasswordSingInParams = [email: string, password: string];

interface AuthenticationSignInStrategy<SignInParams> {
    signIn(...args: SignInParams[]): Promise<void>;
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