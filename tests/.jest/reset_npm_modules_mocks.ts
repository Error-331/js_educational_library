// external imports

// internal imports
import { __resetMock as resetFirebaseAppMock } from '../__mocks__/firebase/app';
import { __resetMock as resetFirebaseAuthMock } from '../__mocks__/firebase/auth';

import { __resetMock as resetFirebaseAdminAppMock } from '../__mocks__/firebase-admin/app';

// implementation
resetFirebaseAppMock();
resetFirebaseAuthMock();

resetFirebaseAdminAppMock();

// exports