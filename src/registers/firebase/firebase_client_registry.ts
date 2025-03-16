// external imports
import 'server-only';
import { FirebaseOptions } from '@firebase/app';

import { readFileSync } from 'node:fs';

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// internal imports
import { isNil, isString } from '../../utils/misc/logic_utils';

// implementation
/**
 * Register that instantiates Firebase client app and hold reference to it.
 * Current class implements Singleton pattern which allows to avoid reinitialization of Firebase client app and be accessible from every part of the application.
 *
 * @class
 *
 */
class FirebaseClientRegistry {
    private static instance: FirebaseClientRegistry;

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
     * Method that loads Firebase client application configuration.
     * Method tries to load JSON file in the location specified by the @see {@link process.env.FIREBASE_CLIENT_APP_CONFIG_JSON_PATH} and parses it.
     *
     * @throws {RangeError|Error} if path to JSON file is not specified or file cannot be read.
     *
     * @returns {FirebaseOptions} Firebase client app configuration.
     *
     */

    protected loadFirebaseClientAppConfig(): FirebaseOptions {
        if (!isString(process.env.FIREBASE_CLIENT_APP_CONFIG_JSON_PATH)) {
            throw new RangeError('Cannot load Firebase client application configuration file - path to file must be of type string');
        }

        const fileContents = readFileSync(process.env.FIREBASE_CLIENT_APP_CONFIG_JSON_PATH, { encoding: 'utf8', flag: 'r' });
        return JSON.parse(fileContents);
    }

    /**
     * Method that initializes current class instance.
     * Method will try to find initialized Firebase Client application by name (@see {@link process.env.FIREBASE_CLIENT_APP_NAME}) and if find none - will try to initialize it (@see {@link initializeApp}).
     * Initialization of the Firebase Client application involves loading of the configuration JSON file (@see {@link this.loadFirebaseClientAppConfig}).
     *
     * @throws {RangeError} if application name is not set (@see {@link process.env.FIREBASE_CLIENT_APP_NAME}).
     *
     */

    protected init(): void {
        if (!isString(this.appName)) {
            throw new RangeError('Cannot initialize Firebase application - name is not specified');
        }

        const firebaseApp = getApps().find(firebaseApp => firebaseApp.name === process.env.FIREBASE_CLIENT_APP_NAME);
        if (isNil(firebaseApp)) {
            initializeApp(this.loadFirebaseClientAppConfig(), this.appName);
        }
    }

    /**
     * Method that returns current Firebase Client application name (@see {@link process.env.FIREBASE_CLIENT_APP_NAME}).
     *
     * @returns {string} application name.
     *
     */

    get appName() {
        return process.env.FIREBASE_CLIENT_APP_NAME;
    }

    /**
     * Method that returns current Firebase Client application.
     * Method will also try to initialize Firebase Client application if it was not initialized previously.
     *
     * @returns {FirebaseApp} Firebase Client application.
     *
     */

    get app() {
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

    get auth() {
        this.init();
        return getAuth(this.app);
    }
}

// exports
export default FirebaseClientRegistry;