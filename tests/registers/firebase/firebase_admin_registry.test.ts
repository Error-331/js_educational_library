// external imports

// internal imports
import { __resetMock as resetFirebaseAdminAppMock } from '../../__mocks__/firebase-admin/app';
import { __resetMock as resetFirebaseAdminAuthMock } from '../../__mocks__/firebase-admin/auth';

import { __addDefaultApp as addDefaultFirebaseAdminAppMock } from '../../__mocks__/firebase-admin';

import FirebaseAdminRegistry from '../../../src/registers/firebase/firebase_admin_registry';

import env, { setEnvVars, resetEnvVars } from '../../__mocks__/env';

import FirebaseAdminDefaultAdditionalConfig from '../../__mocks__/firebase_admin_default_app_additional_config.json';
import FirebaseAdminAdditionalConfig from '../../__mocks__/firebase_admin_app_additional_config.json';

import FirebaseAdminDefaultServiceAccount from '../../__mocks__/firebase_admin_default_service_account.json';
import FirebaseAdminServiceAccount from '../../__mocks__/firebase_admin_service_account.json';

import { FIREBASE_DEFAULT_ADMIN_APP_NAME } from '../../../src/constants/registers/firebase_registers_constants';

// implementation
describe('Firebase admin registry tests...', () => {
    beforeEach(() => {
        resetFirebaseAdminAppMock();
        resetFirebaseAdminAuthMock();

        addDefaultFirebaseAdminAppMock();

        setEnvVars();
    });

    describe('Instance creation tests...', () => {
        test('Should create an instance of Firebase Admin Registry based on default app...', async () => {
            resetEnvVars();

            const firebaseAdminRegistry = FirebaseAdminRegistry.getInstance();

            expect(firebaseAdminRegistry.appName).toEqual(FIREBASE_DEFAULT_ADMIN_APP_NAME);
            expect(firebaseAdminRegistry.app.name).toEqual(FIREBASE_DEFAULT_ADMIN_APP_NAME);

            const accessToken = await firebaseAdminRegistry.app.options.credential.getAccessToken();
            const returnedOptions = {
                storageBucket: firebaseAdminRegistry.app.options.storageBucket,
                ...accessToken
            };

            const currentDate = new Date();
            const expiresIn = currentDate.getUTCDay() + currentDate.getUTCHours();

            const properOptions = {
                ...FirebaseAdminDefaultAdditionalConfig,
                access_token: `${FirebaseAdminDefaultServiceAccount.project_id}_${FirebaseAdminDefaultServiceAccount.client_email}_${FirebaseAdminDefaultServiceAccount.private_key}`,
                expires_in: expiresIn,
            }

            expect(returnedOptions).toStrictEqual(properOptions);
            expect(firebaseAdminRegistry.auth.app.name).toEqual(FIREBASE_DEFAULT_ADMIN_APP_NAME);
        });

        test('Should create an instance of Firebase Admin Registry based o named app...', async () => {
            const firebaseAdminRegistry = FirebaseAdminRegistry.getInstance();

            expect(firebaseAdminRegistry.appName).toEqual(env.JSEL_FIREBASE_ADMIN_APP_NAME);
            expect(firebaseAdminRegistry.app.name).toEqual(env.JSEL_FIREBASE_ADMIN_APP_NAME);

            const accessToken = await firebaseAdminRegistry.app.options.credential.getAccessToken();
            const returnedOptions = {
                storageBucket: firebaseAdminRegistry.app.options.storageBucket,
                ...accessToken
            };

            const currentDate = new Date();
            const expiresIn = currentDate.getUTCDay() + currentDate.getUTCHours();

            const properOptions = {
                ...FirebaseAdminAdditionalConfig,
                access_token: `${FirebaseAdminServiceAccount.project_id}_${FirebaseAdminServiceAccount.client_email}_${FirebaseAdminServiceAccount.private_key}`,
                expires_in: expiresIn,
            }

            expect(returnedOptions).toStrictEqual(properOptions);
            expect(firebaseAdminRegistry.auth.app.name).toEqual(env.JSEL_FIREBASE_ADMIN_APP_NAME);
        });
    });
});

// exports