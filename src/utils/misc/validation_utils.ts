// external imports
import { ZodIssue, ZodIssueCode, SafeParseReturnType } from 'zod';

// internal imports
import ValidationError from '../../errors/validation_error';
import { isArray } from "./logic_utils";

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

function createValidationErrorByZodIssue(
    zodIssue: ZodIssue,
    inputName?: string,
    message: string = 'Validation error'
) {
    const issue =  Object.assign({ inputName }, zodIssue);
    return new ValidationError(message, [ issue ]);
}

function createAndThrowValidationError<ZodSafeParseReturnTypeInput, ZodSafeParseReturnTypeOutput>(
    zodSafeValue: SafeParseReturnType<ZodSafeParseReturnTypeInput, ZodSafeParseReturnTypeOutput>,
    inputName?: string,
    message: string = 'Validation error'
): void {
    throw createValidationError<ZodSafeParseReturnTypeInput, ZodSafeParseReturnTypeOutput>(zodSafeValue, inputName, message);
}

function createAndThrowValidationErrorByZodIssue(
    zodIssue: ZodIssue,
    inputName?: string,
    message: string = 'Validation error'
): void {
    throw createValidationErrorByZodIssue(zodIssue, inputName, message);
}

function createCustomZodIssueAndThrowValidationError(
    path: string[],
    inputName?: string,
    message: string = 'Unknown error'
): void {
    throw createValidationErrorByZodIssue(createCustomZodIssue(path, message), inputName, message);
}

/**
 *
 * const errorResult = {
 *     path: ['email'],
 *     message: 'Error message'
 *     code: 'custom',
 * }
 *
 */

function createCustomZodIssue(path: string[], message: string = 'Unknown error'): ZodIssue {
    if (!isArray(path)) {
        throw new Error('Cannot create custom Zod issue - path must be of type array');
    }

    return {
        path,
        message,
        code: ZodIssueCode.custom,
    }
}

// exports
export {
    createValidationError,
    createValidationErrorByZodIssue,

    createAndThrowValidationError,
    createAndThrowValidationErrorByZodIssue,
    createCustomZodIssueAndThrowValidationError,

    createCustomZodIssue,
}