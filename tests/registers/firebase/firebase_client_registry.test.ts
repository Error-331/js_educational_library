// external imports

// internal imports
import { __resetMock as resetFirebaseAppMock } from '../../__mocks__/firebase/app';
import { __resetMock as resetFirebaseAuthMock } from '../../__mocks__/firebase/auth';

import FirebaseClientRegistry from '../../../src/registers/firebase/firebase_client_registry';

import env from '../../__mocks__/env';
import FirebaseClientConfig from '../../__mocks__/firebase_client_app_config.json';

import { FIREBASE_DEFAULT_CLIENT_APP_NAME } from '../../../src/constants/registers/firebase_registers_constants';

// implementation
describe('Firebase client registry tests...', () => {
    beforeEach(() => {
        resetFirebaseAppMock();
        resetFirebaseAuthMock();
    });

    describe('Instance creation tests...', () => {
        test('Should create an instance of Firebase Client Registry based on default app...', async () => {
            const firebaseClientRegistry = FirebaseClientRegistry.getInstance();

            firebaseClientRegistry.options = FirebaseClientConfig;

            expect(firebaseClientRegistry.appName).toEqual(FIREBASE_DEFAULT_CLIENT_APP_NAME);

            expect(firebaseClientRegistry.app.name).toEqual(FIREBASE_DEFAULT_CLIENT_APP_NAME);
            expect(firebaseClientRegistry.app.options).toStrictEqual(FirebaseClientConfig);

            expect(firebaseClientRegistry.auth.app).toStrictEqual(firebaseClientRegistry.app);
            expect(firebaseClientRegistry.auth.name).toEqual(FIREBASE_DEFAULT_CLIENT_APP_NAME);
            expect(firebaseClientRegistry.auth.config).toStrictEqual(FirebaseClientConfig);
        });

        test('Should create an instance of Firebase Client Registry based o named app...', async () => {
            const firebaseClientRegistry = FirebaseClientRegistry.getInstance();

            firebaseClientRegistry.appName = env.FIREBASE_CLIENT_APP_NAME;
            firebaseClientRegistry.options = FirebaseClientConfig;

            expect(firebaseClientRegistry.appName).toEqual(env.FIREBASE_CLIENT_APP_NAME);

            expect(firebaseClientRegistry.app.name).toEqual(env.FIREBASE_CLIENT_APP_NAME);
            expect(firebaseClientRegistry.app.options).toStrictEqual(FirebaseClientConfig);

            expect(firebaseClientRegistry.auth.app).toStrictEqual(firebaseClientRegistry.app);
            expect(firebaseClientRegistry.auth.name).toEqual(env.FIREBASE_CLIENT_APP_NAME);
            expect(firebaseClientRegistry.auth.config).toStrictEqual(FirebaseClientConfig);
        });
    });
});

// exports