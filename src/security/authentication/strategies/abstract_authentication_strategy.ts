// external imports

// internal imports

// implementation
abstract class AbstractAuthenticationStrategy {
    public async abstract verifyUser(): Promise<boolean>;

    public abstract signIn(...args: unknown): Promise<void>;
    public abstract signOut(): Promise<boolean>;
}

// exports
export default AbstractAuthenticationStrategy;