// external imports

// internal imports

// implementation
type EmailPasswordSingInParams = [email: string, password: string];

interface AuthenticationSignInStrategy<SignInParams> {
    signIn(...args: SignInParams): Promise<void>;
    signOut(): Promise<void>;
}

interface AuthenticationEmailPasswordSignInStrategy extends AuthenticationSignInStrategy<EmailPasswordSingInParams> {}

// exports
export {
    EmailPasswordSingInParams,

    AuthenticationSignInStrategy,
    AuthenticationEmailPasswordSignInStrategy,
}