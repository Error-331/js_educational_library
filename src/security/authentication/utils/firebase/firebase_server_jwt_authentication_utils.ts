// external imports
import { DecodedIdToken } from 'firebase-admin/auth';

// internal imports
import { CookieStore, JWTCookieStore } from '../../../../declarations/net/http/cookie_declarations';
import {
    AuthenticationVendor,
    AuthenticationProvider,
    UserAuthenticationStrategyInfo,
} from '../../../../declarations/security/authentication/general_authentication_declarations';
import { FirebaseAuthTokenType } from '../../../../declarations/security/authentication/firebase_authentication_declarations';

import HTTPError from '../../../../errors/http_error';
import FirebaseAdminRegistry from '../../../../registers/firebase/firebase_admin_registry';

import { isNil } from '../../../../utils/misc/logic_utils';

// implementation
class FirebaseServerJWTAuthenticationUtils {
    static determineAuthProviderById(providerId: string): AuthenticationProvider {
        switch (providerId) {
            case 'anonymous':
                return AuthenticationProvider.Anonymous;
            case 'password':
                return AuthenticationProvider.EmailPassword;
            default:
                return AuthenticationProvider.Unknown;
        }
    }

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

    public static getDefaultUserAuthenticationStrategyInfo(): UserAuthenticationStrategyInfo {
        return {
            vendor: AuthenticationVendor.Unknown,
            provider: AuthenticationProvider.Unknown,
        };
    }

    public static getUserAuthenticationStrategyInfoByDecodedToken(decodedAuthToken?: DecodedIdToken): UserAuthenticationStrategyInfo {
        const stateInfo: UserAuthenticationStrategyInfo = FirebaseServerJWTAuthenticationUtils.getDefaultUserAuthenticationStrategyInfo();

        if (isNil(decodedAuthToken)) {
            return stateInfo;
        }

        stateInfo.vendor = AuthenticationVendor.Firebase;
        stateInfo.provider = FirebaseServerJWTAuthenticationUtils.determineAuthProviderById(decodedAuthToken.firebase.sign_in_provider);

        return stateInfo;
    }

    public static async getUserAuthenticationStrategyInfo(cookieStore: CookieStore & JWTCookieStore): Promise<UserAuthenticationStrategyInfo> {
        let stateInfo: UserAuthenticationStrategyInfo = FirebaseServerJWTAuthenticationUtils.getDefaultUserAuthenticationStrategyInfo();

        const jwtValue = await cookieStore.getJWTResponseCookie();
        if (isNil(jwtValue)) {
            return stateInfo;
        }

        try {
            const decodedAuthToken = await FirebaseServerJWTAuthenticationUtils.decodeAuthToken(jwtValue, FirebaseAuthTokenType.JWTToken);
            stateInfo = FirebaseServerJWTAuthenticationUtils.getUserAuthenticationStrategyInfoByDecodedToken(decodedAuthToken);

            return stateInfo;
        } catch (error: unknown) {
            return stateInfo;
        }
    }
}

// exports
export default FirebaseServerJWTAuthenticationUtils;