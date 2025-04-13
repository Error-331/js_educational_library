// external imports

// internal imports
import { MockFirebaseAdminApp, MockFirebaseClientApp } from '../../.jest/declarations/firebase_mock_declarations';
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


function __resetMock(): void {
    firebaseAdminApps = [];
}

// exports
export {
    getApps,
    getApp,

    __addApp,
    __resetMock,
}