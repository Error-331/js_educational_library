// external imports
import { UserCredential, AuthErrorCodes, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// internal imports
import { UserAuthenticationStateInfo, AuthenticationSignInStrategy } from '../../../../../declarations/security/authentication_declarations';
import { FirebaseEmailPasswordJWTClientAuthenticationStrategyConfiguration } from '../../../../../declarations/security/firebase_authentication_declarations';
import { EmailPasswordValidatorType } from '../../../../../declarations/validation_declarations';

import AxiosRequestFacade from '../../../../../net/http/request/axios_request_facade';
import FirebaseClientRegistry from '../../../../../registers/firebase/firebase_client_registry';

import { createAndThrowValidationError, createCustomZodIssueAndThrowValidationError } from '../../../../../utils/misc/validation_utils';
import { handleHTTPResponseData } from '../../../../../utils/net/http/response_utils';

import { isNil, isString, isObject, isFunction } from '../../../../../utils/misc/logic_utils';

// implementation
class FirebaseEmailPasswordJWTAuthenticationStrategy implements AuthenticationSignInStrategy<string, string> {
    private baseURL: string;

    private verifyUserURL: string;
    private getUserAuthenticationStateInfoURL: string;

    private signInURL: string;
    private signUpURL: string;
    private signOutURL: string;

    private inputDataValidator: undefined | EmailPasswordValidatorType;

    constructor(config: FirebaseEmailPasswordJWTClientAuthenticationStrategyConfiguration) {
        if (!isString(config.baseURL)) {
            throw new RangeError('Cannot instantiate authentication strategy - base url is not set');
        }

        if (!isString(config.verifyUserURL)) {
            throw new RangeError('Cannot instantiate authentication strategy - "verifyUser" url is not set');
        }

        if (!isString(config.getUserAuthenticationStateInfoURL)) {
            throw new RangeError('Cannot instantiate authentication strategy - "getUserAuthenticationStateInfoURL" url is not set');
        }

        if (!isString(config.signInURL)) {
            throw new RangeError('Cannot instantiate authentication strategy - "signIn" url is not set');
        }

        if (!isString(config.signUpURL)) {
            throw new RangeError('Cannot instantiate authentication strategy - "signUp" url is not set');
        }

        if (!isString(config.signOutURL)) {
            throw new RangeError('Cannot instantiate authentication strategy - "signOut" url is not set');
        }

        this.baseURL = config.baseURL;

        this.verifyUserURL = config.verifyUserURL;
        this.getUserAuthenticationStateInfoURL = config.getUserAuthenticationStateInfoURL;

        this.signInURL = config.signInURL;
        this.signUpURL = config.signUpURL;
        this.signOutURL = config.signOutURL;

        this.inputDataValidator = config.inputDataValidator;
    }


    protected transformAndThrowFirebaseAuthError(error: unknown): void {
        if (!isObject(error)) {
            throw new Error('Unknown Firebase auth error');
        }

        if (!('code' in error) || isNil(error?.code)) {
            throw error;
        }

        switch(error.code) {
            case AuthErrorCodes.USER_DELETED:
                createCustomZodIssueAndThrowValidationError([ 'email' ], undefined, 'Email not found on the server');
                break;
            case AuthErrorCodes.INVALID_EMAIL:
                createCustomZodIssueAndThrowValidationError([ 'email' ], undefined, 'Invalid email provided');
                break;
            case AuthErrorCodes.EMAIL_EXISTS:
                createCustomZodIssueAndThrowValidationError([ 'email' ], undefined, 'Email is already in use by another user');
                break;
            default:
                throw error;
        }
    }

    protected async initSignIn(email: string, password: string): Promise<UserCredential> {
        try {
            return await signInWithEmailAndPassword(FirebaseClientRegistry.getInstance().auth, email, password);
        } catch (error: unknown) {
            this.transformAndThrowFirebaseAuthError(error);
        }
    }

    protected async initSignUp(email: string, password: string): Promise<UserCredential> {
        try {
            return await createUserWithEmailAndPassword(FirebaseClientRegistry.getInstance().auth, email, password);
        } catch (error: unknown) {
            this.transformAndThrowFirebaseAuthError(error);
        }
    }

    protected validatedInputData(email: string, password: string): void {
        if (!isFunction(this.inputDataValidator)) {
            return;
        }

        const validationResult = this.inputDataValidator({email, password});

        if (!validationResult.success) {
            createAndThrowValidationError(validationResult);
        }
    }

    public async verifyUser(): Promise<boolean> {
        // TODO: we do not need to stick to Axios - probably need to use some sort of factory
        const httpClient = new AxiosRequestFacade({
            baseURL: this.baseURL,
            url: this.verifyUserURL,
        });

        const { statusCode, data } = await httpClient.get();
        return handleHTTPResponseData<boolean>(statusCode, data);
    }

    public async getUserAuthenticationStateInfo(): Promise<UserAuthenticationStateInfo> {
        // TODO: we do not need to stick to Axios - probably need to use some sort of factory
        const httpClient = new AxiosRequestFacade({
            baseURL: this.baseURL,
            url: this.getUserAuthenticationStateInfoURL,
        });

        const { statusCode, data } = await httpClient.get();
        return handleHTTPResponseData<UserAuthenticationStateInfo>(statusCode, data);
    }

    public async signIn(email: string, password: string): Promise<UserAuthenticationStateInfo> {
        this.validatedInputData(email, password);

        const currentUserCredentials: UserCredential = await this.initSignIn(email, password);
        const idToken = await currentUserCredentials.user.getIdToken();

        // TODO: we do not need to stick to Axios - probably need to use some sort of factory
        const httpClient = new AxiosRequestFacade({
            baseURL: this.baseURL,
            url: this.signInURL,
            data: { accessToken: idToken }
        });

        const { statusCode, data } = await httpClient.post();
        return handleHTTPResponseData<UserAuthenticationStateInfo>(statusCode, data);
    }

    public async signUp(email: string, password: string): Promise<UserAuthenticationStateInfo> {
        this.validatedInputData(email, password);

        const currentUserCredentials: UserCredential = await this.initSignUp(email, password);
        const idToken = await currentUserCredentials.user.getIdToken();

        // TODO: we do not need to stick to Axios - probably need to use some sort of factory
        const httpClient = new AxiosRequestFacade({
            baseURL: this.baseURL,
            url: this.signUpURL,
            data: { accessToken: idToken }
        });

        const { statusCode, data } = await httpClient.post();
        return handleHTTPResponseData<UserAuthenticationStateInfo>(statusCode, data);
    }

    public async signOut(): Promise<void> {
        // TODO: we do not need to stick to Axios - probably need to use some sort of factory
        const httpClient = new AxiosRequestFacade({
            baseURL: this.baseURL,
            url: this.signOutURL,
        });

        const { statusCode, data } = await httpClient.get();
        handleHTTPResponseData<UserAuthenticationStateInfo>(statusCode, data);
    }
}

// exports
export default FirebaseEmailPasswordJWTAuthenticationStrategy;