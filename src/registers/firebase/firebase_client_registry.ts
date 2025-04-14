// external imports
import { FirebaseApp, FirebaseOptions, initializeApp, getApp, getApps } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';

// internal imports
import { FIREBASE_DEFAULT_CLIENT_APP_NAME } from '../../constants/registers/firebase_registers_constants';
import { isNil, isObject, isString } from '../../utils/misc/logic_utils';

// implementation
/**
 * Register that instantiates Firebase Client app and hold reference to it.
 * Current class implements Singleton pattern which allows to avoid reinitialization of Firebase Client app and be accessible from every part of the application.
 *
 * @class
 *
 */
class FirebaseClientRegistry {
    private static instance: FirebaseClientRegistry;

    private _appName: string = FIREBASE_DEFAULT_CLIENT_APP_NAME;
    private _options: FirebaseOptions;

    private constructor() {}

    /**
     * Method returns current (and only) instance of the class.
     *
     * @returns {FirebaseClientRegistry} current instance of the class.
     *
     */

    public static getInstance(): FirebaseClientRegistry  {
        if (!FirebaseClientRegistry.instance) {
            FirebaseClientRegistry.instance = new FirebaseClientRegistry();
        }

        return FirebaseClientRegistry.instance;
    }

    /**
     * Method that initializes current class instance.
     *
     * @throws {RangeError} if application name is not set (@see {@link process.env.FIREBASE_CLIENT_APP_NAME}).
     *
     */

    protected init(): void {
        if (!isString(this.appName)) {
            throw new RangeError('Cannot initialize Firebase application - name is not specified');
        }

        const firebaseApp = getApps().find(firebaseApp => firebaseApp.name === this.appName);
        if (isNil(firebaseApp)) {
            initializeApp(this._options, this.appName);
        }
    }

    /**
     * Method that returns current Firebase Client application name.
     *
     * @returns {string} application name.
     *
     */

    get appName(): string {
        return this._appName;
    }

    /**
     * Method that returns current Firebase Client application options which will be used during app initialization.
     *
     * @returns {FirebaseOptions} application options.
     *
     */

    get options(): FirebaseOptions {
        return this._options;
    }

    /**
     * Method that returns current Firebase Client application.
     * Method will also try to initialize Firebase Client application if it was not initialized previously.
     *
     * @returns {FirebaseApp} Firebase Client application.
     *
     */

    get app(): FirebaseApp {
        this.init();
        return getApp(this.appName);
    }

    /**
     * Method that returns current Firebase Client application authentication instance.
     * Method will also try to initialize Firebase Client application if it was not initialized previously.
     *
     * @returns {Auth} Firebase Client application authentication instance.
     *
     */

    get auth(): Auth {
        this.init();
        return getAuth(this.app);
    }

    /**
     * Method that sets current Firebase Client application name.
     *
     * @throws {RangeError} if provided name is not a string.
     *
     */

    set appName(name:string) {
        if (!isString(name)) {
            throw new RangeError('Cannot set Firebase client app name - value must be of type string');
        }

        this._appName = name;
    }

    /**
     * Method that sets current Firebase Client application options.
     *
     * @throws {RangeError} if provided options are not represented as object.
     *
     */

    set options(options: FirebaseOptions) {
        if (!isObject(options)) {
            throw new RangeError('Cannot set Firebase client app options - value must be of type object');
        }

        this._options = options;
    }
}

// exports
export default FirebaseClientRegistry;