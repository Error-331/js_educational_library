// external imports
import { DecodedIdToken } from 'firebase-admin/auth';

// internal imports
import { CookieStore, SetCookieOptions, JWTCookieStore } from '../../../../../declarations/net/http/cookie_declarations';
import { UserAuthenticationStateInfo } from '../../../../../declarations/security/authentication/general_authentication_declarations';
import { FirebaseAuthTokenType } from '../../../../../declarations/security/authentication/firebase_authentication_declarations';
import { JWT_COOKIE_DEFAULT_MAX_AGE } from '../../../../../constants/net/http/cookie_constants';

import HTTPError from '../../../../../errors/http_error';

import AbstractAuthenticationStrategy from '../../abstract_authentication_strategy';
import FirebaseServerJWTAuthenticationUtils from '../../../utils/firebase/firebase_server_jwt_authentication_utils';
import FirebaseAdminRegistry from '../../../../../registers/firebase/firebase_admin_registry';

import { convertSecondsToMilliseconds } from '../../../../../utils/physics/time_utils';
import { isNil } from '../../../../../utils/misc/logic_utils';

// implementation
abstract class FirebaseAbstractServerJWTAuthenticationStrategy extends AbstractAuthenticationStrategy {
    protected cookieStore: CookieStore & JWTCookieStore;

    protected verifyDecodedAuthTokenProjectId(decodedAuthToken: DecodedIdToken): boolean {
        const fbAdmin = FirebaseAdminRegistry.getInstance();
        return decodedAuthToken.aud === fbAdmin.projectId;
    }

    protected verifyDecodedAuthTokenExp(decodedAuthToken: DecodedIdToken): boolean {
        return convertSecondsToMilliseconds(decodedAuthToken.exp) > Date.now();
    }

    protected runAuthTokenVerificationStrategy(decodedAuthToken: DecodedIdToken): DecodedIdToken {
        if (!this.verifyDecodedAuthTokenProjectId(decodedAuthToken)) {
            throw new HTTPError('Cannot verify anonymous user access token - wrong project Id', 400);
        }

        if (!this.verifyDecodedAuthTokenExp(decodedAuthToken)) {
            throw new HTTPError('Cannot verify anonymous user access token - access token is expired', 401);
        }

        return decodedAuthToken;
    }

    protected async verifyAuthToken(authToken: string, tokenType: FirebaseAuthTokenType): Promise<DecodedIdToken> {
        const decodedAuthToken = await FirebaseServerJWTAuthenticationUtils.decodeAuthToken(authToken, tokenType);
        return this.runAuthTokenVerificationStrategy(decodedAuthToken);
    }

    protected async verifyAccessToken(accessToken: string): Promise<DecodedIdToken> {
        return this.verifyAuthToken(accessToken, FirebaseAuthTokenType.AccessToken);
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

    public async getUserAuthenticationStateInfo(): Promise<UserAuthenticationStateInfo> {
        let stateInfo: UserAuthenticationStateInfo = {
            authenticated: false,
            ...FirebaseServerJWTAuthenticationUtils.getDefaultUserAuthenticationStrategyInfo(),
        }

        const jwtValue = await this.cookieStore.getJWTResponseCookie();
        if (isNil(jwtValue)) {
            return stateInfo;
        }

        try {
            const decodedAuthToken = await FirebaseServerJWTAuthenticationUtils.decodeAuthToken(jwtValue, FirebaseAuthTokenType.JWTToken);
            stateInfo = {
                ...stateInfo,
                ...FirebaseServerJWTAuthenticationUtils.getUserAuthenticationStrategyInfoByDecodedToken(decodedAuthToken),
            }

            this.runAuthTokenVerificationStrategy(decodedAuthToken);
            stateInfo.authenticated = true;

            return stateInfo;
        } catch (error: unknown) {
            return stateInfo;
        }
    }

    public async signOut(): Promise<void> {
        await this.cookieStore.clearJWTResponseCookie();
    }
}

// exports
export default FirebaseAbstractServerJWTAuthenticationStrategy;