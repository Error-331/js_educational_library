// external imports

// internal imports
import { MockFirebaseClientApp, MockFirebaseClientAppAuth } from '../../.jest/declarations/firebase_mock_declarations';
import { isNil } from '../../../src/utils/misc/logic_utils';

let firebaseAuthInstances: MockFirebaseClientAppAuth[] = [];

// implementation
function getAuth(app?: MockFirebaseClientApp): MockFirebaseClientAppAuth {
    const authInstance = firebaseAuthInstances.find(authInstance => authInstance.name === app.name);

    if (isNil(authInstance)) {
        throw new Error('Cannot find Firebase Client App Auth instance');
    }

    return authInstance;
}

function __addAuth(app: MockFirebaseClientApp) {
    const authInstance = firebaseAuthInstances.find(authInstance => authInstance.name === app.name);

    if (isNil(authInstance)) {
        const newAuthInstance = {
            app,
            name: app.name,
            config: app.options
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