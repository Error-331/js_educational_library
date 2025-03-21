// external imports

// internal imports
import {
    MockServiceAccount,
    MockCredential,
    MockServiceAccountJSONData,

    MockGoogleOAuthAccessToken,
    MockFirebaseClientAdminAppOptions,
} from '../.jest/declarations/firebase_mock_declarations';

import { getApps, __addApp } from  './firebase-admin/app';
import { __addAuth } from './firebase-admin/auth';

import { readJSONFileSync } from '../../src/utils/misc/file_utils';
import { isNil, isString } from '../../src/utils/misc/logic_utils';

// implementation
const credential = {
    cert: function(serviceAccountPathOrObject: string | MockServiceAccount): MockCredential {
        if (isNil(serviceAccountPathOrObject)) {
             throw new RangeError('Cannot read service account data - data object or path to file is not specified');
        }

        return {
            getAccessToken: function() {
                let serviceAccount;

                if (isString(serviceAccountPathOrObject)) {
                    const serviceAccountData = readJSONFileSync<MockServiceAccountJSONData>(serviceAccountPathOrObject);
                    serviceAccount = {
                        projectId: serviceAccountData.project_id,
                        clientEmail: serviceAccountData.client_email,
                        privateKey: serviceAccountData.private_key,
                    }
                } else {
                    serviceAccount = serviceAccountPathOrObject;
                }

                const currentDate = new Date();
                const expiresIn = currentDate.getUTCDay() + currentDate.getUTCHours();

                const GoogleOAuthAccessToken: MockGoogleOAuthAccessToken = {
                    access_token: `${serviceAccount.projectId}_${serviceAccount.clientEmail}_${serviceAccount.privateKey}`,
                    expires_in: expiresIn,
                };

                return Promise.resolve(GoogleOAuthAccessToken);
            }
        }
    }
};

const admin = {
    credential,
    initializeApp: function(options: MockFirebaseClientAdminAppOptions, name: string) {
        const app = getApps().find(firebaseAdminApp => firebaseAdminApp.name === name);

        if (isNil(app)) {
            const newApp = {
                options,
                name
            };

            __addApp(newApp);
            __addAuth(newApp);
        }
    }
};

// exports
export default admin;