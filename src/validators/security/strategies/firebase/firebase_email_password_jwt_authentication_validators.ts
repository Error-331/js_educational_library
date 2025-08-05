// external imports
import { z, ZodType } from 'zod';

// internal imports
import {
    EmailPasswordLoginValidationSchemaInput,
    EmailPasswordRegisterValidationSchemaInput,
} from '../../../../declarations/validation_declarations';

// implementation
function getEmailPasswordLoginValidationSchema() {
    return z.object({
        email: z
            .string({
                required_error: 'Email is required',
                invalid_type_error: 'Email must be a string',
            })
            .min(6, 'Email must be at least 6 characters long')
            .email('Please provide valid email address'),
        password: z
            .string({
                required_error: 'Password is required',
                invalid_type_error: 'Password must be a string',
            })
            .min(6, 'Password must be at least 6 characters long'),
    });
}

function getEmailPasswordRegisterValidationSchema() {
    return z.object({
        ...getEmailPasswordLoginValidationSchema().shape,
        passwordConfirm: z.string({
            required_error: 'Password (confirm) is required',
            invalid_type_error: 'Password (confirm) must be a string',
        })
            .min(6, 'Password (confirm) must be at least 6 characters long'),
    });
}

function emailPasswordRegisterRefinement(zodObject: ZodType) {
    return zodObject.refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords don't match",
        path: ['passwordConfirm'],
    });
}

function emailPasswordLoginValidator(values: EmailPasswordLoginValidationSchemaInput) {
    return getEmailPasswordLoginValidationSchema().safeParse(values);
}

function emailPasswordRegisterValidator(values: EmailPasswordRegisterValidationSchemaInput) {
    const zodSchema = getEmailPasswordRegisterValidationSchema()
    return emailPasswordRegisterRefinement(zodSchema).safeParse(values);
}


// exports
export {
    getEmailPasswordLoginValidationSchema,
    getEmailPasswordRegisterValidationSchema,

    emailPasswordRegisterRefinement,

    emailPasswordLoginValidator,
    emailPasswordRegisterValidator,
}