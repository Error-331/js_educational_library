// external imports
import { SafeParseReturnType } from 'zod/lib/types';
import { ZodIssue } from 'zod';

// internal imports
import ValidationError from '../../errors/validation_error';

// implementation
function createValidationError(zodSafeValue: SafeParseReturnType, inputName?: string): ValidationError {
    if (zodSafeValue.success) {
        throw new Error('Validation is successful - cannot create validation error');
    }

    const issues = zodSafeValue.error.errors.map((zodIssue: ZodIssue) => Object.assign({ inputName }, zodIssue));
    return new ValidationError('Validation error', issues);
}

// exports
export {
    createValidationError,
}