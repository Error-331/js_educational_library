// external imports

// internal imports
import { MockFirebaseClientAppOptions, MockFirebaseClientApp } from '../../.jest/declarations/firebase_mock_declarations';

import { __addAuth } from './auth';
import { isNil } from '../../../src/utils/misc/logic_utils';

// implementation
let firebaseApps: MockFirebaseClientApp[] = [];

function initializeApp(options: MockFirebaseClientAppOptions, name: string) {
    const app = getApps().find(firebaseApp => firebaseApp.name === name);

    if (isNil(app)) {
        const newApp = {
            name,
            options,
        };

        firebaseApps.push(newApp);
        __addAuth(newApp);
    }
}

function getApps(): MockFirebaseClientApp[] {
    return firebaseApps;
}

function getApp(appName: string): MockFirebaseClientApp {
    const app = getApps().find(firebaseApp => firebaseApp.name === appName);

    if (isNil(app)) {
        throw new Error('Cannot find Firebase Client App');
    }

    return app;
}

function __resetMock() {
    firebaseApps = [];
}

// exports
export {
    initializeApp,
    getApps,
    getApp,

    __resetMock,
}
