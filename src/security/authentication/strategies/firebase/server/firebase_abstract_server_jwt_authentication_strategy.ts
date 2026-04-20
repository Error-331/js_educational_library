// external imports
import { DecodedIdToken, AuthClientErrorCode } from 'firebase-admin/auth';

// internal imports
import { CookieStore, SetCookieOptions, JWTCookieStore } from '../../../../../declarations/net/http/cookie_declarations';
import { UserAuthenticationStateInfo } from '../../../../../declarations/security/authentication/general_authentication_declarations';
import {
    FirebaseAuthTokenType,
    FirebaseEmailPasswordJWTServerAuthenticationStrategyConfiguration,
} from '../../../../../declarations/security/authentication/firebase_authentication_declarations';

import { JWT_COOKIE_DEFAULT_MAX_AGE } from '../../../../../constants/net/http/cookie_constants';

import HTTPError from '../../../../../errors/http_error';

import FirebaseAbstractJWTAuthenticationStrategy from '../abstract/firebase_abstract_jwt_authentication_strategy';
import FirebaseServerJWTAuthenticationUtils from '../../../utils/firebase/firebase_server_jwt_authentication_utils';
import FirebaseAdminRegistry from '../../../../../registers/firebase/firebase_admin_registry';

import { createCustomZodIssueAndThrowValidationError } from '../../../../../utils/misc/validation_utils';
import { convertSecondsToMilliseconds } from '../../../../../utils/physics/time_utils';
import { switchByFunctionList } from '../../../../../utils/functional/conditional_utils';
import { isAuthError } from '../../../../../utils/vendor/firebase/firebase_admin_utils';
import { isNil, isBoolean, isString } from '../../../../../utils/misc/logic_utils';

// implementation
abstract class FirebaseAbstractServerJWTAuthenticationStrategy<UserData extends object> extends FirebaseAbstractJWTAuthenticationStrategy<UserData> {
    protected cookieStore: CookieStore & JWTCookieStore;

    protected isCustomSessionToken: boolean = false;

    constructor(cookieStore: CookieStore & JWTCookieStore, config?: FirebaseEmailPasswordJWTServerAuthenticationStrategyConfiguration) {
        super();

        this.cookieStore = cookieStore;
        this.isCustomSessionToken = isBoolean(config?.isCustomSessionToken) ? config.isCustomSessionToken : false;
    }

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

    protected async addSessionCookie(idToken: string): Promise<void> {
        const fbAdminAuth = FirebaseAdminRegistry.getInstance().auth;
        const sessionCookie = await fbAdminAuth.createSessionCookie(idToken, { expiresIn: convertSecondsToMilliseconds(JWT_COOKIE_DEFAULT_MAX_AGE) });

        const cookieOptions: SetCookieOptions = {
            expires: new Date(Date.now() + convertSecondsToMilliseconds(JWT_COOKIE_DEFAULT_MAX_AGE)),
            maxAge: JWT_COOKIE_DEFAULT_MAX_AGE,
        }

        await this.cookieStore.setJWTResponseCookie(sessionCookie, cookieOptions);
    }

    protected async transformAndThrowFirebaseAuthError(error: unknown): Promise<void> {
        if (!isAuthError(error)) {
            throw error;
        }

        const [checkResult] = await switchByFunctionList<string, void>([
            [AuthClientErrorCode.EMAIL_ALREADY_EXISTS.code, async () => {
                return createCustomZodIssueAndThrowValidationError([ 'email' ], undefined, AuthClientErrorCode.EMAIL_ALREADY_EXISTS.message);
            }]
        ], async (code: string) => error.hasCode(code));

        if(checkResult === false) {
            throw error;
        }
    }

    protected async extractJWTValue(authHeader?: string): Promise<string | null> {
        // retrieve JWT token from cookie store
        let jwtValue: null | string = null;

        // if custom session token is not used (cookie) - extract ID token from header
        if (this.isCustomSessionToken === true) {
            jwtValue = await this.cookieStore.getJWTResponseCookie();
        } else {
            if (!isString(authHeader)) {
                return null;
            }

            jwtValue = authHeader.split(' ')?.[1];
        }

        // return token
        return jwtValue
    }

    public async verifyUser(authHeader?: string): Promise<boolean> {
        // retrieve JWT token
        let jwtValue: null | string = await this.extractJWTValue(authHeader);

        // check if it is not empty
        if (isNil(jwtValue)) {
            return false;
        }

        try {
            // we either verify custom session token or access token (id token)
            if (this.isCustomSessionToken == true) {
                await this.verifySessionToken(jwtValue);
            } else {
                await this.verifyAccessToken(jwtValue);
            }
        } catch (error) {
            return false;
        }

        return true;
    }

    public async getUserAuthenticationStateInfo(authHeader?: string): Promise<UserAuthenticationStateInfo> {
        // prepare state info template
        let stateInfo: UserAuthenticationStateInfo = {
            authenticated: false,
            ...FirebaseServerJWTAuthenticationUtils.getDefaultUserAuthenticationStrategyInfo(),
        }

        // if JWT cookie not found - return the result
        const jwtValue: null | string = await this.extractJWTValue(authHeader);
        if (isNil(jwtValue)) {
            return stateInfo;
        }

        try {
            // determine whether token is custom JWT token or ID token
            const tokenType = this.isCustomSessionToken === true ? FirebaseAuthTokenType.JWTToken : FirebaseAuthTokenType.AccessToken;

            // decode JWT token
            const decodedAuthToken = await FirebaseServerJWTAuthenticationUtils.decodeAuthToken(jwtValue, tokenType);

            // add authentication strategy info if possible (vendor and provider)
            stateInfo = {
                ...stateInfo,
                ...FirebaseServerJWTAuthenticationUtils.getUserAuthenticationStrategyInfoByDecodedToken(decodedAuthToken),
            }

            // verify standard claims
            this.runAuthTokenVerificationStrategy(decodedAuthToken);

            // if standard claims were verified - we can judge that user is authenticated
            stateInfo.authenticated = true;

            return stateInfo;
        } catch (error: unknown) {
            // return "empty" state info if error occurred during JWT token decoding/verification
            return stateInfo;
        }
    }

    public async signOut(): Promise<void> {
        await this.cookieStore.clearJWTResponseCookie();
    }
}

// exports
export default FirebaseAbstractServerJWTAuthenticationStrategy;