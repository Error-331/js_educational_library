// external imports
import { z } from 'zod';
import { UIFormValues } from '../../../../declarations/ui/form_utility_declarations';

// internal imports

// implementation
function getAnonymousDisplayNameValidationSchema() {
    return z.object({
        displayName: z
            .string({
                required_error: 'Display name is required',
                invalid_type_error: 'Display name must be of type string',
            })
            .min(3, 'Display name must be at least 3 characters long'),
    });
}

function anonymousDisplayNameValidator(values: UIFormValues) {
    return getAnonymousDisplayNameValidationSchema().safeParse(values);
}

// exports
export {
    getAnonymousDisplayNameValidationSchema,
    anonymousDisplayNameValidator
}