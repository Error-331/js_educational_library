// external imports
import { DecodedIdToken, UserRecord } from 'firebase-admin/auth';

// internal imports
import {
    AuthenticationProvider,
    AuthenticationSignInStrategy,
    AuthenticationVendor,
    UserAuthenticationStateInfo
} from '../../../../../declarations/security/authentication/general_authentication_declarations';
import {
    FirebaseAuthTokenType,
    FirebaseEmailPasswordJWTServerSignUpData,
    FirebaseEmailPasswordJWTServerUserData,
} from '../../../../../declarations/security/authentication/firebase_authentication_declarations';

import HTTPError from '../../../../../errors/http_error';
import FirebaseAbstractServerJWTAuthenticationStrategy from './firebase_abstract_server_jwt_authentication_strategy';
import FirebaseServerJWTAuthenticationUtils from '../../../utils/firebase/firebase_server_jwt_authentication_utils';

import FirebaseAdminRegistry from '../../../../../registers/firebase/firebase_admin_registry';
import { pick } from '../../../../../utils/primitives/object_utils';
import { isNil } from '../../../../../utils/misc/logic_utils';

// implementation
class FirebaseEmailPasswordJWTAuthenticationStrategy extends
    FirebaseAbstractServerJWTAuthenticationStrategy implements
    AuthenticationSignInStrategy<string, FirebaseEmailPasswordJWTServerSignUpData, FirebaseEmailPasswordJWTServerUserData> {
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

    public async getUserData(): Promise<FirebaseEmailPasswordJWTServerUserData> {
        const jwtValue = await this.cookieStore.getJWTResponseCookie();
        if (isNil(jwtValue)) {
            return null;
        }

        const { email, email_verified: emailVerified, uid, picture: photoURL } = await FirebaseServerJWTAuthenticationUtils.decodeAuthToken(jwtValue, FirebaseAuthTokenType.JWTToken);
        return {
            email,
            emailVerified,
            uid,
            photoURL,
        };
    }

    public async signIn(accessToken: string): Promise<UserAuthenticationStateInfo> {
        await this.verifyAccessToken(accessToken);

        try {
            await this.addSessionCookie(accessToken);
        } catch (error: unknown) {
            await this.transformAndThrowFirebaseAuthError(error);
        }

        return {
            authenticated: true,
            vendor: AuthenticationVendor.Firebase,
            provider: AuthenticationProvider.EmailPassword,
        };
    }

    public async signUp(userData: FirebaseEmailPasswordJWTServerSignUpData): Promise<FirebaseEmailPasswordJWTServerUserData> {
        const fbAdminAuth = FirebaseAdminRegistry.getInstance().auth;
        try {
            const userDataRecord =  await fbAdminAuth.createUser(userData);
            return pick<UserRecord, 'uid' | 'email' | 'emailVerified' | 'photoURL'>(userDataRecord, ['uid', 'email', 'emailVerified', 'photoURL']);
        } catch (error: unknown) {
            await this.transformAndThrowFirebaseAuthError(error);
        }
    }

    public async signOut(): Promise<void> {
        const jwtValue = await this.cookieStore.getJWTResponseCookie();
        await super.signOut();

        const fbAdminAuth = FirebaseAdminRegistry.getInstance().auth;
        const decodedClaims = await FirebaseServerJWTAuthenticationUtils.decodeAuthToken(jwtValue, FirebaseAuthTokenType.JWTToken);

        await fbAdminAuth.revokeRefreshTokens(decodedClaims.sub);
    }
}

// exports
export default FirebaseEmailPasswordJWTAuthenticationStrategy;