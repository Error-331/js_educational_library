// external imports
import { DecodedIdToken } from 'firebase-admin/auth';

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
class FirebaseEmailPasswordJWTAuthenticationStrategy<UserData extends FirebaseEmailPasswordJWTServerUserData> extends
    FirebaseAbstractServerJWTAuthenticationStrategy<UserData> implements
    AuthenticationSignInStrategy<string, FirebaseEmailPasswordJWTServerSignUpData, UserData> {
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

    public async getUserData(authHeader?: string): Promise<UserData> {
        // retrieve JWT token
        const jwtValue: null | string = await this.extractJWTValue(authHeader);

        // throw an error if necessary token cannot be extracted
        if (isNil(jwtValue)) {
            throw new HTTPError('Cannot load user data - cannot extract JWT/Id token', 400);
        }

        // decode the token (either access token - id token, or jwt cookie token)
        const {
            email,
            email_verified: emailVerified,
            uid,
            picture: photoURL,
            name,
        } = await FirebaseServerJWTAuthenticationUtils.decodeAuthToken(jwtValue, this.isCustomSessionToken == true ? FirebaseAuthTokenType.JWTToken : FirebaseAuthTokenType.AccessToken);

        // get Firebase auth instance and use it to find user record
        const fbAdminAuth = FirebaseAdminRegistry.getInstance().auth;
        const currentUser = await fbAdminAuth.getUser(uid);

        // if user is not found - throw an error
        if (isNil(currentUser)) {
            throw new HTTPError('Cannot load user data - cannot find user by uid', 400);
        }

        // return user authentication data along with custom claims
        return {
            name,
            email,
            emailVerified,
            uid,
            photoURL,

            ...currentUser.customClaims,
        };
    }

    public async signIn(idToken: string): Promise<UserAuthenticationStateInfo> {
        await this.verifyAccessToken(idToken);

        if (this.isCustomSessionToken === true) {
            try {
                await this.addSessionCookie(idToken);
            } catch (error: unknown) {
                await this.transformAndThrowFirebaseAuthError(error);
            }
        }

        return {
            authenticated: true,
            vendor: AuthenticationVendor.Firebase,
            provider: AuthenticationProvider.EmailPassword,
        };
    }

    public async signUp(userData: FirebaseEmailPasswordJWTServerSignUpData): Promise<UserData> {
        const fbAdminAuth = FirebaseAdminRegistry.getInstance().auth;
        try {
            const userDataRecord = await fbAdminAuth.createUser(userData);
            return pick<UserData, 'uid' | 'email' | 'emailVerified' | 'photoURL'>(userDataRecord, ['uid', 'email', 'emailVerified', 'photoURL']);
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