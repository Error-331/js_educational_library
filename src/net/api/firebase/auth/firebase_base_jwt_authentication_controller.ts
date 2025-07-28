// external imports

// internal imports
import { CommonServerRequest, CommonServerResponse, CommonServerReturn } from '../../../../declarations/net/api/common_declarations';

import { CookieStore, JWTCookieStore } from '../../../../declarations/net/http/cookie_declarations';
import { UserAuthenticationStateInfo } from '../../../../declarations/security/authentication/general_authentication_declarations';

import FirebaseAnonymousJWTServerAuthenticationStrategy from '../../../../security/authentication/strategies/firebase/server/firebase_anonymous_jwt_server_authentication_strategy';
import FirebaseServerJWTAuthenticationStrategyFactory from '../../../../security/authentication/factories/firebase/firebase_server_jwt_authentication_strategy_factory';

import BaseRESTAPIServerController from '../../../../net/api/common/base_rest_api_server_controller';

import { isNil } from '../../../../utils/misc/logic_utils';

// implementation
class FirebaseBaseJWTAuthenticationController extends BaseRESTAPIServerController {
    static async authData(req: CommonServerRequest, res: CommonServerResponse, cookieStore?: CookieStore & JWTCookieStore): Promise<CommonServerReturn> {
        try {
            const preparedCookieStore = !isNil(cookieStore) ? cookieStore : this.createFrameworkCookieStore(req, res);

            const authStrategy = new FirebaseAnonymousJWTServerAuthenticationStrategy(preparedCookieStore);
            const authStateInfo: UserAuthenticationStateInfo = await authStrategy.getUserAuthenticationStateInfo();

            return FirebaseBaseJWTAuthenticationController.serveData<UserAuthenticationStateInfo>(req, res, authStateInfo);
        } catch (error: unknown) {
            return FirebaseBaseJWTAuthenticationController.handleThrownError(req, res, error);
        }
    }

    static async signOut(req: CommonServerRequest, res: CommonServerResponse, cookieStore?: CookieStore & JWTCookieStore): Promise<CommonServerReturn> {
        try {
            const preparedCookieStore = !isNil(cookieStore) ? cookieStore : this.createFrameworkCookieStore(req, res);

            const authStrategyFactory = new FirebaseServerJWTAuthenticationStrategyFactory(preparedCookieStore);
            const authStrategy = await authStrategyFactory.create();

            if (isNil(authStrategy)) {
                return FirebaseBaseJWTAuthenticationController.serveData<boolean>(req, res, false);
            }

            await authStrategy.signOut();
            return FirebaseBaseJWTAuthenticationController.serveData<boolean>(req, res, true);
        } catch (error: unknown) {
            return FirebaseBaseJWTAuthenticationController.handleThrownError(req, res, error);
        }
    }
}

// exports
export default FirebaseBaseJWTAuthenticationController;