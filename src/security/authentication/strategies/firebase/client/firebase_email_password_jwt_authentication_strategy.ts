// external imports
import { UserCredential, AuthErrorCodes, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// internal imports
import { GenericObject } from '../../../../../declarations/collection_declarations';

import { UserAuthenticationStateInfo, AuthenticationSignInStrategy } from '../../../../../declarations/security/authentication/general_authentication_declarations';
import { FirebaseEmailPasswordJWTClientAuthenticationStrategyConfiguration } from '../../../../../declarations/security/authentication/firebase_authentication_declarations';

import FirebaseAbstractJWTAuthenticationStrategy from '../abstract/firebase_abstract_jwt_authentication_strategy';

import AxiosRequestFacade from '../../../../../net/http/request/axios_request_facade';
import FirebaseClientRegistry from '../../../../../registers/firebase/firebase_client_registry';

import { handleHTTPResponseData } from '../../../../../utils/net/http/response_utils';
import { createCustomZodIssueAndThrowValidationError } from '../../../../../utils/misc/validation_utils';
import { isNil, isBoolean, isObject, isString } from '../../../../../utils/misc/logic_utils';

// implementation
class FirebaseEmailPasswordJWTAuthenticationStrategy extends FirebaseAbstractJWTAuthenticationStrategy implements AuthenticationSignInStrategy<string, string | GenericObject, void> {
    private baseURL: string;

    private verifyUserURL: string;
    private getUserAuthenticationStateInfoURL: string;

    private signInURL: string;
    private signUpURL: string;
    private signOutURL: string;

    private signUpUseServer: boolean = false;

    constructor(config: FirebaseEmailPasswordJWTClientAuthenticationStrategyConfiguration) {
        super();

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

        this.signUpUseServer = isBoolean(config.signUpUseServer) ? config.signUpUseServer : false;
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
            case AuthErrorCodes.INVALID_PASSWORD:
                createCustomZodIssueAndThrowValidationError([ 'password' ], undefined, 'Invalid password provided');
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

    protected async signUpClient(email: string, password: string): Promise<void> {
        let currentUserCredentials: UserCredential;

        try {
            currentUserCredentials = await createUserWithEmailAndPassword(FirebaseClientRegistry.getInstance().auth, email, password);
        } catch (error: unknown) {
            this.transformAndThrowFirebaseAuthError(error);
        }

        const idToken = await currentUserCredentials.user.getIdToken();

        // TODO: we do not need to stick to Axios - probably need to use some sort of factory
        const httpClient = new AxiosRequestFacade({
            baseURL: this.baseURL,
            url: this.signUpURL,
            data: { accessToken: idToken }
        });

        const { statusCode, data } = await httpClient.post();
        handleHTTPResponseData<void>(statusCode, data);
    }

    protected async signUpServer(email: string, password: string, extraData?: GenericObject): Promise<void> {
        const httpClient = new AxiosRequestFacade({
            baseURL: this.baseURL,
            url: this.signUpURL,
            data: { email, password, extraData }
        });

        const { statusCode, data } = await httpClient.post();
        handleHTTPResponseData<UserAuthenticationStateInfo>(statusCode, data);
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

    public async signUp(email: string, password: string, extraData?: GenericObject): Promise<void> {
        return this.signUpUseServer ? this.signUpServer(email, password, extraData) : this.signUpClient(email, password);
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