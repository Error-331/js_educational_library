// external imports

// internal imports
import {
    AuthenticationVendor,
    AuthenticationProvider,
    UserAuthenticationStrategyInfo,
    UserAuthenticationStateInfo,
} from '../../../../declarations/security/authentication/general_authentication_declarations';

// implementation
class FirebaseClientJWTAuthenticationUtils {
    public static getDefaultUserAuthenticationStrategyInfo(): UserAuthenticationStrategyInfo {
        return {
            vendor: AuthenticationVendor.Unknown,
            provider: AuthenticationProvider.Unknown,
        };
    }

    public static getDefaultUserAuthenticationStateInfo(): UserAuthenticationStateInfo  {
        return {
            ...FirebaseClientJWTAuthenticationUtils.getDefaultUserAuthenticationStrategyInfo(),
            authenticated: false,
        };
    }
}

// exports
export default FirebaseClientJWTAuthenticationUtils;