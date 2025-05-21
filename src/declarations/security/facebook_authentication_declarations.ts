// external imports

// internal imports
import { UserAuthenticationStateInfo } from './authentication_declarations';

// implementation
interface FacebookUserAuthenticationStateInfo extends UserAuthenticationStateInfo {
    uid?: string;
    accessToken?: string;
}

// exports
export {
    FacebookUserAuthenticationStateInfo,
}