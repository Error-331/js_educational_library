// external imports

// internal imports

// implementation
abstract class AbstractAuthenticationStrategy {
    public abstract verifyUser(): Promise<boolean>;

    public abstract signIn(...args: unknown[]): Promise<void | unknown>;
    public abstract signOut(): Promise<void>;
}

// exports
export default AbstractAuthenticationStrategy;