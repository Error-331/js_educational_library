// external imports

// internal imports

// implementation
enum FirebaseAuthTokenType {
    AccessToken = 'AccessToken',
    JWTToken = 'JWTToken',
}

interface FirebaseEmailPasswordJWTServerSignUpData {
    email: string;
    password: string;
    displayName?: string;
}

type FirebaseEmailPasswordJWTClientAuthenticationStrategyConfiguration = {
    baseURL: string;

    verifyUserURL: string;
    getUserAuthenticationStateInfoURL: string;
    getUserDataURL: string;

    signInURL: string;
    signUpURL: string;
    signOutURL: string;

    signUpUseServer?: boolean;
}

type FirebaseEmailPasswordJWTServerAuthenticationStrategyConfiguration = {
    isCustomSessionToken?: boolean;
}

type FirebaseEmailPasswordJWTServerUserData = {
    uid: string;
    name: string;
    email?: string;
    emailVerified: boolean;
    photoURL?: string;
}

export {
    FirebaseAuthTokenType,

    FirebaseEmailPasswordJWTServerSignUpData,
    FirebaseEmailPasswordJWTClientAuthenticationStrategyConfiguration,
    FirebaseEmailPasswordJWTServerAuthenticationStrategyConfiguration,
    FirebaseEmailPasswordJWTServerUserData,
}