// external imports

// internal imports
import { CookieStore, JWTCookieStore } from '../../../../declarations/net/http/cookie_declarations';
import {
    AuthenticationProvider,
    AuthenticationSignInStrategy
} from '../../../../declarations/security/authentication/general_authentication_declarations';

import FirebaseServerJWTAuthenticationUtils from '../../utils/firebase/firebase_server_jwt_authentication_utils';

import FirebaseAnonymousJWTServerAuthenticationStrategy from '../../strategies/firebase/server/firebase_anonymous_jwt_server_authentication_strategy';
import FirebaseEmailPasswordJWTAuthenticationStrategy from '../../strategies/firebase/server/firebase_email_password_jwt_authentication_strategy';

// implementation
class FirebaseServerJWTAuthenticationStrategyFactory {
    protected cookieStore: CookieStore & JWTCookieStore;

    constructor(cookieStore: CookieStore & JWTCookieStore) {
        this.cookieStore = cookieStore;
    }

    public async create(): Promise<null | AuthenticationSignInStrategy> {
        const userAuthenticationStrategyInfo = await FirebaseServerJWTAuthenticationUtils.getUserAuthenticationStrategyInfo(this.cookieStore);

        switch (userAuthenticationStrategyInfo.provider) {
            case AuthenticationProvider.Anonymous:
                return new FirebaseAnonymousJWTServerAuthenticationStrategy(this.cookieStore);
            case AuthenticationProvider.EmailPassword:
                return new FirebaseEmailPasswordJWTAuthenticationStrategy(this.cookieStore);
            default:
                return null;
        }
    }
}

// exports
export default FirebaseServerJWTAuthenticationStrategyFactory;

