// external imports

// internal imports
import { __resetMock as resetFirebaseAdminAppMock } from '../../__mocks__/firebase-admin/app';
import { __resetMock as resetFirebaseAdminAuthMock } from '../../__mocks__/firebase-admin/auth';

import FirebaseAdminRegistry from '../../../src/registers/firebase/firebase_admin_registry';

import env from '../../__mocks__/env';
import FirebaseAdminAdditionalConfig from '../../__mocks__/firebase_admin_app_additional_config.json';
import FirebaseAdminServiceAccount from '../../__mocks__/firebase_admin_service_account.json';

// implementation
describe('Firebase admin registry tests...', () => {
    beforeEach(() => {
        resetFirebaseAdminAppMock();
        resetFirebaseAdminAuthMock();
    });

    describe('Instance creation tests...', () => {
        test('Should create an instance of Firebase Admin Registry...', async () => {
            const firebaseAdminRegistry = FirebaseAdminRegistry.getInstance();

            expect(firebaseAdminRegistry.appName).toEqual(env.FIREBASE_ADMIN_APP_NAME);
            expect(firebaseAdminRegistry.app.name).toEqual(env.FIREBASE_ADMIN_APP_NAME);

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

            expect(firebaseAdminRegistry.auth.app.name).toEqual(env.FIREBASE_ADMIN_APP_NAME);
        });
    });
});

// exports