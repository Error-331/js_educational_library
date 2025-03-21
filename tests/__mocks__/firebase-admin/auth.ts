// external imports

// internal imports
import {
    MockFirebaseAdminApp,
    MockFirebaseAdminAppAuth,
} from '../../.jest/declarations/firebase_mock_declarations';
import { isNil } from '../../../src/utils/misc/logic_utils';

let firebaseAuthInstances: MockFirebaseAdminAppAuth[] = [];

// implementation
function getAuth(app?: MockFirebaseAdminApp): MockFirebaseAdminAppAuth {
    const authInstance = firebaseAuthInstances.find(authInstance => {
        return authInstance.app.name === app.name
    });

    if (isNil(authInstance)) {
        throw new Error('Cannot find Firebase Admin App Auth instance');
    }

    return authInstance;
}

function __addAuth(app: MockFirebaseAdminApp) {
    const authInstance = firebaseAuthInstances.find(authInstance => authInstance.app.name === app.name);

    if (isNil(authInstance)) {
        const newAuthInstance = {
            app,
        };

        firebaseAuthInstances.push(newAuthInstance);
    }
}

function __resetMock() {
    firebaseAuthInstances = [];
}

// exports
export {
    getAuth,

    __addAuth,
    __resetMock,
}