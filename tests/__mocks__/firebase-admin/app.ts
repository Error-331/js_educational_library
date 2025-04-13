// external imports

// internal imports
import { MockFirebaseAdminApp, MockFirebaseClientApp } from '../../.jest/declarations/firebase_mock_declarations';

import FirebaseAdminDefaultAdditionalConfig from '../firebase_admin_default_app_additional_config.json';
import { FIREBASE_DEFAULT_ADMIN_APP_NAME } from '../../../src/constants/registers/firebase_registers_constants';

import admin from '../firebase-admin'
import { isNil } from '../../../src/utils/misc/logic_utils';

// implementation
let firebaseAdminApps: MockFirebaseAdminApp[] = [];

function getApps(): MockFirebaseAdminApp[] {
    return firebaseAdminApps;
}

function getApp(appName: string): MockFirebaseClientApp {
    const app = getApps().find(firebaseAdminApp => firebaseAdminApp.name === appName);

    if (isNil(app)) {
        throw new Error('Cannot find Firebase Admin App');
    }

    return app;
}

function __addApp(app: MockFirebaseAdminApp): void {
    firebaseAdminApps.push(app);
}

function __addDefaultApp(): void {
    __addApp({
        name: FIREBASE_DEFAULT_ADMIN_APP_NAME,
        options: {
            ...FirebaseAdminDefaultAdditionalConfig,
            credential: admin.credential.cert('./tests/__mocks__/firebase_admin_default_service_account.json'),
        }
    });
}

function __resetMock(): void {
    firebaseAdminApps = [];
}

// exports
export {
    getApps,
    getApp,

    __addApp,
    __addDefaultApp,
    __resetMock,
}