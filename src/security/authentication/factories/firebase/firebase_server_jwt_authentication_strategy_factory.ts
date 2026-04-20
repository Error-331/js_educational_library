// external imports

// internal imports
import {
    FirebaseEmailPasswordJWTServerAuthenticationStrategyConfiguration,
    FirebaseEmailPasswordJWTServerSignUpData,
} from '../../../../declarations/security/authentication/firebase_authentication_declarations';

import { CookieStore, JWTCookieStore } from '../../../../declarations/net/http/cookie_declarations';
import {
    AuthenticationProvider,
    AuthenticationSignInStrategy,
    UserAuthenticationStateInfo
} from '../../../../declarations/security/authentication/general_authentication_declarations';

import FirebaseServerJWTAuthenticationUtils from '../../utils/firebase/firebase_server_jwt_authentication_utils';

import FirebaseAnonymousJWTServerAuthenticationStrategy from '../../strategies/firebase/server/firebase_anonymous_jwt_server_authentication_strategy';
import FirebaseEmailPasswordJWTAuthenticationStrategy from '../../strategies/firebase/server/firebase_email_password_jwt_authentication_strategy';

// implementation
class FirebaseServerJWTAuthenticationStrategyFactory<UserData> {
    protected cookieStore: CookieStore & JWTCookieStore;

    constructor(cookieStore: CookieStore & JWTCookieStore) {
        this.cookieStore = cookieStore;
    }

    public async create(config?: FirebaseEmailPasswordJWTServerAuthenticationStrategyConfiguration): Promise<null | AuthenticationSignInStrategy<string, void, UserAuthenticationStateInfo> | AuthenticationSignInStrategy<string, FirebaseEmailPasswordJWTServerSignUpData, UserData>> {
        const userAuthenticationStrategyInfo = await FirebaseServerJWTAuthenticationUtils.getUserAuthenticationStrategyInfo(this.cookieStore);

        switch (userAuthenticationStrategyInfo.provider) {
            case AuthenticationProvider.Anonymous:
                return new FirebaseAnonymousJWTServerAuthenticationStrategy(this.cookieStore, config);
            case AuthenticationProvider.EmailPassword:
                return new FirebaseEmailPasswordJWTAuthenticationStrategy<UserData>(this.cookieStore, config);
            default:
                return null;
        }
    }
}

// exports
export default FirebaseServerJWTAuthenticationStrategyFactory;

