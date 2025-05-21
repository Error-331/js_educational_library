// external imports
import { DecodedIdToken } from 'firebase-admin/auth';

// internal imports
import { CookieStore, SetCookieOptions, JWTCookieStore } from '../../../../declarations/net/http/cookie_declarations';
import { AuthenticationProvider } from '../../../../declarations/security/authentication_declarations';
import { FirebaseAuthTokenType } from '../../../../declarations/security/firebase_authentication_declarations';
import { JWT_COOKIE_DEFAULT_MAX_AGE } from '../../../../constants/net/http/cookie_constants';

import HTTPError from '../../../../errors/http_error';

import AbstractAuthenticationStrategy from './../abstract_authentication_strategy';
import FirebaseAdminRegistry from '../../../../registers/firebase/firebase_admin_registry';

import { convertSecondsToMilliseconds } from '../../../../utils/physics/time_utils';
import { isNil } from '../../../../utils/misc/logic_utils';

// implementation
abstract class FirebaseAbstractJWTAuthenticationStrategy extends AbstractAuthenticationStrategy {
    protected cookieStore: CookieStore & JWTCookieStore;

    /**
     * GCP decoded token structure (possible):
     *
     * decodedIdToken {
     *      provider_id: 'anonymous',
     *      auth_time: 111111,
     *      user_id: 'some_id',
     *      firebase: { identities: {}, sign_in_provider: 'anonymous' },
     *      iat: 111111,
     *      exp: 111111,
     *      aud: 'some_project',
     *      iss: 'https://session.firebase.google.com/some_project',
     *      sub: 'some_sub',
     *      uid: 'some_uid'
     * }
     *
     */

    static async decodeAuthToken(authToken: string, tokenType: FirebaseAuthTokenType): Promise<DecodedIdToken> {
        if (isNil(authToken)) {
            throw new HTTPError('Cannot decode authentication token - token is not set', 400);
        }

        const fbAdmin = FirebaseAdminRegistry.getInstance();

        switch (tokenType) {
            case FirebaseAuthTokenType.AccessToken:
                return await fbAdmin.auth.verifyIdToken(authToken);
            case FirebaseAuthTokenType.JWTToken:
                return await fbAdmin.auth.verifySessionCookie(authToken);
            default:
                throw new HTTPError(`Cannot decode Firebase auth token - wrong token type: ${tokenType}`, 500)
        }
    }

    static determineAuthProviderById(providerId: string): AuthenticationProvider {
        switch (providerId) {
            case 'anonymous':
                return AuthenticationProvider.Anonymous;
            default:
                return AuthenticationProvider.Unknown;
        }
    }

    protected verifyDecodedAuthTokenProjectId(decodedAuthToken: DecodedIdToken): boolean {
        const fbAdmin = FirebaseAdminRegistry.getInstance();
        return decodedAuthToken.aud === fbAdmin.projectId;
    }

    protected verifyDecodedAuthTokenExp(decodedAuthToken: DecodedIdToken): boolean {
        return convertSecondsToMilliseconds(decodedAuthToken.exp) > Date.now();
    }

    protected runAuthTokenVerificationStrategy(decodedAuthToken: DecodedIdToken) {
        if (!this.verifyDecodedAuthTokenProjectId(decodedAuthToken)) {
            throw new HTTPError('Cannot verify anonymous user access token - wrong project Id', 400);
        }

        if (!this.verifyDecodedAuthTokenExp(decodedAuthToken)) {
            throw new HTTPError('Cannot verify anonymous user access token - access token is expired', 401);
        }

        return decodedAuthToken;
    }

    protected async verifyAuthToken(authToken: string, tokenType: FirebaseAuthTokenType): Promise<DecodedIdToken> {
        const decodedAuthToken = await FirebaseAbstractJWTAuthenticationStrategy.decodeAuthToken(authToken, tokenType);
        return this.runAuthTokenVerificationStrategy(decodedAuthToken);
    }

    protected async verifySessionToken(authToken: string): Promise<DecodedIdToken> {
        return this.verifyAuthToken(authToken, FirebaseAuthTokenType.JWTToken)
    }

    constructor(cookieStore: CookieStore & JWTCookieStore) {
        super();
        this.cookieStore = cookieStore;
    }

    protected async addSessionCookie(idToken: string): Promise<void> {
        const fbAdminAuth = FirebaseAdminRegistry.getInstance().auth;
        const sessionCookie = await fbAdminAuth.createSessionCookie(idToken, { expiresIn: convertSecondsToMilliseconds(JWT_COOKIE_DEFAULT_MAX_AGE) });

        const cookieOptions: SetCookieOptions = {
            expires: new Date(Date.now() + convertSecondsToMilliseconds(JWT_COOKIE_DEFAULT_MAX_AGE)),
            maxAge: JWT_COOKIE_DEFAULT_MAX_AGE,
        }

        await this.cookieStore.setJWTResponseCookie(sessionCookie, cookieOptions);
    }

    public async verifyUser(): Promise<boolean> {
        const jwtValue = await this.cookieStore.getJWTResponseCookie();

        if (isNil(jwtValue)) {
            throw new HTTPError('Cannot verify user - JWT token is not set', 401);
        }

        try {
            await this.verifySessionToken(jwtValue);
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