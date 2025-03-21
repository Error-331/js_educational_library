// external imports
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';

// internal imports
import { AuthenticationEmailPasswordSignInStrategy } from '../../../declarations/security/authentication_declarations';
import { CookieStore, JWTCookieStore } from '../../../declarations/net/cookie_declarations';

import AbstractAuthenticationStrategy from './abstract_authentication_strategy';

import FirebaseAdminRegistry from '../../../registers/firebase/firebase_admin_registry';
import FirebaseClientRegistry from '../../../registers/firebase/firebase_client_registry';

import { isNil } from '../../../utils/misc/logic_utils';

// implementation
class FirebaseEmailPasswordJWTAuthenticationStrategy extends AbstractAuthenticationStrategy implements AuthenticationEmailPasswordSignInStrategy {
    protected cookieStore: CookieStore & JWTCookieStore;

    constructor(cookieStore: CookieStore & JWTCookieStore) {
        super();
        this.cookieStore = cookieStore;
    }

    public async verifyUser(): Promise<boolean> {
        const jwtValue = await this.cookieStore.getJWTResponseCookie();

        if (isNil(jwtValue)) {
            throw new Error('Cannot verify user - JWT token is not set');
        }

        const fbAuth = FirebaseAdminRegistry.getInstance().auth;
        let decodedToken: DecodedIdToken;

        try {
            decodedToken = await fbAuth.verifyIdToken(jwtValue);
        } catch (error) {
            return false;
        }

        return decodedToken.email_verified;
    }

    public async signIn(email: string, password: string): Promise<void> {
        const fbAuth = FirebaseClientRegistry.getInstance().auth;
        const userCredential: UserCredential = await signInWithEmailAndPassword(fbAuth, email, password)

        const idToken = await userCredential.user.getIdToken();
        await this.cookieStore.setJWTResponseCookie(idToken);
    }

    public async signOut(): Promise<boolean> {
        return Promise.resolve(true);
    }
}

// exports
export default FirebaseEmailPasswordJWTAuthenticationStrategy;