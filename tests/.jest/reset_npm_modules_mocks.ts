// external imports

// internal imports
import { __resetMock as resetFirebaseAppMock } from '../__mocks__/firebase/app';
import { __resetMock as resetFirebaseAuthMock } from '../__mocks__/firebase/auth';

// implementation
resetFirebaseAppMock();
resetFirebaseAuthMock();

// exports