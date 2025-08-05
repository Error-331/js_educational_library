// external imports
import { DecodedIdToken, UserRecord } from 'firebase-admin/auth';

// internal imports
import {
    AuthenticationProvider,
    AuthenticationSignInStrategy,
    AuthenticationVendor,
    UserAuthenticationStateInfo
} from '../../../../../declarations/security/authentication/general_authentication_declarations';
import { FirebaseEmailPasswordJWTServerSignUpData } from  '../../../../../declarations/security/authentication/firebase_authentication_declarations';

import HTTPError from '../../../../../errors/http_error';
import FirebaseAbstractServerJWTAuthenticationStrategy from './firebase_abstract_server_jwt_authentication_strategy';

import FirebaseAdminRegistry from '../../../../../registers/firebase/firebase_admin_registry';

// implementation
class FirebaseEmailPasswordJWTAuthenticationStrategy extends FirebaseAbstractServerJWTAuthenticationStrategy implements AuthenticationSignInStrategy<string, FirebaseEmailPasswordJWTServerSignUpData, UserRecord> {
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

    public async signUp(userData: FirebaseEmailPasswordJWTServerSignUpData): Promise<UserRecord> {
        const fbAdminAuth = FirebaseAdminRegistry.getInstance().auth;
        return fbAdminAuth.createUser(userData);
    }
}

// exports
export default FirebaseEmailPasswordJWTAuthenticationStrategy;