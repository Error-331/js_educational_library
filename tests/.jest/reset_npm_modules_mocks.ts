// external imports

// internal imports
import { __resetMock as resetFirebaseClientAppMock } from '../__mocks__/firebase/app';
import { __resetMock as resetFirebaseClientAuthMock } from '../__mocks__/firebase/auth';

import { __resetMock as resetFirebaseAdminAppMock } from '../__mocks__/firebase-admin/app';
import { __resetMock as resetFirebaseAdminAuthMock } from '../__mocks__/firebase-admin/auth';

// implementation
resetFirebaseClientAppMock();
resetFirebaseClientAuthMock();

resetFirebaseAdminAppMock();
resetFirebaseAdminAuthMock();

// exports