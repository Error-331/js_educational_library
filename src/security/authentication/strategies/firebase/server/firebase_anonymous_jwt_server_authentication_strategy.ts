// external imports
import { DecodedIdToken } from 'firebase-admin/auth';

// internal imports
import {
    AuthenticationProvider,
    AuthenticationSignInStrategy,
    AuthenticationVendor,
    UserAuthenticationStateInfo
} from '../../../../../declarations/security/authentication_declarations';
import { FirebaseAuthTokenType } from '../../../../../declarations/security/firebase_authentication_declarations';

import HTTPError from '../../../../../errors/http_error';
import FirebaseAbstractJWTAuthenticationStrategy from '../firebase_abstract_jwt_authentication_strategy';

import { isNil } from '../../../../../utils/misc/logic_utils';

// implementation
class FirebaseAnonymousJWTServerAuthenticationStrategy extends FirebaseAbstractJWTAuthenticationStrategy implements AuthenticationSignInStrategy<string>{
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

    public async signIn(accessToken: string): Promise<UserAuthenticationStateInfo> {
        await this.verifyAccessToken(accessToken);
        await this.addSessionCookie(accessToken);

        return {
            authenticated: true,
            vendor: AuthenticationVendor.Firebase,
            provider: AuthenticationProvider.Anonymous
        };
    }
}

// exports
export default FirebaseAnonymousJWTServerAuthenticationStrategy;