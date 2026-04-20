// external imports
import { CommonServerRequest, CommonServerResponse, CommonServerReturn } from '../../../../declarations/net/api/common_declarations';

// internal imports
import { CookieStore, JWTCookieStore } from '../../../../declarations/net/http/cookie_declarations';
import { UserAuthenticationStateInfo } from '../../../../declarations/security/authentication/general_authentication_declarations';

import FirebaseEmailPasswordJWTAuthenticationStrategy from '../../../../security/authentication/strategies/firebase/server/firebase_email_password_jwt_authentication_strategy';
import FirebaseBaseJWTAuthenticationController from './firebase_base_jwt_authentication_controller';

import { isNil } from '../../../../utils/misc/logic_utils';

// implementation
class FirebaseEmailPasswordJWTAuthenticationController extends FirebaseBaseJWTAuthenticationController {
    static async verifyUser(req: CommonServerRequest, res: CommonServerResponse, cookieStore?: CookieStore & JWTCookieStore): Promise<CommonServerReturn> {
        try {
            const preparedCookieStore = !isNil(cookieStore) ? cookieStore : this.createFrameworkCookieStore(req, res);
            const authStrategy = new FirebaseEmailPasswordJWTAuthenticationStrategy(preparedCookieStore);

            // TODO: verifyUser() should accept special header if used with ID token authentication
            const isUserVerified = await authStrategy.verifyUser();
            return FirebaseEmailPasswordJWTAuthenticationController.serveData<boolean>(req, res, isUserVerified);
        } catch (error: unknown) {
            return FirebaseEmailPasswordJWTAuthenticationController.handleThrownError(req, res, error);
        }
    }

    static async signIn(req: CommonServerRequest, res: CommonServerResponse, cookieStore?: CookieStore & JWTCookieStore): Promise<CommonServerReturn> {
        try {
            const accessToken = req.body.accessToken;

            const preparedCookieStore = !isNil(cookieStore) ? cookieStore : this.createFrameworkCookieStore(req, res);
            const authStrategy = new FirebaseEmailPasswordJWTAuthenticationStrategy(preparedCookieStore);

            const authStateInfo: UserAuthenticationStateInfo = await authStrategy.signIn(accessToken);

            return FirebaseEmailPasswordJWTAuthenticationController.serveData<UserAuthenticationStateInfo>(req, res, authStateInfo);
        } catch (error: unknown) {
            return FirebaseEmailPasswordJWTAuthenticationController.handleThrownError(req, res, error);
        }
    }

    static async signUp(req: CommonServerRequest, res: CommonServerResponse, cookieStore?: CookieStore & JWTCookieStore): Promise<CommonServerReturn> {

    }
}

// exports
export default FirebaseEmailPasswordJWTAuthenticationController;