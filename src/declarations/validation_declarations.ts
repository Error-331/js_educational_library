// external imports
import { SafeParseReturnType, ZodIssue } from 'zod';

// internal imports

// implementation
type ZodIssueWithInputData = ZodIssue & {
    inputName?: string;
}

type EmailPasswordLoginValidationSchemaInput = { email: string, password: string };
type EmailPasswordRegisterValidationSchemaInput = EmailPasswordLoginValidationSchemaInput & { passwordConfirm: string };

type EmailPasswordLoginValidatorType =  (data: EmailPasswordLoginValidationSchemaInput) => SafeParseReturnType<EmailPasswordLoginValidationSchemaInput, EmailPasswordLoginValidationSchemaInput>;
type EmailPasswordRegisterValidatorType =  (data: EmailPasswordRegisterValidationSchemaInput) => SafeParseReturnType<EmailPasswordRegisterValidationSchemaInput, EmailPasswordRegisterValidationSchemaInput>;

// exports
export type {
    ZodIssueWithInputData,

    EmailPasswordLoginValidationSchemaInput,
    EmailPasswordRegisterValidationSchemaInput,

    EmailPasswordLoginValidatorType,
    EmailPasswordRegisterValidatorType,
}