// external imports
//import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

// internal imports
import { CookieStore, JWTCookieStore } from '../../../../declarations/net/http/cookie_declarations';
import { JWT_COOKIE_DEFAULT_MAX_AGE } from '../../../../constants/net/http/cookie_constants';

import AbstractAuthenticationStrategy from './../abstract_authentication_strategy';
import FirebaseAdminRegistry from '../../../../registers/firebase/firebase_admin_registry';

import { isNil } from '../../../../utils/misc/logic_utils';

// implementation
abstract class FirebaseAbstractJWTAuthenticationStrategy extends AbstractAuthenticationStrategy {
    protected cookieStore: CookieStore & JWTCookieStore;

    constructor(cookieStore: CookieStore & JWTCookieStore) {
        super();
        this.cookieStore = cookieStore;
    }

    protected async addSessionCookie(idToken: string): Promise<void> {
        const fbAdminAuth = FirebaseAdminRegistry.getInstance().auth;
        const sessionCookie = await fbAdminAuth.createSessionCookie(idToken, { expiresIn: JWT_COOKIE_DEFAULT_MAX_AGE * 1000 });

        await this.cookieStore.setJWTResponseCookie(sessionCookie);
    }

    public async verifyUser(): Promise<boolean> {
        const jwtValue = await this.cookieStore.getJWTResponseCookie();

        if (isNil(jwtValue)) {
            throw new Error('Cannot verify user - JWT token is not set');
        }

        const fbAuth = FirebaseAdminRegistry.getInstance().auth;
        //let decodedToken: DecodedIdToken;

        try {
            await fbAuth.verifySessionCookie(jwtValue);
        } catch (error) {
            return false;
        }

        return true;
    }

    public async signOut(): Promise<void> {
        await this.cookieStore.clearJWTResponseCookie();
    }
}

// exports
export default FirebaseAbstractJWTAuthenticationStrategy;