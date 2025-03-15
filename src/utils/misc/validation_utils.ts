// external imports
import { SafeParseReturnType } from 'zod/lib/types';
import { ZodIssue } from 'zod';

// internal imports
import ValidationError from '../../errors/validation_error';

// implementation
/**
 * Function that creates validation error (@see ValidationError).
 *
 * @template ZodSafeParseReturnTypeInput
 * @template ZodSafeParseReturnTypeOutput
 *
 * @param {SafeParseReturnType} zodSafeValue - Zod data that was returned after validation was done.
 * @param {string} inputName - name of the input control (if any) that was used to get the data in the first place.
 * @param {string} message - error message if any.
 *
 * @returns {ValidationError} new validation error.
 *
 */

function createValidationError<ZodSafeParseReturnTypeInput, ZodSafeParseReturnTypeOutput>(
    zodSafeValue: SafeParseReturnType<ZodSafeParseReturnTypeInput, ZodSafeParseReturnTypeOutput>,
    inputName?: string,
    message: string = 'Validation error'
): ValidationError {
    if (zodSafeValue.success) {
        throw new Error('Validation is successful - cannot create validation error');
    }

    const issues = zodSafeValue.error.errors.map((zodIssue: ZodIssue) => Object.assign({ inputName }, zodIssue));
    return new ValidationError(message, issues);
}

// exports
export {
    createValidationError,
}