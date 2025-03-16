// external imports
import { z } from 'zod';

// internal imports
import { SetCookieOptions } from '../../../declarations/net/cookie_declarations';
import { createValidationError } from '../../../utils/misc/validation_utils';

// implementation

/**
 * Function that validates cookie options (@see SetCookieOptions).
 *
 * @param {SetCookieOptions} setCookieOptions - cookie options that should be validated.
 *
 * @throws {ValidationError} if provided cookie options are not valid.
 *
 * @returns {SetCookieOptions} validated cookie options.
 *
 * @todo Add additional checks for min/max values for numeric properties.
 * @todo Add more rigorous checks for every property.
 * @todo Check additional properties like 'partition'.
 *
 */
function validateSetCookieOptions(setCookieOptions: SetCookieOptions): SetCookieOptions {
    const cookieOptionsSchema = z.object({
        domain: z.string(),
        expires: z.string(),
        httpOnly: z.boolean(),
        maxAge: z.number(),
        path: z.string(),
        secure: z.boolean(),
        sameSite: z.boolean(),
    }).partial();

    const setCookieOptionsParsed = cookieOptionsSchema.safeParse(setCookieOptions);

    if (!setCookieOptionsParsed.success) {
        throw createValidationError<SetCookieOptions, SetCookieOptions>(setCookieOptionsParsed);
    }

    return setCookieOptionsParsed.data;
}

// exports
export {
    validateSetCookieOptions,
}