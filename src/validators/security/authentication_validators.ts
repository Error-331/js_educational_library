// external imports
import { z } from 'zod';

// internal imports
import { EmailPasswordValidationSchemaInput } from '../../declarations/validation_declarations';

// implementation
function emailPasswordValidator(values: EmailPasswordValidationSchemaInput) {
    const zodSchema = z.object({
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
            .min(6, 'Password must be at least 6 characters long')
    });

    return zodSchema.safeParse(values);
}

// exports
export {
    emailPasswordValidator,
}