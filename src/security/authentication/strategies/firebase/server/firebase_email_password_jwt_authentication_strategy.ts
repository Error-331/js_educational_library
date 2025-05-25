// external imports
import { DecodedIdToken } from 'firebase-admin/auth';

// internal imports
import {
    AuthenticationProvider,
    AuthenticationSignInStrategy,
    AuthenticationVendor,
    UserAuthenticationStateInfo
} from '../../../../../declarations/security/authentication_declarations';

import HTTPError from '../../../../../errors/http_error';
import FirebaseAbstractServerJWTAuthenticationStrategy from './firebase_abstract_server_jwt_authentication_strategy';

// implementation
class FirebaseEmailPasswordJWTAuthenticationStrategy extends FirebaseAbstractServerJWTAuthenticationStrategy implements AuthenticationSignInStrategy<string> {
    protected verifyDecodedAuthTokenProviderId(decodedAuthToken: DecodedIdToken): boolean {
        return decodedAuthToken.firebase.sign_in_provider === 'password';
    }

    protected runAuthTokenVerificationStrategy(decodedAuthToken: DecodedIdToken) {
        const decodedAuthTokenCopy = super.runAuthTokenVerificationStrategy(decodedAuthToken);

        if (!this.verifyDecodedAuthTokenProviderId(decodedAuthTokenCopy)) {
            throw new HTTPError('Cannot verify user access token - wrong provider Id', 400);
        }

        return decodedAuthTokenCopy;
    }

    public async signIn(accessToken: string): Promise<UserAuthenticationStateInfo> {
        await this.verifyAccessToken(accessToken);
        await this.addSessionCookie(accessToken);

        return {
            authenticated: true,
            vendor: AuthenticationVendor.Firebase,
            provider: AuthenticationProvider.EmailPassword,
        };
    }

    public async signUp(): Promise<UserAuthenticationStateInfo> {
        return this.getUserAuthenticationStateInfo();
    }
}

// exports
export default FirebaseEmailPasswordJWTAuthenticationStrategy;