// external imports
import { FirebaseAuthError } from 'firebase-admin/auth';

// internal imports

// implementation
function isAuthError(error: unknown): error is FirebaseAuthError {
    return error instanceof FirebaseAuthError;
}

// exports
export {
    isAuthError,
}