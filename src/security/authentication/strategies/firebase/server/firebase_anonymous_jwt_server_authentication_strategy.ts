// external imports
import { DecodedIdToken } from 'firebase-admin/auth';

// internal imports
import { AuthenticationProvider, AuthenticationVendor, UserAuthenticationStateInfo } from '../../../../../declarations/security/authentication_declarations';
import { FirebaseAuthTokenType } from '../../../../../declarations/security/firebase_authentication_declarations';

import HTTPError from '../../../../../errors/http_error';
import FirebaseAbstractJWTAuthenticationStrategy from '../firebase_abstract_jwt_authentication_strategy';

import { isNil } from '../../../../../utils/misc/logic_utils';

// implementation
class FirebaseAnonymousJWTServerAuthenticationStrategy extends FirebaseAbstractJWTAuthenticationStrategy {
    protected verifyDecodedAuthTokenProviderId(decodedAuthToken: DecodedIdToken): boolean {
        return decodedAuthToken.provider_id === 'anonymous';
    }

    protected runAuthTokenVerificationStrategy(decodedAuthToken: DecodedIdToken) {
        const decodedAuthTokenCopy = super.runAuthTokenVerificationStrategy(decodedAuthToken);

        if (!this.verifyDecodedAuthTokenProviderId(decodedAuthTokenCopy)) {
            throw new HTTPError('Cannot verify anonymous user access token - wrong provider Id', 400);
        }

        return decodedAuthTokenCopy;
    }

    private async verifyAccessToken(accessToken: string): Promise<DecodedIdToken> {
        return this.verifyAuthToken(accessToken, FirebaseAuthTokenType.AccessToken)
    }

    /*

        decodedIdToken {
            provider_id: 'anonymous',
            auth_time: 111111,
            user_id: 'some_id',
            firebase: { identities: {}, sign_in_provider: 'anonymous' },
            iat: 111111,
            exp: 111111,
            aud: 'some_project',
            iss: 'https://session.firebase.google.com/some_project',
            sub: 'some_sub',
            uid: 'some_uid'
        }

    */

    public async getUserAuthenticationStateInfo(): Promise<UserAuthenticationStateInfo> {
        const stateInfo: UserAuthenticationStateInfo = {
            authenticated: false,
            vendor: AuthenticationVendor.Unknown,
            provider: AuthenticationProvider.Unknown,
        }

        const jwtValue = await this.cookieStore.getJWTResponseCookie();
        if (isNil(jwtValue)) {
            return stateInfo;
        }

        try {
            const decodedAuthToken = await FirebaseAbstractJWTAuthenticationStrategy.decodeAuthToken(jwtValue, FirebaseAuthTokenType.JWTToken);

            stateInfo.vendor = AuthenticationVendor.Firebase;
            stateInfo.provider =  FirebaseAnonymousJWTServerAuthenticationStrategy.determineAuthProviderById(decodedAuthToken.provider_id);

            try {
                this.runAuthTokenVerificationStrategy(decodedAuthToken);
            } catch (error: unknown) {
                return stateInfo
            }

            stateInfo.authenticated = true;
            return stateInfo;
        } catch (error: unknown) {
            return stateInfo;
        }
    }

    public async signIn(accessToken: string) {
        await this.verifyAccessToken(accessToken);
        await this.addSessionCookie(accessToken);

        return;
    }
}

// exports
export default FirebaseAnonymousJWTServerAuthenticationStrategy;