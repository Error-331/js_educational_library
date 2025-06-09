// external imports

// internal imports
import { EmailPasswordValidatorType } from '../../validation_declarations';

// implementation
enum FirebaseAuthTokenType {
    AccessToken = 'AccessToken',
    JWTToken = 'JWTToken',
}

type FirebaseEmailPasswordJWTClientAuthenticationStrategyConfiguration = {
    baseURL: string;

    verifyUserURL: string;
    getUserAuthenticationStateInfoURL: string;

    signInURL: string;
    signUpURL: string;
    signOutURL: string;

    inputDataValidator?: EmailPasswordValidatorType;
}

export {
    FirebaseAuthTokenType,

    FirebaseEmailPasswordJWTClientAuthenticationStrategyConfiguration,
}