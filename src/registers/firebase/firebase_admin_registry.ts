// external imports
import admin from 'firebase-admin';
import { App, getApp, getApps } from 'firebase-admin/app';

import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { Storage, getStorage } from 'firebase-admin/storage';
import { Auth, getAuth } from 'firebase-admin/auth';

// internal imports
import { readJSONFileSync } from '../../utils/misc/file_utils';
import { isNil, isString } from '../../utils/misc/logic_utils';

// implementation
/**
 * Register that instantiates Firebase Admin app and hold reference to it.
 * Current class implements Singleton pattern which allows to avoid reinitialization of Firebase Aamin app and be accessible from every part of the application.
 *
 * @class
 *
 */
class FirebaseAdminRegistry {
    private static instance: FirebaseAdminRegistry;

    private constructor() {}

    /**
     * Method returns current (and only) instance of the class.
     *
     * @returns {FirebaseAdminRegistry} current instance of the class.
     *
     */

    public static getInstance(): FirebaseAdminRegistry  {
        if (!FirebaseAdminRegistry.instance) {
            FirebaseAdminRegistry.instance = new FirebaseAdminRegistry();
        }

        return FirebaseAdminRegistry.instance;
    }

    /**
     * Method that initializes current class instance.
     * Method will try to find initialized Firebase Admin application by name (@see {@link process.env.FIREBASE_ADMIN_APP_NAME}) and if find none - will try to initialize it (@see {@link initializeApp}).
     * Initialization of the Firebase Admin application involves loading of the service account JSON file in the location specified by the @see {@link process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON_PATH},
     * additional configuration file specified by the @see {@link process.env.FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON_PATH}.
     *
     * @throws {RangeError} if application name is not set (@see {@link process.env.FIREBASE_ADMIN_APP_NAME}).
     *
     */

    protected init(): void {
        if (!isString(this.appName)) {
            throw new Error('Application name is not specified - cannot proceed');
        }

        const firebaseApp = getApps().find(firebaseApp => firebaseApp.name === this.appName);
        if (isNil(firebaseApp)) {
            admin.initializeApp({
                ...readJSONFileSync(process.env.FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON_PATH),
                credential: admin.credential.cert(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON_PATH)
            }, this.appName);
        }
    }

    /**
     * Method that returns current Firebase Admin application name (@see {@link process.env.FIREBASE_ADMIN_APP_NAME}).
     *
     * @returns {string} application name.
     *
     */

    get appName(): string {
        return process.env.FIREBASE_ADMIN_APP_NAME;
    }

    /**
     * Method that returns current Firebase Admin application.
     * Method will also try to initialize Firebase Admin application if it was not initialized previously.
     *
     * @returns {App} Firebase Admin application.
     *
     */

    get app(): App {
        this.init();
        return getApp(this.appName);
    }

    /**
     * Method that returns current Firebase Admin application Firestore instance.
     * Method will also try to initialize Firebase Admin application if it was not initialized previously.
     *
     * @returns {Firestore} Firebase Admin Firestore instance.
     *
     */

    get firestore(): Firestore {
        this.init();
        return getFirestore();
    }

    /**
     * Method that returns current Firebase Admin application Storage instance.
     * Method will also try to initialize Firebase Admin application if it was not initialized previously.
     *
     * @returns {Storage} Firebase Admin Storage instance.
     *
     */

    get storage(): Storage {
        this.init();
        return getStorage(this.app);
    }

    /**
     * Method that returns current Firebase Admin application authentication instance.
     * Method will also try to initialize Firebase Admin application if it was not initialized previously.
     *
     * @returns {Auth} Firebase Admin application authentication instance.
     *
     */

    get auth(): Auth {
        this.init();
        return getAuth(this.app);
    }
}

// exports
export default FirebaseAdminRegistry;