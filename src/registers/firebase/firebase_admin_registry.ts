// external imports
import admin from 'firebase-admin';
import { App, getApp, getApps, AppOptions, ServiceAccount, Credential } from 'firebase-admin/app';

import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { Storage, getStorage } from 'firebase-admin/storage';
import { Auth, getAuth } from 'firebase-admin/auth';

// internal imports
import { WrappedCredential } from '../../declarations/registers/firebase_admin_registry_declarations';
import { SimpleTextEncryptor } from '../../declarations/security/crypto/encryptors_declarations';

import { FIREBASE_DEFAULT_ADMIN_APP_NAME } from '../../constants/registers/firebase_registers_constants';

import SimpleTextEncryptorFactory from '../../security/crypto/factories/simple_text_encryptor_factory';

import { readJSONFileSync } from '../../utils/misc/file_utils';
import { isNil, isString, isObject } from '../../utils/misc/logic_utils';

// implementation
/**
 * Register that instantiates Firebase Admin app and hold reference to it.
 * Current class implements Singleton pattern which allows to avoid reinitialization of Firebase Admin app and be accessible from every part of the application.
 *
 * @class
 *
 */
class FirebaseAdminRegistry {
    private static instance: FirebaseAdminRegistry;
    private static serviceAccountKey: ServiceAccount | undefined | null;
    private static appAdditionalConfiguration: AppOptions | undefined | null;

    private constructor() {}

    private static convertServiceKeyToCredential(serviceAccountKey: string | ServiceAccount): ServiceAccount | WrappedCredential {
        if (isObject(serviceAccountKey) && Object.keys(serviceAccountKey).length === 1 && !isNil(serviceAccountKey?.projectId)) {
            return serviceAccountKey;
        } else {
            return { credential: admin.credential.cert(serviceAccountKey) };
        }
    }

    private static extractFirebaseAdminServiceAccountJSON(): ServiceAccount | WrappedCredential {
        if (isNil(process.env.JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON)) {
            throw new RangeError('Cannot extract service account JSON - "JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON" environment variable is not set');
        }

        if (!isNil(process.env.JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_CRYPTO_CONFIG)) {
            const cryptoConfig: SimpleTextEncryptor = JSON.parse(process.env.JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_CRYPTO_CONFIG);
            const encryptorFactory = new SimpleTextEncryptorFactory();
            const encryptor = encryptorFactory.createEncryptor(cryptoConfig.encryptorName);
            const serviceAccount = encryptor.decryptJSON<ServiceAccount>(cryptoConfig.key, process.env.JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON);

            return this.convertServiceKeyToCredential(serviceAccount);
        } else {
            return this.convertServiceKeyToCredential(JSON.parse(process.env.JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON));
        }
    }

    private static extractFirebaseAdminAppAdditionalConfigurationJSON(): AppOptions {
        if (isNil(process.env.JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON)) {
            throw new RangeError('Cannot extract app additional configuration JSON - "JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON" environment variable is not set');
        }

        if (!isNil(process.env.JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_CRYPTO_CONFIG)) {
            const cryptoConfig: SimpleTextEncryptor = JSON.parse(process.env.JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_CRYPTO_CONFIG);
            const encryptorFactory = new SimpleTextEncryptorFactory();
            const encryptor = encryptorFactory.createEncryptor(cryptoConfig.encryptorName);

            return encryptor.decryptJSON<AppOptions>(cryptoConfig.key, process.env.JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON);
        } else {
            return JSON.parse(process.env.JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON);
        }
    }

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

    // TODO: proper types
    public static extractServiceAccountCredentials(serviceAccountKey: Credential) {
        if (isNil(serviceAccountKey)) {
            throw new RangeError('Cannot extract service account credentials - service account key is not specified');
        }

        return {
            projectId: serviceAccountKey.projectId ?? FirebaseAdminRegistry.instance?.projectId,
            credentials: {
                client_email: serviceAccountKey.clientEmail,
                private_key: serviceAccountKey.privateKey,
            },
        }
    }

    public static loadServiceAccountKey(path?: string): ServiceAccount | WrappedCredential | undefined {
        if (!isNil(path)) {
            return this.convertServiceKeyToCredential(path);
        }

        const savedServiceAccountKey = FirebaseAdminRegistry.getServiceAccountKey();

        if (!isNil(savedServiceAccountKey)) {
            return this.convertServiceKeyToCredential(savedServiceAccountKey);
        } else if (!isNil(process.env.JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON)) {
            return FirebaseAdminRegistry.extractFirebaseAdminServiceAccountJSON();
        } else if (!isNil(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
            return this.convertServiceKeyToCredential(process.env.GOOGLE_APPLICATION_CREDENTIALS);
        } else if (!isNil(process.env.JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON_PATH)) {
            return this.convertServiceKeyToCredential(process.env.JSEL_FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON_PATH);
        } else {
            return undefined;
        }
    }

    // TODO: add proper return type
    public static loadServiceAccountCredentials(path?: string) {
        const scKey = FirebaseAdminRegistry.loadServiceAccountKey(path);

        if (isNil(scKey)) {
            throw new RangeError('Cannot load service account credentials - service account key was not loaded correctly');
        }

        return FirebaseAdminRegistry.extractServiceAccountCredentials(scKey);
    }

    public static loadAppAdditionalConfiguration(path?: string): AppOptions | undefined {
        if (!isNil(path)) {
            return readJSONFileSync(path);
        }

        const appAdditionalConfiguration = FirebaseAdminRegistry.getAppAdditionalConfiguration();

        if (!isNil(appAdditionalConfiguration)) {
            return appAdditionalConfiguration;
        } else if (!isNil(process.env.JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON)) {
            return FirebaseAdminRegistry.extractFirebaseAdminAppAdditionalConfigurationJSON();
        } else if (!isNil(process.env.JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON_PATH)) {
            return readJSONFileSync(process.env.JSEL_FIREBASE_ADMIN_APP_ADDITIONAL_CONFIG_JSON_PATH);
        } else {
            return undefined;
        }
    }

    /**
     * Prepares and returns the Firebase App options used for initializing the Firebase Admin application.
     * The options are constructed based on the loaded service account credentials and additional app configuration.
     *
     * If no service account credentials can be loaded, the method returns the additional app configuration only.
     * Otherwise, it includes both the credentials and additional configuration in the resulting options.
     *
     * @returns {AppOptions | undefined} Firebase App options that include credentials and/or additional configuration,or `undefined` if no configuration could be prepared.
     *
     */

    protected prepareAppOptions(): AppOptions | undefined {
        const credential = FirebaseAdminRegistry.loadServiceAccountKey();
        const appAdditionalConfiguration = FirebaseAdminRegistry.loadAppAdditionalConfiguration();

        if (isNil(credential) && isNil(appAdditionalConfiguration)) {
            return undefined;
        }

        if (isNil(credential)) {
            return {
                ...appAdditionalConfiguration,
            };
        } else {
            return {
                ...appAdditionalConfiguration,
                ...credential,
            };
        }
    }

    /**
     * Method that initializes current class instance.
     * Method will try to find initialized Firebase Admin application by name (@see {@link process.env.JSEL_FIREBASE_ADMIN_APP_NAME}) and if find none - will try to initialize it (@see {@link initializeApp}).
     * If {@link process.env.JSEL_FIREBASE_ADMIN_APP_NAME} is not specified - default app name will be used (@see {@link FIREBASE_DEFAULT_ADMIN_APP_NAME}).
     *
     * @throws {RangeError} if application name is not set (is not a string).
     *
     */

    protected init(): void {
        console.log('init admin 1');
        if (!isString(this.appName)) {
            throw new RangeError('Application name is not specified - cannot proceed');
        }
        console.log('init admin 2');
        const firebaseApp = getApps().find(firebaseApp => firebaseApp.name === this.appName);
        if (isNil(firebaseApp)) {
            console.log('init admin 3');
            admin.initializeApp(this.prepareAppOptions(), this.appName !== FIREBASE_DEFAULT_ADMIN_APP_NAME ? this.appName : undefined);
        }
    }

    /**
     * Method that returns current Firebase Admin application name (@see {@link process.env.JSEL_FIREBASE_ADMIN_APP_NAME}).
     * If application name is not set - default Firebase app name will be returned (@see {@link FIREBASE_DEFAULT_ADMIN_APP_NAME}).
     *
     * @returns {string | undefined} application name.
     *
     */

    get appName(): string {
        return process.env.JSEL_FIREBASE_ADMIN_APP_NAME ?? FIREBASE_DEFAULT_ADMIN_APP_NAME;
    }

    /**
     * Method that returns current Firebase Admin application name project ID ().
     *
     * @returns {string | undefined} project ID.
     *
     */

    get projectId(): string {
        this.init();
        return this.app.options.credential.projectId ?? this.app.options.projectId;
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

    public static getServiceAccountKey(): ServiceAccount | undefined | null {
        return FirebaseAdminRegistry.serviceAccountKey;
    }

    public static getAppAdditionalConfiguration(): AppOptions | undefined | null {
        return FirebaseAdminRegistry.appAdditionalConfiguration;
    }

    public static setServiceAccountKey(serviceAccount?: ServiceAccount | null): void {
        if (!isObject(serviceAccount) && !isNil(serviceAccount)) {
            throw new RangeError('Cannot set GCP service account key - provided service account is not nil and not an object')
        }

        FirebaseAdminRegistry.serviceAccountKey = serviceAccount;
    }
}

// exports
export default FirebaseAdminRegistry;