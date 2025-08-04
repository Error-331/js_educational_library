// external imports
import { SafeParseReturnType, ZodIssue } from 'zod';

// internal imports

// implementation
type ZodIssueWithInputData = ZodIssue & {
    inputName?: string;
}

type EmailPasswordValidationSchemaInput = { email: string, password: string, passwordConfirm: string };
type EmailPasswordValidatorType =  (data: EmailPasswordValidationSchemaInput) => SafeParseReturnType<EmailPasswordValidationSchemaInput, EmailPasswordValidationSchemaInput>;

// exports
export type {
    ZodIssueWithInputData,

    EmailPasswordValidationSchemaInput,
    EmailPasswordValidatorType,
}