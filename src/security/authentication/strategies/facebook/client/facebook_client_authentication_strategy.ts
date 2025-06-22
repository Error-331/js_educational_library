// external imports

// internal imports
import AbstractAuthenticationStrategy from '../../abstract_authentication_strategy';
import {
    AuthenticationVendor,
    AuthenticationProvider,
    AuthenticationSignInStrategy,
} from '../../../../../declarations/security/authentication/general_authentication_declarations';

import { FacebookUserAuthenticationStateInfo } from '../../../../../declarations/security/authentication/facebook_authentication_declarations';
import { FacebookClientSDKLoginOptions, FacebookClientSDKAuthUserResponse } from '../../../../../declarations/vendor/facebook/facebook_declarations';

import FacebookClientSDKRegistry from '../../../../../registers/facebook/facebook_client_sdk_registry';
import { isNil } from '../../../../../utils/misc/logic_utils';

// implementation
class FacebookClientAuthenticationStrategy extends AbstractAuthenticationStrategy implements AuthenticationSignInStrategy<boolean> {
    protected _options: FacebookClientSDKLoginOptions;

    constructor(options?: FacebookClientSDKLoginOptions) {
        super();
        this._options = options;
    }

    protected composeAuthenticationStateInfo(authResponse: FacebookClientSDKAuthUserResponse): FacebookUserAuthenticationStateInfo {
        if (authResponse.status === 'connected') {
            return {
                authenticated: true,
                vendor: AuthenticationVendor.Facebook,
                provider: AuthenticationProvider.Business,

                uid: authResponse.authResponse.userID,
                accessToken: authResponse.authResponse.accessToken,
            }
        } else {
            return {
                authenticated: false,
            }
        }
    }

    public async verifyUser(): Promise<boolean> {
        const userAuthState = await this.getUserAuthenticationStateInfo();
        return userAuthState.authenticated;
    }

    public async getUserAuthenticationStateInfo(): Promise<FacebookUserAuthenticationStateInfo> {
        const authResponse = await FacebookClientSDKRegistry.getInstance().getLoginStatus();
        return this.composeAuthenticationStateInfo(authResponse);
    }

    public async signIn(force = false): Promise<FacebookUserAuthenticationStateInfo> {
        let loginResponse;

        if (!force) {
            loginResponse = await FacebookClientSDKRegistry.getInstance().getLoginStatus();
        }

        if (isNil(loginResponse) || loginResponse.status !== 'connected') {
            loginResponse = await FacebookClientSDKRegistry.getInstance().login(this._options);
        } else {
            return this.composeAuthenticationStateInfo(loginResponse);
        }

        if (loginResponse.status !== 'connected') {
            throw new Error('Cannot sign in user to Facebook');
        } else {
            return this.composeAuthenticationStateInfo(loginResponse);
        }
    }

    public async signOut(): Promise<void> {
        return await FacebookClientSDKRegistry.getInstance().logout();
    }
}

// exports
export default FacebookClientAuthenticationStrategy;