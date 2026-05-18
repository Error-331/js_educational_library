// external imports

// internal imports
import { UserAuthenticationStateInfo } from './general_authentication_declarations';

// implementation
type CommonUIDCustomJWTServerUserData = {
    uid: string;
    serviceName: string;
}

type CommonUIDCustomJWTServerAuthenticationStateInfo = UserAuthenticationStateInfo & {
    customAuthToken: string;
}

// exports
export type {
    CommonUIDCustomJWTServerUserData,
    CommonUIDCustomJWTServerAuthenticationStateInfo,
}