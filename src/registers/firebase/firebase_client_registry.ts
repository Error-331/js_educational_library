// external imports
import { FirebaseApp, FirebaseOptions, initializeApp, getApp, getApps } from 'firebase/app';
import { Auth, getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

// internal imports
import { FIREBASE_DEFAULT_CLIENT_APP_NAME } from '../../constants/registers/firebase_registers_constants';
import { isNil, isObject, isString } from '../../utils/misc/logic_utils';
import { isClientProductionEnvironment } from '../../utils/vendor/common_client_utils';

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
     * Method that will try to find initialized Firebase client application by name if any.
     *
     * @param {string} appName - name of the application.
     *
     * @static
     *
     * @returns {FirebaseApp | undefined} Firebase client app instance if found, undefined if not.
     *
     */

    public static findAppByName(appName: string): FirebaseApp | undefined {
        return getApps().find(firebaseApp => firebaseApp.name === appName);
    }

    /**
     * Method that will try to find default initialized Firebase client application if any.
     *
     * @static
     *
     * @returns {FirebaseApp | undefined} Firebase client app instance if found, undefined if not.
     *
     */

    public static findDefaultAppByName(): FirebaseApp | undefined {
        return this.findAppByName(FIREBASE_DEFAULT_CLIENT_APP_NAME);
    }

    /**
     * Method returns current (and only) instance of the class.
     *
     * @static
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
     * Method connects current Firebase client authentication object to emulator which endpoint specified at provided location.
     *
     * @param {string} url - HTTP endpoint of authentication emulator.
     *
     */

    public connectEmulatorToAuth(url: string): void {
        connectAuthEmulator(this.auth, url);
    }

    public connectEmulatorToFunctions(): void {
        const functions = getFunctions(getApp(this.appName));
        connectFunctionsEmulator(functions, '127.0.0.1', 5001);
    }

    /**
     * Method that initializes current class instance.
     *
     * @throws {RangeError} if application name is not set (@see {@link process.env.JSEL_FIREBASE_CLIENT_APP_NAME}).
     *
     */

    public init(): void {
        if (!isString(this.appName)) {
            throw new RangeError('Cannot initialize Firebase application - name is not specified');
        }

        const firebaseApp = FirebaseClientRegistry.findAppByName(this.appName);
        if (isNil(firebaseApp)) {
            initializeApp(this._options, this.appName);

            if (!isClientProductionEnvironment()) {
                this.connectEmulatorToAuth('http://127.0.0.1:9099');
                //this.connectEmulatorToFunctions();
            }
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
     * @param {string} name - application name, this name will be used to initialize an app (@see {@link initializeApp()}) and can be used with @see {@link findAppByName()}.
     *
     * @throws {RangeError} if provided name is not a string.
     *
     */

    set appName(name: string) {
        if (!isString(name)) {
            throw new RangeError('Cannot set Firebase client app name - value must be of type string');
        }

        this._appName = name;
    }

    /**
     * Method that sets current Firebase Client application options.
     *
     * @param {FirebaseOptions} options - options that are used during Firebase client app initialization @see {@link initializeApp()} (usually can be found at `https://{some_hosted_site}__/firebase/init.json`).
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