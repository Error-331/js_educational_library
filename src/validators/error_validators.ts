// external imports
import { GaxiosError } from 'gaxios';

// internal imports

// implementation
function isGAxiosError(error: unknown): boolean {
    return error instanceof GaxiosError;
}

// exports
export {
    isGAxiosError,
}